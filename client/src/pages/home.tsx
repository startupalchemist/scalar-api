import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown, Shield, Clock, FileCheck, Wrench, Car, Sparkles, KeyRound } from "lucide-react";
import damagedCar from "@assets/IMG_4071_1770967683032.jpeg";
import cleanCar from "@assets/IMG_4072_1770967683031.jpeg";

function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-[#0B0B0D]" />
      <div className="absolute inset-0 spotlight-gradient" />

      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-[#F5F5F7] leading-[0.95]"
          data-testid="text-hero-headline"
        >
          Hail Happens.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[#B3B3B8] font-light tracking-wide max-w-lg mx-auto">
          We remove the evidence.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <Button
              className="bg-[#FF192C] text-white border-[#FF192C] text-sm uppercase tracking-[0.15em] font-semibold px-10"
              data-testid="button-start-repair-hero"
            >
              Start My Repair
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-xs text-[#B3B3B8]/50 tracking-wide">
          48-hour completion begins after insurance approval.
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-[#B3B3B8]/30" />
      </div>
    </section>
  );
}

function TransformSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = viewportHeight - rect.top;
      const total = sectionHeight + viewportHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-40"
      data-testid="section-transform"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16 lg:mb-24">
          <h2
            className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-4"
            data-testid="text-transform-label"
          >
            Erase the Storm
          </h2>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F7] uppercase tracking-tight">
            Before. After. Done.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-md overflow-hidden">
          <div className="relative aspect-video">
            <img
              src={damagedCar}
              alt="Storm damaged vehicle"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 1 - progress }}
              data-testid="img-damaged-car"
            />
            <img
              src={cleanCar}
              alt="Restored vehicle"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: progress }}
              data-testid="img-clean-car"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div
                className="h-full bg-[#FF192C] transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-[#B3B3B8]/60 text-sm tracking-wide">
          Scroll to reveal the restoration
        </div>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative py-24 lg:py-40" data-testid="section-guarantee">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF192C]/[0.03] to-transparent" />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F7] uppercase tracking-tight"
          data-testid="text-guarantee-headline"
        >
          48 Hours.
        </h2>
        <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FF192C] uppercase tracking-tight mt-2">
          Or $300.
        </p>
        <p className="mt-8 text-[#B3B3B8] text-lg leading-relaxed max-w-xl mx-auto">
          If your vehicle is not completed within 48 hours of documented insurance approval, we pay you $300.
        </p>
        <p className="mt-4 text-[#B3B3B8]/50 text-sm">
          Clock begins upon insurer authorization.
        </p>

        <div className="mt-12">
          <button
            onClick={() => setOpen(!open)}
            className="text-[#FF192C] text-sm uppercase tracking-[0.15em] font-semibold cursor-pointer transition-opacity hover:opacity-80"
            data-testid="button-how-it-works"
          >
            {open ? "Close" : "How It Works"}
          </button>

          {open && (
            <div className="mt-8 text-left max-w-md mx-auto space-y-4" data-testid="drawer-how-it-works">
              {[
                { num: "01", text: "Insurance approves repair" },
                { num: "02", text: "Vehicle is in our possession" },
                { num: "03", text: "48-hour clock begins" },
                { num: "04", text: "If exceeded, $300 paid to you" },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-4 py-3 border-b border-white/5">
                  <span className="text-[#FF192C] text-xs font-bold tracking-wider mt-0.5">
                    {step.num}
                  </span>
                  <span className="text-[#B3B3B8] text-sm">{step.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      icon: FileCheck,
      title: "Claim Coordination",
      desc: "We contact your insurance carrier. We manage the adjuster. We document everything.",
      detail: "You won't need to negotiate.",
      supporting: "You'll never speak to your adjuster twice.",
    },
    {
      icon: Car,
      title: "Pickup & Complimentary Loaner",
      desc: "Drop off at our facility, or we pick up your vehicle and deliver a complimentary loaner.",
      detail: "Your schedule stays intact.",
      highlight: "Complimentary loaner",
    },
    {
      icon: Wrench,
      title: "Precision Restoration",
      desc: "LED precision mapping. Master-level PDR technicians. No fillers. No repaint. No shortcuts.",
      detail: "Damage is removed. Factory finish preserved.",
    },
    {
      icon: Sparkles,
      title: "Quality Control",
      desc: "Every vehicle passes multi-point inspection under controlled lighting.",
      detail: "If it's not perfect, it doesn't leave.",
    },
    {
      icon: KeyRound,
      title: "Delivery & Key Exchange",
      desc: "Pick up your vehicle or have it delivered back to you. Loaner retrieved at exchange.",
      detail: "Vehicle returned fully detailed. Warranty issued.",
      supporting: "You'll know it happened. No one else will.",
    },
  ];

  return (
    <section className="py-24 lg:py-40" data-testid="section-process">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-4">
            The Process
          </h2>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F7] uppercase tracking-tight">
            We Handle Everything.
          </p>
          <p className="mt-4 text-[#B3B3B8] text-lg">
            From first call to final key handoff.
          </p>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative p-6 lg:p-8 rounded-md bg-[#141416] border border-white/5"
              data-testid={`card-process-${i}`}
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-md bg-[#FF192C]/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-[#FF192C]" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#FF192C] text-xs font-bold tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm uppercase tracking-[0.1em] font-semibold text-[#F5F5F7]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[#B3B3B8]/70 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                  {step.detail && (
                    <p className="mt-3 text-[#F5F5F7] text-sm font-medium">
                      {step.detail}
                    </p>
                  )}
                  {step.highlight && (
                    <span className="inline-block mt-3 text-[#FF192C] text-xs uppercase tracking-[0.15em] font-semibold">
                      {step.highlight}
                    </span>
                  )}
                  {step.supporting && (
                    <p className="mt-3 text-[#B3B3B8]/40 text-xs italic tracking-wide">
                      "{step.supporting}"
                    </p>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute -bottom-3 left-11 w-px h-6 bg-white/5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-24 lg:py-32" data-testid="section-cta">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <p className="text-[#B3B3B8]/50 text-sm uppercase tracking-[0.2em] mb-4">
          You'll leave owing nothing
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F7] uppercase tracking-tight">
          Ready to begin.
        </h2>
        <div className="mt-10">
          <Link href="/contact">
            <Button
              className="bg-[#FF192C] text-white border-[#FF192C] text-sm uppercase tracking-[0.15em] font-semibold px-10"
              data-testid="button-start-repair-cta"
            >
              Start My Repair
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen">
      <HeroSection />
      <TransformSection />
      <GuaranteeSection />
      <ProcessSection />
      <CtaSection />
    </div>
  );
}
