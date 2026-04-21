import { PillarTableOfContents, type PillarTocItem } from '@/components/pillar/PillarTableOfContents';

const ITEMS: PillarTocItem[] = [
  { label: 'En chiffres', anchor: 'en-chiffres' },
  { label: 'Tutoriel skill', anchor: 'tutoriel-skill-claude-btp' },
  { label: '5 interfaces', anchor: 'tableau-interfaces' },
  { label: 'Visuels interfaces', anchor: 'interfaces-visuels' },
  { label: 'Ressources par interface', anchor: 'ressources-interfaces' },
  { label: 'Gains de temps', anchor: 'gains-temps' },
  { label: 'Prompts', anchor: 'prompts' },
  { label: 'Limites', anchor: 'limites' },
  { label: 'Études de cas', anchor: 'etudes-cas' },
  { label: 'FAQ', anchor: 'faq-claude' },
  { label: 'Questions connexes', anchor: 'faq-connexes' },
  { label: 'Ressources approfondies', anchor: 'cluster' },
];

/**
 * Sommaire — sticky desktop, accordéon mobile, surbrillance section au scroll si disponible.
 */
export function ClaudeAiBtpTableOfContents() {
  return <PillarTableOfContents items={ITEMS} instanceId="claude-btp" />;
}
