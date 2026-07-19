import { useState, useRef, useEffect } from "react";
import api from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Bot, Send, Zap, ShoppingCart, CalendarCheck, Target, RefreshCw, Loader2 } from "lucide-react";
import { Goal } from "../../types";

type Tab = "chat" | "coach" | "purchase" | "reflection" | "goal";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

function MarkdownText({ text }: { text: string }) {
  // Simple markdown-ish renderer: bold **, emojis pass through, line breaks
  const lines = text.split("\n");
  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {lines.map((line, i) => (
        <p key={i} dangerouslySetInnerHTML={{
          __html: line
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/`(.*?)`/g, "<code class='bg-gray-100 px-1 rounded text-xs'>$1</code>")
        }} />
      ))}
    </div>
  );
}

export default function AiCoach() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [chatHistory, setChatHistory] = useState<ChatMsg[]>([
    { role: "assistant", content: "Hey! I'm FinBot, your personal financial assistant. I have access to your real spending data. Ask me anything — why you're over budget, how to reach a goal faster, or what you can cut this month. 💬" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Spending coach
  const [coachAnalysis, setCoachAnalysis] = useState("");
  const [coachLoading, setCoachLoading] = useState(false);

  // Purchase advisor
  const [purchaseForm, setPurchaseForm] = useState({ item: "", price: "" });
  const [purchaseAdvice, setPurchaseAdvice] = useState("");
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  // Weekly reflection
  const [reflection, setReflection] = useState("");
  const [reflectionLoading, setReflectionLoading] = useState(false);

  // Goal coach
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [goalPlan, setGoalPlan] = useState("");
  const [goalPlanLoading, setGoalPlanLoading] = useState(false);

  const { data: goals = [] } = useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: () => api.get("/goals").then((r) => r.data),
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Chat
  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg: ChatMsg = { role: "user", content: chatInput };
    setChatHistory((h) => [...h, userMsg]);
    setChatInput("");
    setChatLoading(true);
    try {
      const { data } = await api.post("/ai/chat", {
        message: chatInput,
        history: chatHistory,
      });
      setChatHistory((h) => [...h, { role: "assistant", content: data.reply }]);
    } catch {
      toast.error("FinBot is unavailable right now.");
    } finally {
      setChatLoading(false);
    }
  };

  // Spending coach
  const runCoach = async () => {
    setCoachLoading(true);
    setCoachAnalysis("");
    try {
      const { data } = await api.post("/ai/spending-coach");
      setCoachAnalysis(data.analysis);
    } catch {
      toast.error("AI analysis failed.");
    } finally {
      setCoachLoading(false);
    }
  };

  // Purchase advisor
  const runPurchaseAdvisor = async () => {
    if (!purchaseForm.item || !purchaseForm.price) return;
    setPurchaseLoading(true);
    setPurchaseAdvice("");
    try {
      const { data } = await api.post("/ai/purchase-advisor", purchaseForm);
      setPurchaseAdvice(data.advice);
    } catch {
      toast.error("Purchase advisor failed.");
    } finally {
      setPurchaseLoading(false);
    }
  };

  // Weekly reflection
  const runReflection = async () => {
    setReflectionLoading(true);
    setReflection("");
    try {
      const { data } = await api.post("/ai/weekly-reflection");
      setReflection(data.reflection);
    } catch {
      toast.error("Reflection failed.");
    } finally {
      setReflectionLoading(false);
    }
  };

  // Goal coach
  const runGoalCoach = async () => {
    if (!selectedGoalId) return;
    setGoalPlanLoading(true);
    setGoalPlan("");
    try {
      const { data } = await api.post("/ai/goal-coach", { goalId: selectedGoalId });
      setGoalPlan(data.plan);
    } catch {
      toast.error("Goal coaching failed.");
    } finally {
      setGoalPlanLoading(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "chat", label: "FinBot Chat", icon: <Bot size={16} /> },
    { id: "coach", label: "Spending Coach", icon: <Zap size={16} /> },
    { id: "purchase", label: "Buy Advisor", icon: <ShoppingCart size={16} /> },
    { id: "reflection", label: "Weekly Recap", icon: <CalendarCheck size={16} /> },
    { id: "goal", label: "Goal Coach", icon: <Target size={16} /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
          <Bot size={26} className="text-brand-500" />
          AI Financial Coach
        </h1>
        <p className="text-gray-500 text-sm mt-1">5 specialized AI agents powered by Claude — using your real financial data</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeTab === t.id
                ? "bg-white text-brand-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Chat */}
      {activeTab === "chat" && (
        <div className="card flex flex-col" style={{ height: "520px" }}>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-brand-500 text-white text-sm"
                      : "bg-gray-50 text-gray-800"
                  }`}
                >
                  {msg.role === "assistant" ? <MarkdownText text={msg.content} /> : <p className="text-sm">{msg.content}</p>}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center mr-2">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-gray-50 rounded-2xl px-4 py-3">
                  <Loader2 size={16} className="animate-spin text-brand-500" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested prompts */}
          <div className="px-4 py-2 border-t border-gray-50 flex gap-2 overflow-x-auto">
            {["Why am I always broke?", "How to save more this month?", "Am I on track with my goals?"].map((p) => (
              <button
                key={p}
                onClick={() => { setChatInput(p); }}
                className="text-xs bg-brand-50 text-brand-600 px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-brand-100 transition-colors flex-shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex gap-2 p-4 border-t border-gray-100">
            <input
              className="input flex-1"
              placeholder="Ask FinBot anything about your finances…"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
            />
            <button onClick={sendChat} disabled={chatLoading || !chatInput.trim()} className="btn-primary px-3.5">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Spending Coach */}
      {activeTab === "coach" && (
        <div className="card p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display font-bold text-gray-900">Spending Coach</h2>
              <p className="text-sm text-gray-500 mt-0.5">AI analyzes this month's spending and gives you personalized insights</p>
            </div>
            <button onClick={runCoach} disabled={coachLoading} className="btn-primary flex items-center gap-2">
              {coachLoading ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
              {coachAnalysis ? "Re-analyze" : "Analyze now"}
            </button>
          </div>
          {coachAnalysis ? (
            <div className="bg-gradient-to-br from-brand-50 to-white rounded-xl p-5 border border-brand-100">
              <MarkdownText text={coachAnalysis} />
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400 text-sm">
              Click "Analyze now" to get personalized spending insights from AI
            </div>
          )}
        </div>
      )}

      {/* Purchase Advisor */}
      {activeTab === "purchase" && (
        <div className="card p-6 space-y-4">
          <div>
            <h2 className="font-display font-bold text-gray-900">Purchase Advisor</h2>
            <p className="text-sm text-gray-500 mt-0.5">Tell the AI what you want to buy and it'll check your finances first</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">What do you want to buy?</label>
              <input
                className="input"
                placeholder="e.g. AirPods Pro"
                value={purchaseForm.item}
                onChange={(e) => setPurchaseForm({ ...purchaseForm, item: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Price (৳)</label>
              <input
                className="input"
                type="number"
                placeholder="e.g. 18000"
                value={purchaseForm.price}
                onChange={(e) => setPurchaseForm({ ...purchaseForm, price: e.target.value })}
              />
            </div>
          </div>
          <button
            onClick={runPurchaseAdvisor}
            disabled={purchaseLoading || !purchaseForm.item || !purchaseForm.price}
            className="btn-primary flex items-center gap-2"
          >
            {purchaseLoading ? <Loader2 size={16} className="animate-spin" /> : <ShoppingCart size={16} />}
            Should I buy this?
          </button>
          {purchaseAdvice && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <MarkdownText text={purchaseAdvice} />
            </div>
          )}
        </div>
      )}

      {/* Weekly Reflection */}
      {activeTab === "reflection" && (
        <div className="card p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display font-bold text-gray-900">Weekly Reflection</h2>
              <p className="text-sm text-gray-500 mt-0.5">AI reviews your last 7 days of spending and gives a report card</p>
            </div>
            <button onClick={runReflection} disabled={reflectionLoading} className="btn-primary flex items-center gap-2">
              {reflectionLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              Generate
            </button>
          </div>
          {reflection ? (
            <div className="bg-gradient-to-br from-accent-500/10 to-white rounded-xl p-5 border border-accent-500/20">
              <MarkdownText text={reflection} />
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400 text-sm">
              Click "Generate" to get your weekly spending recap
            </div>
          )}
        </div>
      )}

      {/* Goal Coach */}
      {activeTab === "goal" && (
        <div className="card p-6 space-y-4">
          <div>
            <h2 className="font-display font-bold text-gray-900">Goal Coach</h2>
            <p className="text-sm text-gray-500 mt-0.5">Select a savings goal and get a personalized plan to achieve it faster</p>
          </div>
          <div>
            <label className="label">Select a goal</label>
            <select
              className="input"
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(e.target.value)}
            >
              <option value="">Choose a goal…</option>
              {goals.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.icon} {g.title}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={runGoalCoach}
            disabled={goalPlanLoading || !selectedGoalId}
            className="btn-primary flex items-center gap-2"
          >
            {goalPlanLoading ? <Loader2 size={16} className="animate-spin" /> : <Target size={16} />}
            Create savings plan
          </button>
          {goalPlan && (
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-5">
              <MarkdownText text={goalPlan} />
            </div>
          )}
          {goals.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">
              No goals yet. <a href="/dashboard/goals" className="text-brand-600 underline">Create one first</a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
