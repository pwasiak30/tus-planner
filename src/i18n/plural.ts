import type { LangCode } from './translations'

/**
 * Slavic-style plural selection (used for pl and uk, which share the same
 * one / few / many split): 1 → one, 2-4 (excluding 12-14) → few, else many.
 */
export function slavicPlural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (n === 1) return one
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few
  return many
}

export function englishPlural(n: number, singular: string, plural: string): string {
  return n === 1 ? singular : plural
}

/** Convenience wrapper: pick the right plural helper for the given language. */
export function countLabel(
  lang: LangCode,
  n: number,
  forms: { pl: [string, string, string]; en: [string, string]; uk: [string, string, string] },
): string {
  if (lang === 'en') return `${n} ${englishPlural(n, forms.en[0], forms.en[1])}`
  if (lang === 'uk') return `${n} ${slavicPlural(n, ...forms.uk)}`
  return `${n} ${slavicPlural(n, ...forms.pl)}`
}
