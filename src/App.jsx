import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import CurrentFocus from './components/CurrentFocus.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';

function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <About />
        <CurrentFocus />
        <Projects />
        <Skills />
        <section className="section resume-contact" aria-label="Resume and contact">
          <Resume />
          <Contact />
        </section>
      </main>
      <footer className="site-footer">
        <p>Built with Vite, React, CSS, and GitHub — hosted on Cloudflare Pages.</p>
      </footer>
    </>
  );
}

export default App;
