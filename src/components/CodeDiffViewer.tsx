import React from 'react';
import { highlightWithAnnotations } from '@/lib/shiki';
import CodeDiffViewerClient from './CodeDiffViewerClient';

interface CodeDiffViewerProps {
  templateCode: string;
  variationCode: string;
  explanation: string;
  coreLogic: string;
  adaptationLogic: string;
}

const CodeDiffViewer = async ({ 
  templateCode, 
  variationCode, 
  explanation,
  coreLogic,
  adaptationLogic 
}: CodeDiffViewerProps) => {
  const templateResult = await highlightWithAnnotations(templateCode);
  const variationResult = await highlightWithAnnotations(variationCode);

  return (
    <CodeDiffViewerClient 
      templateResult={templateResult}
      variationResult={variationResult}
      explanation={explanation}
      coreLogic={coreLogic}
      adaptationLogic={adaptationLogic}
    />
  );
};

export default CodeDiffViewer;
