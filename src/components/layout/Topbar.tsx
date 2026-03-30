"use client";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { useStore } from "@/lib/store";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "User Registrations",
  "/books": "Book Management",
  "/books/create": "Create Book",
  "/avatars": "Avatars & Themes",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export function Topbar() {
  const path = usePathname();
  const { users, books } = useStore();
  const title = PAGE_TITLES[path] ?? "Admin Panel";

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-full font-medium">
          <span>🇮🇳</span> India Region
        </div>
        <div className="text-xs text-gray-400">
          {users.length} users · {books.length} books
        </div>
        <button className="relative p-1.5 text-gray-400 hover:text-gray-700 transition-colors">
          <Bell size={16} />
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white text-xs font-semibold">
          AD
        </div>
      </div>
    </header>
  );
}
