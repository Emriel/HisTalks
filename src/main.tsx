import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './utils/i18n';
import { AuthProvider } from './context/AuthContext'; // 👈 bu satırı ekle

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider> {/* 👈 App'i sarmalayan context */}
      <App />
    </AuthProvider>
  </StrictMode>
);
