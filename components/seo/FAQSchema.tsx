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

export function FAQSchema({ items, id = 'schema-faq-page' }: FAQSchemaProps) {
  const entities = items
    .map((item) => ({
      question: item.question.trim(),
      answer: toPlainSentence(item.answer),
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

  if (entities.length === 0) return null;

  return (
    <JsonLd
      id={id}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: entities,
      }}
    />
  );
}
