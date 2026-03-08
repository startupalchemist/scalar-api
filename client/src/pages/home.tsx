import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Clock, FileCheck, Wrench, Car, Sparkles, KeyRound } from "lucide-react";
// import damagedCar from "@assets/IMG_4071_1770967683032.jpeg";
// import cleanCar from "@assets/IMG_4072_1770967683031.jpeg";
import pdrVideo from "@assets/generated_videos/pdr_hero_timelapse.mp4";

function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-[#F2F2F2]" />

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.28 }}
        data-testid="video-hero-background"
      >
        <source src={pdrVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-[#F2F2F2]/40 via-transparent to-[#F2F2F2]/70" />

      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-[#111111] leading-[0.95]"
          data-testid="text-hero-headline"
        >
          After the storm.
        </h1>
        <div className="mt-8 space-y-1">
          <p className="text-xl sm:text-2xl md:text-3xl text-[#555558] font-light tracking-wide">
            Hail happens.
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl text-[#111111] font-medium tracking-wide">
            We correct it.
          </p>
        </div>
        <div className="mt-6 space-y-1">
          <p className="text-sm text-[#555558]/70 tracking-wide">
            Precision paintless dent repair.
          </p>
          <p className="text-sm text-[#555558]/70 tracking-wide">
            Insurance handled. Complimentary loaner available.
          </p>
        </div>
        <div className="mt-10">
          <Link href="/contact?utm_source=website&utm_medium=hero&utm_campaign=homepage">
            <Button
              className="bg-[#FF192C] text-white border-[#FF192C] text-sm uppercase tracking-[0.15em] font-semibold px-10"
              data-testid="button-assessment-hero"
            >
              Get My Assessment
            </Button>
          </Link>
          <p className="mt-4 text-xs text-[#555558]/50 tracking-wide">
            AI-powered prequalification. Takes about a minute.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- Car reveal sections preserved below, not currently rendered ---

// function TransitionHeadline() {
//   return (
//     <div className="py-16 lg:py-24 text-center" data-testid="section-transition">
//       <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F7] uppercase tracking-tight">
//         Impact is measurable.
//       </p>
//     </div>
//   );
// }

// function TransformSection() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [progress, setProgress] = useState(0);
//   const [phase, setPhase] = useState<"scrolling" | "restored" | "sweep" | "cta" | "done">("scrolling");
//   const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
//   const lockedRef = useRef(false);
//   const scrollYRef = useRef(0);
//   const [sweepKey, setSweepKey] = useState(0);
//
//   useEffect(() => {
//     const handleScroll = () => {
//       if (lockedRef.current) return;
//       if (!containerRef.current) return;
//       const rect = containerRef.current.getBoundingClientRect();
//       const containerHeight = containerRef.current.offsetHeight;
//       const viewportHeight = window.innerHeight;
//       const scrollableDistance = containerHeight - viewportHeight;
//       if (scrollableDistance <= 0) return;
//       const scrolled = -rect.top;
//       const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
//       setProgress(p);
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//
//   const clearAllTimers = useCallback(() => {
//     timersRef.current.forEach(clearTimeout);
//     timersRef.current = [];
//   }, []);
//
//   const lockScroll = useCallback(() => {
//     if (lockedRef.current) return;
//     lockedRef.current = true;
//     scrollYRef.current = window.scrollY;
//     document.body.style.position = "fixed";
//     document.body.style.top = `-${scrollYRef.current}px`;
//     document.body.style.left = "0";
//     document.body.style.right = "0";
//     document.body.style.overflow = "hidden";
//   }, []);
//
//   const unlockScroll = useCallback(() => {
//     if (!lockedRef.current) return;
//     lockedRef.current = false;
//     document.body.style.position = "";
//     document.body.style.top = "";
//     document.body.style.left = "";
//     document.body.style.right = "";
//     document.body.style.overflow = "";
//     window.scrollTo(0, scrollYRef.current);
//   }, []);
//
//   useEffect(() => {
//     return () => {
//       unlockScroll();
//       clearAllTimers();
//     };
//   }, [unlockScroll, clearAllTimers]);
//
//   useEffect(() => {
//     if (progress >= 0.72 && phase === "scrolling") {
//       lockScroll();
//       setPhase("restored");
//       const t1 = setTimeout(() => {
//         setPhase("sweep");
//         setSweepKey((k) => k + 1);
//         const t2 = setTimeout(() => {
//           setPhase("cta");
//           const t3 = setTimeout(() => {
//             setPhase("done");
//             unlockScroll();
//           }, 2500);
//           timersRef.current.push(t3);
//         }, 1200);
//         timersRef.current.push(t2);
//       }, 800);
//       timersRef.current.push(t1);
//     }
//     if (progress < 0.6 && phase !== "scrolling") {
//       setPhase("scrolling");
//       clearAllTimers();
//       unlockScroll();
//     }
//   }, [progress, phase, lockScroll, unlockScroll, clearAllTimers]);
//
//   const displayProgress = Math.min(1, progress / 0.72);
//   const impactLevel = phase !== "scrolling" ? 0 : Math.round(100 - displayProgress * 100);
//   const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
//   const rotation = displayProgress * (isMobile ? 8 : 20);
//   const showRestored = phase !== "scrolling";
//   const showSweep = phase === "sweep" || phase === "cta" || phase === "done";
//   const showCta = phase === "cta" || phase === "done";
//
//   return (
//     <section
//       ref={containerRef}
//       className="relative"
//       style={{ height: "400vh" }}
//       data-testid="section-transform"
//     >
//       <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col bg-[#0B0B0D]">
//         <div className="relative flex-1 w-full">
//           <div
//             className="absolute flex items-center justify-center"
//             style={{
//               top: "-5%",
//               bottom: "-5%",
//               left: "-25%",
//               right: "-25%",
//               transform: `perspective(1200px) rotateY(${rotation}deg)`,
//               transition: "transform 0.15s ease-out",
//             }}
//           >
//             <img
//               src={damagedCar}
//               alt="Storm damaged vehicle"
//               className="absolute inset-0 w-full h-full object-cover sm:object-center object-[center_30%]"
//               style={{ opacity: 1 - displayProgress }}
//               data-testid="img-damaged-car"
//             />
//             <img
//               src={cleanCar}
//               alt="Restored vehicle"
//               className="absolute inset-0 w-full h-full object-cover sm:object-center object-[center_30%]"
//               style={{ opacity: displayProgress }}
//               data-testid="img-clean-car"
//             />
//           </div>
//
//           <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-60" />
//           <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D] via-transparent to-transparent opacity-40" style={{ height: "20%" }} />
//
//           {showSweep && (
//             <div key={sweepKey} className="absolute inset-0 pointer-events-none z-20 scan-sweep" data-testid="scan-sweep">
//               <div className="scan-line" />
//             </div>
//           )}
//
//           <div className="absolute top-20 left-4 sm:top-12 sm:left-12 z-10" data-testid="overlay-impact-level">
//             <p className="text-[10px] uppercase tracking-[0.3em] text-[#B3B3B8]/80 font-semibold mb-1">
//               Impact Level
//             </p>
//             <p
//               className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#F5F5F7] tabular-nums leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
//               data-testid="text-impact-counter"
//             >
//               {impactLevel}%
//             </p>
//           </div>
//
//           <div
//             className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-700"
//             style={{ opacity: showRestored ? 1 : 0 }}
//           >
//             <p
//               className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F7] uppercase tracking-tight"
//               data-testid="text-restored"
//             >
//               Restored.
//             </p>
//           </div>
//
//           <div
//             className="absolute bottom-12 sm:bottom-16 left-0 right-0 flex flex-col items-center z-10 transition-opacity duration-700"
//             style={{ opacity: showCta ? 1 : 0, pointerEvents: showCta ? "auto" : "none" }}
//           >
//             <Link href="/contact?utm_source=website&utm_medium=car_reveal&utm_campaign=homepage">
//               <Button
//                 className="bg-[#FF192C] text-white border-[#FF192C] text-sm uppercase tracking-[0.15em] font-semibold px-10"
//                 data-testid="button-assessment-transform"
//               >
//                 Get My Assessment
//               </Button>
//             </Link>
//             <p className="mt-3 text-xs text-[#B3B3B8]/40 tracking-wide">
//               Takes about a minute.
//             </p>
//           </div>
//
//           <div
//             className="absolute bottom-4 left-1/2 -translate-x-1/2 transition-opacity duration-500 z-10"
//             style={{ opacity: progress < 0.05 ? 0.7 : 0 }}
//           >
//             <p className="text-[#B3B3B8]/50 text-xs tracking-wide text-center uppercase">
//               Scroll to begin
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

function GuaranteeSection() {
  return (
    <section className="relative py-24 lg:py-40 bg-background" data-testid="section-guarantee">
      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FF192C] uppercase tracking-tight"
          data-testid="text-guarantee-headline"
        >
          48 Hours.
        </h2>
        <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] uppercase tracking-tight mt-2">
          Or $300.
        </p>
        <p className="mt-10 text-[#555558]/60 text-sm tracking-wide">
          Completion window begins after insurance approval.
        </p>
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
    },
  ];

  return (
    <section className="py-24 lg:py-40 bg-background" data-testid="section-process">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-4">
            The Process
          </h2>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] uppercase tracking-tight">
            We Handle Everything.
          </p>
          <p className="mt-4 text-[#555558] text-lg">
            From first call to final key handoff.
          </p>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative p-6 lg:p-8 rounded-md bg-white border border-black/8 shadow-sm"
              data-testid={`card-process-${i}`}
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-md bg-[#FF192C]/8 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-[#FF192C]" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#FF192C] text-xs font-bold tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm uppercase tracking-[0.1em] font-semibold text-[#111111]">
                      {step.title}
                    </h3>
                    {step.highlight && (
                      <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-[#FF192C] border border-[#FF192C]/30 px-2 py-0.5 rounded-sm font-semibold">
                        {step.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#555558] leading-relaxed">
                    {step.desc}
                  </p>
                  <p className="mt-2 text-xs text-[#555558]/60 font-medium">
                    {step.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-24 lg:py-32 bg-background" data-testid="section-cta">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <p className="text-[#555558]/60 text-sm uppercase tracking-[0.2em] mb-4">
          You'll leave owing nothing
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] uppercase tracking-tight">
          Ready to begin.
        </h2>
        <div className="mt-10">
          <Link href="/contact?utm_source=website&utm_medium=bottom_cta&utm_campaign=homepage">
            <Button
              className="bg-[#FF192C] text-white border-[#FF192C] text-sm uppercase tracking-[0.15em] font-semibold px-10"
              data-testid="button-assessment-cta"
            >
              Get My Assessment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      <GuaranteeSection />
      <ProcessSection />
      <CtaSection />
    </div>
  );
}
