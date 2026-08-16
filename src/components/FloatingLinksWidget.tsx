import { useLanguage } from '../i18n/LanguageContext'

// Wierny port bloku "2) PŁYWAJĄCY PASEK (FAB)" z social-links-component.html
// (projekt "Marka" / ekosystem wasiakpawel.pl). Style (.social-fab) pochodzą
// z /styleguide.css. Statyczny pasek, bez rozwijania/JS poza samym linkiem —
// zgodnie z notatką w komponencie źródłowym (na mobile poprzednia,
// rozwijana wersja bywała niewidoczna/nie reagowała).
//
// Pozycja na mobile jest lekko podniesiona względem oryginału (patrz
// override .social-fab w src/index.css) — aplikacja ma własny dolny pasek
// nawigacji zakładek, więc zwykłe bottom:8px z komponentu by go zasłaniało.
// Przycisk wsparcia (Suppi) w Layout.tsx zostaje w prawym dolnym rogu,
// zgodnie z notatką w styleguide.css ("jeśli strona ma pływający CTA,
// trzymaj go po prawej — .social-fab siedzi po lewej").

export default function FloatingLinksWidget() {
  const { t } = useLanguage()

  return (
    <div className="social-fab no-print" role="navigation" aria-label={t.widget.ariaLabel}>
      <a href="https://x.com/wasiak_dsm" target="_blank" rel="noopener" title="X (Twitter)" aria-label="X (Twitter)">
        <svg viewBox="0 0 24 24"><path d="M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-6.7L4.8 22H1.7l8.1-9.3L1 2h7.1l4.9 6.1L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z" /></svg>
      </a>
      <a href="https://www.linkedin.com/in/pwasiak30" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05C19.8 8 21 10 21 13.2V23h-4v-8.9c0-2.13-.04-4.86-2.96-4.86-2.97 0-3.42 2.32-3.42 4.7V23H8V8z" /></svg>
      </a>
      <a href="https://www.youtube.com/@psychologia.wasiak" target="_blank" rel="noopener" title="YouTube" aria-label="YouTube">
        <svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.5v-7L15.8 12l-6.2 3.5z" /></svg>
      </a>
      <a href="https://www.instagram.com/psychologia.wasiak/" target="_blank" rel="noopener" title="Instagram" aria-label="Instagram">
        <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.6 1.8c.46-.16 1.26-.35 2.43-.4C9.28 1.35 9.7 1.34 12 1.34zm0 3.16a6.64 6.64 0 1 0 0 13.28 6.64 6.64 0 0 0 0-13.28zm0 10.95a4.31 4.31 0 1 1 0-8.62 4.31 4.31 0 0 1 0 8.62zm7.34-11.2a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0z" /></svg>
      </a>
      <a href="https://www.facebook.com/psychologia.wasiak" target="_blank" rel="noopener" title="Facebook" aria-label="Facebook">
        <svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>
      </a>
      <a href="https://github.com/pwasiak30" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub">
        <svg viewBox="0 0 24 24"><path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.12.82-.26.82-.58v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.75.09-.73.09-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.33 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.56 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.6-2.81 5.63-5.49 5.92.43.38.81 1.1.81 2.22v3.29c0 .32.22.71.83.58A12 12 0 0 0 12 .3z" /></svg>
      </a>
      <a href="https://mastodon.social/@s3in610" target="_blank" rel="noopener" title="Mastodon" aria-label="Mastodon">
        <svg viewBox="0 0 24 24"><path d="M21.6 7.5c0-4.1-2.7-5.3-2.7-5.3C17.5 1.5 15.3 1.1 13 1h-.1c-2.3.1-4.5.5-5.9 1.2 0 0-2.7 1.2-2.7 5.3 0 .9-.02 2 0 3.1.06 4 .6 8 3.7 8.9 1.4.4 2.6.5 3.6.4 1.8-.1 2.8-.6 2.8-.6l-.06-1.3s-1.3.4-2.7.4c-1.4-.05-2.9-.15-3.1-1.9a3.5 3.5 0 0 1-.03-.5c1.4.3 3.5.4 4.9.3 1.2-.1 2.5-.3 3.6-.9 0 0 .5-.3.9-.7 1-1 1.4-2.6 1.5-4.6.02-.7.02-1.3.02-1.9zm-2.4 3.9h-1.5V7.9c0-.9-.4-1.4-1.2-1.4-.9 0-1.3.6-1.3 1.7v2.4h-1.5V8.2c0-1.1-.4-1.7-1.3-1.7-.8 0-1.2.5-1.2 1.4v3.5H8.9V7.8c0-.9.2-1.6.7-2.2.5-.6 1.2-.9 2-.9.9 0 1.6.3 2.1 1l.4.7.4-.7c.5-.7 1.2-1 2.1-1 .8 0 1.5.3 2 .9.5.6.7 1.3.7 2.2v3.6z" /></svg>
      </a>
      <a
        href="https://linktree.wasiakpawel.pl"
        target="_blank"
        rel="noopener"
        title={t.widget.allLinks}
        aria-label={t.widget.allLinks}
      >
        <svg viewBox="0 0 24 24"><path d="M3.9 12a3.1 3.1 0 0 1 3.1-3.1h3.5v1.7H7a1.4 1.4 0 1 0 0 2.8h3.5v1.7H7A3.1 3.1 0 0 1 3.9 12zm12.6-3.1H13v1.7h3.5a1.4 1.4 0 1 1 0 2.8H13v1.7h3.5a3.1 3.1 0 1 0 0-6.2zM8.5 11.15h7v1.7h-7v-1.7z" /></svg>
      </a>
    </div>
  )
}
