import type { User, Book } from "@/types";

const CITIES = [
  "Mumbai","Delhi","Bengaluru","Hyderabad","Chennai",
  "Pune","Kolkata","Ahmedabad","Jaipur","Surat",
];
const STATES = [
  "Maharashtra","Delhi","Karnataka","Telangana","Tamil Nadu",
  "Maharashtra","West Bengal","Gujarat","Rajasthan","Gujarat",
];
const NAMES: [string, string][] = [
  ["Priya","Sharma"],["Rahul","Mehta"],["Ananya","Singh"],["Vikram","Patel"],
  ["Sunita","Reddy"],["Aditya","Kumar"],["Deepika","Nair"],["Rohit","Gupta"],
  ["Kavya","Rao"],["Arjun","Iyer"],["Neha","Joshi"],["Siddharth","Shah"],
  ["Pooja","Verma"],["Kiran","Das"],["Ravi","Krishnamurthy"],["Smita","Bhat"],
  ["Manish","Agarwal"],["Divya","Menon"],["Arnav","Tiwari"],["Lakshmi","Pillai"],
  ["Akash","Nambiar"],["Shruti","Deshpande"],["Varun","Bajaj"],["Preeti","Soni"],
  ["Harish","Choudhary"],
];
const BOOK_TITLES = [
  "Arjun Goes to School","The Magic Mango Tree","Meera and the Rainbow",
  "Diwali at Grandma's","The Little Tiger of Kaziranga","My Best Friend Bholu",
  "Adventures in Mumbai","The Secret River","Festival of Colors",
  "Chai with Elephants","A Day at the Taj","Monsoon Magic",
  "The Dancing Peacock","Stars Over Delhi","Fishermen of Kerala",
  "Riya and the Dragon Kite","The Brave Little Elephant","Sunrise at Varanasi",
  "The Market of Dreams","Colours of Holi",
];
const THEMES = ["Adventure","Friendship","Family","Education","Nature","Festival"];
const AVATARS = ["BD1","BD2","GD1","GD2","BL1","GL1"];
const CHILD_NAMES = ["Arjun","Meera","Riya","Dev","Priya","Rohan","Ishaan","Anaya"];
const STATUSES: Array<"Active" | "Inactive" | "Pending"> = [
  "Active","Active","Active","Active","Inactive","Pending",
];

function randEl<T>(a: T[]): T { return a[Math.floor(Math.random() * a.length)]; }
function randInt(a: number, b: number) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function randDate(): string {
  const d = new Date(2024, randInt(0, 11), randInt(1, 28));
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function generateUsers(): User[] {
  return NAMES.map(([fname, lname], i) => {
    const ci = i % CITIES.length;
    return {
      id: i + 1,
      fname, lname,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}@gmail.com`,
      city: CITIES[ci],
      state: STATES[ci],
      phone: `+91 ${randInt(70000, 99999)} ${randInt(10000, 99999)}`,
      child: CHILD_NAMES[i % CHILD_NAMES.length],
      avatar: AVATARS[i % AVATARS.length],
      status: STATUSES[i % STATUSES.length],
      joined: randDate(),
      books: randInt(1, 14),
    };
  });
}

export function generateBooks(users: User[]): Book[] {
  return Array.from({ length: 30 }, (_, i) => {
    const u = users[i % users.length];
    return {
      id: i + 1,
      title: BOOK_TITLES[i % BOOK_TITLES.length],
      userId: u.id,
      user: `${u.fname} ${u.lname}`,
      city: u.city,
      avatar: u.avatar,
      theme: THEMES[i % THEMES.length],
      language: "English",
      location: u.city,
      glasses: "No Glasses",
      childName: u.child,
      created: randDate(),
      byAdmin: false,
    };
  });
}

export const AVATAR_COLORS = [
  "#388e3c","#1976d2","#e65100","#7b1fa2",
  "#c62828","#00796b","#5d4037","#0097a7",
];

export const INDIA_CITIES = CITIES;
export const INDIA_STATES = STATES;
export const STORY_THEMES = THEMES;
export const INDIA_LANGUAGES = [
  "English","Hindi","Tamil","Telugu","Marathi","Bengali","Gujarati","Kannada","Malayalam",
];
export const INDIA_LOCATIONS = [
  "Mumbai","Delhi","Bengaluru","Hyderabad","Chennai","Jaipur",
  "Goa","Kerala Backwaters","Shimla","Varanasi","Udaipur","Mysore",
];
