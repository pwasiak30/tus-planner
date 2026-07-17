import { useState, useEffect } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'

export default function Tracker() {
  const sessions =
    useLiveQuery(() => db.sessions.orderBy('date').reverse().toArray(), []) ?? []
  const groups = useLiveQuery(() => db.groups.toArray(), []) ?? []
  const skills = useLiveQuery(() => db.skills.toArray(), []) ?? []

  const [sessionId, setSessionId] = useState<number | null>(null)

  useEffect(() => {
    if (sessionId === null && sessions.length > 0) setSessionId(sessions[0].id!)
  }, [sessions, sessionId])

  const session = sessions.find((s) => s.id === sessionId)
  const participants =
    useLiveQuery(
      () => (session ? db.participants.where('groupId').equals(session.groupId).toArray() : []),
      [session?.groupId],
    ) ?? []
  const entries =
    useLiveQuery(
      () => (sessionId ? db.progressEntries.where('sessionId').equals(sessionId).toArray() : []),
      [sessionId],
    ) ?? []

  const [selected, setSelected] = useState<{ participantId: number; skillId: number } | null>(
    null,
  )
  const [noteDraft, setNoteDraft] = useState('')

  function findEntry(participantId: number, skillId: number) {
    return entries.find((e) => e.participantId === participantId && e.skillId === skillId)
  }

  async function setLevel(participantId: number, skillId: number, level: 1 | 2 | 3 | 4 | 5) {
    if (!sessionId) return
    const existing = findEntry(participantId, skillId)
    if (existing) {
      await db.progressEntries.update(existing.id!, { level })
    } else {
      await db.progressEntries.add({ sessionId, participantId, skillId, level, note: '' })
    }
    setSelected({ participantId, skillId })
  }

  function selectCell(participantId: number, skillId: number) {
    setSelected({ participantId, skillId })
    setNoteDraft(findEntry(participantId, skillId)?.note ?? '')
  }

  async function saveNote() {
    if (!selected || !sessionId) return
    const existing = findEntry(selected.participantId, selected.skillId)
    if (existing) {
      await db.progressEntries.update(existing.id!, { note: noteDraft })
    } else {
      await db.progressEntries.add({
        sessionId,
        participantId: selected.participantId,
        skillId: selected.skillId,
        level: 1,
        note: noteDraft,
      })
    }
  }

  const groupName = (id: number) => groups.find((g) => g.id === id)?.name ?? ''
  const participantName = (id: number) => participants.find((p) => p.id === id)?.name ?? ''
  const skillName = (id: number) => skills.find((s) => s.id === id)?.name ?? ''

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold m-0">Tracker postępów</h1>
      <p className="text-sm text-ink-faint mt-1 mb-5">Poziom opanowania w skali 1–5</p>

      <label className="text-sm flex flex-col gap-1 mb-5 max-w-xs">
        Sesja
        <select
          className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper-raised"
          value={sessionId ?? ''}
          onChange={(e) => {
            setSessionId(Number(e.target.value))
            setSelected(null)
          }}
        >
          {sessions.map((s) => (
            <option key={s.id} value={s.id}>
              {groupName(s.groupId)} · {s.date}
            </option>
          ))}
        </select>
      </label>

      {!session && <p className="text-sm text-ink-faint">Najpierw zapisz sesję w planerze.</p>}

      {session && (
        <>
          <div className="overflow-x-auto border border-line rounded-xl">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left text-[11px] uppercase tracking-wide text-ink-faint bg-paper-raised px-3 py-2.5 border-b border-line-strong">
                    Uczestnik
                  </th>
                  {skills.map((sk) => (
                    <th
                      key={sk.id}
                      className="text-left text-[11px] uppercase tracking-wide text-ink-faint bg-paper-raised px-3 py-2.5 border-b border-line-strong"
                    >
                      {sk.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => (
                  <tr
                    key={p.id}
                    className={selected?.participantId === p.id ? 'bg-sage-tint' : ''}
                  >
                    <td className="px-3 py-2.5 border-b border-line font-medium">{p.name}</td>
                    {skills.map((sk) => {
                      const level = findEntry(p.id!, sk.id!)?.level ?? 0
                      return (
                        <td
                          key={sk.id}
                          className="px-3 py-2.5 border-b border-line cursor-pointer"
                          onClick={() => selectCell(p.id!, sk.id!)}
                        >
                          <span className="inline-flex gap-[3px]">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <span
                                key={n}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setLevel(p.id!, sk.id!, n as 1 | 2 | 3 | 4 | 5)
                                }}
                                className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                                  n <= level ? 'bg-sage' : 'bg-line-strong'
                                }`}
                              />
                            ))}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                ))}
                {participants.length === 0 && (
                  <tr>
                    <td
                      colSpan={skills.length + 1}
                      className="px-3 py-4 text-ink-faint text-sm"
                    >
                      Ta grupa nie ma jeszcze uczestników.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {selected && (
            <div className="mt-4 bg-paper-raised rounded-xl px-4 py-3.5">
              <h3 className="text-sm font-semibold mb-2 font-sans">
                Notatka behawioralna — {participantName(selected.participantId)},{' '}
                {skillName(selected.skillId)}
              </h3>
              <textarea
                rows={2}
                className="w-full border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper text-sm"
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                onBlur={saveNote}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
