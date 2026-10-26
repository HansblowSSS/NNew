import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import CustomCursor from './components/CustomCursor/CustomCursor';
import PageTransition from './components/PageTransition/PageTransition';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Works from './pages/Works/Works';
import Awards from './pages/Awards/Awards';
import Capabilities from './pages/Capabilities/Capabilities';
import Contact from './pages/Contact/Contact';
import Experience from './pages/Experience/Experience';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';

import './styles/globals.css';

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <BrowserRouter>
      <CustomCursor />
      <Navigation mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:slug" element={<ProjectDetail />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  );
}