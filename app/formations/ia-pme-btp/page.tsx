import Link from 'next/link';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { FileText, Mail, Calculator, Users } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  createPageMetadata,
  getCourseSchema,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';
import { SESSION_DUREE_LIBELLE, TARIF_FORFAIT_DEBUTANT_HT, TARIF_FORFAIT_AVANCE_HT } from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import { JsonLd } from '@/components/JsonLd';

const MAIL_PROGRAMME_PME =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Demande de programme — formation IA PME BTP')}`;
const MAIL_RAPPEL_PME =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Être rappelé — formation IA PME BTP')}`;

const HERO_RESUME_PME = [
  `Programme sur-mesure PME bâtiment : devis, chiffrages, emails, comptes rendus.`,
  `Sessions ${SESSION_DUREE_LIBELLE} — forfait ${TARIF_FORFAIT_DEBUTANT_HT} € ou ${TARIF_FORFAIT_AVANCE_HT} € HT/part. selon niveau.`,
  'Interventions Île-de-France et France — Qualiopi, financement OPCO Constructys selon éligibilité.',
  "Sans prérequis technique — trames prêtes à l'emploi.",
];

export const metadata = createPageMetadata({
  title: 'Formation IA PME BTP — Dirigeants Bâtiment | Laure Olivié',
  description:
    'Formation IA pour dirigeants PME BTP. Transformez votre entreprise avec ChatGPT. 1 592 pros formés. Qualiopi finançable Constructys.',
  path: '/formations/ia-pme-btp',
  appendAuthorSuffix: false,
  keywords: [
    'formation IA PME bâtiment',
    'formation IA PME bâtiment Île-de-France',
    'IA devis bâtiment',
    'financement formation IA OPCO Constructys',
    'formation IA Constructys',
  ],
});

const courseSchema = getCourseSchema({
  name: "Formation IA pour PME du BTP",
  description:
    "Formation IA PME bâtiment : devis, chiffrages, emails, comptes rendus. Paris, Île-de-France et France. Financement formation IA OPCO Constructys selon éligibilité. 100 % finançable Constructys.",
  path: '/formations/ia-pme-btp',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France', 'Île-de-France'],
});

const CAS_USAGE = [
  { icon: FileText, titre: 'Devis et chiffrages', desc: 'Générez des devis professionnels en 15 min au lieu de 2h. L\'IA structure les descriptifs et variantes ; vous gardez la maîtrise des prix.' },
  { icon: Mail, titre: 'Emails et relances', desc: 'Automatisez les emails clients, fournisseurs et sous-traitants. Ton professionnel adapté au BTP.' },
  { icon: Calculator, titre: 'Productivité sans embaucher', desc: 'Traitez plus de chantiers avec les mêmes effectifs. L\'IA libère du temps sur l\'administratif.' },
  { icon: Users, titre: 'Comptes rendus et coordination', desc: 'CR de chantier, rapports d\'avancement : l\'IA formalise vos notes en documents structurés.' },
];

const FAQ_PME = [
  {
    q: "Une PME du BTP peut-elle vraiment gagner en productivité avec l'IA ?",
    a: "Oui. Les PME formées rapportent 3 à 5h gagnées par semaine et par personne sur devis, emails et CR. La formation IA Constructys vous donne des trames prêtes à l'emploi.",
  },
  {
    q: "La formation IA PME est-elle finançable ?",
    a: "Oui. 100 % finançable par l'OPCO Constructys pour les entreprises du BTP de moins de 50 salariés. Coût pédagogique couvert jusqu'à 24€ HT/heure/stagiaire.",
  },
  {
    q: "Faut-il des compétences techniques ?",
    a: "Non. La formation est conçue pour des dirigeants et collaborateurs sans prérequis en informatique. On travaille sur vos vrais documents.",
  },
];

export default function FormationIAPMEBTPPage() {
  const faqSchema = getFAQSchema(FAQ_PME);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <JsonLd id="schema-faq-page" schema={faqSchema} />

      <FormationCourseHero
        refLine="PME bâtiment · Sur mesure · Qualiopi"
        title="Formation IA pour PME du BTP"
        subtitle="Devis, productivité et administratif — sans embaucher"
        badges={[
          'OPCO / plan de développement des compétences',
          'PME & équipes terrain',
          'Cas concrets',
        ]}
        summaryItems={HERO_RESUME_PME}
        image={
          <FormationHeroPhoto
            src={PHOTOS.btpFormationSalleIntervention2026.src}
            alt={PHOTOS.btpFormationSalleIntervention2026.alt}
            width={PHOTOS.btpFormationSalleIntervention2026.width}
            height={PHOTOS.btpFormationSalleIntervention2026.height}
            priority
          />
        }
        ctas={
          <>
            <RdvLink className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600">
              Prendre rendez-vous
            </RdvLink>
            <a
              href={MAIL_PROGRAMME_PME}
              className="rounded-xl border-2 border-slate-200 px-6 py-3.5 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Demander le programme
            </a>
            <a
              href={MAIL_RAPPEL_PME}
              className="rounded-xl border-2 border-[var(--accent)] px-6 py-3.5 text-center font-semibold text-slate-900 hover:bg-[var(--accent-soft)]"
            >
              Être rappelé
            </a>
          </>
        }
        footerLinks={
          <>
            <a href="#cas-usage" className="font-medium text-[var(--accent)] hover:underline">
              Voir les cas d&apos;usage
            </a>
            <Link
              href="/formations"
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              Catalogue des formations
            </Link>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          Programme sur-mesure pour les <strong>PME du bâtiment</strong>.{' '}
          <strong>Devis, chiffrages, emails, comptes rendus</strong> : optimisez votre temps avec
          l&apos;IA sans embaucher. La formation IA Constructys vous donne des{' '}
          <strong>outils opérationnels dès le lendemain</strong>.
        </p>
        <p className="mt-4">
          Les PME du BTP gagnent souvent <strong>3 à 5 h par semaine</strong> par collaborateur sur
          l&apos;administratif. Interventions en{' '}
          <Link href="/formation-ia-btp-ile-de-france" className="font-medium text-[var(--accent)] hover:underline">
            formation IA BTP Île-de-France
          </Link>{' '}
          et partout en France — <strong>financement OPCO Constructys</strong> selon dossier.
        </p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-16">
      <section id="cas-usage" className="scroll-mt-24">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Cas d&apos;usage : IA devis bâtiment et productivité PME
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {CAS_USAGE.map(({ icon: Icon, titre, desc }) => (
            <div key={titre} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{titre}</h3>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FAQSection
        items={FAQ_PME}
        title="Questions fréquentes — Formation IA PME BTP"
        subtitle="Finançabilité, prérequis, gains de productivité."
      />

      <div className="mt-10">
        <RdvLink className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white hover:bg-blue-700">
          Prendre RDV pour un devis personnalisé
        </RdvLink>
      </div>

      <div className="mt-12">
        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
          ]}
        />
      </div>
      </div>
    </div>
  );
}
