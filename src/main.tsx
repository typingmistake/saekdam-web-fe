import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Toaster />
            <App />
        </BrowserRouter>
    </StrictMode>,
);
