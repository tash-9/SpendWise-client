import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, TrendingDown, LogIn } from "lucide-react";
import { EXPENSE_CATEGORIES, CATEGORY_COLORS } from "../../types";

const CATEGORY_META: Record<string, {
  emoji: string;
  desc: string;
  fullDesc: string;
  tips: string[];
  avgMonthly: string;
  subcategories: string[];
  aiInsight: string;
}> = {
  "Food & Dining": {
    emoji: "🍜",
    desc: "Restaurants, groceries, food delivery, and cafes.",
    fullDesc: "Food & Dining is typically the largest variable expense for most people, especially students and young professionals. It covers everything from grocery runs to restaurant meals, food delivery apps like Foodpanda or Pathao Food, tea shops, and bakeries. This category has the highest potential for savings through small habit changes.",
    tips: [
      "Cook at home at least 3 times per week",
      "Meal prep on Sundays to reduce daily decisions",
      "Limit food delivery to once a week maximum",
      "Use grocery lists to prevent impulse buys",
      "Buy seasonal produce which is cheaper and fresher",
      "Compare prices across shops before bulk buying",
    ],
    avgMonthly: "৳4,000–8,000",
    subcategories: ["Groceries", "Restaurants", "Food Delivery", "Cafes & Tea", "Snacks & Street Food"],
    aiInsight: "The SpendWise AI Spending Coach can tell you exactly how your food spending compares to the previous month — and identify which sub-habits (delivery vs. dining vs. groceries) are driving the cost.",
  },
  "Transport": {
    emoji: "🚌",
    desc: "Ride-sharing, fuel, public transit, and vehicle maintenance.",
    fullDesc: "Transport costs can silently compound. Regular Uber or Pathao rides, CNG auto-rickshaws, fuel costs, and even occasional vehicle maintenance can amount to a significant portion of your budget. Many people underestimate this category because individual trips feel small.",
    tips: [
      "Use public buses or trains for regular commutes",
      "Walk or cycle for distances under 2km",
      "Combine multiple errands into one trip",
      "Compare Uber vs Pathao vs CNG rates before booking",
      "Consider a monthly pass if you commute daily",
      "Carpool with colleagues when possible",
    ],
    avgMonthly: "৳1,500–4,000",
    subcategories: ["Ride-sharing", "Public Transit", "Fuel", "Vehicle Maintenance", "Parking"],
    aiInsight: "Transport often spikes unexpectedly during bad weather or late nights. The FinBot Chat can analyze your transport patterns and suggest the most expensive commute routes you're taking.",
  },
  "Shopping": {
    emoji: "🛍️",
    desc: "Clothing, electronics, household items, and online purchases.",
    fullDesc: "Shopping is the category with the highest impulse-buy risk. Flash sales, social media ads, and 'limited time' offers are specifically designed to bypass your rational thinking. Online shopping platforms make it dangerously easy to spend without realizing how much is going out.",
    tips: [
      "Wait 48 hours before any purchase over ৳1,000",
      "Unsubscribe from all promotional emails",
      "Keep a running wishlist — buy from it, not from browsing",
      "Avoid shopping when bored, stressed, or emotional",
      "Compare prices across platforms before buying",
      "Check your budget before checking out",
    ],
    avgMonthly: "৳2,000–10,000",
    subcategories: ["Clothing", "Electronics", "Home & Furniture", "Online Shopping", "Personal Care"],
    aiInsight: "The Purchase Advisor agent is specifically built for this — tell it what you want to buy and it will check your current budget, savings goals, and financial position before giving a clear recommendation.",
  },
  "Entertainment": {
    emoji: "🎮",
    desc: "Games, movies, events, outings, and hobbies.",
    fullDesc: "Entertainment spending is important for mental health and quality of life — the goal isn't to eliminate it, but to be intentional about it. This includes cinema tickets, gaming purchases, events, concerts, and recreational activities.",
    tips: [
      "Set a fixed monthly entertainment budget",
      "Look for free or low-cost local events",
      "Share gaming costs with friends (Game Pass, etc.)",
      "Use student discounts for movies and events",
      "Rotate subscriptions rather than keeping all active",
      "Limit gaming purchases to wishlist sales",
    ],
    avgMonthly: "৳500–3,000",
    subcategories: ["Movies & Cinema", "Gaming", "Events & Concerts", "Hobbies", "Outings"],
    aiInsight: "Entertainment is often where 'small' purchases accumulate invisibly. The Weekly Recap agent will flag entertainment spikes and tell you whether they were one-off events or a growing habit.",
  },
  "Health": {
    emoji: "💊",
    desc: "Doctor visits, medicine, gym memberships, and mental health.",
    fullDesc: "Health spending is an investment with compounding returns. Skimping on healthcare often leads to larger costs later. This category includes doctor and specialist visits, medications, gym or fitness memberships, lab tests, dental care, and mental health support.",
    tips: [
      "Get annual check-ups — early detection saves money",
      "Buy generic medications when branded isn't necessary",
      "Compare gym membership prices before committing",
      "Use outdoor exercise to supplement or replace gym costs",
      "Keep a basic medicine kit to avoid pharmacy runs for minor issues",
      "Budget for dental care — it's often forgotten",
    ],
    avgMonthly: "৳500–3,000",
    subcategories: ["Doctor Visits", "Medicine", "Gym & Fitness", "Dental", "Mental Health"],
    aiInsight: "Health costs can be unpredictable. The Goal Coach can help you build a health emergency fund so unexpected medical bills don't derail your other savings goals.",
  },
  "Education": {
    emoji: "🎓",
    desc: "Courses, books, tutoring, and certifications.",
    fullDesc: "Education is one of the highest-ROI categories you can spend on. Online courses, textbooks, coaching, certifications, and workshops all belong here. The challenge is avoiding impulse-buying courses you never finish.",
    tips: [
      "Audit a course for free before purchasing",
      "Prioritize certificates that directly impact your income",
      "Use library resources and free tiers first",
      "Look for student and institutional discounts",
      "Buy physical textbooks second-hand",
      "Set a completion deadline when buying a course",
    ],
    avgMonthly: "৳500–5,000",
    subcategories: ["Online Courses", "Books & Textbooks", "Tutoring", "Certifications", "School Fees"],
    aiInsight: "SpendWise AI's Goal Coach can align your education spending with a skill-building goal — for example, saving for a full bootcamp or professional certification.",
  },
  "Bills & Utilities": {
    emoji: "💡",
    desc: "Electricity, internet, water, gas, and phone bills.",
    fullDesc: "Utility bills are mostly fixed costs, but with awareness and habit changes they can be meaningfully reduced. Electricity in particular can be optimized through behavioral changes and appliance choices.",
    tips: [
      "Switch off fans, lights, and AC when leaving rooms",
      "Use energy-efficient LED bulbs throughout",
      "Compare ISP deals annually — loyalty rarely pays",
      "Monitor AC usage in summer using smart plugs",
      "Negotiate your phone plan annually",
      "Fix water leaks promptly — they add up fast",
    ],
    avgMonthly: "৳2,000–5,000",
    subcategories: ["Electricity", "Internet", "Water", "Gas", "Phone Plan"],
    aiInsight: "The Spending Coach can track your utility spending month-over-month and flag unusual spikes — like a sudden electricity jump from leaving AC on overnight.",
  },
  "Subscriptions": {
    emoji: "📺",
    desc: "Streaming services, SaaS tools, memberships.",
    fullDesc: "Subscriptions are the modern budget killer. They're small individually and automatic, which makes them invisible. Netflix, Spotify, YouTube Premium, software tools, gym memberships, newsletter paid tiers — they add up to thousands per month without being noticed.",
    tips: [
      "Do a full subscription audit every quarter",
      "Use family or student plans wherever available",
      "Cancel trials the day you sign up, calendar a review date",
      "Rotate subscriptions: one month Netflix, next month Prime",
      "Use free tiers of tools until you genuinely need paid",
      "Remove saved payment methods from trial services",
    ],
    avgMonthly: "৳500–3,000",
    subcategories: ["Streaming Video", "Music", "Software & Tools", "News & Magazines", "Memberships"],
    aiInsight: "The AI Spending Coach specifically calls out subscription creep — when your total subscription spend grows month-over-month even though you haven't consciously added anything.",
  },
  "Travel": {
    emoji: "✈️",
    desc: "Flights, hotels, transport, and travel activities.",
    fullDesc: "Travel spending is infrequent but high-impact. A single trip can cost more than three months of regular expenses. Planning and booking strategy can save 30–50% on the same trip.",
    tips: [
      "Book flights 6–8 weeks in advance for best prices",
      "Travel during shoulder season (just off-peak)",
      "Use reward points and miles for flights and hotels",
      "Book accommodations directly for better cancellation terms",
      "Set a per-trip budget before you start planning",
      "Keep a travel fund — add to it monthly",
    ],
    avgMonthly: "Variable (plan per trip)",
    subcategories: ["Flights", "Hotels & Stays", "Local Transport", "Food Abroad", "Activities & Tours"],
    aiInsight: "Use SpendWise's Goal Coach to build a dedicated travel fund. Set your destination budget as a savings goal and get a month-by-month savings plan to reach it.",
  },
  "Other": {
    emoji: "📦",
    desc: "Miscellaneous expenses that don't fit other categories.",
    fullDesc: "If your 'Other' category is large, it's a signal that you're not categorizing carefully enough. Uncategorized spending is unmanaged spending. The first step is reviewing this category regularly and migrating items to appropriate categories.",
    tips: [
      "Review 'Other' every month and re-categorize",
      "If something appears 3+ times, create a category for it",
      "Gifting and donations deserve their own category",
      "Pet expenses, hair cuts, and laundry are common 'Other' items",
      "Keep receipts for cash transactions so they're not lost",
    ],
    avgMonthly: "Varies widely",
    subcategories: ["Gifts", "Personal Care", "Laundry", "Donations", "Miscellaneous"],
    aiInsight: "The FinBot Chat can help you identify what's hiding in your 'Other' spending and suggest better categorization for clearer insights.",
  },
};

// Normalize slug to category name
function slugToCategory(slug: string): string {
  const s = slug.replace(/-/g, " ").toLowerCase();
  return EXPENSE_CATEGORIES.find((c) => c.toLowerCase() === s || c.toLowerCase().replace(/ & /g, "-") === slug) || "";
}

export default function CategoryDetail() {
  const { category: slug } = useParams<{ category: string }>();
  const categoryName = slugToCategory(slug || "");
  const meta = categoryName ? CATEGORY_META[categoryName] : null;
  const color = categoryName ? CATEGORY_COLORS[categoryName] || "#6b7280" : "#6b7280";

  if (!meta) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Category not found</h1>
          <Link to="/explore" className="btn-primary inline-flex items-center gap-2 mt-4">
            <ArrowLeft size={16} /> Back to Explore
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <Link to="/explore" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
            <ArrowLeft size={15} /> Back to Explore
          </Link>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: color + "20" }}
            >
              {meta.emoji}
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">{categoryName}</h1>
              <p className="text-gray-500 text-sm mt-0.5">{meta.desc}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="badge" style={{ backgroundColor: color + "20", color }}>
              Avg: {meta.avgMonthly}/mo
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* About */}
        <div className="card p-6">
          <h2 className="font-display font-bold text-gray-900 mb-3">About this category</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{meta.fullDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tips */}
          <div className="card p-6">
            <h2 className="font-display font-bold text-gray-900 mb-4">Budgeting tips</h2>
            <ul className="space-y-3">
              {meta.tips.map((tip) => (
                <li key={tip} className="flex gap-2.5 text-sm text-gray-600">
                  <CheckCircle2 size={16} className="text-accent-500 flex-shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Subcategories */}
          <div className="card p-6">
            <h2 className="font-display font-bold text-gray-900 mb-4">Common sub-expenses</h2>
            <div className="flex flex-wrap gap-2">
              {meta.subcategories.map((s) => (
                <span key={s} className="badge bg-gray-100 text-gray-600 px-3 py-1.5 text-xs">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Average monthly spend</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: color, width: "60%" }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700">{meta.avgMonthly}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI insight */}
        <div className="card p-6 border-brand-100" style={{ background: "linear-gradient(135deg, #eef2ff, #f0fdf4)" }}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingDown size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-gray-900 mb-1.5">How SpendWise AI helps</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{meta.aiInsight}</p>
              <Link
                to="/dashboard/ai-coach"
                className="btn-primary inline-flex items-center gap-2 mt-4 text-sm"
              >
                <LogIn size={15} /> Try AI Coach
              </Link>
            </div>
          </div>
        </div>

        {/* Related categories */}
        <div className="card p-6">
          <h2 className="font-display font-bold text-gray-900 mb-4">Related categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {EXPENSE_CATEGORIES.filter((c) => c !== categoryName)
              .slice(0, 4)
              .map((cat) => (
                <Link
                  key={cat}
                  to={`/explore/${cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                  className="card p-3 text-center hover:shadow-sm transition-shadow"
                >
                  <p className="text-xl mb-1">{CATEGORY_META[cat]?.emoji}</p>
                  <p className="text-xs font-medium text-gray-700 leading-tight">{cat}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
