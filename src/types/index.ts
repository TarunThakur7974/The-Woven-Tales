export interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  child: string;
  avatar: string;
  status: "Active" | "Inactive" | "Pending";
  joined: string;
  books: number;
}

export interface Book {
  id: number;
  title: string;
  userId: number;
  user: string;
  city: string;
  avatar: string;
  theme: string;
  language: string;
  location: string;
  glasses: string;
  childName: string;
  created: string;
  byAdmin?: boolean;
}

export type NavPage =
  | "dashboard"
  | "users"
  | "books"
  | "create"
  | "avatars"
  | "analytics"
  | "settings";
