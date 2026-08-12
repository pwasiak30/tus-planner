import type React from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import {
  XIcon,
  LinkedInIcon,
  YouTubeIcon,
  InstagramIcon,
  FacebookIcon,
  GitHubIcon,
  MastodonIcon,
  AllLinksIcon,
} from './socialIcons'

interface WidgetLink {
  href: string
  labelKey?: 'allLinks'
  label?: string
  icon: React.ComponentType<{ className?: string }>
  accentClass: string
}

/**
 * The full-height, always-expanded floating link bar ("pływak") mirrored
 * from wasiakpawel.pl — same links, same order, shown in full on both
 * desktop and mobile (no collapse/expand interaction). The "buy me a
 * coffee" button stays separate, as its own floating button (see Layout).
 */
export default function FloatingLinksWidget() {
  const { t } = useLanguage()

  const links: WidgetLink[] = [
    {
      href: 'https://x.com/wasiak_dsm',
      label: 'X (Twitter)',
      icon: XIcon,
      accentClass: 'hover:bg-ink hover:text-paper hover:border-ink',
    },
    {
      href: 'https://www.linkedin.com/in/pwasiak30',
      label: 'LinkedIn',
      icon: LinkedInIcon,
      accentClass: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
    },
    {
      href: 'https://www.youtube.com/@psychologia.wasiak',
      label: 'YouTube',
      icon: YouTubeIcon,
      accentClass: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]',
    },
    {
      href: 'https://www.instagram.com/psychologia.wasiak/',
      label: 'Instagram',
      icon: InstagramIcon,
      accentClass: 'hover:bg-[#C1367F] hover:text-white hover:border-[#C1367F]',
    },
    {
      href: 'https://www.facebook.com/psychologia.wasiak',
      label: 'Facebook',
      icon: FacebookIcon,
      accentClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
    },
    {
      href: 'https://github.com/pwasiak30',
      label: 'GitHub',
      icon: GitHubIcon,
      accentClass: 'hover:bg-ink hover:text-paper hover:border-ink',
    },
    {
      href: 'https://mastodon.social/@s3in610',
      label: 'Mastodon',
      icon: MastodonIcon,
      accentClass: 'hover:bg-[#6364FF] hover:text-white hover:border-[#6364FF]',
    },
    {
      href: 'https://pwasiak30.github.io/pwasiak-linktree/',
      labelKey: 'allLinks',
      icon: AllLinksIcon,
      accentClass: 'hover:bg-sage hover:text-sage-tint hover:border-sage',
    },
  ]

  return (
    <aside
      className="no-print fixed right-1 sm:right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1 sm:gap-1.5 rounded-full border border-line bg-paper-raised/95 backdrop-blur px-1 py-2.5 sm:px-1.5 sm:py-3 shadow-lg"
      aria-label={t.widget.ariaLabel}
    >
      {links.map((link) => {
        const Icon = link.icon
        const label = link.labelKey ? t.widget[link.labelKey] : link.label!
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            aria-label={label}
            className={`group relative flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-transparent text-ink-soft transition ${link.accentClass}`}
          >
            <Icon className="w-[15px] h-[15px] sm:w-[18px] sm:h-[18px]" />
            <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[11px] font-medium text-paper opacity-0 shadow-md transition group-hover:opacity-100 hidden sm:block">
              {label}
            </span>
          </a>
        )
      })}
    </aside>
  )
}
