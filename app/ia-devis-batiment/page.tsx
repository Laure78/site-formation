import Link from 'next/link';
import { Check, FileText, Calculator, Clock, ArrowRight } from 'lucide-react';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'IA pour devis bâtiment — Automatiser vos devis BTP avec ChatGPT',
  description:
    "Utilisez l'IA pour rédiger vos devis bâtiment 10 fois plus vite : descriptifs techniques, chiffrages, variantes. Formation pratique pour artisans et PME BTP. 100% finançable Constructys.",
  path: '/ia-devis-batiment',
  keywords: [
    'IA devis bâtiment',
    'IA pour devis BTP',
    'ChatGPT devis construction',
    'automatiser devis bâtiment',
    'devis IA BTP',
  ],
});

const DEFINITION = {
  titre: "Qu'est-ce que l'IA pour les devis bâtiment ?",
  court: "L'IA pour devis bâtiment désigne l'utilisation d'outils comme ChatGPT pour générer, structurer et accélérer la rédaction de devis et chiffrages dans le secteur du BTP : descriptifs techniques, quantités, prix, conditions générales.",
  long: "Un devis bâtiment complet comprend généralement : un descriptif détaillé des prestations, les quantités et unités, les prix unitaires et totaux HT/TTC, les conditions de validité et de paiement. L'intelligence artificielle peut produire ces éléments à partir d'un brief succinct : type de chantier, corps de métier, superficie, options. Vous conservez la maîtrise des prix et des marges ; l'IA vous fait gagner le temps de rédaction et de mise en forme.",
};

const BENEFICES = [
  {
    icon: Clock,
    titre: 'Gain de temps',
    desc: "Un devis détaillé passe de 2h à 4h à environ 15-20 minutes. L'IA structure le document ; vous ajustez les montants et les conditions.",
  },
  {
    icon: Calculator,
    titre: 'Cohérence et variantes',
    desc: "Générez facilement des variantes (avec/sans option, différents matériaux) pour proposer plusieurs options au client sans tout recopier.",
  },
  {
    icon: FileText,
    titre: 'Professionnalisme',
    desc: "Descriptifs techniques clairs, formulations professionnelles, mise en page structurée. L'IA vous aide à renvoyer une image soignée.",
  },
];

const FAQ_ITEMS = [
  {
    q: "L'IA peut-elle remplacer un métreur ou un chargé d'affaires ?",
    a: "Non. L'IA assiste la rédaction et la mise en forme, mais les prix, les quantités et les choix techniques restent sous votre responsabilité. Elle ne calcule pas à votre place les quantités réelles (surface, linéaire, etc.) — c'est à vous de les fournir. La formation vous apprend à bien cadrer vos demandes pour obtenir des devis exploitables.",
  },
  {
    q: "Quels types de devis bâtiment peut-on faire avec l'IA ?",
    a: "Tous les corps de métier : gros œuvre (maçonnerie, charpente), second œuvre (plomberie, électricité, CVC, carrelage, peinture), VRD. L'IA adapte le vocabulaire et la structure au métier. Vous pouvez aussi générer des devis de rénovation, neuf, ou maintenance.",
  },
  {
    q: "Faut-il des compétences techniques pour utiliser l'IA en devis ?",
    a: "Non. Une formation courte (4h) suffit pour maîtriser les bons prompts et les trames. Vous apprenez à décrire votre chantier de façon efficace pour que l'IA produise un devis pertinent. Aucun code, aucun logiciel complexe.",
  },
  {
    q: "La formation IA devis bâtiment est-elle finançable ?",
    a: "Oui. Laure Olivié est certifiée Qualiopi. La formation « L'IA au service du BTP » (modules devis et chiffrage) est 100 % finançable par l'OPCO Constructys pour les entreprises du BTP.",
  },
];

export default function IADevisBatimentPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <nav className="mb-8 text-sm text-slate-600">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <span className="text-slate-900">IA pour devis bâtiment</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          IA pour <span className="text-[var(--accent)]">devis bâtiment</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Automatisez la rédaction de vos devis BTP avec l&apos;intelligence
          artificielle. Descriptifs techniques, chiffrages, variantes : gain de
          temps garanti.
        </p>

        {/* Bloc GEO : Réponse courte */}
        <section className="mt-12 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">
            En bref : IA pour devis bâtiment
          </h2>
          <p className="mt-4 text-slate-700">{DEFINITION.court}</p>
        </section>

        {/* Définition */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {DEFINITION.titre}
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">{DEFINITION.long}</p>
        </section>

        {/* Bénéfices */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Pourquoi utiliser l&apos;IA pour vos devis BTP ?
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {BENEFICES.map(({ icon: Icon, titre, desc }) => (
              <div
                key={titre}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{titre}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Exemple */}
        <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Exemple : devis carrelage avec l&apos;IA
          </h2>
          <p className="mt-4 text-slate-600">
            Vous êtes carreleur. Vous indiquez à ChatGPT : « Devis pour 35 m² de
            carrelage sol et mural, salle de bain, format 60x60, colle et joint
            fournis. Main d&apos;œuvre + fournitures. TVA 10 %. » L&apos;IA génère
            un descriptif structuré avec postes (décapage, préparation,
            pose, joints), quantités, prix unitaires et total. Vous vérifiez et
            ajustez selon vos tarifs réels.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Questions fréquentes
          </h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div
                key={q}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl bg-[var(--accent)] p-8 text-white">
          <h2 className="font-display text-2xl font-bold">
            Formation IA devis et chiffrage BTP
          </h2>
          <p className="mt-4 text-blue-100">
            Module dédié dans la formation « L&apos;IA au service du BTP ». 4h ou
            7h de pratique sur vos vrais devis. 100 % finançable Constructys.
          </p>
          <Link
            href="/formations/ia-btp-paris"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
          >
            Voir le programme
            <ArrowRight size={20} strokeWidth={1.5} />
          </Link>
        </section>

        {/* Liens */}
        <section className="mt-16 border-t border-slate-200 pt-12">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Sur le même thème
          </h2>
          <ul className="mt-4 flex flex-wrap gap-4">
            <li>
              <Link href="/chatgpt-artisans-btp" className="text-[var(--accent)] hover:underline">
                ChatGPT pour artisans BTP
              </Link>
            </li>
            <li>
              <Link href="/ia-conducteur-travaux" className="text-[var(--accent)] hover:underline">
                IA pour conducteur de travaux
              </Link>
            </li>
            <li>
              <Link href="/formations" className="text-[var(--accent)] hover:underline">
                Catalogue formations IA BTP
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
