import Link from 'next/link';
import { CheckCircle, Mail, Home, BookOpen, Calendar } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { buildGoogleCalendarUrl, formatRdvDateLong, formatRdvTime } from '@/lib/rdv-datetime';
import { CONTACT } from '@/lib/constants';

export const metadata = createPageMetadata({
  title: 'Rendez-vous confirmé',
  description:
    'Votre rendez-vous est enregistré. Vous recevez un email de confirmation avec le lieu et les horaires convenus avec Laure Olivié.',
  path: '/merci-rdv',
  keywords: ['confirmation rendez-vous formation'],
  robots: { index: false, follow: false },
});

export default async function MerciRDVPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string; start?: string; prenom?: string; m?: string }>;
}) {
  const { start, prenom, m } = await searchParams;
  const firstName = prenom?.trim() || '';
  const startIso = start?.trim() || '';
  const manageToken = m?.trim() || '';

  const dateLabel = startIso ? formatRdvDateLong(startIso) : '';
  const timeLabel = startIso ? formatRdvTime(startIso) : '';
  const endIso = startIso
    ? new Date(new Date(startIso).getTime() + 30 * 60_000).toISOString()
    : '';

  const googleCalUrl = startIso
    ? buildGoogleCalendarUrl({
        title: 'Rendez-vous Laure Olivié — Formation IA BTP',
        startIso,
        endIso,
        details: 'Échange découverte formation IA pour le BTP',
      })
    : null;

  const manageUrl = manageToken ? `/rdv/${manageToken}` : null;

  return (
    <div className="min-h-[60vh] bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-white">
              <CheckCircle size={36} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="mt-6 text-center font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Votre rendez-vous est confirmé
          </h1>
          <p className="mt-3 text-center text-slate-600">
            Merci{firstName ? ` ${firstName}` : ''}.
          </p>

          {dateLabel && (
            <div className="mt-6 rounded-xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-5 text-center">
              <p className="text-sm font-medium text-slate-600">
                Votre rendez-vous avec Laure Olivié est bien enregistré pour :
              </p>
              <p className="mt-2 font-display text-lg font-bold capitalize text-slate-900">
                {dateLabel}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-slate-900">à {timeLabel}</p>
              <p className="mt-1 text-sm text-slate-600">(30 minutes)</p>
            </div>
          )}

          <p className="mt-6 text-center text-slate-600">
            Vous allez recevoir un email de confirmation avec toutes les informations utiles.
          </p>
          <p className="mt-4 text-center text-sm leading-relaxed text-slate-600">
            Pour préparer notre échange, vous pouvez simplement réfléchir au processus ou à la tâche
            qui vous fait perdre le plus de temps aujourd&apos;hui.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {googleCalUrl && (
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 font-semibold text-white hover:bg-blue-700"
              >
                <Calendar size={18} strokeWidth={1.5} />
                Ajouter au calendrier
              </a>
            )}
            {manageUrl && (
              <>
                <Link
                  href={`${manageUrl}?action=modifier`}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-5 font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Modifier le rendez-vous
                </Link>
                <Link
                  href={`${manageUrl}?action=annuler`}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-5 font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Annuler le rendez-vous
                </Link>
              </>
            )}
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="font-semibold text-slate-900">Une question avant notre échange ?</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-3 inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
            >
              <Mail size={18} strokeWidth={1.5} />
              {CONTACT.email}
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href={LINKS.formations}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-700 sm:w-auto"
          >
            <BookOpen size={20} strokeWidth={1.5} />
            Voir le catalogue formations
          </Link>
          <Link
            href={LINKS.home}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)] sm:w-auto"
          >
            <Home size={20} strokeWidth={1.5} />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
