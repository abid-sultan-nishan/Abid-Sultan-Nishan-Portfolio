import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initImagePreloader } from './utils/imagePreloader';

// Pre-warm browser cache with critical card assets & idle prefetch
initImagePreloader();

// Register high-performance Service Worker after window load (non-blocking)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.debug('ServiceWorker registration skipped:', err);
    });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
