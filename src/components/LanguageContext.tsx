"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, translations, TranslationKey } from '@/lib/i18n';

export type CodeLanguage = 'python' | 'cpp';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  codeLanguage: CodeLanguage;
  setCodeLanguage: (lang: CodeLanguage) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');
  const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>('python');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations['en'][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, codeLanguage, setCodeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
