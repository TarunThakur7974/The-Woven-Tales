"use client";
import { useState } from "react";
import { Card, Button } from "@/components/ui";
import { useStore } from "@/lib/store";

const BOYS = [
  { id: "BD1", label: "BD1", desc: "Straight hair · Dark skin", bg: "#e8f5e9", emoji: "👦" },
  { id: "BD2", label: "BD2", desc: "Curly hair · Dark skin",   bg: "#e3f2fd", emoji: "👦" },
  { id: "BL1", label: "BL1", desc: "Straight hair · Light skin", bg: "#fff8e1", emoji: "👦" },
  { id: "BL2", label: "BL2", desc: "Curly hair · Light skin",  bg: "#fce4ec", emoji: "👦" },
  { id: "BM1", label: "BM1", desc: "Short hair · Medium skin", bg: "#f3e5f5", emoji: "👦" },
  { id: "BM2", label: "BM2", desc: "Wavy hair · Medium skin",  bg: "#e0f2f1", emoji: "👦" },
];
const GIRLS = [
  { id: "GD1", label: "GD1", desc: "Straight hair · Dark skin", bg: "#fce4ec", emoji: "👧" },
  { id: "GD2", label: "GD2", desc: "Ponytail · Dark skin",     bg: "#e8f5e9", emoji: "👧" },
  { id: "GL1", label: "GL1", desc: "Straight hair · Light skin", bg: "#fff8e1", emoji: "👧" },
  { id: "GL2", label: "GL2", desc: "Braids · Light skin",      bg: "#e3f2fd", emoji: "👧" },
  { id: "GM1", label: "GM1", desc: "Bun · Medium skin",        bg: "#f3e5f5", emoji: "👧" },
  { id: "GM2", label: "GM2", desc: "Wavy · Medium skin",       bg: "#e0f2f1", emoji: "👧" },
];
const THEMES = [
  { id: "adventure", label: "Adventure", emoji: "🎒", bg: "#e3f2fd", count: 124 },
  { id: "friendship", label: "Friendship", emoji: "🤝", bg: "#fce4ec", count: 87 },
  { id: "family", label: "Family", emoji: "🏠", bg: "#f3e5f5", count: 97 },
  { id: "education", label: "Education", emoji: "📚", bg: "#e8eaf6", count: 63 },
  { id: "nature", label: "Nature", emoji: "🌿", bg: "#e8f5e9", count: 38 },
  { id: "festival", label: "Festival", emoji: "🪔", bg: "#fff8e1", count: 56 },
];

type Tab = "boys" | "girls" | "themes";

export default function AvatarsPage() {
  const [tab, setTab] = useState<Tab>("boys");
  const { showToast } = useStore();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">Avatars & Themes</h2>
        <Button variant="primary" size="sm" onClick={() => showToast("Asset sync triggered successfully")}>
          Sync Assets
        </Button>
      </div>

      <Card>
        <div className="px-5 pt-4 border-b border-gray-100">
          <div className="flex gap-0">
            {(["boys", "girls", "themes"] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm capitalize border-b-2 transition-all -mb-px ${
                  tab === t
                    ? "border-green-600 text-green-800 font-medium"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          {tab === "boys" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {BOYS.map(av => (
                <AvatarCard key={av.id} {...av} onClick={() => showToast(`${av.id} selected`)} />
              ))}
            </div>
          )}
          {tab === "girls" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {GIRLS.map(av => (
                <AvatarCard key={av.id} {...av} onClick={() => showToast(`${av.id} selected`)} />
              ))}
            </div>
          )}
          {tab === "themes" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {THEMES.map(th => (
                <div key={th.id} className="rounded-xl border border-gray-100 p-4 hover:border-green-200 transition-colors cursor-pointer" onClick={() => showToast(`${th.label} theme selected`)}>
                  <div className="w-full h-20 rounded-lg flex items-center justify-center text-4xl mb-3" style={{ background: th.bg }}>
                    {th.emoji}
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{th.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{th.count} books used</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function AvatarCard({ id, label, desc, bg, emoji, onClick }: { id: string; label: string; desc: string; bg: string; emoji: string; onClick: () => void }) {
  return (
    <div
      className="rounded-xl border border-gray-100 p-3 hover:border-green-300 transition-colors cursor-pointer text-center"
      onClick={onClick}
    >
      <div className="w-full h-16 rounded-lg flex items-center justify-center text-3xl mb-2" style={{ background: bg }}>
        {emoji}
      </div>
      <p className="text-xs font-semibold text-gray-800">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5 leading-tight">{desc}</p>
    </div>
  );
}
