import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function useContactUrl() {
  const [location] = useLocation();
  const slug = location.replace(/^\//, "") || "homepage";
  return `/contact?utm_source=website&utm_medium=seo_page&utm_campaign=${encodeURIComponent(slug)}`;
}

interface FAQItem {
  q: string;
  a: string;
}

interface InternalLink {
  label: string;
  href: string;
}

interface ComparisonRow {
  feature: string;
  optionA: string;
  optionB: string;
}

function FAQAccordion({ items, schemaId }: { items: FAQItem[]; schemaId?: string }) {
  return (
    <div data-testid={schemaId || "faq-section"}>
      {items.map((item, i) => (
        <FAQAccordionItem key={i} q={item.q} a={item.a} index={i} />
      ))}
    </div>
  );
}

function FAQAccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        data-testid={`button-faq-${index}`}
      >
        <span className="text-sm text-[#111111] font-medium pr-8">{q}</span>
        <ChevronDown className={`w-4 h-4 text-[#555558]/50 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-5 pr-12">
          <p className="text-[#555558]/80 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

function MidCTA() {
  const contactUrl = useContactUrl();
  return (
    <div className="my-12 p-8 rounded-md bg-[#F0F0F0] border border-black/10 text-center" data-testid="cta-mid">
      <p className="text-[#111111] font-semibold text-lg mb-2">Ready to get started</p>
      <p className="text-[#555558]/70 text-sm mb-6">Schedule your inspection today. No obligation.</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href={contactUrl}>
          <Button className="bg-[#FF192C] text-white border-[#FF192C] text-xs uppercase tracking-[0.15em] font-semibold px-8" data-testid="button-cta-mid-repair">
            Start My Repair
          </Button>
        </Link>
        <Link href="/insurance-claim-assistance">
          <Button variant="outline" className="text-xs uppercase tracking-[0.15em] font-semibold px-8 border-black/15 text-[#555558]" data-testid="button-cta-mid-claim">
            Begin Claim Coordination
          </Button>
        </Link>
      </div>
    </div>
  );
}

function BottomCTA() {
  const contactUrl = useContactUrl();
  return (
    <div className="mt-16 text-center" data-testid="cta-bottom">
      <p className="text-[#555558]/60 text-xs uppercase tracking-[0.2em] mb-3">Schedule your inspection today</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href={contactUrl}>
          <Button className="bg-[#FF192C] text-white border-[#FF192C] text-xs uppercase tracking-[0.15em] font-semibold px-10" data-testid="button-cta-bottom-repair">
            Start My Repair
          </Button>
        </Link>
      </div>
      <p className="mt-4 text-[#555558]/40 text-xs">48-hour completion begins after insurance approval.</p>
    </div>
  );
}

function InternalLinks({ links }: { links: InternalLink[] }) {
  return (
    <div className="mt-12 p-6 rounded-md bg-[#F0F0F0] border border-black/10">
      <h3 className="text-xs uppercase tracking-[0.2em] text-[#555558] font-semibold mb-4">Related</h3>
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <span className="text-xs text-[#FF192C] hover:text-[#FF192C]/80 transition-colors cursor-pointer">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ComparisonTable({ headers, rows }: { headers: [string, string]; rows: ComparisonRow[] }) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-sm" data-testid="comparison-table">
        <thead>
          <tr className="border-b border-black/10">
            <th className="text-left py-3 px-4 text-[#555558]/60 font-medium text-xs uppercase tracking-wider">Feature</th>
            <th className="text-left py-3 px-4 text-[#FF192C] font-semibold text-xs uppercase tracking-wider">{headers[0]}</th>
            <th className="text-left py-3 px-4 text-[#555558]/60 font-medium text-xs uppercase tracking-wider">{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-black/6">
              <td className="py-3 px-4 text-[#111111] text-sm">{row.feature}</td>
              <td className="py-3 px-4 text-[#555558]/80 text-sm">{row.optionA}</td>
              <td className="py-3 px-4 text-[#555558]/60 text-sm">{row.optionB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SchemaMarkup({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface SEOPageProps {
  badge: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  faq?: FAQItem[];
  internalLinks?: InternalLink[];
  midCTA?: boolean;
  schema?: object;
  slug?: string;
}

function SEOPageLayout({ badge, title, subtitle, children, faq, internalLinks, midCTA = true, schema }: SEOPageProps) {
  return (
    <div className="bg-background min-h-screen pt-24 lg:pt-32">
      {schema && <SchemaMarkup schema={schema} />}
      <article className="max-w-4xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-4">{badge}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] uppercase tracking-tight leading-[1.05]" data-testid="text-page-headline">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-[#555558] text-lg leading-relaxed max-w-2xl">{subtitle}</p>
          )}
        </header>

        <div className="prose-dent">{children}</div>

        {midCTA && <MidCTA />}

        {faq && faq.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-[#111111] uppercase tracking-tight mb-8">Frequently Asked Questions</h2>
            <FAQAccordion items={faq} />
          </section>
        )}

        {internalLinks && <InternalLinks links={internalLinks} />}

        <BottomCTA />
      </article>
    </div>
  );
}

export {
  SEOPageLayout,
  MidCTA,
  BottomCTA,
  FAQAccordion,
  InternalLinks,
  ComparisonTable,
  SchemaMarkup,
};
export type { FAQItem, InternalLink, ComparisonRow };
