import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sun, CheckCircle2, ChevronRight } from "lucide-react";

const details = [
  "Custom deck and patio design and construction",
  "Pergola, gazebo, and shade structure installation",
  "Privacy fencing and decorative border installation",
  "Exterior paint, siding, and facade upgrades",
  "Outdoor lighting system design and installation",
  "Retaining walls and grading solutions",
  "Permit management and HOA coordination",
  "Designed and engineered for DFW climate",
];

export default function OutdoorRemodeling() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-5xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <div className="flex items-center gap-2 mb-8 text-[#B3B3B8]/40 text-xs">
          <Link href="/services"><span className="hover:text-white cursor-pointer transition-colors">Services</span></Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#B3B3B8]/70">Outdoor Remodeling</span>
        </div>

        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
          style={{ background: "rgba(10,31,68,0.40)" }}>
          <Sun className="w-7 h-7" style={{ color: "#4a6fa5" }} />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: "#4a6fa5" }}>
          Exterior Upgrades
        </span>
        <h1
          className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05]"
          style={{ fontFamily: "Poppins, sans-serif" }}
          data-testid="text-page-headline"
        >
          Outdoor<br />Remodeling
        </h1>
        <p className="mt-6 text-[#B3B3B8] text-lg leading-relaxed max-w-2xl">
          Transform your property's exterior into a functional, beautiful extension of your lifestyle. From deck construction and patio redesigns to pergolas, fencing, and full outdoor overhauls — Reign Services builds outdoor spaces that DFW homeowners and commercial clients are proud of.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/contact?utm_source=service_page&utm_medium=cta&utm_campaign=outdoor-remodeling">
            <Button
              className="text-white border-0 text-sm uppercase tracking-[0.15em] font-semibold px-10 py-5"
              style={{ background: "#0A1F44" }}
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
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#4a6fa5" }} />
              <span className="text-[#B3B3B8]/80 text-sm leading-relaxed">{d}</span>
            </div>
          ))}
        </div>

        <div
          className="mt-16 p-8 rounded-xl text-center"
          style={{
            background: "rgba(10,31,68,0.15)",
            border: "1px solid rgba(10,31,68,0.40)",
          }}
        >
          <p className="text-white text-lg font-semibold mb-2">Ready to elevate your exterior?</p>
          <p className="text-[#B3B3B8]/70 text-sm mb-6">
            Schedule a free on-site assessment. Our team will evaluate your outdoor space and deliver a clear, detailed proposal.
          </p>
          <Link href="/contact?utm_source=service_page&utm_medium=bottom_cta&utm_campaign=outdoor-remodeling">
            <Button
              className="text-white border-0 text-xs uppercase tracking-[0.15em] font-semibold px-8"
              style={{ background: "#0A1F44" }}
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
