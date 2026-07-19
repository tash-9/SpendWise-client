import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { EXPENSE_CATEGORIES, CATEGORY_COLORS } from "../../types";

const CATEGORY_META: Record<string, { emoji: string; desc: string; tips: string[]; avgMonthly: string }> = {
  "Food & Dining": {
    emoji: "🍜",
    desc: "Restaurants, groceries, food delivery, and cafes. Usually the largest variable expense for most people.",
    tips: ["Cook at home 3x a week", "Limit delivery to once a week", "Meal prep on Sundays"],
    avgMonthly: "৳4,000–8,000",
  },
  "Transport": {
    emoji: "🚌",
    desc: "Ride-sharing, fuel, public transit, and vehicle maintenance. Often overlooked until it adds up.",
    tips: ["Use public transit when possible", "Combine errands into one trip", "Walk for under 1km trips"],
    avgMonthly: "৳1,500–4,000",
  },
  "Shopping": {
    emoji: "🛍️",
    desc: "Clothing, electronics, household items, and online purchases. High impulse-buy risk category.",
    tips: ["Wait 48h before any purchase > ৳1000", "Unsubscribe from promo emails", "Use a shopping list strictly"],
    avgMonthly: "৳2,000–10,000",
  },
  "Entertainment": {
    emoji: "🎮",
    desc: "Games, movies, events, outings, and hobbies. Important for wellbeing — just keep it budgeted.",
    tips: ["Set a fixed monthly fun budget", "Look for free local events", "Rotate subscriptions monthly"],
    avgMonthly: "৳500–3,000",
  },
  "Health": {
    emoji: "💊",
    desc: "Doctor visits, medicine, gym memberships, and mental health. An investment, not a cost.",
    tips: ["Use generic medications", "Annual health checkups catch issues early", "Compare gym prices"],
    avgMonthly: "৳500–3,000",
  },
  "Education": {
    emoji: "🎓",
    desc: "Courses, books, tutoring, and certifications. One of the highest-ROI spending categories.",
    tips: ["Audit courses before buying", "Use library resources first", "Look for student discounts"],
    avgMonthly: "৳500–5,000",
  },
  "Bills & Utilities": {
    emoji: "💡",
    desc: "Electricity, internet, water, gas, and phone bills. Mostly fixed — but can be optimized.",
    tips: ["Switch off appliances at night", "Compare ISP prices annually", "Monitor AC usage in summer"],
    avgMonthly: "৳2,000–5,000",
  },
  "Subscriptions": {
    emoji: "📺",
    desc: "Streaming services, SaaS tools, memberships. The easiest category to let silently overgrow.",
    tips: ["Audit all subscriptions quarterly", "Share family plans", "Cancel unused trials immediately"],
    avgMonthly: "৳500–3,000",
  },
  "Travel": {
    emoji: "✈️",
    desc: "Flights, hotels, transport, and travel activities. Plan ahead and save significantly.",
    tips: ["Book 6–8 weeks in advance", "Travel off-peak when possible", "Use reward points for flights"],
    avgMonthly: "Variable",
  },
  "Other": {
    emoji: "📦",
    desc: "Miscellaneous expenses that don't fit other categories. If this is large, consider sub-categorizing.",
    tips: ["Review 'Other' monthly and re-categorize", "Look for patterns in misc spending", "Create custom categories if needed"],
    avgMonthly: "Varies",
  },
};

const SORT_OPTIONS = [
  { value: "name_asc", label: "Name A–Z" },
  { value: "name_desc", label: "Name Z–A" },
  { value: "avg_asc", label: "Lowest avg spend" },
  { value: "avg_desc", label: "Highest avg spend" },
];

// Simple avg ordering for sort purposes
const AVG_ORDER: Record<string, number> = {
  "Food & Dining": 6000, "Transport": 2750, "Shopping": 6000,
  "Entertainment": 1750, "Health": 1750, "Education": 2750,
  "Bills & Utilities": 3500, "Subscriptions": 1750, "Travel": 5000, "Other": 2000,
};

const ITEMS_PER_PAGE = 8;

export default function Explore() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name_asc");
  const [page, setPage] = useState(1);

  let filtered = EXPENSE_CATEGORIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sort === "name_asc") return a.localeCompare(b);
    if (sort === "name_desc") return b.localeCompare(a);
    if (sort === "avg_asc") return AVG_ORDER[a] - AVG_ORDER[b];
    if (sort === "avg_desc") return AVG_ORDER[b] - AVG_ORDER[a];
    return 0;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Explore Spending Categories</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Browse all categories, learn average spending, and get budgeting tips for each.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-3 text-gray-400" />
            <input
              className="input pl-9"
              placeholder="Search categories…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-gray-400 flex-shrink-0" />
            <select
              className="input w-48"
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Cards — 4 per row desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {paginated.map((cat) => {
            const meta = CATEGORY_META[cat];
            const color = CATEGORY_COLORS[cat] || "#6b7280";
            return (
              <div
                key={cat}
                className="card flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all"
                style={{ minHeight: "260px" }}
              >
                {/* Color bar */}
                <div className="h-1.5 rounded-t-2xl" style={{ backgroundColor: color }} />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{meta.emoji}</span>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-gray-900 text-sm leading-tight">{cat}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Avg: {meta.avgMonthly}/mo</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">{meta.desc}</p>
                  <Link
                    to={`/explore/${cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                    className="mt-4 text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    View tips & details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                  page === i + 1 ? "bg-brand-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-4">
          Showing {paginated.length} of {filtered.length} categories
        </p>
      </div>
    </main>
  );
}
