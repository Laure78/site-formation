/**
 * JSON-LD HowTo réutilisable — Prompt 3 (tutoriels / méthodes pas à pas)
 */

import { SITE_CONFIG } from '@/lib/seo';

export type HowToStep = { name: string; text: string; image?: string };

type Props = {
  name: string;
  description: string;
  totalTime: string;
  steps: HowToStep[];
};

export function SchemaHowTo({ name, description, totalTime, steps }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    step: steps.map((s, i) => {
      const step: Record<string, unknown> = {
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      };
      if (s.image) {
        step.image = s.image.startsWith('http')
          ? s.image
          : `${SITE_CONFIG.url}${s.image.startsWith('/') ? '' : '/'}${s.image}`;
      }
      return step;
    }),
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.url}/a-propos/`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
