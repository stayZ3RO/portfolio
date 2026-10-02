import Site from './site/Site.jsx';
import CfmPage from './site/CfmPage.jsx';

/* Portfolio routes. /cfm is the cFM project page. */
function NotFound() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main" className="nf-main">
        <div className="nf-404">404</div>
        <p className="nf-msg">This route does not exist.</p>
        <a className="btn btn-solid" href="/">Back home</a>
      </main>
    </>
  );
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/cfm') return <CfmPage />;
  if (path !== '/') return <NotFound />;
  return <Site />;
}

export default App;
