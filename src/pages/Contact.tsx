import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Github, Twitter } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to a contact API
    setSent(true);
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Get in touch</h1>
          <p className="text-gray-500 text-sm">Have feedback, a bug report, or just want to say hi?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Mail size={18} className="text-brand-500" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">Email</p>
              </div>
              <a href="mailto:hello@spendwise.ai" className="text-sm text-brand-600 hover:underline">
                hello@spendwise.ai
              </a>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Github size={18} className="text-brand-500" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">GitHub</p>
              </div>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-600 hover:underline">
                github.com/spendwise-ai
              </a>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
                  <Twitter size={18} className="text-brand-500" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">Twitter / X</p>
              </div>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-600 hover:underline">
                @spendwiseai
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 card p-6">
            {sent ? (
              <div className="text-center py-12">
                <p className="text-4xl mb-4">✉️</p>
                <h2 className="font-display font-bold text-gray-900 text-xl mb-2">Message sent!</h2>
                <p className="text-gray-500 text-sm">We'll respond within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} className="btn-secondary mt-6">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Your name</label>
                    <input className="input" required value={form.name} onChange={set("name")} placeholder="Alex Rahman" />
                  </div>
                  <div>
                    <label className="label">Email address</label>
                    <input className="input" type="email" required value={form.email} onChange={set("email")} placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <label className="label">Subject</label>
                  <select className="input" value={form.subject} onChange={set("subject")} required>
                    <option value="">Select a topic…</option>
                    <option>Bug report</option>
                    <option>Feature request</option>
                    <option>General feedback</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">Message</label>
                  <textarea
                    className="input resize-none"
                    rows={5}
                    required
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us what's on your mind…"
                  />
                </div>
                <button type="submit" className="btn-primary">Send message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
