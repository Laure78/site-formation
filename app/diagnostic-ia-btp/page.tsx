import { DiagnosticIABTPWizard } from '@/components/diagnostic/DiagnosticIABTPWizard';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_DIAGNOSTIC } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: 'Diagnostic IA BTP gratuit — Évaluez votre potentiel en 60 secondes',
  description:
    "Évaluez en quelques questions où l'IA peut vous faire gagner du temps sur devis et administratif. Diagnostic BTP gratuit. Résultat personnalisé. Lancez le test.",
  path: '/diagnostic-ia-btp',
  keywords: [
    'diagnostic IA BTP',
    'formation IA bâtiment',
    'IA pour entreprises BTP',
    'ChatGPT BTP',
    'automatisation devis',
  ],
});

const faqSchema = getFAQSchema(FAQ_DIAGNOSTIC);

export default function DiagnosticIABTPPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DiagnosticIABTPWizard />
      <div className="mx-auto max-w-2xl px-4 pb-16">
        <AllerPlusLoin
          variant="compact"
          links={[
            { href: '/formations', label: 'Formation IA BTP' },
            { href: '/chatgpt-artisans-btp', label: 'ChatGPT artisans BTP' },
            { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
            { href: '/ia-conducteur-travaux', label: 'IA conducteur de travaux' },
            { href: '/blog', label: 'Articles et guides' },
            { href: '/prendre-rdv', label: 'Prendre rendez-vous' },
          ]}
        />
      </div>
    </div>
  );
}
