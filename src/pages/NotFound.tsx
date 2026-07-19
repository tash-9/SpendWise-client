import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-display font-extrabold text-brand-100 mb-2">404</p>
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-500 text-sm mb-8">This page doesn't exist — but your budget does.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
    </main>
  );
}
