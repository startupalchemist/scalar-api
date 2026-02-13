import { Link } from "wouter";
import logoMark from "@assets/Asset_6_1770967674840.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0B0B0D]" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoMark} alt="Dent Society" className="h-8 w-auto opacity-40" />
              <span className="text-[#F5F5F7] font-semibold tracking-[0.2em] text-sm uppercase">
                Dent Society
              </span>
            </div>
            <p className="text-[#B3B3B8] text-sm leading-relaxed max-w-sm">
              Precision restoration lab. Storm damage neutralization. Insurance coordination.
            </p>
            <p className="text-[#B3B3B8]/50 text-xs mt-6 tracking-wide">
              Hail happens. We remove the evidence.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8] font-semibold mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Services", href: "/services" },
                { label: "About", href: "/about" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span
                      className="text-[#B3B3B8]/70 hover:text-[#F5F5F7] text-sm transition-colors duration-300 cursor-pointer"
                      data-testid={`link-footer-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8] font-semibold mb-6">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#B3B3B8]/70">
              <li>Dallas, Texas</li>
              <li>By Appointment</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#B3B3B8]/40 text-xs tracking-wide">
            {new Date().getFullYear()} Dent Society. All rights reserved.
          </p>
          <p className="text-[#B3B3B8]/30 text-xs tracking-wide">
            Engineered, not improvised.
          </p>
        </div>
      </div>
    </footer>
  );
}
