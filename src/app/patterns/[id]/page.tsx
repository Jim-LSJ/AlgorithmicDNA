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

  // Pre-highlight all variations on the server
  const highlightedVariations = await Promise.all(
    pattern.variations.map(async (v: any) => {
      const templateResult = await highlightWithAnnotations(pattern.coreTemplate);
      const variationResult = await highlightWithAnnotations(v.fullCode);
      return { templateResult, variationResult };
    })
  );

  return (
    <PatternPageClient 
      pattern={pattern} 
      highlightedVariations={highlightedVariations} 
    />
  );
};

export default PatternPage;
export const dynamic = 'force-static';
export const dynamicParams = true;
