import React, { useState, useEffect } from 'react';
import { MapPin, HelpCircle, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, translations } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-10 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <MapPin className="h-6 w-6 text-green-600 mr-2" />
          <h1 className="text-xl font-bold text-green-800">
            {language === 'en' ? 'Palakkad Guide' : 'പാലക്കാട് ഗൈഡ്'}
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-full border border-green-600 text-green-700 hover:bg-green-50 transition-colors"
          >
            {language === 'en' ? 'മലയാളം' : 'English'}
          </button>
          <button className="flex items-center text-green-700 hover:text-green-800">
            <HelpCircle className="h-5 w-5 mr-1" />
            <span>{translations.about}</span>
          </button>
        </div>
        
        <button 
          className="md:hidden text-green-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 p-4 flex flex-col space-y-3 animate-fadeIn">
          <button 
            onClick={toggleLanguage}
            className="px-3 py-2 rounded-md border border-green-600 text-green-700 hover:bg-green-50 transition-colors w-full text-left"
          >
            {language === 'en' ? 'മലയാളം' : 'English'}
          </button>
          <button className="flex items-center text-green-700 hover:text-green-800 px-3 py-2">
            <HelpCircle className="h-5 w-5 mr-2" />
            <span>{translations.about}</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;