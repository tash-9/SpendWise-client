import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

export interface User {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  currency: string;
  monthlyIncome: number;
}

interface AuthContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  loading: boolean;
  login: (payload: { email: string; password: string }) => Promise<void>;
  register: (payload: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate from stored token on mount
  useEffect(() => {
    const token = localStorage.getItem("sw-token");
    if (!token) { setLoading(false); return; }
    api
      .get("/auth/me")
      .then(({ data }) => setUser(data))
      .catch(() => localStorage.removeItem("sw-token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", payload);
    localStorage.setItem("sw-token", data.token);
    setUser(data.user);
    toast.success(`Welcome back, ${data.user.name}! 👋`);
  };

  const register = async (payload: { name: string; email: string; password: string }) => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("sw-token", data.token);
    setUser(data.user);
    toast.success("Account created! Let's set up your budget 🎉");
  };

  const logout = () => {
    localStorage.removeItem("sw-token");
    setUser(null);
    toast.success("Signed out successfully.");
  };

  const value = useMemo(
    () => ({ user, setUser, loading, login, register, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
