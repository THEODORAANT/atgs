import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, Mail, Phone, ArrowRight, Sparkles, Shield, Rocket } from "lucide-react";

// --- Quick theming knobs ---
// You can tweak the palette below or swap to one of the presets listed in comments.
const BRAND = {
  name: "ATGS Software Services",
  tagline: "Custom software, cloud, and AI solutions—delivered fast.",
  primary: "#0ea5e9", // Sky 500
  primaryDark: "#0284c7", // Sky 600
  foreground: "#0b1220",
  background: "#0a0f1c", // deep navy
  surface: "#0f172a", // slate-900
  text: "#e5e7eb", // gray-200
  accent: "#34d399", // emerald-400
};

/*
Alternate palettes (copy any set into BRAND):
1) Minimal Mono
   primary: "#1f2937", primaryDark: "#111827", background: "#0b0b0c", surface: "#151515", text: "#e5e7eb", accent: "#9ca3af"
2) Sunset Pop
   primary: "#f97316", primaryDark: "#ea580c", background: "#0b1220", surface: "#111827", text: "#f9fafb", accent: "#a78bfa"
3) Calm Teal
   primary: "#14b8a6", primaryDark: "#0d9488", background: "#071a1c", surface: "#0b2a2e", text: "#e6fffb", accent: "#f59e0b"
*/

export default function CompanyLanding() {
  const [email, setEmail] = useState("");

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Lightweight runtime tests for helpers (won't throw; only logs if failed)
  function validateEmailFormat(s: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }
  if (typeof window !== "undefined") {
    console.assert(validateEmailFormat("a@b.com"), "Expected valid email to pass");
    console.assert(!validateEmailFormat("a@b"), "Expected invalid email to fail");
  }

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send to Theodora by default (can be changed to support@ if desired)
    const to = "theodora@atgs.co.uk";

    // Basic front-end validation before opening mail client
    if (!contactName || !validateEmailFormat(contactEmail) || !contactMessage) {
      alert("Please provide your name, a valid email, and a short message.");
      return;
    }

    const subject = `New inquiry from ${contactName || "ATGS website"}`;
    const body = `Name: ${contactName}\nEmail: ${contactEmail}\nCompany: ${contactCompany}\n\nMessage:\n${contactMessage}`;
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const features = [
    {
      icon: <Rocket className="w-5 h-5" />, 
      title: "Custom Development",
      desc: "Web, mobile, and API platforms tailored to your workflows.",
    },
    {
      icon: <Shield className="w-5 h-5" />, 
      title: "Cloud & DevOps",
      desc: "CI/CD, containers, and scalable infrastructure on AWS, Azure, or GCP.",
    },
    {
      icon: <Sparkles className="w-5 h-5" />, 
      title: "Quality & Support",
      desc: "Automated testing, monitoring, and SLA-backed maintenance.",
    },
  ];

  const plans = [
    { name: "Discovery", price: "From $2k", bullets: ["1–2 week sprint", "Architecture & plan", "Roadmap + estimate"] },
    { name: "Build", price: "From $15k", bullets: ["Agile delivery", "Weekly demos", "Testing & QA"] },
    { name: "Scale", price: "Custom", bullets: ["Cloud optimization", "Security & compliance", "Dedicated support"] },
  ];

  return (
    <div className="min-h-screen" style={{ background: `radial-gradient(1200px 600px at 10% -10%, ${BRAND.primary}22, transparent), radial-gradient(800px 400px at 90% -20%, ${BRAND.accent}22, transparent)`, color: BRAND.text, backgroundColor: BRAND.background }}>
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/5">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-semibold tracking-tight" style={{ color: BRAND.text }}>{BRAND.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <a href="#cta" className="px-4 py-2 rounded-xl font-medium" style={{ backgroundColor: BRAND.primary, color: "#001014" }}>Get started</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="hero" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold leading-tight">
              Build a modern website for <span style={{ color: BRAND.accent }}>real results</span>
            </motion.h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              {BRAND.tagline} This starter gives you a polished base: sections, animations, and a simple theme system.
            </p>

            {/* Email capture */}
            <form id="cta" className="mt-8 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="w-full sm:w-80 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2"
                style={{ outlineColor: BRAND.primary }}
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium" style={{ backgroundColor: BRAND.primary }}>
                Join waitlist <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 text-sm text-gray-400">
              No spam. Unsubscribe anytime.
            </div>
          </div>

          <div className="relative">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-6 bg-white/5">
                <div className="rounded-2xl p-6" style={{ background: `linear-gradient(180deg, ${BRAND.surface}, #0b1220)` }}>
                  {/* Mock browser window */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10b981" }} />
                  </div>
                  {/* Display GIF here */}
                  <div className="h-64 md:h-80 rounded-xl overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
                    <img src="/logo.gif" alt="Demo animation" className="h-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl p-6 border border-white/10 bg-white/5">
              <div className="w-10 h-10 grid place-items-center rounded-xl" style={{ backgroundColor: `${BRAND.primary}22`, color: BRAND.primary }}>
                {f.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social proof
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-3xl p-6 md:p-10 border border-white/10 bg-white/5">
          <p className="text-sm uppercase tracking-widest text-gray-400">Trusted by teams like</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-6 opacity-80">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}
                     className="h-10 bg-white/5 rounded-lg border border-white/10 grid place-items-center text-xs text-gray-400">
                  <img src={i}".gif" alt="Demo animation" className="h-full object-cover"/>

                </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Pricing
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col">
              <h3 className="text-xl font-semibold text-white">{p.name}</h3>
              <div className="mt-2 text-3xl font-extrabold" style={{ color: BRAND.primary }}>{p.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-gray-300 flex-1">
                {p.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5" style={{ color: BRAND.accent }} /> {b}</li>
                ))}
              </ul>
              <button className="mt-6 rounded-xl px-4 py-3 font-medium" style={{ backgroundColor: BRAND.primary, color: "#001014" }}>Choose {p.name}</button>
            </div>
          ))}
        </div>
      </section>*/}

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="rounded-3xl p-6 md:p-10 border border-white/10 bg-white/5 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-bold">Let’s talk</h3>
            <p className="mt-2 text-gray-300">Tell us about your project and goals. We typically reply within one business day.</p>
            <div className="mt-6 space-y-3 text-gray-300">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@atgs.co.uk</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123‑4567</div>
            </div>
          </div>
          <form className="space-y-3" onSubmit={handleContactSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input value={contactName} onChange={(e) => setContactName(e.target.value)} required className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2" placeholder="Name" />
              <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email" required className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2" placeholder="Email" />
            </div>
            <input value={contactCompany} onChange={(e) => setContactCompany(e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2" placeholder="Company" />
            <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} rows={4} required className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2" placeholder="Tell us a bit about your needs" />
            <button className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium" style={{ backgroundColor: BRAND.primary, color: "#001014" }}>Send message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={22} />
            <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Logo({ size = 28 }: { size?: number }) {
  // Simple, geometric placeholder mark using currentColor
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="56" height="56" rx="14" fill="currentColor" opacity="0.12"/>
      <path d="M18 40 L32 16 L46 40" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="42" r="4" fill="currentColor"/>
    </svg>
  );
}
