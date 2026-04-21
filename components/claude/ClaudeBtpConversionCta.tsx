import { PillarConversionCta } from '@/components/pillar/PillarConversionCta';
import { calendlyClaudeBtpGuideUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';

/**
 * Bloc conversion fin de page — CTA Calendly avec UTM bottom-cta (texte inchangé).
 */
export function ClaudeBtpConversionCta() {
  return (
    <PillarConversionCta
      titleId="formation-ofc"
      title="Formation Claude AI avec OFC"
      description={
        <>
          4 h — Qualiopi — finançable Constructys. Chat, Projets, Cowork, Code, Chrome : présentiel en Île-de-France ou
          distanciel.
        </>
      }
      bullets={[
        "Jusqu'à 24 € HT/h/stagiaire (plafonds Constructys)",
        'Entreprises < 11 sal. : prise en charge salaires (15 € HT/h)',
      ]}
      footnote={`FFB Grand Paris, FFB IDF, CSFE, CNAM, Lefebvre Dalloz · +${formatProfessionalsTrainedCount()} formés · ${SOCIAL_PROOF.AVERAGE_RATING}`}
      primaryCta={{ href: calendlyClaudeBtpGuideUrl('bottom-cta'), label: 'Prendre rendez-vous' }}
      secondaryCta={{ href: LINKS.contact, label: 'Contact formation IA BTP', external: false }}
    />
  );
}
