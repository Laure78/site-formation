'use client';

import { usePathname } from 'next/navigation';
import { ProspectionSubnav } from './ProspectionSubnav';

export function ProspectionSubnavBridge() {
  const pathname = usePathname();
  return <ProspectionSubnav pathname={pathname} />;
}
