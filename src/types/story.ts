// ─── Story Types ─────────────────────────────────────────────────────────────

export type StoryType = "love" | "diwali";

export type Gender = "Male" | "Female";

export interface CharacterData {
  callName: string;       // what the child calls them / child's name
  realName?: string;      // appears on cover (parents only)
  gender: Gender;
  skinTone: number;       // 0-3
  hairStyle: number;      // 0-3
  glasses: boolean;
}

export interface StoryCharacters {
  child: CharacterData;
  mom: CharacterData;
  dad: CharacterData;
}

// ─── Love Story ───────────────────────────────────────────────────────────────

export interface LoveStoryData {
  characters: StoryCharacters;
  city: string;
  year: string;
  month: string;
  momImpressions: string[];   // exactly 2
  dadImpressions: string[];   // exactly 2
  sharedActivity: string;
  photo1?: File | null;
  photo2?: File | null;
  dedication: string;
}

// ─── Diwali Story ─────────────────────────────────────────────────────────────

export interface DiwaliStoryData {
  characters: StoryCharacters;
  city: string;
  festivalName: "Diwali" | "Deepawali" | "Deepavali";
  favouriteSweets: string[];
  lovesAboutDiwali: string[];
  childHelps: string[];
  dedication: string;
}

// ─── Created Book ─────────────────────────────────────────────────────────────

export interface CreatedStoryBook {
  id: string;
  type: StoryType;
  createdAt: string;
  childName: string;
  momName: string;
  dadName: string;
  loveData?: Partial<LoveStoryData>;
  diwaliData?: Partial<DiwaliStoryData>;
}
