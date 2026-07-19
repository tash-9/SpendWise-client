import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  Target,
  Bot,
  User,
  LogOut,
  TrendingDown,
  Plus,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/expenses", label: "Expenses", icon: Receipt, end: false },
  { to: "/dashboard/budgets", label: "Budgets", icon: PiggyBank, end: false },
  { to: "/dashboard/goals", label: "Goals", icon: Target, end: false },
  { to: "/dashboard/ai-coach", label: "AI Coach", icon: Bot, end: false },
  { to: "/dashboard/profile", label: "Profile", icon: User, end: false },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 py-6 px-3 fixed h-full z-40">
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 mb-8 font-display font-bold text-lg text-brand-600">
          <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
            <TrendingDown size={16} className="text-white" />
          </div>
          SpendWise AI
        </div>

        {/* Quick add */}
        <button
          onClick={() => navigate("/dashboard/expenses/add")}
          className="btn-primary flex items-center justify-center gap-2 mb-6 mx-2"
        >
          <Plus size={16} />
          Add expense
        </button>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-brand-50 text-brand-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        {user && (
          <div className="mt-auto border-t border-gray-100 pt-4 px-2">
            <div className="flex items-center gap-2.5 mb-3">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-60 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
