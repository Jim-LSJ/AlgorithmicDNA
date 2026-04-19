import React from 'react';
import { notFound } from 'next/navigation';
import { getPatternById } from '@/data/patterns';
import { highlightWithAnnotations } from '@/lib/shiki';
import PatternPageClient from '@/components/PatternPageClient';

interface PatternPageProps {
  params: {
    id: string;
  };
}

const PatternPage = async ({ params }: PatternPageProps) => {
  const pattern = getPatternById(params.id);

  if (!pattern) {
    notFound();
  }

  // Pre-highlight Python variations
  const highlightedVariations = await Promise.all(
    pattern.variations.map(async (v: any) => {
      const templateResult = await highlightWithAnnotations(pattern.coreTemplate, 'python');
      const variationResult = await highlightWithAnnotations(v.fullCode, 'python');
      return { templateResult, variationResult };
    })
  );

  // Pre-highlight C++ variations if available
  let highlightedVariationsCpp: any[] = [];
  if (pattern.coreTemplateCpp) {
    highlightedVariationsCpp = await Promise.all(
      pattern.variations.map(async (v: any) => {
        const templateResult = await highlightWithAnnotations(pattern.coreTemplateCpp!, 'cpp');
        const variationResult = await highlightWithAnnotations(v.fullCodeCpp || '', 'cpp');
        return { templateResult, variationResult };
      })
    );
  }

  return (
    <PatternPageClient 
      pattern={pattern} 
      highlightedVariations={highlightedVariations}
      highlightedVariationsCpp={highlightedVariationsCpp}
    />
  );
};

export default PatternPage;
export const dynamic = 'force-static';
export const dynamicParams = true;
