"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CharacterData, Gender } from "@/types/story";
import { SKIN_TONES, HAIR_STYLES } from "@/lib/storyData";

type CharRole = "child" | "mom" | "dad";

interface CharacterModalProps {
  open: boolean;
  role: CharRole;
  initial: CharacterData;
  onSave: (data: CharacterData) => void;
  onClose: () => void;
}

const ROLE_META: Record<CharRole, { title: string; sub: string; callLabel: string; callPlaceholder: string; showRealName: boolean }> = {
  child: {
    title: "Let's Bring Your Little One's Character to Life!",
    sub: "Customise the child character",
    callLabel: "What is their name? You can also use a pet name here.",
    callPlaceholder: "e.g. Dev, Arjun, Meera...",
    showRealName: false,
  },
  mom: {
    title: "Let's Bring the Parent's Character to Life!",
    sub: "Customise the Mom character",
    callLabel: "What does your child call you?",
    callPlaceholder: "e.g. Mummy, Amma, Mama...",
    showRealName: true,
  },
  dad: {
    title: "Let's Bring the Parent's Character to Life!",
    sub: "Customise the Dad character",
    callLabel: "What does your child call you?",
    callPlaceholder: "e.g. Papa, Daddy, Dada...",
    showRealName: true,
  },
};

const ROLE_EMOJI: Record<CharRole, string> = { child: "🧒", mom: "👩", dad: "👨" };

export default function CharacterModal({ open, role, initial, onSave, onClose }: CharacterModalProps) {
  const [data, setData] = useState<CharacterData>(initial);
  const meta = ROLE_META[role];

  useEffect(() => { setData(initial); }, [initial, open]);

  if (!open) return null;

  function set<K extends keyof CharacterData>(k: K, v: CharacterData[K]) {
    setData(p => ({ ...p, [k]: v }));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{ROLE_EMOJI[role]}</span>
              <h2 className="text-base font-extrabold text-gray-800">{meta.title}</h2>
            </div>
            <p className="text-xs text-gray-400 ml-8">{meta.sub}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Call Name */}
          <div>
            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-1.5">
              {meta.callLabel} <span className="text-red-400">*</span>
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 bg-gray-50 focus:outline-none focus:border-teal-400 focus:bg-white transition-colors"
              value={data.callName}
              onChange={e => set("callName", e.target.value)}
              placeholder={meta.callPlaceholder}
              maxLength={20}
            />
            <p className="text-right text-xs text-gray-300 mt-1">{data.callName.length}/20 characters</p>
          </div>

          {/* Real Name (parents only) */}
          {meta.showRealName && (
            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-1.5">
                What is your name?{" "}
                <span className="text-gray-400 normal-case font-semibold">(appears on cover page — leave blank to use call name)</span>
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 bg-gray-50 focus:outline-none focus:border-teal-400 focus:bg-white transition-colors"
                value={data.realName ?? ""}
                onChange={e => set("realName", e.target.value)}
                placeholder="Enter your name (optional)"
                maxLength={30}
              />
              <p className="text-right text-xs text-gray-300 mt-1">{(data.realName ?? "").length}/30 characters</p>
            </div>
          )}

          {/* Gender */}
          <div>
            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-2">Gender</label>
            <div className="flex gap-2">
              {(["Male", "Female"] as Gender[]).map(g => (
                <button
                  key={g}
                  onClick={() => set("gender", g)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                    data.gender === g
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {g === "Male" ? "👦 Male" : "👧 Female"}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Tone */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-gray-800 text-white text-xs font-black flex items-center justify-center">1</span>
              <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">Choose Your Skin Tone</label>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {SKIN_TONES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => set("skinTone", i)}
                  className={`border-2 rounded-xl py-3 px-2 flex flex-col items-center gap-2 transition-all ${
                    data.skinTone === i
                      ? "border-teal-400 bg-teal-50"
                      : "border-gray-100 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-full border-2 border-black/10"
                    style={{ background: s.color }}
                  />
                  <span className="text-xs font-bold text-gray-500 text-center leading-tight">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hair Style */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-gray-800 text-white text-xs font-black flex items-center justify-center">2</span>
              <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">Choose Hair Style</label>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {HAIR_STYLES.map((h, i) => (
                <button
                  key={i}
                  onClick={() => set("hairStyle", i)}
                  className={`border-2 rounded-xl py-3 flex flex-col items-center gap-2 transition-all ${
                    data.hairStyle === i
                      ? "border-green-400 bg-green-50"
                      : "border-gray-100 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{h.icon}</span>
                  <span className="text-xs font-bold text-gray-500">{h.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Glasses */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-gray-800 text-white text-xs font-black flex items-center justify-center">3</span>
              <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">Glasses</label>
            </div>
            <div className="flex gap-2">
              {[false, true].map(g => (
                <button
                  key={String(g)}
                  onClick={() => set("glasses", g)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                    data.glasses === g
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {g ? "👓 Glasses" : "🙅 No Glasses"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
          <button
            onClick={() => { if (data.callName.trim()) onSave(data); }}
            disabled={!data.callName.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-extrabold transition-colors"
          >
            ✓ Save Character
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-bold hover:border-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
