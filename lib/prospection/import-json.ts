import {
  PROSPECTION_STATUTS,
  TYPE_STRUCTURES,
  type ProspectionStatut,
  type TypeStructure,
} from './constants';

/** Bloc source global du JSON d’import. */
export type ImportSourceMeta = {
  event?: string;
  organizer?: string;
  location?: string;
  event_date?: string;
  source_email_date?: string;
  [key: string]: unknown;
};

/** Prospect normalisé issu d’un import JSON (avant insert / merge). */
export type ProspectImportDraft = {
  prenom: string;
  nom: string;
  email: string | null;
  telephone?: string | null;
  entreprise?: string | null;
  fonction?: string | null;
  linkedin_url?: string | null;
  site_web?: string | null;
  ville?: string | null;
  departement?: string | null;
  department_name?: string | null;
  region?: string | null;
  type_structure?: string | null;
  prospect_type?: string | null;
  taille_entreprise?: string | null;
  corps_metier?: string | null;
  effectif_approx?: string | null;
  besoins_identifies?: string[];
  formations_interessees?: string[];
  tags?: string[];
  source_prospect?: string | null;
  notes_crm?: string | null;
  statut?: string | null;
  prochaine_relance_at?: string | null;
  source_metadata?: ImportSourceMeta | null;
  /** Index dans le tableau d’origine */
  rowIndex: number;
};

export type DuplicateMode = 'ignore' | 'merge_missing' | 'update';

export type AnalyzedProspectRow = {
  draft: ProspectImportDraft;
  status: 'new' | 'duplicate' | 'error';
  error?: string;
  existingId?: string;
  existingLabel?: string;
  defaultMode: DuplicateMode;
};

export type AnalyzeImportResult = {
  ok: true;
  source: ImportSourceMeta | null;
  rows: AnalyzedProspectRow[];
  counts: {
    detected: number;
    news: number;
    duplicates: number;
    errors: number;
  };
};

type Raw = Record<string, unknown>;

function stripAccents(s: string) {
  return s.normalize('NFD').replace(/\p{M}/gu, '');
}

function pick(raw: Raw, keys: string[]): string | undefined {
  const lower = new Map(
    Object.keys(raw).map((k) => [stripAccents(k.toLowerCase()), k])
  );
  for (const key of keys) {
    const orig = lower.get(stripAccents(key.toLowerCase()));
    if (!orig) continue;
    const v = raw[orig];
    if (v == null) continue;
    const s = String(v).trim();
    if (s) return s;
  }
  return undefined;
}

function pickArray(raw: Raw, keys: string[]): string[] | undefined {
  const lower = new Map(
    Object.keys(raw).map((k) => [stripAccents(k.toLowerCase()), k])
  );
  for (const key of keys) {
    const orig = lower.get(stripAccents(key.toLowerCase()));
    if (!orig) continue;
    const v = raw[orig];
    if (Array.isArray(v)) {
      return v.map((x) => String(x).trim()).filter(Boolean);
    }
    if (typeof v === 'string' && v.trim()) {
      return v
        .split(/[,;|]/)
        .map((x) => x.trim())
        .filter(Boolean);
    }
  }
  return undefined;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mapStatut(raw?: string): ProspectionStatut {
  if (!raw) return 'a_contacter';
  const n = stripAccents(raw.trim().toLowerCase());
  const byValue = PROSPECTION_STATUTS.find((s) => s.value === n);
  if (byValue) return byValue.value;
  const byLabel = PROSPECTION_STATUTS.find(
    (s) => stripAccents(s.label.toLowerCase()) === n
  );
  if (byLabel) return byLabel.value;
  const aliases: Record<string, ProspectionStatut> = {
    'a contacter': 'a_contacter',
    nouveau: 'a_contacter',
    'email envoye': 'email_envoye',
    'a relancer': 'a_relancer',
    relance: 'relance',
    'reponse recue': 'reponse_recue',
    'rendez-vous prevu': 'rdv_prevu',
    'rdv prevu': 'rdv_prevu',
    rdv: 'rdv_prevu',
    opportunite: 'opportunite',
    client: 'client',
    'pas interesse': 'pas_interesse',
    'a recontacter plus tard': 'a_recontacter',
  };
  return aliases[n] ?? 'a_contacter';
}

function mapTypeStructure(raw?: string): TypeStructure | null {
  if (!raw) return null;
  const n = stripAccents(raw.trim().toLowerCase());
  const byValue = TYPE_STRUCTURES.find((t) => t.value === n);
  if (byValue) return byValue.value;
  const byLabel = TYPE_STRUCTURES.find(
    (t) => stripAccents(t.label.toLowerCase()) === n
  );
  if (byLabel) return byLabel.value;
  const aliases: Record<string, TypeStructure> = {
    'france num': 'france_num',
    francerum: 'france_num',
    cci: 'cci',
    cma: 'cma',
    ffb: 'ffb',
    'entreprise btp': 'entreprise_btp',
    'pme btp': 'pme_btp',
    btp: 'entreprise_btp',
    institutionnel: 'autre',
  };
  return aliases[n] ?? 'autre';
}

function mapDepartement(raw?: string): string | null {
  if (!raw) return null;
  const m = raw.match(/\b(7[578]|9[1-5])\b/);
  if (m) return m[1]!;
  const cleaned = raw.replace(/\D/g, '');
  if (/^(7[578]|9[1-5])$/.test(cleaned)) return cleaned;
  return raw.trim().slice(0, 32) || null;
}

function parseDateIso(raw?: string): string | null {
  if (!raw?.trim()) return null;
  const d = new Date(raw.trim());
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function normalizeSourceMeta(raw: unknown): ImportSourceMeta | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const o = raw as Raw;
  const meta: ImportSourceMeta = {};
  const event = pick(o, ['event', 'evenement', 'événement', 'name', 'nom']);
  const organizer = pick(o, ['organizer', 'organisateur']);
  const location = pick(o, ['location', 'lieu', 'place']);
  const event_date = pick(o, ['event_date', 'date', 'date_evenement', 'date_événement']);
  const source_email_date = pick(o, ['source_email_date', 'email_date']);
  if (event) meta.event = event;
  if (organizer) meta.organizer = organizer;
  if (location) meta.location = location;
  if (event_date) meta.event_date = event_date;
  if (source_email_date) meta.source_email_date = source_email_date;
  // conserver clés inconnues utiles
  for (const [k, v] of Object.entries(o)) {
    if (!(k in meta) && v != null && typeof v !== 'object') {
      meta[k] = v;
    }
  }
  return Object.keys(meta).length ? meta : null;
}

function buildSourceLabel(
  draftSource: string | undefined,
  global: ImportSourceMeta | null
): string | null {
  if (draftSource?.trim()) return draftSource.trim();
  if (!global) return null;
  const parts = [
    global.event,
    global.location ? `– ${global.location}` : null,
    global.event_date
      ? `– ${new Date(global.event_date).toLocaleDateString('fr-FR')}`
      : null,
  ].filter(Boolean);
  return parts.length ? parts.join(' ') : null;
}

export function normalizeProspectRaw(
  entry: Raw,
  rowIndex: number,
  globalSource: ImportSourceMeta | null
): { ok: true; draft: ProspectImportDraft } | { ok: false; error: string; draft?: ProspectImportDraft } {
  const prenom = pick(entry, [
    'first_name',
    'firstname',
    'firstName',
    'prenom',
    'prénom',
  ]);
  const nom = pick(entry, ['last_name', 'lastname', 'lastName', 'nom', 'name']);
  const emailRaw = pick(entry, ['email', 'mail', 'e-mail', 'courriel']);

  if (!prenom || !nom) {
    return { ok: false, error: 'prénom et nom obligatoires' };
  }

  let email: string | null = emailRaw ? emailRaw.toLowerCase() : null;
  if (email && !isValidEmail(email)) {
    return {
      ok: false,
      error: 'email invalide',
      draft: {
        prenom,
        nom,
        email,
        rowIndex,
        entreprise: pick(entry, ['company', 'entreprise', 'societe', 'société', 'structure']),
      },
    };
  }

  const category = pick(entry, [
    'category',
    'categorie',
    'catégorie',
    'type_structure',
  ]);
  const prospectType = pick(entry, [
    'prospect_type',
    'type_prospect',
    'typeProspect',
  ]);
  const deptRaw = pick(entry, [
    'department',
    'departement',
    'département',
    'dept',
    'dpt',
  ]);
  const deptName = pick(entry, [
    'department_name',
    'nom_departement',
    'département_nom',
  ]);

  const sourceLocal = pick(entry, ['source', 'source_prospect', 'origine']);
  const draft: ProspectImportDraft = {
    prenom,
    nom,
    email,
    telephone: pick(entry, ['phone', 'telephone', 'téléphone', 'tel', 'mobile']) ?? null,
    entreprise:
      pick(entry, [
        'company',
        'entreprise',
        'societe',
        'société',
        'structure',
        'organisation',
      ]) ?? null,
    fonction: pick(entry, ['job_title', 'fonction', 'poste', 'titre', 'title', 'role']) ?? null,
    linkedin_url: pick(entry, ['linkedin', 'linkedin_url', 'linkedinUrl']) ?? null,
    site_web: pick(entry, ['website', 'site_web', 'site', 'url']) ?? null,
    ville: pick(entry, ['city', 'ville']) ?? null,
    departement: mapDepartement(deptRaw),
    department_name: deptName ?? null,
    region: pick(entry, ['region', 'région']) ?? 'Île-de-France',
    type_structure: mapTypeStructure(category ?? prospectType),
    prospect_type: prospectType ?? null,
    besoins_identifies: pickArray(entry, ['needs', 'besoins', 'besoins_identifies']) ?? [],
    tags: pickArray(entry, ['tags', 'labels', 'etiquettes']) ?? [],
    source_prospect: buildSourceLabel(sourceLocal, globalSource),
    notes_crm: pick(entry, ['notes', 'notes_crm', 'note', 'commentaire']) ?? null,
    statut: mapStatut(pick(entry, ['status', 'statut', 'etat', 'état'])),
    prochaine_relance_at: parseDateIso(
      pick(entry, [
        'next_follow_up_date',
        'prochaine_relance',
        'prochaine_relance_at',
        'relance',
      ])
    ),
    source_metadata: globalSource,
    rowIndex,
  };

  return { ok: true, draft };
}

/** Parse le JSON brut (sans accès BDD). */
export function parseImportJsonBlock(rawText: string):
  | {
      ok: true;
      source: ImportSourceMeta | null;
      drafts: ProspectImportDraft[];
      rowErrors: { rowIndex: number; error: string; label?: string }[];
    }
  | { ok: false; error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText.trim());
  } catch {
    return { ok: false, error: 'JSON invalide — vérifiez les virgules et les guillemets.' };
  }

  let list: unknown[];
  let source: ImportSourceMeta | null = null;

  if (Array.isArray(parsed)) {
    list = parsed;
  } else if (parsed && typeof parsed === 'object') {
    const obj = parsed as Raw;
    source = normalizeSourceMeta(obj.source ?? obj.meta ?? obj.metadata);
    const nested = obj.prospects ?? obj.contacts ?? obj.data ?? obj.items;
    if (!Array.isArray(nested)) {
      return {
        ok: false,
        error: 'Attendu un tableau [...] ou un objet { "prospects": [...] }.',
      };
    }
    list = nested;
  } else {
    return { ok: false, error: 'Format JSON non reconnu.' };
  }

  if (list.length === 0) {
    return { ok: false, error: 'Le tableau "prospects" est vide.' };
  }
  if (list.length > 500) {
    return { ok: false, error: 'Maximum 500 prospects par import.' };
  }

  const drafts: ProspectImportDraft[] = [];
  const rowErrors: { rowIndex: number; error: string; label?: string }[] = [];

  list.forEach((entry, i) => {
    if (!entry || typeof entry !== 'object') {
      rowErrors.push({ rowIndex: i, error: 'objet attendu' });
      return;
    }
    const res = normalizeProspectRaw(entry as Raw, i, source);
    if (!res.ok) {
      rowErrors.push({
        rowIndex: i,
        error: res.error,
        label: res.draft
          ? `${res.draft.prenom} ${res.draft.nom}`
          : `Ligne ${i + 1}`,
      });
      return;
    }
    drafts.push(res.draft);
  });

  return { ok: true, source, drafts, rowErrors };
}

/** @deprecated — compat composant simple */
export function parseProspectsJsonBlock(rawText: string):
  | { ok: true; items: ProspectImportDraft[] }
  | { ok: false; error: string } {
  const r = parseImportJsonBlock(rawText);
  if (!r.ok) return r;
  if (r.drafts.length === 0) {
    return {
      ok: false,
      error:
        r.rowErrors
          .slice(0, 3)
          .map((e) => `${e.label ?? `Ligne ${e.rowIndex + 1}`} : ${e.error}`)
          .join(' · ') || 'Aucun prospect valide.',
    };
  }
  return { ok: true, items: r.drafts };
}

export const PROSPECTS_JSON_EXAMPLE = `{
  "source": {
    "event": "Café Activateurs France Num",
    "organizer": "France Num et CCI Paris Île-de-France",
    "location": "CCI de Versailles",
    "event_date": "2025-06-10",
    "source_email_date": "2025-06-20"
  },
  "prospects": [
    {
      "first_name": "Tony",
      "last_name": "Grego",
      "email": "tony.grego@finances.gouv.fr",
      "company": "France Num",
      "job_title": "Responsable des activateurs",
      "category": "France Num",
      "prospect_type": "Institutionnel",
      "region": "Île-de-France",
      "status": "À contacter",
      "source": "Café Activateurs France Num – CCI Versailles – 10/06/2025"
    }
  ]
}`;
