import { useState, useEffect, useCallback, useRef } from "react";
import {
  Mail, Building2, Globe, Briefcase, DollarSign, MessageSquare,
  Calendar, LogOut, RefreshCw, Inbox, Trash2, Download, Search,
  X, Users, TrendingUp, ShieldAlert, CheckCircle, AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Submission = {
  id: number;
  name: string;
  company: string;
  email: string;
  country: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
};

const ADMIN_KEY_STORAGE = "ne_admin_key";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  }).format(new Date(iso));
}

function formatShortDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short",
  }).format(new Date(iso));
}

function isThisMonth(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function isThisWeek(iso: string) {
  return Date.now() - new Date(iso).getTime() < 7 * 24 * 60 * 60 * 1000;
}

function exportCSV(rows: Submission[]) {
  const headers = ["ID", "Date", "Name", "Company", "Email", "Country", "Service", "Budget", "Message"];
  const escape = (v: string) => `"${(v ?? "").replace(/"/g, '""').replace(/\n/g, " ")}"`;
  const lines = [
    headers.join(","),
    ...rows.map((r) => [
      r.id,
      escape(formatDate(r.createdAt)),
      escape(r.name),
      escape(r.company),
      escape(r.email),
      escape(r.country),
      escape(r.service),
      escape(r.budget),
      escape(r.message),
    ].join(",")),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `core-elite-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── Toast ──────────────────────────────────────────────── */
function Toast({ msg, type, onClose }: { msg: string; type: "ok" | "err"; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xl whitespace-nowrap"
      style={{
        background: type === "ok" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
        border: `1px solid ${type === "ok" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
        color: type === "ok" ? "#4ade80" : "#f87171",
      }}
    >
      {type === "ok" ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
      {msg}
    </motion.div>
  );
}

/* ─── Login ──────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: (key: string) => void }) {
  const [inputKey, setInputKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submissions", { headers: { "x-admin-key": inputKey.trim() } });
      if (res.status === 503) {
        setError("ADMIN_KEY is not configured on the server. Add it in Replit Secrets, then restart the API.");
      } else if (res.status === 401) {
        setError("Incorrect admin key.");
      } else if (!res.ok) {
        setError(`Server error (${res.status}).`);
      } else {
        sessionStorage.setItem(ADMIN_KEY_STORAGE, inputKey.trim());
        onLogin(inputKey.trim());
      }
    } catch {
      setError("Could not reach the API server. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 justify-center mb-10">
          <div
            className="relative flex-shrink-0"
            style={{ width: 44, height: 44, padding: 1.5, background: "linear-gradient(135deg, #8B6914 0%, #CAA353 55%, #F0C97A 100%)", borderRadius: 10, boxSizing: "border-box" }}
          >
            <div className="w-full h-full flex items-center justify-center" style={{ background: "#0c0c0e", borderRadius: 8 }}>
              <span className="font-black" style={{ fontSize: 13, background: "linear-gradient(135deg, #CAA353, #F0C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CE</span>
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: "#F0C97A", boxShadow: "0 0 8px rgba(240,201,122,0.95)" }} />
          </div>
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-white">Core Elite</p>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: "#CAA353" }}>Admin</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 space-y-5">
          <div>
            <p className="text-white font-bold text-lg mb-1">Sign in</p>
            <p className="text-white/40 text-sm">Enter your admin key to view submissions.</p>
          </div>
          <input type="text" name="username" autoComplete="username" defaultValue="admin" aria-hidden="true" className="hidden" tabIndex={-1} />
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">Admin Key</label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              required
              className="w-full h-12 px-4 rounded-lg text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(202,163,83,0.5)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 px-3 py-2.5 rounded-lg text-xs text-red-400"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <ShieldAlert className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          <button
            type="submit"
            disabled={loading || !inputKey}
            className="w-full h-11 rounded-lg text-xs font-bold tracking-widest uppercase transition-opacity disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e" }}
          >
            {loading ? "Verifying…" : "Enter Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─────────────────────────────────────── */
export function Admin() {
  const [key, setKey] = useState(() => sessionStorage.getItem(ADMIN_KEY_STORAGE) ?? "");
  const [authed, setAuthed] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const refreshRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function showToast(msg: string, type: "ok" | "err") {
    setToast({ msg, type });
  }

  const fetchSubmissions = useCallback(async (adminKey: string, silent = false) => {
    if (!silent) setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submissions", { headers: { "x-admin-key": adminKey } });
      if (res.status === 401) {
        setAuthed(false);
        sessionStorage.removeItem(ADMIN_KEY_STORAGE);
        setError("Session expired. Please sign in again.");
        return;
      }
      if (res.status === 503) {
        setError("ADMIN_KEY is not configured on the server. Add it in Replit Secrets and restart the API.");
        setAuthed(false);
        return;
      }
      if (!res.ok) { setError("Failed to load submissions."); return; }
      const data = await res.json() as Submission[];
      setSubmissions(data);
      setAuthed(true);
      setLastRefresh(new Date());
      sessionStorage.setItem(ADMIN_KEY_STORAGE, adminKey);
    } catch {
      if (!silent) setError("Failed to connect to server.");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (key) fetchSubmissions(key);
  }, []);

  useEffect(() => {
    if (!authed || !key) return;
    refreshRef.current = setInterval(() => fetchSubmissions(key, true), 60_000);
    return () => { if (refreshRef.current) clearInterval(refreshRef.current); };
  }, [authed, key, fetchSubmissions]);

  function handleLogin(newKey: string) {
    setKey(newKey);
    fetchSubmissions(newKey);
  }

  function handleLogout() {
    setAuthed(false);
    setKey("");
    setSubmissions([]);
    setSelected(null);
    setDeleteConfirm(null);
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
  }

  async function handleDelete(id: number) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": key },
      });
      if (!res.ok) { showToast("Failed to delete submission.", "err"); return; }
      const name = submissions.find((s) => s.id === id)?.name ?? "submission";
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selected?.id === id) setSelected(null);
      setDeleteConfirm(null);
      showToast(`Deleted submission from ${name}.`, "ok");
    } catch {
      showToast("Network error — could not delete.", "err");
    } finally {
      setDeleting(false);
    }
  }

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  const q = search.toLowerCase();
  const filtered = submissions.filter((s) =>
    !q ||
    s.name.toLowerCase().includes(q) ||
    s.email.toLowerCase().includes(q) ||
    (s.company ?? "").toLowerCase().includes(q) ||
    (s.service ?? "").toLowerCase().includes(q)
  );

  const thisMonth = submissions.filter((s) => isThisMonth(s.createdAt)).length;
  const thisWeek  = submissions.filter((s) => isThisWeek(s.createdAt)).length;

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col">

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="border-b border-white/[0.06] px-4 md:px-6 py-4 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="relative flex-shrink-0"
            style={{ width: 36, height: 36, padding: 1.5, background: "linear-gradient(135deg, #8B6914 0%, #CAA353 55%, #F0C97A 100%)", borderRadius: 8, boxSizing: "border-box" }}
          >
            <div className="w-full h-full flex items-center justify-center" style={{ background: "#0c0c0e", borderRadius: 6 }}>
              <span className="font-black" style={{ fontSize: 11, background: "linear-gradient(135deg, #CAA353, #F0C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CE</span>
            </div>
          </div>
          <div className="leading-none">
            <p className="text-xs font-black tracking-widest uppercase text-white">Core Elite</p>
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase mt-0.5" style={{ color: "#CAA353" }}>Admin Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {lastRefresh && (
            <span className="text-[10px] text-white/20 hidden lg:block">
              Updated {lastRefresh.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <button
            onClick={() => exportCSV(filtered)}
            disabled={filtered.length === 0}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold tracking-wide uppercase text-white/50 hover:text-white border border-white/[0.07] hover:border-white/20 transition-all disabled:opacity-30"
            title="Export visible leads to CSV"
          >
            <Download className="w-3 h-3" />
            <span className="hidden md:inline">Export CSV</span>
          </button>
          <button
            onClick={() => fetchSubmissions(key)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold tracking-wide uppercase text-white/50 hover:text-white border border-white/[0.07] hover:border-white/20 transition-all"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold tracking-wide uppercase text-white/50 hover:text-red-400 border border-white/[0.07] hover:border-red-500/30 transition-all"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3 px-4 md:px-6 py-4 border-b border-white/[0.04] shrink-0">
        {[
          { icon: Users,     label: "Total Leads",  value: submissions.length, color: "#CAA353" },
          { icon: Calendar,  label: "This Month",   value: thisMonth,           color: "#60a5fa" },
          { icon: TrendingUp,label: "This Week",    value: thisWeek,            color: "#4ade80" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}28` }}>
              <Icon className="w-3.5 h-3.5" style={{ color }} />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-black leading-none" style={{ color }}>{value}</p>
              <p className="text-[10px] text-white/30 mt-0.5 truncate">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Error banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-4 md:mx-6 mt-4 flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs text-red-400"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content: list + detail */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: submission list ── */}
        <div className={`${selected ? "hidden md:flex" : "flex"} flex-col w-full md:w-96 border-r border-white/[0.06] overflow-y-auto`}>

          {/* Search */}
          <div className="px-4 py-3 border-b border-white/[0.04]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, service…"
                className="w-full h-9 pl-9 pr-8 text-xs text-white placeholder:text-white/20 outline-none rounded-lg"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(202,163,83,0.35)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          {loading && submissions.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-white/30 text-sm">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
                <Inbox className="w-6 h-6 text-white/20" />
              </div>
              <div>
                <p className="text-white/60 font-semibold">{search ? "No results" : "No submissions yet"}</p>
                <p className="text-white/25 text-sm mt-1">{search ? `Nothing matches "${search}"` : "Form inquiries will appear here"}</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {filtered.map((s) => (
                <div
                  key={s.id}
                  className="relative group"
                  style={selected?.id === s.id ? { background: "rgba(202,163,83,0.06)", borderLeft: "2px solid rgba(202,163,83,0.5)" } : {}}
                >
                  <button
                    onClick={() => { setSelected(s); setDeleteConfirm(null); }}
                    className="w-full text-left px-5 py-4 hover:bg-white/[0.03] transition-colors pr-12"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-bold text-white truncate">{s.name}</p>
                      <span className="text-[10px] text-white/25 whitespace-nowrap flex-shrink-0 mt-0.5">
                        {formatShortDate(s.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 truncate">{s.company || s.email}</p>
                    {s.service && (
                      <span
                        className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold"
                        style={{ background: "rgba(202,163,83,0.1)", color: "#CAA353", border: "1px solid rgba(202,163,83,0.2)" }}
                      >
                        {s.service}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm(s.id); setSelected(s); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: detail panel ── */}
        <div className={`${selected ? "flex" : "hidden md:flex"} flex-col flex-1 overflow-y-auto`}>
          {!selected ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-white/30 text-sm">Select a submission to view details</p>
            </div>
          ) : (
            <div className="p-5 md:p-10 max-w-2xl w-full">
              {/* Mobile back */}
              <button
                onClick={() => { setSelected(null); setDeleteConfirm(null); }}
                className="md:hidden flex items-center gap-2 text-xs font-semibold text-white/40 hover:text-white mb-6 transition-colors"
              >
                ← Back to list
              </button>

              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-black text-white">{selected.name}</h2>
                  {selected.company && <p className="text-white/40 text-sm mt-1">{selected.company}</p>}
                </div>
                {selected.service && (
                  <span
                    className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "rgba(202,163,83,0.1)", color: "#CAA353", border: "1px solid rgba(202,163,83,0.25)" }}
                  >
                    {selected.service}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Mail,        label: "Email",    value: selected.email,                href: `mailto:${selected.email}` },
                  { icon: Building2,   label: "Company",  value: selected.company || "—" },
                  { icon: Globe,       label: "Country",  value: selected.country || "—" },
                  { icon: DollarSign,  label: "Budget",   value: selected.budget  || "—" },
                  { icon: Briefcase,   label: "Service",  value: selected.service || "—" },
                  { icon: Calendar,    label: "Received", value: formatDate(selected.createdAt) },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-3.5 h-3.5 text-white/25" />
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25">{label}</span>
                    </div>
                    {href ? (
                      <a href={href} className="text-sm font-medium transition-colors" style={{ color: "#CAA353" }}>{value}</a>
                    ) : (
                      <p className="text-sm font-medium text-white/70">{value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-3.5 h-3.5 text-white/25" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25">Project Details</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${selected.email}?subject=Re: Your Project Inquiry — Core Elite Digital`}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold tracking-wide uppercase transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e" }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Reply via Email
                </a>

                {deleteConfirm === selected.id ? (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10">
                    <span className="text-xs text-red-300 font-semibold">Delete this submission?</span>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      disabled={deleting}
                      className="px-3 py-1 rounded text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      {deleting ? "Deleting…" : "Yes, delete"}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      disabled={deleting}
                      className="px-3 py-1 rounded text-xs font-semibold text-white/40 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(selected.id)}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold tracking-wide uppercase border border-white/[0.08] text-white/40 hover:text-red-400 hover:border-red-500/30 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
