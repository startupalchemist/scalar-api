import { Link } from "wouter";
import logoMark from "@assets/Asset_6_1770967674840.png";

const serviceLinks = [
  { label: "Hail Damage Repair", href: "/hail-damage-repair-dallas" },
  { label: "Paintless Dent Repair", href: "/paintless-dent-repair-dallas" },
  { label: "Insurance Claim Help", href: "/insurance-claim-assistance" },
  { label: "Free Loaner Vehicles", href: "/free-loaner-vehicles" },
  { label: "Pickup & Delivery", href: "/pickup-and-delivery-service" },
  { label: "48-Hour Guarantee", href: "/48-hour-completion-guarantee" },
  { label: "Storm Damage", href: "/storm-damage-restoration" },
  { label: "Fleet Services", href: "/fleet-hail-repair" },
];

const locationLinks = [
  { label: "Dallas", href: "/hail-repair-dallas" },
  { label: "Plano", href: "/hail-repair-plano" },
  { label: "Frisco", href: "/hail-repair-frisco" },
  { label: "Fort Worth", href: "/hail-repair-fort-worth" },
  { label: "Arlington", href: "/hail-repair-arlington" },
  { label: "Denton", href: "/hail-repair-denton" },
  { label: "McKinney", href: "/hail-repair-mckinney" },
  { label: "Irving", href: "/hail-repair-irving" },
  { label: "Garland", href: "/hail-repair-garland" },
];

const insuranceLinks = [
  { label: "State Farm", href: "/state-farm-hail-claims" },
  { label: "GEICO", href: "/geico-hail-damage-repair" },
  { label: "Allstate", href: "/allstate-hail-claims" },
  { label: "Progressive", href: "/progressive-hail-repair" },
  { label: "USAA", href: "/usaa-hail-damage" },
  { label: "Farmers", href: "/farmers-hail-claims" },
  { label: "Liberty Mutual", href: "/liberty-mutual-hail-claims" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function FooterLinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8] font-semibold mb-4">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <span
                className="text-[#B3B3B8]/60 hover:text-[#F5F5F7] text-xs transition-colors duration-300 cursor-pointer"
                data-testid={`link-footer-${item.href.replace(/\//g, "").replace(/-/g, "-")}`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0B0B0D]" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
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

          <FooterLinkColumn title="Services" links={serviceLinks} />
          <FooterLinkColumn title="Service Areas" links={locationLinks} />
          <FooterLinkColumn title="Insurance" links={insuranceLinks} />
          <FooterLinkColumn title="Company" links={companyLinks} />

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8] font-semibold mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {[
                { label: "PDR vs Body Shop", href: "/pdr-vs-body-shop" },
                { label: "Hail Repair Cost", href: "/how-much-does-hail-repair-cost" },
                { label: "Resale Value Impact", href: "/how-hail-affects-resale-value" },
                { label: "Insurance Supplements", href: "/what-is-insurance-supplement" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-[#B3B3B8]/60 hover:text-[#F5F5F7] text-xs transition-colors duration-300 cursor-pointer">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
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
