import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importações de estilos
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Framer Motion é usado em vários componentes
import { LazyMotion, domAnimation } from 'framer-motion';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </React.StrictMode>
);