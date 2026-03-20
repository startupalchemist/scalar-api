import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    category: "Getting Started",
    q: "What is a free assessment and what does it include?",
    a: "Our free assessment is a no-obligation, on-site visit by one of our project specialists. We evaluate your property, discuss your goals, and document the project scope. At the end, we provide a detailed proposal with transparent pricing — all at no cost to you.",
  },
  {
    category: "Getting Started",
    q: "Do you serve both residential and commercial properties?",
    a: "Yes. Reign Services works with homeowners, HOAs, property investors, commercial developers, and business owners throughout the DFW metroplex. Our crews are licensed and insured for both residential and commercial scopes.",
  },
  {
    category: "Getting Started",
    q: "What areas of DFW do you serve?",
    a: "We serve the entire Dallas-Fort Worth metroplex, including Dallas, Fort Worth, Plano, Frisco, McKinney, Arlington, Irving, Denton, Garland, Mesquite, Carrollton, Grand Prairie, Flower Mound, Allen, Lewisville, and all surrounding communities.",
  },
  {
    category: "Custom Turf",
    q: "How does the custom turf design and installation process work?",
    a: "We start with a site assessment and design consultation to understand your space and goals. Our team handles everything: existing sod and topsoil removal, base preparation, drainage engineering, turf selection, and professional installation. We finish with detailed edge work and brushing to achieve a natural look.",
  },
  {
    category: "Custom Turf",
    q: "How long does artificial turf last?",
    a: "With proper installation and occasional maintenance (rinsing and light brushing), premium artificial turf typically lasts 15–20 years. We use products specifically chosen for DFW's heat and climate conditions.",
  },
  {
    category: "Custom Turf",
    q: "Is artificial turf safe for children and pets?",
    a: "Absolutely. We offer pet-friendly and child-safe turf options that are non-toxic, lead-free, and designed for high-traffic use. Our drainage systems also handle pet waste efficiently.",
  },
  {
    category: "Foundation Repair",
    q: "What are the signs I might need foundation repair?",
    a: "Common indicators include cracks in interior walls (especially diagonal cracks), sticking doors or windows, uneven floors, gaps around window frames or exterior doors, and visible separation between walls and ceilings. If you notice any of these, contact us for a free assessment.",
  },
  {
    category: "Foundation Repair",
    q: "How long does foundation repair take?",
    a: "Most residential foundation repairs are completed within 2–5 days, depending on the extent of damage. We'll provide a clear timeline as part of your assessment and proposal.",
  },
  {
    category: "Interior & Outdoor Remodeling",
    q: "What interior remodeling services do you offer?",
    a: "We offer full kitchen and bathroom renovations, custom cabinetry and countertop installation, flooring (hardwood, tile, LVP), lighting upgrades, layout reconfigurations, and commercial tenant improvements across the DFW area.",
  },
  {
    category: "Interior & Outdoor Remodeling",
    q: "Do you handle permits and HOA approvals?",
    a: "Yes. We manage all necessary permit applications and coordinate with HOAs on your behalf. We're familiar with the requirements across DFW municipalities and HOA communities.",
  },
  {
    category: "Interior & Outdoor Remodeling",
    q: "How long does a kitchen or bathroom remodel take?",
    a: "Most kitchen remodels take 3–6 weeks and bathroom remodels 2–4 weeks, depending on scope. We provide a detailed project timeline before work begins and keep you updated throughout the process.",
  },
  {
    category: "Outdoor Living",
    q: "What does 'bespoke outdoor living space' mean?",
    a: "It means a fully custom-designed outdoor environment built specifically for your property and lifestyle. This can include outdoor kitchens, covered pavilions, fire features, water elements, entertainment systems, custom lighting, and landscape integration — all designed from scratch to reflect your vision.",
  },
  {
    category: "Pricing",
    q: "How much does a turf installation or remodel cost?",
    a: "Costs vary based on the size of the project, materials selected, and scope of work. We don't publish flat rates because every project is different — that's why we offer a free assessment. After visiting your property, we deliver a transparent, line-item quote with no hidden fees.",
  },
  {
    category: "Pricing",
    q: "What happens after I submit a contact request?",
    a: "Our team will reach out within 24 hours to introduce ourselves and schedule your free on-site assessment. There is no obligation to move forward. We're here to help you understand your options — at no cost.",
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
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        data-testid={`button-faq-${index}`}
      >
        <span className="text-sm sm:text-base text-[#F5F5F7] font-medium pr-8 group-hover:text-white transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#5D3FD3]/60 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-[#5D3FD3]" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-5 pr-12">
          <p className="text-[#B3B3B8]/75 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

const categories = [...new Set(faqs.map((f) => f.category))];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? faqs.filter((f) => f.category === activeCategory)
    : faqs;

  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-3xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">
          FAQ
        </span>
        <h1
          className="mt-4 text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
          data-testid="text-faq-headline"
        >
          Questions Answered.
        </h1>
        <p className="text-[#B3B3B8] text-lg mb-10">
          Everything you need to know about working with Reign Services across DFW.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-xs uppercase tracking-[0.12em] font-semibold px-3 py-1.5 rounded-sm border transition-colors ${
              activeCategory === null
                ? "bg-[#5D3FD3] text-white border-[#5D3FD3]"
                : "text-[#B3B3B8] border-white/10 hover:border-white/20 hover:text-white"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs uppercase tracking-[0.12em] font-semibold px-3 py-1.5 rounded-sm border transition-colors ${
                activeCategory === cat
                  ? "bg-[#5D3FD3] text-white border-[#5D3FD3]"
                  : "text-[#B3B3B8] border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          {filtered.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        <div
          className="mt-16 p-8 rounded-xl text-center"
          style={{
            background: "rgba(93,63,211,0.08)",
            border: "1px solid rgba(93,63,211,0.25)",
          }}
        >
          <p className="text-white font-semibold mb-2">Have a question we didn't answer?</p>
          <p className="text-[#B3B3B8]/70 text-sm mb-6">
            Reach out through our contact form or use the live chat. Our team responds within 24 hours.
          </p>
          <Link href="/contact?utm_source=faq&utm_medium=cta&utm_campaign=faq">
            <Button
              className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-xs uppercase tracking-[0.15em] font-semibold px-8"
              data-testid="button-faq-contact"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
