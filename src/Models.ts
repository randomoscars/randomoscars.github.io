export const categories = [
  'Best Actor in a Leading Role',
  'Best Actor in a Supporting Role',
  'Best Supporting Actor',
  'Best Actress in a Leading Role',
  'Best Adapted Screenplay',
  'Best Animated Feature',
  'Best Art Direction',
  'Best Cinematography',
  'Best Costume Design',
  'Best Director',
  'Best Documentary Feature',
  'Best Documentary Short Subject',
  'Best Film Editing',
  'Best Foreign Language Film',
  'Best Makeup',
  'Best Original Score',
  'Best Original Screenplay',
  'Best Original Song',
  'Best Original Story',
  'Best Picture',
  'Best Sound Editing',
  'Best Sound Mixing',
  'Best Visual Effects',
  'Live Action Short Film',
];

export type OscarYear = OscarCategory[];

export type OscarCategory = {
  name: string;
  normalized_name: string;
  candidates: OscarCandidate[];
  year: number;
  category_id: number;
};
export type OscarCandidate = {
  target: string[];
  target_enriched: EnrichedInfo[];
  for: string[];
  for_enriched: EnrichedInfo[];
  won: boolean;
  notes: string;
};
export type EnrichedInfo = {
  name: string;
  imdb_id: string;
  image: ImageInfo;
  note: string;
};
export type ImageInfo = {
  url: string;
  height: string;
  width: string;
};
