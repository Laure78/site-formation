'use client';

const LINKEDIN_EMBED_URL =
  'https://www.linkedin.com/learning/embed/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement/bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement?autoplay=true&claim=AQGQO6MNxFDuwwAAAZzX7Q8QyTWXp4m3n2WT8f7-G2B6GQph3u3QQs1mzO6h-8cHDZ7cDUueTZ-GMY_sdQLCXWW3Oi2gkRpCjj_gq-D7WdpPOyxavUPcoK6XghDWG9Dgfcv5sDYWo0t5lmhc6vhAqKosqpJXfNFxJ7EYCSjUht9XjrynE_KG2jb425sHSCNQKsXxCaNIkG3uk1xZjYcfOOXIYYqlcPVR2qzg2MB1LhLxBDgY7mTjjLAWOpDUEgDbvclTofs1Ds2nO-jp2l6gq_8gqODX0ScdAe1PxbfTH4-RkjyabXGlR7KsE3FRSBv2g1FkMRMpZ9pbmabEIA1uPr84TRZ44jleBhDqmkLFX_juJ-16iK-H8tdfZ4KqkjP7T-q4v4YMFGEaUSN7QXBsCvC_QjqEjsWJPRibSRLV80mzZRW8cAuzwq8oAwYJwdV1YYYKJrtREeB-3TRhtbEVGNJq3hRe7NMROiTDJ0DeFc8z_Bo24jbP04xpWbUoKAVfGbv_JuBlOErMNZoyJhOkZ_CredN_r56-A-UVIpr_HrJCT9tV0dHtCO_iM9j7ezoAj0PIuKKaV-QsI0mOaWIsIaI1M3VBFEMwipWWwdyweQtekUbaFXEIkF6XOr5s7WaihpyGxPVTBriZSDakCCIikzqLINZCNIhLRE7hktC79PRm-enCCs5SzttF93TWdcfWQm9aLSs-JCSMWJOxbwCxgyzqVbnzA9SwD9ffnX2MTALombnGlYSPirwREeEqeSDtOxNdlNOhGlHxF2OIVrrmsK2RCpV0l3ph4vqPPJQlxG_-uWkJuWlXVF9h9AT6RiAevkHfNgUedNW7jyXAPpxogD0ORWktFo0AU4UBFrE-UD1JHReIvhQEYmTl3egvTOEXQOFtqLoRja-U7C2jL8z00vDxjRnOawEFOSl7ndGSmDC05XPiYFHOE7smZ8TfOWdZBhSoSqsqmtC5sFfN2en52kcx4Yg_yjK36ljnhmN6ucJmZxIL9jMJ9bvvTVCrO6Zp9HFqXarPCvGKpYRtotLYEgbBl8Dy77blWKWRDf228i_iQwld-0L-mlIvqcq0bU8zXS4BpyURNiaTW8li9KfHOm_-0ytnCT3zB56uAPPlb1x12soh4MAznc2x__S7yLqVdJ0dRrKE2I7fr6LVfbHAzNRjzET6wrR5I5jVaOTE538h9GaoXIt9LkY2SPdacRC6tjYWHSF0Z0VQB3wCFlgwj2e9fHI784LLutFOd54C8OOKwqTp6kZqnLX-WPr2jk4ZWart1vM';

const LINKEDIN_COURSE_URL =
  'https://www.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement';

const LINKEDIN_INSTRUCTOR_URL =
  'https://www.linkedin.com/learning/instructors/laure-olivie';

interface LinkedInLearningEmbedProps {
  /** Afficher le titre et les liens sous la vidéo */
  showCaption?: boolean;
  /** Variante compacte (sans cadre supplémentaire) */
  compact?: boolean;
}

export function LinkedInLearningEmbed({
  showCaption = true,
  compact = false,
}: LinkedInLearningEmbedProps) {
  return (
    <div className={compact ? '' : 'rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm'}>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={LINKEDIN_EMBED_URL}
          title="L'IA pour les artisans et TPE : Recruter sa main-d'œuvre efficacement — Laure Olivié"
          allowFullScreen
          allow="autoplay; fullscreen"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {showCaption && (
        <div className="border-t border-slate-100 p-4">
          <p className="text-sm text-slate-600">
            <strong>
              <a
                href={`${LINKEDIN_COURSE_URL}/bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement?trk=embed_lil`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                Bienvenue dans « L&apos;IA pour les artisans et TPE : recruter sa main-d&apos;œuvre efficacement »
              </a>
            </strong>{' '}
            du cours{' '}
            <strong>
              <a
                href={`${LINKEDIN_COURSE_URL}?trk=embed_lil`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                L&apos;IA pour les artisans et TPE : Recruter sa main-d&apos;œuvre efficacement
              </a>
            </strong>{' '}
            par{' '}
            <strong>
              <a
                href={`${LINKEDIN_INSTRUCTOR_URL}?trk=embed_lil`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                Laure Olivié
              </a>
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}
