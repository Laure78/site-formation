import { DiagnosticIABTPWizard } from '@/components/diagnostic/DiagnosticIABTPWizard';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Diagnostic IA BTP gratuit — Évaluez votre potentiel en 60 secondes',
  description:
    'Diagnostic IA BTP gratuit. Découvrez comment l\'intelligence artificielle peut vous faire gagner du temps sur devis, appels d\'offres et gestion administrative. 5 questions, résultat personnalisé.',
  path: '/diagnostic-ia-btp',
  keywords: [
    'diagnostic IA BTP',
    'formation IA bâtiment',
    'IA pour entreprises BTP',
    'ChatGPT BTP',
    'automatisation devis',
  ],
});

export default function DiagnosticIABTPPage() {
  return <DiagnosticIABTPWizard />;
}
