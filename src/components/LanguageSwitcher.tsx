import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { availableLanguages, otherLanguages } from '../i18n/translations'
import { GlobeIcon } from './socialIcons'

/**
 * Linktree-style language picker: a globe button that opens a full list of
 * languages. PL / EN / UK are fully translated and switch the interface;
 * the extra languages (mirroring the picker on linktree.wasiakpawel.pl)
 * are listed too but currently fall back to English when chosen.
 */
export default function LanguageSwitcher() {
  const { lang, t, requestLang, fallbackNotice } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const current = availableLanguages.find((l) => l.code === lang)!

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={t.language.label}
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-heather-ink bg-paper-raised px-2.5 py-1 rounded-full border border-line-strong hover:shadow-sm hover:bg-white transition"
      >
        <GlobeIcon className="w-[13px] h-[13px] shrink-0" />
        <span aria-hidden="true">{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto rounded-xl border border-line bg-paper-raised shadow-xl z-50 py-1.5"
        >
          <p className="px-3 pt-1 pb-1 text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
            {t.language.availableHeading}
          </p>
          {availableLanguages.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              onClick={() => {
                requestLang(l.code)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-[13px] text-left hover:bg-paper-raised ${
                l.code === lang ? 'bg-sage-tint text-sage-ink font-semibold' : 'text-ink'
              }`}
            >
              <span aria-hidden="true">{l.flag}</span>
              <span>{l.nativeName}</span>
            </button>
          ))}

          <div className="my-1.5 border-t border-line" />

          <p className="px-3 pt-1 pb-1 text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
            {t.language.otherHeading}
          </p>
          {otherLanguages.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={false}
              onClick={() => {
                requestLang(l.code)
                setOpen(false)
              }}
              className="flex w-full items-center justify-between gap-2 px-3 py-1.5 text-[13px] text-left text-ink-soft hover:bg-paper-raised"
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true">{l.flag}</span>
                <span>{l.nativeName}</span>
              </span>
              <span className="text-[10px] text-ink-faint">{t.language.comingSoon}</span>
            </button>
          ))}
        </div>
      )}

      {fallbackNotice && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-line-strong bg-ink text-paper text-[12px] px-3 py-2 shadow-lg z-50">
          {t.language.fallbackNotice}
        </div>
      )}
    </div>
  )
}
