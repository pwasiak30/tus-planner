import { db } from './db'

interface BackupPayload {
  version: 1
  exportedAt: string
  skills: unknown[]
  scenarios: unknown[]
  groups: unknown[]
  participants: unknown[]
  sessions: unknown[]
  progressEntries: unknown[]
  socialStories: unknown[]
}

export async function exportBackup(): Promise<void> {
  const payload: BackupPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    skills: await db.skills.toArray(),
    scenarios: await db.scenarios.toArray(),
    groups: await db.groups.toArray(),
    participants: await db.participants.toArray(),
    sessions: await db.sessions.toArray(),
    progressEntries: await db.progressEntries.toArray(),
    socialStories: await db.socialStories.toArray(),
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `tus-planner-backup-${payload.exportedAt.slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importBackup(file: File): Promise<void> {
  const text = await file.text()
  const payload = JSON.parse(text) as Partial<BackupPayload>
  if (!payload || typeof payload !== 'object') {
    throw new Error('Nieprawidłowy plik kopii zapasowej.')
  }

  await db.transaction(
    'rw',
    [
      db.skills,
      db.scenarios,
      db.groups,
      db.participants,
      db.sessions,
      db.progressEntries,
      db.socialStories,
    ],
    async () => {
      await db.skills.clear()
      await db.skills.bulkAdd((payload.skills as never[]) ?? [])
      await db.scenarios.clear()
      await db.scenarios.bulkAdd((payload.scenarios as never[]) ?? [])
      await db.groups.clear()
      await db.groups.bulkAdd((payload.groups as never[]) ?? [])
      await db.participants.clear()
      await db.participants.bulkAdd((payload.participants as never[]) ?? [])
      await db.sessions.clear()
      await db.sessions.bulkAdd((payload.sessions as never[]) ?? [])
      await db.progressEntries.clear()
      await db.progressEntries.bulkAdd((payload.progressEntries as never[]) ?? [])
      await db.socialStories.clear()
      await db.socialStories.bulkAdd((payload.socialStories as never[]) ?? [])
    },
  )
}
