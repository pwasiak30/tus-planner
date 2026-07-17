import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'
import TrendChart from '../TrendChart'

const CHART_COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)']

function shortDate(iso: string) {
  const [, m, d] = iso.split('-')
  return `${d}.${m}`
}

export default function Progress() {
  const participants = useLiveQuery(() => db.participants.toArray(), []) ?? []
  const groups = useLiveQuery(() => db.groups.toArray(), []) ?? []
  const skills = useLiveQuery(() => db.skills.toArray(), []) ?? []
  const sessions = useLiveQuery(() => db.sessions.toArray(), []) ?? []
  const entries = useLiveQuery(() => db.progressEntries.toArray(), []) ?? []

  const [participantId, setParticipantId] = useState<number | null>(null)
  const effectiveId = participantId ?? participants[0]?.id ?? null
  const participant = participants.find((p) => p.id === effectiveId)
  const group = participant && groups.find((g) => g.id === participant.groupId)

  function printReport() {
    window.print()
  }

  const groupSessions = participant
    ? sessions
        .filter((s) => s.groupId === participant.groupId)
        .sort((a, b) => a.date.localeCompare(b.date))
    : []

  const relevantSessions = groupSessions.filter((s) =>
    entries.some((e) => e.sessionId === s.id && e.participantId === effectiveId),
  )

  const labels = relevantSessions.map((s) => shortDate(s.date))

  const series = skills.map((sk, i) => ({
    name: sk.name,
    color: CHART_COLORS[i % CHART_COLORS.length],
    values: relevantSessions.map((s) => {
      const entry = entries.find(
        (e) => e.sessionId === s.id && e.participantId === effectiveId && e.skillId === sk.id,
      )
      return entry ? (entry.level as number) : null
    }),
  }))

  const currentLevels = series.map((s) => {
    const vals = s.values.filter((v): v is number => v !== null)
    return { name: s.name, level: vals[vals.length - 1] ?? 0 }
  })

  const notes = entries
    .filter((e) => e.participantId === effectiveId && e.note.trim() !== '')
    .map((e) => ({
      ...e,
      sessionDate: sessions.find((s) => s.id === e.sessionId)?.date ?? '',
      skillName: skills.find((sk) => sk.id === e.skillId)?.name ?? '',
    }))
    .sort((a, b) => a.sessionDate.localeCompare(b.sessionDate))

  return (
    <div>
      <div className="no-print flex items-start justify-between gap-4 mb-1">
        <div>
          <h1 className="font-serif text-2xl font-semibold m-0">Analiza postępu</h1>
          <p className="text-sm text-ink-faint mt-1 mb-0">Trend poziomu opanowania w czasie</p>
        </div>
        {participant && (
          <button
            onClick={printReport}
            className="text-[13px] px-3.5 py-2 rounded-lg bg-sage text-white shrink-0"
          >
            Drukuj raport
          </button>
        )}
      </div>

      <label className="no-print text-sm flex flex-col gap-1 mb-6 mt-4 max-w-xs">
        Uczestnik
        <select
          className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper-raised"
          value={effectiveId ?? ''}
          onChange={(e) => setParticipantId(Number(e.target.value))}
        >
          {participants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} · {groups.find((g) => g.id === p.groupId)?.name}
            </option>
          ))}
        </select>
      </label>

      {!participant && <p className="text-sm text-ink-faint">Brak uczestników do wyboru.</p>}

      {participant && relevantSessions.length === 0 && (
        <p className="text-sm text-ink-faint">
          Brak zapisanych ocen postępu dla tego uczestnika. Wypełnij tracker po sesji.
        </p>
      )}

      {participant && relevantSessions.length > 0 && (
        <>
          <div className="mb-1">
            <h2 className="font-serif text-lg font-semibold mb-0">{participant.name}</h2>
            <p className="text-xs text-ink-faint mt-0.5 mb-4">
              {group?.name} · {relevantSessions.length} sesji ·{' '}
              {shortDate(relevantSessions[0].date)}–{shortDate(relevantSessions[relevantSessions.length - 1].date)}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {currentLevels.map((c) => (
              <div key={c.name} className="bg-paper-raised rounded-xl px-3 py-2.5">
                <div className="text-[11px] text-ink-faint mb-1">{c.name}</div>
                <div className="inline-flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`w-2 h-2 rounded-full ${n <= c.level ? 'bg-sage' : 'bg-line-strong'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border border-line rounded-xl p-4 bg-paper-raised mb-6">
            <TrendChart labels={labels} series={series} />
          </div>

          <div className="overflow-x-auto border border-line rounded-xl mb-6">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <th className="text-left text-[11px] uppercase tracking-wide text-ink-faint bg-paper-raised px-3 py-2 border-b border-line-strong">
                    Sesja
                  </th>
                  {skills.map((sk) => (
                    <th
                      key={sk.id}
                      className="text-left text-[11px] uppercase tracking-wide text-ink-faint bg-paper-raised px-3 py-2 border-b border-line-strong"
                    >
                      {sk.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {relevantSessions.map((s, i) => (
                  <tr key={s.id}>
                    <td className="px-3 py-2 border-b border-line font-medium">{s.date}</td>
                    {series.map((sr) => (
                      <td key={sr.name} className="px-3 py-2 border-b border-line">
                        {sr.values[i] ?? '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-base font-semibold mb-2">Notatki behawioralne</h3>
          <div className="flex flex-col gap-2">
            {notes.map((n) => (
              <div key={n.id} className="border border-line rounded-lg px-3.5 py-2.5 text-sm">
                <div className="text-xs text-ink-faint mb-1">
                  {n.sessionDate} · {n.skillName}
                </div>
                {n.note}
              </div>
            ))}
            {notes.length === 0 && (
              <p className="text-sm text-ink-faint">Brak zapisanych notatek dla tego uczestnika.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
