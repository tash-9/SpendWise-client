import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Plus, Trash2, Pencil, Target } from "lucide-react";
import { Goal } from "../../types";
import { useAuth } from "../../contexts/AuthContext";

const ICONS = ["🎯", "💻", "✈️", "🛡️", "🏠", "🎓", "🚗", "💍", "📱", "💰"];

export default function Goals() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editGoal, setEditGoal] = useState<Goal | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "🎯",
    targetAmount: "",
    savedAmount: "",
    deadline: "",
  });

  const { data: goals = [], isLoading } = useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: () => api.get("/goals").then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (payload: typeof form) =>
      editGoal
        ? api.patch(`/goals/${editGoal._id}`, payload)
        : api.post("/goals", payload),
    onSuccess: () => {
      toast.success(editGoal ? "Goal updated!" : "Goal created!");
      qc.invalidateQueries({ queryKey: ["goals"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to save goal"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/goals/${id}`),
    onSuccess: () => {
      toast.success("Goal deleted");
      qc.invalidateQueries({ queryKey: ["goals"] });
    },
  });

  const resetForm = () => {
    setForm({ title: "", description: "", icon: "🎯", targetAmount: "", savedAmount: "", deadline: "" });
    setShowForm(false);
    setEditGoal(null);
  };

  const openEdit = (g: Goal) => {
    setEditGoal(g);
    setForm({
      title: g.title,
      description: g.description,
      icon: g.icon,
      targetAmount: String(g.targetAmount),
      savedAmount: String(g.savedAmount),
      deadline: g.deadline ? new Date(g.deadline).toISOString().slice(0, 10) : "",
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.targetAmount) return;
    saveMutation.mutate(form);
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: user?.currency || "BDT",
      maximumFractionDigits: 0,
    }).format(n);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Savings Goals</h1>
          <p className="text-sm text-gray-500 mt-1">Track progress toward what matters most</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          New goal
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-4">{editGoal ? "Edit goal" : "Create a new goal"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Icon picker */}
            <div>
              <label className="label">Icon</label>
              <div className="flex flex-wrap gap-2">
                {ICONS.map((ic) => (
                  <button
                    key={ic}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, icon: ic }))}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                      form.icon === ic ? "bg-brand-100 ring-2 ring-brand-500" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Goal title *</label>
                <input className="input" required value={form.title} onChange={set("title")} placeholder="e.g. New laptop" />
              </div>
              <div>
                <label className="label">Deadline (optional)</label>
                <input className="input" type="date" value={form.deadline} onChange={set("deadline")} />
              </div>
              <div>
                <label className="label">Target amount (৳) *</label>
                <input className="input" required type="number" min="1" value={form.targetAmount} onChange={set("targetAmount")} placeholder="80000" />
              </div>
              <div>
                <label className="label">Already saved (৳)</label>
                <input className="input" type="number" min="0" value={form.savedAmount} onChange={set("savedAmount")} placeholder="0" />
              </div>
            </div>
            <div>
              <label className="label">Description (optional)</label>
              <textarea className="input resize-none" rows={2} value={form.description} onChange={set("description")} placeholder="Why is this goal important?" />
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={resetForm} className="btn-secondary flex-1">Cancel</button>
              <button type="submit" disabled={saveMutation.isPending} className="btn-primary flex-1">
                {saveMutation.isPending ? "Saving…" : editGoal ? "Update goal" : "Create goal"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goal cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="card h-48 skeleton" />)}
        </div>
      ) : goals.length === 0 ? (
        <div className="card py-16 text-center">
          <Target size={40} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500 text-sm mb-3">No savings goals yet.</p>
          <button onClick={() => setShowForm(true)} className="btn-primary inline-flex items-center gap-2">
            <Plus size={16} /> Create your first goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((g) => {
            const pct = Math.min((g.savedAmount / g.targetAmount) * 100, 100);
            const remaining = g.targetAmount - g.savedAmount;
            const done = pct >= 100;
            return (
              <div key={g._id} className={`card p-5 ${done ? "ring-2 ring-accent-500" : ""}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{g.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{g.title}</p>
                      {g.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{g.description}</p>}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEdit(g)}
                      className="p-1.5 rounded-lg text-gray-300 hover:text-brand-500 hover:bg-brand-50 transition-all"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => { if (confirm("Delete this goal?")) deleteMutation.mutate(g._id); }}
                      className="p-1.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3">
                  <div
                    className={`h-2.5 rounded-full transition-all ${done ? "bg-accent-500" : "bg-brand-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">
                    <span className="font-semibold text-gray-900">{fmt(g.savedAmount)}</span> saved
                  </span>
                  <span className="font-semibold text-gray-500">{pct.toFixed(0)}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {done ? "🎉 Goal reached!" : `${fmt(remaining)} remaining`}
                </p>
                {g.deadline && (
                  <p className="text-xs text-gray-400 mt-1">
                    Deadline: {new Date(g.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
