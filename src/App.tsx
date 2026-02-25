import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="bg-background min-h-screen font-sans text-text selection:bg-primary/30">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
