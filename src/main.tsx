import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Surface any uncaught error so it doesn't silently swallow the
// page. We rely on React's error boundary inside <App> for
// render-time errors.
window.addEventListener('error', (e) => {
  // eslint-disable-next-line no-console
  console.error('[window error]', e.error ?? e.message);
});
window.addEventListener('unhandledrejection', (e) => {
  // eslint-disable-next-line no-console
  console.error('[unhandled rejection]', e.reason);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);