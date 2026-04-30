import { SiInstagram, SiDribbble, SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card py-12 border-t border-white/10 relative z-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-sm" />
            <span className="text-xl font-bold tracking-tighter">NEXUS.</span>
          </div>
          
          <div className="flex items-center gap-6 text-foreground/60 text-sm">
            <a href="#" className="hover:text-primary transition-colors">Work</a>
            <a href="#" className="hover:text-primary transition-colors">Services</a>
            <a href="#" className="hover:text-primary transition-colors">Agency</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-white/10 transition-colors">
              <SiX className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-white/10 transition-colors">
              <SiInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-white/10 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-white/10 transition-colors">
              <SiDribbble className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-foreground/40 gap-4">
          <p>&copy; {new Date().getFullYear()} NEXUS Digital Agency. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground/80 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground/80 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
