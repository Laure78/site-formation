import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { LINKS } from '@/lib/internal-links';
import { RdvLink } from '@/components/RdvLink';
import { MerciSkillIaDownload } from '@/components/ressources/MerciSkillIaDownload';

export const metadata = createPageMetadata({
  title: 'Merci — votre guide Skill IA est prêt',
  description:
    'Téléchargez votre guide PDF « Créez votre 1er Skill IA » pour conducteurs de travaux BTP.',
  path: '/ressources/guide-conducteur-de-travaux/merci',
  robots: { index: false, follow: false },
  appendAuthorSuffix: false,
});

export default function MerciSkillIaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
        Merci ! Votre guide est prêt.
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        Vous allez aussi recevoir le guide par e-mail dans les prochaines minutes. Pensez à vérifier vos spams.
      </p>
      <div className="mt-10 flex justify-center">
        <MerciSkillIaDownload />
      </div>

      <section className="mt-16 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-8 text-left">
        <h2 className="font-display text-xl font-bold text-slate-900">La prochaine étape</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <RdvLink
            origin="ressources-guide-conducteur-de-travaux-merci-contact-rdv-page-calendly"
            variant="unstyled"
            className="rounded-xl border-2 border-[#377CF3] bg-white p-5 transition hover:bg-[#D4E3FC]/40"
          >
            <p className="text-2xl" aria-hidden>
              📞
            </p>
            <p className="mt-2 font-semibold text-slate-900">20 min pour parler formation IA</p>
            <p className="mt-1 text-sm text-[#377CF3]">Réserver un créneau →</p>
          </RdvLink>
          <a
            href={SCHEMA_LINKEDIN_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 bg-white p-5 transition hover:bg-slate-50"
          >
            <p className="text-2xl" aria-hidden>
              👥
            </p>
            <p className="mt-2 font-semibold text-slate-900">Suivre Laure sur LinkedIn</p>
            <p className="mt-1 text-sm text-[#377CF3]">Profil →</p>
          </a>
        </div>
      </section>

      <p className="mt-10 text-sm text-slate-500">
        <Link href={LINKS.skillIaConducteurTravaux} className="text-[#377CF3] hover:underline">
          Retour au guide
        </Link>
        {' · '}
        <Link href="/formations" className="text-[#377CF3] hover:underline">
          Catalogue formations
        </Link>
      </p>
    </div>
  );
}
