"use client";

import { useState } from "react";
import {
  StepIndicator, CharacterSelector, SectionCard,
  ActivityCards, ActionBar,
} from "./StoryShared";
import { DiwaliStoryData, StoryCharacters, CharacterData } from "@/types/story";
import {
  FESTIVAL_NAMES, DIWALI_SWEETS, DIWALI_LOVES, DIWALI_HELPS,
} from "@/lib/storyData";

const STEPS = ["Characters", "Your Diwali", "Preview"];

const DEFAULT_CHARS: StoryCharacters = {
  child: { callName: "", gender: "Male",   skinTone: 0, hairStyle: 0, glasses: false },
  mom:   { callName: "", realName: "", gender: "Female", skinTone: 0, hairStyle: 0, glasses: false },
  dad:   { callName: "", realName: "", gender: "Male",   skinTone: 0, hairStyle: 0, glasses: false },
};

const DEFAULT_DATA: DiwaliStoryData = {
  characters: DEFAULT_CHARS,
  city: "",
  festivalName: "Diwali",
  favouriteSweets: [],
  lovesAboutDiwali: [],
  childHelps: [],
  dedication: "",
};

interface DiwaliStoryFlowProps {
  onComplete?: (data: DiwaliStoryData) => void;
}

export default function DiwaliStoryFlow({ onComplete }: DiwaliStoryFlowProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<DiwaliStoryData>(DEFAULT_DATA);

  function setChars(role: "child" | "mom" | "dad", cd: CharacterData) {
    setData(p => ({ ...p, characters: { ...p.characters, [role]: cd } }));
  }
  function set<K extends keyof DiwaliStoryData>(k: K, v: DiwaliStoryData[K]) {
    setData(p => ({ ...p, [k]: v }));
  }

  const cd = data.characters;

  /* ─── Step 0: Characters ─── */
  const Step0 = (
    <>
      <SectionCard icon="👤" iconBg="bg-orange-50" title="Story Requirements" subtitle="Characters needed: 3 — Child, Mom, Dad">
        <CharacterSelector characters={cd} onUpdate={setChars} />
      </SectionCard>
      <ActionBar onNext={() => setStep(1)} />
    </>
  );

  /* ─── Step 1: Your Diwali ─── */
  const Step1 = (
    <>
      {/* City + Festival Name */}
      <SectionCard icon="🏙️" iconBg="bg-orange-50" title="Where Do You Live?" subtitle="The city where your Diwali story takes place">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-extrabold text-gray-600 uppercase tracking-wide mb-1.5">
              Your City <span className="text-red-400">*</span>
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
              value={data.city}
              onChange={e => set("city", e.target.value)}
              placeholder="e.g. Mumbai, Delhi, Jaipur..."
              maxLength={20}
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-gray-600 uppercase tracking-wide mb-1.5">
              What do you call it?
            </label>
            <div className="flex gap-2 mt-1">
              {FESTIVAL_NAMES.map(name => (
                <button
                  key={name}
                  onClick={() => set("festivalName", name)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                    data.festivalName === name
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Favourite Sweets */}
      <SectionCard icon="🍬" iconBg="bg-pink-50" title="Favourite Diwali Sweets" subtitle="What kind of sweets do you love most? Select all that apply">
        <ActivityCards
          options={DIWALI_SWEETS}
          selected=""
          onChange={() => {}}
          multi
          selectedMulti={data.favouriteSweets}
          onChangeMulti={v => set("favouriteSweets", v)}
        />
      </SectionCard>

      {/* What They Love Most */}
      <SectionCard icon="🌟" iconBg="bg-yellow-50" title="What Do They Love Most About Diwali?" subtitle="Select all that apply">
        <ActivityCards
          options={DIWALI_LOVES}
          selected=""
          onChange={() => {}}
          multi
          selectedMulti={data.lovesAboutDiwali}
          onChangeMulti={v => set("lovesAboutDiwali", v)}
        />
      </SectionCard>

      {/* How the Child Helps */}
      <SectionCard icon="🤝" iconBg="bg-blue-50" title="How Does the Child Help?" subtitle="What does the little one do during Diwali preparations?">
        <ActivityCards
          options={DIWALI_HELPS}
          selected=""
          onChange={() => {}}
          multi
          selectedMulti={data.childHelps}
          onChangeMulti={v => set("childHelps", v)}
        />
      </SectionCard>

      {/* Dedication */}
      <SectionCard icon="💝" iconBg="bg-purple-50" title="Dedication Message" subtitle="Write a special message for the child">
        <textarea
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors resize-none"
          value={data.dedication}
          onChange={e => set("dedication", e.target.value)}
          placeholder="Wishing you a bright and beautiful Diwali, my little star..."
        />
      </SectionCard>

      <ActionBar onPrev={() => setStep(0)} onNext={() => setStep(2)} />
    </>
  );

  /* ─── Step 2: Preview ─── */
  const Step2 = (
    <>
      <SectionCard icon="👁️" iconBg="bg-yellow-50" title="Story Preview" subtitle="Review all details before creating the Diwali book">
        <div className="border border-gray-100 rounded-2xl overflow-hidden max-w-xl mx-auto">
          {/* Cover */}
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-10 text-center">
            <span className="text-7xl block mb-4">🪔</span>
            <h2 className="text-2xl font-black text-gray-800 mb-1">
              {cd.child.callName || "Me"}'s {data.festivalName}!
            </h2>
            <p className="text-sm text-gray-500">
              A personalised {data.festivalName} story for{" "}
              <strong>{cd.child.callName || "your child"}</strong>
            </p>
          </div>

          {/* Details */}
          <div className="p-6 grid grid-cols-2 gap-4">
            {[
              { label: "🏙️ City",           value: data.city || "—" },
              { label: "📖 Festival Name",   value: data.festivalName },
              { label: "🍬 Favourite Sweets",value: data.favouriteSweets.slice(0, 3).join(", ") || "—" },
              { label: "🌟 Loves Most",      value: data.lovesAboutDiwali.slice(0, 3).join(", ") || "—" },
              { label: "🤝 Child Helps With",value: data.childHelps.slice(0, 2).join(", ") || "—" },
              { label: "💝 Dedication",      value: data.dedication ? "Added ✓" : "—" },
            ].map(d => (
              <div key={d.label}>
                <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wide mb-1">{d.label}</p>
                <p className="text-sm font-bold text-gray-800">{d.value}</p>
              </div>
            ))}
          </div>

          {/* Characters */}
          <div className="flex gap-6 justify-center px-6 pb-6 border-t border-gray-100 pt-4">
            {(["child", "mom", "dad"] as const).map(r => (
              <div key={r} className="text-center">
                <span className="text-3xl block mb-1">{r === "child" ? "🧒" : r === "mom" ? "👩" : "👨"}</span>
                <p className="text-xs font-extrabold text-gray-400 uppercase">{r}</p>
                <p className="text-sm font-extrabold text-gray-800">{cd[r].callName || "—"}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <ActionBar
        onPrev={() => setStep(1)}
        onNext={() => onComplete?.(data)}
        nextLabel="✓ Create Book"
        nextVariant="success"
      />
    </>
  );

  const CONTENT = [Step0, Step1, Step2];

  return (
    <div>
      <StepIndicator steps={STEPS} current={step} />
      {CONTENT[step]}
    </div>
  );
}
