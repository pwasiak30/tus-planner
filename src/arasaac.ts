export interface PictogramResult {
  id: number
  keyword: string
}

const API_BASE = 'https://api.arasaac.org/api/pictograms'
const STATIC_BASE = 'https://static.arasaac.org/pictograms'

export async function searchPictograms(query: string): Promise<PictogramResult[]> {
  const term = query.trim()
  if (!term) return []
  const res = await fetch(`${API_BASE}/pl/search/${encodeURIComponent(term)}`)
  if (!res.ok) throw new Error(`ARASAAC search failed: ${res.status}`)
  const data: Array<{ _id: number; keywords: Array<{ keyword: string }> }> = await res.json()
  return data.slice(0, 8).map((p) => ({
    id: p._id,
    keyword: p.keywords?.[0]?.keyword ?? term,
  }))
}

export function pictogramImageUrl(id: number, resolution: 300 | 500 = 300): string {
  return `${STATIC_BASE}/${id}/${id}_${resolution}.png`
}
