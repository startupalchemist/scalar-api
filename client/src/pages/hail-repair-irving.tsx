import { SEOPageLayout } from "@/components/seo-templates";
import type { FAQItem, InternalLink } from "@/components/seo-templates";

const faq: FAQItem[] = [
  {
    q: "How vulnerable is Irving to hail damage?",
    a: "Irving's central DFW location and its proximity to DFW International Airport place it in a zone that receives storm activity moving from multiple directions. The Las Colinas urban center, the airport corridor, and south Irving residential neighborhoods all experience regular hail events between March and June each year.",
  },
  {
    q: "Do you serve the Las Colinas area for hail repair?",
    a: "Yes. Dent Society provides pickup and delivery throughout Irving, including Las Colinas, Valley Ranch, the DFW airport corridor, south Irving, and all surrounding neighborhoods. A complimentary loaner vehicle is provided when we collect your vehicle.",
  },
  {
    q: "How long does hail repair take for Irving customers?",
    a: "Hail repairs are completed within 48 hours after your insurance carrier approves the full repair scope. The 48-hour window begins after insurance approval, including any supplements that may be required.",
  },
  {
    q: "Can Dent Society repair hail damage on company fleet vehicles in Irving?",
    a: "Yes. Dent Society works with fleet managers and corporate vehicle programs. For businesses in Las Colinas and the DFW corridor, we coordinate repairs across multiple vehicles, manage fleet insurance documentation, and offer scheduling that minimizes operational disruption.",
  },
  {
    q: "Does Dent Society work with all insurance companies?",
    a: "Dent Society coordinates with all major insurance carriers operating in Texas, including State Farm, USAA, Allstate, Geico, Progressive, Liberty Mutual, Farmers, and others. We manage the complete claim process regardless of which carrier insures the vehicle.",
  },
];

const links: InternalLink[] = [
  { label: "Hail Damage Repair Specialists", href: "/hail-damage-repair-dallas" },
  { label: "Insurance Claim Assistance", href: "/insurance-claim-assistance" },
  { label: "Free Loaner Vehicles", href: "/free-loaner-vehicles" },
  { label: "Storm Damage Restoration", href: "/storm-damage-restoration" },
  { label: "Contact Us", href: "/contact" },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    {
      "@type": "LocalBusiness",
      name: "Dent Society",
      description: "Professional hail repair and paintless dent repair serving Irving, Texas. Insurance-coordinated repairs with complimentary loaner vehicles and 48-hour completion.",
      url: "https://dentsociety.com/hail-repair-irving",
      telephone: "+1-214-555-0100",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Irving",
        addressRegion: "TX",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "City",
        name: "Irving",
      },
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    },
  ],
};

export default function IrvingHailRepair() {
  return (
    <SEOPageLayout
      badge="Irving"
      title="Hail Repair in Irving, Texas"
      subtitle="Professional hail restoration for Irving vehicle owners. Insurance-coordinated paintless dent repair with complimentary loaner vehicles and 48-hour completion after approval."
      faq={faq}
      internalLinks={links}
      schema={schema}
      midCTA={false}
    >
      <h2>Hail Damage in Irving</h2>
      <p>
        Irving occupies a strategic position in the DFW metroplex, bordered by Dallas to the east, Fort Worth to the west, and DFW International Airport to the north. This central location means Irving receives storm activity from virtually every direction as weather systems move across the metroplex. The city's diverse landscape, from the gleaming corporate towers and luxury apartments of Las Colinas to the established residential neighborhoods of south Irving and the Valley Ranch community in the north, all face consistent hail exposure during the March-through-June storm season.
      </p>
      <p>
        Las Colinas is one of the largest mixed-use urban developments in the Southwest, home to major corporate headquarters, high-rise residential buildings, and thousands of daily commuters. While some parking in Las Colinas is structured, a substantial portion of the vehicle population parks in surface lots adjacent to office buildings, restaurants, and entertainment venues like the Toyota Music Factory along O'Connor Road, Las Colinas Boulevard, and the waterfront area. These vehicles are fully exposed during daytime storm events, which frequently arrive during afternoon business hours.
      </p>
      <p>
        Irving's proximity to DFW International Airport adds another dimension to the city's hail exposure. The airport's surrounding commercial zone, with rental car lots, employee parking areas, and hotel guest parking, contains one of the highest concentrations of exposed vehicles in the entire metroplex. While Dent Society's primary service area focuses on privately owned vehicles, the airport proximity illustrates the scale of hail impact in the Irving corridor. Residential neighborhoods in south Irving, with older housing stock and limited garage coverage, are also heavily affected during significant hail events.
      </p>

      <h2>Paintless Dent Repair for Irving Vehicles</h2>
      <p>
        Paintless dent repair corrects hail damage by working from behind each affected panel with precision tools, reshaping the metal back to factory contour without sanding, body filler, or repainting. The factory paint finish is preserved entirely, which is critical for maintaining both the appearance and long-term value of the vehicle. PDR is the standard for hail damage correction whenever the paint surface remains unbroken.
      </p>
      <p>
        Irving's vehicle population includes a high proportion of corporate and fleet vehicles, including company cars, executive vehicles, and managed fleet units stationed at Las Colinas corporate campuses. These vehicles often carry strict appearance standards and resale requirements that make PDR the only acceptable repair method. Aftermarket paint introduces variability in color match and finish quality that can flag a vehicle for devaluation at lease return or fleet disposition.
      </p>
      <p>
        The repair process at Dent Society begins with a thorough damage assessment under LED reflection boards. Each panel is inspected, and every dent is identified, measured, and mapped. Technicians then work through the vehicle systematically, removing interior trim or lighting assemblies as needed to access the interior surface of each damaged panel. The work is precise and methodical, restoring each dent to factory-flat condition without any visible evidence of repair.
      </p>

      <h3>Fleet and Corporate Vehicle Repair</h3>
      <p>
        Dent Society works with corporate fleet managers and vehicle program administrators throughout the Las Colinas and DFW corridor. For businesses managing multiple hail-damaged vehicles, we offer coordinated scheduling, consolidated insurance documentation, and fleet-level communication to minimize administrative burden and operational disruption. Each vehicle receives the same individual quality standard regardless of fleet size.
      </p>

      <h2>Insurance Coordination for Irving Clients</h2>
      <p>
        Dent Society manages the complete insurance claim process for Irving vehicle owners. We document the damage, coordinate with your carrier's adjusters, file supplements when initial estimates fall short, and handle all follow-up communication until the claim is fully resolved. This end-to-end management means you are not required to track claim status, interpret repair estimates, or negotiate with insurance representatives.
      </p>
      <p>
        Following major hail events in Irving, carriers often deploy mobile adjusters to write initial estimates in high-volume settings. These estimates frequently understate the true scope of the damage. Dent Society bridges this gap with comprehensive supplement packages that include detailed photography, dent counts, and repair methodology aligned with carrier estimating standards. Our documentation is structured for efficient review and approval, which accelerates the timeline from claim to completed repair.
      </p>

      <h2>Complimentary Loaner Vehicles</h2>
      <p>
        Every Irving client whose vehicle is in our facility for hail repair receives a complimentary loaner vehicle at no cost. This service is provided regardless of whether your insurance policy includes rental reimbursement. Whether you commute to a Las Colinas office, travel to the airport regularly, or manage daily errands across Irving and the surrounding cities, you will have reliable transportation for the duration of the repair.
      </p>

      <h2>48-Hour Completion Guarantee</h2>
      <p>
        Dent Society guarantees completion of hail repairs within 48 hours. This timeline begins after your insurance carrier has approved the full repair scope, including any supplements. We maintain the technician staffing and facility capacity to deliver on this commitment consistently, regardless of seasonal demand fluctuations across the DFW market.
      </p>

      <h2>Pickup and Delivery in Irving</h2>
      <p>
        Dent Society offers pickup and delivery throughout Irving. We collect your vehicle from your home, office, or any location within the city, including Las Colinas, Valley Ranch, south Irving, the MacArthur Boulevard corridor, and all surrounding areas. A complimentary loaner is provided at pickup, and your repaired vehicle is returned to the same location upon completion.
      </p>

      <h2>Irving's Professional Hail Repair Resource</h2>
      <p>
        Irving's blend of corporate infrastructure, residential communities, and airport-adjacent commercial zones makes it one of the most vehicle-dense cities in the metroplex. Dent Society serves this market with the expertise, capacity, and insurance coordination capabilities necessary to handle both individual and fleet-level hail repair needs. Our permanent facility, trained technicians, and established carrier relationships provide Irving vehicle owners with a reliable, professional repair partner that delivers consistent results.
      </p>
    </SEOPageLayout>
  );
}
