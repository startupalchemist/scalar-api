import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, Award, Users2 } from "lucide-react";

const stats = [
  { value: "DFW", label: "Metroplex Coverage" },
  { value: "6+", label: "Service Lines" },
  { value: "100%", label: "Satisfaction Focus" },
];

const standards = [
  "Every project begins with a detailed, on-site free assessment.",
  "Transparent pricing — you approve the full scope before work begins.",
  "Licensed, bonded, and insured for both residential and commercial work.",
  "Dedicated project communication from first contact to final walkthrough.",
  "We serve all major DFW cities and surrounding communities.",
  "No subcontracting on core services — our crews, our standards.",
];

const serviceAreas = [
  "Dallas", "Fort Worth", "Plano", "Frisco", "McKinney",
  "Arlington", "Irving", "Denton", "Garland", "Mesquite",
  "Carrollton", "Grand Prairie", "Flower Mound", "Allen", "Lewisville",
];

export default function About() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">
              About Reign Services
            </span>
            <h1
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05]"
              style={{ fontFamily: "Poppins, sans-serif" }}
              data-testid="text-about-headline"
            >
              DFW's Premier<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #5D3FD3 0%, #4a6fa5 100%)" }}>
                Renovations Experts
              </span>
            </h1>
            <div className="mt-8 space-y-5">
              <p className="text-[#B3B3B8] text-lg leading-relaxed">
                Reign Services is the Dallas-Fort Worth metroplex's trusted source for premium interior and exterior renovation services — for homeowners and commercial property owners who expect excellence.
              </p>
              <p className="text-[#B3B3B8]/75 text-sm leading-relaxed">
                From custom artificial turf installations and bespoke outdoor living environments to foundation repair, interior remodeling, and hardscape design, our licensed team brings craftsmanship and professionalism to every project — regardless of size or scope.
              </p>
              <p className="text-[#B3B3B8]/75 text-sm leading-relaxed">
                We operate with a single standard across all of our services: every client deserves a clear process, honest communication, and results they're proud to show off. No surprises. No shortcuts. Just exceptional renovation work across DFW.
              </p>
              <p className="text-[#B3B3B8]/75 text-sm leading-relaxed">
                Whether you're a homeowner ready to transform your backyard or a commercial developer seeking a reliable contractor for an exterior project, Reign Services is your partner from first assessment to final walkthrough.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/contact?utm_source=website&utm_medium=about_cta&utm_campaign=about">
                <Button
                  className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-xs uppercase tracking-[0.15em] font-semibold px-8"
                  data-testid="button-about-cta"
                >
                  Book Free Assessment
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="ghost"
                  className="text-[#B3B3B8] hover:text-white border border-white/10 text-xs uppercase tracking-[0.15em] font-semibold px-8"
                  data-testid="button-view-services-about"
                >
                  Our Services
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div
              className="grid grid-cols-3 gap-4"
              data-testid="stats-grid"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl text-center"
                  style={{
                    background: "rgba(93,63,211,0.10)",
                    border: "1px solid rgba(93,63,211,0.25)",
                  }}
                  data-testid={`stat-${i}`}
                >
                  <div
                    className="text-2xl lg:text-3xl font-extrabold text-white"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#B3B3B8]/60 mt-1.5 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="p-7 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Award className="w-5 h-5 text-[#5D3FD3]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8] font-semibold">
                  Our Standards
                </span>
              </div>
              <div className="space-y-3">
                {standards.map((s, i) => (
                  <div key={i} className="flex items-start gap-3" data-testid={`standard-${i}`}>
                    <CheckCircle2 className="w-4 h-4 text-[#5D3FD3] flex-shrink-0 mt-0.5" />
                    <span className="text-[#B3B3B8] text-xs leading-relaxed">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-7 rounded-xl"
              style={{
                background: "rgba(10,31,68,0.30)",
                border: "1px solid rgba(10,31,68,0.60)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#4a6fa5]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8] font-semibold">
                  Service Area
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="text-xs text-[#B3B3B8]/70 bg-white/5 px-2.5 py-1 rounded-sm border border-white/8"
                  >
                    {area}
                  </span>
                ))}
                <span className="text-xs text-[#B3B3B8]/40 px-2.5 py-1">
                  + all surrounding DFW communities
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 lg:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Users2,
              title: "Who We Serve",
              desc: "Homeowners, HOAs, property investors, commercial developers, and businesses throughout the Dallas-Fort Worth metroplex.",
            },
            {
              icon: Award,
              title: "Our Commitment",
              desc: "Every project receives the same attention to detail. Your property is treated with the same care we would give our own.",
            },
            {
              icon: MapPin,
              title: "Local Expertise",
              desc: "DFW's soil, weather, and HOA landscape are unique. Our team brings deep local knowledge to every project we undertake.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-7 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <item.icon className="w-6 h-6 text-[#5D3FD3] mb-4" />
              <h3 className="text-sm uppercase tracking-[0.08em] font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-[#B3B3B8]/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#B3B3B8] text-lg mb-6">
            Ready to discuss your project with DFW's premier renovation team?
          </p>
          <Link href="/contact?utm_source=website&utm_medium=about_bottom_cta&utm_campaign=about">
            <Button
              className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-sm uppercase tracking-[0.15em] font-semibold px-12 py-6"
              data-testid="button-about-bottom-cta"
            >
              Request a Free Assessment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
