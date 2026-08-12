export type LangCode = 'pl' | 'en' | 'uk'

export interface Translation {
  nav: {
    library: string
    planner: string
    tracker: string
    stories: string
    cards: string
    groups: string
    progress: string
  }
  topBar: {
    author: string
    portfolio: string
    linktree: string
  }
  widget: {
    coffee: string
    allLinks: string
    email: string
    close: string
    ariaLabel: string
  }
  language: {
    label: string
    availableHeading: string
    otherHeading: string
    comingSoon: string
    fallbackNotice: string
  }
}

export const translations: Record<LangCode, Translation> = {
  pl: {
    nav: {
      library: 'Biblioteka scenariuszy',
      planner: 'Planer sesji',
      tracker: 'Tracker postępów',
      stories: 'Historyjki społeczne',
      cards: 'Karty do sesji',
      groups: 'Grupy',
      progress: 'Analiza postępu',
    },
    topBar: {
      author: 'Autor aplikacji: Paweł Wasiak',
      portfolio: 'Portfolio psychologiczne',
      linktree: 'Linktree',
    },
    widget: {
      coffee: 'Postaw kawę',
      allLinks: 'Wszystkie linki',
      email: 'E-mail',
      close: 'Zamknij',
      ariaLabel: 'Linki społecznościowe',
    },
    language: {
      label: 'Język',
      availableHeading: 'Dostępne języki',
      otherHeading: 'Inne języki',
      comingSoon: 'wkrótce – wersja angielska',
      fallbackNotice: 'Ten język nie jest jeszcze w pełni dostępny — interfejs pokazano po angielsku.',
    },
  },
  en: {
    nav: {
      library: 'Scenario library',
      planner: 'Session planner',
      tracker: 'Progress tracker',
      stories: 'Social stories',
      cards: 'Session cards',
      groups: 'Groups',
      progress: 'Progress analysis',
    },
    topBar: {
      author: 'App author: Paweł Wasiak',
      portfolio: 'Psychology portfolio',
      linktree: 'Linktree',
    },
    widget: {
      coffee: 'Buy me a coffee',
      allLinks: 'All links',
      email: 'Email',
      close: 'Close',
      ariaLabel: 'Social links',
    },
    language: {
      label: 'Language',
      availableHeading: 'Available languages',
      otherHeading: 'Other languages',
      comingSoon: 'coming soon – shown in English',
      fallbackNotice: 'This language isn’t fully available yet — showing the English interface.',
    },
  },
  uk: {
    nav: {
      library: 'Бібліотека сценаріїв',
      planner: 'Планувальник сесій',
      tracker: 'Трекер прогресу',
      stories: 'Соціальні історії',
      cards: 'Картки для сесій',
      groups: 'Групи',
      progress: 'Аналіз прогресу',
    },
    topBar: {
      author: 'Автор застосунку: Павел Васʼяк',
      portfolio: 'Психологічне портфоліо',
      linktree: 'Linktree',
    },
    widget: {
      coffee: 'Постав каву',
      allLinks: 'Усі посилання',
      email: 'Ел. пошта',
      close: 'Закрити',
      ariaLabel: 'Соціальні посилання',
    },
    language: {
      label: 'Мова',
      availableHeading: 'Доступні мови',
      otherHeading: 'Інші мови',
      comingSoon: 'незабаром – англійською',
      fallbackNotice: 'Ця мова ще не повністю доступна — інтерфейс показано англійською.',
    },
  },
}

// Languages fully translated and selectable as the interface language.
export const availableLanguages: { code: LangCode; nativeName: string; flag: string }[] = [
  { code: 'pl', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'en', nativeName: 'English', flag: '🇬🇧' },
  { code: 'uk', nativeName: 'Українська', flag: '🇺🇦' },
]

// Extra languages listed in the picker (Linktree-style "choose your language"),
// not yet translated — selecting one falls back to the English interface.
export const otherLanguages: { code: string; nativeName: string; flag: string }[] = [
  { code: 'de', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'it', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'cs', nativeName: 'Čeština', flag: '🇨🇿' },
  { code: 'sk', nativeName: 'Slovenčina', flag: '🇸🇰' },
  { code: 'lt', nativeName: 'Lietuvių', flag: '🇱🇹' },
  { code: 'tr', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', nativeName: '中文', flag: '🇨🇳' },
]
