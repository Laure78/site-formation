import type { ProspectRow } from './types';

/** Remplace {{prenom}}, {{entreprise}}, etc. — n’invente rien. */
export function fillTemplate(
  template: string,
  prospect: Pick<
    ProspectRow,
    'prenom' | 'nom' | 'entreprise' | 'fonction' | 'ville' | 'departement' | 'type_structure'
  >
): string {
  const map: Record<string, string> = {
    prenom: prospect.prenom?.trim() || '',
    nom: prospect.nom?.trim() || '',
    entreprise: prospect.entreprise?.trim() || 'votre structure',
    fonction: prospect.fonction?.trim() || '',
    ville: prospect.ville?.trim() || '',
    departement: prospect.departement?.trim() || '',
    type_structure: prospect.type_structure?.trim() || '',
  };

  return template.replace(/\{\{\s*([a-z_]+)\s*\}\}/gi, (_, key: string) => {
    const v = map[key.toLowerCase()];
    return v != null && v !== '' ? v : '…';
  });
}

export function buildAiPromptContext(prospect: ProspectRow, historySummary: string): string {
  const lines: string[] = [
    'Tu rédiges un email de prospection B2B pour Laure Olivié (formation IA pour le BTP, Qualiopi).',
    'Règles : court, humain, direct, sans jargon commercial. Ne jamais inventer une info absente.',
    'Éviter « Je me permets de vous contacter ». Pas de long discours générique sur l’IA.',
    'Réponds UNIQUEMENT en JSON : {"subject":"...","body":"..."}',
    '',
    'Profil prospect (n’utiliser que ce qui est rempli) :',
  ];

  const fields: [string, string | null | undefined][] = [
    ['Prénom', prospect.prenom],
    ['Nom', prospect.nom],
    ['Fonction', prospect.fonction],
    ['Email', prospect.email],
    ['Entreprise', prospect.entreprise],
    ['Type de structure', prospect.type_structure],
    ['Ville', prospect.ville],
    ['Département', prospect.departement],
    ['Région', prospect.region],
    ['Taille', prospect.taille_entreprise ?? prospect.effectif_approx],
    ['Corps de métier', prospect.corps_metier],
    ['Besoins', (prospect.besoins_identifies ?? []).join(', ') || null],
    ['Notes', prospect.notes_crm],
  ];

  for (const [label, value] of fields) {
    if (value && String(value).trim()) {
      lines.push(`- ${label} : ${String(value).trim()}`);
    }
  }

  if (historySummary.trim()) {
    lines.push('', 'Historique connu (ne pas inventer d’autres échanges) :', historySummary.trim());
  } else {
    lines.push('', 'Aucun historique d’échange enregistré.');
  }

  const structure = (prospect.type_structure ?? '').toLowerCase();
  if (structure.includes('ffb') || structure === 'federation') {
    lines.push(
      '',
      'Angle FFB : besoins des adhérents, artisans, PME, ateliers pratiques, sensibilisation IA métier.'
    );
  } else if (structure === 'cci') {
    lines.push(
      '',
      'Angle CCI : transformation numérique TPE/PME, montée en compétences, ateliers collectifs, productivité.'
    );
  } else if (structure === 'cma') {
    lines.push(
      '',
      'Angle CMA : artisans, simplicité, devis, admin, communication, apprentissage pratique.'
    );
  } else if (structure === 'france_num' || structure.includes('france_num')) {
    lines.push(
      '',
      'Angle France Num : activateurs, accompagnement TPE/PME à la transformation numérique, partenariats réseau, formations pratiques IA métier (BTP).'
    );
  } else {
    lines.push(
      '',
      'Angle entreprise BTP : devis, CR chantier, conducteurs de travaux, DCE/AO, chiffrage, admin, automatisation, gain de temps. Cas d’usage concrets uniquement.'
    );
  }

  return lines.join('\n');
}
