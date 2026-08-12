// Minimal stroke-based icon set matching the app's existing nav icon style
// (viewBox 0 0 24 24, no fill, currentColor stroke) — keeps the floating
// widget visually consistent with Layout.tsx instead of pulling in an
// external icon library.

type IconProps = { className?: string }

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
}

export function CoffeeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M7 4c-.6.8-.6 1.5 0 2.3M11 4c-.6.8-.6 1.5 0 2.3" />
    </svg>
  )
}

export function XIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  )
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10v6.5M7.5 7.5v.01" />
      <path d="M11.5 16.5V13a2 2 0 0 1 4 0v3.5M11.5 10v6.5" />
    </svg>
  )
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7v.01" />
    </svg>
  )
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M15 4h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2-.2 4-1 4-4.5a3.5 3.5 0 0 0-1-2.5 3.2 3.2 0 0 0-.1-2.5s-.9-.3-3 1a10.4 10.4 0 0 0-5.4 0c-2.1-1.3-3-1-3-1a3.2 3.2 0 0 0-.1 2.5 3.5 3.5 0 0 0-1 2.5c0 3.5 2 4.3 4 4.5-.4.4-.5.9-.5 1.5V20" />
    </svg>
  )
}

export function MastodonIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="16" height="12" rx="4" />
      <path d="M9 20l2.5-4M15 20l-2.5-4" />
      <path d="M9 10V8M12 10V8M15 10V8" />
    </svg>
  )
}

export function AllLinksIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 8l1.5-1.5a3 3 0 0 1 4.24 4.24L14 12" />
      <path d="M14 16l-1.5 1.5a3 3 0 0 1-4.24-4.24L10 12" />
      <path d="M9.5 14.5l5-5" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  )
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  )
}
