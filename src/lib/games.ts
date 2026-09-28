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
  {
    slug: "dive",
    name: "Dive",
    tagline: "Cliff diving, judged.",
    blurb:
      "The judges call the trick before you jump. Two and a half front flips, head first, and the water is coming up fast.",
    session: "2 min",
    status: "live",
  },
  {
    slug: "traffic",
    name: "Traffic",
    tagline: "One intersection, one button.",
    blurb:
      "Switch the lights and keep four queues moving. Drivers lose patience, ambulances lose it faster.",
    session: "3 min",
    status: "live",
  },
];

export const liveGames = games.filter((game) => game.status === "live");
