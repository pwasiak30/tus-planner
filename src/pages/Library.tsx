import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'
import type { Scenario } from '../types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateSkillName, translateScenario } from '../i18n/content'

const emptyForm = {
  title: '',
  skillIds: [] as number[],
  duration: 10,
  difficulty: 1 as 1 | 2 | 3,
  materials: '',
  steps: '',
}

export default function Library() {
  const { t, lang } = useLanguage()
  const pt = t.pages.library
  const skills = useLiveQuery(() => db.skills.toArray(), []) ?? []
  const scenarios = useLiveQuery(() => db.scenarios.toArray(), []) ?? []

  const [activeSkill, setActiveSkill] = useState<number | 'all'>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const visible = scenarios
    .filter((s) => activeSkill === 'all' || s.skillIds.includes(activeSkill))
    .map((s) => translateScenario(s, lang))

  const skillName = (id: number) =>
    translateSkillName(skills.find((s) => s.id === id)?.name ?? '', lang)

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
          <h1 className="font-serif text-2xl font-semibold m-0">{pt.title}</h1>
          <p className="text-sm text-ink-faint mt-1 mb-0">{pt.subtitle(scenarios.length)}</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-[13px] px-3 py-2 rounded-lg bg-sage text-white shrink-0"
        >
          {showForm ? pt.cancelButton : pt.addButton}
        </button>
      </div>

      {showForm && (
        <div className="mt-4 border border-line rounded-xl p-4 bg-paper-raised">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm flex flex-col gap-1 sm:col-span-2">
              {pt.titleLabel}
              <input
                className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>
            <div className="text-sm flex flex-col gap-1">
              {pt.skillsLabel}
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
                    {translateSkillName(s.name, lang)}
                  </label>
                ))}
              </div>
            </div>
            <label className="text-sm flex flex-col gap-1">
              {pt.durationLabel}
              <input
                type="number"
                min={1}
                className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
              />
            </label>
            <label className="text-sm flex flex-col gap-1">
              {pt.difficultyLabel}
              <select
                className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper"
                value={form.difficulty}
                onChange={(e) =>
                  setForm({ ...form, difficulty: Number(e.target.value) as 1 | 2 | 3 })
                }
              >
                <option value={1}>{pt.difficultyOptions[0]}</option>
                <option value={2}>{pt.difficultyOptions[1]}</option>
                <option value={3}>{pt.difficultyOptions[2]}</option>
              </select>
            </label>
            <label className="text-sm flex flex-col gap-1">
              {pt.materialsOptional}
              <input
                className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper"
                value={form.materials}
                onChange={(e) => setForm({ ...form, materials: e.target.value })}
              />
            </label>
            <label className="text-sm flex flex-col gap-1 sm:col-span-2">
              {pt.stepsLabel}
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
            {pt.saveButton}
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
          {pt.allFilter}
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
            {translateSkillName(s.name, lang)}
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
                  <p className="mt-2 mb-0 text-xs text-ink-faint">
                    {pt.materialsPrefix}: {sc.materials}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
        {visible.length === 0 && <p className="text-sm text-ink-faint">{pt.emptyState}</p>}
      </div>
    </div>
  )
}
