import { useState } from 'react';

/* Motion override, shared with the blog under the `motion` localStorage
   key and applied as data-motion on <html>. index.html resolves the stored
   value (or the OS preference) before first paint; this control changes
   it and tells the running animations through a `motionchange` event. */
export default function MotionToggle() {
  const [motion, setMotion] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.motion === 'reduced'
      ? 'reduced'
      : 'full',
  );
  const set = (value) => {
    document.documentElement.dataset.motion = value;
    try {
      localStorage.setItem('motion', value);
    } catch (e) {}
    window.dispatchEvent(new Event('motionchange'));
    setMotion(value);
  };
  return (
    <p className="motion-ctl" aria-label="Motion preference">
      motion:
      {['full', 'reduced'].map((v) => (
        <button key={v} type="button" aria-pressed={motion === v ? 'true' : 'false'} onClick={() => set(v)}>
          {v}
        </button>
      ))}
    </p>
  );
}
