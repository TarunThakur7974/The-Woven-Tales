"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button, ThemeBadge, UserAvatar, Card, Input, Select, EmptyState } from "@/components/ui";
import { Search, Plus, Trash2, Eye } from "lucide-react";
import { STORY_THEMES } from "@/lib/data";
import Link from "next/link";

export default function BooksPage() {
  const { books, users, deleteBook } = useStore();
  const [search, setSearch] = useState("");
  const [filterTheme, setFilterTheme] = useState("");
  const [filterUser, setFilterUser] = useState("");

  const filtered = books.filter(b => {
    const q = search.toLowerCase();
    const matchQ = !q || `${b.title} ${b.user} ${b.city}`.toLowerCase().includes(q);
    const matchT = !filterTheme || b.theme === filterTheme;
    const matchU = !filterUser || b.userId === Number(filterUser);
    return matchQ && matchT && matchU;
  });

  const THEME_EMOJI: Record<string, string> = {
    Adventure: "🎒", Friendship: "🤝", Family: "🏠",
    Education: "📚", Nature: "🌿", Festival: "🪔",
  };
  const THEME_BG: Record<string, string> = {
    Adventure: "#e3f2fd", Friendship: "#fce4ec", Family: "#f3e5f5",
    Education: "#e8eaf6", Nature: "#e8f5e9", Festival: "#fff8e1",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-gray-800">All Books</h2>
          <span className="bg-green-50 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">{filtered.length} books</span>
        </div>
        <Link href="/books/create">
          <Button variant="primary" size="sm"><Plus size={13} /> Create Book</Button>
        </Link>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search books..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={filterTheme} onChange={e => setFilterTheme(e.target.value)} className="w-36">
          <option value="">All Themes</option>
          {STORY_THEMES.map(t => <option key={t}>{t}</option>)}
        </Select>
        <Select value={filterUser} onChange={e => setFilterUser(e.target.value)} className="w-44">
          <option value="">All Users</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.fname} {u.lname}</option>)}
        </Select>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Book","User","City","Avatar","Theme","Language","Created","Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr><td colSpan={8}><EmptyState message="No books found" /></td></tr>
              )}
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0" style={{ background: THEME_BG[b.theme] ?? "#f5f5f5" }}>
                        {THEME_EMOJI[b.theme] ?? "📖"}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-xs">{b.title}</p>
                        {b.byAdmin && <span className="text-xs text-green-600 font-medium">Admin created</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <UserAvatar name={b.user} id={b.userId} size={24} />
                      <span className="text-xs text-gray-700">{b.user}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{b.city}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-green-50 text-green-800 px-2 py-0.5 rounded-full font-medium">{b.avatar}</span>
                  </td>
                  <td className="px-4 py-3"><ThemeBadge theme={b.theme} /></td>
                  <td className="px-4 py-3 text-xs text-gray-500">{b.language}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{b.created}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <Button size="sm" variant="ghost" onClick={() => alert(`Previewing: "${b.title}" by ${b.user}`)}>
                        <Eye size={12} />
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => deleteBook(b.id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
