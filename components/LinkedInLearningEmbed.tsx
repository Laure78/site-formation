'use client';

const LINKEDIN_INSTRUCTOR_URL =
  'https://www.linkedin.com/learning/instructors/laure-olivie';

const COURSES = {
  recrutement: {
    embedUrl:
      'https://www.linkedin.com/learning/embed/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement/bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement?autoplay=true&claim=AQGQO6MNxFDuwwAAAZzX7Q8QyTWXp4m3n2WT8f7-G2B6GQph3u3QQs1mzO6h-8cHDZ7cDUueTZ-GMY_sdQLCXWW3Oi2gkRpCjj_gq-D7WdpPOyxavUPcoK6XghDWG9Dgfcv5sDYWo0t5lmhc6vhAqKosqpJXfNFxJ7EYCSjUht9XjrynE_KG2jb425sHSCNQKsXxCaNIkG3uk1xZjYcfOOXIYYqlcPVR2qzg2MB1LhLxBDgY7mTjjLAWOpDUEgDbvclTofs1Ds2nO-jp2l6gq_8gqODX0ScdAe1PxbfTH4-RkjyabXGlR7KsE3FRSBv2g1FkMRMpZ9pbmabEIA1uPr84TRZ44jleBhDqmkLFX_juJ-16iK-H8tdfZ4KqkjP7T-q4v4YMFGEaUSN7QXBsCvC_QjqEjsWJPRibSRLV80mzZRW8cAuzwq8oAwYJwdV1YYYKJrtREeB-3TRhtbEVGNJq3hRe7NMROiTDJ0DeFc8z_Bo24jbP04xpWbUoKAVfGbv_JuBlOErMNZoyJhOkZ_CredN_r56-A-UVIpr_HrJCT9tV0dHtCO_iM9j7ezoAj0PIuKKaV-QsI0mOaWIsIaI1M3VBFEMwipWWwdyweQtekUbaFXEIkF6XOr5s7WaihpyGxPVTBriZSDakCCIikzqLINZCNIhLRE7hktC79PRm-enCCs5SzttF93TWdcfWQm9aLSs-JCSMWJOxbwCxgyzqVbnzA9SwD9ffnX2MTALombnGlYSPirwREeEqeSDtOxNdlNOhGlHxF2OIVrrmsK2RCpV0l3ph4vqPPJQlxG_-uWkJuWlXVF9h9AT6RiAevkHfNgUedNW7jyXAPpxogD0ORWktFo0AU4UBFrE-UD1JHReIvhQEYmTl3egvTOEXQOFtqLoRja-U7C2jL8z00vDxjRnOawEFOSl7ndGSmDC05XPiYFHOE7smZ8TfOWdZBhSoSqsqmtC5sFfN2en52kcx4Yg_yjK36ljnhmN6ucJmZxIL9jMJ9bvvTVCrO6Zp9HFqXarPCvGKpYRtotLYEgbBl8Dy77blWKWRDf228i_iQwld-0L-mlIvqcq0bU8zXS4BpyURNiaTW8li9KfHOm_-0ytnCT3zB56uAPPlb1x12soh4MAznc2x__S7yLqVdJ0dRrKE2I7fr6LVfbHAzNRjzET6wrR5I5jVaOTE538h9GaoXIt9LkY2SPdacRC6tjYWHSF0Z0VQB3wCFlgwj2e9fHI784LLutFOd54C8OOKwqTp6kZqnLX-WPr2jk4ZWart1vM',
    courseUrl:
      'https://fr.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement',
    title: "L'IA pour les TPE et PME : Recruter sa main-d'œuvre efficacement",
    firstLessonTitle: "Bienvenue dans « L'IA pour les TPE et PME : recruter sa main-d'œuvre efficacement »",
  },
  chantiers: {
    embedUrl:
      'https://www.linkedin.com/learning/embed/l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers/bienvenue-dans-l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers?autoplay=true&claim=AQGjwWVXazLk9wAAAZzX81nmBwxUzTmERjzhbvzi9Wm4hV3qQPbxyHX497NWf_2zkqYlKcaS9wYJBWP_6FXjwh0gSEKaDWGfS9Wtwi4g3uMpCcyt5TbRLmXuUJH-iHpfvyKzwSZ_Pb18poHYxZSEFqqAtsZvg9lDwBn06RPAKsRYlgGA7CTghau5Vdr5NLMTQH6RnRjE8kQVWOCM6VX4l4-pkT8lkCx22kvfota-ADcnxGhjbtY0CtEIyfLsy3nban58gLYIUGHyO3eAv02agdbzEHOe7ScntIfZSdQVkLODxxRWrvFf6LVelJOxWuzgDDZkKXtc8zWck4CR8Wej-WZtOK7-Y2cfVRfqxHkLl1-Cbdiw6zeplz6jBT10ytxqtNYYZKw78ZU9AY7t9BG4_WA5mP2TJtEl2I9MMxxn74YHsUpsAhX_aTx18cQpRWDxlQpfrERrchIfGI6q4QpHzbu8rTOpkVF0A9q4Y7sCDEzO6CWtKyZYIvIr8kyO6Zf8OfU8LDfW4UNOO1Eciz9hQA2gSsiRk6C9HN5hgGrPs1a5jLqE-FM_Np6LuI31QKc4I0K4WQpOFCv085h_F0wMTDgnzKHxVLu17qjAMPTm63_CDFJRSGXLsHna7r-PpxQi1k7JEON0usSlSjm0u_2V7KQ4QyEJYuvguXgqHi4KhxF6Tc_eMKw-B6Hj4ZvpGhRJCbK5ev5CQLTteaX3ATMHX2TpXaBZhE-ArM-YkiE4OswoIKtRvCPAwAgUv_D9aAvcTYNyBMRM2rmMpullYwUmiiDqJTZ559OW1M4oWcO5RUWh8GET3_SL75abMxH_FHMWPiqA7c7b0aNUHyKt-AJGTDBQWv9aaOgJjVOfZ7llSoMWZcj2FT8QaH3Z-WTHfvX7iLdbR-UFZyRCAOdvdjrVmLWMyCClCbeVyOcL4NpFFkvikQ7_vT25s8cGSp39aTf4nOr6b9bEQxEDREoiwXRQRXmDJUa5IRgsHT3hXBmcwrYivu-2Mlco6qZZuUJhL4-Ap1X_O_Wmmre7wcgvfLXkL3lwTNjmh52LEutYu77YuW6oEQDu0TL2-s35S9qWrbe5LTVIN8QVTaRwZOJxaCX-N9gQxQqYGLn5tApz_bqPjQM49y9XHByzJO4V66dW3Is-0D5pCGeMzt4TI10PX6udZvBTpsG3p2ol4v2MSf70IBdm4-ydXi3ahcuzHSBrXTrFefACc3m8URJOLuplGvSAFV0P8cUaPFhlU0xpwJ54Z_JKszn1vrkro98CxgPVgD96IJaDsDQ',
    courseUrl:
      'https://fr.linkedin.com/learning/l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers',
    title: "L'IA pour le BTP : Des solutions concrètes pour vos chantiers",
    firstLessonTitle: "Bienvenue dans « L'IA pour le BTP : des solutions concrètes pour vos chantiers »",
  },
} as const;

type CourseId = keyof typeof COURSES;

interface LinkedInLearningEmbedProps {
  /** Cours à afficher : recrutement ou chantiers */
  course?: CourseId;
  /** Afficher le titre et les liens sous la vidéo */
  showCaption?: boolean;
  /** Variante compacte (sans cadre supplémentaire) */
  compact?: boolean;
}

export function LinkedInLearningEmbed({
  course = 'recrutement',
  showCaption = true,
  compact = false,
}: LinkedInLearningEmbedProps) {
  const c = COURSES[course];
  const firstLessonSlug = course === 'recrutement'
    ? 'bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement'
    : 'bienvenue-dans-l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers';

  return (
    <div className={compact ? '' : 'rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm'}>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={c.embedUrl}
          title={`${c.title} — Laure Olivié`}
          allowFullScreen
          allow="autoplay; fullscreen"
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {showCaption && (
        <div className="border-t border-slate-100 p-4">
          <p className="text-sm text-slate-600">
            <strong>
              <a
                href={`${c.courseUrl}/${firstLessonSlug}?trk=embed_lil`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                {c.firstLessonTitle}
              </a>
            </strong>{' '}
            du cours{' '}
            <strong>
              <a
                href={`${c.courseUrl}?trk=embed_lil`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                {c.title}
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
