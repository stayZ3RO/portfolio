import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './site/site.css';
import './site/print.css';

/* Layer 6: drop the pre-hydration splash once the app mounts. */
const splash = document.getElementById('splash');
if (splash) splash.remove();
window.__portfolioBooted = true;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
