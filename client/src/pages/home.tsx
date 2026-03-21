import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Leaf, Home as HomeIcon, Wrench, Sun, Trees, Square, Shield, Star, MapPin, ChevronRight,
} from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function HeroSection() {
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const tryPlay = () => { video.play().catch(() => {}); };
    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }
    return () => video.removeEventListener("canplay", tryPlay);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-[#070b14]" />

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.35 }}
        data-testid="video-hero-background"
        onCanPlay={() => { videoRef.current?.play().catch(() => {}); }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background: "rgba(10, 31, 68, 0.05)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          backgroundImage: "linear-gradient(180deg, rgba(10,31,68,0.05) 0%, rgba(10,31,68,0.12) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/60 via-[#0A1F44]/5 to-[#070b14]/80" />

      <div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#5D3FD3]/40 bg-[#5D3FD3]/10 backdrop-blur-sm"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.9s ease-out 0.1s, transform 0.9s ease-out 0.1s",
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#5D3FD3] font-semibold">
            Dallas-Fort Worth's Premier Contractor
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-white leading-[0.95]"
          data-testid="text-hero-headline"
          style={{
            fontFamily: "Poppins, sans-serif",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease-out 0.2s, transform 1s ease-out 0.2s",
          }}
        >
          Transform Your
          <span
            className="block text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #5D3FD3 0%, #0A1F44 100%)" }}
          >
            Space.
          </span>
        </h1>

        <div
          className="mt-8 space-y-2"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s",
          }}
        >
          <p className="text-xl sm:text-2xl text-[#B3B3B8] font-light tracking-wide">
            Residential &amp; commercial renovations across DFW.
          </p>
          <p className="text-lg text-white/70 font-medium tracking-wide">
            Custom turf. Foundation repair. Interior &amp; outdoor remodeling.
          </p>
        </div>

        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1s ease-out 0.55s, transform 1s ease-out 0.55s",
          }}
        >
          <Link href="/contact?utm_source=website&utm_medium=hero&utm_campaign=homepage">
            <Button
              className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-sm uppercase tracking-[0.15em] font-semibold px-10 py-6"
              data-testid="button-assessment-hero"
            >
              Book Free Assessment
            </Button>
          </Link>
          <Link href="/contact?utm_source=website&utm_medium=hero_secondary&utm_campaign=homepage">
            <Button
              variant="ghost"
              className="text-white border border-white/20 hover:bg-white/5 text-sm uppercase tracking-[0.15em] font-semibold px-8 py-6"
              data-testid="button-chat-hero"
            >
              Chat With Our Team
            </Button>
          </Link>
        </div>

        <p
          className="mt-5 text-xs text-white/30 tracking-wide"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease-out 0.7s",
          }}
        >
          Free assessment. No obligation. We serve all of DFW.
        </p>

        <div
          className="mt-8 flex items-center justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease-out 0.85s",
          }}
        >
          <a
            href="https://tachyonbuilt.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-truetrade-hero"
            className="group"
          >
            <img
              src="/truetrade-certified.jpeg"
              alt="TrueTrade Certified 11.7"
              className="h-16 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white" />
      </div>
    </section>
  );
}

const services = [
  {
    icon: Leaf,
    title: "Custom Turf Design & Install",
    desc: "Bespoke artificial turf installations for residential yards and commercial properties. Full design, soil removal, and professional installation.",
    href: "/custom-turf-install",
    color: "#5D3FD3",
  },
  {
    icon: HomeIcon,
    title: "Foundation Repair",
    desc: "Expert structural solutions for DFW's unique soil conditions. Pier and beam, slab repair, drainage correction. Protect your investment.",
    href: "/foundation-repair",
    color: "#0A1F44",
  },
  {
    icon: Wrench,
    title: "Interior Remodeling",
    desc: "Full interior transformations including kitchen and bathroom renovations, flooring, cabinetry, and custom finishes for residential and commercial spaces.",
    href: "/interior-remodeling",
    color: "#5D3FD3",
  },
  {
    icon: Sun,
    title: "Outdoor Remodeling",
    desc: "Elevate your exterior with professional deck, patio, pergola, and landscape renovations tailored to DFW's climate and your lifestyle.",
    href: "/outdoor-remodeling",
    color: "#0A1F44",
  },
  {
    icon: Trees,
    title: "Bespoke Outdoor Living",
    desc: "Custom outdoor kitchens, covered pavilions, fire features, and entertainment spaces. Turn your backyard into a private retreat.",
    href: "/outdoor-living",
    color: "#5D3FD3",
  },
  {
    icon: Square,
    title: "Turf & Pavers",
    desc: "Premium turf and paver combinations for driveways, walkways, pool surrounds, and commercial hardscaping. Low-maintenance. High-impact.",
    href: "/turf-and-pavers",
    color: "#0A1F44",
  },
];

function ServicesSection() {
  const { ref: headRef, inView: headIn } = useInView(0.2);
  const { ref: gridRef, inView: gridIn } = useInView(0.1);

  return (
    <section className="py-24 lg:py-40 bg-[#0B0B0D]" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={headRef}
          className="text-center mb-16 lg:mb-24"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">
            What We Do
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Full-Spectrum Renovation
          </h2>
          <p className="mt-4 text-[#B3B3B8] text-lg max-w-2xl mx-auto">
            From custom turf and outdoor living to foundation repair and interior transformation — one trusted team, across all of DFW.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <Link key={i} href={service.href}>
              <div
                className="group p-7 rounded-xl cursor-pointer h-full flex flex-col transition-colors duration-300 hover:border-white/20"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: gridIn ? 1 : 0,
                  transform: gridIn ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.7s ease-out ${i * 0.1}s, transform 0.7s ease-out ${i * 0.1}s, border-color 0.3s`,
                }}
                data-testid={`card-service-${i}`}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `${service.color}20` }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <h3 className="text-sm uppercase tracking-[0.08em] font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-[#B3B3B8]/70 text-sm leading-relaxed flex-1">
                  {service.desc}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] transition-transform group-hover:translate-x-1"
                  style={{ color: service.color }}
                >
                  Learn More <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const reasons = [
    {
      icon: MapPin,
      title: "Local DFW Experts",
      desc: "We understand North Texas soil, climate, and HOA requirements. Local knowledge, premium results.",
    },
    {
      icon: Shield,
      title: "Residential & Commercial",
      desc: "From single-family homes to multi-unit commercial properties. Licensed, bonded, and insured across DFW.",
    },
    {
      icon: Star,
      title: "No Pricing Surprises",
      desc: "Every project begins with a free assessment and a detailed quote. You approve it before we lift a tool.",
    },
  ];

  const { ref: gridRef, inView: gridIn } = useInView(0.15);

  return (
    <section className="py-24 lg:py-32 bg-background" data-testid="section-trust">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="p-8 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.10)",
                opacity: gridIn ? 1 : 0,
                transform: gridIn ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
                transition: `opacity 0.7s ease-out ${i * 0.15}s, transform 0.7s ease-out ${i * 0.15}s`,
              }}
              data-testid={`card-trust-${i}`}
            >
              <div className="w-10 h-10 rounded-md bg-[#5D3FD3]/15 flex items-center justify-center mb-5">
                <r.icon className="w-5 h-5 text-[#5D3FD3]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-white mb-3">
                {r.title}
              </h3>
              <p className="text-[#B3B3B8]/70 text-sm leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Free Assessment",
      desc: "We visit your property, evaluate the project scope, and document everything. No cost. No pressure.",
    },
    {
      num: "02",
      title: "Custom Proposal",
      desc: "You receive a detailed, transparent quote before we begin. Residential and commercial scopes handled separately.",
    },
    {
      num: "03",
      title: "Professional Execution",
      desc: "Our licensed crews execute with precision. Regular progress updates keep you informed every step of the way.",
    },
    {
      num: "04",
      title: "Final Walkthrough",
      desc: "We complete a detailed walkthrough together. Your satisfaction is signed off before we close the project.",
    },
  ];

  const { ref: headRef, inView: headIn } = useInView(0.2);
  const { ref: gridRef, inView: gridIn } = useInView(0.1);

  return (
    <section className="py-24 lg:py-40 bg-[#0B0B0D]" data-testid="section-process">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={headRef}
          className="text-center mb-16 lg:mb-24"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">
            How It Works
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            From Assessment to Completion
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-6 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.08)",
                opacity: gridIn ? 1 : 0,
                transform: gridIn ? "translateY(0)" : "translateY(36px)",
                transition: `opacity 0.65s ease-out ${i * 0.12}s, transform 0.65s ease-out ${i * 0.12}s`,
              }}
              data-testid={`card-process-${i}`}
            >
              <span
                className="text-4xl font-extrabold text-[#5D3FD3]/25 block mb-4"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {step.num}
              </span>
              <h3 className="text-sm uppercase tracking-[0.08em] font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-[#B3B3B8]/65 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" data-testid="section-cta">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(93,63,211,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        ref={ref}
        className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.9s ease-out, transform 0.9s ease-out",
        }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">
          Get Started Today
        </span>
        <h2
          className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Ready to Reign Over Your Space?
        </h2>
        <p className="mt-6 text-[#B3B3B8] text-lg leading-relaxed">
          Schedule your free assessment. Our team will evaluate your project, answer every question, and deliver a clear proposal — at no cost.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact?utm_source=website&utm_medium=bottom_cta&utm_campaign=homepage">
            <Button
              className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-sm uppercase tracking-[0.15em] font-semibold px-12 py-6"
              data-testid="button-assessment-cta"
            >
              Book Free Assessment
            </Button>
          </Link>
          <Link href="/services">
            <Button
              variant="ghost"
              className="text-white border border-white/20 hover:bg-white/5 text-sm uppercase tracking-[0.15em] font-semibold px-8 py-6"
              data-testid="button-view-services-cta"
            >
              Explore Services
            </Button>
          </Link>
        </div>
        <p className="mt-5 text-xs text-[#B3B3B8]/40 tracking-wide">
          Serving Dallas, Fort Worth, Plano, Frisco, McKinney, Arlington, and surrounding DFW communities.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      <ServicesSection />
      <TrustSection />
      <ProcessSection />
      <CtaSection />
    </div>
  );
}
