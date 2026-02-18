import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import cleanCar from "@assets/IMG_4072_1770967683031.jpeg";

const stats = [
  { value: "48h", label: "Completion Target" },
  { value: "$300", label: "Guarantee Penalty" },
  { value: "0", label: "Excuses" },
];

export default function About() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-4">
              About
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F5F7] uppercase tracking-tight leading-[1.05]"
              data-testid="text-about-headline"
            >
              Engineered,<br />
              Not Improvised.
            </h1>
            <div className="mt-8 space-y-6">
              <p className="text-[#B3B3B8] text-lg leading-relaxed">
                We don't chase storms. We correct them.
              </p>
              <p className="text-[#B3B3B8]/70 text-sm leading-relaxed">
                Dent Society was built on a simple principle: precision over volume. Every vehicle that enters our lab receives the same meticulous attention, the same quality control process, and the same guarantee.
              </p>
              <p className="text-[#B3B3B8]/70 text-sm leading-relaxed">
                Our technicians don't improvise. They follow engineered processes developed through thousands of restorations. Every tool calibrated. Every technique refined. Every outcome documented.
              </p>
              <p className="text-[#B3B3B8]/70 text-sm leading-relaxed">
                We coordinate directly with your insurance carrier so you don't have to. No surprise bills. No hidden fees. No out-of-pocket unless your deductible applies.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-md overflow-hidden">
              <img
                src={cleanCar}
                alt="Precision restored vehicle"
                className="w-full h-full object-cover"
                data-testid="img-about-car"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-50" />
            </div>
          </div>
        </div>

        <div className="mt-24 lg:mt-32 grid grid-cols-3 gap-8 max-w-2xl">
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left" data-testid={`stat-${i}`}>
              <div className="text-3xl lg:text-4xl font-extrabold text-[#F5F5F7]">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-[#B3B3B8]/60 mt-2 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 lg:mt-32 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-8">
            Our Standards
          </h2>
          <div className="space-y-6">
            {[
              "Every repair is inspected under LED panel lighting before release.",
              "We photograph before, during, and after every restoration.",
              "If it's not perfect, we fix it. No debate. No cost to you.",
              "Insurance supplements are filed within 24 hours of discovery.",
              "Your vehicle is treated as if it were our own.",
            ].map((standard, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-white/5">
                <span className="text-[#FF192C] text-xs font-bold tracking-wider mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[#B3B3B8] text-sm leading-relaxed">{standard}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-6 rounded-md bg-[#141416] border border-white/5">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8] font-semibold mb-4">Learn More</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Hail Damage Repair", href: "/hail-damage-repair-dallas" },
              { label: "Insurance Coordination", href: "/insurance-claim-assistance" },
              { label: "48-Hour Guarantee", href: "/48-hour-completion-guarantee" },
              { label: "Our Process", href: "/paintless-dent-repair-dallas" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-xs text-[#FF192C] hover:text-[#FF192C]/80 transition-colors cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact?utm_source=website&utm_medium=about_cta&utm_campaign=about">
            <Button
              className="bg-[#FF192C] text-white border-[#FF192C] text-xs uppercase tracking-[0.15em] font-semibold px-10"
              data-testid="button-about-cta"
            >
              Start My Repair
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
