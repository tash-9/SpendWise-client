import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { TrendingDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-accent-500/10 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-xl font-display font-bold text-xl mb-3">
            <TrendingDown size={22} />
            SpendWise AI
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Start budgeting smarter</h1>
          <p className="text-gray-500 mt-1 text-sm">Free forever. No credit card required.</p>
        </div>

        <div className="card p-8">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Full name</label>
              <input
                className="input"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="label">Email address</label>
              <input
                className="input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min 6 characters"
                required
                minLength={6}
              />
            </div>
            <button className="btn-primary w-full mt-2" disabled={loading}>
              {loading ? "Creating account…" : "Create free account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
