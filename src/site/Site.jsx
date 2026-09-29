import Ambient from './Ambient';
import Nav from './Nav';
import Hero from './Hero';
import Systems from './Systems';
import Lab from './Lab';
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
          <Systems />
          <Lab />
          <Now />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
