import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { scrollToSection } from "@/lib/scrollTo";

const WHATSAPP_URL = `https://wa.me/918218628232`;
const INSTAGRAM_URL = `https://instagram.com/coreelitedigital`;

const serviceLinks = [
  { label: "AI Call Management", section: "ai-solutions" },
  { label: "AI WhatsApp Management", section: "ai-solutions" },
  { label: "AI Social Media", section: "ai-solutions" },
  { label: "AI Site Building", section: "ai-solutions" },
  { label: "Website Design & Dev", section: "services" },
  { label: "SEO & Organic Growth", section: "services" },
  { label: "Social Media Management", section: "services" },
  { label: "Brand Identity", section: "services" },
];

const companyLinks = [
  { label: "About Us", section: "about" },
  { label: "Our Work", section: "work" },
  { label: "Process", section: "process" },
  { label: "Contact", section: "contact" },
];

export function Footer() {
  return (
    <footer className="bg-card/30 border-t border-white/5 relative z-10">
      <div className="container px-4 md:px-6">
        <div className="py-10 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.svg"
                alt="Core Elite Digital"
                style={{ width: 40, height: 40, filter: "drop-shadow(0 0 10px rgba(202,163,83,0.35))" }}
              />
              <div className="flex flex-col leading-none gap-[4px]">
                <span className="font-black uppercase" style={{ fontSize: 13, letterSpacing: "0.13em", color: "#ffffff" }}>coreelite</span>
                <span className="font-bold uppercase" style={{ fontSize: 8, letterSpacing: "0.48em", color: "#CAA353" }}>digital</span>
              </div>
            </div>

            <p className="text-foreground/40 text-sm leading-relaxed max-w-xs mb-3">
              An elite AI-powered digital agency. We build market-leading websites and deploy intelligent AI systems that automate, scale, and dominate.
            </p>
            <p className="text-foreground/25 text-xs leading-relaxed max-w-xs mb-8">
              AI Call Management · AI WhatsApp · AI Social Media · AI Site Building · Website Design · SEO · Brand Identity
            </p>

            {/* Social icons — Instagram + WhatsApp only */}
            <div className="flex items-center gap-4">

              {/* Instagram — gradient highlight */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #833ab4 0%, #c13584 35%, #e1306c 60%, #fd1d1d 80%, #f77737 100%)",
                  boxShadow: "0 4px 20px rgba(193,53,132,0.35)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(193,53,132,0.55)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(193,53,132,0.35)"; }}
              >
                <SiInstagram className="w-5 h-5 text-white relative z-10" />
              </a>

              {/* WhatsApp — green highlight */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #128C7E 0%, #25D366 100%)",
                  boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.55)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.35)"; }}
              >
                <SiWhatsapp className="w-5 h-5 text-white relative z-10" />
              </a>

            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/30 mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, section }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-sm text-foreground/50 hover:text-primary transition-colors duration-200 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/30 mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(({ label, section }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-sm text-foreground/50 hover:text-primary transition-colors duration-200 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-foreground/25 tracking-wide">
            &copy; {new Date().getFullYear()} Core Elite Digital. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-1">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <span key={item} className="text-[11px] text-foreground/25 tracking-wide cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
