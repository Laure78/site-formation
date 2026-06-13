import {
  GeoFormationPage,
  geoFormationMetadata,
} from '@/components/geo/GeoFormationPage';
import { GEO_FORMATION_VAL_DOISE_95 } from '@/lib/geo-formation-config';

export const revalidate = 3600;

export const metadata = geoFormationMetadata(GEO_FORMATION_VAL_DOISE_95);

export default function FormationIaBtpValDoise95Page() {
  return <GeoFormationPage {...GEO_FORMATION_VAL_DOISE_95} />;
}
