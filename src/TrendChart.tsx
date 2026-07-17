import { useRef, useState } from 'react'

export interface TrendSeries {
  name: string
  color: string
  values: (number | null)[]
}

interface TrendChartProps {
  labels: string[]
  series: TrendSeries[]
}

const WIDTH = 640
const HEIGHT = 260
const PAD_LEFT = 24
const PAD_RIGHT = 132
const PAD_TOP = 12
const PAD_BOTTOM = 28
const PLOT_W = WIDTH - PAD_LEFT - PAD_RIGHT
const PLOT_H = HEIGHT - PAD_TOP - PAD_BOTTOM

function yFor(level: number) {
  return PAD_TOP + PLOT_H - ((level - 1) / 4) * PLOT_H
}

function xFor(index: number, count: number) {
  if (count <= 1) return PAD_LEFT + PLOT_W / 2
  return PAD_LEFT + (index / (count - 1)) * PLOT_W
}

export default function TrendChart({ labels, series }: TrendChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<number | null>(null)

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH
    let nearest = 0
    let best = Infinity
    for (let i = 0; i < labels.length; i++) {
      const d = Math.abs(xFor(i, labels.length) - relX)
      if (d < best) {
        best = d
        nearest = i
      }
    }
    setHover(nearest)
  }

  const endLabels = series
    .map((s) => {
      let lastIdx = -1
      for (let i = s.values.length - 1; i >= 0; i--) {
        if (s.values[i] !== null) {
          lastIdx = i
          break
        }
      }
      if (lastIdx === -1) return null
      return {
        name: s.name,
        color: s.color,
        y: yFor(s.values[lastIdx] as number),
        value: s.values[lastIdx] as number,
      }
    })
    .filter((l): l is { name: string; color: string; y: number; value: number } => l !== null)
    .sort((a, b) => a.y - b.y)

  for (let i = 1; i < endLabels.length; i++) {
    if (endLabels[i].y - endLabels[i - 1].y < 15) {
      endLabels[i].y = endLabels[i - 1].y + 15
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2 no-print">
        {series.map((s) => (
          <span key={s.name} className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: s.color }}
            />
            {s.name}
          </span>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label="Wykres trendu poziomu opanowania umiejętności w czasie"
      >
        {[1, 2, 3, 4, 5].map((lvl) => (
          <g key={lvl}>
            <line
              x1={PAD_LEFT}
              x2={PAD_LEFT + PLOT_W}
              y1={yFor(lvl)}
              y2={yFor(lvl)}
              stroke="var(--chart-grid)"
              strokeWidth={1}
            />
            <text
              x={PAD_LEFT - 6}
              y={yFor(lvl) + 3}
              textAnchor="end"
              fontSize="10"
              fill="var(--ink-faint)"
            >
              {lvl}
            </text>
          </g>
        ))}

        {labels.map((label, i) => {
          if (labels.length > 8 && i % Math.ceil(labels.length / 8) !== 0) return null
          return (
            <text
              key={label + i}
              x={xFor(i, labels.length)}
              y={HEIGHT - 8}
              textAnchor="middle"
              fontSize="9"
              fill="var(--ink-faint)"
            >
              {label}
            </text>
          )
        })}

        {series.map((s) => {
          const segments: string[] = []
          let current: string[] = []
          s.values.forEach((v, i) => {
            if (v === null) {
              if (current.length) segments.push(current.join(' '))
              current = []
              return
            }
            current.push(`${i === 0 || current.length === 0 ? 'M' : 'L'} ${xFor(i, labels.length)} ${yFor(v)}`)
          })
          if (current.length) segments.push(current.join(' '))
          return (
            <g key={s.name}>
              {segments.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {s.values.map((v, i) =>
                v === null ? null : (
                  <circle
                    key={i}
                    cx={xFor(i, labels.length)}
                    cy={yFor(v)}
                    r={4}
                    fill={s.color}
                    stroke="var(--paper-raised)"
                    strokeWidth={2}
                  />
                ),
              )}
            </g>
          )
        })}

        {endLabels.map((l) => (
          <g key={l.name}>
            <circle cx={PAD_LEFT + PLOT_W + 8} cy={l.y} r={3} fill={l.color} />
            <text x={PAD_LEFT + PLOT_W + 15} y={l.y + 3} fontSize="10" fill="var(--ink-soft)">
              {l.name} · {l.value}
            </text>
          </g>
        ))}

        {hover !== null && (
          <line
            x1={xFor(hover, labels.length)}
            x2={xFor(hover, labels.length)}
            y1={PAD_TOP}
            y2={PAD_TOP + PLOT_H}
            stroke="var(--chart-axis)"
            strokeWidth={1}
          />
        )}
      </svg>

      {hover !== null && (
        <div
          className="no-print absolute top-2 pointer-events-none bg-paper-raised border border-line-strong rounded-lg px-2.5 py-2 text-xs shadow-sm"
          style={{
            left: `${(xFor(hover, labels.length) / WIDTH) * 100}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="font-semibold mb-1 text-ink">{labels[hover]}</div>
          {series.map((s) => (
            <div key={s.name} className="flex items-center gap-1.5 text-ink-soft">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
              {s.name}: {s.values[hover] ?? '—'}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
