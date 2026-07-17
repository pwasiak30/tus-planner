import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  {
    to: '/biblioteka',
    label: 'Biblioteka scenariuszy',
    icon: (
      <path d="M4 4h6v16H4zM14 4h6v16h-6z" />
    ),
  },
  {
    to: '/planer',
    label: 'Planer sesji',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 3v3M16 3v3" />
      </>
    ),
  },
  {
    to: '/tracker',
    label: 'Tracker postępów',
    icon: <path d="M4 19V9M11 19V4M18 19v-6" />,
  },
  {
    to: '/historyjki',
    label: 'Historyjki społeczne',
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M9 12h6M9 15h4" />
      </>
    ),
  },
  {
    to: '/karty',
    label: 'Karty do sesji',
    icon: <path d="M4 4h6v16H4zM14 4h6v16h-6z" />,
  },
  {
    to: '/grupy',
    label: 'Grupy',
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
        <path d="M15 14.5a4.5 4.5 0 0 1 4 4.5v1" />
      </>
    ),
  },
  {
    to: '/analiza',
    label: 'Analiza postępu',
    icon: (
      <>
        <path d="M3 17l5-5 4 4 8-9" />
        <path d="M15 7h5v5" />
      </>
    ),
  },
]

export default function Layout() {
  return (
    <div className="min-h-screen flex bg-paper text-ink">
      <nav className="no-print w-[210px] shrink-0 border-r border-line px-3 py-5 hidden sm:block">
        <div className="flex items-center gap-2 px-2 pb-5">
          <span className="w-[22px] h-[22px] rounded-md bg-sage shrink-0" />
          <span className="font-serif font-semibold">TUS Planner</span>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-lg text-[13px] mb-1 ${
                isActive
                  ? 'bg-sage-tint text-sage-ink font-semibold'
                  : 'text-ink-soft hover:bg-paper-raised'
              }`
            }
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="shrink-0"
              aria-hidden="true"
            >
              {item.icon}
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <nav className="no-print sm:hidden fixed bottom-0 inset-x-0 border-t border-line bg-paper-raised flex z-10">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-2 text-[11px] ${
                isActive ? 'text-sage-ink font-semibold' : 'text-ink-soft'
              }`
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {item.icon}
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <main className="flex-1 min-w-0 px-5 py-6 sm:px-8 sm:py-8 pb-20 sm:pb-8">
        <div className="max-w-[960px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
