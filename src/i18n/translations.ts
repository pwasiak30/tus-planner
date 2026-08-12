import { countLabel } from './plural'

export type LangCode = 'pl' | 'en' | 'uk'

export interface PagesTranslation {
  library: {
    title: string
    subtitle: (count: number) => string
    addButton: string
    cancelButton: string
    titleLabel: string
    skillsLabel: string
    durationLabel: string
    difficultyLabel: string
    difficultyOptions: [string, string, string]
    materialsLabel: string
    materialsOptional: string
    stepsLabel: string
    saveButton: string
    allFilter: string
    materialsPrefix: string
    emptyState: string
  }
  planner: {
    title: string
    totalTimeLabel: string
    minutesSuffix: string
    groupLabel: string
    dateLabel: string
    slotLabels: { warmup: string; main: string; summary: string }
    chooseExercisePlaceholder: string
    noExerciseAssigned: string
    saveButton: string
    savedButton: string
    recentSessions: string
    noSessions: string
  }
  tracker: {
    title: string
    subtitle: string
    sessionLabel: string
    noSessionYet: string
    participantHeader: string
    noParticipants: string
    noteHeading: (participant: string, skill: string) => string
  }
  stories: {
    title: string
    subtitle: string
    situationLabel: string
    situationPlaceholder: string
    stepsLabel: string
    stepsPlaceholder: string
    generateButton: string
    generatingButton: string
    errorMessage: string
    stepLabel: (n: number) => string
    noPictogram: string
    prevPictogram: string
    nextPictogram: string
    saveStoryButton: string
    savedStoriesHeading: string
    noSavedStories: string
    stepsCount: (n: number) => string
    printButton: string
  }
  cards: {
    title: string
    subtitle: string
    pickFromSessionLabel: string
    pickSessionPlaceholder: string
    printButton: (count: number) => string
    materialsPrefix: string
  }
  groups: {
    title: string
    subtitle: string
    newGroupPlaceholder: string
    addGroupButton: string
    deleteGroupButton: string
    deleteGroupConfirm: string
    noParticipants: string
    participantPlaceholder: string
    addButton: string
    deleteParticipantLabel: (name: string) => string
    noGroups: string
    backupHeading: string
    backupDescription: string
    exportButton: string
    importButton: string
    importConfirm: string
    importSuccess: string
    importError: string
  }
  progress: {
    title: string
    subtitle: string
    printReportButton: string
    participantLabel: string
    noParticipants: string
    noEntriesForParticipant: string
    sessionsSummary: (count: number, from: string, to: string) => string
    sessionHeader: string
    notesHeading: string
    noNotes: string
  }
}

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
  pages: PagesTranslation
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
    pages: {
      library: {
        title: 'Biblioteka scenariuszy',
        subtitle: (n) =>
          `${countLabel('pl', n, { pl: ['ćwiczenie', 'ćwiczenia', 'ćwiczeń'], en: ['exercise', 'exercises'], uk: ['вправа', 'вправи', 'вправ'] })} · filtruj po umiejętności`,
        addButton: '+ Dodaj scenariusz',
        cancelButton: 'Anuluj',
        titleLabel: 'Tytuł ćwiczenia',
        skillsLabel: 'Umiejętności',
        durationLabel: 'Czas trwania (min)',
        difficultyLabel: 'Poziom trudności',
        difficultyOptions: ['Podstawowy', 'Średni', 'Zaawansowany'],
        materialsLabel: 'Materiały',
        materialsOptional: 'Materiały (opcjonalnie)',
        stepsLabel: 'Instrukcja krok po kroku (jedna linia = jeden krok)',
        saveButton: 'Zapisz scenariusz',
        allFilter: 'Wszystkie',
        materialsPrefix: 'Materiały',
        emptyState: 'Brak scenariuszy dla tej umiejętności.',
      },
      planner: {
        title: 'Planer sesji',
        totalTimeLabel: 'Suma czasu:',
        minutesSuffix: 'min',
        groupLabel: 'Grupa',
        dateLabel: 'Data',
        slotLabels: { warmup: 'Rozgrzewka', main: 'Ćwiczenie główne', summary: 'Podsumowanie' },
        chooseExercisePlaceholder: '— wybierz ćwiczenie —',
        noExerciseAssigned: 'brak przypisanego ćwiczenia',
        saveButton: 'Zapisz sesję',
        savedButton: 'Zapisano ✓',
        recentSessions: 'Ostatnie sesje',
        noSessions: 'Brak zapisanych sesji.',
      },
      tracker: {
        title: 'Tracker postępów',
        subtitle: 'Poziom opanowania w skali 1–5',
        sessionLabel: 'Sesja',
        noSessionYet: 'Najpierw zapisz sesję w planerze.',
        participantHeader: 'Uczestnik',
        noParticipants: 'Ta grupa nie ma jeszcze uczestników.',
        noteHeading: (participant, skill) => `Notatka behawioralna — ${participant}, ${skill}`,
      },
      stories: {
        title: 'Generator historyjek społecznych',
        subtitle: 'Piktogramy ARASAAC — automatyczne dopasowanie do każdego kroku',
        situationLabel: 'Sytuacja',
        situationPlaceholder: 'np. Jak zachować się w sklepie',
        stepsLabel: 'Kroki (jedna linia = jeden krok)',
        stepsPlaceholder:
          'Wchodzę do sklepu i biorę koszyk\nSzukam produktów z listy\nCzekam spokojnie w kolejce do kasy\nPłacę i mówię dziękuję',
        generateButton: 'Generuj',
        generatingButton: 'Szukam piktogramów…',
        errorMessage: 'Nie udało się połączyć z ARASAAC. Sprawdź internet i spróbuj ponownie.',
        stepLabel: (n) => `Krok ${n}`,
        noPictogram: 'brak',
        prevPictogram: 'Poprzedni piktogram',
        nextPictogram: 'Następny piktogram',
        saveStoryButton: 'Zapisz historyjkę',
        savedStoriesHeading: 'Zapisane historyjki',
        noSavedStories: 'Brak zapisanych historyjek.',
        stepsCount: (n) =>
          countLabel('pl', n, { pl: ['krok', 'kroki', 'kroków'], en: ['step', 'steps'], uk: ['крок', 'кроки', 'кроків'] }),
        printButton: 'Drukuj / PDF',
      },
      cards: {
        title: 'Karty do sesji',
        subtitle: 'Wybierz scenariusze i wydrukuj karty do odgrywania scenek',
        pickFromSessionLabel: 'Wybierz z zapisanej sesji',
        pickSessionPlaceholder: '— wybierz sesję —',
        printButton: (n) => `Drukuj${n > 0 ? ` (${n})` : ''}`,
        materialsPrefix: 'Materiały',
      },
      groups: {
        title: 'Grupy',
        subtitle: 'Zarządzaj grupami i uczestnikami',
        newGroupPlaceholder: 'Nazwa nowej grupy',
        addGroupButton: '+ Dodaj grupę',
        deleteGroupButton: 'Usuń grupę',
        deleteGroupConfirm:
          'Usunąć grupę i wszystkich jej uczestników? Zapisane sesje pozostaną, ale bez przypisanych osób.',
        noParticipants: 'Brak uczestników.',
        participantPlaceholder: 'Imię uczestnika',
        addButton: 'Dodaj',
        deleteParticipantLabel: (name) => `Usuń ${name}`,
        noGroups: 'Brak grup. Dodaj pierwszą powyżej.',
        backupHeading: 'Kopia zapasowa',
        backupDescription:
          'Wszystkie dane są zapisane lokalnie w tej przeglądarce. Zrób kopię zapasową, zanim wyczyścisz dane przeglądarki lub zmienisz komputer.',
        exportButton: 'Eksportuj kopię zapasową',
        importButton: 'Importuj kopię zapasową',
        importConfirm:
          'Import zastąpi WSZYSTKIE obecne dane (scenariusze, grupy, sesje, postępy, historyjki) zawartością pliku. Kontynuować?',
        importSuccess: 'Zaimportowano pomyślnie.',
        importError: 'Nie udało się zaimportować — sprawdź, czy to poprawny plik kopii zapasowej.',
      },
      progress: {
        title: 'Analiza postępu',
        subtitle: 'Trend poziomu opanowania w czasie',
        printReportButton: 'Drukuj raport',
        participantLabel: 'Uczestnik',
        noParticipants: 'Brak uczestników do wyboru.',
        noEntriesForParticipant:
          'Brak zapisanych ocen postępu dla tego uczestnika. Wypełnij tracker po sesji.',
        sessionsSummary: (count, from, to) =>
          `${countLabel('pl', count, { pl: ['sesja', 'sesje', 'sesji'], en: ['session', 'sessions'], uk: ['сесія', 'сесії', 'сесій'] })} · ${from}–${to}`,
        sessionHeader: 'Sesja',
        notesHeading: 'Notatki behawioralne',
        noNotes: 'Brak zapisanych notatek dla tego uczestnika.',
      },
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
    pages: {
      library: {
        title: 'Scenario library',
        subtitle: (n) =>
          `${countLabel('en', n, { pl: ['ćwiczenie', 'ćwiczenia', 'ćwiczeń'], en: ['exercise', 'exercises'], uk: ['вправа', 'вправи', 'вправ'] })} · filter by skill`,
        addButton: '+ Add scenario',
        cancelButton: 'Cancel',
        titleLabel: 'Exercise title',
        skillsLabel: 'Skills',
        durationLabel: 'Duration (min)',
        difficultyLabel: 'Difficulty level',
        difficultyOptions: ['Basic', 'Medium', 'Advanced'],
        materialsLabel: 'Materials',
        materialsOptional: 'Materials (optional)',
        stepsLabel: 'Step-by-step instructions (one line = one step)',
        saveButton: 'Save scenario',
        allFilter: 'All',
        materialsPrefix: 'Materials',
        emptyState: 'No scenarios for this skill.',
      },
      planner: {
        title: 'Session planner',
        totalTimeLabel: 'Total time:',
        minutesSuffix: 'min',
        groupLabel: 'Group',
        dateLabel: 'Date',
        slotLabels: { warmup: 'Warm-up', main: 'Main exercise', summary: 'Summary' },
        chooseExercisePlaceholder: '— choose an exercise —',
        noExerciseAssigned: 'no exercise assigned',
        saveButton: 'Save session',
        savedButton: 'Saved ✓',
        recentSessions: 'Recent sessions',
        noSessions: 'No saved sessions.',
      },
      tracker: {
        title: 'Progress tracker',
        subtitle: 'Mastery level on a 1–5 scale',
        sessionLabel: 'Session',
        noSessionYet: 'Save a session in the planner first.',
        participantHeader: 'Participant',
        noParticipants: 'This group has no participants yet.',
        noteHeading: (participant, skill) => `Behavioural note — ${participant}, ${skill}`,
      },
      stories: {
        title: 'Social story generator',
        subtitle: 'ARASAAC pictograms — automatically matched to each step',
        situationLabel: 'Situation',
        situationPlaceholder: 'e.g. How to behave in a shop',
        stepsLabel: 'Steps (one line = one step)',
        stepsPlaceholder:
          'I walk into the shop and take a basket\nI look for the items on my list\nI wait calmly in the checkout line\nI pay and say thank you',
        generateButton: 'Generate',
        generatingButton: 'Looking for pictograms…',
        errorMessage: 'Could not connect to ARASAAC. Check your internet connection and try again.',
        stepLabel: (n) => `Step ${n}`,
        noPictogram: 'none',
        prevPictogram: 'Previous pictogram',
        nextPictogram: 'Next pictogram',
        saveStoryButton: 'Save story',
        savedStoriesHeading: 'Saved stories',
        noSavedStories: 'No saved stories.',
        stepsCount: (n) =>
          countLabel('en', n, { pl: ['krok', 'kroki', 'kroków'], en: ['step', 'steps'], uk: ['крок', 'кроки', 'кроків'] }),
        printButton: 'Print / PDF',
      },
      cards: {
        title: 'Session cards',
        subtitle: 'Pick scenarios and print cards for acting out scenes',
        pickFromSessionLabel: 'Pick from a saved session',
        pickSessionPlaceholder: '— choose a session —',
        printButton: (n) => `Print${n > 0 ? ` (${n})` : ''}`,
        materialsPrefix: 'Materials',
      },
      groups: {
        title: 'Groups',
        subtitle: 'Manage groups and participants',
        newGroupPlaceholder: 'New group name',
        addGroupButton: '+ Add group',
        deleteGroupButton: 'Delete group',
        deleteGroupConfirm:
          'Delete the group and all its participants? Saved sessions will remain, but without assigned people.',
        noParticipants: 'No participants.',
        participantPlaceholder: "Participant's name",
        addButton: 'Add',
        deleteParticipantLabel: (name) => `Remove ${name}`,
        noGroups: 'No groups yet. Add the first one above.',
        backupHeading: 'Backup',
        backupDescription:
          'All data is stored locally in this browser. Make a backup before clearing browser data or switching computers.',
        exportButton: 'Export backup',
        importButton: 'Import backup',
        importConfirm:
          'Importing will replace ALL current data (scenarios, groups, sessions, progress, stories) with the contents of the file. Continue?',
        importSuccess: 'Imported successfully.',
        importError: "Import failed — check that this is a valid backup file.",
      },
      progress: {
        title: 'Progress analysis',
        subtitle: 'Mastery level trend over time',
        printReportButton: 'Print report',
        participantLabel: 'Participant',
        noParticipants: 'No participants to choose from.',
        noEntriesForParticipant:
          'No saved progress ratings for this participant yet. Fill in the tracker after a session.',
        sessionsSummary: (count, from, to) =>
          `${countLabel('en', count, { pl: ['sesja', 'sesje', 'sesji'], en: ['session', 'sessions'], uk: ['сесія', 'сесії', 'сесій'] })} · ${from}–${to}`,
        sessionHeader: 'Session',
        notesHeading: 'Behavioural notes',
        noNotes: 'No saved notes for this participant.',
      },
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
    pages: {
      library: {
        title: 'Бібліотека сценаріїв',
        subtitle: (n) =>
          `${countLabel('uk', n, { pl: ['ćwiczenie', 'ćwiczenia', 'ćwiczeń'], en: ['exercise', 'exercises'], uk: ['вправа', 'вправи', 'вправ'] })} · фільтруйте за навичкою`,
        addButton: '+ Додати сценарій',
        cancelButton: 'Скасувати',
        titleLabel: 'Назва вправи',
        skillsLabel: 'Навички',
        durationLabel: 'Тривалість (хв)',
        difficultyLabel: 'Рівень складності',
        difficultyOptions: ['Базовий', 'Середній', 'Просунутий'],
        materialsLabel: 'Матеріали',
        materialsOptional: 'Матеріали (необов’язково)',
        stepsLabel: 'Покрокова інструкція (один рядок = один крок)',
        saveButton: 'Зберегти сценарій',
        allFilter: 'Усі',
        materialsPrefix: 'Матеріали',
        emptyState: 'Немає сценаріїв для цієї навички.',
      },
      planner: {
        title: 'Планувальник сесій',
        totalTimeLabel: 'Загальний час:',
        minutesSuffix: 'хв',
        groupLabel: 'Група',
        dateLabel: 'Дата',
        slotLabels: { warmup: 'Розминка', main: 'Основна вправа', summary: 'Підсумок' },
        chooseExercisePlaceholder: '— оберіть вправу —',
        noExerciseAssigned: 'вправу не призначено',
        saveButton: 'Зберегти сесію',
        savedButton: 'Збережено ✓',
        recentSessions: 'Останні сесії',
        noSessions: 'Немає збережених сесій.',
      },
      tracker: {
        title: 'Трекер прогресу',
        subtitle: 'Рівень опанування за шкалою 1–5',
        sessionLabel: 'Сесія',
        noSessionYet: 'Спершу збережіть сесію в планувальнику.',
        participantHeader: 'Учасник',
        noParticipants: 'У цій групі ще немає учасників.',
        noteHeading: (participant, skill) => `Поведінкова нотатка — ${participant}, ${skill}`,
      },
      stories: {
        title: 'Генератор соціальних історій',
        subtitle: 'Піктограми ARASAAC — автоматичний підбір для кожного кроку',
        situationLabel: 'Ситуація',
        situationPlaceholder: 'напр. Як поводитися в магазині',
        stepsLabel: 'Кроки (один рядок = один крок)',
        stepsPlaceholder:
          'Заходжу в магазин і беру кошик\nШукаю товари зі списку\nСпокійно чекаю в черзі до каси\nПлачу і кажу дякую',
        generateButton: 'Згенерувати',
        generatingButton: 'Шукаю піктограми…',
        errorMessage: "Не вдалося з'єднатися з ARASAAC. Перевірте інтернет і спробуйте ще раз.",
        stepLabel: (n) => `Крок ${n}`,
        noPictogram: 'немає',
        prevPictogram: 'Попередня піктограма',
        nextPictogram: 'Наступна піктограма',
        saveStoryButton: 'Зберегти історію',
        savedStoriesHeading: 'Збережені історії',
        noSavedStories: 'Немає збережених історій.',
        stepsCount: (n) =>
          countLabel('uk', n, { pl: ['krok', 'kroki', 'kroków'], en: ['step', 'steps'], uk: ['крок', 'кроки', 'кроків'] }),
        printButton: 'Друк / PDF',
      },
      cards: {
        title: 'Картки для сесій',
        subtitle: 'Оберіть сценарії та роздрукуйте картки для розігрування сценок',
        pickFromSessionLabel: 'Обрати зі збереженої сесії',
        pickSessionPlaceholder: '— оберіть сесію —',
        printButton: (n) => `Друк${n > 0 ? ` (${n})` : ''}`,
        materialsPrefix: 'Матеріали',
      },
      groups: {
        title: 'Групи',
        subtitle: 'Керуйте групами та учасниками',
        newGroupPlaceholder: 'Назва нової групи',
        addGroupButton: '+ Додати групу',
        deleteGroupButton: 'Видалити групу',
        deleteGroupConfirm:
          'Видалити групу та всіх її учасників? Збережені сесії залишаться, але без прив’язаних осіб.',
        noParticipants: 'Немає учасників.',
        participantPlaceholder: "Ім'я учасника",
        addButton: 'Додати',
        deleteParticipantLabel: (name) => `Видалити ${name}`,
        noGroups: 'Немає груп. Додайте першу вище.',
        backupHeading: 'Резервна копія',
        backupDescription:
          'Усі дані зберігаються локально в цьому браузері. Зробіть резервну копію, перш ніж очищати дані браузера або змінювати комп’ютер.',
        exportButton: 'Експортувати резервну копію',
        importButton: 'Імпортувати резервну копію',
        importConfirm:
          'Імпорт замінить УСІ поточні дані (сценарії, групи, сесії, прогрес, історії) вмістом файлу. Продовжити?',
        importSuccess: 'Успішно імпортовано.',
        importError: 'Не вдалося імпортувати — перевірте, чи це правильний файл резервної копії.',
      },
      progress: {
        title: 'Аналіз прогресу',
        subtitle: 'Тренд рівня опанування в часі',
        printReportButton: 'Друкувати звіт',
        participantLabel: 'Учасник',
        noParticipants: 'Немає учасників для вибору.',
        noEntriesForParticipant:
          'Для цього учасника ще немає збережених оцінок прогресу. Заповніть трекер після сесії.',
        sessionsSummary: (count, from, to) =>
          `${countLabel('uk', count, { pl: ['sesja', 'sesje', 'sesji'], en: ['session', 'sessions'], uk: ['сесія', 'сесії', 'сесій'] })} · ${from}–${to}`,
        sessionHeader: 'Сесія',
        notesHeading: 'Поведінкові нотатки',
        noNotes: 'Немає збережених нотаток для цього учасника.',
      },
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
