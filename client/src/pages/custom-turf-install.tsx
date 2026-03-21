import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

const details = [
  "Comprehensive site assessment and custom layout design",
  "Professional topsoil and sod removal",
  "Engineered base and drainage installation",
  "Premium turf selection for Texas heat and climate",
  "15–20 year lifespan with minimal maintenance required",
  "Pet-safe and child-safe options available",
  "Edge treatment and finishing for a natural look",
  "Residential yards, commercial lawns, and rooftop applications",
];

const patternPhotos = [
  {
    src: "/gallery/pattern-diamond-factory.jpeg",
    caption: "Diamond-cut custom pattern",
  },
  {
    src: "/gallery/pattern-floral-wall.jpeg",
    caption: "Floral turf accent wall",
  },
  {
    src: "/gallery/pattern-circular-luxury.jpeg",
    caption: "Circular pattern on luxury estate",
  },
];

export default function CustomTurfInstall() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-5xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">

        <div className="flex items-center gap-2 mb-8 text-[#B3B3B8]/40 text-xs">
          <Link href="/services">
            <span className="hover:text-white cursor-pointer transition-colors">Services</span>
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#B3B3B8]/70">Custom Turf Design & Install</span>
        </div>

        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
          style={{ background: "rgba(93,63,211,0.15)" }}
        >
          <Leaf className="w-7 h-7 text-[#5D3FD3]" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">
          Residential & Commercial
        </span>
        <h1
          className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05]"
          style={{ fontFamily: "Poppins, sans-serif" }}
          data-testid="text-page-headline"
        >
          Custom Turf<br />Design & Install
        </h1>
        <p className="mt-6 text-[#B3B3B8] text-lg leading-relaxed max-w-2xl">
          Bespoke artificial turf installations for residential yards, commercial properties, and specialty applications across the Dallas-Fort Worth metroplex. Full design, engineering, and professional installation — by Reign Services.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/contact?utm_source=service_page&utm_medium=cta&utm_campaign=custom-turf-install">
            <Button
              className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-sm uppercase tracking-[0.15em] font-semibold px-10 py-5"
              data-testid="button-assessment-cta"
            >
              Book Free Assessment
            </Button>
          </Link>
          <Link href="/gallery">
            <Button
              variant="ghost"
              className="text-[#B3B3B8] hover:text-white border border-white/10 text-sm uppercase tracking-[0.12em] font-semibold px-8 py-5"
            >
              View Our Work
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

        <div className="mt-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">
            Custom Pattern Gallery
          </span>
          <h2
            className="mt-3 text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Beyond Standard Turf
          </h2>
          <p className="mt-3 text-[#B3B3B8]/70 text-sm leading-relaxed max-w-xl">
            From geometric cuts to intricate floral designs — custom pattern turf is made to order for clients who want something truly one-of-a-kind.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {patternPhotos.map((photo, i) => (
              <div key={i} className="rounded-xl overflow-hidden" data-testid={`pattern-photo-${i}`}>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-52 object-cover"
                />
                <p className="mt-2 text-xs text-[#B3B3B8]/50 text-center tracking-wide">{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-12 p-8 rounded-xl relative overflow-hidden"
          style={{
            background: "rgba(93,63,211,0.06)",
            border: "1px solid rgba(93,63,211,0.25)",
          }}
          data-testid="section-custom-patterns-upsell"
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(93,63,211,0.4) 0%, transparent 70%)" }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#5D3FD3]/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#5D3FD3]" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#5D3FD3] font-semibold">
                Upsell Add-On
              </span>
            </div>
            <h3
              className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Take It Further —<br />Custom Pattern Turf
            </h3>
            <p className="mt-4 text-[#B3B3B8]/80 text-sm leading-relaxed max-w-2xl">
              Want something truly bespoke? Our custom pattern turf is made to order — geometric cuts, floral designs, branded logo inlays, and architectural patterns. Available for residential showpieces, commercial properties, hospitality spaces, and brand activations across DFW.
            </p>
            <div
              className="mt-5 inline-flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{
                background: "rgba(93,63,211,0.12)",
                border: "1px solid rgba(93,63,211,0.25)",
              }}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#5D3FD3] font-semibold">Pricing Guide</span>
              <span className="text-white text-sm font-semibold">Starting around $20–$25 per sq ft</span>
              <span className="text-[#B3B3B8]/50 text-xs">— quoted per project</span>
            </div>
            <p className="mt-3 text-xs text-[#B3B3B8]/40 leading-relaxed">
              Custom pattern pricing varies by design complexity, order size, and material. Final quotes are confirmed at assessment.
            </p>
            <div className="mt-6">
              <Link href="/contact?utm_source=service_page&utm_medium=custom_patterns_cta&utm_campaign=custom-turf-install">
                <Button
                  className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-xs uppercase tracking-[0.15em] font-semibold px-8"
                  data-testid="button-custom-patterns-cta"
                >
                  Request a Custom Pattern Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-10 p-8 rounded-xl text-center"
          style={{
            background: "rgba(93,63,211,0.08)",
            border: "1px solid rgba(93,63,211,0.20)",
          }}
        >
          <p className="text-white text-lg font-semibold mb-2">Ready to transform your outdoor space?</p>
          <p className="text-[#B3B3B8]/70 text-sm mb-6">
            Schedule your free on-site assessment. Our team will evaluate your property and deliver a detailed proposal with transparent pricing.
          </p>
          <Link href="/contact?utm_source=service_page&utm_medium=bottom_cta&utm_campaign=custom-turf-install">
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
