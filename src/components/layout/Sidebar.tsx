"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, BookOpen, PlusCircle,
  Smile, BarChart2, Settings,
} from "lucide-react";
import clsx from "clsx";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "User Registrations", icon: Users },
  { href: "/books", label: "Book Management", icon: BookOpen },
  { href: "/books/create", label: "Create Book", icon: PlusCircle },
  { href: "/avatars", label: "Avatars & Themes", icon: Smile },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="w-56 min-w-[224px] bg-white border-r border-gray-100 flex flex-col h-screen">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-green-800 flex items-center justify-center">
            <span className="text-white text-xs font-bold">WT</span>
          </div>
          <span className="text-sm font-semibold text-gray-800">The Woven Tales</span>
        </div>
        <span className="text-xs text-gray-400 ml-9">Admin · India</span>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = path === href || (href !== "/dashboard" && path.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                active
                  ? "bg-green-50 text-green-800 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              )}
            >
              <Icon size={15} className={active ? "text-green-700" : "text-gray-400"} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-semibold">
            AD
          </div>
          <div>
            <p className="text-xs font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-400">admin@woventry.in</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
