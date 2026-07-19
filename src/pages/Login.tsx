import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { TrendingDown, Zap } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string })?.from || "/dashboard";
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const fillDemo = () => {
    setForm({ email: "demo@spendwise.ai", password: "demo1234" });
    toast("Demo credentials filled in!", { icon: "🤖" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-xl font-display font-bold text-xl mb-3">
            <TrendingDown size={22} />
            SpendWise AI
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to your account</p>
        </div>

        <div className="card p-8">
          {/* Demo login */}
          <button
            type="button"
            onClick={fillDemo}
            className="w-full flex items-center justify-center gap-2 mb-6 border-2 border-dashed border-brand-200 text-brand-600 rounded-xl py-2.5 text-sm font-semibold hover:bg-brand-50 transition-colors"
          >
            <Zap size={16} className="fill-brand-500" />
            Try demo account
          </button>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <input
                className="input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>
            <button className="btn-primary w-full mt-2" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            No account yet?{" "}
            <Link to="/register" className="text-brand-600 font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
