// ─── Story Data Constants ─────────────────────────────────────────────────────
// Add these exports to your existing src/lib/data.ts

export const SKIN_TONES = [
  { label: "Light",        color: "#F5CBA7" },
  { label: "Medium Light", color: "#D4956A" },
  { label: "Medium Dark",  color: "#A0674B" },
  { label: "Dark",         color: "#6B3A2A" },
] as const;

export const HAIR_STYLES = [
  { label: "Short",  icon: "🧒" },
  { label: "Medium", icon: "👦" },
  { label: "Long",   icon: "👧" },
  { label: "Wavy",   icon: "🌀" },
] as const;

export const MOM_IMPRESSIONS = [
  { label: "Cute",         emoji: "😍" },
  { label: "Shy",          emoji: "😳" },
  { label: "Pretty",       emoji: "🌸" },
  { label: "Smart",        emoji: "🧠" },
  { label: "Sweet",        emoji: "🍬" },
  { label: "Considerate",  emoji: "🌟" },
  { label: "Gentle",       emoji: "🕊️" },
  { label: "Funny",        emoji: "😂" },
  { label: "Joyful",       emoji: "😄" },
  { label: "Helpful",      emoji: "🤲" },
  { label: "Kind",         emoji: "💛" },
  { label: "Strong",       emoji: "💪" },
  { label: "Independent",  emoji: "🦋" },
  { label: "Loving",       emoji: "💕" },
] as const;

export const DAD_IMPRESSIONS = [
  { label: "Shy",          emoji: "😳" },
  { label: "Handsome",     emoji: "😎" },
  { label: "Smart",        emoji: "🧠" },
  { label: "Sweet",        emoji: "🍬" },
  { label: "Considerate",  emoji: "🌟" },
  { label: "Gentle",       emoji: "🕊️" },
  { label: "Funny",        emoji: "😂" },
  { label: "Joyful",       emoji: "😄" },
  { label: "Helpful",      emoji: "🤲" },
  { label: "Kind",         emoji: "💛" },
  { label: "Strong",       emoji: "💪" },
  { label: "Independent",  emoji: "🦋" },
  { label: "Loving",       emoji: "💕" },
  { label: "Cute",         emoji: "😍" },
] as const;

export const SHARED_ACTIVITIES = [
  { label: "Cooking together",    icon: "🍳" },
  { label: "Going on adventures", icon: "🏕️" },
  { label: "Chilling on a beach", icon: "🏖️" },
  { label: "Watching movies",     icon: "🎬" },
  { label: "Talking for hours",   icon: "💬" },
  { label: "Listening to music",  icon: "🎵" },
] as const;

export const FESTIVAL_NAMES = ["Diwali", "Deepawali", "Deepavali"] as const;

export const DIWALI_SWEETS = [
  { label: "Ladoo",        icon: "🟡" },
  { label: "Gulab Jamun",  icon: "🧡" },
  { label: "Barfi",        icon: "🍮" },
  { label: "Halwa",        icon: "🥣" },
  { label: "Mathri",       icon: "🫓" },
  { label: "Chakli",       icon: "🥜" },
] as const;

export const DIWALI_LOVES = [
  { label: "Making Rangoli",    icon: "🎨" },
  { label: "Cracking Crackers", icon: "🧨" },
  { label: "Lighting Diyas",    icon: "🪔" },
  { label: "Giving Gifts",      icon: "🎁" },
  { label: "New Clothes",       icon: "👗" },
  { label: "Decorating Home",   icon: "🏮" },
  { label: "Puja",              icon: "🙏" },
  { label: "Family Gatherings", icon: "👨‍👩‍👦" },
  { label: "Sparklers",         icon: "✨" },
] as const;

export const DIWALI_HELPS = [
  { label: "Cleaning House",       icon: "🧹" },
  { label: "Shopping for items",   icon: "🛒" },
  { label: "Untangling lights",    icon: "🎆" },
  { label: "Helping make sweets",  icon: "🍪" },
  { label: "Flower decorations",   icon: "🌺" },
  { label: "Turning on lights",    icon: "💡" },
] as const;

export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
] as const;

export const YEARS: string[] = Array.from({ length: 40 }, (_, i) =>
  String(2024 - i)
);
