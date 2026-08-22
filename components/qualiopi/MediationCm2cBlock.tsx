import { QUALIOPI_MEDIATION_CM2C } from '@/lib/qualiopi-info';

type Props = {
  className?: string;
};

/** Bloc médiation CM2C — source unique /reclamations et CGV art. 15. */
export function MediationCm2cBlock({ className = '' }: Props) {
  const m = QUALIOPI_MEDIATION_CM2C;

  return (
    <div className={`space-y-3 text-slate-700 ${className}`}>
      <p>
        <strong>Médiateur de la consommation :</strong> {m.nom}
      </p>
      <p>
        <strong>Adresse :</strong> {m.adresse}
      </p>
      <p>
        <strong>Site :</strong>{' '}
        <a
          href={m.siteUrl}
          className="font-medium text-[#377CF3] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {m.siteLabel}
        </a>{' '}
        (saisine en ligne)
      </p>
      <p>
        <strong>Courriel :</strong>{' '}
        <a href={`mailto:${m.email}`} className="font-medium text-[#377CF3] hover:underline">
          {m.email}
        </a>
      </p>
      <p>
        <strong>Condition de saisine :</strong> {m.conditionPrealable}
      </p>
      <p>{m.precisionLitiges}</p>
    </div>
  );
}
