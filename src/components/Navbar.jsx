import { useState, useCallback, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from "./ThemeToggle";
import { LangContext } from '../context/LangContext';
import { X, Menu } from 'lucide-react'; // Icônes (tu peux aussi utiliser Heroicons)

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, toggleLang } = useContext(LangContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollTo = useCallback((id) => {
    setMenuOpen(false); // Ferme le menu mobile
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname, navigate]);

  const navItems = [
    { id: 'home', labelFr: 'Accueil', labelEn: 'Home' },
    { id: 'about', labelFr: 'À propos', labelEn: 'About' },
    { id: 'skills', labelFr: 'Compétences', labelEn: 'Skills' },
    { id: 'projet', labelFr: 'Projets', labelEn: 'Projects' },
    { id: 'contact', labelFr: 'Contact', labelEn: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-stone-200 dark:bg-zinc-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 👤 Nom */}
        <span
          onClick={() => navigate('/')}
          className="cursor-pointer text-xl font-porkys text-red-600 hover:underline"
        >
          Aurélie Nunge<span className="text-black dark:text-white">.</span>
        </span>

        {/* 🌐 Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
        <ul className="flex gap-6 text-sm font-medium">
          {navItems.map(({ id, labelFr, labelEn }) => (
            <li
              key={id}
              onClick={() => handleScrollTo(id)}
              className="cursor-pointer hover:text-red-600 dark:text-white border-b-2 border-transparent hover:border-red-600"
            >
              {lang === 'fr' ? labelFr : labelEn}
            </li>
          ))}
        </ul>

          <button
            onClick={toggleLang}
            className="relative flex items-center w-16 h-8 bg-neutral-300 dark:bg-zinc-700 rounded-full px-1 transition-colors shadow-inner"
          >
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-white dark:bg-red-600 rounded-full shadow-md transform transition-transform duration-300 ${
                lang === 'en' ? 'translate-x-full' : ''
              }`}
            />
            <span className="z-10 text-sm font-semibold w-1/2 text-center">🇫🇷</span>
            <span className="z-10 text-sm font-semibold w-1/2 text-center">🇬🇧</span>
          </button>

          <ThemeToggle />
        </div>

        {/* 🍔 Mobile burger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)}>
            <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
        </div>
      </nav>

      {/* 📱 Menu mobile latéral */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-stone-100 dark:bg-zinc-800 z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center px-4 py-4 border-b dark:border-gray-700">
          <span className="text-xl font-porkys text-red-600">
            Aurélie<span className="text-black dark:text-white">.</span>
          </span>
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-6 text-base font-medium">
          {navItems.map(({ id, labelFr, labelEn }) => (
            <li
              key={id}
              onClick={() => handleScrollTo(id)}
              className="cursor-pointer hover:text-red-600 dark:text-white border-b border-transparent hover:border-red-600"
            >
              {lang === 'fr' ? labelFr : labelEn}
            </li>
          ))}
        </ul>

        <div className="px-6 flex flex-col gap-4">
        <button
            onClick={toggleLang}
            className="relative flex items-center w-14 h-7 bg-neutral-300 dark:bg-zinc-700 rounded-full px-1 transition-colors"
          >
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-white dark:bg-red-500 rounded-full shadow-md transform transition-transform duration-300 ${
                lang === 'en' ? 'translate-x-full' : ''
              }`}
            />
            <span className="z-10 text-xs font-semibold w-1/2 text-center">🇫🇷</span>
            <span className="z-10 text-xs font-semibold w-1/2 text-center">🇬🇧</span>
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
