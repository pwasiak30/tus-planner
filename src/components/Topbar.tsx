import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

// Wierny port topbar-component.html (projekt "Marka" / ekosystem wasiakpawel.pl).
// Style (.topbar, .topbar-inner, .topbar-brand, .topbar-links, .theme-toggle,
// .icon-sun/.icon-moon) pochodzą z /styleguide.css — patrz index.html <head>.
// Widoczność ikon słońce/księżyc obsługuje samo CSS (atrybut data-theme na <html>
// + fallback prefers-color-scheme), więc komponent nie musi trzymać stanu motywu.

const THEME_KEY = 'wp-theme'

function currentTheme(): 'light' | 'dark' {
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'dark' || attr === 'light') return attr
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function toggleTheme() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  try {
    localStorage.setItem(THEME_KEY, next)
  } catch {
    // prywatny tryb przeglądania / brak dostępu do localStorage — motyw po
    // prostu nie zostanie zapamiętany na następną wizytę
  }
}

export default function Topbar() {
  const { t } = useLanguage()

  return (
    <header className="topbar no-print">
      <div className="topbar-inner">
        <a href="https://wasiakpawel.pl" className="topbar-brand">
          <span className="dot" />
          wasiakpawel.pl
        </a>
        <nav>
          <ul className="topbar-links">
            <li>
              <a href="https://wasiakpawel.pl">Strona główna</a>
            </li>
            <li>
              <a href="https://linktree.wasiakpawel.pl" className="is-accent">
                🔗 Linktree
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={t.topBar.themeToggle}
                title={t.topBar.themeToggle}
              >
                <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4.5a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1.5a1 1 0 0 1-1 1zm0 15a1 1 0 0 1 1 1V22a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1zm7.5-7.5a1 1 0 0 1 1-1H22a1 1 0 1 1 0 2h-1.5a1 1 0 0 1-1-1zm-15 0a1 1 0 0 1 1 1H2a1 1 0 1 1 0-2h1.5a1 1 0 0 1 1 1zm12.02-5.52a1 1 0 0 1 0-1.42l1.06-1.06a1 1 0 1 1 1.42 1.42l-1.06 1.06a1 1 0 0 1-1.42 0zM5.44 18.56a1 1 0 0 1 0-1.42l1.06-1.06a1 1 0 1 1 1.42 1.42l-1.06 1.06a1 1 0 0 1-1.42 0zm13.12 0a1 1 0 0 1-1.42 0l-1.06-1.06a1 1 0 1 1 1.42-1.42l1.06 1.06a1 1 0 0 1 0 1.42zM6.5 6.5a1 1 0 0 1-1.42 0L4.02 5.44a1 1 0 0 1 1.42-1.42L6.5 5.08a1 1 0 0 1 0 1.42zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
                </svg>
                <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21.5 14.5A9 9 0 1 1 9.5 2.5a1 1 0 0 1 1.06 1.5A7 7 0 0 0 20 13.44a1 1 0 0 1 1.5 1.06z" />
                </svg>
              </button>
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
