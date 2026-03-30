"use client";
import { useStore } from "@/lib/store";
import { Card, MetricCard, ProgressBar } from "@/components/ui";
import { STORY_THEMES } from "@/lib/data";

const MONTHLY = [
  { m: "Jul'24", v: 280 }, { m: "Aug", v: 320 }, { m: "Sep", v: 415 },
  { m: "Oct", v: 380 }, { m: "Nov", v: 520 }, { m: "Dec", v: 490 },
  { m: "Jan'25", v: 610 }, { m: "Feb", v: 580 }, { m: "Mar", v: 720 },
];
const MAX_V = 720;

export default function AnalyticsPage() {
  const { users, books } = useStore();

  // City distribution
  const cityCounts: Record<string, number> = {};
  users.forEach(u => { cityCounts[u.city] = (cityCounts[u.city] || 0) + 1; });
  const topCities = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const maxCity = topCities[0]?.[1] ?? 1;

  // Theme distribution
  const themeCounts: Record<string, number> = {};
  books.forEach(b => { themeCounts[b.theme] = (themeCounts[b.theme] || 0) + 1; });
  const maxTheme = Math.max(...Object.values(themeCounts), 1);

  // Status distribution
  const statusCounts = { Active: 0, Inactive: 0, Pending: 0 };
  users.forEach(u => { statusCounts[u.status] = (statusCounts[u.status] || 0) + 1; });

  const adminBooks = books.filter(b => b.byAdmin).length;
  const userBooks = books.length - adminBooks;

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Total Revenue (Est.)" value="₹4.2L" delta="+22% MoM" />
        <MetricCard label="Printed Books" value="1,241" delta="+89 this month" />
        <MetricCard label="Digital Books" value={userBooks.toLocaleString()} delta="+12 this week" />
        <MetricCard label="Avg. Order Value" value="₹899" delta="Up from ₹820" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly chart */}
        <Card>
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">Books Created per Month</h3>
          </div>
          <div className="px-5 py-5">
            <div className="flex items-end gap-2 h-40">
              {MONTHLY.map(({ m, v }, i) => (
                <div key={m} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-400" style={{ fontSize: 9 }}>{v}</span>
                  <div
                    className="w-full rounded-t transition-all"
                    style={{ height: `${Math.round((v / MAX_V) * 120)}px`, background: `rgba(46,125,50,${0.35 + i * 0.075})` }}
                  />
                  <span style={{ fontSize: 9 }} className="text-gray-400 text-center leading-tight">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Theme Distribution */}
        <Card>
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">Books by Theme</h3>
          </div>
          <div className="px-5 py-4 space-y-3">
            {STORY_THEMES.map(theme => {
              const count = themeCounts[theme] ?? 0;
              return (
                <div key={theme}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-700 font-medium">{theme}</span>
                    <span className="text-gray-400">{count} books</span>
                  </div>
                  <ProgressBar value={count} max={maxTheme} />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top cities */}
        <Card>
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">Users by City</h3>
          </div>
          <div className="px-5 py-4 space-y-3">
            {topCities.map(([city, count]) => (
              <div key={city}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-700 font-medium">{city}</span>
                  <span className="text-gray-400">{count} users</span>
                </div>
                <ProgressBar value={count} max={maxCity} />
              </div>
            ))}
          </div>
        </Card>

        {/* User Status */}
        <Card>
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">User Status Breakdown</h3>
          </div>
          <div className="px-5 py-5 space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => {
              const pct = users.length ? Math.round((count / users.length) * 100) : 0;
              const colors: Record<string, string> = { Active: "#2e7d32", Inactive: "#c62828", Pending: "#e65100" };
              return (
                <div key={status} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: colors[status] }} />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">{status}</span>
                      <span className="text-gray-400">{count} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: colors[status] }} />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xl font-semibold text-gray-800">{books.length}</p>
                <p className="text-xs text-gray-400">Total Books</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-800">{adminBooks}</p>
                <p className="text-xs text-gray-400">Admin Created</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
