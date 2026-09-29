import { useEffect, useState } from 'react';

function utcNow() {
  return new Date().toISOString().slice(11, 19) + ' UTC';
}

/* Status footer: pulse status line + live UTC clock. */
export default function Footer() {
  const [t, setT] = useState('--:--:-- UTC');
  useEffect(() => {
    setT(utcNow());
    const id = setInterval(() => setT(utcNow()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer>
      <div className="foot-inner">
        <div className="statusline">
          <span className="pulse"></span>
          <span>built and operated by Christopher Lorenzo</span>
        </div>
        <div className="clock" id="clock" aria-label="Current UTC time">{t}</div>
      </div>
    </footer>
  );
}
