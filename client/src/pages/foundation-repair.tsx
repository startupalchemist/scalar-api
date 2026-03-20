import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, CheckCircle2, ChevronRight } from "lucide-react";

const details = [
  "Thorough foundation inspection and structural diagnosis",
  "Pier and beam reinforcement and repair",
  "Slab foundation leveling and crack repair",
  "Drainage correction and soil stabilization",
  "Interior and exterior crack remediation",
  "Plumbing leak evaluation coordination",
  "Warranty-backed workmanship on all repairs",
  "Residential homes and commercial properties",
];

const signs = [
  "Diagonal cracks in interior walls",
  "Doors and windows sticking or not closing properly",
  "Uneven or sloped floors",
  "Gaps between walls and ceiling or floor",
  "Exterior brick cracks or separation",
  "Visible foundation cracking or heaving",
];

export default function FoundationRepair() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-5xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <div className="flex items-center gap-2 mb-8 text-[#B3B3B8]/40 text-xs">
          <Link href="/services"><span className="hover:text-white cursor-pointer transition-colors">Services</span></Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#B3B3B8]/70">Foundation Repair</span>
        </div>

        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
          style={{ background: "rgba(10,31,68,0.40)" }}>
          <Home className="w-7 h-7" style={{ color: "#4a6fa5" }} />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: "#4a6fa5" }}>
          Structural Solutions
        </span>
        <h1
          className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05]"
          style={{ fontFamily: "Poppins, sans-serif" }}
          data-testid="text-page-headline"
        >
          Foundation<br />Repair
        </h1>
        <p className="mt-6 text-[#B3B3B8] text-lg leading-relaxed max-w-2xl">
          North Texas's expansive clay soil creates unique and persistent foundation challenges. Reign Services delivers proven structural solutions that protect your property's value and ensure long-term stability for residential and commercial buildings throughout DFW.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/contact?utm_source=service_page&utm_medium=cta&utm_campaign=foundation-repair">
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

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-sm uppercase tracking-[0.2em] font-semibold text-[#F5F5F7] mb-5">What We Repair</h2>
            <div className="space-y-3">
              {details.map((d, i) => (
                <div key={i} className="flex items-start gap-3" data-testid={`detail-${i}`}>
                  <CheckCircle2 className="w-4 h-4 text-[#4a6fa5] flex-shrink-0 mt-0.5" />
                  <span className="text-[#B3B3B8]/80 text-sm leading-relaxed">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="p-7 rounded-xl"
            style={{
              background: "rgba(10,31,68,0.20)",
              border: "1px solid rgba(10,31,68,0.50)",
            }}
          >
            <h2 className="text-sm uppercase tracking-[0.2em] font-semibold text-[#F5F5F7] mb-5">Warning Signs</h2>
            <p className="text-[#B3B3B8]/70 text-xs mb-4">
              If you notice any of the following, schedule a free assessment immediately:
            </p>
            <div className="space-y-2.5">
              {signs.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#4a6fa5" }} />
                  <span className="text-[#B3B3B8]/75 text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-16 p-8 rounded-xl text-center"
          style={{
            background: "rgba(10,31,68,0.15)",
            border: "1px solid rgba(10,31,68,0.40)",
          }}
        >
          <p className="text-white text-lg font-semibold mb-2">Concerned about your foundation?</p>
          <p className="text-[#B3B3B8]/70 text-sm mb-6">
            Don't wait. Foundation issues worsen over time. Schedule a free assessment — our structural team will evaluate your property and provide honest guidance.
          </p>
          <Link href="/contact?utm_source=service_page&utm_medium=bottom_cta&utm_campaign=foundation-repair">
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
