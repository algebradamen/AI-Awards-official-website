export interface YearEntry {
  year: number;
  label: string;
  description: string;
  /**
   * 'awards' — renders the awards landing (needs entry in awardsByYear in [year]/page.tsx)
   * 'videos' — renders the video gallery (needs entry in videosByYear in [year]/page.tsx)
   *
   * To add a new year:
   *  1. Create a folder: data/years/<YEAR>/
   *  2. Add data files in that folder (videos.ts, content.ts, etc.)
   *  3. Add an entry to YEARS below.
   *  4. Import the data in app/years/[year]/page.tsx and add it to the matching lookup map.
   */
  type: 'awards' | 'videos';
  /** Relative path (from cwd) to this year's teams_summary dir. Used by /teams and /projects. */
  teamsDir?: string;
}

/** Newest year first. */
export const YEARS: YearEntry[] = [
  {
    year: 2026,
    label: '2026',
    description: 'AI-Awards 2026 — Environment & Sustainability',
    type: 'awards',
    teamsDir: 'data/years/2026/teams_summary',
  },
  {
    year: 2025,
    label: '2025',
    description: 'Tangen IM AI Project 2025 — Video Gallery',
    type: 'videos',
  },
];

/** Helper: get the latest year that has teams data. */
export function getLatestYearWithTeams(): YearEntry | undefined {
  return YEARS.find((y) => y.teamsDir);
}
