import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'
import type { SlotKey } from '../types'

const slotLabels: Record<SlotKey, string> = {
  warmup: 'Rozgrzewka',
  main: 'Ćwiczenie główne',
  summary: 'Podsumowanie',
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function Planner() {
  const groups = useLiveQuery(() => db.groups.toArray(), []) ?? []
  const scenarios = useLiveQuery(() => db.scenarios.toArray(), []) ?? []
  const sessions =
    useLiveQuery(
      () => db.sessions.orderBy('date').reverse().toArray(),
      [],
    ) ?? []

  const [groupId, setGroupId] = useState<number | null>(null)
  const [date, setDate] = useState(todayISO())
  const [slots, setSlots] = useState<Record<SlotKey, number | null>>({
    warmup: null,
    main: null,
    summary: null,
  })
  const [saved, setSaved] = useState(false)

  const effectiveGroupId = groupId ?? groups[0]?.id ?? null

  const scenarioById = (id: number | null) =>
    id ? scenarios.find((s) => s.id === id) : undefined

  const totalMinutes = (Object.keys(slots) as SlotKey[]).reduce((sum, key) => {
    const sc = scenarioById(slots[key])
    return sum + (sc?.duration ?? 0)
  }, 0)

  async function saveSession() {
    if (!effectiveGroupId) return
    await db.sessions.add({ groupId: effectiveGroupId, date, slots })
    setSlots({ warmup: null, main: null, summary: null })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const groupName = (id: number) => groups.find((g) => g.id === id)?.name ?? ''

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold m-0">Planer sesji</h1>
      <p className="text-sm text-ink-faint mt-1 mb-5">
        Suma czasu: <span className="font-semibold text-ink">{totalMinutes} min</span>
      </p>

      <div className="flex flex-wrap gap-3 mb-5">
        <label className="text-sm flex flex-col gap-1">
          Grupa
          <select
            className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper-raised"
            value={effectiveGroupId ?? ''}
            onChange={(e) => setGroupId(Number(e.target.value))}
          >
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm flex flex-col gap-1">
          Data
          <input
            type="date"
            className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper-raised"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 mb-5">
        {(Object.keys(slotLabels) as SlotKey[]).map((key) => {
          const sc = scenarioById(slots[key])
          return (
            <div key={key} className="border border-line rounded-xl p-3.5 bg-paper-raised">
              <div className="text-[11px] uppercase tracking-wide text-ink-faint mb-2">
                {slotLabels[key]}
              </div>
              <select
                className="w-full border border-line-strong rounded-lg px-2 py-1.5 bg-paper text-sm mb-2"
                value={slots[key] ?? ''}
                onChange={(e) =>
                  setSlots({
                    ...slots,
                    [key]: e.target.value ? Number(e.target.value) : null,
                  })
                }
              >
                <option value="">— wybierz ćwiczenie —</option>
                {scenarios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.duration} min)
                  </option>
                ))}
              </select>
              {sc ? (
                <div className="bg-sage-tint text-sage-ink rounded-lg px-2.5 py-1.5 text-sm font-semibold">
                  {sc.title} · {sc.duration} min
                </div>
              ) : (
                <div className="border border-dashed border-line-strong rounded-lg px-2.5 py-2 text-xs text-ink-faint text-center">
                  brak przypisanego ćwiczenia
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button
        onClick={saveSession}
        disabled={!effectiveGroupId}
        className="text-[13px] px-3.5 py-2 rounded-lg bg-sage text-white disabled:opacity-50"
      >
        {saved ? 'Zapisano ✓' : 'Zapisz sesję'}
      </button>

      <h2 className="font-serif text-lg font-semibold mt-8 mb-3">Ostatnie sesje</h2>
      <div className="flex flex-col gap-2">
        {sessions.map((s) => {
          const mins = (Object.keys(s.slots) as SlotKey[]).reduce(
            (sum, k) => sum + (scenarioById(s.slots[k])?.duration ?? 0),
            0,
          )
          return (
            <div
              key={s.id}
              className="border border-line rounded-lg px-3.5 py-2.5 text-sm flex items-center justify-between"
            >
              <span>
                <span className="font-semibold">{groupName(s.groupId)}</span> · {s.date}
              </span>
              <span className="text-ink-faint text-xs">{mins} min</span>
            </div>
          )
        })}
        {sessions.length === 0 && (
          <p className="text-sm text-ink-faint">Brak zapisanych sesji.</p>
        )}
      </div>
    </div>
  )
}
