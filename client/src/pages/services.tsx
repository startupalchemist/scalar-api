import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Leaf, Home, Wrench, Sun, Trees, Square, Layers, Hammer, Package, Star, Zap, Shield, type LucideIcon } from "lucide-react";
import type { Service } from "@shared/schema";

const ICON_MAP: Record<string, LucideIcon> = {
  Leaf,
  Home,
  Wrench,
  Sun,
  Trees,
  Square,
  Layers,
  Hammer,
  Package,
  Star,
  Zap,
  Shield,
};

function ServiceIcon({ name, color }: { name: string; color: string }) {
  const Icon = ICON_MAP[name] ?? Wrench;
  return (
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}18` }}
    >
      <Icon className="w-7 h-7" style={{ color }} />
    </div>
  );
}

export default function Services() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services/public"],
  });

  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <div className="max-w-3xl mb-16 lg:mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">
            Our Services
          </span>
          <h1
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05]"
            style={{ fontFamily: "Poppins, sans-serif" }}
            data-testid="text-services-headline"
          >
            DFW's Premier<br />
            Renovation Experts
          </h1>
          <p className="mt-6 text-[#B3B3B8] text-lg leading-relaxed max-w-xl">
            Residential and commercial renovation services across the Dallas-Fort Worth metroplex. Every project starts with a free assessment.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl animate-pulse"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {services.map((service, i) => {
              const color = service.accentColor || "#5D3FD3";
              return (
                <div
                  key={service.id}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  data-testid={`card-service-${i}`}
                >
                  <div className="p-8 lg:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                      <ServiceIcon name={service.icon || "Wrench"} color={color} />

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h2
                            className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {service.title}
                          </h2>
                          {service.badge && (
                            <span
                              className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-sm border"
                              style={{ color, borderColor: `${color}40` }}
                            >
                              {service.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-[#B3B3B8] text-sm leading-relaxed mb-6 max-w-2xl">
                          {service.description}
                        </p>

                        {(service.keyDetails ?? []).length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                            {(service.keyDetails ?? []).map((d, j) => (
                              <div key={j} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                                <span className="text-[#B3B3B8]/75 text-xs leading-relaxed">{d}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link href="/contact?utm_source=website&utm_medium=service_card&utm_campaign=services">
                            <Button
                              className="text-white border-0 text-xs uppercase tracking-[0.12em] font-semibold px-6"
                              style={{ background: color }}
                              data-testid={`button-contact-service-${i}`}
                            >
                              Request Free Assessment
                            </Button>
                          </Link>
                          {service.slug && (
                            <Link href={service.slug}>
                              <Button
                                variant="ghost"
                                className="text-[#B3B3B8] hover:text-white border border-white/10 text-xs uppercase tracking-[0.12em] font-semibold px-6"
                                data-testid={`button-learn-service-${i}`}
                              >
                                Learn More <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-20 lg:mt-28 text-center">
          <p className="text-[#B3B3B8] text-lg mb-6">
            Not sure which service fits your project? Our team will help.
          </p>
          <Link href="/contact?utm_source=website&utm_medium=services_cta&utm_campaign=services">
            <Button
              className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-sm uppercase tracking-[0.15em] font-semibold px-12 py-6"
              data-testid="button-contact-services"
            >
              Book Free Assessment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
