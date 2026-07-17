import { useRef, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'
import { exportBackup, importBackup } from '../backup'

export default function Groups() {
  const groups = useLiveQuery(() => db.groups.toArray(), []) ?? []
  const participants = useLiveQuery(() => db.participants.toArray(), []) ?? []

  const [newGroupName, setNewGroupName] = useState('')
  const [newParticipant, setNewParticipant] = useState<Record<number, string>>({})
  const [importMsg, setImportMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function addGroup() {
    if (!newGroupName.trim()) return
    await db.groups.add({ name: newGroupName.trim() })
    setNewGroupName('')
  }

  async function renameGroup(id: number, name: string) {
    await db.groups.update(id, { name })
  }

  async function deleteGroup(id: number) {
    if (!confirm('Usunąć grupę i wszystkich jej uczestników? Zapisane sesje pozostaną, ale bez przypisanych osób.')) {
      return
    }
    await db.transaction('rw', db.groups, db.participants, async () => {
      await db.participants.where('groupId').equals(id).delete()
      await db.groups.delete(id)
    })
  }

  async function addParticipant(groupId: number) {
    const name = (newParticipant[groupId] ?? '').trim()
    if (!name) return
    await db.participants.add({ name, groupId })
    setNewParticipant({ ...newParticipant, [groupId]: '' })
  }

  async function deleteParticipant(id: number) {
    await db.participants.delete(id)
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (
      !confirm(
        'Import zastąpi WSZYSTKIE obecne dane (scenariusze, grupy, sesje, postępy, historyjki) zawartością pliku. Kontynuować?',
      )
    ) {
      e.target.value = ''
      return
    }
    try {
      await importBackup(file)
      setImportMsg('Zaimportowano pomyślnie.')
    } catch {
      setImportMsg('Nie udało się zaimportować — sprawdź, czy to poprawny plik kopii zapasowej.')
    } finally {
      e.target.value = ''
      setTimeout(() => setImportMsg(null), 4000)
    }
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold m-0">Grupy</h1>
      <p className="text-sm text-ink-faint mt-1 mb-5">Zarządzaj grupami i uczestnikami</p>

      <div className="flex gap-2 mb-6 max-w-sm">
        <input
          className="flex-1 border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper-raised text-sm"
          placeholder="Nazwa nowej grupy"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addGroup()}
        />
        <button
          onClick={addGroup}
          className="text-[13px] px-3 py-2 rounded-lg bg-sage text-white shrink-0"
        >
          + Dodaj grupę
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {groups.map((g) => (
          <div key={g.id} className="border border-line rounded-xl p-4 bg-paper-raised">
            <div className="flex items-center justify-between gap-2 mb-3">
              <input
                className="font-semibold text-base bg-transparent border-none outline-none flex-1 min-w-0"
                defaultValue={g.name}
                onBlur={(e) => e.target.value.trim() && renameGroup(g.id!, e.target.value.trim())}
              />
              <button
                onClick={() => deleteGroup(g.id!)}
                className="text-xs text-clay shrink-0"
              >
                Usuń grupę
              </button>
            </div>
            <ul className="mb-2">
              {participants
                .filter((p) => p.groupId === g.id)
                .map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between text-sm py-1.5 border-b border-line"
                  >
                    {p.name}
                    <button
                      onClick={() => deleteParticipant(p.id!)}
                      className="text-ink-faint hover:text-clay px-1"
                      aria-label={`Usuń ${p.name}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              {participants.filter((p) => p.groupId === g.id).length === 0 && (
                <li className="text-xs text-ink-faint py-1.5">Brak uczestników.</li>
              )}
            </ul>
            <div className="flex gap-2">
              <input
                className="flex-1 min-w-0 border border-line-strong rounded-lg px-2 py-1.5 bg-paper text-sm"
                placeholder="Imię uczestnika"
                value={newParticipant[g.id!] ?? ''}
                onChange={(e) => setNewParticipant({ ...newParticipant, [g.id!]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && addParticipant(g.id!)}
              />
              <button
                onClick={() => addParticipant(g.id!)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-line-strong shrink-0"
              >
                Dodaj
              </button>
            </div>
          </div>
        ))}
        {groups.length === 0 && <p className="text-sm text-ink-faint">Brak grup. Dodaj pierwszą powyżej.</p>}
      </div>

      <h2 className="font-serif text-lg font-semibold mb-2">Kopia zapasowa</h2>
      <p className="text-sm text-ink-faint mb-3 max-w-md">
        Wszystkie dane są zapisane lokalnie w tej przeglądarce. Zrób kopię zapasową, zanim wyczyścisz
        dane przeglądarki lub zmienisz komputer.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={exportBackup}
          className="text-[13px] px-3.5 py-2 rounded-lg border border-line-strong"
        >
          Eksportuj kopię zapasową
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-[13px] px-3.5 py-2 rounded-lg border border-line-strong"
        >
          Importuj kopię zapasową
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImport}
        />
        {importMsg && <span className="text-xs text-ink-faint">{importMsg}</span>}
      </div>
    </div>
  )
}
