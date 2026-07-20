import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { Save, Upload, Loader2 } from "lucide-react";

const CURRENCIES = ["BDT", "USD", "EUR", "GBP", "INR", "SGD", "AED"];

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    avatar: user?.avatar || "",
    currency: user?.currency || "BDT",
    monthlyIncome: String(user?.monthlyIncome || ""),
  });
  const [uploading, setUploading] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: typeof form) =>
      api.patch("/auth/me", { ...payload, monthlyIncome: Number(payload.monthlyIncome) }),
    onSuccess: ({ data }) => {
      setUser(data);
      toast.success("Profile updated!");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = (import.meta as any).env?.VITE_IMGBB_API_KEY;
    if (!key) {
      toast.error("ImgBB API key not configured");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: "POST",
        body,
      });
      const json = await res.json();

      if (json.data?.url) {
        setForm((f) => ({ ...f, avatar: json.data.url }));
        toast.success("Image uploaded! Click Save to apply.");
      } else {
        toast.error("Upload failed — try again");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Update your personal and financial settings</p>
      </div>

      <div className="card p-6">
        {/* Avatar preview */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="relative">
            <img
              src={form.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(form.name)}`}
              alt={form.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-gray-100"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
                <Loader2 size={20} className="text-white animate-spin" />
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="badge bg-brand-50 text-brand-600 mt-1">{user?.role}</span>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Full name</label>
            <input className="input" value={form.name} onChange={set("name")} placeholder="Your name" required />
          </div>

          {/* Image upload */}
          <div>
            <label className="label">Profile picture</label>
            <div className="flex gap-3 items-center">
              <label className="flex-1 cursor-pointer">
                <div className="input flex items-center gap-2 text-gray-500 cursor-pointer hover:border-brand-400 transition-colors">
                  <Upload size={16} className="text-brand-500 flex-shrink-0" />
                  {uploading ? "Uploading..." : "Click to upload image from your device"}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-1">Or paste an image URL below</p>
          </div>

          <div>
            <label className="label">Avatar URL</label>
            <input
              className="input"
              type="url"
              value={form.avatar}
              onChange={set("avatar")}
              placeholder="https://…"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Currency</label>
              <select className="input" value={form.currency} onChange={set("currency")}>
                {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Monthly income</label>
              <input
                className="input"
                type="number"
                min="0"
                value={form.monthlyIncome}
                onChange={set("monthlyIncome")}
                placeholder="0"
              />
              <p className="text-xs text-gray-400 mt-1">Used by AI for personalized advice</p>
            </div>
          </div>

          <button type="submit" disabled={mutation.isPending || uploading} className="btn-primary flex items-center gap-2">
            <Save size={16} />
            {mutation.isPending ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}