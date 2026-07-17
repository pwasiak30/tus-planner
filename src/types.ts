export interface Skill {
  id?: number
  name: string
}

export interface Scenario {
  id?: number
  title: string
  skillIds: number[]
  duration: number
  difficulty: 1 | 2 | 3
  steps: string[]
  materials?: string
}

export interface Group {
  id?: number
  name: string
}

export interface Participant {
  id?: number
  name: string
  groupId: number
}

export type SlotKey = 'warmup' | 'main' | 'summary'

export interface Session {
  id?: number
  groupId: number
  date: string
  slots: Record<SlotKey, number | null>
}

export interface ProgressEntry {
  id?: number
  sessionId: number
  participantId: number
  skillId: number
  level: 1 | 2 | 3 | 4 | 5
  note: string
}

export interface StoryStep {
  text: string
  pictogramId: number | null
}

export interface SocialStory {
  id?: number
  title: string
  steps: StoryStep[]
}
