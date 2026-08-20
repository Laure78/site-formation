import { DiagnosticIABTPWizard } from '@/components/diagnostic/DiagnosticIABTPWizard';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { JsonLd } from '@/components/JsonLd';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { createPageMetadata, getFAQSchema, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_DIAGNOSTIC } from '@/lib/faq';
import { formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';

export const revalidate = 3600;
export const metadata = createPageMetadata({
  title: 'Diagnostic IA BTP gratuit — Test 60 secondes',
  description:
    "Évaluez où l'IA peut vous faire gagner du temps sur vos devis et l'administratif. Diagnostic BTP gratuit, résultat personnalisé. Lancez le test.",
  path: '/diagnostic-ia-btp',
  appendAuthorSuffix: false,
  keywords: [
    'diagnostic IA BTP',
    'formation IA bâtiment',
    'IA pour entreprises BTP',
    'ChatGPT BTP',
    'automatisation devis',
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
  name: 'Diagnostic IA BTP — Évaluez votre potentiel en 60 secondes',
  description:
    "Diagnostic interactif en 5 questions pour évaluer comment l'IA peut faire gagner du temps à votre entreprise BTP.",
  about: { '@type': 'Thing', name: 'Formation IA pour les pros du BTP' },
  provider: { '@id': `${baseUrl}/#organization` },
};

export default function DiagnosticIABTPPage() {
  return (
    <div>
      <JsonLd id="schema-diagnostic-faq" schema={faqSchema} />
      <JsonLd id="schema-diagnostic-breadcrumb" schema={breadcrumbJsonLd} />
      <JsonLd id="schema-diagnostic-quiz" schema={quizJsonLd} />
      <div className="mx-auto max-w-2xl px-4 pb-16">
        <DiagnosticIABTPWizard />

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            À propos du diagnostic IA BTP
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Ce diagnostic gratuit en 5 questions évalue le potentiel de gain de temps que l&apos;IA peut apporter à votre
            entreprise du bâtiment ou des travaux publics. Conçu par Laure Olivié, formatrice IA pour les pros du BTP organisme certifié Qualiopi
            qui a accompagné plus de {formatProfessionalsTrainedCount()} professionnels du secteur, il cartographie vos
            besoins réels en 60 secondes chrono.
          </p>

          <h3 className="mt-6 font-display text-lg font-bold text-slate-900">Ce que le diagnostic évalue</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              <strong>Votre métier et contexte</strong> : professionnel du BTP, conducteur de travaux, dirigeant, assistant(e)
              administratif(ve) — l&apos;IA n&apos;a pas les mêmes gains selon votre rôle.
            </li>
            <li>
              <strong>Vos tâches chronophages</strong> : devis, emails, CR chantier, appels d&apos;offres, administratif —
              où passez-vous le plus de temps ?
            </li>
            <li>
              <strong>Votre niveau de maturité IA</strong> : utilisez-vous déjà Claude AI ou ChatGPT ? À quelle
              fréquence ?
            </li>
            <li>
              <strong>Vos priorités de gain</strong> : gagner du temps, augmenter la qualité, répondre à plus
              d&apos;appels d&apos;offres, fidéliser vos équipes ?
            </li>
            <li>
              <strong>Votre éligibilité Constructys</strong> : taille de l&apos;entreprise et cotisation OPCO — pour
              estimer le financement possible.
            </li>
          </ul>

          <h3 className="mt-6 font-display text-lg font-bold text-slate-900">Ce que vous recevez à la fin</h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Un résultat personnalisé en 3 volets : (1) votre potentiel de gain en heures/semaine, (2) les 3 cas d&apos;usage
            IA les plus pertinents pour votre profil, (3) le programme de formation adapté dans le catalogue OFC. Aucune
            carte bancaire demandée, aucun téléchargement obligatoire.
          </p>

          <h3 className="mt-6 font-display text-lg font-bold text-slate-900">
            Pourquoi faire ce diagnostic avant une formation ?
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            La plupart des dirigeants BTP sous-estiment le temps qu&apos;ils passent sur l&apos;administratif. Le
            diagnostic objective les gains possibles (typiquement 3 à 5 heures/semaine dès la première semaine
            post-formation) et oriente vers le bon programme — débutant ou avancé — selon votre niveau. Résultat : vous ne
            payez ni une formation trop basique, ni une formation surdimensionnée.
          </p>
        </section>

        <div className="mt-10">
          <AllerPlusLoin
            variant="compact"
            links={[
              { href: LINKS.formations, label: 'Formation IA appliquée au bâtiment' },
              { href: LINKS.chatgptArtisans, label: 'ChatGPT pour entreprises BTP' },
              { href: LINKS.iaDevis, label: 'IA devis bâtiment' },
              { href: LINKS.iaCDT, label: 'IA conducteur de travaux' },
              { href: LINKS.blog, label: 'Articles et guides' },
              { href: buildSiteCalendlyCtaUrl('diagnostic-ia-btp-footer-rdv'), label: 'Prendre rendez-vous' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
