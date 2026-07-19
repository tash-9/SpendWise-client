import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Plus, Trash2, Pencil, Search, SlidersHorizontal } from "lucide-react";
import { Expense, EXPENSE_CATEGORIES, PAYMENT_METHODS, CATEGORY_COLORS } from "../../types";
import { useAuth } from "../../contexts/AuthContext";

export default function Expenses() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", method: "", month: "", sort: "date_desc" });

  const { data, isLoading } = useQuery({
    queryKey: ["expenses", page, filters],
    queryFn: () =>
      api
        .get("/expenses", {
          params: {
            page,
            limit: 10,
            category: filters.category || undefined,
            method: filters.method || undefined,
            month: filters.month || undefined,
            sort: filters.sort,
          },
        })
        .then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/expenses/${id}`),
    onSuccess: () => {
      toast.success("Expense deleted");
      qc.invalidateQueries({ queryKey: ["expenses"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: () => toast.error("Delete failed"),
  });

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: user?.currency || "BDT",
      maximumFractionDigits: 0,
    }).format(n);

  const expenses: Expense[] = data?.expenses || [];
  const filtered = search
    ? expenses.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    : expenses;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Expenses</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage all your spending</p>
        </div>
        <Link to="/dashboard/expenses/add" className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add expense
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative sm:col-span-2">
            <Search size={15} className="absolute left-3 top-3 text-gray-400" />
            <input
              className="input pl-9"
              placeholder="Search expenses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="input"
            value={filters.category}
            onChange={(e) => { setFilters({ ...filters, category: e.target.value }); setPage(1); }}
          >
            <option value="">All categories</option>
            {EXPENSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select
            className="input"
            value={filters.method}
            onChange={(e) => { setFilters({ ...filters, method: e.target.value }); setPage(1); }}
          >
            <option value="">All methods</option>
            {PAYMENT_METHODS.map((m) => <option key={m}>{m}</option>)}
          </select>
          <select
            className="input"
            value={filters.sort}
            onChange={(e) => { setFilters({ ...filters, sort: e.target.value }); setPage(1); }}
          >
            <option value="date_desc">Newest first</option>
            <option value="date_asc">Oldest first</option>
            <option value="amount_desc">Highest amount</option>
            <option value="amount_asc">Lowest amount</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[...Array(6)].map((_, i) => <div key={i} className="h-12 skeleton" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <SlidersHorizontal size={40} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-500 text-sm">No expenses found</p>
            <Link to="/dashboard/expenses/add" className="btn-primary mt-4 inline-flex items-center gap-2">
              <Plus size={16} /> Add your first expense
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Expense</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Method</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Amount</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((e) => (
                  <tr key={e._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ backgroundColor: CATEGORY_COLORS[e.category] || "#6b7280" }}
                        >
                          {e.category.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{e.title}</p>
                          {e.notes && <p className="text-xs text-gray-400 truncate max-w-[160px]">{e.notes}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="badge bg-gray-100 text-gray-600">{e.category}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                      {new Date(e.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{e.paymentMethod}</td>
                    <td className="px-4 py-3 text-right font-semibold font-mono text-gray-900">
                      {fmt(e.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <Link
                          to={`/dashboard/expenses/edit/${e._id}`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm("Delete this expense?")) deleteMutation.mutate(e._id);
                          }}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {data && data.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500">
              Page {page} of {data.pages} · {data.total} total
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page >= data.pages}
                onClick={() => setPage(page + 1)}
                className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
