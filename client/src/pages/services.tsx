import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, Home, Wrench, Sun, Trees, Square, ChevronRight } from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Custom Turf Design & Install",
    badge: "Residential & Commercial",
    desc: "From intimate backyard putting greens to large-scale commercial lawns, Reign Services delivers precision-installed artificial turf that looks natural year-round. Our process includes full design consultation, topsoil removal, professional base preparation, drainage engineering, and expert turf installation — finished to the highest standard.",
    details: [
      "Comprehensive site assessment and custom layout design",
      "Professional topsoil and sod removal",
      "Engineered base and drainage installation",
      "Premium turf selection for Texas climate",
      "15–20 year lifespan with minimal maintenance",
      "Pet-safe and child-safe options available",
    ],
    href: "/custom-turf-install",
    color: "#5D3FD3",
  },
  {
    icon: Home,
    title: "Foundation Repair",
    badge: "Structural Solutions",
    desc: "North Texas expansive clay soil creates unique foundation challenges. Our licensed structural team diagnoses and resolves foundation movement with proven, lasting methods — giving you peace of mind and protecting your property's value.",
    details: [
      "Thorough foundation inspection and diagnosis",
      "Pier and beam reinforcement",
      "Slab foundation leveling and repair",
      "Drainage correction and soil stabilization",
      "Warranty-backed workmanship",
      "Residential and commercial properties",
    ],
    href: "/foundation-repair",
    color: "#0A1F44",
  },
  {
    icon: Wrench,
    title: "Interior Remodeling",
    badge: "Full Interior Transformations",
    desc: "From kitchen renovations and bathroom remodels to flooring, cabinetry, and complete space redesigns — Reign Services handles every detail of your interior transformation. We serve homeowners and commercial clients across DFW who demand quality finishes and professional execution.",
    details: [
      "Full kitchen and bathroom renovations",
      "Custom cabinetry and countertop installation",
      "Flooring: hardwood, tile, LVP, and more",
      "Lighting upgrades and fixture installation",
      "Open-concept layout reconfiguration",
      "Commercial tenant improvements",
    ],
    href: "/interior-remodeling",
    color: "#5D3FD3",
  },
  {
    icon: Sun,
    title: "Outdoor Remodeling",
    badge: "Exterior Upgrades",
    desc: "Elevate your property's exterior with professional outdoor remodeling. From deck construction and patio redesigns to pergolas and privacy fencing, we transform ordinary outdoor areas into functional, beautiful extensions of your living or working space.",
    details: [
      "Custom deck and patio construction",
      "Pergola, gazebo, and shade structure installation",
      "Privacy fencing and decorative borders",
      "Outdoor lighting integration",
      "Permit handling and HOA coordination",
      "Designed for DFW's climate",
    ],
    href: "/outdoor-remodeling",
    color: "#0A1F44",
  },
  {
    icon: Trees,
    title: "Bespoke Outdoor Living Spaces",
    badge: "Premium Outdoor Environments",
    desc: "Our signature service. We design and build fully custom outdoor living environments — from outdoor kitchens and covered pavilions to fire features, water elements, and entertainment systems. Every project is unique, built to your vision and engineered to last.",
    details: [
      "Custom outdoor kitchen design and build",
      "Covered living pavilions and pergola systems",
      "Fire pits, fireplaces, and water features",
      "Entertainment system integration",
      "Custom lighting and ambiance design",
      "Residential estates and commercial hospitality",
    ],
    href: "/outdoor-living",
    color: "#5D3FD3",
  },
  {
    icon: Square,
    title: "Turf & Pavers",
    badge: "Hardscape & Softscape",
    desc: "The perfect union of artificial turf and premium pavers delivers stunning, low-maintenance outdoor surfaces. Ideal for driveways, walkways, pool decks, rooftop terraces, and commercial hardscaping. We design the pattern, source the materials, and handle professional installation.",
    details: [
      "Custom turf and paver pattern design",
      "Driveway, walkway, and pool surround installation",
      "Commercial hardscaping and plaza design",
      "Permeable paver systems for drainage compliance",
      "Natural stone, concrete, and porcelain options",
      "Long-term durability for DFW conditions",
    ],
    href: "/turf-and-pavers",
    color: "#0A1F44",
  },
];

export default function Services() {
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

        <div className="space-y-8">
          {services.map((service, i) => (
            <div
              key={i}
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
                  <div className="flex-shrink-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ background: `${service.color}18` }}
                    >
                      <service.icon className="w-7 h-7" style={{ color: service.color }} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h2
                        className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {service.title}
                      </h2>
                      <span
                        className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-sm border"
                        style={{ color: service.color, borderColor: `${service.color}40` }}
                      >
                        {service.badge}
                      </span>
                    </div>

                    <p className="text-[#B3B3B8] text-sm leading-relaxed mb-6 max-w-2xl">
                      {service.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                      {service.details.map((d, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.color }} />
                          <span className="text-[#B3B3B8]/75 text-xs leading-relaxed">{d}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/contact?utm_source=website&utm_medium=service_card&utm_campaign=services">
                        <Button
                          className="text-white border-0 text-xs uppercase tracking-[0.12em] font-semibold px-6"
                          style={{ background: service.color }}
                          data-testid={`button-contact-service-${i}`}
                        >
                          Request Free Assessment
                        </Button>
                      </Link>
                      <Link href={service.href}>
                        <Button
                          variant="ghost"
                          className="text-[#B3B3B8] hover:text-white border border-white/10 text-xs uppercase tracking-[0.12em] font-semibold px-6"
                          data-testid={`button-learn-service-${i}`}
                        >
                          Learn More <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
