import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explore from "./pages/explore/Explore";
import CategoryDetail from "./pages/explore/CategoryDetail";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Dashboard pages
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Expenses from "./pages/dashboard/Expenses";
import AddExpense from "./pages/dashboard/AddExpense";
import Budgets from "./pages/dashboard/Budgets";
import Goals from "./pages/dashboard/Goals";
import AiCoach from "./pages/dashboard/AiCoach";
import Profile from "./pages/dashboard/Profile";

export default function App() {
  const location = useLocation();
  // Hide global footer inside /dashboard (dashboard has its own layout)
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:category" element={<CategoryDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="expenses/add" element={<AddExpense />} />
          <Route path="expenses/edit/:id" element={<AddExpense edit />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="goals" element={<Goals />} />
          <Route path="ai-coach" element={<AiCoach />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
}
