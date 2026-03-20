import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Trees, CheckCircle2, ChevronRight } from "lucide-react";

const details = [
  "Custom outdoor kitchen design and build",
  "Covered living pavilions and pergola systems",
  "Fire pits, fireplaces, and custom fire features",
  "Water features: fountains, ponds, and pondless waterfalls",
  "Entertainment system and outdoor AV integration",
  "Ambient and task lighting design",
  "Custom furniture and built-in seating",
  "Residential estates and commercial hospitality venues",
];

export default function OutdoorLiving() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-5xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <div className="flex items-center gap-2 mb-8 text-[#B3B3B8]/40 text-xs">
          <Link href="/services"><span className="hover:text-white cursor-pointer transition-colors">Services</span></Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#B3B3B8]/70">Bespoke Outdoor Living Spaces</span>
        </div>

        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
          style={{ background: "rgba(93,63,211,0.15)" }}>
          <Trees className="w-7 h-7 text-[#5D3FD3]" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">
          Premium Outdoor Environments
        </span>
        <h1
          className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05]"
          style={{ fontFamily: "Poppins, sans-serif" }}
          data-testid="text-page-headline"
        >
          Bespoke<br />Outdoor Living
        </h1>
        <p className="mt-6 text-[#B3B3B8] text-lg leading-relaxed max-w-2xl">
          Our signature service. Reign Services designs and builds fully custom outdoor living environments — from outdoor kitchens and covered pavilions to fire features, water elements, and entertainment systems. Every project is designed from scratch and built to your vision, engineered to last.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/contact?utm_source=service_page&utm_medium=cta&utm_campaign=outdoor-living">
            <Button
              className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-sm uppercase tracking-[0.15em] font-semibold px-10 py-5"
              data-testid="button-assessment-cta"
            >
              Book Free Assessment
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="ghost" className="text-[#B3B3B8] hover:text-white border border-white/10 text-sm uppercase tracking-[0.12em] font-semibold px-8 py-5">
              All Services
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          {details.map((d, i) => (
            <div key={i} className="flex items-start gap-3" data-testid={`detail-${i}`}>
              <CheckCircle2 className="w-4 h-4 text-[#5D3FD3] flex-shrink-0 mt-0.5" />
              <span className="text-[#B3B3B8]/80 text-sm leading-relaxed">{d}</span>
            </div>
          ))}
        </div>

        <div
          className="mt-16 p-8 rounded-xl text-center"
          style={{
            background: "rgba(93,63,211,0.08)",
            border: "1px solid rgba(93,63,211,0.20)",
          }}
        >
          <p className="text-white text-lg font-semibold mb-2">Ready to build your dream outdoor space?</p>
          <p className="text-[#B3B3B8]/70 text-sm mb-6">
            Every bespoke outdoor living project begins with a free consultation. Tell us your vision — we'll handle the rest.
          </p>
          <Link href="/contact?utm_source=service_page&utm_medium=bottom_cta&utm_campaign=outdoor-living">
            <Button
              className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-xs uppercase tracking-[0.15em] font-semibold px-8"
              data-testid="button-bottom-cta"
            >
              Request Free Assessment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
