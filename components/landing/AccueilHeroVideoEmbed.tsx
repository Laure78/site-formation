'use client';

import { OfcPromoVideoEmbed } from '@/components/media/OfcPromoVideoEmbed';

/** Hero accueil — réexport cohérent du embed promo OFC (sans doublon de lien watch). */
export function AccueilHeroVideoEmbed() {
  return <OfcPromoVideoEmbed variant="default" showWatchPageLink={false} />;
}
