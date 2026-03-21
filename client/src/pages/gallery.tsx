import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  badge?: string;
}

const spotlight: GalleryImage[] = [
  { src: "/gallery/spotlight-before-1.jpeg",   alt: "Before: bare patchy backyard",               badge: "Before" },
  { src: "/gallery/spotlight-progress-1.jpeg",  alt: "In Progress: gravel base and edging laid",   badge: "In Progress" },
  { src: "/gallery/spotlight-after-1.jpeg",     alt: "After: lush turf with rock border",           badge: "After" },
  { src: "/gallery/spotlight-after-2.jpeg",     alt: "After: turf with flagstone and planter boxes",badge: "After" },
  { src: "/gallery/spotlight-after-3.jpeg",     alt: "After: flagstone patio and turf, tree feature",badge: "After" },
  { src: "/gallery/spotlight-after-4.jpeg",     alt: "After: golden hour full reveal",              badge: "After" },
];

const badgeColors: Record<string, string> = {
  "Before":      "bg-[#0A1F44]/90 text-white border border-white/20",
  "In Progress": "bg-amber-500/90 text-black border border-amber-400/40",
  "After":       "bg-[#5D3FD3]/90 text-white border border-[#5D3FD3]/40",
};

const turfPavers: GalleryImage[] = [
  { src: "/gallery/pool-stepping-stones.webp",   alt: "Pool with turf and stepping stones" },
  { src: "/gallery/pool-diamond-pavers.webp",    alt: "Pool with diamond turf and paver surround" },
  { src: "/gallery/outdoor-kitchen-pavers.webp", alt: "Covered outdoor kitchen with fire pit and pavers" },
  { src: "/gallery/firepit-pavers-night.webp",   alt: "Fire pit with turf grid at night" },
  { src: "/gallery/aerial-pool-turf-1.jpeg",     alt: "Aerial view: pool with turf and paver install" },
  { src: "/gallery/aerial-pool-turf-2.jpeg",     alt: "Aerial view: pool and turf backyard" },
  { src: "/gallery/aerial-pool-turf-3.jpeg",     alt: "Aerial view: full turf backyard with pool" },
  { src: "/gallery/aerial-pool-turf-4.jpeg",     alt: "Aerial view: modern pool with turf and fire pit" },
];

const customPatterns: GalleryImage[] = [
  { src: "/gallery/pattern-diamond-factory.jpeg", alt: "Custom diamond-cut turf pattern" },
  { src: "/gallery/pattern-floral-wall.jpeg",     alt: "Custom floral turf accent wall" },
  { src: "/gallery/pattern-circular-luxury.jpeg", alt: "Custom circular pattern on luxury estate" },
];

const puttingGreens: GalleryImage[] = [
  { src: "/gallery/putting-green-aerial-1.jpeg",  alt: "Aerial view: multi-hole putting green" },
  { src: "/gallery/putting-green-aerial-2.jpeg",  alt: "Aerial view: putting green alternate angle" },
  { src: "/gallery/putting-green-gazebo.jpeg",    alt: "Putting green with backyard gazebo" },
  { src: "/gallery/putting-green-side-yard.jpeg", alt: "Dual putting green in side yard" },
];

const sports: GalleryImage[] = [
  { src: "/gallery/sports-mini-soccer.jpeg",      alt: "Backyard mini soccer field with turf" },
  { src: "/gallery/sports-commercial-soccer.jpeg",alt: "Full indoor commercial soccer field" },
];

const outdoorLiving: GalleryImage[] = [
  { src: "/gallery/outdoor-living-pergola.jpeg",  alt: "Modern pergola with outdoor seating" },
];

const residential: GalleryImage[] = [
  { src: "/gallery/residential-playground.jpeg",  alt: "Children's playground on artificial turf" },
  { src: "/gallery/residential-frontyard.jpeg",   alt: "Clean front yard turf and pavers, aerial view" },
];

function MasonryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="columns-2 md:columns-3 gap-3">
      {images.map((img, i) => (
        <div key={i} className="break-inside-avoid mb-3" data-testid={`gallery-img-${i}`}>
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="w-full rounded-lg object-cover transition-opacity duration-300"
            style={{ display: "block" }}
          />
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ label, title, callout }: { label: string; title: string; callout?: string }) {
  return (
    <div className="mb-8">
      <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">{label}</span>
      <h2
        className="mt-2 text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {title}
      </h2>
      {callout && (
        <p className="mt-2 text-sm text-[#B3B3B8]/70">{callout}</p>
      )}
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">

        <div className="mb-16 lg:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">Our Work</span>
          <h1
            className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05]"
            style={{ fontFamily: "Poppins, sans-serif" }}
            data-testid="text-gallery-headline"
          >
            Real Projects.<br />Real Results.
          </h1>
          <p className="mt-5 text-[#B3B3B8] text-lg max-w-2xl leading-relaxed">
            A look at what we build across Dallas-Fort Worth — from backyard transformations to commercial installations.
          </p>
        </div>

        <section className="mb-20 lg:mb-28" data-testid="section-spotlight">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">Project Spotlight</span>
              <h2
                className="mt-2 text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Residential Turf + Outdoor Living Transformation
              </h2>
              <p className="mt-2 text-sm text-[#B3B3B8]/70">
                A complete backyard transformation — from bare dirt to a finished outdoor living space.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {spotlight.map((img, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden group" data-testid={`spotlight-img-${i}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-56 sm:h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {img.badge && (
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full ${badgeColors[img.badge]}`}
                  >
                    {img.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20 lg:mb-28" data-testid="section-turf-pavers">
          <SectionHeader label="Turf & Pavers" title="Pool Surrounds & Hardscaping" />
          <MasonryGrid images={turfPavers} />
        </section>

        <section className="mb-20 lg:mb-28" data-testid="section-custom-patterns">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">Custom Patterns</span>
              <h2
                className="mt-2 text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Made-to-Order Turf Design
              </h2>
              <p className="mt-2 text-sm text-[#B3B3B8]/70">
                Geometric, floral, branded logos, and more — every pattern is quoted individually.{" "}
                <Link href="/contact?utm_source=gallery&utm_medium=patterns_inline_cta">
                  <span className="text-[#5D3FD3] hover:text-white transition-colors cursor-pointer">Request a free estimate.</span>
                </Link>
              </p>
            </div>
          </div>
          <MasonryGrid images={customPatterns} />
        </section>

        <section className="mb-20 lg:mb-28" data-testid="section-putting-greens">
          <SectionHeader label="Putting Greens" title="Backyard & Property Greens" />
          <MasonryGrid images={puttingGreens} />
        </section>

        <section className="mb-20 lg:mb-28" data-testid="section-sports">
          <SectionHeader label="Sports & Commercial" title="Sports Fields & Large-Scale Installs" />
          <MasonryGrid images={sports} />
        </section>

        <section className="mb-20 lg:mb-28" data-testid="section-outdoor-living">
          <SectionHeader label="Outdoor Living" title="Covered Spaces & Pergolas" />
          <MasonryGrid images={outdoorLiving} />
        </section>

        <section className="mb-20 lg:mb-28" data-testid="section-residential">
          <SectionHeader label="Residential" title="Front Yards, Playgrounds & More" />
          <MasonryGrid images={residential} />
        </section>

        <div
          className="mt-4 p-10 rounded-2xl text-center relative overflow-hidden"
          style={{
            background: "rgba(93,63,211,0.08)",
            border: "1px solid rgba(93,63,211,0.20)",
          }}
          data-testid="section-gallery-cta"
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(93,63,211,0.25) 0%, transparent 70%)" }}
          />
          <div className="relative">
            <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">Get Started</span>
            <h2
              className="mt-3 text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-[#B3B3B8] text-base leading-relaxed max-w-xl mx-auto">
              Every project starts with a free on-site assessment. Our team evaluates your space, answers your questions, and delivers a clear proposal — no obligation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact?utm_source=gallery&utm_medium=bottom_cta">
                <Button
                  className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-sm uppercase tracking-[0.15em] font-semibold px-10 py-5"
                  data-testid="button-gallery-cta"
                >
                  Book Free Assessment
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="ghost"
                  className="text-[#B3B3B8] hover:text-white border border-white/10 text-sm uppercase tracking-[0.12em] font-semibold px-8 py-5"
                >
                  Explore Services <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
