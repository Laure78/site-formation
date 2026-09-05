/**
 * Templates email RDV (confirmation client, notif Laure, rappel J-1).
 * HTML table-based, mobile-first, sobre — couleur primaire #377CF3 avec parcimonie.
 */

import { CONTACT } from '@/lib/constants';
import {
  RDV_ECHEANCES,
  RDV_FONCTIONS,
  RDV_NIVEAUX_IA,
  RDV_PERSONNES,
  RDV_TAILLES,
  labelFor,
  labelsForBesoins,
} from '@/lib/rdv-form-options';
import { formatRdvDateLong, formatRdvTime } from '@/lib/rdv-datetime';

const ACCENT = '#377CF3';
const TEXT = '#0f172a';
const MUTED = '#64748b';

export type RdvEmailContext = {
  prenom: string;
  nom: string;
  email: string;
  telephone?: string | null;
  entreprise: string;
  fonction?: string | null;
  taille?: string | null;
  besoins: string[];
  prioriteAo?: string | null;
  personnesConcernees?: string | null;
  niveauIa?: string | null;
  echeance?: string | null;
  probleme?: string | null;
  startAt: string;
  endAt: string;
  dureeMinutes?: number;
  meetLink?: string | null;
  typeRdv?: 'visio' | 'telephone';
  manageUrl?: string | null;
  icsUrl?: string | null;
  googleCalUrl?: string | null;
  sourcePage?: string | null;
  utm?: string | null;
};

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function btn(href: string, label: string, primary = false): string {
  const bg = primary ? ACCENT : '#ffffff';
  const color = primary ? '#ffffff' : ACCENT;
  const border = primary ? ACCENT : '#cbd5e1';
  return `<a href="${esc(href)}" style="display:inline-block;margin:4px 8px 4px 0;padding:12px 18px;border-radius:8px;background:${bg};color:${color};border:1px solid ${border};text-decoration:none;font-weight:600;font-size:14px;line-height:1.2;">${esc(label)}</a>`;
}

function shell(title: string, body: string, preheader?: string): string {
  const pre = preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>`
    : '';
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f2f2f2;font-family:Arial,Helvetica,sans-serif;color:${TEXT};">
${pre}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;padding:24px 12px;">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
      <tr><td style="padding:20px 24px;border-bottom:3px solid ${ACCENT};">
        <p style="margin:0;font-size:18px;font-weight:700;color:${TEXT};">Laure Olivié</p>
        <p style="margin:4px 0 0;font-size:13px;color:${MUTED};">Formation IA pour le BTP</p>
      </td></tr>
      <tr><td style="padding:28px 24px;">
        <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;color:${TEXT};">${esc(title)}</h1>
        ${body}
      </td></tr>
      <tr><td style="padding:16px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;">
        <p style="margin:0;font-size:12px;color:${MUTED};line-height:1.5;">
          Laure Olivié — OFC Création d'Entreprise<br/>
          <a href="mailto:${CONTACT.email}" style="color:${ACCENT};">${CONTACT.email}</a>
          · <a href="https://www.laureolivie.fr" style="color:${ACCENT};">www.laureolivie.fr</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function slotBox(ctx: RdvEmailContext): string {
  const date = formatRdvDateLong(ctx.startAt);
  const time = formatRdvTime(ctx.startAt);
  const duree = ctx.dureeMinutes ?? 30;
  const lieu =
    ctx.typeRdv === 'telephone'
      ? `Appel téléphonique${ctx.telephone ? ` — ${esc(ctx.telephone)}` : ''}`
      : ctx.meetLink
        ? `<a href="${esc(ctx.meetLink)}" style="color:${ACCENT};font-weight:600;">Rejoindre la visio</a>`
        : 'Visio (lien dans l’invitation calendrier)';

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;">
    <tr><td style="padding:16px 18px;">
      <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:${MUTED};font-weight:700;">Date</p>
      <p style="margin:4px 0 12px;font-size:18px;font-weight:700;color:${TEXT};text-transform:capitalize;">${esc(date)}</p>
      <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:${MUTED};font-weight:700;">Heure</p>
      <p style="margin:4px 0 12px;font-size:18px;font-weight:700;color:${TEXT};">${esc(time)} <span style="font-size:13px;font-weight:500;color:${MUTED};">(${duree} min)</span></p>
      <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:${MUTED};font-weight:700;">Lien / modalité</p>
      <p style="margin:4px 0 0;font-size:15px;color:${TEXT};">${lieu}</p>
    </td></tr>
  </table>`;
}

function actionButtons(ctx: RdvEmailContext, opts?: { meetPrimary?: boolean }): string {
  const parts: string[] = [];
  if (opts?.meetPrimary && ctx.meetLink) {
    parts.push(btn(ctx.meetLink, 'Accéder au rendez-vous', true));
  }
  if (ctx.googleCalUrl) parts.push(btn(ctx.googleCalUrl, 'Ajouter au calendrier', !opts?.meetPrimary));
  if (ctx.icsUrl) parts.push(btn(ctx.icsUrl, 'Fichier calendrier (.ics)'));
  if (ctx.manageUrl) {
    parts.push(btn(`${ctx.manageUrl}?action=modifier`, 'Modifier mon rendez-vous'));
    parts.push(btn(`${ctx.manageUrl}?action=annuler`, 'Annuler mon rendez-vous'));
  }
  if (!parts.length) return '';
  return `<p style="margin:20px 0 0;">${parts.join('')}</p>`;
}

function besoinsList(ctx: RdvEmailContext): string {
  const labels = labelsForBesoins(ctx.besoins);
  if (!labels.length) return '—';
  return labels.map((l) => `• ${esc(l)}`).join('<br/>');
}

export function buildClientConfirmationEmail(ctx: RdvEmailContext): {
  subject: string;
  preheader: string;
  html: string;
} {
  const subject = 'Votre rendez-vous avec Laure Olivié est confirmé';
  const preheader = 'Toutes les informations pour préparer notre échange IA BTP.';
  const priorite = ctx.probleme?.trim()
    ? `<p style="margin:16px 0 0;"><strong>Votre priorité :</strong><br/>${esc(ctx.probleme.trim())}</p>`
    : '';

  const body = `
    <p style="margin:0 0 12px;font-size:15px;line-height:1.55;">Bonjour ${esc(ctx.prenom)},</p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.55;">Merci pour votre prise de rendez-vous.</p>
    <p style="margin:0;font-size:15px;line-height:1.55;">Notre échange est confirmé :</p>
    ${slotBox(ctx)}
    <p style="margin:16px 0 0;font-size:15px;line-height:1.55;"><strong>Nous parlerons notamment de :</strong><br/>${besoinsList(ctx)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;font-size:14px;line-height:1.5;">
      <tr><td style="padding:2px 0;color:${MUTED};width:140px;">Entreprise</td><td>${esc(ctx.entreprise)}</td></tr>
      <tr><td style="padding:2px 0;color:${MUTED};">Fonction</td><td>${esc(labelFor(RDV_FONCTIONS, ctx.fonction))}</td></tr>
      <tr><td style="padding:2px 0;color:${MUTED};">Taille</td><td>${esc(labelFor(RDV_TAILLES, ctx.taille))}</td></tr>
      <tr><td style="padding:2px 0;color:${MUTED};">Niveau IA</td><td>${esc(labelFor(RDV_NIVEAUX_IA, ctx.niveauIa))}</td></tr>
      ${ctx.personnesConcernees ? `<tr><td style="padding:2px 0;color:${MUTED};">Personnes concernées</td><td>${esc(labelFor(RDV_PERSONNES, ctx.personnesConcernees))}</td></tr>` : ''}
      <tr><td style="padding:2px 0;color:${MUTED};">Échéance</td><td>${esc(labelFor(RDV_ECHEANCES, ctx.echeance))}</td></tr>
    </table>
    ${priorite}
    <p style="margin:20px 0 0;font-size:15px;line-height:1.55;">Pour préparer notre échange, vous pouvez simplement identifier :</p>
    <ul style="margin:8px 0 0;padding-left:18px;font-size:15px;line-height:1.55;">
      <li>une tâche répétitive qui vous fait perdre du temps ;</li>
      <li>un document ou processus que vous aimeriez améliorer ;</li>
      <li>un exemple concret sur lequel nous pourrions travailler.</li>
    </ul>
    <p style="margin:12px 0 0;font-size:15px;line-height:1.55;">Aucune préparation supplémentaire n’est nécessaire.</p>
    ${actionButtons(ctx)}
    <p style="margin:24px 0 0;font-size:15px;line-height:1.55;">À bientôt,<br/><strong>Laure Olivié</strong><br/>Formatrice IA pour le BTP</p>
  `;

  return { subject, preheader, html: shell(subject, body, preheader) };
}

export function buildLaureNotificationEmail(ctx: RdvEmailContext): {
  subject: string;
  html: string;
} {
  const subject = `Nouveau RDV — ${ctx.entreprise} — ${ctx.prenom} ${ctx.nom}`;
  const body = `
    <p style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:0.06em;color:${ACCENT};">NOUVEAU RENDEZ-VOUS</p>
    ${slotBox(ctx)}
    <h2 style="margin:20px 0 8px;font-size:15px;color:${TEXT};">Prospect</h2>
    <table role="presentation" width="100%" style="font-size:14px;line-height:1.5;">
      <tr><td style="padding:2px 0;color:${MUTED};width:140px;">Nom</td><td>${esc(ctx.prenom)} ${esc(ctx.nom)}</td></tr>
      <tr><td style="padding:2px 0;color:${MUTED};">Entreprise</td><td>${esc(ctx.entreprise)}</td></tr>
      <tr><td style="padding:2px 0;color:${MUTED};">Fonction</td><td>${esc(labelFor(RDV_FONCTIONS, ctx.fonction))}</td></tr>
      <tr><td style="padding:2px 0;color:${MUTED};">Email</td><td><a href="mailto:${esc(ctx.email)}">${esc(ctx.email)}</a></td></tr>
      <tr><td style="padding:2px 0;color:${MUTED};">Téléphone</td><td>${esc(ctx.telephone || '—')}</td></tr>
    </table>
    <h2 style="margin:20px 0 8px;font-size:15px;color:${TEXT};">Entreprise</h2>
    <table role="presentation" width="100%" style="font-size:14px;line-height:1.5;">
      <tr><td style="padding:2px 0;color:${MUTED};width:140px;">Taille</td><td>${esc(labelFor(RDV_TAILLES, ctx.taille))}</td></tr>
      <tr><td style="padding:2px 0;color:${MUTED};">Personnes concernées</td><td>${esc(labelFor(RDV_PERSONNES, ctx.personnesConcernees))}</td></tr>
    </table>
    <h2 style="margin:20px 0 8px;font-size:15px;color:${TEXT};">Besoin</h2>
    <p style="margin:0;font-size:14px;line-height:1.55;">${besoinsList(ctx)}</p>
    ${ctx.prioriteAo ? `<p style="margin:8px 0 0;font-size:14px;"><strong>Priorité AO/DCE :</strong> ${esc(ctx.prioriteAo)}</p>` : ''}
    <p style="margin:8px 0 0;font-size:14px;"><strong>Niveau IA :</strong> ${esc(labelFor(RDV_NIVEAUX_IA, ctx.niveauIa))}</p>
    <p style="margin:4px 0 0;font-size:14px;"><strong>Échéance :</strong> ${esc(labelFor(RDV_ECHEANCES, ctx.echeance))}</p>
    <h2 style="margin:20px 0 8px;font-size:15px;color:${TEXT};">Problème à résoudre</h2>
    <p style="margin:0;font-size:14px;line-height:1.55;white-space:pre-wrap;">${esc(ctx.probleme?.trim() || '—')}</p>
    <h2 style="margin:20px 0 8px;font-size:15px;color:${TEXT};">Source</h2>
    <p style="margin:0;font-size:13px;color:${MUTED};">Page : ${esc(ctx.sourcePage || '—')}<br/>UTM : ${esc(ctx.utm || '—')}</p>
    <h2 style="margin:20px 0 8px;font-size:15px;color:${TEXT};">Préparation du RDV</h2>
    <p style="margin:0;font-size:14px;line-height:1.55;background:#f8fafc;border-radius:8px;padding:12px;">
      ${esc(ctx.entreprise)} · ${esc(labelFor(RDV_FONCTIONS, ctx.fonction))} · ${esc(labelFor(RDV_TAILLES, ctx.taille))}<br/>
      Besoins : ${labelsForBesoins(ctx.besoins).map(esc).join(', ') || '—'}<br/>
      IA : ${esc(labelFor(RDV_NIVEAUX_IA, ctx.niveauIa))} · Échéance : ${esc(labelFor(RDV_ECHEANCES, ctx.echeance))}<br/>
      ${ctx.probleme?.trim() ? `Priorité exprimée : ${esc(ctx.probleme.trim())}` : 'Pas de priorité libre renseignée.'}
    </p>
  `;
  return { subject, html: shell('Nouveau rendez-vous', body) };
}

export function buildClientReminderEmail(ctx: RdvEmailContext): {
  subject: string;
  preheader: string;
  html: string;
} {
  const time = formatRdvTime(ctx.startAt);
  const subject = `Rappel — notre rendez-vous demain à ${time}`;
  const preheader = 'Votre rendez-vous avec Laure Olivié a lieu demain.';
  const body = `
    <p style="margin:0 0 12px;font-size:15px;line-height:1.55;">Bonjour ${esc(ctx.prenom)},</p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.55;">Petit rappel : notre rendez-vous est prévu demain.</p>
    ${slotBox(ctx)}
    <p style="margin:16px 0 0;font-size:15px;line-height:1.55;"><strong>Nous échangerons notamment sur :</strong><br/>${besoinsList(ctx)}</p>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.55;">Vous n’avez rien à préparer de particulier.</p>
    <p style="margin:8px 0 0;font-size:15px;line-height:1.55;">Si vous le souhaitez, gardez simplement à portée de main un exemple de document ou de processus sur lequel vous aimeriez gagner du temps.</p>
    ${actionButtons(ctx, { meetPrimary: true })}
    <p style="margin:24px 0 0;font-size:15px;line-height:1.55;">À demain,<br/><strong>Laure Olivié</strong><br/>Formatrice IA pour le BTP</p>
  `;
  return { subject, preheader, html: shell(subject, body, preheader) };
}
