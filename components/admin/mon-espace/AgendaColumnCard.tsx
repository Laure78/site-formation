import {
  addTaskAction,
  deleteTaskAction,
  toggleTaskAction,
  toggleTaskEmphasisAction,
} from '@/app/admin/mon-espace/actions';
import type { ColumnWithTasks } from '@/lib/admin/mon-espace/types';
import { HEADER_TONE_CLASS } from '@/components/admin/mon-espace/tones';
import { Plus, Trash2 } from 'lucide-react';

export function AgendaColumnCard({ column }: { column: ColumnWithTasks }) {
  const doneCount = column.tasks.filter((t) => t.done).length;
  const total = column.tasks.length;

  return (
    <section className="flex min-h-[12rem] flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <header
        className={`rounded-lg px-3 py-2 text-sm font-semibold ${HEADER_TONE_CLASS[column.header_tone]}`}
      >
        <div className="flex items-center justify-between gap-2">
          <h3>{column.title}</h3>
          {total > 0 ? (
            <span className="text-xs font-medium opacity-70">
              {doneCount}/{total}
            </span>
          ) : null}
        </div>
      </header>

      <ul className="mt-3 flex-1 space-y-1.5">
        {column.tasks.map((task) => (
          <li key={task.id} className="group flex items-start gap-2">
            <form action={toggleTaskAction} className="pt-0.5">
              <input type="hidden" name="id" value={task.id} />
              <input type="hidden" name="done" value={String(task.done)} />
              <button
                type="submit"
                className={`flex h-4 w-4 items-center justify-center rounded border ${
                  task.done
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                    : 'border-slate-300 bg-white hover:border-[var(--accent)]'
                }`}
                aria-label={task.done ? 'Marquer non fait' : 'Marquer fait'}
              >
                {task.done ? (
                  <span className="text-[10px] leading-none" aria-hidden>
                    ✓
                  </span>
                ) : null}
              </button>
            </form>
            <form action={toggleTaskEmphasisAction} className="min-w-0 flex-1">
              <input type="hidden" name="id" value={task.id} />
              <input type="hidden" name="emphasis" value={String(task.emphasis)} />
              <button
                type="submit"
                className={`w-full text-left text-sm leading-snug ${
                  task.done
                    ? 'text-slate-400 line-through'
                    : task.emphasis
                      ? 'font-medium text-rose-600'
                      : 'text-slate-800'
                }`}
                title="Cliquer pour mettre en évidence"
              >
                {task.title}
              </button>
            </form>
            <form action={deleteTaskAction} className="opacity-0 transition-opacity group-hover:opacity-100">
              <input type="hidden" name="id" value={task.id} />
              <button
                type="submit"
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-rose-600"
                aria-label="Supprimer la tâche"
              >
                <Trash2 size={14} strokeWidth={1.75} />
              </button>
            </form>
          </li>
        ))}
      </ul>

      <form action={addTaskAction} className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
        <input type="hidden" name="column_id" value={column.id} />
        <input
          type="text"
          name="title"
          required
          placeholder="Ajouter…"
          className="min-w-0 flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-2.5 py-1.5 text-white hover:opacity-90"
          aria-label="Ajouter une tâche"
        >
          <Plus size={16} strokeWidth={2} />
        </button>
      </form>
    </section>
  );
}
