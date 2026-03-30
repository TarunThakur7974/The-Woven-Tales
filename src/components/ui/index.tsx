"use client";
import React from "react";
import clsx from "clsx";
import { X } from "lucide-react";
import { useStore } from "@/lib/store";

// ─── Button ───────────────────────────────────────────────────────────────────
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "default" | "danger" | "warning" | "ghost";
  size?: "sm" | "md";
}
export function Button({ variant = "default", size = "md", className, children, ...props }: BtnProps) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all border cursor-pointer disabled:opacity-50",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        variant === "primary" && "bg-green-800 text-white border-green-800 hover:bg-green-900",
        variant === "default" && "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
        variant === "danger" && "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
        variant === "warning" && "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
        variant === "ghost" && "bg-transparent border-transparent text-gray-500 hover:bg-gray-100",
        className
      )}
    >
      {children}
    </button>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={clsx(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
      status === "Active" && "bg-green-50 text-green-800",
      status === "Inactive" && "bg-red-50 text-red-700",
      status === "Pending" && "bg-amber-50 text-amber-700",
    )}>
      {status}
    </span>
  );
}

export function ThemeBadge({ theme }: { theme: string }) {
  const map: Record<string, string> = {
    Adventure: "bg-blue-50 text-blue-700",
    Friendship: "bg-pink-50 text-pink-700",
    Family: "bg-purple-50 text-purple-700",
    Education: "bg-indigo-50 text-indigo-700",
    Nature: "bg-green-50 text-green-700",
    Festival: "bg-orange-50 text-orange-700",
  };
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", map[theme] ?? "bg-gray-100 text-gray-600")}>
      {theme}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
const AVATAR_COLORS = ["#388e3c","#1976d2","#e65100","#7b1fa2","#c62828","#00796b","#5d4037","#0097a7"];
export function UserAvatar({ name, id, size = 28 }: { name: string; id: number; size?: number }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const bg = AVATAR_COLORS[id % AVATAR_COLORS.length];
  return (
    <div style={{ width: size, height: size, background: bg, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 600, color: "#fff", flexShrink: 0 }}>
      {initials}
    </div>
  );
}

// ─── MetricCard ───────────────────────────────────────────────────────────────
export function MetricCard({ label, value, delta, deltaPositive = true }: { label: string; value: string | number; delta?: string; deltaPositive?: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <p className="text-xs text-gray-500 mb-1.5">{label}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {delta && (
        <p className={clsx("text-xs mt-1.5", deltaPositive ? "text-green-600" : "text-red-500")}>{delta}</p>
      )}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-400 transition-colors",
        props.className
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={clsx(
        "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-green-400 transition-colors cursor-pointer",
        props.className
      )}
    />
  );
}

export function FormGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-600">{label}</label>
      {children}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, footer }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={18} /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("bg-white rounded-xl border border-gray-100", className)}>
      {children}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-green-800 text-white text-sm px-4 py-3 rounded-xl shadow-lg animate-fade-in">
      {toast}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-green-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-16 text-center text-gray-400 text-sm">{message}</div>
  );
}
