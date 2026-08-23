import Link from 'next/link';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { FileText, Mail, Calculator, Users } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  createPageMetadata,
  getCourseSchema,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import {
  FormationCourseHero,
} from '@/components/formations/FormationCourseHero';
import { SESSION_DUREE_LIBELLE, TARIF_SESSION_FORFAIT_HT, libelleTarifSessionForfaitaire } from '@/lib/tarifs-sessions';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { JsonLd } from '@/components/JsonLd';
import { KeyPoint } from '@/components/readability/KeyPoint';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { formationHref, getFormationByCode } from '@/data/formations';

const CATALOGUE_NIV01 = getFormationByCode('NIV-01')!;

const MAIL_PROGRAMME_PME =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Demande de programme — formation IA PME BTP')}`;
const MAIL_RAPPEL_PME =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Être rappelé — formation IA PME BTP')}`;

const HERO_RESUME_PME = [
  `Programme sur-mesure PME bâtiment : devis, chiffrages, emails, comptes rendus.`,
  `Sessions ${SESSION_DUREE_LIBELLE} — forfait unique ${libelleTarifSessionForfaitaire(TARIF_SESSION_FORFAIT_HT)}.`,
  'Interventions Île-de-France et France — Qualiopi, financement OPCO Constructys selon éligibilité.',
  "Sans prérequis technique — trames prêtes à l'emploi.",
];

const PAGE_META_DESCRIPTION = `Formation IA dirigeants PME BTP en présentiel IDF : ChatGPT pour transformer le bureau. Qualiopi, Constructys selon éligibilité. RDV découverte.`;

export const metadata = createPageMetadata({
  title: 'Formation IA PME BTP — Dirigeants Bâtiment',
  description: PAGE_META_DESCRIPTION,
  descriptionFinal: true,
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
  name: CATALOGUE_NIV01.titre,
  description: CATALOGUE_NIV01.accroche,
  path: formationHref(CATALOGUE_NIV01),
  providerName: SITE_CONFIG.legalName,
  courseCode: CATALOGUE_NIV01.code,
  areaServed: ['France', 'Île-de-France'],
});

const CAS_USAGE = [
  {
    icon: FileText,
    titre: 'Devis et chiffrages',
    keyPoint: (
      <KeyPoint label="Gain terrain">
        Premier devis structuré en moins d&apos;une heure vs demi-journée selon complexité
      </KeyPoint>
    ),
    desc: "L'IA structure les descriptifs et variantes ; vous gardez la maîtrise des prix.",
  },
  { icon: Mail, titre: 'Emails et relances', desc: 'Automatisez les emails clients, fournisseurs et sous-traitants. Ton professionnel adapté au BTP.' },
  { icon: Calculator, titre: 'Productivité sans embaucher', desc: "Libérez du temps bureau pour absorber plus de chantiers à effectif constant, sans dégrader le suivi." },
  { icon: Users, titre: 'Comptes rendus et coordination', desc: 'CR de chantier, rapports d\'avancement : l\'IA formalise vos notes en documents structurés.' },
];

const FAQ_PME = [
  {
    q: "Une PME du BTP peut-elle vraiment gagner en productivité avec l'IA ?",
    a: "Oui : moins de temps sur les devis et courriers récurrents, des CR rédigés le jour même, des documents plus homogènes. La formation IA Constructys vous donne des trames prêtes à l'emploi. Les gains varient selon l'organisation et le niveau de pratique.",
  },
  {
    q: "La formation IA PME est-elle finançable ?",
    a: "Oui. financement possible via Constructys ou OPCO selon éligibilité pour les entreprises du BTP de moins de 50 salariés. Plafond pédagogique indicatif : 24 € HT/heure/stagiaire selon barèmes et dossier.",
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
        catalogueRef="NIV-01"
        refLine="PME bâtiment · Sur mesure · Qualiopi"
        title="Formation IA pour PME du BTP"
        subtitle="Devis, productivité et administratif — sans embaucher"
        badges={[
          'OPCO / plan de développement des compétences',
          'PME & équipes terrain',
          'Cas concrets',
        ]}
        summaryItems={HERO_RESUME_PME}
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
          Les PME du BTP passent souvent moins de temps sur l&apos;administratif récurrent (devis,
          courriers, CR) une fois la méthode en place. Interventions en{' '}
          <Link href="/formation-ia-btp-ile-de-france" className="font-medium text-[var(--accent)] hover:underline">
            formation IA appliquée au bâtiment Île-de-France
          </Link>{' '}
          — présentiel uniquement · Île-de-France uniquement —{' '}
          <strong>financement OPCO Constructys</strong> selon dossier.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-16">
      <section id="cas-usage" className="scroll-mt-24">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Cas d&apos;usage : IA devis bâtiment et productivité PME
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {CAS_USAGE.map((item) => {
            const Icon = item.icon;
            return (
            <div key={item.titre} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{item.titre}</h3>
              {'keyPoint' in item && item.keyPoint ? (
                <>
                  <div className="mt-3">{item.keyPoint}</div>
                  {item.desc ? <p className="mt-2 text-sm text-slate-600">{item.desc}</p> : null}
                </>
              ) : (
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              )}
            </div>
            );
          })}
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

      <RenvoiFicheCatalogue programmeRef="NIV-01" contexte="auprès des PME du BTP" />

      <div className="mt-12">
        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA appliquées au bâtiment' },
            { href: buildSiteCalendlyCtaUrl('formations-ia-pme-btp-footer-rdv'), label: 'Prendre rendez-vous' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
          ]}
        />
      </div>
      </div>
    </div>
  );
}
