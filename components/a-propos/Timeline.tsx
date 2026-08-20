'use client';

import { BadgeCheck, Briefcase, GraduationCap, HardHat, Rocket, Sparkles } from 'lucide-react';
import { A_PROPOS_TIMELINE } from '@/lib/a-propos-eeat-content';
import { EeatRichText } from '@/components/a-propos/EeatRichText';
import { Reveal } from '@/components/motion/Reveal';

const TIMELINE_ICONS = [HardHat, Briefcase, GraduationCap, Sparkles, Rocket, BadgeCheck, GraduationCap] as const;

export function Timeline() {
  return (
    <Reveal as="section" id="experience" distance={16} className="scroll-mt-24">
      <div className="mx-auto max-w-6xl rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
          Expérience professionnelle
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#64748B]">
          De la conduite de travaux à la formation IA (organisme certifié Qualiopi) — un parcours construit sur le terrain, pas
          depuis un bureau tech.
        </p>
        <ol className="relative mt-12 max-w-4xl space-y-6 border-l border-[#E2E8F0] pl-8 lg:border-0 lg:pl-0">
          {A_PROPOS_TIMELINE.map((step, index) => {
            const Icon = TIMELINE_ICONS[index] ?? BadgeCheck;
            return (
              <Reveal
                as="li"
                key={step.period}
                delay={index * 80}
                distance={12}
                className={`relative lg:grid lg:grid-cols-2 ${index % 2 ? 'lg:text-right' : ''}`}
              >
                <div className={`hidden lg:block ${index % 2 ? 'lg:col-start-2' : ''}`} />
                <div
                  className={`group rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                    index % 2 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2'
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F59E0B]">{step.period}</p>
                  <h3 className="mt-2 text-xl font-bold text-[#0F172A]">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">
                    <EeatRichText text={step.body} />
                  </p>
                </div>
                <div className="a-propos-timeline-dot absolute -left-[48px] top-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF] ring-4 ring-white transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100 lg:left-1/2 lg:-translate-x-1/2">
                  <Icon className="h-7 w-7 text-[#377CF3]" aria-hidden />
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Reveal>
  );
}
