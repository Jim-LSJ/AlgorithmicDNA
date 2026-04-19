"use client";

import React from 'react';
import { useLanguage } from '@/components/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import PatternCard from '@/components/PatternCard';
import { Dna, Sparkles, BookOpen } from 'lucide-react';
import { AlgorithmPattern } from '@/types';

interface HomeClientProps {
  patterns: AlgorithmPattern[];
  totalVariations: number;
}

export default function HomeClient({ patterns, totalVariations }: HomeClientProps) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 antialiased selection:bg-blue-100 selection:text-blue-900">
      <header className="bg-slate-900 relative pt-12 pb-40 overflow-hidden">
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between relative z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Dna className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-black tracking-tighter text-lg">{t('title')}</span>
          </div>
          <LanguageSelector />
        </nav>

        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest leading-none">{t('hero_badge')}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            {t('title').split(' ')[0]} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">{t('title').split(' ')[1]}</span>
          </h1>
          
          <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
            {t('tagline')}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors group">
              <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-white font-bold leading-none">{patterns.length}</div>
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">{t('core_patterns')}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors group">
              <Dna className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-white font-bold leading-none">{totalVariations}</div>
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">{t('problem_variations')}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </header>

      <div className="container mx-auto px-6 -mt-20 relative z-20 pb-20">
        {Array.from(new Set(patterns.map(p => p.category))).map(category => {
          const categoryPatterns = patterns.filter(p => p.category === category);
          // Map category name to translation key
          const catKeyMap: Record<string, any> = {
            "Dynamic Programming": "cat_dp",
            "Graph": "cat_graph",
            "Binary Search": "cat_bs",
            "Interval": "cat_interval",
            "Sliding Window": "cat_sw",
            "Binary Tree": "cat_tree",
            "Priority Queue / Heap": "cat_heap",
            "Prefix Sum & Difference Array": "cat_prefix",
            "Monotonic Stack & Queue": "cat_stack",
            "Trie": "cat_trie",
            "Segment Tree & Fenwick Tree": "cat_segment",
            "Design & Cache": "cat_cache",
            "HashMap & Set Patterns": "cat_hash",
            "Sorting & Searching": "cat_sorting",
            "Linked List": "cat_list",
            "Math & Strings": "cat_math",
            "Backtracking": "cat_bt",
            "Greedy": "cat_greedy",
            "Divide and Conquer": "cat_dc"
          };
          const translatedCategory = t(catKeyMap[category] || category as any);

          return (
            <div key={category} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <span className="w-2 h-8 bg-blue-600 rounded-full" />
                  {translatedCategory}
                </h2>
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{categoryPatterns.length} {t('core_patterns')}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryPatterns.map((pattern) => (
                  <PatternCard key={pattern.id} pattern={pattern} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
