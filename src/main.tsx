import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useAuthStore } from './stores/useStore'

// Initialize authentication on app start
useAuthStore.getState().initializeAuth();

createRoot(document.getElementById("root")!).render(<App />);
