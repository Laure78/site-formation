import { JsonLd } from '@/components/JsonLd';

type FAQSchemaItem = {
  question: string;
  answer: string;
};

type FAQSchemaProps = {
  items: FAQSchemaItem[];
  id?: string;
};

function toPlainSentence(text: string): string {
  const stripped = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!stripped) return '';
  return /[.!?…]$/.test(stripped) ? stripped : `${stripped}.`;
}

function optimizeLeadSentence(text: string): string {
  const clean = toPlainSentence(text);
  if (!clean) return '';
  const firstMatch = clean.match(/^(.+?[.!?…])\s*(.*)$/);
  if (!firstMatch) return clean;
  const first = firstMatch[1].trim();
  const rest = firstMatch[2].trim();
  const words = first.split(/\s+/);
  if (words.length <= 20) return clean;
  const shortFirst = `${words.slice(0, 20).join(' ')}.`;
  return rest ? `${shortFirst} ${rest}` : shortFirst;
}

export function FAQSchema({ items, id = 'schema-faq-page' }: FAQSchemaProps) {
  const entities = items
    .map((item) => ({
      question: item.question.trim(),
      answer: optimizeLeadSentence(item.answer),
    }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0)
    .map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }));

  const boundedEntities = entities.slice(0, 10);
  if (boundedEntities.length < 3) return null;

  return (
    <JsonLd
      id={id}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: boundedEntities,
      }}
    />
  );
}
