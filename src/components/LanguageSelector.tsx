"use client";

import React from 'react';
import { useLanguage } from './LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all text-white text-xs font-bold uppercase tracking-widest group"
    >
      <Languages className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
      {language === 'en' ? '繁體中文' : 'English'}
    </button>
  );
};

export default LanguageSelector;
