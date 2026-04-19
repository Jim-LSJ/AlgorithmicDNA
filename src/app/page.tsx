import React from 'react';
import { allPatterns } from '@/data/patterns';
import HomeClient from '@/components/HomeClient';

export default function Home() {
  const totalVariations = allPatterns.reduce((acc, p) => acc + p.variations.length, 0);
  
  return <HomeClient patterns={allPatterns} totalVariations={totalVariations} />;
}
