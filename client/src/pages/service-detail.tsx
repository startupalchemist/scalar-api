import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  ChevronRight, CheckCircle2, Leaf, Home, Wrench, Sun, Trees, Square,
  Layers, Hammer, Package, Star, Zap, Shield, type LucideIcon,
} from "lucide-react";
import type { Service } from "@shared/schema";
import NotFound from "@/pages/not-found";

const ICON_MAP: Record<string, LucideIcon> = {
  Leaf, Home, Wrench, Sun, Trees, Square, Layers, Hammer, Package, Star, Zap, Shield,
};

function ServiceIcon({ name, color }: { name: string; color: string }) {
  const Icon = ICON_MAP[name] ?? Wrench;
  return (
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
      style={{ background: `${color}18` }}
    >
      <Icon className="w-7 h-7" style={{ color }} />
    </div>
  );
}

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";

  const { data: service, isLoading, isError } = useQuery<Service>({
    queryKey: ["/api/services/by-slug", slug],
    queryFn: async () => {
      const res = await fetch(`/api/services/by-slug/${slug}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[#5D3FD3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !service) {
    return <NotFound />;
  }

  const color = service.accentColor || "#5D3FD3";
  const utmSlug = (service.slug || "").replace(/^\//, "");
  const ctaHref = `/contact?utm_source=website&utm_medium=service_detail&utm_campaign=${utmSlug}`;

  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-5xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">

        <div className="flex items-center gap-2 mb-8 text-[#B3B3B8]/40 text-xs">
          <Link href="/services">
            <span className="hover:text-white cursor-pointer transition-colors">Services</span>
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#B3B3B8]/70">{service.title}</span>
        </div>

        <ServiceIcon name={service.icon || "Wrench"} color={color} />

        {service.badge && (
          <span
            className="text-xs uppercase tracking-[0.3em] font-semibold"
            style={{ color }}
          >
            {service.badge}
          </span>
        )}

        <h1
          className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05]"
          style={{ fontFamily: "Poppins, sans-serif" }}
          data-testid="text-page-headline"
        >
          {service.title}
        </h1>

        {service.description && (
          <p className="mt-6 text-[#B3B3B8] text-lg leading-relaxed max-w-2xl">
            {service.description}
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href={ctaHref}>
            <Button
              className="text-white border-0 text-sm uppercase tracking-[0.15em] font-semibold px-10 py-5"
              style={{ background: color }}
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

        {(service.keyDetails ?? []).length > 0 && (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
            {(service.keyDetails ?? []).map((d, i) => (
              <div key={i} className="flex items-start gap-3" data-testid={`detail-${i}`}>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color }} />
                <span className="text-[#B3B3B8]/80 text-sm leading-relaxed">{d}</span>
              </div>
            ))}
          </div>
        )}

        <div
          className="mt-14 p-8 rounded-xl text-center"
          style={{
            background: `${color}10`,
            border: `1px solid ${color}30`,
          }}
        >
          <p className="text-white text-lg font-semibold mb-2">Ready to get started?</p>
          <p className="text-[#B3B3B8]/70 text-sm mb-6">
            Schedule your free on-site assessment. Our team serves all of Dallas-Fort Worth — residential and commercial.
          </p>
          <Link href={ctaHref}>
            <Button
              className="text-white border-0 text-xs uppercase tracking-[0.15em] font-semibold px-8"
              style={{ background: color }}
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
