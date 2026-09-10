/**
 * Inventaire structurel via l’API officielle Teachizy (documentée).
 * Endpoints utiles :
 *   GET /externals/automations/trainings
 *   GET /externals/automations/trainings/{uuid}/items
 *
 * Aucun endpoint officiel ne fournit les fichiers PDF des leçons.
 * Cette API sert uniquement à l’arborescence Formation > Chapitre > Leçon.
 */

import { API_BASE } from './config';
import type { TeachizyFormation, TeachizyLesson, TeachizyModule } from './types';

interface ApiTraining {
  uuid: string;
  name: string;
  created_at?: string;
}

interface ApiItem {
  id: string | number;
  order: number;
  name: string;
  type: string;
  children?: ApiItem[];
}

function toLesson(item: ApiItem): TeachizyLesson {
  return {
    sourceId: String(item.id),
    title: item.name,
    order: item.order,
    type: item.type,
    sourcePageUrl: null,
    pdfs: [],
    assets: [],
  };
}

export async function fetchApiInventory(apiKey: string): Promise<TeachizyFormation[]> {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json',
  };

  const trainingsRes = await fetch(`${API_BASE}/externals/automations/trainings`, { headers });
  if (!trainingsRes.ok) {
    throw new Error(
      `API Teachizy trainings HTTP ${trainingsRes.status} — vérifiez TEACHIZY_API_KEY (clé générée dans app.teachizy.fr).`
    );
  }
  const trainingsJson = (await trainingsRes.json()) as { data: ApiTraining[] };
  const formations: TeachizyFormation[] = [];

  for (const t of trainingsJson.data ?? []) {
    const itemsRes = await fetch(
      `${API_BASE}/externals/automations/trainings/${t.uuid}/items`,
      { headers }
    );
    if (!itemsRes.ok) {
      throw new Error(`API Teachizy items ${t.uuid} HTTP ${itemsRes.status}`);
    }
    const itemsJson = (await itemsRes.json()) as { data: ApiItem[] };
    const modules: TeachizyModule[] = [];
    const rootLessons: TeachizyLesson[] = [];

    for (const item of itemsJson.data ?? []) {
      if (item.type === 'SECTION' && item.children?.length) {
        modules.push({
          sourceId: String(item.id),
          title: item.name,
          order: item.order,
          lessons: item.children
            .slice()
            .sort((a, b) => a.order - b.order)
            .map(toLesson),
        });
      } else {
        rootLessons.push(toLesson(item));
      }
    }

    modules.sort((a, b) => a.order - b.order);
    rootLessons.sort((a, b) => a.order - b.order);

    formations.push({
      sourceId: t.uuid,
      title: t.name,
      sourcePageUrl: null,
      modules,
      rootLessons,
    });
  }

  return formations;
}
