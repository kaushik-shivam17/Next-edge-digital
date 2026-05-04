import { SiInstagram, SiDribbble, SiX, SiWhatsapp } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { scrollToSection } from "@/lib/scrollTo";

const WHATSAPP_URL = `https://wa.me/918218628232`;

const serviceLinks = [
  { label: "Website Design", section: "services" },
  { label: "Social Media", section: "services" },
  { label: "Brand Identity", section: "services" },
  { label: "SEO & Growth", section: "services" },
  { label: "Digital Strategy", section: "services" },
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
        {/* Top section */}
        <div className="py-10 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="relative flex-shrink-0"
                style={{ width: 38, height: 38, padding: 1.5, background: "linear-gradient(135deg, #8B6914 0%, #CAA353 55%, #F0C97A 100%)", borderRadius: 9, boxSizing: "border-box", boxShadow: "0 0 18px rgba(202,163,83,0.15)" }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: "#0c0c0e", borderRadius: 7 }}
                >
                  <span
                    className="font-black leading-none select-none"
                    style={{ fontSize: 11, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #CAA353, #F0C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    NE
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: "#F0C97A", boxShadow: "0 0 8px rgba(240,201,122,0.9)" }} />
              </div>
              <div className="flex flex-col leading-none gap-[4px]">
                <span className="font-black uppercase" style={{ fontSize: 13, letterSpacing: "0.13em", color: "#ffffff" }}>nextedge</span>
                <span className="font-bold uppercase" style={{ fontSize: 8, letterSpacing: "0.48em", color: "#CAA353" }}>tech</span>
              </div>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed max-w-xs mb-8">
              An elite digital studio for ambitious brands. We build websites and dominate social media for businesses that refuse to be ordinary.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: SiX, href: "https://x.com/nextedgedigital", label: "X (Twitter)" },
                { icon: SiInstagram, href: "https://instagram.com/nextedgedigital", label: "Instagram" },
                { icon: SiDribbble, href: "https://dribbble.com/nextedgedigital", label: "Dribbble" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-testid={`link-social-${label.toLowerCase().replace(/[^a-z]/g, "")}`}
                  className="w-11 h-11 md:w-9 md:h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4 md:w-3.5 md:h-3.5" />
                </a>
              ))}
              <a
                href="https://linkedin.com/company/nextedgedigital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                data-testid="link-social-linkedin"
                className="w-11 h-11 md:w-9 md:h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4 md:w-3.5 md:h-3.5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                data-testid="link-social-whatsapp"
                className="w-11 h-11 md:w-9 md:h-9 rounded-sm bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]/70 hover:text-[#25D366] hover:border-[#25D366]/60 hover:bg-[#25D366]/20 transition-all duration-300"
              >
                <SiWhatsapp className="w-4 h-4 md:w-3.5 md:h-3.5" />
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
            &copy; {new Date().getFullYear()} nextedgetech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
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
