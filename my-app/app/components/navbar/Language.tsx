'use client';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Globe } from 'lucide-react';

const Language = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
    localStorage.setItem('language', lng);
  };

  const currentLang = i18n.language.toUpperCase();

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/90 text-red-800 hover:bg-white transition-colors border border-red-200 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Dili Seç"
      >
        <Globe size={16} />
        <span className="text-sm font-semibold">{currentLang}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium ${
              i18n.language === 'tr' ? 'bg-red-100 text-red-800' : 'text-gray-700'
            }`}
            onClick={() => changeLanguage('tr')}
          >
            🇹🇷 Türkçe
          </button>
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium border-t ${
              i18n.language === 'en' ? 'bg-red-100 text-red-800' : 'text-gray-700'
            }`}
            onClick={() => changeLanguage('en')}
          >
            🇬🇧 English
          </button>
        </div>
      )}
    </div>
  );
};

export default Language;