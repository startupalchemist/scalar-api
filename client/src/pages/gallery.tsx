import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import type { GallerySection, GalleryItem } from "@shared/schema";

type GallerySectionWithItems = GallerySection & { items: GalleryItem[] };

const badgeColors: Record<string, string> = {
  "Before":      "bg-[#0A1F44]/90 text-white border border-white/20",
  "In Progress": "bg-amber-500/90 text-black border border-amber-400/40",
  "After":       "bg-[#5D3FD3]/90 text-white border border-[#5D3FD3]/40",
};

function MasonryGrid({ images }: { images: GalleryItem[] }) {
  return (
    <div className="columns-2 md:columns-3 gap-3">
      {images.map((img, i) => (
        <div key={img.id} className="break-inside-avoid mb-3" data-testid={`gallery-img-${i}`}>
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

function SpotlightSection({ section }: { section: GallerySectionWithItems }) {
  return (
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
        {section.items.map((img, i) => (
          <div key={img.id} className="relative rounded-xl overflow-hidden group" data-testid={`spotlight-img-${i}`}>
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-56 sm:h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {img.badge && (
              <span
                className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full ${badgeColors[img.badge] ?? "bg-white/20 text-white border border-white/30"}`}
              >
                {img.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function GenericSection({ section, index }: { section: GallerySectionWithItems; index: number }) {
  const isCustomPatterns = section.name === "Custom Patterns";
  const testId = `section-${section.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  if (isCustomPatterns) {
    return (
      <section className="mb-20 lg:mb-28" data-testid={testId}>
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
        <MasonryGrid images={section.items} />
      </section>
    );
  }

  const sectionLabels: Record<string, { label: string; title: string }> = {
    "Turf & Pavers":       { label: "Turf & Pavers",       title: "Pool Surrounds & Hardscaping" },
    "Putting Greens":      { label: "Putting Greens",      title: "Backyard & Property Greens" },
    "Sports & Commercial": { label: "Sports & Commercial", title: "Sports Fields & Large-Scale Installs" },
    "Outdoor Living":      { label: "Outdoor Living",      title: "Covered Spaces & Pergolas" },
    "Residential":         { label: "Residential",         title: "Front Yards, Playgrounds & More" },
  };
  const meta = sectionLabels[section.name] ?? { label: section.name, title: section.name };

  return (
    <section className="mb-20 lg:mb-28" data-testid={testId}>
      <SectionHeader label={meta.label} title={meta.title} />
      <MasonryGrid images={section.items} />
    </section>
  );
}

export default function Gallery() {
  const { data, isLoading } = useQuery<{ sections: GallerySectionWithItems[] }>({
    queryKey: ["/api/gallery"],
  });

  const sections = data?.sections ?? [];

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

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-[#5D3FD3] animate-spin" />
          </div>
        ) : (
          <>
            {sections.map((section, i) =>
              section.name === "Project Spotlight" ? (
                <SpotlightSection key={section.id} section={section} />
              ) : (
                <GenericSection key={section.id} section={section} index={i} />
              )
            )}
          </>
        )}

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
