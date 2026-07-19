import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Target, Wallet } from "lucide-react";
import { DashboardStats, CATEGORY_COLORS } from "../../types";
import { Link } from "react-router-dom";

function StatCard({
  label,
  value,
  sub,
  icon,
  color = "brand",
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600",
    green: "bg-accent-500/10 text-accent-600",
    red: "bg-red-50 text-red-500",
    amber: "bg-amber-50 text-amber-600",
  };
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>{icon}</div>
      </div>
      <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.get("/stats/dashboard").then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-5 h-28 skeleton" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-5 h-64 skeleton" />
          <div className="card p-5 h-64 skeleton" />
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: user?.currency || "BDT",
      maximumFractionDigits: 0,
    }).format(n);

  const pieData = Object.entries(
    stats.recentExpenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900">
          Good {new Date().getHours() < 12 ? "morning" : "evening"}, {user?.name.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here's your financial overview for {stats.currentMonth}</p>
      </div>

      {/* Budget alerts */}
      {stats.budgetAlerts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Budget alerts</p>
            <p className="text-xs text-amber-700 mt-0.5">
              {stats.budgetAlerts.map((b) => b.category).join(", ")} {stats.budgetAlerts.length === 1 ? "is" : "are"} over 80% spent.{" "}
              <Link to="/dashboard/budgets" className="underline font-medium">View budgets</Link>
            </p>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Monthly income"
          value={fmt(stats.income)}
          icon={<Wallet size={18} />}
          color="brand"
        />
        <StatCard
          label="Spent this month"
          value={fmt(stats.currentTotal)}
          sub={`${Math.abs(stats.change).toFixed(1)}% ${stats.change >= 0 ? "more" : "less"} vs last month`}
          icon={stats.change >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
          color={stats.change >= 0 ? "red" : "green"}
        />
        <StatCard
          label="Savings this month"
          value={fmt(stats.savings)}
          icon={<Target size={18} />}
          color={stats.savings >= 0 ? "green" : "red"}
        />
        <StatCard
          label="Active goals"
          value={String(stats.goals.length)}
          sub={`${stats.goals.filter((g) => g.progress === 100).length} completed`}
          icon={<Target size={18} />}
          color="amber"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend */}
        <div className="card p-5">
          <h2 className="font-display font-semibold text-gray-900 mb-4">6-month spending trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stats.monthlyTrend}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Area
                type="monotone"
                dataKey="spent"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#grad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        <div className="card p-5">
          <h2 className="font-display font-semibold text-gray-900 mb-4">Spending by category</h2>
          {pieData.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-12">No expenses yet this month</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" nameKey="name">
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#6b7280"} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Tooltip formatter={(v: number) => fmt(v)} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent expenses */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-gray-900">Recent expenses</h2>
          <Link to="/dashboard/expenses" className="text-sm text-brand-600 font-medium hover:underline">
            View all
          </Link>
        </div>
        {stats.recentExpenses.length === 0 ? (
          <p className="text-sm text-gray-400 py-8 text-center">No expenses yet. <Link to="/dashboard/expenses/add" className="text-brand-600 underline">Add your first one</Link></p>
        ) : (
          <div className="divide-y divide-gray-50">
            {stats.recentExpenses.map((e) => (
              <div key={e._id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: CATEGORY_COLORS[e.category] || "#6b7280" }}
                  >
                    {e.category.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{e.title}</p>
                    <p className="text-xs text-gray-400">{e.category} · {new Date(e.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900">{fmt(e.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Goals progress */}
      {stats.goals.length > 0 && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-gray-900">Savings goals</h2>
            <Link to="/dashboard/goals" className="text-sm text-brand-600 font-medium hover:underline">Manage goals</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.goals.slice(0, 3).map((g) => (
              <div key={g._id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{g.icon}</span>
                  <p className="text-sm font-semibold text-gray-900 truncate">{g.title}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className="bg-accent-500 h-2 rounded-full transition-all"
                    style={{ width: `${g.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{fmt(g.savedAmount)} of {fmt(g.targetAmount)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
