import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does the 48-hour guarantee work?",
    a: "The 48-hour completion window begins once your insurer approves the repair and your vehicle is in our possession. If we exceed that window, we pay you $300. Documented. Enforced.",
  },
  {
    q: "Will I owe anything out of pocket?",
    a: "In most cases, your insurance covers the full cost of hail damage repair minus your deductible. We coordinate directly with your carrier. No surprise bills.",
  },
  {
    q: "Do you work with my insurance company?",
    a: "We work with all major insurance carriers. We handle the claim coordination, supplement filing, and approval process. You drop off the vehicle. We handle the rest.",
  },
  {
    q: "What is paintless dent repair?",
    a: "PDR is a precision technique that removes dents without affecting your vehicle's factory paint finish. No fillers. No repainting. The metal is restored to its original form using specialized tools and controlled pressure.",
  },
  {
    q: "How long does a typical repair take?",
    a: "Most hail damage repairs are completed within 48 hours of insurance approval. Severity varies, but our process is engineered for speed without compromising quality.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Every repair carries a lifetime warranty against defects in workmanship. If something isn't right, bring it back. We fix it. No questions.",
  },
  {
    q: "Can I get a rental car during repairs?",
    a: "If your insurance policy includes rental coverage, we coordinate that as well. Most carriers provide a rental vehicle for the duration of the repair.",
  },
  {
    q: "What if my vehicle has severe damage?",
    a: "We assess every vehicle individually. If a repair requires additional time beyond 48 hours due to severity, we communicate that upfront before the clock begins. Transparency first.",
  },
  {
    q: "Do you offer loaner vehicles?",
    a: "Yes. Complimentary loaners are available, and we can deliver one when we pick up your vehicle.",
  },
  {
    q: "Can you pick up my vehicle?",
    a: "Yes. Pickup and delivery are available based on scheduling.",
  },
  {
    q: "When does the 48-hour clock begin?",
    a: "Once your insurance formally approves the repair and your vehicle is in our possession.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-white/5"
      data-testid={`faq-item-${index}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
        data-testid={`button-faq-${index}`}
      >
        <span className="text-sm sm:text-base text-[#F5F5F7] font-medium pr-8">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#B3B3B8]/50 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-6 pr-12">
          <p className="text-[#B3B3B8]/70 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-3xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <p className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-4">
          FAQ
        </p>
        <h1
          className="text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] uppercase tracking-tight mb-4"
          data-testid="text-faq-headline"
        >
          Questions. Answered.
        </h1>
        <p className="text-[#B3B3B8] text-lg mb-12 lg:mb-16">
          No fluff. Just facts.
        </p>

        <div>
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
