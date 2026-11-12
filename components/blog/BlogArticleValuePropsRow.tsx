import { BookOpen, ClipboardList, FileText, ShieldCheck } from 'lucide-react';

const ITEMS = [
  { icon: ClipboardList, label: '7 usages concrets' },
  { icon: FileText, label: 'Prompts à adapter' },
  { icon: BookOpen, label: 'Ressources gratuites' },
  { icon: ShieldCheck, label: 'Validation humaine' },
] as const;

export function BlogArticleValuePropsRow() {
  return (
    <ul className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-4" aria-label="Ce que contient l’article">
      {ITEMS.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#377CF3]/10 text-[#377CF3]">
            <Icon size={20} strokeWidth={1.5} aria-hidden />
          </span>
          <span className="text-xs font-semibold leading-snug text-slate-800 md:text-sm">{label}</span>
        </li>
      ))}
    </ul>
  );
}
