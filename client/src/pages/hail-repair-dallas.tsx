import { SEOPageLayout } from "@/components/seo-templates";
import type { FAQItem, InternalLink } from "@/components/seo-templates";

const faq: FAQItem[] = [
  {
    q: "How quickly can hail damage be repaired in Dallas?",
    a: "Dent Society completes most hail repairs within 48 hours. This timeline begins after your insurance carrier has approved the full repair scope, including any supplements. During peak storm season in April and May, we recommend scheduling promptly to secure your spot.",
  },
  {
    q: "Does insurance cover hail repair in Dallas?",
    a: "Yes. Comprehensive auto insurance policies in Texas cover hail damage minus your deductible. Dent Society coordinates directly with all major carriers including State Farm, USAA, Allstate, Geico, Progressive, and Liberty Mutual. We handle the entire claim process from documentation through final payment.",
  },
  {
    q: "Can hail dents be fixed without repainting?",
    a: "In the vast majority of cases, yes. Paintless dent repair preserves your vehicle's original factory finish by reshaping the metal from behind the panel. This method is faster, less expensive, and maintains your vehicle's resale value compared to conventional body shop repair that requires sanding, filling, and repainting.",
  },
  {
    q: "Do you provide loaner cars during hail repair in Dallas?",
    a: "Dent Society provides complimentary loaner vehicles at no cost to the client, regardless of whether your insurance policy includes rental coverage. You will have a vehicle to drive while your car is in our facility, keeping your daily routine uninterrupted.",
  },
  {
    q: "What areas of Dallas do you serve for hail repair?",
    a: "We serve every neighborhood in Dallas proper, including Uptown, Park Cities, Lake Highlands, Preston Hollow, Oak Lawn, Deep Ellum, Lakewood, White Rock, Far North Dallas, and the Design District. We also offer pickup and delivery service throughout the city.",
  },
  {
    q: "What if my insurance estimate does not cover the full repair cost?",
    a: "Initial insurance estimates frequently understate the actual damage. Dent Society prepares and submits detailed supplement documentation, including high-resolution photography and panel-by-panel dent maps, to your carrier. Our supplement approval rate is consistently high because our documentation meets carrier-compliance standards.",
  },
];

const links: InternalLink[] = [
  { label: "Hail Damage Repair Dallas", href: "/hail-damage-repair-dallas" },
  { label: "Insurance Claim Assistance", href: "/insurance-claim-assistance" },
  { label: "Free Loaner Vehicles", href: "/free-loaner-vehicles" },
  { label: "PDR vs. Body Shop", href: "/pdr-vs-body-shop" },
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
      description: "Professional hail repair and paintless dent repair in Dallas, Texas. Insurance-coordinated repairs with complimentary loaner vehicles and 48-hour completion.",
      url: "https://dentsociety.com/hail-repair-dallas",
      telephone: "+1-214-555-0100",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dallas",
        addressRegion: "TX",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "City",
        name: "Dallas",
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

export default function DallasHailRepair() {
  return (
    <SEOPageLayout
      badge="Dallas"
      title="Hail Repair in Dallas, Texas"
      subtitle="Expert paintless dent repair for Dallas vehicle owners. Insurance-coordinated hail restoration with complimentary loaner vehicles and 48-hour completion after approval."
      faq={faq}
      internalLinks={links}
      schema={schema}
      midCTA={false}
    >
      <h2>Hail Damage in Dallas</h2>
      <p>
        Dallas sits at the heart of one of the most hail-active corridors in the United States. The city's position in North Texas, where warm, humid air from the Gulf of Mexico meets cold fronts sweeping down from the Great Plains, creates atmospheric instability that fuels powerful supercell thunderstorms from March through June each year. These storms routinely produce hailstones ranging from one inch to three inches in diameter, and in severe outbreak years, stones the size of softballs have been documented across the metroplex.
      </p>
      <p>
        For Dallas residents, hail damage to vehicles is a recurring reality. Whether you park in Uptown, commute through the Mixmaster interchange, or keep your car in a driveway in Lake Highlands, exposure to hail is essentially unavoidable during storm season. The neighborhoods of Preston Hollow, Park Cities, Lakewood, and Far North Dallas have all experienced significant hail events in recent years, and the frequency of damaging storms shows no sign of declining.
      </p>
      <p>
        The cosmetic and structural effects of hail impact vary depending on stone size, wind speed, and the angle of impact. Smaller hail creates shallow dimples across horizontal surfaces like hoods, roofs, and trunk lids. Larger stones can crack paint, shatter windshields, and produce deep depressions that compromise panel integrity. In every case, the damage reduces your vehicle's appearance and resale value if left unaddressed.
      </p>

      <h2>Paintless Dent Repair for Dallas Hail Damage</h2>
      <p>
        Paintless dent repair is the preferred method for correcting hail damage when the factory paint surface remains intact. Rather than sanding, filling, and repainting panels, PDR technicians access the backside of each dented panel and use precision metal tools to reshape the surface back to its original contour. The result is a repair that is invisible under inspection and preserves the vehicle's factory finish entirely.
      </p>
      <p>
        The process begins with a comprehensive damage assessment under controlled LED lighting. Every dent on every panel is identified, counted, and mapped. This damage map becomes the blueprint for both the repair and the insurance documentation. Our technicians then systematically work through each panel, removing interior trim, tail lamps, or headliners as necessary to gain access to the affected areas.
      </p>
      <p>
        PDR requires significant skill and training. Each dent must be worked gradually, applying controlled pressure to avoid overcorrection or surface waviness. For areas where backside access is restricted by structural bracing or adhesive, glue-pulling techniques are employed. A specialized adhesive tab is bonded to the dent surface, and a mechanical puller draws the metal outward in a controlled manner.
      </p>

      <h3>Advantages Over Traditional Body Shop Repair</h3>
      <ul>
        <li>Preserves the original factory paint, which cannot be replicated in an aftermarket environment</li>
        <li>Completed in a fraction of the time required for sand-fill-repaint cycles</li>
        <li>Lower overall cost, benefiting both the vehicle owner and insurance carrier</li>
        <li>Maintains full resale value by avoiding aftermarket paint records on vehicle history reports</li>
      </ul>

      <h2>Insurance Claim Coordination</h2>
      <p>
        Navigating a hail damage insurance claim can be time-consuming and confusing. Dent Society manages the entire process on your behalf, from initial claim filing through final payment. We work directly with your carrier's adjusters and supplement teams to ensure the repair scope is accurately documented and fully authorized.
      </p>
      <p>
        Initial insurance estimates for hail damage frequently understate the true extent of the damage. When this occurs, our team prepares a detailed supplement package that includes high-resolution photographs, panel-by-panel dent counts, and line-item repair breakdowns that align with carrier-approved methodologies. This documentation is submitted directly to your carrier for review and approval, and we manage all follow-up communication until the supplement is resolved.
      </p>
      <p>
        Our team has established working relationships with every major insurance carrier in the Texas market. These relationships, combined with our thorough documentation standards, result in faster supplement approvals and fewer claim disputes. The goal is straightforward: you drop off your vehicle, and we handle everything else.
      </p>

      <h2>Complimentary Loaner Vehicles</h2>
      <p>
        Every hail repair client at Dent Society receives a complimentary loaner vehicle for the duration of the repair. This service is provided at no cost and is not dependent on your insurance policy including rental coverage. We maintain a dedicated loaner fleet specifically for this purpose, so you are never left without transportation while your vehicle is in our care.
      </p>

      <h2>48-Hour Completion Guarantee</h2>
      <p>
        Dent Society guarantees completion of hail repairs within 48 hours. This commitment begins after your insurance carrier has approved the full repair scope, including any supplements. We maintain the staffing, facility capacity, and parts-staging protocols necessary to honor this timeline even during the busiest weeks of storm season. The 48-hour window is an operational commitment, not a marketing estimate.
      </p>

      <h2>Pickup and Delivery in Dallas</h2>
      <p>
        For Dallas clients who prefer not to drive to our facility, Dent Society offers pickup and delivery service. We will collect your vehicle from your home, office, or any location within the Dallas city limits, provide you with a loaner vehicle, complete the repair, and return your car to the same location. This service is available throughout Dallas, including Uptown, Downtown, Oak Cliff, North Dallas, East Dallas, and all surrounding neighborhoods.
      </p>

      <h2>Why Dallas Vehicle Owners Choose Dent Society</h2>
      <p>
        Dallas is home to dozens of hail repair operations that emerge after every major storm. Many of these are transient outfits that set up in parking lots, perform repairs of inconsistent quality, and leave town before the next season. Dent Society is a permanent, established operation with a fixed facility, a trained technician staff, and an infrastructure designed to handle high-volume storm events without compromising repair quality.
      </p>
      <p>
        Our approach is built around three principles: repair quality that meets factory standards, insurance coordination that eliminates administrative burden for the vehicle owner, and a client experience that respects your time and your vehicle. From the initial inspection through final delivery, every step of the process is managed with professionalism and precision.
      </p>
    </SEOPageLayout>
  );
}
