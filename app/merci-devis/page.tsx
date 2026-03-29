import Link from 'next/link';
import { CheckCircle, Pencil, Phone, Mail, Home, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Demande reçue — Merci',
  description: 'Votre demande de devis a bien été envoyée. Réponse sous 24h.',
  robots: { index: false, follow: false },
};

const ETAPES = [
  {
    titre: 'Réception de votre devis (24h)',
    desc: 'Vous recevrez un devis détaillé par email avec le programme personnalisé',
  },
  {
    titre: 'Échange téléphonique (si souhaité)',
    desc: 'Nous répondons à toutes vos questions sur le contenu et les modalités',
  },
  {
    titre: 'Montage du dossier OPCO',
    desc: "Nous vous accompagnons gratuitement dans les démarches de financement",
  },
  {
    titre: 'Planification de la formation',
    desc: "Organisation selon vos disponibilités et contraintes",
  },
];

export default function MerciDevisPage() {
  return (
    <div className="min-h-[60vh] bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          {/* Succès */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-white">
              <CheckCircle size={36} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="mt-6 text-center font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Demande reçue avec succès !
          </h1>
          <p className="mt-3 flex items-center justify-center gap-2 text-slate-600">
            <CheckCircle size={18} strokeWidth={1.5} className="shrink-0 text-emerald-500" />
            Votre demande de devis a bien été envoyée
          </p>
          <p className="mt-6 text-center text-slate-600">
            Merci pour votre confiance. Nous avons bien reçu votre demande et nous
            nous engageons à vous envoyer un devis personnalisé{' '}
            <span className="font-semibold text-slate-900">sous 24 heures</span>{' '}
            incluant le programme détaillé et les modalités de financement OPCO.
          </p>

          {/* Les prochaines étapes */}
          <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="flex items-center gap-2 font-semibold text-slate-900">
              <Pencil size={18} strokeWidth={1.5} className="text-[var(--accent)]" />
              Les prochaines étapes
            </h2>
            <ul className="mt-6 space-y-6">
              {ETAPES.map((etape, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{etape.titre}</p>
                    <p className="mt-1 text-sm text-slate-600">{etape.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact rapide */}
          <div className="mt-8 rounded-xl border-2 border-[var(--accent-soft)] bg-[var(--accent-soft)] p-6">
            <p className="font-semibold text-slate-900">
              Besoin d&apos;une réponse plus rapide ?
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-6">
              <a
                href="tel:+33695661818"
                className="flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
              >
                <Phone size={20} strokeWidth={1.5} />
                06 95 66 18 18
              </a>
              <a
                href="mailto:laureolivie@yahoo.fr"
                className="flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
              >
                <Mail size={20} strokeWidth={1.5} />
                laureolivie@yahoo.fr
              </a>
            </div>
          </div>
        </div>

        {/* Boutons navigation */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href="/formations"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-700 sm:w-auto"
          >
            <BookOpen size={20} strokeWidth={1.5} />
            Voir le catalogue formations
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)] sm:w-auto"
          >
            <Home size={20} strokeWidth={1.5} />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/clients-partenaires"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)] sm:w-auto"
          >
            Voir les cas concrets
          </Link>
        </div>
      </div>
    </div>
  );
}
