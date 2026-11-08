import Image from 'next/image';
import { ClipboardCheck, FileText, Layers, Ruler, Shield, Target } from 'lucide-react';
import { NIV05_MAQUETTE_PEDAGOGIE_BG } from '@/lib/formation-niv05-maquette-assets';

const ITEMS = [
  { icon: Target, label: 'Cas MOE concrets' },
  { icon: FileText, label: 'CCTP, DPGF, DCE' },
  { icon: Ruler, label: 'Contrôles métrés' },
  { icon: Layers, label: 'Modèles réutilisables' },
  { icon: Shield, label: 'Confidentialité' },
  { icon: ClipboardCheck, label: 'Validation humaine' },
] as const;

export function Niv05MaquettePedagogyBanner() {
  return (
    <section aria-labelledby="niv05-pedagogie-title" className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={NIV05_MAQUETTE_PEDAGOGIE_BG}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4F]/95 via-[#0B1F4F]/90 to-[#377CF3]/40" />
        </div>
        <div className="relative px-6 py-10 text-white md:px-10 md:py-12">
          <h2 id="niv05-pedagogie-title" className="ofc-type-h2 text-white">
            Une pédagogie ancrée dans la réalité de la maîtrise d&apos;œuvre BTP
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {ITEMS.map((item) => (
              <li key={item.label} className="flex flex-col items-center gap-2 text-center">
                <item.icon className="h-7 w-7 text-white" aria-hidden />
                <span className="text-sm font-semibold leading-snug text-white">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
