import Ambient from './Ambient';
import Nav from './Nav';
import Hero from './Hero';
import Systems from './Systems';
import Lab from './Lab';
import Experience from './Experience';
import Now from './Now';
import Interlude from './Interlude';
import FieldNotes from './FieldNotes';
import Contact from './Contact';
import SecHead from './SecHead';
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
          <Systems />
          <Lab />
          <section id="about">
            <SecHead name="About" />
            <div className="about-grid">
              <Experience />
              <Now />
            </div>
            <Interlude />
          </section>
          <FieldNotes />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
