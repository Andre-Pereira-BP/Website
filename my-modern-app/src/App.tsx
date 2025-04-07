import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import modern page components
import Home from './pages/Home';
import About from './pages/About';
import TestSystems from './pages/TestSystems';
import Expertise from './pages/Expertise';
import News from './pages/News';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Quality from './pages/Quality';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test-systems" element={<TestSystems />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/news" element={<News />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;