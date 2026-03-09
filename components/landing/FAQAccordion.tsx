'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: "La formation est-elle vraiment prise en charge à 100 % ?",
    a: "Oui, pour les entreprises de moins de 50 salariés, la formation peut être prise en charge à 100 % par Constructys dans le cadre du Plan de Développement des Compétences. Le coût pédagogique est couvert jusqu'à 24€ HT/heure/stagiaire.",
  },
  {
    q: "Faut-il des compétences techniques pour suivre cette formation ?",
    a: "Non. La formation est conçue pour des professionnels du BTP sans prérequis technique. On travaille directement sur vos documents réels (devis, CR, emails). Zéro théorie, 100 % pratique.",
  },
  {
    q: "Combien de temps dure la formation IA pour le BTP ?",
    a: "La formation est modulaire : de 4h à 14h selon vos objectifs. Le format standard « L'IA au service du BTP » dure 4h ou 7h. Les formations avancées (appels d'offres, RH) peuvent aller jusqu'à 7h ou plus.",
  },
  {
    q: "La formation se fait-elle en présentiel ou en distanciel ?",
    a: "Les deux formats sont proposés : présentiel (inter ou intra-entreprise) et distanciel. Nous nous adaptons à vos contraintes et à la taille de votre équipe.",
  },
  {
    q: "Comment mesurer le ROI de la formation IA ?",
    a: "Les gains sont mesurables dès la première semaine : temps de rédaction de devis divisé par 10, comptes rendus automatisés (2h gagnées/jour en moyenne), emails rédigés en quelques secondes. Un suivi post-formation vous aide à quantifier les économies.",
  },
  {
    q: "Mes données BTP sont-elles sécurisées avec ChatGPT ?",
    a: "Nous vous formons aux bonnes pratiques : ne jamais coller de données confidentielles dans ChatGPT public, utiliser ChatGPT Team ou Enterprise pour les données sensibles, et mettre en place des process de relecture et de confidentialité.",
  },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 text-left"
          >
            <span className="font-medium text-slate-900">{item.q}</span>
            <span className="shrink-0 rounded-full p-1 text-slate-500">
              {open === i ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
            </span>
          </button>
          {open === i && (
            <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
