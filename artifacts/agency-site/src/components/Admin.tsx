import { useState, useEffect } from "react";
import { Mail, Building2, Globe, Briefcase, DollarSign, MessageSquare, Calendar, LogOut, RefreshCw, Inbox } from "lucide-react";

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
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

export function Admin() {
  const [key, setKey] = useState(() => sessionStorage.getItem(ADMIN_KEY_STORAGE) ?? "");
  const [inputKey, setInputKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Submission | null>(null);

  const fetchSubmissions = async (adminKey: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submissions", {
        headers: { "x-admin-key": adminKey },
      });
      if (res.status === 401) {
        setError("Invalid admin key.");
        setAuthed(false);
        sessionStorage.removeItem(ADMIN_KEY_STORAGE);
        return;
      }
      const data = await res.json() as Submission[];
      setSubmissions(data);
      setAuthed(true);
      sessionStorage.setItem(ADMIN_KEY_STORAGE, adminKey);
    } catch {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (key) fetchSubmissions(key);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setKey(inputKey);
    fetchSubmissions(inputKey);
  };

  const handleLogout = () => {
    setAuthed(false);
    setKey("");
    setInputKey("");
    setSubmissions([]);
    setSelected(null);
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 justify-center mb-10">
            <div
              className="relative flex-shrink-0"
              style={{ width: 44, height: 44, padding: 1.5, background: "linear-gradient(135deg, #8B6914 0%, #CAA353 55%, #F0C97A 100%)", borderRadius: 10, boxSizing: "border-box" }}
            >
              <div className="w-full h-full flex items-center justify-center" style={{ background: "#0c0c0e", borderRadius: 8 }}>
                <span className="font-black" style={{ fontSize: 13, background: "linear-gradient(135deg, #CAA353, #F0C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NE</span>
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: "#F0C97A", boxShadow: "0 0 8px rgba(240,201,122,0.95)" }} />
            </div>
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-white">NextEdge</p>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: "#CAA353" }}>Admin</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 space-y-5">
            <div>
              <p className="text-white font-bold text-lg mb-1">Sign in</p>
              <p className="text-white/40 text-sm">Enter your admin key to view submissions.</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">Admin Key</label>
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full h-12 px-4 rounded-lg text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(202,163,83,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading || !inputKey}
              className="w-full h-11 rounded-lg text-xs font-bold tracking-widest uppercase transition-opacity disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e" }}
            >
              {loading ? "Checking…" : "Enter Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="relative flex-shrink-0"
            style={{ width: 36, height: 36, padding: 1.5, background: "linear-gradient(135deg, #8B6914 0%, #CAA353 55%, #F0C97A 100%)", borderRadius: 8, boxSizing: "border-box" }}
          >
            <div className="w-full h-full flex items-center justify-center" style={{ background: "#0c0c0e", borderRadius: 6 }}>
              <span className="font-black" style={{ fontSize: 11, background: "linear-gradient(135deg, #CAA353, #F0C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NE</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-white leading-none">NextEdge</p>
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase leading-none mt-0.5" style={{ color: "#CAA353" }}>Admin</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white/30 text-xs hidden sm:block">{submissions.length} submission{submissions.length !== 1 ? "s" : ""}</span>
          <button
            onClick={() => fetchSubmissions(key)}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-white/50 hover:text-white border border-white/[0.07] hover:border-white/20 transition-all"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:block">Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-white/50 hover:text-white border border-white/[0.07] hover:border-white/20 transition-all"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:block">Sign out</span>
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-61px)]">
        {/* Submission list */}
        <div className={`${selected ? "hidden md:flex" : "flex"} flex-col w-full md:w-96 border-r border-white/[0.06] overflow-y-auto`}>
          {loading && submissions.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-white/30 text-sm">Loading…</div>
          ) : submissions.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
                <Inbox className="w-6 h-6 text-white/20" />
              </div>
              <div>
                <p className="text-white/60 font-semibold">No submissions yet</p>
                <p className="text-white/25 text-sm mt-1">Form inquiries will appear here</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {submissions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className="w-full text-left px-5 py-4 hover:bg-white/[0.03] transition-colors group"
                  style={selected?.id === s.id ? { background: "rgba(202,163,83,0.06)", borderLeft: "2px solid rgba(202,163,83,0.5)" } : {}}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-white truncate">{s.name}</p>
                    <span className="text-[10px] text-white/25 whitespace-nowrap flex-shrink-0 mt-0.5">
                      {new Date(s.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
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
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className={`${selected ? "flex" : "hidden md:flex"} flex-col flex-1 overflow-y-auto`}>
          {!selected ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-white/30 text-sm">Select a submission to view details</p>
            </div>
          ) : (
            <div className="p-6 md:p-10 max-w-2xl w-full">
              {/* Mobile back button */}
              <button
                onClick={() => setSelected(null)}
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
                  { icon: Mail, label: "Email", value: selected.email, href: `mailto:${selected.email}` },
                  { icon: Building2, label: "Company", value: selected.company || "—" },
                  { icon: Globe, label: "Country", value: selected.country || "—" },
                  { icon: DollarSign, label: "Budget", value: selected.budget || "—" },
                  { icon: Briefcase, label: "Service", value: selected.service || "—" },
                  { icon: Calendar, label: "Received", value: formatDate(selected.createdAt) },
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

              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-3.5 h-3.5 text-white/25" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25">Project Details</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:${selected.email}?subject=Re: Your Project Inquiry — NextEdge Tech`}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold tracking-wide uppercase transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #CAA353, #F0C97A)", color: "#0c0c0e" }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Reply via Email
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
