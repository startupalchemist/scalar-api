import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import logoMark from "@assets/Asset_7@3x-8_1770967674840.png";
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
    label: "Hail Repair",
    children: [
      { label: "Hail Damage Repair", href: "/hail-damage-repair-dallas" },
      { label: "Paintless Dent Repair", href: "/paintless-dent-repair-dallas" },
      { label: "Storm Damage Restoration", href: "/storm-damage-restoration" },
      { label: "48-Hour Guarantee", href: "/48-hour-completion-guarantee" },
    ],
  },
  {
    label: "Insurance Help",
    children: [
      { label: "Claim Assistance", href: "/insurance-claim-assistance" },
      { label: "State Farm", href: "/state-farm-hail-claims" },
      { label: "GEICO", href: "/geico-hail-damage-repair" },
      { label: "Allstate", href: "/allstate-hail-claims" },
      { label: "Progressive", href: "/progressive-hail-repair" },
      { label: "USAA", href: "/usaa-hail-damage" },
      { label: "Farmers", href: "/farmers-hail-claims" },
      { label: "Liberty Mutual", href: "/liberty-mutual-hail-claims" },
    ],
  },
  {
    label: "Fleet Services",
    children: [
      { label: "Fleet Hail Repair", href: "/fleet-hail-repair" },
      { label: "Dealership Services", href: "/dealership-hail-services" },
      { label: "Commercial Fleet PDR", href: "/commercial-fleet-pdr" },
      { label: "Pre-Sale Touch Up", href: "/pre-sale-touch-up-services" },
    ],
  },
  {
    label: "Loaner & Pickup",
    children: [
      { label: "Free Loaner Vehicles", href: "/free-loaner-vehicles" },
      { label: "Pickup & Delivery", href: "/pickup-and-delivery-service" },
    ],
  },
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
        className="flex items-center gap-1 text-xs uppercase tracking-[0.15em] font-medium text-[#B3B3B8] hover:text-[#F5F5F7] transition-colors duration-300 cursor-pointer"
        data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {item.label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute top-full left-0 mt-2 min-w-[220px] bg-[#141416] border border-white/10 rounded-md overflow-hidden transition-all duration-200 ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
        }`}
        style={{ zIndex: 100 }}
      >
        {item.children?.map((child) => (
          <Link key={child.href} href={child.href}>
            <span
              className="block px-4 py-2.5 text-xs text-[#B3B3B8] hover:text-[#F5F5F7] hover:bg-white/5 transition-colors cursor-pointer"
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
        <span className="text-sm uppercase tracking-[0.15em] font-medium text-[#B3B3B8] block py-2 cursor-pointer">
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
              <span className="block py-1.5 text-xs text-[#B3B3B8]/70 hover:text-[#F5F5F7] cursor-pointer">
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

          <nav className="hidden lg:flex items-center gap-6" data-testid="nav-desktop">
            {navItems.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link key={item.label} href={item.href!}>
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
              )
            )}
            <Link href="/contact?utm_source=website&utm_medium=header_nav&utm_campaign=sitewide">
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
            className="lg:hidden text-[#F5F5F7] p-2"
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
          className="lg:hidden bg-[#0B0B0D]/98 backdrop-blur-xl border-t border-white/5 max-h-[80vh] overflow-y-auto"
          data-testid="nav-mobile"
        >
          <div className="px-6 py-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <MobileAccordion key={item.label} item={item} />
            ))}
            <Link href="/contact?utm_source=website&utm_medium=mobile_nav&utm_campaign=sitewide">
              <Button
                variant="default"
                className="bg-[#FF192C] text-white border-[#FF192C] w-full text-xs uppercase tracking-[0.15em] font-semibold mt-4"
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
