import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { Check, FileText, Calendar, ClipboardList, ArrowRight } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA conducteur travaux — CR chantier | BTP',
  description:
    "Formation IA conducteur de travaux : CR, rapports et coordination plus rapides. Méthode terrain. Constructys, Qualiopi. Obtenez une proposition adaptée.",
  path: '/ia-conducteur-travaux',
  keywords: [
    'IA conducteur de travaux',
    'IA gestion chantier',
    'ChatGPT compte rendu chantier',
    'IA pour chantier BTP',
    'automatiser CR chantier',
  ],
});

const DEFINITION = {
  titre: "Qu'est-ce que l'IA pour conducteur de travaux ?",
  court: "L'IA pour conducteur de travaux désigne l'utilisation de ChatGPT et outils similaires pour automatiser la rédaction des CR chantier, rapports d'avancement et documents de coordination. Le conducteur gagne 2h/jour en moyenne.",
  long: "Le conducteur de travaux passe une part importante de son temps à rédiger et formaliser : CR de chantier, rapports d'avancement, PV de réunion, coordination entre corps de métier. L'intelligence artificielle peut transformer des notes brutes (vocales ou écrites) en documents structurés, prêts à être diffusés aux équipes et au maître d'ouvrage. Sans remplacer l'expertise terrain : vous restez le garant du contenu ; l'IA vous fait gagner la mise en forme.",
};

const CAS_USAGE = [
  {
    icon: FileText,
    titre: 'Comptes rendus de chantier',
    desc: "Transformez vos notes de visite en CR formalisés : avancement, points de vigilance, prochaines étapes. L'IA structure le document selon les normes usuelles (date, lieu, participants, décisions).",
  },
  {
    icon: Calendar,
    titre: "Rapports d'avancement",
    desc: "Générez vos rapports mensuels ou hebdomadaires à partir de vos données (pourcentages, jalons, retards). L'IA rédige les synthèses et les commentaires récurrents.",
  },
  {
    icon: ClipboardList,
    titre: 'Coordination et réunions',
    desc: "PV de réunion, ordres de service, fiches de suivi : l'IA aide à formaliser les échanges et les décisions. Moins de temps à taper, plus de temps sur le terrain.",
  },
];

const FAQ_ITEMS = [
  {
    q: "L'IA remplace-t-elle le conducteur de travaux ?",
    a: "Non. L'IA assiste la rédaction et la formalisation. Les choix techniques, la coordination des équipes, le suivi des travaux et la relation avec le maître d'ouvrage restent le cœur du métier. L'IA libère du temps pour ces missions à forte valeur ajoutée.",
  },
  {
    q: 'Combien de temps un conducteur gagne-t-il avec l\'IA ?',
    a: "Les conducteurs formés rapportent en moyenne 2h gagnées par jour sur les CR, rapports et emails. Le gain est d'autant plus important que les documents sont répétitifs et structurés.",
  },
  {
    q: 'Faut-il des compétences techniques ?',
    a: "Non. Une formation de 4h à 7h suffit pour maîtriser les prompts et les trames adaptés au métier. Laure Olivié forme des conducteurs de travaux sans aucun prérequis en informatique.",
  },
  {
    q: 'La formation est-elle finançable ?',
    a: "Oui. La formation IA Constructys est 100 % finançable par l'OPCO Constructys pour les entreprises du BTP. Le module « L'IA au service du bâtiment » inclut un volet dédié aux CR et rapports chantier.",
  },
];

export default function IAConducteurTravauxPage() {
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
        <span className="text-slate-900">IA pour conducteur de travaux</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA BTP : <span className="text-[var(--accent)]">conducteur de travaux</span> et CR chantier
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          L&apos;IA pour gestion administrative BTP s&apos;adapte aux métiers chantier. Gagnez 2h par jour
          sur vos comptes rendus et rapports grâce à l&apos;intelligence artificielle. Notre{' '}
          <Link href="/formations" className="text-[var(--accent)] font-medium hover:underline">
            formation IA BTP
          </Link>
          {' '}pratique pour conducteurs BTP est finançable Constructys.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L&apos;IA permet aux entreprises du BTP de gagner 3 à 5 h par semaine sur les devis, emails et comptes rendus. Une formation de 4 h suffit pour être opérationnel.
          </ShortAnswerBlock>
        </div>

        {/* Bloc GEO */}
        <section className="mt-12 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">
            En bref : IA pour conducteur de travaux
          </h2>
          <p className="mt-4 text-slate-700">{DEFINITION.court}</p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {DEFINITION.titre}
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {DEFINITION.long} Pour apprendre à{' '}
            <Link href="/formations" className="text-[var(--accent)] font-medium hover:underline">
              utiliser ChatGPT dans le BTP
            </Link>
            , une formation courte suffit.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Cas d&apos;usage concrets
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CAS_USAGE.map(({ icon: Icon, titre, desc }) => (
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

        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ
          </h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div
                key={q}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600"><FAQAnswer content={a} /></p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-[var(--accent)] p-8 text-white">
          <h2 className="font-display text-2xl font-bold">
            Formation IA pour conducteurs de travaux
          </h2>
          <p className="mt-4 text-blue-100">
            Module CR et rapports dans la formation « L&apos;IA au service du bâtiment ».
            Travail sur vos vrais documents. 100 % finançable Constructys.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/formations/ia-btp-paris"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Voir le programme
              <ArrowRight size={20} strokeWidth={1.5} />
            </Link>
            <RdvLink className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10">
              Prendre rendez-vous
            </RdvLink>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
          <p className="text-slate-800">
            Vous souhaitez découvrir comment l&apos;IA peut faire gagner du temps à votre entreprise du BTP ?{' '}
            <RdvLink className="font-semibold text-[var(--accent)] hover:underline">
              Prenez rendez-vous pour échanger sur votre projet.
            </RdvLink>
          </p>
        </section>

        <section className="mt-16 border-t border-slate-200 pt-12">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Formation IA conducteur de travaux : ressources
          </h2>
          <ul className="mt-4 flex flex-wrap gap-4">
            <li>
              <Link href="/formations" className="text-[var(--accent)] hover:underline">
                Catalogue des formations IA BTP
              </Link>
            </li>
            <li>
              <Link href="/formation-ia-artisans-btp" className="text-[var(--accent)] hover:underline">
                ChatGPT pour entreprises BTP
              </Link>
            </li>
            <li>
              <Link href="/ia-devis-batiment" className="text-[var(--accent)] hover:underline">
                IA devis bâtiment
              </Link>
            </li>
            <li>
              <Link href="/formations" className="text-[var(--accent)] hover:underline">
                Formation IA BTP
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-[var(--accent)] hover:underline">
                Articles et guides blog
              </Link>
            </li>
            <li>
              <RdvLink className="text-[var(--accent)] hover:underline">
                Prendre rendez-vous
              </RdvLink>
            </li>
          </ul>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Formation IA Constructys' },
            { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
            { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
            { href: '/blog', label: 'Articles et guides' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
