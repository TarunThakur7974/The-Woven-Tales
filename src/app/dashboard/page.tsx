"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { MetricCard, Card, ProgressBar, UserAvatar } from "@/components/ui";

const CITY_COLORS = ["#388e3c","#1976d2","#e65100","#7b1fa2","#c62828","#00796b"];
const MONTHLY = [
  { m: "Jul", v: 280 }, { m: "Aug", v: 320 }, { m: "Sep", v: 415 },
  { m: "Oct", v: 380 }, { m: "Nov", v: 520 }, { m: "Dec", v: 490 },
  { m: "Jan", v: 610 }, { m: "Feb", v: 580 }, { m: "Mar", v: 720 },
];
const MAX_V = 720;

export default function DashboardPage() {
  const { users, books } = useStore();

  const activeUsers = users.filter(u => u.status === "Active").length;
  const avgBooks = users.length ? (books.length / users.length).toFixed(1) : "0";

  // City counts
  const cityCounts: Record<string, number> = {};
  users.forEach(u => { cityCounts[u.city] = (cityCounts[u.city] || 0) + 1; });
  const topCities = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxCity = topCities[0]?.[1] ?? 1;

  // Recent activity
  const recentBooks = books.slice(0, 5);
  const recentUsers = users.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Total Users" value={users.length.toLocaleString()} delta="+5 this week" />
        <MetricCard label="Books Created" value={books.length.toLocaleString()} delta="+12 this week" />
        <MetricCard label="Active Users" value={activeUsers.toLocaleString()} delta={`${Math.round((activeUsers / users.length) * 100)}% of total`} />
        <MetricCard label="Avg. Books/User" value={avgBooks} delta="Growing steadily" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Recent Activity</h3>
            <Link href="/books" className="text-xs text-green-700 hover:underline">View all books →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentBooks.map(b => (
              <div key={b.id} className="px-5 py-3 flex items-center gap-3">
                <UserAvatar name={b.user} id={b.userId} size={30} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 truncate">
                    <span className="font-medium">{b.user}</span> created &quot;{b.title}&quot;
                  </p>
                  <p className="text-xs text-gray-400">{b.city} · {b.theme}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{b.created}</span>
              </div>
            ))}
            {recentUsers.map(u => (
              <div key={`u-${u.id}`} className="px-5 py-3 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs">+</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800"><span className="font-medium">{u.fname} {u.lname}</span> registered</p>
                  <p className="text-xs text-gray-400">{u.city} · New user</p>
                </div>
                <span className="text-xs text-gray-400">{u.joined}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Cities */}
        <Card>
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">Top Cities</h3>
          </div>
          <div className="px-5 py-4 space-y-4">
            {topCities.map(([city, count], i) => (
              <div key={city}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-700 font-medium">{city}</span>
                  <span className="text-gray-400">{count}</span>
                </div>
                <ProgressBar value={count} max={maxCity} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Chart */}
      <Card>
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Books Created per Month</h3>
        </div>
        <div className="px-5 py-6">
          <div className="flex items-end gap-3 h-36">
            {MONTHLY.map(({ m, v }, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400">{v}</span>
                <div
                  className="w-full rounded-t transition-all"
                  style={{ height: `${Math.round((v / MAX_V) * 112)}px`, background: `rgba(46,125,50,${0.4 + i * 0.07})` }}
                />
                <span className="text-xs text-gray-400">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
