import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'
import { searchPictograms, pictogramImageUrl, type PictogramResult } from '../arasaac'
import type { StoryStep } from '../types'

interface DraftStep {
  text: string
  candidates: PictogramResult[]
  selected: number
}

export default function Stories() {
  const stories = useLiveQuery(() => db.socialStories.toArray(), []) ?? []

  const [title, setTitle] = useState('')
  const [stepsText, setStepsText] = useState('')
  const [draft, setDraft] = useState<DraftStep[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [printing, setPrinting] = useState<number | null>(null)

  async function generate() {
    const lines = stepsText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    if (lines.length === 0) return
    setLoading(true)
    setError(null)
    try {
      const results = await Promise.all(
        lines.map(async (text) => {
          const candidates = await searchPictograms(text)
          return { text, candidates, selected: 0 }
        }),
      )
      setDraft(results)
    } catch {
      setError('Nie udało się połączyć z ARASAAC. Sprawdź internet i spróbuj ponownie.')
    } finally {
      setLoading(false)
    }
  }

  function cycle(index: number, dir: 1 | -1) {
    if (!draft) return
    setDraft(
      draft.map((step, i) => {
        if (i !== index || step.candidates.length === 0) return step
        const next = (step.selected + dir + step.candidates.length) % step.candidates.length
        return { ...step, selected: next }
      }),
    )
  }

  async function saveStory() {
    if (!draft || !title.trim()) return
    const steps: StoryStep[] = draft.map((s) => ({
      text: s.text,
      pictogramId: s.candidates[s.selected]?.id ?? null,
    }))
    await db.socialStories.add({ title: title.trim(), steps })
    setTitle('')
    setStepsText('')
    setDraft(null)
  }

  function printStory(id: number) {
    setPrinting(id)
    setTimeout(() => {
      window.print()
      setPrinting(null)
    }, 50)
  }

  const printedStory = stories.find((s) => s.id === printing)

  return (
    <div>
      <div className="no-print">
        <h1 className="font-serif text-2xl font-semibold m-0">Generator historyjek społecznych</h1>
        <p className="text-sm text-ink-faint mt-1 mb-5">
          Piktogramy ARASAAC — automatyczne dopasowanie do każdego kroku
        </p>

        <div className="border border-line rounded-xl p-4 bg-paper-raised mb-6">
          <label className="text-sm flex flex-col gap-1 mb-3">
            Sytuacja
            <input
              className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper"
              placeholder="np. Jak zachować się w sklepie"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="text-sm flex flex-col gap-1 mb-3">
            Kroki (jedna linia = jeden krok)
            <textarea
              rows={4}
              className="border border-line-strong rounded-lg px-2.5 py-1.5 bg-paper"
              placeholder={'Wchodzę do sklepu i biorę koszyk\nSzukam produktów z listy\nCzekam spokojnie w kolejce do kasy\nPłacę i mówię dziękuję'}
              value={stepsText}
              onChange={(e) => setStepsText(e.target.value)}
            />
          </label>
          <button
            onClick={generate}
            disabled={loading || !stepsText.trim()}
            className="text-[13px] px-3.5 py-2 rounded-lg bg-sage text-white disabled:opacity-50"
          >
            {loading ? 'Szukam piktogramów…' : 'Generuj'}
          </button>
          {error && <p className="text-sm text-clay mt-2 mb-0">{error}</p>}
        </div>

        {draft && (
          <div className="mb-6">
            <div className="grid gap-3 sm:grid-cols-4 mb-3">
              {draft.map((step, i) => (
                <div key={i} className="border border-line rounded-xl p-3 bg-paper-raised text-center">
                  <div className="text-[11px] text-ink-faint mb-1.5">Krok {i + 1}</div>
                  <div className="w-16 h-16 rounded-lg bg-clay-tint mx-auto mb-2 flex items-center justify-center overflow-hidden">
                    {step.candidates.length > 0 ? (
                      <img
                        src={pictogramImageUrl(step.candidates[step.selected].id)}
                        alt={step.candidates[step.selected].keyword}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-clay-ink">brak</span>
                    )}
                  </div>
                  {step.candidates.length > 1 && (
                    <div className="flex justify-center gap-2 mb-1.5">
                      <button
                        onClick={() => cycle(i, -1)}
                        className="text-xs px-1.5 rounded border border-line-strong"
                        aria-label="Poprzedni piktogram"
                      >
                        ‹
                      </button>
                      <span className="text-[11px] text-ink-faint">
                        {step.selected + 1}/{step.candidates.length}
                      </span>
                      <button
                        onClick={() => cycle(i, 1)}
                        className="text-xs px-1.5 rounded border border-line-strong"
                        aria-label="Następny piktogram"
                      >
                        ›
                      </button>
                    </div>
                  )}
                  <p className="text-xs m-0">{step.text}</p>
                </div>
              ))}
            </div>
            <button
              onClick={saveStory}
              disabled={!title.trim()}
              className="text-[13px] px-3.5 py-2 rounded-lg bg-sage text-white disabled:opacity-50"
            >
              Zapisz historyjkę
            </button>
          </div>
        )}

        <h2 className="font-serif text-lg font-semibold mt-8 mb-3">Zapisane historyjki</h2>
        <div className="flex flex-col gap-2">
          {stories.map((s) => (
            <div
              key={s.id}
              className="border border-line rounded-lg px-3.5 py-2.5 text-sm flex items-center justify-between gap-3"
            >
              <span>
                <span className="font-semibold">{s.title}</span>{' '}
                <span className="text-ink-faint text-xs">· {s.steps.length} kroków</span>
              </span>
              <button
                onClick={() => printStory(s.id!)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-line-strong shrink-0"
              >
                Drukuj / PDF
              </button>
            </div>
          ))}
          {stories.length === 0 && (
            <p className="text-sm text-ink-faint">Brak zapisanych historyjek.</p>
          )}
        </div>
      </div>

      {printedStory && (
        <div className="print-area hidden">
          <h1 className="font-serif text-2xl font-semibold mb-6">{printedStory.title}</h1>
          <div className="grid grid-cols-2 gap-6">
            {printedStory.steps.map((step, i) => (
              <div key={i} className="text-center break-inside-avoid">
                <div className="text-xs text-ink-faint mb-1">Krok {i + 1}</div>
                <div className="w-32 h-32 mx-auto mb-2 border border-line-strong rounded-lg flex items-center justify-center overflow-hidden">
                  {step.pictogramId ? (
                    <img
                      src={pictogramImageUrl(step.pictogramId, 500)}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </div>
                <p className="text-sm m-0">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
