"use client";

import React from 'react';
import { useLanguage } from '@/components/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import ComplexityBadge from '@/components/ComplexityBadge';
import PatternImage from '@/components/PatternImage';
import { ChevronLeft, ExternalLink, Dna } from 'lucide-react';
import Link from 'next/link';
import { AlgorithmPattern } from '@/types';
import CodeDiffViewerClient from '@/components/CodeDiffViewerClient';

interface PatternPageClientProps {
  pattern: AlgorithmPattern;
  highlightedVariations: any[]; // Pre-highlighted results
}

const PatternPageClient: React.FC<PatternPageClientProps> = ({ pattern, highlightedVariations }) => {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  const displayName = isZh && pattern.name_zh ? pattern.name_zh : pattern.name;
  const displayDescription = isZh && pattern.description_zh ? pattern.description_zh : pattern.description;

  return (
    <main className="min-h-screen bg-slate-50 antialiased selection:bg-blue-100 selection:text-blue-900 pb-20">
      <div className="bg-slate-900 text-white pt-8 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 relative">
          <div className="flex justify-between items-center mb-12">
            <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-all group">
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">{t('back_to_dashboard')}</span>
            </Link>
            <LanguageSelector />
          </div>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Dna className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-xs">{t('module_label')}</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400">
              {displayName}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-8">
              {displayDescription}
            </p>
            
            <div className="flex gap-4">
              <ComplexityBadge label={t('complexity_t')} value={pattern.complexity.time} type="time" />
              <ComplexityBadge label={t('complexity_s')} value={pattern.complexity.space} type="space" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-12">
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200 p-8 lg:p-12 mb-12 border border-slate-100">
          <PatternImage src={pattern.imageUrl} alt={pattern.name} />

          {pattern.variations.length > 0 ? (
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-blue-600 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t('core_structural_dna')}</h2>
              </div>

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">
                  {isZh && pattern.variations[0].title_zh ? pattern.variations[0].title_zh : pattern.variations[0].title}
                </h3>
                <Link 
                  href={pattern.variations[0].leetcodeUrl || '#'} 
                  target="_blank"
                  className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors"
                >
                  {t('solve_on_leetcode')} <ExternalLink className="w-3 h-3 ml-1.5" />
                </Link>
              </div>
              
              <CodeDiffViewerClient 
                templateResult={highlightedVariations[0]?.templateResult}
                variationResult={highlightedVariations[0]?.variationResult}
                explanation={isZh && pattern.variations[0].explanation_zh ? pattern.variations[0].explanation_zh : pattern.variations[0].explanation}
                coreLogic={pattern.variations[0].coreLogic}
                adaptationLogic={pattern.variations[0].adaptationLogic}
              />
            </section>
          ) : (
            <section className="mb-20 py-20 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
              <Dna className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-600 mb-2">Coming Soon</h3>
              <p className="text-slate-400">Variations for this pattern are currently being synchronized.</p>
            </section>
          )}

          {pattern.variations.length > 1 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t('phenotypic_variations')}</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-12">
                {pattern.variations.slice(1).map((variation, index) => (
                  <div key={variation.id} className="pt-12 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-slate-800">
                        {isZh && variation.title_zh ? variation.title_zh : variation.title}
                      </h3>
                      <Link 
                        href={variation.leetcodeUrl || '#'} 
                        target="_blank"
                        className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors"
                      >
                        {t('solve_on_leetcode')} <ExternalLink className="w-3 h-3 ml-1.5" />
                      </Link>
                    </div>
                    {highlightedVariations[index + 1] && (
                      <CodeDiffViewerClient 
                        templateResult={highlightedVariations[index + 1].templateResult}
                        variationResult={highlightedVariations[index + 1].variationResult}
                        explanation={isZh && variation.explanation_zh ? variation.explanation_zh : variation.explanation}
                        coreLogic={variation.coreLogic}
                        adaptationLogic={variation.adaptationLogic}
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default PatternPageClient;
