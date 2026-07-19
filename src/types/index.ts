export interface Expense {
  _id: string;
  userId: string;
  title: string;
  amount: number;
  category: string;
  paymentMethod: string;
  date: string;
  notes: string;
  receiptUrl: string | null;
  createdAt: string;
}

export interface Budget {
  _id: string;
  userId: string;
  category: string;
  limit: number;
  month: string;
  spent?: number;
  remaining?: number;
}

export interface Goal {
  _id: string;
  userId: string;
  title: string;
  description: string;
  icon: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string | null;
  progress?: number;
  createdAt: string;
}

export interface DashboardStats {
  currentMonth: string;
  income: number;
  currentTotal: number;
  prevTotal: number;
  savings: number;
  change: number;
  budgetAlerts: Budget[];
  goals: Goal[];
  recentExpenses: Expense[];
  monthlyTrend: { month: string; spent: number }[];
}

export const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Bills & Utilities",
  "Subscriptions",
  "Travel",
  "Other",
] as const;

export const PAYMENT_METHODS = [
  "Cash",
  "Card",
  "Mobile Banking",
  "Bank Transfer",
  "Other",
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "#6366f1",
  "Transport": "#10b981",
  "Shopping": "#f59e0b",
  "Entertainment": "#ec4899",
  "Health": "#ef4444",
  "Education": "#8b5cf6",
  "Bills & Utilities": "#06b6d4",
  "Subscriptions": "#f97316",
  "Travel": "#14b8a6",
  "Other": "#6b7280",
};
