import {
  GeoFormationPage,
  geoFormationMetadata,
} from '@/components/geo/GeoFormationPage';
import { GEO_FORMATION_HAUTS_DE_SEINE_92 } from '@/lib/geo-formation-config';


export const revalidate = 3600;
export const metadata = geoFormationMetadata(GEO_FORMATION_HAUTS_DE_SEINE_92);

export default function FormationIaBtpHautsDeSeine92Page() {
  return <GeoFormationPage {...GEO_FORMATION_HAUTS_DE_SEINE_92} />;
}
