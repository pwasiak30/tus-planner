import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translations, type LangCode, type Translation } from './translations'

const STORAGE_KEY = 'tus-planner-lang'

function detectInitialLang(): LangCode {
  if (typeof window === 'undefined') return 'pl'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'pl' || stored === 'en' || stored === 'uk') return stored
  const browserLang = window.navigator.language?.slice(0, 2).toLowerCase()
  if (browserLang === 'en') return 'en'
  if (browserLang === 'uk') return 'uk'
  return 'pl'
}

interface LanguageContextValue {
  lang: LangCode
  t: Translation
  setLang: (lang: LangCode) => void
  /** Selecting an unsupported language falls back to English and surfaces a brief notice. */
  requestLang: (code: string) => void
  fallbackNotice: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => detectInitialLang())
  const [fallbackNotice, setFallbackNotice] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (!fallbackNotice) return
    const timer = window.setTimeout(() => setFallbackNotice(false), 4000)
    return () => window.clearTimeout(timer)
  }, [fallbackNotice])

  const setLang = (next: LangCode) => {
    setFallbackNotice(false)
    setLangState(next)
  }

  const requestLang = (code: string) => {
    if (code === 'pl' || code === 'en' || code === 'uk') {
      setLang(code)
      return
    }
    // Not yet translated: fall back to English and let the UI know why.
    setLangState('en')
    setFallbackNotice(true)
  }

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: translations[lang], setLang, requestLang, fallbackNotice }),
    [lang, fallbackNotice],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
