import {
  GeoFormationPage,
  geoFormationMetadata,
} from '@/components/geo/GeoFormationPage';
import { GEO_FORMATION_PARIS_75 } from '@/lib/geo-formation-config';

export const revalidate = 3600;
export const metadata = geoFormationMetadata(GEO_FORMATION_PARIS_75);

export default function FormationIaBtpParisPage() {
  return <GeoFormationPage {...GEO_FORMATION_PARIS_75} />;
}
