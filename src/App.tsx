import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Calculator from './components/Calculator';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Services />
        <Portfolio />
        <Testimonials />
        <Calculator />
        <ContactForm />
      </main>
      <footer className="py-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} ZakTech Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;