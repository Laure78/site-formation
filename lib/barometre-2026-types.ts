export type BarometreRow = {
  label: string;
  count: number;
  n: number;
};

export type BarometreKeyFigure = BarometreRow & {
  id: string;
  valuePercent: number;
};

export type Barometre2026Data = {
  meta: {
    edition: number;
    title: string;
    n: number;
    periodLabel: string;
    periodStart: string;
    periodEnd: string;
    geography: string;
    collectionMethod: string;
    lastUpdated: string;
    dataNote?: string;
  };
  keyFigures: BarometreKeyFigure[];
  toolsAlreadyUsed: BarometreRow[];
  targetTasks: BarometreRow[];
  barriers: BarometreRow[];
  companyProfile: BarometreRow[];
  roles: BarometreRow[];
};
