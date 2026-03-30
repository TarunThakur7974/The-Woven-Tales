"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import LoveStoryFlow from "@/components/stories/LoveStoryFlow";
import DiwaliStoryFlow from "@/components/stories/DiwaliStoryFlow";
import { StoryType, LoveStoryData, DiwaliStoryData, CreatedStoryBook } from "@/types/story";

// ─── Story type selector card ─────────────────────────────────────────────────

interface StoryCardProps {
  id: StoryType;
  emoji: string;
  title: string;
  description: string;
  gradient: string;
  selected: boolean;
  onClick: () => void;
}

function StoryCard({ id, emoji, title, description, gradient, selected, onClick }: StoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative text-left border-2 rounded-2xl p-5 transition-all hover:shadow-lg overflow-hidden group ${
        selected
          ? "border-green-400 shadow-md"
          : "border-gray-100 hover:border-gray-300"
      }`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${gradient}`} />

      {selected && (
        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full">
          ✓ Selected
        </span>
      )}

      <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center text-3xl mb-3 mt-1`}>
        {emoji}
      </div>
      <h3 className="text-sm font-extrabold text-gray-800 mb-1">{title}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const STORY_TYPES: {
  id: StoryType;
  emoji: string;
  title: string;
  description: string;
  gradient: string;
}[] = [
  {
    id: "love",
    emoji: "💕",
    title: "When Love Found Us",
    description: "A personalised parents' love story for your child to cherish forever",
    gradient: "bg-gradient-to-br from-pink-400 to-purple-400",
  },
  {
    id: "diwali",
    emoji: "🪔",
    title: "My Diwali!",
    description: "Celebrate the festival of lights from your child's point of view",
    gradient: "bg-gradient-to-br from-yellow-400 to-orange-400",
  },
];

export default function CreateStoryPage() {
  const [selectedType, setSelectedType] = useState<StoryType>("love");
  const [completedBooks, setCompletedBooks] = useState<CreatedStoryBook[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleLoveComplete(data: LoveStoryData) {
    const book: CreatedStoryBook = {
      id: Date.now().toString(),
      type: "love",
      createdAt: new Date().toISOString(),
      childName: data.characters.child.callName,
      momName: data.characters.mom.callName,
      dadName: data.characters.dad.callName,
      loveData: data,
    };
    setCompletedBooks(p => [book, ...p]);
    showToast(`📚 "When Love Found Us" created for ${data.characters.child.callName}!`);
  }

  function handleDiwaliComplete(data: DiwaliStoryData) {
    const book: CreatedStoryBook = {
      id: Date.now().toString(),
      type: "diwali",
      createdAt: new Date().toISOString(),
      childName: data.characters.child.callName,
      momName: data.characters.mom.callName,
      dadName: data.characters.dad.callName,
      diwaliData: data,
    };
    setCompletedBooks(p => [book, ...p]);
    showToast(`🪔 "My ${data.festivalName}" created for ${data.characters.child.callName}!`);
  }

  return (
    <div className="space-y-6 max-w-3xl relative">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-5 py-3.5 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-bounce">
          {toast}
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
          <BookOpen size={22} className="text-green-500" />
          Create Personalised Story
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">Select a story type and customise every detail for the family</p>
      </div>

      {/* Story Type Selector */}
      <div className="grid grid-cols-2 gap-4">
        {STORY_TYPES.map(s => (
          <StoryCard
            key={s.id}
            {...s}
            selected={selectedType === s.id}
            onClick={() => setSelectedType(s.id)}
          />
        ))}
      </div>

      {/* Flow */}
      <div className="min-h-[200px]">
        {selectedType === "love" && (
          <LoveStoryFlow onComplete={handleLoveComplete} />
        )}
        {selectedType === "diwali" && (
          <DiwaliStoryFlow onComplete={handleDiwaliComplete} />
        )}
      </div>

      {/* Completed Books */}
      {completedBooks.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-gray-800">Books Created This Session</h3>
            <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
              {completedBooks.length} book{completedBooks.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 p-5">
            {completedBooks.map(b => (
              <div
                key={b.id}
                className="border border-gray-100 rounded-xl overflow-hidden hover:border-green-200 transition-colors"
              >
                <div
                  className={`h-16 flex items-center justify-center text-3xl ${
                    b.type === "love"
                      ? "bg-gradient-to-br from-pink-100 to-purple-100"
                      : "bg-gradient-to-br from-yellow-100 to-orange-100"
                  }`}
                >
                  {b.type === "love" ? "💕" : "🪔"}
                </div>
                <div className="p-3">
                  <p className="text-xs font-extrabold text-gray-800 truncate">
                    {b.type === "love" ? "When Love Found Us" : `Me's ${b.diwaliData?.festivalName ?? "Diwali"}!`}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">For {b.childName}</p>
                  <span className="inline-block mt-1.5 text-xs bg-green-50 text-green-700 border border-green-100 rounded-full px-2 py-0.5 font-bold">
                    {b.type === "love" ? "Love Story" : "Festival"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
