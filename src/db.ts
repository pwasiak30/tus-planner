import Dexie, { type EntityTable } from 'dexie'
import type {
  Skill,
  Scenario,
  Group,
  Participant,
  Session,
  ProgressEntry,
  SocialStory,
} from './types'

export const db = new Dexie('tus-planner') as Dexie & {
  skills: EntityTable<Skill, 'id'>
  scenarios: EntityTable<Scenario, 'id'>
  groups: EntityTable<Group, 'id'>
  participants: EntityTable<Participant, 'id'>
  sessions: EntityTable<Session, 'id'>
  progressEntries: EntityTable<ProgressEntry, 'id'>
  socialStories: EntityTable<SocialStory, 'id'>
}

db.version(1).stores({
  skills: '++id, name',
  scenarios: '++id, title, duration, difficulty',
  groups: '++id, name',
  participants: '++id, name, groupId',
  sessions: '++id, groupId, date',
  progressEntries: '++id, sessionId, participantId, skillId',
})

db.version(2).stores({
  socialStories: '++id, title',
})

export async function seedIfEmpty() {
  await db.transaction(
    'rw',
    [db.skills, db.scenarios, db.groups, db.participants],
    async () => {
      const skillCount = await db.skills.count()
      if (skillCount > 0) return
      await seed()
    },
  )
}

async function seed() {
  const skillIds = await db.skills.bulkAdd(
    [
      { name: 'Kontakt wzrokowy' },
      { name: 'Czekanie na kolej' },
      { name: 'Rozpoznawanie emocji' },
      { name: 'Inicjowanie rozmowy' },
    ],
    { allKeys: true },
  )
  const [eyeContact, waiting, emotions, initiating] = skillIds as number[]

  await db.scenarios.bulkAdd([
    {
      title: 'Gra w spojrzenia',
      skillIds: [eyeContact],
      duration: 8,
      difficulty: 1,
      steps: [
        'Usiądźcie naprzeciw siebie w parach.',
        'Na sygnał prowadzącego utrzymajcie kontakt wzrokowy przez 3 sekundy.',
        'Stopniowo wydłużajcie czas — pochwal każdą udaną próbę.',
      ],
      materials: 'Brak',
    },
    {
      title: 'Rzut kostką i pytanie',
      skillIds: [waiting],
      duration: 15,
      difficulty: 1,
      steps: [
        'Uczestnicy siadają w kręgu, kostka krąży po kolei.',
        'Osoba rzuca kostką i odpowiada na pytanie o wylosowanym numerze.',
        'Reszta grupy czeka na swoją kolej bez podpowiadania.',
      ],
      materials: 'Kostka, lista pytań',
    },
    {
      title: 'Karty emocji — dopasuj minę',
      skillIds: [emotions],
      duration: 10,
      difficulty: 1,
      steps: [
        'Rozłóż karty z minami emocji na stole.',
        'Uczestnik losuje kartę i nazywa emocję.',
        'Grupa wspólnie podaje sytuację, w której ktoś mógłby tak się poczuć.',
      ],
      materials: 'Karty emocji',
    },
    {
      title: 'Kto zaczyna rozmowę?',
      skillIds: [initiating],
      duration: 20,
      difficulty: 2,
      steps: [
        'Omówcie razem 3 sposoby rozpoczęcia rozmowy (pytanie, komentarz, komplement).',
        'Uczestnicy ćwiczą w parach rozpoczęcie rozmowy na wylosowany temat.',
        'Każda para prezentuje krótką scenkę na forum grupy.',
      ],
      materials: 'Karteczki z tematami',
    },
    {
      title: 'Detektyw emocji',
      skillIds: [emotions],
      duration: 15,
      difficulty: 3,
      steps: [
        'Prowadzący odgrywa krótką scenkę bez słów, tylko mimiką i gestem.',
        'Uczestnicy zgadują emocję i uzasadniają, po czym ją rozpoznali.',
        'Zamiana ról — uczestnik odgrywa, grupa zgaduje.',
      ],
      materials: 'Brak',
    },
    {
      title: 'Poczekalnia',
      skillIds: [waiting],
      duration: 12,
      difficulty: 2,
      steps: [
        'Ustawcie krzesła jak w poczekalni.',
        'Uczestnicy czekają na wywołanie swojego imienia, zajęci cichą czynnością.',
        'Omówcie po ćwiczeniu, co pomagało spokojnie czekać.',
      ],
      materials: 'Cicha zabawka lub książka na czas czekania',
    },
  ])

  const groupId = (await db.groups.add({ name: 'Motylki' })) as number
  await db.participants.bulkAdd([
    { name: 'Kasia W.', groupId },
    { name: 'Adam N.', groupId },
    { name: 'Tomek P.', groupId },
    { name: 'Zosia K.', groupId },
  ])
}
