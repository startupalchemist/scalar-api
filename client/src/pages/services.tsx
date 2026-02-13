import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Zap, Droplets, Shield, Car, FileCheck, Gauge } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Hail Damage Repair",
    desc: "Paintless dent repair for storm-impacted vehicles. Factory finish preserved. No filler. No repaint.",
  },
  {
    icon: Zap,
    title: "Paintless Dent Removal",
    desc: "Precision PDR for door dings, minor dents, and creases. Metal memory restored to original form.",
  },
  {
    icon: Shield,
    title: "Insurance Coordination",
    desc: "We handle the paperwork. Direct insurer communication. Supplements filed. Approvals accelerated.",
  },
  {
    icon: Car,
    title: "Fleet Services",
    desc: "Volume accounts for dealerships, rental agencies, and corporate fleets. Priority scheduling available.",
  },
  {
    icon: FileCheck,
    title: "Free Inspection",
    desc: "Comprehensive damage assessment. Itemized repair plan. No obligation. No pressure.",
  },
  {
    icon: Gauge,
    title: "48-Hour Guarantee",
    desc: "Completed within 48 hours of insurance approval or we pay you $300. Documented. Enforced.",
  },
];

export default function Services() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <div className="max-w-2xl mb-16 lg:mb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-4">
            Services
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F7] uppercase tracking-tight leading-[1.05]"
            data-testid="text-services-headline"
          >
            The Storm Hit.<br />
            We Came After.
          </h1>
          <p className="mt-6 text-[#B3B3B8] text-lg leading-relaxed max-w-lg">
            Every service engineered for precision. Every process built for speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group p-8 rounded-md bg-[#141416] border border-white/5 transition-all duration-500"
              data-testid={`card-service-${i}`}
            >
              <div className="w-12 h-12 rounded-md bg-[#FF192C]/10 flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-[#FF192C]" />
              </div>
              <h3 className="text-sm uppercase tracking-[0.1em] font-semibold text-[#F5F5F7] mb-4">
                {service.title}
              </h3>
              <p className="text-[#B3B3B8]/70 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-24 text-center">
          <Link href="/contact">
            <Button
              className="bg-[#FF192C] text-white border-[#FF192C] text-sm uppercase tracking-[0.15em] font-semibold px-10"
              data-testid="button-start-repair-services"
            >
              Start My Repair
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
