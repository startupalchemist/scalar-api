import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import logoMark from "@assets/Asset_7@3x-8_1770967674840.png";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0B0D]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={logoMark}
                alt="Dent Society"
                className="h-8 lg:h-10 w-auto"
                data-testid="img-logo"
              />
              <span className="text-[#F5F5F7] font-semibold tracking-[0.2em] text-sm uppercase hidden sm:block">
                Dent Society
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-xs uppercase tracking-[0.15em] font-medium cursor-pointer transition-colors duration-300 ${
                    location === item.href
                      ? "text-[#FF192C]"
                      : "text-[#B3B3B8] hover:text-[#F5F5F7]"
                  }`}
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button
                variant="default"
                className="bg-[#FF192C] text-white border-[#FF192C] text-xs uppercase tracking-[0.15em] font-semibold px-6"
                data-testid="button-start-repair-header"
              >
                Start My Repair
              </Button>
            </Link>
          </nav>

          <button
            className="md:hidden text-[#F5F5F7] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden bg-[#0B0B0D]/98 backdrop-blur-xl border-t border-white/5"
          data-testid="nav-mobile"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-sm uppercase tracking-[0.15em] font-medium cursor-pointer block py-2 ${
                    location === item.href
                      ? "text-[#FF192C]"
                      : "text-[#B3B3B8]"
                  }`}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button
                variant="default"
                className="bg-[#FF192C] text-white border-[#FF192C] w-full text-xs uppercase tracking-[0.15em] font-semibold mt-2"
                data-testid="button-start-repair-mobile"
              >
                Start My Repair
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
