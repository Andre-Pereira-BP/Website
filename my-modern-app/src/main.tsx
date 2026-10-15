import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PrerenderDataContext, readPrerenderData } from './lib/ssr';

// Self-hosted fonts (only the weights the design uses)
import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/latin-500.css';
import '@fontsource/montserrat/latin-600.css';
import '@fontsource/montserrat/latin-700.css';
import '@fontsource/pt-sans/latin-400.css';
import '@fontsource/pt-sans/latin-700.css';
import '@fontsource/pt-sans/latin-400-italic.css';
import './index.css';

import { LazyMotion, domAnimation } from 'framer-motion';

const container = document.getElementById('root')!;

const app = (
  <StrictMode>
    <PrerenderDataContext.Provider value={readPrerenderData()}>
      <LazyMotion features={domAnimation} strict>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LazyMotion>
    </PrerenderDataContext.Provider>
  </StrictMode>
);

// Pages prerendered at build time are hydrated. The plain shell (admin area, language redirects,
// articles published after the last build) is rendered from scratch.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
