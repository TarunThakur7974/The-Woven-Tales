"use client";

import { CharacterData, StoryCharacters } from "@/types/story";
import CharacterModal from "./CharacterModal";
import { useState } from "react";
import { Edit2, CheckCircle2 } from "lucide-react";
import { SKIN_TONES } from "@/lib/storyData";

// ─── Step Indicator ───────────────────────────────────────────────────────────

interface StepIndicatorProps {
  steps: string[];
  current: number; // 0-indexed
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="flex items-center bg-white border border-gray-100 rounded-xl px-5 py-3 mb-6 shadow-sm">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                i < current
                  ? "bg-green-500 text-white"
                  : i === current
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </span>
            <span
              className={`text-sm font-bold ${
                i === current ? "text-gray-800" : i < current ? "text-green-600" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span className="text-gray-200 text-lg mx-3 flex-1">›</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Character Selector (used by both flows) ──────────────────────────────────

type CharRole = "child" | "mom" | "dad";

interface CharSelectorProps {
  characters: StoryCharacters;
  onUpdate: (role: CharRole, data: CharacterData) => void;
}

const CHAR_META: Record<CharRole, { label: string; emoji: string; bg: string }> = {
  child: { label: "Child",  emoji: "🧒", bg: "bg-yellow-50"  },
  mom:   { label: "Mom",    emoji: "👩", bg: "bg-pink-50"    },
  dad:   { label: "Dad",    emoji: "👨", bg: "bg-blue-50"    },
};

const DEFAULT_CHAR: CharacterData = {
  callName: "", realName: "", gender: "Male",
  skinTone: 0, hairStyle: 0, glasses: false,
};

export function CharacterSelector({ characters, onUpdate }: CharSelectorProps) {
  const [modalRole, setModalRole] = useState<CharRole | null>(null);
  const roles: CharRole[] = ["child", "mom", "dad"];
  const configured = (r: CharRole) => !!characters[r].callName;

  return (
    <>
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-700 font-semibold mb-4 flex items-center gap-2">
        ℹ️ Click each character card to customise their details and appearance
      </div>

      {/* Character Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {roles.map(role => {
          const meta = CHAR_META[role];
          const cd = characters[role];
          const done = configured(role);
          return (
            <button
              key={role}
              onClick={() => setModalRole(role)}
              className={`relative border-2 rounded-xl p-4 text-center transition-all hover:shadow-md ${
                done
                  ? "border-green-400 bg-green-50"
                  : "border-gray-100 bg-gray-50 hover:border-gray-300"
              }`}
            >
              {done && (
                <CheckCircle2
                  size={16}
                  className="absolute top-2 right-2 text-green-500"
                  fill="currentColor"
                />
              )}
              {/* Skin tone preview dot */}
              <div className={`w-14 h-14 rounded-xl ${meta.bg} flex items-center justify-center text-3xl mx-auto mb-2`}>
                {meta.emoji}
              </div>
              <p className="text-sm font-extrabold text-gray-800">{meta.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {done ? cd.callName : "Click to customise"}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Characters Summary */}
      {roles.some(r => configured(r)) && (
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">Selected Characters</p>
          <div className="flex gap-3 flex-wrap">
            {roles.filter(r => configured(r)).map(role => {
              const cd = characters[role];
              const meta = CHAR_META[role];
              const skinColor = SKIN_TONES[cd.skinTone]?.color ?? "#F5CBA7";
              return (
                <div
                  key={role}
                  className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-2.5 bg-gray-50"
                >
                  <div className="relative">
                    <span className="text-2xl">{meta.emoji}</span>
                    <span
                      className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white"
                      style={{ background: skinColor }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-gray-800">{cd.callName}</p>
                    <p className="text-xs text-gray-400">
                      {meta.label} · Gender: {cd.gender}
                    </p>
                  </div>
                  <button
                    onClick={() => setModalRole(role)}
                    className="text-teal-500 hover:text-teal-700 transition-colors"
                  >
                    <Edit2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal */}
      {modalRole && (
        <CharacterModal
          open={!!modalRole}
          role={modalRole}
          initial={characters[modalRole] ?? DEFAULT_CHAR}
          onSave={data => { onUpdate(modalRole, data); setModalRole(null); }}
          onClose={() => setModalRole(null)}
        />
      )}
    </>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

interface SectionCardProps {
  icon: string;
  iconBg: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
}

export function SectionCard({ icon, iconBg, title, subtitle, badge, children }: SectionCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-5">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${iconBg}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-extrabold text-gray-800">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
        {badge && (
          <span className="text-xs font-bold text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
            {badge}
          </span>
        )}
      </div>
      <div className="px-5 py-5">{children}</div>
    </div>
  );
}

// ─── Impression Chips ─────────────────────────────────────────────────────────

interface ImpressionChipsProps {
  options: readonly { label: string; emoji: string }[];
  selected: string[];
  max?: number;
  onChange: (val: string[]) => void;
}

export function ImpressionChips({ options, selected, max = 2, onChange }: ImpressionChipsProps) {
  function toggle(label: string) {
    if (selected.includes(label)) {
      onChange(selected.filter(s => s !== label));
    } else if (selected.length < max) {
      onChange([...selected, label]);
    }
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button
            key={o.label}
            onClick={() => toggle(o.label)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-sm font-bold transition-all ${
              selected.includes(o.label)
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
            }`}
          >
            <span>{o.emoji}</span>
            {o.label}
          </button>
        ))}
      </div>
      <p className={`text-xs font-bold mt-2 ${selected.length === max ? "text-green-600" : "text-red-400"}`}>
        {selected.length}/{max} selected
        {selected.length < max ? ` — Please select exactly ${max} impressions` : " ✓"}
      </p>
    </div>
  );
}

// ─── Activity Cards ───────────────────────────────────────────────────────────

interface ActivityCardsProps {
  options: readonly { label: string; icon: string }[];
  selected: string;
  onChange: (val: string) => void;
  multi?: boolean;
  selectedMulti?: string[];
  onChangeMulti?: (val: string[]) => void;
}

export function ActivityCards({
  options, selected, onChange,
  multi, selectedMulti = [], onChangeMulti,
}: ActivityCardsProps) {
  function toggle(label: string) {
    if (!multi) { onChange(label); return; }
    if (selectedMulti.includes(label)) {
      onChangeMulti?.(selectedMulti.filter(s => s !== label));
    } else {
      onChangeMulti?.([...selectedMulti, label]);
    }
  }
  function isSelected(label: string) {
    return multi ? selectedMulti.includes(label) : selected === label;
  }
  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map(o => (
        <button
          key={o.label}
          onClick={() => toggle(o.label)}
          className={`border-2 rounded-xl py-4 flex flex-col items-center gap-2 transition-all ${
            isSelected(o.label)
              ? "border-green-400 bg-green-50"
              : "border-gray-100 bg-gray-50 hover:border-gray-300"
          }`}
        >
          <span className="text-2xl">{o.icon}</span>
          <span className="text-xs font-bold text-gray-700 text-center leading-tight px-1">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Photo Upload Box ─────────────────────────────────────────────────────────

interface UploadBoxProps {
  title: string;
  subtitle: string;
  icon: string;
  onChange?: (file: File) => void;
}

export function UploadBox({ title, subtitle, icon, onChange }: UploadBoxProps) {
  const [preview, setPreview] = useState<string | null>(null);
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file);
  }
  return (
    <label className="block border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-teal-300 transition-colors bg-gray-50 hover:bg-white">
      <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {preview ? (
        <img src={preview} alt="preview" className="w-full h-32 object-cover rounded-lg mb-2" />
      ) : (
        <span className="text-3xl block mb-2">{icon}</span>
      )}
      <p className="text-sm font-extrabold text-gray-700">{title}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      <span className="mt-3 inline-block border border-gray-200 rounded-lg px-3 py-1 text-xs font-bold text-gray-500 hover:border-gray-400 transition-colors">
        + Select Photo
      </span>
    </label>
  );
}

// ─── Bottom Action Bar ────────────────────────────────────────────────────────

interface ActionBarProps {
  onPrev?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextVariant?: "primary" | "success";
}

export function ActionBar({ onPrev, onNext, nextLabel = "Continue →", nextVariant = "primary" }: ActionBarProps) {
  return (
    <div className="flex gap-3 mt-6">
      {onPrev && (
        <button
          onClick={onPrev}
          className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-extrabold hover:border-gray-400 transition-colors"
        >
          ← Previous
        </button>
      )}
      <button
        onClick={onNext}
        className={`px-7 py-2.5 rounded-xl text-sm font-extrabold text-white transition-all hover:scale-105 active:scale-95 ${
          nextVariant === "success"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
      >
        {nextLabel}
      </button>
    </div>
  );
}
