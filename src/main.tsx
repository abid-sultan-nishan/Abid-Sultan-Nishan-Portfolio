import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initImagePreloader } from './utils/imagePreloader';

// Pre-warm browser cache with critical card assets & idle prefetch
initImagePreloader();

// Ensure clean iframe preview without stale service worker interception
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  }).catch(() => {});
}

createRoot(document.getElementById('root')!).render(<App />);
