import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const POSTS = [
  {
    slug: "why-food-delivery-is-destroying-your-budget",
    title: "Why food delivery is quietly destroying your budget",
    excerpt: "The average person underestimates their food delivery spending by 60%. Here's why that happens and how to fix it.",
    category: "Spending Habits",
    date: "2025-06-12",
    readTime: "4 min",
    emoji: "🍕",
  },
  {
    slug: "ai-vs-spreadsheet",
    title: "AI financial coach vs spreadsheet: which actually works?",
    excerpt: "Spreadsheets require discipline you already have. AI coaching works when you don't.",
    category: "AI & Finance",
    date: "2025-06-05",
    readTime: "6 min",
    emoji: "🤖",
  },
  {
    slug: "savings-goal-psychology",
    title: "The psychology of savings goals (and why most fail)",
    excerpt: "Goals without systems fail. Here's how to design a savings goal you'll actually reach.",
    category: "Personal Finance",
    date: "2025-05-28",
    readTime: "5 min",
    emoji: "🧠",
  },
  {
    slug: "subscription-audit",
    title: "How to do a subscription audit in 10 minutes",
    excerpt: "Most people are paying for 3–7 subscriptions they don't use. Here's a quick process to find and cancel them.",
    category: "Budgeting",
    date: "2025-05-15",
    readTime: "3 min",
    emoji: "📺",
  },
  {
    slug: "student-budgeting-guide",
    title: "The honest student budgeting guide",
    excerpt: "Generic advice about 'cutting coffee' doesn't work for students. Here's what actually does.",
    category: "Student Finance",
    date: "2025-05-01",
    readTime: "7 min",
    emoji: "🎓",
  },
  {
    slug: "impulse-buying-triggers",
    title: "The 5 situations that trigger impulse spending",
    excerpt: "Boredom, stress, social pressure, late nights, and sales events. Learn to recognize and interrupt each pattern.",
    category: "Spending Habits",
    date: "2025-04-20",
    readTime: "5 min",
    emoji: "🛍️",
  },
];

const CATEGORIES = ["All", "Spending Habits", "AI & Finance", "Personal Finance", "Budgeting", "Student Finance"];

export default function Blog() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">SpendWise Blog</h1>
          <p className="text-gray-500 text-sm">Practical financial advice for real people — not theoretical frameworks.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                c === "All" ? "bg-brand-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-brand-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured post */}
        <div className="card p-6 mb-6 flex flex-col sm:flex-row gap-5 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
            {POSTS[0].emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-brand-50 text-brand-600">{POSTS[0].category}</span>
              <span className="text-xs text-gray-400">Featured</span>
            </div>
            <h2 className="font-display font-bold text-gray-900 text-lg mb-2">{POSTS[0].title}</h2>
            <p className="text-sm text-gray-500 mb-3">{POSTS[0].excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-3 text-xs text-gray-400">
                <span>{new Date(POSTS[0].date).toLocaleDateString("en-BD", { month: "long", day: "numeric", year: "numeric" })}</span>
                <span>·</span>
                <span>{POSTS[0].readTime} read</span>
              </div>
              <span className="text-sm text-brand-600 font-semibold flex items-center gap-1">
                Read article <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POSTS.slice(1).map((post) => (
            <div
              key={post.slug}
              className="card flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all"
              style={{ minHeight: "240px" }}
            >
              <div className="p-5 flex flex-col flex-1">
                <span className="text-2xl mb-3">{post.emoji}</span>
                <span className="badge bg-gray-100 text-gray-600 mb-3 self-start">{post.category}</span>
                <h3 className="font-display font-bold text-gray-900 text-sm leading-snug mb-2 flex-1">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-400">{post.readTime} read</span>
                  <span className="text-xs text-brand-600 font-semibold flex items-center gap-0.5">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-10 card p-8 bg-gradient-to-br from-brand-500 to-brand-700 text-white text-center">
          <h2 className="font-display font-bold text-xl mb-2">Get weekly financial tips</h2>
          <p className="text-brand-200 text-sm mb-5">Practical advice for smarter spending — straight to your inbox. No spam.</p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              className="flex-1 px-4 py-2.5 rounded-xl text-gray-900 text-sm focus:outline-none"
              placeholder="your@email.com"
            />
            <button className="bg-white text-brand-600 font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-brand-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
