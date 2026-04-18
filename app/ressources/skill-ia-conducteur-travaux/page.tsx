import Image from 'next/image';
import Link from 'next/link';
import { Check, Users, HardHat, Building2 } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { SkillIaLeadMagnetForm } from '@/components/ressources/SkillIaLeadMagnetForm';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';

const PATH = '/ressources/skill-ia-conducteur-travaux';
const CANONICAL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;

export const metadata = createPageMetadata({
  title: 'Créez votre 1er Skill IA — Guide gratuit Conducteur de Travaux BTP',
  description:
    'Guide PDF gratuit pour créer votre 1er skill IA en 30 min. Tutoriel + 5 cas d’usage BTP + template prêt à l’emploi. Par Laure Olivié, formatrice IA BTP.',
  path: PATH,
  keywords: [
    'skill IA BTP',
    'IA conducteur de travaux',
    'ChatGPT BTP',
    'automatisation chantier',
    'guide IA BTP gratuit',
    'formation IA BTP',
  ],
  openGraphType: 'article',
  openGraphTitle: 'Créez votre 1er Skill IA — Guide gratuit Conducteur de Travaux BTP',
  openGraphDescription: '30 min pour automatiser vos tâches répétitives chantier.',
  image: {
    url: '/og/skill-ia-og.png',
    width: 1200,
    height: 630,
    alt: 'Guide Skill IA — conducteurs de travaux BTP, Laure Olivié',
  },
  appendAuthorSuffix: false,
});

const learningResourceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${CANONICAL}#resource`,
  name: 'Créez votre 1er Skill IA — Guide conducteur de travaux BTP',
  description:
    'Guide PDF : anatomie d’un skill IA, tutoriel en 7 étapes, 5 cas d’usage BTP, template de paramétrage. Public : conducteurs de travaux et directions d’exploitation.',
  url: CANONICAL,
  inLanguage: 'fr-FR',
  educationalLevel: 'intermediate',
  learningResourceType: 'Guide',
  about: { '@type': 'Thing', name: 'IA dans le BTP' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Professionnels du bâtiment et des travaux publics',
  },
  author: {
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url.replace(/\/$/, '')}/a-propos`,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
  },
};

const FAQ_ITEMS = [
  {
    q: 'Quel format est le guide ?',
    a: 'Un fichier PDF : vous pouvez le télécharger directement depuis la page (sans inscription) ou recevoir une copie par e-mail après inscription. Compatible ordinateur et tablette.',
  },
  {
    q: 'Combien de temps pour le parcourir ?',
    a: 'Prévoyez environ 30 minutes pour appliquer le tutoriel pas à pas. Les cas d’usage peuvent être lus séparément.',
  },
  {
    q: 'Comment sont utilisées mes données ?',
    a: 'Uniquement pour vous envoyer ce guide et des contenus BTP & IA en lien avec votre inscription. Vous pouvez vous désabonner en un clic à tout moment.',
  },
  {
    q: 'Proposez-vous une formation professionnelle sur le même thème ?',
    a:
      'Oui — OFC propose des formations IA BTP certifiées Qualiopi, finançables Constructys selon éligibilité. Consultez le catalogue ou prenez rendez-vous pour un échange personnalisé.',
  },
];

export default function SkillIaConducteurTravauxPage() {
  return (
    <div className="min-h-screen bg-white" style={{ color: '#1A1A1A' }}>
      <JsonLd id="schema-learning-resource-skill-ia" schema={learningResourceJsonLd} />

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-skill-ia">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1fr_minmax(0,400px)] md:items-start md:py-20 lg:gap-14">
          <div>
            <h1 id="hero-skill-ia" className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.35rem]">
              Créez votre 1er Skill IA — pour Conducteurs de Travaux &amp; Directeurs d&apos;Exploitation BTP
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/95">
              30 minutes pour automatiser vos tâches répétitives chantier. Tutoriel pas-à-pas + 5 cas d&apos;usage +
              template à copier-coller.
            </p>
            <ul className="mt-8 space-y-3 text-base">
              <li className="flex gap-3">
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" strokeWidth={2} aria-hidden />
                <span>Tutoriel pas-à-pas (7 étapes chronométrées)</span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" strokeWidth={2} aria-hidden />
                <span>5 cas d&apos;usage BTP concrets (CR chantier, relance ST, reporting…)</span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-white" strokeWidth={2} aria-hidden />
                <span>Template de paramétrage universel prêt à l&apos;emploi</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[512/341] w-full overflow-hidden rounded-2xl border border-white/20 bg-[#D4E3FC]/20 shadow-lg">
              <Image
                src="/images/skill-ia-conducteur-travaux-hero-formation-btp.png"
                alt="Formation IA BTP : poignée de main en bureau, tableau Devis, Chantier et Organisation — accompagnement professionnels du bâtiment"
                width={1024}
                height={682}
                className="h-full w-full object-cover object-center"
                priority
              />
            </div>
            <SkillIaLeadMagnetForm />
          </div>
        </div>
      </section>

      <section className="border-b bg-[#F2F2F2] py-14" aria-labelledby="why-guide">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="why-guide" className="font-display text-2xl font-bold md:text-3xl">
            Pourquoi ce guide
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: '3–5 h', v: 'gagnées / sem. en moyenne sur l’administratif' },
              { k: '0 €', v: 'investissement — PDF gratuit' },
              { k: '30 min', v: 'pour créer votre 1er skill' },
              { k: '∞', v: 'réutilisations du template' },
            ].map((c) => (
              <div
                key={c.k}
                className="rounded-2xl border-2 border-[#377CF3] bg-white p-5 shadow-sm"
              >
                <p className="font-display text-2xl font-bold text-[#377CF3]">{c.k}</p>
                <p className="mt-2 text-sm text-slate-700">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14" aria-labelledby="learn">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="learn" className="font-display text-2xl font-bold md:text-3xl">
            Ce que vous allez apprendre
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              'Comprendre l’anatomie d’un skill IA en 4 briques',
              'Créer votre 1er skill en 7 étapes (30 min chrono)',
              'Appliquer à 5 situations BTP réelles',
              'Réutiliser le template universel de paramétrage',
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#D4E3FC' }}
              >
                <p className="font-medium text-slate-900">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-14" aria-labelledby="audience">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="audience" className="font-display text-2xl font-bold md:text-3xl">
            À qui ça s&apos;adresse
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5">
              <HardHat className="h-10 w-10 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              <div>
                <p className="font-semibold text-slate-900">Conducteurs de travaux</p>
                <p className="mt-1 text-sm text-slate-600">CR, coordination et reporting écrit.</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5">
              <Users className="h-10 w-10 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              <div>
                <p className="font-semibold text-slate-900">Directeurs d&apos;exploitation</p>
                <p className="mt-1 text-sm text-slate-600">Standardiser les livrables entre équipes.</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5">
              <Building2 className="h-10 w-10 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              <div>
                <p className="font-semibold text-slate-900">Chefs d&apos;entreprise BTP</p>
                <p className="mt-1 text-sm text-slate-600">Gains de temps mesurables sur l&apos;administratif.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#F2F2F2] py-14" aria-labelledby="about-laure">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[200px_1fr] md:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl border border-slate-200 shadow-md">
            <Image
              src={PHOTOS.siteAvatar.src}
              alt={PHOTOS.siteAvatar.alt}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 id="about-laure" className="font-display text-2xl font-bold md:text-3xl">
              Qui est Laure Olivié ?
            </h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Formatrice IA &amp; ChatGPT pour le BTP — OFC Création d&apos;Entreprise, certifiée Qualiopi. Sessions avec
              la FFB, la CAPEB, le CNAM et de nombreuses PME du bâtiment en Île-de-France.
            </p>
            <p className="mt-3 font-semibold text-slate-900">
              +{formatProfessionalsTrainedCount()} personnes formées · {SOCIAL_PROOF.AVERAGE_RATING}/5 · Qualiopi ·
              Constructys
            </p>
            <p className="mt-4 text-sm font-medium text-slate-600">
              Références : FFB · CAPEB · CNAM
            </p>
          </div>
        </div>
      </section>

      <section className="py-14" aria-labelledby="faq-skill">
        <div className="mx-auto max-w-3xl px-4">
          <h2 id="faq-skill" className="font-display text-2xl font-bold">
            Questions fréquentes
          </h2>
          <ul className="mt-8 space-y-6">
            {FAQ_ITEMS.map((item) => (
              <li key={item.q} className="border-b border-slate-200 pb-6">
                <p className="font-semibold text-slate-900">{item.q}</p>
                <p className="mt-2 text-slate-600">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#377CF3] py-12 text-center text-white">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Pas le temps de lire tout de suite ?
          </h2>
          <p className="mt-3 text-white/95">
            Réservez 20 minutes d&apos;échange pour cadrer votre besoin formation IA BTP.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-[#377CF3] shadow-sm hover:bg-[#F2F2F2]"
            >
              Prendre rendez-vous
            </a>
            <Link
              href={LINKS.contact}
              className="inline-flex rounded-xl border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-500">
        <Link href={SCHEMA_LINKEDIN_PROFILE_URL} className="text-[#377CF3] hover:underline">
          LinkedIn — Laure Olivié
        </Link>
        {' · '}
        <Link href={LINKS.formations} className="text-[#377CF3] hover:underline">
          Catalogue formations
        </Link>
      </div>
    </div>
  );
}
