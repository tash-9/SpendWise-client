import { Link } from "react-router-dom";
import {
  TrendingDown, Bot, ShieldCheck, Target, BarChart2, Zap,
  CheckCircle2, ArrowRight, Star, Users, Wallet, PiggyBank,
} from "lucide-react";

const FEATURES = [
  { icon: <Bot size={22} className="text-brand-500" />, title: "5 AI Agents", desc: "Spending Coach, Purchase Advisor, Weekly Recap, Goal Coach, and FinBot Chat — all backed by real financial data." },
  { icon: <BarChart2 size={22} className="text-brand-500" />, title: "Visual Dashboard", desc: "Instant overview of income vs expenses, 6-month trend, and category breakdown — all in one place." },
  { icon: <Target size={22} className="text-brand-500" />, title: "Savings Goals", desc: "Set goals with deadlines and let AI build a month-by-month savings plan to get you there." },
  { icon: <PiggyBank size={22} className="text-brand-500" />, title: "Smart Budgets", desc: "Allocate limits per category. Get alerts before you overspend, not after." },
  { icon: <Wallet size={22} className="text-brand-500" />, title: "Expense Tracker", desc: "Log expenses in seconds. Filter, sort, and search across all your transactions instantly." },
  { icon: <ShieldCheck size={22} className="text-brand-500" />, title: "Private & Secure", desc: "JWT authentication, hashed passwords, and server-side API key management. Your data stays yours." },
];

const AGENTS = [
  { emoji: "📊", name: "Spending Coach", desc: "Analyzes this month's transactions and surfaces patterns you'd miss on your own." },
  { emoji: "🛒", name: "Purchase Advisor", desc: "Tell it what you want to buy. It checks your budget, goals, and spending before giving a clear YES or WAIT." },
  { emoji: "📅", name: "Weekly Recap", desc: "Every week, get a ✅ wins / ⚠ warnings / 💡 insights breakdown of your spending behavior." },
  { emoji: "🎯", name: "Goal Coach", desc: "Pick a savings goal and get a step-by-step monthly savings plan personalized to your income and habits." },
  { emoji: "💬", name: "FinBot Chat", desc: "Ask anything — 'Why am I always broke?' or 'Can I afford rent this month?' — and get an honest answer." },
];

const TESTIMONIALS = [
  { name: "Rahul A.", role: "CS student", rating: 5, text: "The Purchase Advisor actually told me to wait before buying a graphics card. Saved me from depleting my emergency fund." },
  { name: "Nadia S.", role: "Freelancer", rating: 5, text: "Weekly Recap showed me I was spending ৳3,200/month on food delivery. I had no idea. Cut it in half the next month." },
  { name: "Tanvir H.", role: "Junior dev", rating: 4, text: "FinBot Chat is genuinely useful. It knows my actual numbers, not generic advice about 'cutting lattes'." },
  { name: "Priya M.", role: "Graduate student", rating: 5, text: "Finally hit my laptop savings goal two months early. The Goal Coach literally mapped out exactly what to cut." },
];

const STATS = [
  { value: "5", label: "Specialized AI agents" },
  { value: "৳0", label: "Cost to get started" },
  { value: "100%", label: "Data privacy" },
  { value: "<2s", label: "AI response time" },
];

const FAQS = [
  { q: "Is SpendWise AI free?", a: "Yes, completely free. No credit card required to sign up." },
  { q: "How does the AI know my financial situation?", a: "Each AI agent reads your real expense history, budgets, goals, and income from the database before responding — no generic advice." },
  { q: "Is my financial data safe?", a: "Passwords are hashed with bcrypt, API keys are server-side only, and JWTs expire after 7 days. Your data is never sold." },
  { q: "Can I use it for any currency?", a: "Yes. You can set your preferred currency in Profile settings — BDT, USD, EUR, GBP, INR, and more." },
  { q: "What AI model powers SpendWise?", a: "Claude (claude-sonnet-4-6) by Anthropic — a state-of-the-art language model with strong reasoning about numbers and context." },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO — 65vh */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-20"
        style={{ minHeight: "65vh", background: "linear-gradient(135deg, #eef2ff 0%, #f0fdf4 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Zap size={12} className="fill-brand-500" /> Powered by Claude AI
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-gray-900 leading-tight mb-5">
            Budget Smarter.<br />
            <span className="text-brand-500">Spend Better.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
            SpendWise AI turns your expense data into personalized financial coaching.
            Not charts that confuse — advice that helps.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn-primary text-base px-7 py-3 flex items-center gap-2 justify-center">
              Start for free <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-secondary text-base px-7 py-3 flex items-center justify-center">
              Try demo account
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">No credit card · Takes 30 seconds · Works immediately</p>
        </div>

        {/* Floating cards */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-3">
          {[
            { label: "Food & Dining", pct: 78, color: "bg-brand-500" },
            { label: "Transport", pct: 42, color: "bg-accent-500" },
            { label: "Shopping", pct: 91, color: "bg-amber-400" },
          ].map((item) => (
            <div key={item.label} className="bg-white/80 backdrop-blur rounded-xl px-4 py-3 shadow-sm border border-gray-100 w-48">
              <p className="text-xs text-gray-500 mb-1.5">{item.label}</p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                <div className={`h-1.5 rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
              </div>
              <p className="text-xs font-semibold text-gray-700">{item.pct}% of budget</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand-500 py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-display font-extrabold">{s.value}</p>
              <p className="text-brand-200 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">What's inside</p>
            <h2 className="text-3xl font-display font-bold text-gray-900">Everything you need to take control</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI AGENTS */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">Agentic AI</p>
            <h2 className="text-3xl font-display font-bold text-gray-900">5 specialized AI agents</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Each agent has a specific job and real access to your financial data — not just a generic chatbot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AGENTS.map((a) => (
              <div key={a.name} className="card p-6">
                <span className="text-4xl mb-3 block">{a.emoji}</span>
                <h3 className="font-display font-bold text-gray-900 mb-1.5">{a.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
            <div className="card p-6 bg-gradient-to-br from-brand-500 to-brand-700 text-white flex flex-col justify-between">
              <div>
                <Bot size={32} className="mb-3 opacity-90" />
                <h3 className="font-display font-bold text-xl mb-1.5">Ready to try?</h3>
                <p className="text-brand-100 text-sm">Use the demo account and see all 5 agents with pre-loaded data.</p>
              </div>
              <Link to="/login" className="mt-5 inline-flex items-center gap-2 bg-white text-brand-600 font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-brand-50 transition-colors">
                Try demo <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">Getting started</p>
            <h2 className="text-3xl font-display font-bold text-gray-900">Up and running in 3 steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Create account", desc: "Sign up free in 30 seconds. No payment details needed — ever." },
              { step: "2", title: "Log expenses", desc: "Add your spending by category, date, and payment method. Import comes later." },
              { step: "3", title: "Ask AI", desc: "Open AI Coach and ask anything. Your data is already there, no setup needed." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">User stories</p>
            <h2 className="text-3xl font-display font-bold text-gray-900">People who changed their spending</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-xs font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE CATEGORIES */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-1">Browse</p>
              <h2 className="text-2xl font-display font-bold text-gray-900">Explore spending categories</h2>
            </div>
            <Link to="/explore" className="btn-secondary flex items-center gap-1.5 text-sm">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {["🍜 Food & Dining", "🚌 Transport", "🛍️ Shopping", "🎮 Entertainment", "💊 Health"].map((cat) => (
              <Link
                key={cat}
                to={`/explore/${cat.split(" ").slice(1).join("-").toLowerCase()}`}
                className="card p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <p className="text-2xl mb-1.5">{cat.split(" ")[0]}</p>
                <p className="text-xs font-medium text-gray-700">{cat.split(" ").slice(1).join(" ")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="text-3xl font-display font-bold text-gray-900">Common questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <div key={f.q} className="card p-5">
                <div className="flex gap-3">
                  <CheckCircle2 size={18} className="text-accent-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{f.q}</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-brand-600 to-brand-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Users size={36} className="mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-display font-extrabold mb-4">Start making smarter financial decisions today</h2>
          <p className="text-brand-200 mb-8">Free forever. AI-powered. Takes 30 seconds to set up.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="bg-white text-brand-600 font-bold px-8 py-3 rounded-xl hover:bg-brand-50 transition-colors flex items-center gap-2 justify-center">
              Create free account <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="border border-brand-400 text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-700 transition-colors">
              Use demo account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
