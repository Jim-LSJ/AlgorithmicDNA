import React from 'react';
import Link from 'next/link';
import ComplexityBadge from './ComplexityBadge';
import { AlgorithmPattern } from '@/types';
import { ChevronRight, Boxes } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface PatternCardProps {
  pattern: AlgorithmPattern;
}

const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => {
  const { t } = useLanguage();

  return (
    <Link href={`/patterns/${pattern.id}`}>
      <div className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full bg-gradient-to-b from-white to-slate-50/50">
        {/* Pattern Image Thumbnail */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          {pattern.imageUrl ? (
            <img 
              src={pattern.imageUrl} 
              alt={pattern.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-50">
              <Boxes className="w-12 h-12 text-slate-200" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          <div className="absolute top-4 right-4 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
             <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-lg">
                <ChevronRight className="w-4 h-4 text-blue-600" />
             </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
            {pattern.name}
          </h3>
          
          <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed h-10">
            {pattern.description}
          </p>
          
          <div className="mt-auto space-y-2 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap gap-2">
              <ComplexityBadge label="T" value={pattern.complexity.time} type="time" />
              <ComplexityBadge label="S" value={pattern.complexity.space} type="space" />
            </div>
            <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100 w-fit">
              {pattern.variations.length} {t('variations_count')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PatternCard;
