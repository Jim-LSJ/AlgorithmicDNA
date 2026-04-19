"use client";

import React, { useState } from 'react';
import AnnotatedCode from './AnnotatedCode';
import * as Dialog from '@radix-ui/react-dialog';
import { Maximize2, X } from 'lucide-react';
import { Annotation } from '@/lib/shiki';
import { useLanguage } from './LanguageContext';

interface CodeResult {
  html: string;
  annotations: Annotation[];
}

interface CodeDiffViewerProps {
  templateResult: CodeResult;
  variationResult: CodeResult;
  explanation: string;
  coreLogic: string;
  adaptationLogic: string;
}

const CodeDiffViewerClient: React.FC<CodeDiffViewerProps> = ({ 
  templateResult, 
  variationResult, 
  explanation,
  coreLogic,
  adaptationLogic 
}) => {
  const { t } = useLanguage();
  const [focusCode, setFocusCode] = useState<CodeResult | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Template Section */}
        <div className="flex flex-col h-full group/card">
          <div 
            className="flex items-center justify-between mb-2 px-2 cursor-pointer group/header"
            onClick={() => setFocusCode(templateResult)}
          >
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover/header:text-blue-600 transition-colors">{t('core_patterns')}</span>
            <div 
              className="p-1.5 rounded-lg bg-slate-100 text-slate-400 group-hover/header:bg-blue-600 group-hover/header:text-white transition-all"
              title={t('focus_mode')}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="relative flex-grow">
            <div className="p-4 bg-slate-900 rounded-2xl overflow-x-auto text-sm leading-relaxed border border-slate-800 h-full scrollbar-thin scrollbar-thumb-slate-700">
              <AnnotatedCode 
                html={templateResult.html} 
                annotations={templateResult.annotations} 
              />
            </div>
          </div>
        </div>

        {/* Variation Section */}
        <div className="flex flex-col h-full group/card">
          <div 
            className="flex items-center justify-between mb-2 px-2 cursor-pointer group/header"
            onClick={() => setFocusCode(variationResult)}
          >
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover/header:text-rose-600 transition-colors">{t('problem_variations')}</span>
            <div 
              className="p-1.5 rounded-lg bg-slate-100 text-slate-400 group-hover/header:bg-rose-600 group-hover/header:text-white transition-all"
              title={t('focus_mode')}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="relative flex-grow">
            <div className="p-4 bg-slate-900 rounded-2xl overflow-x-auto text-sm leading-relaxed border border-slate-800 h-full scrollbar-thin scrollbar-thumb-slate-700">
              <AnnotatedCode 
                html={variationResult.html} 
                annotations={variationResult.annotations} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logic Breakdown */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h4 className="font-black text-slate-900 uppercase tracking-tighter">{t('logic_breakdown')}</h4>
          <div className="flex flex-col gap-2 text-[10px] font-black uppercase tracking-[0.15em] border-l-2 border-slate-200 pl-4">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" /> {t('core_label')}</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> {t('new_label')}</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400" /> {t('mod_label')}</div>
          </div>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              {t('core_logic')}
            </h5>
            <div className="bg-blue-50/30 p-5 rounded-2xl border border-blue-100/50">
              <pre className="text-xs text-blue-900 font-mono overflow-x-auto whitespace-pre-wrap leading-loose">
                {coreLogic}
              </pre>
            </div>
          </div>
          <div>
            <h5 className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-4 flex items-center">
              <span className="w-2 h-2 rounded-full bg-rose-500 mr-2 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
              {t('adaptation_logic')}
            </h5>
            <div className="bg-rose-50/30 p-5 rounded-2xl border border-rose-100/50">
              <pre className="text-xs text-rose-900 font-mono overflow-x-auto whitespace-pre-wrap leading-loose">
                {adaptationLogic}
              </pre>
            </div>
          </div>
        </div>
        <div className="px-8 py-5 bg-slate-50 border-t border-slate-100">
          <p className="text-sm text-slate-700 leading-relaxed">
            <span className="font-black uppercase tracking-widest text-[10px] text-slate-400 mr-3 inline-block">{t('explanation')}:</span>
            {explanation}
          </p>
        </div>
      </div>

      {/* Focus Mode Modal */}
      <Dialog.Root open={!!focusCode} onOpenChange={(open: boolean) => !open && setFocusCode(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[200] animate-in fade-in duration-500" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[1400px] h-[90vh] bg-slate-900 rounded-[3rem] shadow-2xl border border-white/5 z-[201] flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-500">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-900/80 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-blue-600/20">
                  <Maximize2 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <Dialog.Title className="text-white font-black uppercase tracking-[0.2em] text-sm">
                    {t('focus_mode')}
                  </Dialog.Title>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Algorithmic DNA Analyzer</p>
                </div>
              </div>
              <Dialog.Close asChild>
                <button className="p-3 rounded-2xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                  <X className="w-6 h-6" />
                </button>
              </Dialog.Close>
            </div>
            
            <div className="flex-grow overflow-auto p-12 lg:p-20 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {focusCode && (
                <div className="text-base sm:text-lg leading-relaxed max-w-5xl mx-auto font-mono">
                  <AnnotatedCode 
                    html={focusCode.html} 
                    annotations={focusCode.annotations} 
                  />
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default CodeDiffViewerClient;
