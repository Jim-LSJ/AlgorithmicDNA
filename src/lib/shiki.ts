import { createHighlighter, ShikiTransformer } from 'shiki';

let highlighter: any = null;

export interface Annotation {
  id: string;
  type: 'core' | 'new' | 'mod';
  text: string;
  explanation: string;
  explanation_zh: string;
}

export async function highlightWithAnnotations(code: string, lang: string = 'python', theme: string = 'github-dark') {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [theme],
      langs: [lang],
    });
  }

  const annotations: Annotation[] = [];
  let counter = 0;

  // 1. Extract annotations and replace with markers
  // Syntax: [[type|code|explanation_en|explanation_zh]]
  const processedCode = code.replace(/\[\[(core|new|mod)\|(.+?)\|(.+?)\|(.+?)\]\]/g, (match, type, text, expEn, expZh) => {
    const id = `anno-${counter++}`;
    annotations.push({ 
      id, 
      type: type as any, 
      text, 
      explanation: expEn, 
      explanation_zh: expZh 
    });
    return `___START___${type}___${id}___${text}___END___`;
  });

  let html = await highlighter.codeToHtml(processedCode, {
    lang,
    theme,
  });

  // Now replace the markers in the HTML. 
  // We use a tag-agnostic regex for both the markers AND the content between them.
  const tagAgnostic = (str: string) => str.split('').map(c => {
    const escaped = c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return `${escaped}(?:<[^>]+>)*`;
  }).join('');

  annotations.forEach(anno => {
    const startStr = `___START___${anno.type}___${anno.id}___`;
    const endStr = `___END___`;
    
    // We need to match the start marker, the inner content, and the end marker,
    // all while allowing for potential HTML tags to be interspersed.
    const startPattern = tagAgnostic(startStr);
    const endPattern = tagAgnostic(endStr);
    
    // Match start marker (tag-agnostic), then everything (including tags), then end marker (tag-agnostic)
    const fullRegex = new RegExp(`${startPattern}([^]*?)${endPattern}`, 'g');
    
    html = html.replace(fullRegex, (match: string, innerContent: string) => {
      const typeClass = `anno-` + anno.type;
      return `<span class="anno-trigger ${typeClass}" data-anno-id="${anno.id}">${innerContent}</span>`;
    });
  });

  return { html, annotations };
}
