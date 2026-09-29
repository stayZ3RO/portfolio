import Site from './site/Site.jsx';

/* Single-page portfolio. Anything off the homepage renders a plain 404. */
function NotFound() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main" className="nf-main">
        <div className="nf-404">404</div>
        <p className="nf-msg">This route does not exist. The portfolio is one page.</p>
        <a className="btn btn-solid" href="/">Back home</a>
      </main>
    </>
  );
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path !== '/') return <NotFound />;
  return <Site />;
}

export default App;
