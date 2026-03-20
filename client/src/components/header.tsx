import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import logoMark from "@assets/IMG_4743_1773978350169.png";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: "Services",
    children: [
      { label: "Custom Turf Design & Install", href: "/custom-turf-install" },
      { label: "Foundation Repair", href: "/foundation-repair" },
      { label: "Interior Remodeling", href: "/interior-remodeling" },
      { label: "Outdoor Remodeling", href: "/outdoor-remodeling" },
      { label: "Outdoor Living Spaces", href: "/outdoor-living" },
      { label: "Turf & Pavers", href: "/turf-and-pavers" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="flex items-center gap-1 text-xs uppercase tracking-[0.15em] font-medium text-[#B3B3B8] hover:text-white transition-colors duration-300 cursor-pointer"
        data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {item.label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute top-full left-0 mt-2 min-w-[260px] rounded-md overflow-hidden shadow-xl transition-all duration-200 ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
        }`}
        style={{
          zIndex: 100,
          background: "rgba(11, 11, 18, 0.95)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        {item.children?.map((child) => (
          <Link key={child.href} href={child.href}>
            <span
              className="block px-4 py-2.5 text-xs text-[#B3B3B8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              data-testid={`link-dropdown-${child.href.replace(/\//g, "").replace(/-/g, "-")}`}
            >
              {child.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileAccordion({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link href={item.href!}>
        <span className="text-sm uppercase tracking-[0.15em] font-medium text-[#B3B3B8] hover:text-white block py-2 cursor-pointer transition-colors">
          {item.label}
        </span>
      </Link>
    );
  }

  return (
    <div>
      <button
        className="flex items-center justify-between w-full text-sm uppercase tracking-[0.15em] font-medium text-[#B3B3B8] py-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pl-4 pb-2">
          {item.children.map((child) => (
            <Link key={child.href} href={child.href}>
              <span className="block py-1.5 text-xs text-[#B3B3B8]/70 hover:text-white cursor-pointer transition-colors">
                {child.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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
          ? "border-b border-white/8"
          : "bg-transparent"
      }`}
      style={scrolled ? {
        background: "rgba(11, 11, 18, 0.90)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={logoMark}
                alt="Reign Services"
                className="h-10 lg:h-12 w-auto"
                data-testid="img-logo"
              />
              <span className="text-white font-bold tracking-[0.18em] text-sm uppercase hidden sm:block"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                Reign Services
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6" data-testid="nav-desktop">
            {navItems.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link key={item.label} href={item.href!}>
                  <span
                    className={`text-xs uppercase tracking-[0.15em] font-medium cursor-pointer transition-colors duration-300 ${
                      location === item.href
                        ? "text-[#5D3FD3]"
                        : "text-[#B3B3B8] hover:text-white"
                    }`}
                    data-testid={`link-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            )}
            <Link href="/contact?utm_source=website&utm_medium=header_nav&utm_campaign=sitewide">
              <Button
                variant="default"
                className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-xs uppercase tracking-[0.15em] font-semibold px-6"
                data-testid="button-book-assessment-header"
              >
                Book Free Assessment
              </Button>
            </Link>
          </nav>

          <button
            className="lg:hidden text-white p-2"
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
          className="lg:hidden border-t border-white/8 max-h-[80vh] overflow-y-auto"
          style={{
            background: "rgba(11, 11, 18, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
          data-testid="nav-mobile"
        >
          <div className="px-6 py-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <MobileAccordion key={item.label} item={item} />
            ))}
            <Link href="/contact?utm_source=website&utm_medium=mobile_nav&utm_campaign=sitewide">
              <Button
                variant="default"
                className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 w-full text-xs uppercase tracking-[0.15em] font-semibold mt-4"
                data-testid="button-book-assessment-mobile"
              >
                Book Free Assessment
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
