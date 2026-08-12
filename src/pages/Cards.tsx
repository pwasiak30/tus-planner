import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'
import type { SlotKey } from '../types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateSkillName, translateScenario } from '../i18n/content'

export default function Cards() {
  const { t, lang } = useLanguage()
  const pt = t.pages.cards
  const scenarios = useLiveQuery(() => db.scenarios.toArray(), []) ?? []
  const skills = useLiveQuery(() => db.skills.toArray(), []) ?? []
  const sessions =
    useLiveQuery(() => db.sessions.orderBy('date').reverse().toArray(), []) ?? []
  const groups = useLiveQuery(() => db.groups.toArray(), []) ?? []

  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [printing, setPrinting] = useState(false)

  const skillName = (id: number) =>
    translateSkillName(skills.find((s) => s.id === id)?.name ?? '', lang)
  const groupName = (id: number) => groups.find((g) => g.id === id)?.name ?? ''

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function pickFromSession(sessionId: number) {
    const session = sessions.find((s) => s.id === sessionId)
    if (!session) return
    const ids = (Object.keys(session.slots) as SlotKey[])
      .map((k) => session.slots[k])
      .filter((id): id is number => id !== null)
    setSelected(new Set(ids))
  }

  function printCards() {
    setPrinting(true)
    setTimeout(() => {
      window.print()
      setPrinting(false)
    }, 50)
  }

  const chosen = scenarios.filter((s) => selected.has(s.id!)).map((s) => translateScenario(s, lang))

  return (
    <div>
      <div className="no-print">
        <h1 className="font-serif text-2xl font-semibold m-0">{pt.title}</h1>
        <p className="text-sm text-ink-faint mt-1 mb-5">{pt.subtitle}</p>

        {sessions.length > 0 && (
          <label className="text-sm flex flex-col gap-1 mb-4 max-w-xs">
            {pt.pickFromSessionLabel}
            <select
              className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper-raised"
              defaultValue=""
              onChange={(e) => e.target.value && pickFromSession(Number(e.target.value))}
            >
              <option value="">{pt.pickSessionPlaceholder}</option>
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {groupName(s.groupId)} · {s.date}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="grid gap-2 sm:grid-cols-2 mb-5">
          {scenarios.map((sc0) => {
            const sc = translateScenario(sc0, lang)
            return (
              <label
                key={sc.id}
                className={`flex items-start gap-2.5 border rounded-xl p-3 cursor-pointer text-sm ${
                  selected.has(sc.id!)
                    ? 'border-sage bg-sage-tint'
                    : 'border-line bg-paper-raised'
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={selected.has(sc.id!)}
                  onChange={() => toggle(sc.id!)}
                />
                <span>
                  <span className="font-semibold block">{sc.title}</span>
                  <span className="text-xs text-ink-faint">
                    {sc.skillIds.map(skillName).join(', ')} · {sc.duration} min
                  </span>
                </span>
              </label>
            )
          })}
        </div>

        <button
          onClick={printCards}
          disabled={chosen.length === 0}
          className="text-[13px] px-3.5 py-2 rounded-lg bg-sage text-white disabled:opacity-50"
        >
          {pt.printButton(chosen.length)}
        </button>
      </div>

      {printing && (
        <div className="print-area hidden">
          <div className="grid grid-cols-2 gap-4">
            {chosen.map((sc) => (
              <div
                key={sc.id}
                className="border border-line-strong rounded-xl p-4 break-inside-avoid"
              >
                <div className="text-xs text-ink-faint mb-1">
                  {sc.skillIds.map(skillName).join(', ')} · {sc.duration} min
                </div>
                <h3 className="text-base font-semibold mb-2 font-sans">{sc.title}</h3>
                <ol className="text-sm pl-4 m-0 space-y-1">
                  {sc.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
                {sc.materials && (
                  <p className="text-xs text-ink-faint mt-2 mb-0">
                    {pt.materialsPrefix}: {sc.materials}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
