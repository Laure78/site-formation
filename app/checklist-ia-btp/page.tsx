import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { ChecklistLeadMagnet } from '@/components/checklist/ChecklistLeadMagnet';

export const metadata = createPageMetadata({
  title: '10 Prompts ChatGPT pour le BTP – Checklist gratuite',
  description:
    'Téléchargez gratuitement la checklist des 10 prompts ChatGPT pour les entreprises du BTP et gagnez plusieurs heures par semaine.',
  path: '/checklist-ia-btp',
  keywords: ['checklist ChatGPT BTP', 'prompts IA BTP', 'intelligence artificielle bâtiment', 'ChatGPT artisans'],
});

export default function ChecklistIABTPPage() {
  return (
    <div className="min-h-[80vh]">
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#166534] hover:underline"
            >
              ← Retour à l&apos;accueil
            </Link>
          </nav>

          <ChecklistLeadMagnet />

          <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Pourquoi cette checklist ?
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Les dirigeants de PME du BTP, artisans, conducteurs de travaux et responsables
              administratifs passent des heures sur des tâches répétitives : emails clients, avis
              Google, devis, publications LinkedIn… L&apos;intelligence artificielle permet
              d&apos;automatiser une grande partie de ce travail. Cette checklist vous donne
              10 prompts prêts à l&apos;emploi pour gagner du temps dès aujourd&apos;hui.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/formations"
                className="text-[#166534] font-medium hover:underline"
              >
                Découvrir nos formations IA BTP →
              </Link>
              <Link
                href="/prendre-rdv"
                className="text-[#166534] font-medium hover:underline"
              >
                Prendre rendez-vous →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
