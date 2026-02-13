import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Blog() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Dent Society Blog",
            description: "Expert insights on hail damage repair, paintless dent repair, insurance claims, and storm damage restoration in Dallas-Fort Worth.",
            url: "https://dentsociety.com/blog",
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-4">Blog</p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] uppercase tracking-tight leading-[1.05]"
            data-testid="text-blog-headline"
          >
            Insights and Expertise
          </h1>
          <p className="mt-4 text-[#B3B3B8] text-lg leading-relaxed">
            Technical knowledge, industry analysis, and storm season guidance from the Dent Society team.
          </p>
        </div>

        <div className="text-center py-20" data-testid="blog-empty-state">
          <p className="text-[#B3B3B8]/50 text-sm mb-6">Articles coming soon. Check back for expert insights on hail damage repair and insurance coordination.</p>
          <Link href="/contact">
            <Button
              className="bg-[#FF192C] text-white border-[#FF192C] text-xs uppercase tracking-[0.15em] font-semibold px-8"
              data-testid="button-blog-cta"
            >
              Start My Repair
            </Button>
          </Link>
        </div>

        <div className="mt-16 p-6 rounded-md bg-[#141416] border border-white/5">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8] font-semibold mb-4">Explore</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Hail Damage Repair", href: "/hail-damage-repair-dallas" },
              { label: "PDR vs Body Shop", href: "/pdr-vs-body-shop" },
              { label: "Insurance Claims", href: "/insurance-claim-assistance" },
              { label: "Repair Costs", href: "/how-much-does-hail-repair-cost" },
              { label: "Resale Value", href: "/how-hail-affects-resale-value" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-xs text-[#FF192C] hover:text-[#FF192C]/80 transition-colors cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
