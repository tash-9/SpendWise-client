# SpendWise Client

SpendWise Client is the frontend application for a budget and expense management platform. It enables users to track expenses, set category budgets, define savings goals, and get AI-powered financial coaching, all through a responsive dashboard.

## Purpose

The client provides a responsive React application for users to:

- Track daily expenses by category, payment method, and date
- Set monthly budgets per category with real-time spend tracking
- Define and monitor progress toward savings goals
- Chat with an AI financial coach for spending insights and purchase advice
- Explore spending patterns by category
- Manage their profile, income, and currency

---
## 🔗 Live URL

- **Frontend:** [https://spend-wise-client-pi.vercel.app](https://spend-wise-client-pi.vercel.app/)

---

## Features
- Modern responsive budget & expense tracking platform
- Hero landing page with feature highlights
- Public category explorer with spending breakdowns
- Secure JWT-based authentication
- Google OAuth login
- Dashboard with expense, budget, and goal overview
- Add, edit, and delete expenses with category and payment method
- Category-based budgets with live spent/remaining calculation
- Savings goals with progress tracking
- AI Coach — spending coach, purchase advisor, weekly reflection, goal coaching, and chat assistant
- Profile management with income and currency settings
- Charts and stats via Recharts
- Toast notifications
- Auto-logout on expired/invalid token
- Mobile, tablet, and desktop responsive layout

---

## Technologies Used
- React 18
- TypeScript
- Vite
- React Router DOM v6
- Axios (with JWT interceptor)
- TanStack React Query
- @react-oauth/google (Google login)
- Recharts (dashboard charts)
- React Hot Toast (notifications)
- Lucide React (icons)
- Tailwind CSS

## NPM Packages Used
- react
- react-dom
- react-router-dom
- axios
- @tanstack/react-query
- @react-oauth/google
- react-hot-toast
- recharts
- lucide-react
- vite
- tailwindcss
- typescript

---

## Project Structure

```
src/
├── App.tsx                       # Root component with all routes
├── main.tsx                      # Entry point
├── index.css                     # Global styles and Tailwind directives
├── components/
│   ├── Navbar.tsx                # Sticky navbar with auth-aware links
│   ├── Footer.tsx                # Footer with quick links
│   └── ProtectedRoute.tsx        # Auth guard for private routes
├── contexts/
│   └── AuthContext.tsx           # Global auth state (login, register, logout, user)
├── services/
│   └── api.ts                    # Axios instance with JWT interceptor + auto-logout
├── types/
│   └── index.ts                  # Shared TypeScript types
└── pages/
    ├── Home.tsx                  # Landing page
    ├── Login.tsx                 # Login form (email/password + Google)
    ├── Register.tsx              # Registration form (email/password + Google)
    ├── About.tsx                 # About page
    ├── Blog.tsx                  # Blog page
    ├── Contact.tsx                # Contact page
    ├── Privacy.tsx                 # Privacy policy page
    ├── NotFound.tsx                # 404 page
    ├── explore/
    │   ├── Explore.tsx              # Public category explorer
    │   └── CategoryDetail.tsx       # Single category spending detail
    └── dashboard/
        ├── DashboardLayout.tsx      # Sidebar layout for dashboard
        ├── DashboardHome.tsx        # Stats overview
        ├── Expenses.tsx             # Expense list with filters
        ├── AddExpense.tsx           # Create or edit expense
        ├── Budgets.tsx              # Manage category budgets
        ├── Goals.tsx                # Manage savings goals
        ├── AiCoach.tsx              # AI coaching & chat assistant
        └── Profile.tsx              # Edit profile, income, currency
```

---

## Pages & Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home page with hero and feature highlights |
| `/login` | Public | Login form |
| `/register` | Public | Registration |
| `/explore` | Public | Browse spending categories |
| `/explore/:category` | Public | Category spending detail |
| `/about` | Public | About page |
| `/blog` | Public | Blog page |
| `/contact` | Public | Contact page |
| `/privacy` | Public | Privacy policy |
| `/dashboard` | Protected | Dashboard home with stats |
| `/dashboard/expenses` | Protected | View all expenses |
| `/dashboard/expenses/add` | Protected | Add new expense |
| `/dashboard/expenses/edit/:id` | Protected | Edit existing expense |
| `/dashboard/budgets` | Protected | Manage budgets |
| `/dashboard/goals` | Protected | Manage savings goals |
| `/dashboard/ai-coach` | Protected | AI coaching & chat |
| `/dashboard/profile` | Protected | Edit profile |

---

### Local Installation
1. Clone the client repository.

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add the required environment variables.

4. Run the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

App runs at `http://localhost:5173`

---

## Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Type-check and build for production
npm run preview  # Preview the production build locally
```

---

## Environment Variables

```
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

---

## Author

Your Name
