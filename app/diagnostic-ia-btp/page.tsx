import { DiagnosticIABTPWizard } from '@/components/diagnostic/DiagnosticIABTPWizard';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { JsonLd } from '@/components/JsonLd';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { createPageMetadata, getFAQSchema, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_DIAGNOSTIC } from '@/lib/faq';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import { LINKS } from '@/lib/internal-links';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: 'Diagnostic IA BTP gratuit | Identifiez vos gains de temps',
  description:
    'Réalisez gratuitement votre diagnostic IA BTP. Identifiez vos tâches automatisables, vos cas d\'usage prioritaires et le parcours IA adapté à votre entreprise.',
  path: '/diagnostic-ia-btp',
  appendAuthorSuffix: false,
  keywords: [
    'diagnostic IA BTP',
    'formation IA pour le BTP',
    'ChatGPT BTP',
    'automatisation devis',
    'analyse CCTP IA',
    'compte rendu chantier IA',
  ],
});

const faqSchema = getFAQSchema(FAQ_DIAGNOSTIC);

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

const breadcrumbJsonLd = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Diagnostic IA BTP', path: '/diagnostic-ia-btp' },
]);

const quizJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Diagnostic IA BTP — Identifiez vos gains de temps',
  description:
    'Diagnostic interactif en 9 questions pour identifier les tâches automatisables, la maturité IA et le parcours de formation adapté aux entreprises du BTP.',
  about: { '@type': 'Thing', name: 'Formation IA pour les pros du BTP' },
  provider: { '@id': `${baseUrl}/#organization` },
};

export default function DiagnosticIABTPPage() {
  return (
    <div>
      <JsonLd id="schema-diagnostic-faq" schema={faqSchema} />
      <JsonLd id="schema-diagnostic-breadcrumb" schema={breadcrumbJsonLd} />
      <JsonLd id="schema-diagnostic-quiz" schema={quizJsonLd} />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <DiagnosticIABTPWizard />

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            À propos du diagnostic IA BTP
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Ce diagnostic gratuit aide les dirigeants, conducteurs de travaux, chargés d&apos;affaires et
            fonctions support du BTP à objectiver leurs tâches chronophages et leur maturité IA. Conçu par
            Laure Olivié (OFC Création d&apos;Entreprise, certifié Qualiopi — satisfaction{' '}
            {formatNoteSatisfactionAffichageComplet()}), il produit une synthèse indicative en quelques
            minutes : scores, priorités et parcours de formation du catalogue.
          </p>

          <h3 className="mt-6 font-display text-lg font-bold text-slate-900">Ce que le diagnostic évalue</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>Votre profil métier et vos tâches chronophages (devis, DCE, chantier, administratif…)</li>
            <li>Le temps consacré et la fréquence de ces tâches</li>
            <li>Votre maturité IA et votre organisation numérique</li>
            <li>La sécurisation de vos usages documentaires</li>
            <li>Votre potentiel de gain estimé et vos 3 priorités IA</li>
          </ul>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Les estimations de gain sont indicatives — elles dépendent de vos processus, de vos outils et du
            niveau d&apos;adoption. Aucune promesse de résultat garanti.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="faq-diagnostic">
          <h2 id="faq-diagnostic" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            FAQ — Diagnostic IA BTP
          </h2>
          <dl className="mt-6 space-y-6">
            {FAQ_DIAGNOSTIC.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd
                  className="mt-2 text-sm leading-relaxed text-slate-700 [&_a]:font-medium [&_a]:text-[#377CF3] [&_a]:underline [&_a]:underline-offset-2"
                  dangerouslySetInnerHTML={{ __html: item.a }}
                />
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-10">
          <AllerPlusLoin
            variant="compact"
            links={[
              { href: LINKS.formations, label: 'Formation IA appliquée au bâtiment' },
              { href: LINKS.formationAO, label: "Formation IA appels d'offres BTP" },
              { href: LINKS.formationConduiteTravauxSuiviChantier, label: 'Formation IA conduite de travaux' },
              { href: LINKS.blog, label: 'Articles et guides' },
              { href: buildSiteCalendlyCtaUrl('diagnostic-ia-btp-footer-rdv'), label: 'Prendre rendez-vous' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
