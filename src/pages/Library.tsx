import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'
import type { Scenario } from '../types'

const emptyForm = {
  title: '',
  skillIds: [] as number[],
  duration: 10,
  difficulty: 1 as 1 | 2 | 3,
  materials: '',
  steps: '',
}

export default function Library() {
  const skills = useLiveQuery(() => db.skills.toArray(), []) ?? []
  const scenarios = useLiveQuery(() => db.scenarios.toArray(), []) ?? []

  const [activeSkill, setActiveSkill] = useState<number | 'all'>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const visible = scenarios.filter(
    (s) => activeSkill === 'all' || s.skillIds.includes(activeSkill),
  )

  const skillName = (id: number) => skills.find((s) => s.id === id)?.name ?? ''

  async function addScenario() {
    if (!form.title.trim() || form.skillIds.length === 0) return
    const steps = form.steps
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    const scenario: Scenario = {
      title: form.title.trim(),
      skillIds: form.skillIds,
      duration: form.duration,
      difficulty: form.difficulty,
      steps: steps.length ? steps : ['Brak instrukcji.'],
      materials: form.materials.trim() || undefined,
    }
    await db.scenarios.add(scenario)
    setForm(emptyForm)
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h1 className="font-serif text-2xl font-semibold m-0">Biblioteka scenariuszy</h1>
          <p className="text-sm text-ink-faint mt-1 mb-0">
            {scenarios.length} ćwiczeń · filtruj po umiejętności
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-[13px] px-3 py-2 rounded-lg bg-sage text-white shrink-0"
        >
          {showForm ? 'Anuluj' : '+ Dodaj scenariusz'}
        </button>
      </div>

      {showForm && (
        <div className="mt-4 border border-line rounded-xl p-4 bg-paper-raised">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm flex flex-col gap-1 sm:col-span-2">
              Tytuł ćwiczenia
              <input
                className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>
            <div className="text-sm flex flex-col gap-1">
              Umiejętności
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <label
                    key={s.id}
                    className={`text-xs px-2.5 py-1 rounded-full border cursor-pointer ${
                      form.skillIds.includes(s.id!)
                        ? 'bg-heather-tint text-heather-ink border-transparent'
                        : 'border-line-strong text-ink-soft'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={form.skillIds.includes(s.id!)}
                      onChange={(e) => {
                        const id = s.id!
                        setForm({
                          ...form,
                          skillIds: e.target.checked
                            ? [...form.skillIds, id]
                            : form.skillIds.filter((x) => x !== id),
                        })
                      }}
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>
            <label className="text-sm flex flex-col gap-1">
              Czas trwania (min)
              <input
                type="number"
                min={1}
                className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
              />
            </label>
            <label className="text-sm flex flex-col gap-1">
              Poziom trudności
              <select
                className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper"
                value={form.difficulty}
                onChange={(e) =>
                  setForm({ ...form, difficulty: Number(e.target.value) as 1 | 2 | 3 })
                }
              >
                <option value={1}>Podstawowy</option>
                <option value={2}>Średni</option>
                <option value={3}>Zaawansowany</option>
              </select>
            </label>
            <label className="text-sm flex flex-col gap-1">
              Materiały (opcjonalnie)
              <input
                className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper"
                value={form.materials}
                onChange={(e) => setForm({ ...form, materials: e.target.value })}
              />
            </label>
            <label className="text-sm flex flex-col gap-1 sm:col-span-2">
              Instrukcja krok po kroku (jedna linia = jeden krok)
              <textarea
                rows={3}
                className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper"
                value={form.steps}
                onChange={(e) => setForm({ ...form, steps: e.target.value })}
              />
            </label>
          </div>
          <button
            onClick={addScenario}
            className="mt-3 text-[13px] px-3 py-2 rounded-lg bg-sage text-white"
          >
            Zapisz scenariusz
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-5 mb-4">
        <button
          onClick={() => setActiveSkill('all')}
          className={`text-xs px-3 py-1.5 rounded-full border ${
            activeSkill === 'all'
              ? 'bg-heather-tint text-heather-ink border-transparent'
              : 'border-line-strong text-ink-soft'
          }`}
        >
          Wszystkie
        </button>
        {skills.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSkill(s.id!)}
            className={`text-xs px-3 py-1.5 rounded-full border ${
              activeSkill === s.id
                ? 'bg-heather-tint text-heather-ink border-transparent'
                : 'border-line-strong text-ink-soft'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {visible.map((sc) => (
          <div
            key={sc.id}
            className="border border-line rounded-xl p-3.5 bg-paper-raised cursor-pointer"
            onClick={() => setExpandedId(expandedId === sc.id ? null : sc.id!)}
          >
            <div className="flex flex-wrap gap-1 mb-1.5">
              {sc.skillIds.map((id) => (
                <span
                  key={id}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-heather-tint text-heather-ink"
                >
                  {skillName(id)}
                </span>
              ))}
            </div>
            <h3 className="text-[15px] font-semibold m-0 mb-1 font-sans">{sc.title}</h3>
            <div className="flex items-center gap-3 text-xs text-ink-faint">
              <span>{sc.duration} min</span>
              <span className="inline-flex gap-0.5">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className={`w-1.5 h-1.5 rounded-full ${
                      n <= sc.difficulty ? 'bg-clay' : 'bg-line-strong'
                    }`}
                  />
                ))}
              </span>
            </div>
            {expandedId === sc.id && (
              <div className="mt-3 pt-3 border-t border-line text-sm text-ink-soft">
                <ol className="m-0 pl-4 space-y-1">
                  {sc.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
                {sc.materials && (
                  <p className="mt-2 mb-0 text-xs text-ink-faint">Materiały: {sc.materials}</p>
                )}
              </div>
            )}
          </div>
        ))}
        {visible.length === 0 && (
          <p className="text-sm text-ink-faint">Brak scenariuszy dla tej umiejętności.</p>
        )}
      </div>
    </div>
  )
}
