export interface Game {
  slug: string;
  name: string;
  tagline: string;
  /** One line on what the player actually does, shown on the arcade index. */
  blurb: string;
  /** Rough time for a single round. */
  session: string;
  status: "live" | "soon";
}

export const games: Game[] = [
  {
    slug: "tally",
    name: "Tally",
    tagline: "Wordle without the colours.",
    blurb:
      "Guess the five-letter word. You are only told how many letters are right, never which ones.",
    session: "3 min",
    status: "live",
  },
];

export const liveGames = games.filter((game) => game.status === "live");
