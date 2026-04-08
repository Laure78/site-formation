/**
 * Réponses FAQ : texte pour JSON-LD (sans balises HTML).
 * Les réponses peuvent contenir des <a href="..."> dans lib/faq.ts (contenu maîtrisé).
 */

export function faqAnswerPlainTextForSchema(html: string): string {
  if (!html.includes('<')) return html;
  return html
    .replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi, '$2 ($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
