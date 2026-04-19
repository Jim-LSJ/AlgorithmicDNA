"use client";

import React from 'react';
import { useLanguage } from './LanguageContext';
import { Code2 } from 'lucide-react';

const CodeLanguageSelector: React.FC = () => {
  const { codeLanguage, setCodeLanguage } = useLanguage();

  return (
    <div className="flex p-1 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/5 self-start">
      <button
        onClick={() => setCodeLanguage('python')}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
          codeLanguage === 'python'
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <span className={codeLanguage === 'python' ? 'opacity-100' : 'opacity-40'}>PY</span>
        Python
      </button>
      <button
        onClick={() => setCodeLanguage('cpp')}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
          codeLanguage === 'cpp'
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <span className={codeLanguage === 'cpp' ? 'opacity-100' : 'opacity-40'}>C++</span>
        C++
      </button>
    </div>
  );
};

export default CodeLanguageSelector;
