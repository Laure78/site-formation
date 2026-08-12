import { PillarTableOfContents, type PillarTocItem } from '@/components/pillar/PillarTableOfContents';

/** Ordre aligné sur le parcours de la page pilier. */
const ITEMS: PillarTocItem[] = [
  { label: 'En chiffres', anchor: 'en-chiffres' },
  { label: 'En bref', anchor: 'en-bref' },
  { label: '5 interfaces', anchor: 'tableau-interfaces' },
  { label: 'Visuels interfaces', anchor: 'interfaces-visuels' },
  { label: '3 skills gratuits', anchor: 'lead-magnet-claude-skills' },
  { label: 'Tutoriel skill', anchor: 'tutoriel-skill-claude-btp' },
  { label: 'Ressources par interface', anchor: 'ressources-interfaces' },
  { label: 'Gains de temps', anchor: 'gains-temps' },
  { label: 'Prompts', anchor: 'prompts' },
  { label: 'Limites', anchor: 'limites' },
  { label: 'Études de cas', anchor: 'etudes-cas' },
  { label: 'Claude bâtiment', anchor: 'claude-ai-batiment' },
  { label: 'Claude travaux publics', anchor: 'claude-ai-travaux-publics' },
  { label: 'Fiches formation', anchor: 'fiches-formation-claude' },
  { label: 'Formation IDF', anchor: 'formation-claude-idf' },
  { label: 'FAQ', anchor: 'faq-claude' },
  { label: 'Ressources blog', anchor: 'cluster' },
];

export function ClaudeAiBtpTableOfContents() {
  return <PillarTableOfContents items={ITEMS} instanceId="claude-btp" />;
}
