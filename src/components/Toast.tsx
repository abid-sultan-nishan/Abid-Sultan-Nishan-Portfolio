import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastOptions {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastContextType {
  showToast: (options: ToastOptions | string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = useCallback((options: ToastOptions | string) => {
    const message = typeof options === 'string' ? options : options.message;
    const type = typeof options === 'string' ? 'success' : options.type || 'success';
    const duration = typeof options === 'string' ? 3200 : options.duration || 3200;
    const id = Date.now();

    setToast({ id, message, type });

    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-700/80 bg-[#0D1B2A] text-slate-100 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-3"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400 shrink-0" />}
          <span className="text-sm font-medium tracking-tight pr-2">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-200 p-0.5 rounded transition-colors"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
