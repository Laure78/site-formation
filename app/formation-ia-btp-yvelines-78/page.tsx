import {
  GeoFormationPage,
  geoFormationMetadata,
} from '@/components/geo/GeoFormationPage';
import { GEO_FORMATION_YVELINES_78 } from '@/lib/geo-formation-config';


export const revalidate = 3600;
export const metadata = geoFormationMetadata(GEO_FORMATION_YVELINES_78);

export default function FormationIaBtpYvelines78Page() {
  return <GeoFormationPage {...GEO_FORMATION_YVELINES_78} />;
}
