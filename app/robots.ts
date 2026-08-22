import type { MetadataRoute } from 'next';
import { buildRobotsMetadata } from '@/lib/robots-txt';

/** `/robots.txt` — Google/Bing + bots IA autorisés ; `/api/` et zones techniques bloquées. */
export default function robots(): MetadataRoute.Robots {
  return buildRobotsMetadata();
}
