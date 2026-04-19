export interface CodeSegment {
  code: string;
  type: 'core' | 'variation';
  explanation?: string;
}

export interface VariationProblem {
  id: string;
  title: string;
  title_zh?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  leetcodeUrl?: string;
  description: string;
  description_zh?: string;
  coreLogic: string;
  adaptationLogic: string;
  explanation: string;
  explanation_zh?: string;
  fullCode: string; // The complete code for this variation
}

export interface AlgorithmPattern {
  id: string;
  name: string;
  name_zh?: string;
  category: string;
  description: string;
  description_zh?: string;
  imageUrl?: string;
  complexity: {
    time: string;
    space: string;
  };
  coreTemplate: string;
  variations: VariationProblem[];
}
