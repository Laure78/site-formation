/**
 * JSON-LD pages tuto `/ressources/[slug]` — HowTo + BreadcrumbList + FAQPage (si FAQ) + auteur.
 */
import { LINKS } from '@/lib/internal-links';
import { SITE_CONFIG } from '@/lib/seo';
import type { TutoData } from '@/lib/tutos/types';

const SITE_BASE = SITE_CONFIG.url.replace(/\/$/, '');

function authorPersonNode() {
  return {
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: `${SITE_BASE}${LINKS.aPropos}`,
    affiliation: {
      '@type': 'Organization',
      name: SITE_CONFIG.legalName,
      url: SITE_CONFIG.url,
    },
  };
}

function stepText(tuto: TutoData, stepIndex: number): string {
  const s = tuto.steps[stepIndex];
  if (!s) return '';
  if (s.intro?.trim()) return s.intro.trim();
  const para = s.blocks.find((b) => b.kind === 'paragraph');
  if (para && para.kind === 'paragraph') return para.text;
  return s.title;
}

export function buildRessourceTutoJsonLd(tuto: TutoData): Record<string, unknown> {
  const url = `${SITE_BASE}${LINKS.ressources}/${tuto.slug}`;
  const author = authorPersonNode();
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: tuto.title,
      description: tuto.metaDescription,
      inLanguage: 'fr-FR',
      totalTime: `PT${tuto.totalTimeMinutes}M`,
      author,
      step: tuto.steps.map((s, idx) => ({
        '@type': 'HowToStep',
        position: s.number,
        name: s.title,
        text: stepText(tuto, idx),
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_BASE },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Ressources',
          item: `${SITE_BASE}${LINKS.ressources}`,
        },
        { '@type': 'ListItem', position: 3, name: tuto.title, item: url },
      ],
    },
  ];

  if (tuto.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: tuto.faq.map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
