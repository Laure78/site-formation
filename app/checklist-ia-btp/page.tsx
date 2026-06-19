import Link from 'next/link';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_CHECKLIST_IA_BTP } from '@/lib/faq';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ChecklistLeadMagnet } from '@/components/checklist/ChecklistLeadMagnet';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';

export const revalidate = 3600;
export const metadata = createPageMetadata({
  title: '10 Prompts ChatGPT BTP Gratuits',
  description:
    "Téléchargez 10 prompts ChatGPT gratuits pour le BTP : devis, emails, CR chantier. Par Laure Olivié, formatrice IA pour le BTP certifiée Qualiopi.",
  path: '/checklist-ia-btp',
  appendAuthorSuffix: false,
  keywords: ['checklist ChatGPT BTP', 'prompts IA BTP', 'intelligence artificielle bâtiment', 'ChatGPT TPE PME'],
});

const faqSchema = getFAQSchema(FAQ_CHECKLIST_IA_BTP);

export default function ChecklistIABTPPage() {
  return (
    <div className="min-h-[80vh]">
      <JsonLd id="schema-faq-page" schema={faqSchema} />
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
              Les dirigeants de TPE et PME du BTP, conducteurs de travaux et responsables
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
                Formation IA appliquée au bâtiment →
              </Link>
              <Link
                href="/formation-ia-artisans-btp"
                className="text-[#166534] font-medium hover:underline"
              >
                ChatGPT pour entreprises BTP →
              </Link>
              <Link
                href="/ia-devis-batiment"
                className="text-[#166534] font-medium hover:underline"
              >
                IA devis bâtiment →
              </Link>
              <Link
                href="/ia-conducteur-travaux"
                className="text-[#166534] font-medium hover:underline"
              >
                IA conducteur de travaux →
              </Link>
              <Link
                href="/blog"
                className="text-[#166534] font-medium hover:underline"
              >
                Articles et guides →
              </Link>
              <RdvLink className="text-[#166534] font-medium hover:underline">
                Prendre rendez-vous →
              </RdvLink>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-200">
              <FAQSection
                items={FAQ_CHECKLIST_IA_BTP}
                title="Questions fréquentes — Checklist ChatGPT BTP"
              />
            </div>
            <div className="mt-12 pt-8 border-t border-slate-200">
              <AllerPlusLoin variant="compact" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
