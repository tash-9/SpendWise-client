import { Link } from "react-router-dom";
import { Bot, TrendingDown, ShieldCheck, Target, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-display font-extrabold text-gray-900 mb-4">
            Built for people who want to understand their money
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            SpendWise AI was built as a capstone project to explore what happens when you give real financial data to a powerful AI and ask it to coach you — not just show you charts.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">The problem we're solving</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Most budgeting apps show you charts. They require you to interpret data, draw conclusions, and change behavior on your own. That's hard — especially when you're a student or early-career professional managing money for the first time.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              SpendWise AI closes that gap. Instead of a chart that says "you spent 40% on food," it says "you spent ৳3,200 on food delivery this month — that's ৳800 more than last month and is delaying your laptop goal by 3 weeks."
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: <Bot size={20} className="text-brand-500" />, text: "5 specialized AI agents — each with a specific financial job" },
              { icon: <TrendingDown size={20} className="text-brand-500" />, text: "Real data integration — AI reads your actual transactions" },
              { icon: <Target size={20} className="text-brand-500" />, text: "Goal-oriented coaching — not just tracking, but planning" },
              { icon: <ShieldCheck size={20} className="text-brand-500" />, text: "Privacy-first architecture — your data stays secure" },
            ].map((item) => (
              <div key={item.text} className="flex gap-3 items-start card p-4">
                <div className="mt-0.5">{item.icon}</div>
                <p className="text-sm text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-8 text-center">Tech stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {["React + TypeScript", "Tailwind CSS", "Node.js + Express", "MongoDB", "TanStack Query", "Claude AI"].map((tech) => (
              <div key={tech} className="card p-4">
                <p className="text-xs font-semibold text-gray-700">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Start using it today</h2>
        <p className="text-gray-500 text-sm mb-6">Free, no credit card, works immediately with demo data.</p>
        <Link to="/register" className="btn-primary inline-flex items-center gap-2">
          Create free account <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
