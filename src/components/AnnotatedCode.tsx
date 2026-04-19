"use client";

import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import parse, { domToReact, HTMLReactParserOptions, Element } from 'html-react-parser';
import { Annotation } from '@/lib/shiki';
import { useLanguage } from './LanguageContext';

interface AnnotatedCodeProps {
  html: string;
  annotations: Annotation[];
}

const AnnotatedCode: React.FC<AnnotatedCodeProps> = ({ html, annotations }) => {
  const { language } = useLanguage();
  
  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag' && domNode.attribs?.class?.includes('anno-trigger')) {
        const id = domNode.attribs['data-anno-id'];
        const annotation = annotations.find(a => a.id === id);
        
        if (annotation) {
          const typeClasses = {
            core: 'bg-blue-500/10 border-b border-blue-400/50 hover:bg-blue-500/20',
            new: 'bg-emerald-500/10 border-b border-emerald-400/50 hover:bg-emerald-500/20',
            mod: 'bg-rose-500/10 border-b border-rose-400/50 hover:bg-rose-500/20',
          };

          return (
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger asChild>
                <span className={`inline-block ${typeClasses[annotation.type]} rounded-sm px-0.5 cursor-help transition-all duration-200`}>
                  {domToReact(domNode.children, options)}
                </span>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="z-[9999] max-w-xs bg-slate-900 text-white p-3 rounded-xl shadow-2xl text-[13px] leading-relaxed border border-slate-700 animate-in fade-in zoom-in duration-200"
                  sideOffset={8}
                >
                  <div className="flex items-center space-x-2 mb-2 border-b border-white/10 pb-2">
                    <div className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${
                      annotation.type === 'core' ? 'bg-blue-400 shadow-blue-400' :
                      annotation.type === 'new' ? 'bg-emerald-400 shadow-emerald-400' : 'bg-rose-400 shadow-rose-400'
                    }`} />
                    <span className="uppercase font-black text-[10px] tracking-widest text-white/50">
                      {annotation.type === 'core' ? 'Core Module' :
                       annotation.type === 'new' ? 'New Adaptation' : 'Modified Logic'}
                    </span>
                  </div>
                  <div className="font-medium text-slate-200">
                    {language === 'zh' ? annotation.explanation_zh : annotation.explanation}
                  </div>
                  <Tooltip.Arrow className="fill-slate-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          );
        }
      }
    },
  };

  return (
    <Tooltip.Provider>
      <div className="shiki-container">
        {parse(html, options)}
      </div>
    </Tooltip.Provider>
  );
};

export default AnnotatedCode;
