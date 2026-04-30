import { SiInstagram, SiDribbble, SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";

const links = {
  services: [
    "Website Design",
    "Social Media",
    "Brand Identity",
    "SEO & Growth",
    "Digital Strategy",
  ],
  company: ["About Us", "Our Work", "Process", "Careers", "Contact"],
};

export function Footer() {
  return (
    <footer className="bg-card/30 border-t border-white/5 relative z-10">
      <div className="container px-4 md:px-6">
        {/* Top section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary rounded-sm rotate-6" />
                <span className="relative text-xs font-black text-primary-foreground tracking-tighter leading-none">NE</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-widest uppercase text-foreground">Next Edge</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">Digital</span>
              </div>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed max-w-xs mb-8">
              An elite digital studio for ambitious brands. We build websites and dominate social media for businesses that refuse to be ordinary.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: SiX, href: "#", label: "X (Twitter)" },
                { icon: SiInstagram, href: "#", label: "Instagram" },
                { icon: SiDribbble, href: "#", label: "Dribbble" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  data-testid={`link-social-${label.toLowerCase().replace(/[^a-z]/g, "")}`}
                  className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
              <a
                href="#"
                aria-label="LinkedIn"
                data-testid="link-social-linkedin"
                className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/30 mb-6">Services</h4>
            <ul className="space-y-3">
              {links.services.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-foreground/50 hover:text-primary transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/30 mb-6">Company</h4>
            <ul className="space-y-3">
              {links.company.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-foreground/50 hover:text-primary transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-foreground/25 tracking-wide">
            &copy; {new Date().getFullYear()} Next Edge Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-[11px] text-foreground/25 hover:text-foreground/50 transition-colors tracking-wide">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
