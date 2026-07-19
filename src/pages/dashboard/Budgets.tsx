import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Plus, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Budget, EXPENSE_CATEGORIES } from "../../types";
import { useAuth } from "../../contexts/AuthContext";

export default function Budgets() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const month = new Date().toISOString().slice(0, 7);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: EXPENSE_CATEGORIES[0], limit: "" });

  const { data: budgets = [], isLoading } = useQuery<Budget[]>({
    queryKey: ["budgets", month],
    queryFn: () => api.get("/budgets", { params: { month } }).then((r) => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (payload: { category: string; limit: number; month: string }) =>
      api.post("/budgets", payload),
    onSuccess: () => {
      toast.success("Budget saved!");
      qc.invalidateQueries({ queryKey: ["budgets"] });
      setShowForm(false);
      setForm({ category: EXPENSE_CATEGORIES[0], limit: "" });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to save budget"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/budgets/${id}`),
    onSuccess: () => {
      toast.success("Budget removed");
      qc.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: user?.currency || "BDT",
      maximumFractionDigits: 0,
    }).format(n);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.limit || Number(form.limit) <= 0) {
      toast.error("Enter a valid limit");
      return;
    }
    addMutation.mutate({ category: form.category, limit: Number(form.limit), month });
  };

  const getStatus = (b: Budget) => {
    const pct = ((b.spent || 0) / b.limit) * 100;
    if (pct >= 100) return { label: "Over budget", color: "text-red-500", bg: "bg-red-500" };
    if (pct >= 80) return { label: "Almost full", color: "text-amber-500", bg: "bg-amber-500" };
    return { label: "On track", color: "text-accent-500", bg: "bg-accent-500" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Budgets</h1>
          <p className="text-sm text-gray-500 mt-1">Set spending limits by category for {month}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          New budget
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Set category budget</h2>
          <form onSubmit={handleAdd} className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[180px]">
              <label className="label">Category</label>
              <select
                className="input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {EXPENSE_CATEGORIES.filter(
                  (c) => !budgets.some((b) => b.category === c)
                ).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="w-48">
              <label className="label">Monthly limit (৳)</label>
              <input
                className="input"
                type="number"
                min="1"
                value={form.limit}
                onChange={(e) => setForm({ ...form, limit: e.target.value })}
                placeholder="e.g. 5000"
                required
              />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
              <button type="submit" disabled={addMutation.isPending} className="btn-primary">
                {addMutation.isPending ? "Saving…" : "Save budget"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Budget cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card h-36 skeleton" />
          ))}
        </div>
      ) : budgets.length === 0 ? (
        <div className="card py-16 text-center">
          <p className="text-gray-500 text-sm mb-3">No budgets set for this month yet.</p>
          <button onClick={() => setShowForm(true)} className="btn-primary inline-flex items-center gap-2">
            <Plus size={16} /> Create your first budget
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((b) => {
            const pct = Math.min(((b.spent || 0) / b.limit) * 100, 100);
            const status = getStatus(b);
            return (
              <div key={b._id} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{b.category}</p>
                    <p className={`text-xs font-medium mt-0.5 flex items-center gap-1 ${status.color}`}>
                      {pct >= 100 ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                      {status.label}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMutation.mutate(b._id)}
                    className="p-1.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full transition-all ${status.bg}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>Spent: <span className="font-semibold text-gray-800">{fmt(b.spent || 0)}</span></span>
                  <span>Limit: <span className="font-semibold text-gray-800">{fmt(b.limit)}</span></span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {b.remaining && b.remaining > 0
                    ? `${fmt(b.remaining)} remaining`
                    : `${fmt(Math.abs(b.remaining || 0))} over limit`}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
