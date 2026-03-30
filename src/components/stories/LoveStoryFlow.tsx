"use client";

import { useState } from "react";
import {
  StepIndicator, CharacterSelector, SectionCard,
  ImpressionChips, ActivityCards, UploadBox, ActionBar,
} from "./StoryShared";
import { LoveStoryData, StoryCharacters, CharacterData } from "@/types/story";
import {
  MOM_IMPRESSIONS, DAD_IMPRESSIONS, SHARED_ACTIVITIES, MONTHS, YEARS,
} from "@/lib/storyData";

const STEPS = ["Characters", "Get to Know You", "Preview"];

const DEFAULT_CHARS: StoryCharacters = {
  child: { callName: "", gender: "Male",   skinTone: 0, hairStyle: 0, glasses: false },
  mom:   { callName: "", realName: "", gender: "Female", skinTone: 0, hairStyle: 0, glasses: false },
  dad:   { callName: "", realName: "", gender: "Male",   skinTone: 0, hairStyle: 0, glasses: false },
};

const DEFAULT_DATA: LoveStoryData = {
  characters: DEFAULT_CHARS,
  city: "", year: "", month: "",
  momImpressions: [], dadImpressions: [],
  sharedActivity: "", dedication: "",
};

interface LoveStoryFlowProps {
  onComplete?: (data: LoveStoryData) => void;
}

export default function LoveStoryFlow({ onComplete }: LoveStoryFlowProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<LoveStoryData>(DEFAULT_DATA);

  function setChars(role: "child" | "mom" | "dad", cd: CharacterData) {
    setData(p => ({ ...p, characters: { ...p.characters, [role]: cd } }));
  }
  function set<K extends keyof LoveStoryData>(k: K, v: LoveStoryData[K]) {
    setData(p => ({ ...p, [k]: v }));
  }

  const cd = data.characters;

  /* ─── Step 0: Characters ─── */
  const Step0 = (
    <>
      <SectionCard icon="👤" iconBg="bg-pink-50" title="Story Requirements" subtitle="Characters needed: 3 — Child, Mom, Dad">
        <CharacterSelector characters={cd} onUpdate={setChars} />
      </SectionCard>
      <ActionBar
        onNext={() => setStep(1)}
      />
    </>
  );

  /* ─── Step 1: Get to Know You ─── */
  const Step1 = (
    <>
      {/* Where & When */}
      <SectionCard icon="📍" iconBg="bg-blue-50" title="Where & When You First Met" subtitle="Tell us about the beginning of the love story">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-extrabold text-gray-600 uppercase tracking-wide mb-1.5">
              City They Met <span className="text-red-400">*</span>
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold bg-gray-50 focus:outline-none focus:border-teal-400 focus:bg-white transition-colors"
              value={data.city}
              onChange={e => set("city", e.target.value)}
              placeholder="e.g. Mumbai, Delhi, Bangalore"
              maxLength={15}
            />
            <p className="text-right text-xs text-gray-300 mt-0.5">{data.city.length}/15</p>
          </div>
          <div>
            <label className="block text-xs font-extrabold text-gray-600 uppercase tracking-wide mb-1.5">
              Year They Met <span className="text-red-400">*</span>
            </label>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold bg-gray-50 focus:outline-none focus:border-teal-400 focus:bg-white transition-colors"
              value={data.year}
              onChange={e => set("year", e.target.value)}
            >
              <option value="">Select year</option>
              {YEARS.map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-extrabold text-gray-600 uppercase tracking-wide mb-1.5">
              Month They Met <span className="text-red-400">*</span>
            </label>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold bg-gray-50 focus:outline-none focus:border-teal-400 focus:bg-white transition-colors"
              value={data.month}
              onChange={e => set("month", e.target.value)}
            >
              <option value="">Select month</option>
              {MONTHS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>
      </SectionCard>

      {/* Mom's Impressions */}
      <SectionCard icon="💙" iconBg="bg-pink-50" title="Mom's First Impressions" subtitle="Dad's first impressions of Mom — Pick any 2">
        <ImpressionChips
          options={MOM_IMPRESSIONS}
          selected={data.momImpressions}
          max={2}
          onChange={v => set("momImpressions", v)}
        />
      </SectionCard>

      {/* Dad's Impressions */}
      <SectionCard icon="🤩" iconBg="bg-blue-50" title="Dad's First Impressions" subtitle="Mom's first impressions of Dad — Pick any 2">
        <ImpressionChips
          options={DAD_IMPRESSIONS}
          selected={data.dadImpressions}
          max={2}
          onChange={v => set("dadImpressions", v)}
        />
      </SectionCard>

      {/* Shared Activity */}
      <SectionCard icon="❤️" iconBg="bg-red-50" title="Things We Found Love In" subtitle="What was one thing you liked doing together? Select one">
        <ActivityCards
          options={SHARED_ACTIVITIES}
          selected={data.sharedActivity}
          onChange={v => set("sharedActivity", v)}
        />
      </SectionCard>

      {/* Photos & Dedication */}
      <SectionCard icon="✨" iconBg="bg-indigo-50" title="Make Your Love Story Magical" subtitle="Upload photos — Optional but highly recommended">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <UploadBox
            title="First photo of you both together"
            subtitle="1:1 ratio (square) · max 5MB"
            icon="🖼️"
            onChange={f => set("photo1", f)}
          />
          <UploadBox
            title="Family pic of you with your Kid"
            subtitle="1:1 ratio (square) · max 5MB"
            icon="👨‍👩‍👧"
            onChange={f => set("photo2", f)}
          />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-gray-600 uppercase tracking-wide mb-1.5">
            💝 Dedication Message
          </label>
          <textarea
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold bg-gray-50 focus:outline-none focus:border-teal-400 focus:bg-white transition-colors resize-none"
            value={data.dedication}
            onChange={e => set("dedication", e.target.value)}
            placeholder="Write a special message for your child..."
          />
        </div>
      </SectionCard>

      <ActionBar onPrev={() => setStep(0)} onNext={() => setStep(2)} />
    </>
  );

  /* ─── Step 2: Preview ─── */
  const Step2 = (
    <>
      <SectionCard icon="👁️" iconBg="bg-green-50" title="Story Preview" subtitle="Review all details before creating the book">
        <div className="border border-gray-100 rounded-2xl overflow-hidden max-w-xl mx-auto">
          {/* Cover */}
          <div className="bg-gradient-to-br from-pink-100 to-indigo-100 p-10 text-center">
            <span className="text-7xl block mb-4">💕</span>
            <h2 className="text-2xl font-black text-gray-800 mb-2">When Love Found Us</h2>
            <p className="text-sm text-gray-500">
              A story for{" "}
              <strong>{cd.child.callName || "your child"}</strong>{" "}
              about how{" "}
              <strong>{cd.mom.callName || "mummy"}</strong> and{" "}
              <strong>{cd.dad.callName || "papa"}</strong> found each other
            </p>
          </div>

          {/* Details Grid */}
          <div className="p-6 grid grid-cols-2 gap-4">
            {[
              { label: "📍 City They Met", value: data.city || "—" },
              { label: "📅 When They Met", value: [data.month, data.year].filter(Boolean).join(" ") || "—" },
              { label: "💙 Mom's Impressions", value: data.momImpressions.join(", ") || "—" },
              { label: "🤩 Dad's Impressions", value: data.dadImpressions.join(", ") || "—" },
              { label: "❤️ Found Love In", value: data.sharedActivity || "—" },
              { label: "💝 Dedication", value: data.dedication ? "Added ✓" : "—" },
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
