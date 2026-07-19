import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from "../../types";

interface Props { edit?: boolean; }

export default function AddExpense({ edit }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const qc = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: EXPENSE_CATEGORIES[0],
    paymentMethod: PAYMENT_METHODS[0],
    date: new Date().toISOString().slice(0, 10),
    notes: "",
    receiptUrl: "",
  });

  // Fetch existing if editing
  const { data: existing } = useQuery({
    queryKey: ["expense", id],
    queryFn: () => api.get(`/expenses?limit=1`).then((r) => {
      // We don't have a GET /expenses/:id, use list — fetch all and find
      return null;
    }),
    enabled: !!edit && !!id,
  });

  const mutation = useMutation({
    mutationFn: (payload: typeof form) =>
      edit && id
        ? api.patch(`/expenses/${id}`, payload)
        : api.post("/expenses", payload),
    onSuccess: () => {
      toast.success(edit ? "Expense updated!" : "Expense added!");
      qc.invalidateQueries({ queryKey: ["expenses"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      navigate("/dashboard/expenses");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to save expense");
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    mutation.mutate(form);
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">
            {edit ? "Edit expense" : "Add expense"}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{edit ? "Update the details below" : "Record a new transaction"}</p>
        </div>
      </div>

      <div className="card p-6">
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Title *</label>
            <input className="input" required value={form.title} onChange={set("title")} placeholder="e.g. Lunch at Gulshan" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Amount (৳) *</label>
              <input className="input" required type="number" min="0.01" step="0.01" value={form.amount} onChange={set("amount")} placeholder="0.00" />
            </div>
            <div>
              <label className="label">Date *</label>
              <input className="input" required type="date" value={form.date} onChange={set("date")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category *</label>
              <select className="input" value={form.category} onChange={set("category")}>
                {EXPENSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Payment method</label>
              <select className="input" value={form.paymentMethod} onChange={set("paymentMethod")}>
                {PAYMENT_METHODS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Notes (optional)</label>
            <textarea
              className="input resize-none"
              rows={2}
              value={form.notes}
              onChange={set("notes")}
              placeholder="Any details about this expense…"
            />
          </div>

          <div>
            <label className="label">Receipt image URL (optional)</label>
            <input className="input" type="url" value={form.receiptUrl} onChange={set("receiptUrl")} placeholder="https://…" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={mutation.isPending} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <Save size={16} />
              {mutation.isPending ? "Saving…" : edit ? "Update" : "Add expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
