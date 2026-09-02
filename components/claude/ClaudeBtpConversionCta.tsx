import { PillarConversionCta } from '@/components/pillar/PillarConversionCta';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import { calendlyClaudeBtpGuideUrl } from '@/lib/calendly';
import { SOCIAL_PROOF } from '@/lib/constants';
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
          4 h — Qualiopi — financement possible selon éligibilité. Chat, Projets, Cowork, Code, Chrome : intra-entreprise, dans vos locaux,
          exclusivement en présentiel, en Île-de-France.
        </>
      }
      bullets={[
        "Jusqu'à 24 € HT/h/stagiaire (plafonds Constructys)",
        'Entreprises < 11 sal. : prise en charge salaires (15 € HT/h)',
      ]}
      footnote={`FFB Grand Paris, FFB IDF, CSFE, CNAM, Lefebvre Dalloz · +$· `}
      primaryCta={{ href: calendlyClaudeBtpGuideUrl('bottom-cta'), label: CTA_RDV_LABEL }}
      secondaryCta={{ href: LINKS.contact, label: 'Contact formation IA appliquée au bâtiment', external: false }}
    />
  );
}
