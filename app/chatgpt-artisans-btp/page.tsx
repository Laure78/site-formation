import Link from 'next/link';
import { Check, FileText, MessageSquare, ClipboardList, Shield, ArrowRight } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'ChatGPT Artisans BTP : Devis & emails automatisés',
  description:
    'ChatGPT pour artisans : automatisez devis, emails, CR. Formation 100% finançable Constructys. Gagnez 3-5h/semaine. Certifié Qualiopi.',
  path: '/chatgpt-artisans-btp',
  keywords: [
    'ChatGPT artisans BTP',
    'ChatGPT pour artisans',
    'IA artisan bâtiment',
    'ChatGPT devis BTP',
    'intelligence artificielle artisans',
    'formation IA artisan',
    'automatisation artisan',
    'ChatGPT TPE bâtiment',
  ],
});

const DEFINITION = {
  titre: "Qu'est-ce que ChatGPT pour les artisans du BTP ?",
  court: "ChatGPT pour artisans BTP désigne l'utilisation de l'assistant conversationnel OpenAI pour automatiser la rédaction des devis, emails, comptes rendus et documents administratifs dans les entreprises du bâtiment (plombiers, électriciens, maçons, peintres, carreleurs…).",
  long: "Conçu par OpenAI, ChatGPT analyse votre demande en langage naturel et génère un texte structuré en quelques secondes. Pour un artisan BTP, cela signifie : coller un brief chantier et obtenir un devis détaillé, décrire une situation et recevoir un email client professionnel, ou dicter des notes de chantier et générer un compte rendu prêt à envoyer. Sans compétence technique : vous écrivez ce que vous voulez, l'IA rédige à votre place.",
};

const CAS_USAGE = [
  {
    icon: FileText,
    titre: 'Devis et chiffrages',
    desc: 'Rédigez des devis professionnels en 15 minutes au lieu de 2 heures. Indiquez le type de chantier, les prestations et les quantités ; ChatGPT structure le descriptif, les prix et les conditions.',
  },
  {
    icon: MessageSquare,
    titre: 'Emails clients et fournisseurs',
    desc: 'Relances, réclamations, confirmations de rendez-vous : l\'IA adapte le ton et la structure. Plus de temps perdu à chercher les mots ; vous corrigez et envoyez.',
  },
  {
    icon: ClipboardList,
    titre: 'Comptes rendus de chantier',
    desc: 'Transformez vos notes vocales ou écrites en CR structurés. Avancement des travaux, points de vigilance, prochaines étapes : tout est formalisé en quelques clics.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Un artisan du BTP peut-il vraiment utiliser ChatGPT sans formation ?',
    a: "Oui pour des usages basiques (emails, idées de formulations). Pour les devis et documents techniques, une formation courte (4h) permet d'éviter les erreurs et d'obtenir des trames réutilisables. Laure Olivié forme spécifiquement les artisans BTP avec des cas concrets (plomberie, électricité, maçonnerie, etc.).",
  },
  {
    q: 'ChatGPT est-il sécurisé pour les données de mon entreprise ?',
    a: "La version gratuite de ChatGPT ne garantit pas la confidentialité des données. Pour des informations clients ou chantier, utilisez ChatGPT Team ou Enterprise, ou ne collez jamais de données sensibles. La formation IA BTP vous apprend les bonnes pratiques (anonymisation, relecture, process interne).",
  },
  {
    q: 'Combien de temps économise un artisan avec ChatGPT ?',
    a: "En moyenne 3 à 5 heures par semaine : devis (gain majeur), emails, comptes rendus. Les artisans formés rapportent un ROI positif dès la première semaine. La formation inclut des prompts prêts à l'emploi pour chaque métier.",
  },
  {
    q: 'La formation ChatGPT pour artisans BTP est-elle finançable ?',
    a: "Oui. La formation IA Constructys est certifiée Qualiopi et 100 % finançable par l'OPCO Constructys pour les entreprises du BTP de moins de 50 salariés. Coût pédagogique couvert jusqu'à 24€ HT/heure/stagiaire.",
  },
];

export default function ChatGPTArtisansBTPPage() {
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
        <span className="text-slate-900">ChatGPT pour artisans BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          ChatGPT pour <span className="text-[var(--accent)]">artisans BTP</span> : automatiser devis et emails
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Guide pratique pour utiliser l&apos;intelligence artificielle dans votre
          métier d&apos;artisan : devis, emails, comptes rendus. Notre{' '}
          <Link href="/formations" className="text-[var(--accent)] font-medium hover:underline">
            formation IA pour entreprises du bâtiment
          </Link>
          {' '}est certifiée Qualiopi, 100 % finançable Constructys.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L&apos;IA permet aux artisans du BTP de gagner 3 à 5 h par semaine sur les devis, emails et comptes rendus. Une formation de 4 h suffit pour être opérationnel.
          </ShortAnswerBlock>
        </div>

        {/* Bloc GEO : Réponse courte */}
        <section className="mt-12 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">
            En bref : ChatGPT pour artisans BTP
          </h2>
          <p className="mt-4 text-slate-700">{DEFINITION.court}</p>
        </section>

        {/* Définition détaillée */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {DEFINITION.titre}
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">{DEFINITION.long}</p>
        </section>

        {/* Cas d&apos;usage concrets */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Cas d&apos;usage concrets de ChatGPT pour artisans
          </h2>
          <p className="mt-3 text-slate-600">
            Les artisans du BTP utilisent ChatGPT principalement pour trois types
            de tâches. Voici des exemples concrets.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CAS_USAGE.map(({ icon: Icon, titre, desc }) => (
              <div
                key={titre}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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

        {/* Exemple pratique */}
        <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Exemple pratique : générer un devis plomberie avec ChatGPT
          </h2>
          <p className="mt-4 text-slate-600">
            Vous êtes plombier et devez envoyer un devis pour une salle de bain.
            Au lieu de repartir d&apos;un ancien document, vous donnez à ChatGPT :
          </p>
          <blockquote className="mt-4 rounded-xl border-l-4 border-[var(--accent)] bg-white p-4 text-slate-700 italic">
            « Rédige un devis pour une rénovation complète de salle de bain : 12
            m², carrelage mural et sol, WC, lavabo, douche à l&apos;italienne,
            miroir. Je suis plombier-chauffagiste en Île-de-France. Inclus
            fournitures et main d&apos;œuvre, TVA 10 %, validité 30 jours. »
          </blockquote>
          <p className="mt-4 text-slate-600">
            ChatGPT génère une structure professionnelle : descriptif des
            prestations, détail des fournitures, main d&apos;œuvre, total HT/TTC,
            conditions. Vous ajustez les prix selon vos marges et envoyez. Temps
            économisé : environ 1h30 par devis.
          </p>
        </section>

        {/* Sécurité */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Sécurité et bonnes pratiques
          </h2>
          <p className="mt-3 text-slate-600">
            Ne collez jamais de données clients réelles (adresses, noms, montants
            confidentiels) dans ChatGPT public. Utilisez ChatGPT Team ou Enterprise
            pour les données sensibles, ou anonymisez avant de demander une
            aide. La{' '}
            <Link href="/formations/ia-btp-paris" className="text-[var(--accent)] font-medium hover:underline">
              formation IA BTP
            </Link>
            {' '}vous apprend un process sécurisé.
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <Shield size={24} className="text-amber-600" />
            <p className="text-sm text-amber-800">
              <strong>Recommandation :</strong> Toujours relire et vérifier les
              chiffres. L&apos;IA peut se tromper ; vous restez responsable du
              document final.
            </p>
          </div>
        </section>

        {/* Formation CTA */}
        <section className="mt-16 rounded-2xl bg-[var(--accent)] p-8 md:p-10 text-white">
          <h2 className="font-display text-2xl font-bold">
            Formation ChatGPT pour artisans BTP
          </h2>
          <p className="mt-4 text-blue-100">
            Laure Olivié forme les artisans et TPE du BTP à ChatGPT depuis 2024.
            Formation 4h ou 7h, 100 % pratique : vous repartez avec des trames et
            des prompts prêts à l&apos;emploi. 100 % finançable OPCO Constructys.
          </p>
          <ul className="mt-6 space-y-2">
            {[
              'Travail sur vos vrais devis, emails et CR',
              'Prompts par métier (plomberie, électricité, maçonnerie…)',
              'Bonnes pratiques sécurité et confidentialité',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={20} strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/formations/ia-btp-paris"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Voir la formation IA BTP
              <ArrowRight size={20} strokeWidth={1.5} />
            </Link>
            <Link
              href="/prendre-rdv"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
          <p className="text-slate-800">
            Vous souhaitez découvrir comment l&apos;IA peut faire gagner du temps à votre entreprise du BTP ?{' '}
            <Link href="/prendre-rdv" className="font-semibold text-[var(--accent)] hover:underline">
              Prenez rendez-vous pour échanger sur votre projet.
            </Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Questions fréquentes sur ChatGPT pour artisans BTP
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

        {/* Liens internes */}
        <section className="mt-16 border-t border-slate-200 pt-12">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            ChatGPT pour artisans BTP : aller plus loin
          </h2>
          <ul className="mt-4 flex flex-wrap gap-4">
            <li>
              <Link
                href="/ia-devis-batiment"
                className="text-[var(--accent)] hover:underline"
              >
                IA devis bâtiment
              </Link>
            </li>
            <li>
              <Link
                href="/ia-conducteur-travaux"
                className="text-[var(--accent)] hover:underline"
              >
                IA conducteur de travaux
              </Link>
            </li>
            <li>
              <Link
                href="/formations/ia-productivite-chantier"
                className="text-[var(--accent)] hover:underline"
              >
                IA pour productivité chantier
              </Link>
            </li>
            <li>
              <Link href="/formations" className="text-[var(--accent)] hover:underline">
                Catalogue des formations IA BTP
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-[var(--accent)] hover:underline">
                Articles et guides blog
              </Link>
            </li>
            <li>
              <Link href="/prendre-rdv" className="text-[var(--accent)] hover:underline">
                Prendre rendez-vous
              </Link>
            </li>
          </ul>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Formation IA Constructys' },
            { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
            { href: '/ia-conducteur-travaux', label: 'IA conducteur de travaux' },
            { href: '/blog', label: 'Articles et guides' },
            { href: '/prendre-rdv', label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
