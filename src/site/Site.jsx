import Ambient from './Ambient';
import Nav from './Nav';
import Hero from './Hero';
import ScanStrip from './ScanStrip';
import Systems from './Systems';
import Interlude from './Interlude';
import Lab from './Lab';
import FieldNotes from './FieldNotes';
import Now from './Now';
import Experience from './Experience';
import Contact from './Contact';
import Footer from './Footer';

export default function Site() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Ambient />
      <div className="wrap">
        <Nav />
        <main id="main">
          <Hero />
          <ScanStrip />
          <Systems />
          <Interlude />
          <Lab />
          <FieldNotes />
          <Now />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
