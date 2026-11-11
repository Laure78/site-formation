/**
 * Extraction HowTo JSON-LD depuis le corps MDX (titres `## Étape N — …`).
 */
import { getHowToSchema } from '@/lib/seo';

function stripMarkdownInline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

/** Premier bloc de texte utile après un titre d'étape (paragraphe ou puces). */
function firstParagraphAfterStepHeading(
  lines: string[],
  startIndex: number,
): string {
  const chunks: string[] = [];
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      if (chunks.length > 0) break;
      continue;
    }
    if (/^#{1,3}\s/.test(line) || line.startsWith('<') || line.startsWith('>')) {
      if (chunks.length > 0) break;
      continue;
    }
    if (line.startsWith('```')) break;
    if (line.startsWith('- ') || line.startsWith('* ')) {
      chunks.push(stripMarkdownInline(line.replace(/^[-*]\s+/, '')));
      if (chunks.length >= 2) break;
      continue;
    }
    chunks.push(stripMarkdownInline(line));
    break;
  }
  return chunks.join(' ').trim();
}

export function extractHowToStepsFromMdxMarkdown(markdownBody: string): {
  name: string;
  text: string;
}[] {
  const lines = markdownBody.split('\n');
  const steps: { name: string; text: string }[] = [];
  const stepRe = /^##\s+Étape\s+(\d+)\s+—\s+(.+)$/;

  for (let i = 0; i < lines.length; i++) {
    const m = stepRe.exec(lines[i].trim());
    if (!m) continue;
    const name = `Étape ${m[1]} — ${stripMarkdownInline(m[2])}`;
    const text = firstParagraphAfterStepHeading(lines, i + 1);
    if (text) steps.push({ name, text });
  }
  return steps;
}

export function buildHowToSchemaFromMdxBody(args: {
  markdownBody: string;
  title: string;
  description: string;
  path: string;
}): Record<string, unknown> | null {
  const steps = extractHowToStepsFromMdxMarkdown(args.markdownBody);
  if (steps.length < 2) return null;
  return getHowToSchema({
    name: args.title,
    description: args.description,
    path: args.path,
    steps,
  });
}

/** Alias utilisé par `BlogMdxArticle`. */
export const buildMdxBlogHowToSchema = buildHowToSchemaFromMdxBody;
