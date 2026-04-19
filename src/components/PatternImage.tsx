import React from 'react';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';

interface PatternImageProps {
  src?: string;
  alt: string;
}

const PatternImage: React.FC<PatternImageProps> = ({ src, alt }) => {
  const { t } = useLanguage();
  if (!src) return null;

  return (
    <div className="relative w-full max-h-[500px] aspect-video rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 mb-12 shadow-2xl group/img">
      <img
        src={src}
        alt={alt}
        className="object-contain w-full h-full group-hover/img:scale-[1.02] transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <div className="bg-blue-600 w-1.5 h-6 rounded-full animate-pulse" />
        <span className="text-white/90 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-xl">
          {t('conceptual_viz')}
        </span>
      </div>
    </div>
  );
};

export default PatternImage;
