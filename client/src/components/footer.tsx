import { Link } from "wouter";
import logoMark from "@assets/Asset_6_1770967674840.png";
import startupAlchemistLogo from "@assets/5C50E7C9-6986-4FB2-B8DC-A8BAA3D8D0D1_1771005924017.png";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const categoryLinks = [
  { label: "Service Areas", href: "/hail-repair-dallas" },
  { label: "Insurance Partners", href: "/insurance-claim-assistance" },
  { label: "Fleet & Commercial", href: "/fleet-hail-repair" },
  { label: "Resources", href: "/pdr-vs-body-shop" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0B0B0D]" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoMark} alt="Dent Society" className="h-8 w-auto opacity-40" />
              <span className="text-[#F5F5F7] font-semibold tracking-[0.2em] text-sm uppercase">
                Dent Society
              </span>
            </div>
            <p className="text-[#B3B3B8]/60 text-xs leading-relaxed max-w-xs">
              Precision restoration lab. Storm damage neutralization. Insurance coordination. Dallas-Fort Worth.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8] font-semibold mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span
                      className="text-[#B3B3B8]/60 hover:text-[#F5F5F7] text-xs transition-colors duration-300 cursor-pointer"
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
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8] font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {categoryLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span
                      className="text-[#B3B3B8]/60 hover:text-[#F5F5F7] text-xs transition-colors duration-300 cursor-pointer"
                      data-testid={`link-footer-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#B3B3B8]/40 text-xs tracking-wide">
              {new Date().getFullYear()} Dent Society. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/login">
                <span className="text-[#B3B3B8]/30 hover:text-[#B3B3B8]/60 text-xs tracking-wide transition-colors duration-300 cursor-pointer" data-testid="link-footer-login">
                  Admin
                </span>
              </Link>
              <p className="text-[#B3B3B8]/30 text-xs tracking-wide">
                Engineered, not improvised.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <img src={startupAlchemistLogo} alt="Startup Alchemist" className="h-4 w-4 opacity-30 invert" />
            <p className="text-[#B3B3B8]/30 text-[10px] tracking-wide">
              Site designed & maintained by Startup Alchemist
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
