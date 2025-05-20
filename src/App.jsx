import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import About from './pages/About';
import Skills from './pages/Skills';
import ModelViewer from './components/ModelViewer';
import Timeline from './components/Timeline';
import ProjectPage from './components/ProjectPage';
import ScrollToTop from './components/ScrollToTop'; 



function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      // Clair par défaut
      document.documentElement.classList.remove('dark');
      if (!savedTheme) {
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);


  return (
    <Router>
      <div className="bg-stone-200 dark:bg-zinc-800 font-sans overflow-x-hidden">
        <Navbar />
        <ScrollToTop />
        <Routes>
          {/* Page d'accueil avec toutes les sections */}
          <Route
            path="/"
            element={
              <>
                <ModelViewer />
                <About />
                <Skills />
                <Timeline />
                <Contact />

              </>
            }
          />

          {/* Timeline des projets */}
          <Route path="/projets" element={<Timeline />} />

          {/* Page détaillée d’un projet */}
          <Route path="/projets/:slug" element={<ProjectPage />} />
        </Routes>
      </div>
      <div className="hidden">
        h-[800px] h-[1000px] h-[1000px] md:h-[1000px] lg:h-[1000px]
      </div>
      <div className="hidden">
        list-disc list-decimal pl-4 pl-6 pl-8
      </div>

    </Router>
    
  );
}

export default App;
