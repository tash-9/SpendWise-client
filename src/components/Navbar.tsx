import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { TrendingDown, LayoutDashboard, Target, Wallet, BookOpen, LogOut, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/about", label: "About" },
  ];

  const authLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
    { to: "/dashboard/expenses", label: "Expenses", icon: <Wallet size={16} /> },
    { to: "/dashboard/budgets", label: "Budgets", icon: <TrendingDown size={16} /> },
    { to: "/dashboard/goals", label: "Goals", icon: <Target size={16} /> },
    { to: "/dashboard/ai-coach", label: "AI Coach", icon: <BookOpen size={16} /> },
  ];

  const links = user ? authLinks : publicLinks;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-xl text-brand-600">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <TrendingDown size={18} className="text-white" />
            </div>
            SpendWise<span className="text-accent-500"> AI</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-50 text-brand-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                {("icon" in l) && l.icon}
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full ring-2 ring-brand-100"
                />
                <span className="text-sm font-medium text-gray-700">{user.name.split(" ")[0]}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary flex items-center gap-1.5">
                  <LogIn size={16} /> Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Get started free
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? "bg-brand-50 text-brand-600" : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              {("icon" in l) && l.icon}
              {l.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gray-100 flex gap-2">
            {user ? (
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="btn-danger w-full flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Sign out
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1 text-center">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-center">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
