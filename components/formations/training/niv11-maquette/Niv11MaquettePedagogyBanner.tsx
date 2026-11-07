import Image from 'next/image';
import { ClipboardCheck, FileText, Layers, Shield, Target } from 'lucide-react';
import { NIV11_MAQUETTE_PEDAGOGIE_BG } from '@/lib/formation-niv11-maquette-assets';

const ITEMS = [
  { icon: Target, label: 'Cas AMO concrets' },
  { icon: FileText, label: 'Documents métier' },
  { icon: Layers, label: 'Modèles réutilisables' },
  { icon: Shield, label: 'Charte et confidentialité' },
  { icon: ClipboardCheck, label: 'Validation humaine' },
] as const;

export function Niv11MaquettePedagogyBanner() {
  return (
    <section aria-labelledby="niv11-pedagogie-title" className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={NIV11_MAQUETTE_PEDAGOGIE_BG}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4F]/95 via-[#0B1F4F]/90 to-[#377CF3]/40" />
        </div>
        <div className="relative px-6 py-10 text-white md:px-10 md:py-12">
          <h2 id="niv11-pedagogie-title" className="ofc-type-h2 text-white">
            Une pédagogie ancrée dans la réalité de l&apos;AMO BTP
          </h2>
          <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch lg:flex-nowrap lg:divide-x lg:divide-white/25">
            {ITEMS.map((item) => (
              <li
                key={item.label}
                className="flex flex-1 flex-col items-center gap-2 px-0 text-center sm:min-w-[9rem] lg:px-4"
              >
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
