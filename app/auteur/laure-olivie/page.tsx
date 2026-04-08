import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { createPageMetadata, getPersonSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_AUTEUR } from '@/lib/faq';
import { getAllArticles } from '@/lib/blog';
import { Award, BookOpen, Building2, FileText } from 'lucide-react';
import { FAQSection } from '@/components/landing/FAQSection';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';

export const metadata = createPageMetadata({
  title: 'Laure Olivié – Formatrice en IA pour le BTP | LinkedIn Learning',
  description:
    "Portrait Laure Olivié : formatrice IA BTP, LinkedIn Learning, méthode terrain. Chiffres et publications. Comprenez qui anime vos formations avant de réserver.",
  path: '/auteur/laure-olivie',
  keywords: [
    'Laure Olivié',
    'formatrice IA BTP',
    'formation ChatGPT BTP',
    'LinkedIn Learning',
    'IA bâtiment',
  ],
});

export default function AuteurPage() {
  const personSchema = getPersonSchema();
  const faqSchema = getFAQSchema(FAQ_AUTEUR);
  const articles = getAllArticles().slice(0, 8);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <nav className="mb-8 text-sm text-slate-600">
          <Link href="/" className="text-[var(--accent)] hover:underline">
            Accueil
          </Link>
          {' / '}
          <span className="text-slate-900">Laure Olivié</span>
        </nav>

        <article>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
            <div className="shrink-0 sm:w-64">
              <ProfilePhoto />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Laure Olivié – Formatrice en intelligence artificielle pour les entreprises du BTP
              </h1>
            </div>
          </div>

          {/* Présentation */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Présentation
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Laure Olivié accompagne les dirigeants de TPE et PME du bâtiment et des travaux publics,
              ainsi que les conducteurs de travaux et équipes support, pour intégrer l&apos;intelligence artificielle dans
              leurs tâches quotidiennes. Son objectif : zéro théorie, 100 % pratique.
              Vous repartez avec des outils opérationnels dès le lendemain.
            </p>
          </section>

          {/* Expertise IA générative */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Expertise IA générative
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Formatrice spécialisée dans l&apos;intégration de l&apos;IA générative
              (ChatGPT et outils similaires) dans les entreprises du bâtiment : devis,
              appels d&apos;offres, emails clients, comptes rendus chantier, gestion
              administrative. Méthode 100 % terrain, travail sur vos vrais documents.
            </p>
          </section>

          {/* Interventions en entreprise */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Interventions en entreprise
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Intervenante et créatrice de contenus pédagogiques sur l&apos;IA pour
              TPE et PME du BTP. Formations en présentiel (Paris, Lyon, Bordeaux, Lille,
              Île-de-France). Partenaire FFB, CSFE, CAPEB, OPPBTP, LinkedIn Learning, OPCO Constructys.
            </p>
          </section>

          {/* Formations IA BTP */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Formations IA BTP
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Programme phare « L&apos;IA au service du bâtiment » (session 4 h), formation
              appels d&apos;offres, IA pour la fonction RH, L&apos;IA au service des Travaux Publics.
              Certifié Qualiopi. 100 % finançable OPCO Constructys.
            </p>
            <Link
              href="/formations"
              className="mt-4 inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
            >
              <BookOpen size={18} strokeWidth={1.5} />
              Voir le catalogue des formations
            </Link>
          </section>

          {/* Statut LinkedIn Learning */}
          <section className="mt-12 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Formatrice LinkedIn Learning
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Créatrice de formations sur LinkedIn Learning, plateforme de référence
              pour le développement des compétences. Cette expérience garantit une
              approche pédagogique concrète et reconnue, adaptée aux entreprises du
              bâtiment.
            </p>
            <a
              href="https://www.linkedin.com/learning/l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
            >
              <Award size={18} strokeWidth={1.5} />
              L&apos;IA pour le BTP : solutions concrètes pour vos chantiers
            </a>
          </section>

          {/* Articles publiés */}
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Articles publiés
            </h2>
            <p className="mt-2 text-slate-600">
              Ressources et guides sur l&apos;IA pour le BTP.
            </p>
            <ul className="mt-6 space-y-3">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="font-medium text-[var(--accent)] hover:underline"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
            >
              <FileText size={18} strokeWidth={1.5} />
              Tous les articles du blog
            </Link>
          </section>

          {/* FAQ */}
          <section className="mt-16">
            <FAQSection
              items={FAQ_AUTEUR}
              title="Questions fréquentes — Laure Olivié"
            />
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-2xl bg-[var(--accent)] p-8 text-white">
            <h2 className="font-display text-xl font-bold">
              Prêt à vous former à l&apos;IA ?
            </h2>
            <p className="mt-3 text-blue-100">
              Prenez rendez-vous pour un échange de 30 minutes et découvrez comment
              l&apos;IA peut faire gagner du temps à votre entreprise du BTP.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50">
                Prendre rendez-vous
              </RdvLink>
              <Link
                href="/formations"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                Voir les formations
              </Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
