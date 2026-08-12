import type { LangCode } from './translations'
import type { Scenario } from '../types'

/**
 * Translations for the seeded (built-in) scenario-library content.
 * Keyed by the original Polish text, which is the source of truth stored
 * in IndexedDB (see db.ts). Scenarios a user adds themselves are typed in
 * whatever language they choose and are shown as-is — there's no original
 * to translate from, so translateScenario() simply falls back to the
 * stored text when no entry matches.
 */

interface ScenarioContent {
  title: string
  steps: string[]
  materials?: string
}

const scenarioTranslations: Record<string, Partial<Record<'en' | 'uk', ScenarioContent>>> = {
  'Gra w spojrzenia': {
    en: {
      title: 'Eye contact game',
      steps: [
        "Sit facing each other in pairs.",
        "On the leader's signal, hold eye contact for 3 seconds.",
        'Gradually extend the time — praise every successful attempt.',
      ],
      materials: 'None',
    },
    uk: {
      title: 'Гра у погляди',
      steps: [
        'Сядьте одне навпроти одного парами.',
        'За сигналом ведучого утримуйте зоровий контакт протягом 3 секунд.',
        'Поступово подовжуйте час — хваліть кожну вдалу спробу.',
      ],
      materials: 'Немає',
    },
  },
  'Rzut kostką i pytanie': {
    en: {
      title: 'Roll the die and answer',
      steps: [
        'Participants sit in a circle; the die passes around in turn.',
        'The person rolls the die and answers the question matching the number rolled.',
        'The rest of the group waits for their turn without prompting.',
      ],
      materials: 'Die, list of questions',
    },
    uk: {
      title: 'Кидок кубика і питання',
      steps: [
        'Учасники сідають у коло, кубик передається по черзі.',
        'Особа кидає кубик і відповідає на запитання під випавшим номером.',
        'Решта групи чекає своєї черги, не підказуючи.',
      ],
      materials: 'Кубик, список запитань',
    },
  },
  'Karty emocji — dopasuj minę': {
    en: {
      title: 'Emotion cards — match the face',
      steps: [
        'Lay the emotion-face cards out on the table.',
        'The participant draws a card and names the emotion.',
        'The group together suggests a situation where someone might feel that way.',
      ],
      materials: 'Emotion cards',
    },
    uk: {
      title: 'Картки емоцій — впізнай вираз обличчя',
      steps: [
        'Розкладіть на столі картки з виразами обличчя, що передають емоції.',
        'Учасник витягує картку і називає емоцію.',
        'Група разом пропонує ситуацію, в якій хтось міг би так почуватися.',
      ],
      materials: 'Картки емоцій',
    },
  },
  'Kto zaczyna rozmowę?': {
    en: {
      title: 'Who starts the conversation?',
      steps: [
        'Discuss together 3 ways to start a conversation (a question, a comment, a compliment).',
        'Participants practise in pairs starting a conversation on a drawn topic.',
        'Each pair presents a short scene to the whole group.',
      ],
      materials: 'Topic cards',
    },
    uk: {
      title: 'Хто починає розмову?',
      steps: [
        'Обговоріть разом 3 способи почати розмову (запитання, коментар, комплімент).',
        'Учасники в парах тренуються починати розмову на витягнуту тему.',
        'Кожна пара показує коротку сценку перед групою.',
      ],
      materials: 'Картки з темами',
    },
  },
  'Detektyw emocji': {
    en: {
      title: 'Emotion detective',
      steps: [
        'The leader acts out a short scene with no words, only facial expression and gesture.',
        'Participants guess the emotion and explain how they recognised it.',
        'Swap roles — a participant acts it out, the group guesses.',
      ],
      materials: 'None',
    },
    uk: {
      title: 'Детектив емоцій',
      steps: [
        'Ведучий розігрує коротку сценку без слів, лише мімікою і жестами.',
        'Учасники вгадують емоцію і пояснюють, за чим її розпізнали.',
        'Обмін ролями — учасник розігрує, група вгадує.',
      ],
      materials: 'Немає',
    },
  },
  Poczekalnia: {
    en: {
      title: 'Waiting room',
      steps: [
        'Arrange the chairs like in a waiting room.',
        'Participants wait to be called by name, occupied with a quiet activity.',
        'Afterwards, discuss what helped them wait calmly.',
      ],
      materials: 'A quiet toy or book for the waiting time',
    },
    uk: {
      title: 'Зала очікування',
      steps: [
        'Розставте стільці, як у залі очікування.',
        "Учасники чекають, поки назвуть їхнє ім'я, займаючись тихою справою.",
        'Після вправи обговоріть, що допомагало спокійно чекати.',
      ],
      materials: 'Тиха іграшка або книга на час очікування',
    },
  },
}

const skillTranslations: Record<string, Partial<Record<'en' | 'uk', string>>> = {
  'Kontakt wzrokowy': { en: 'Eye contact', uk: 'Зоровий контакт' },
  'Czekanie na kolej': { en: 'Waiting for a turn', uk: 'Очікування своєї черги' },
  'Rozpoznawanie emocji': { en: 'Recognising emotions', uk: 'Розпізнавання емоцій' },
  'Inicjowanie rozmowy': { en: 'Starting a conversation', uk: 'Ініціювання розмови' },
}

export function translateSkillName(name: string, lang: LangCode): string {
  if (lang === 'pl') return name
  return skillTranslations[name]?.[lang] ?? name
}

export function translateScenario(scenario: Scenario, lang: LangCode): Scenario {
  if (lang === 'pl') return scenario
  const entry = scenarioTranslations[scenario.title]?.[lang]
  if (!entry) return scenario
  return { ...scenario, title: entry.title, steps: entry.steps, materials: entry.materials }
}
