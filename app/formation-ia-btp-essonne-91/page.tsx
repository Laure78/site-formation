import {
  GeoFormationPage,
  geoFormationMetadata,
} from '@/components/geo/GeoFormationPage';
import { GEO_FORMATION_ESSONNE_91 } from '@/lib/geo-formation-config';

export const revalidate = 3600;

export const metadata = geoFormationMetadata(GEO_FORMATION_ESSONNE_91);

export default function FormationIaBtpEssonne91Page() {
  return <GeoFormationPage {...GEO_FORMATION_ESSONNE_91} />;
}
