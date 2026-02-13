import { SEOPageLayout } from "@/components/seo-templates";
import type { FAQItem, InternalLink } from "@/components/seo-templates";

const faq: FAQItem[] = [
  {
    q: "How common is hail damage in Plano, TX?",
    a: "Plano experiences multiple hail events per year, with the most significant activity occurring between March and June. The city's position in Collin County places it directly in the path of supercell thunderstorms that move northeast across the metroplex. Recent years have seen several storms produce hail in excess of two inches across west Plano, Legacy, and the Spring Creek corridor.",
  },
  {
    q: "Do you offer pickup and delivery for hail repair in Plano?",
    a: "Yes. Dent Society provides pickup and delivery service throughout Plano, including the Legacy West area, Shops at Legacy, Willow Bend, west Plano, and east Plano neighborhoods. We collect your vehicle, leave a complimentary loaner, complete the repair, and return your car to the same location.",
  },
  {
    q: "How long does hail repair take for Plano customers?",
    a: "Hail repairs are completed within 48 hours after insurance approval is received. The 48-hour window begins once your carrier has authorized the full repair scope, including any supplements. During peak storm season, we recommend scheduling promptly to secure availability.",
  },
  {
    q: "Will paintless dent repair damage my car's paint?",
    a: "No. Paintless dent repair is specifically designed to preserve your vehicle's original factory finish. Technicians access the backside of dented panels and reshape the metal without sanding, filling, or repainting. The result is an invisible repair that maintains your vehicle's full resale value.",
  },
  {
    q: "Can Dent Society work with my insurance company in Plano?",
    a: "Dent Society coordinates directly with all major insurance carriers in Texas. We handle the entire claim process including initial documentation, adjuster communication, supplement filing, and payment reconciliation. You are not required to manage any aspect of the claim yourself.",
  },
  {
    q: "Is there a cost for the loaner vehicle during my hail repair?",
    a: "No. Dent Society provides complimentary loaner vehicles at no charge to every hail repair client. This service is not contingent on your insurance policy including rental reimbursement. You will have a vehicle to drive for the full duration of the repair.",
  },
];

const links: InternalLink[] = [
  { label: "Dallas Hail Damage Repair Services", href: "/hail-damage-repair-dallas" },
  { label: "Insurance Claim Assistance", href: "/insurance-claim-assistance" },
  { label: "Free Loaner Vehicles", href: "/free-loaner-vehicles" },
  { label: "Paintless Dent Repair in Dallas", href: "/paintless-dent-repair-dallas" },
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
      description: "Professional hail repair and paintless dent repair serving Plano, Texas. Insurance-coordinated repairs with complimentary loaner vehicles and 48-hour completion.",
      url: "https://dentsociety.com/hail-repair-plano",
      telephone: "+1-214-555-0100",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Plano",
        addressRegion: "TX",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "City",
        name: "Plano",
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

export default function PlanoHailRepair() {
  return (
    <SEOPageLayout
      badge="Plano"
      title="Hail Repair in Plano, Texas"
      subtitle="Professional paintless dent repair for Plano vehicle owners. Full insurance coordination, complimentary loaner vehicles, and 48-hour completion after approval."
      faq={faq}
      internalLinks={links}
      schema={schema}
      midCTA={false}
    >
      <h2>Hail Damage in Plano</h2>
      <p>
        Plano's location in southern Collin County puts it squarely within the path of North Texas supercell thunderstorms that develop along the dryline boundary each spring. The city's mix of established neighborhoods and newer commercial corridors, from the dense retail environment around Legacy West and the Shops at Legacy to the residential subdivisions west of Coit Road and east of Jupiter Road, means that thousands of vehicles are parked outdoors during any given storm event. When hail arrives, and it arrives consistently between March and June, the damage can be widespread.
      </p>
      <p>
        Plano has been the target of several significant hail events in recent memory. Storms producing two-inch and larger hailstones have moved through the city along corridors that follow Spring Creek and the Dallas North Tollway, impacting vehicles parked at office complexes near Legacy Drive, in residential driveways in Willow Bend, and in open lots throughout the retail corridors along West Park Boulevard and Preston Road. The consistency of these events makes hail damage a predictable maintenance concern for Plano vehicle owners rather than a rare occurrence.
      </p>
      <p>
        The character of hail damage in Plano tends to follow the same pattern seen across the metroplex: horizontal surfaces like hoods, roofs, and trunk lids absorb the heaviest impact, while quarter panels and doors may show damage depending on wind direction during the storm. Vehicles parked in the open near Legacy West or in the expansive lots around the Shops at Legacy are particularly exposed, as these areas offer minimal tree canopy or structural cover.
      </p>

      <h2>Paintless Dent Repair in Plano</h2>
      <p>
        Paintless dent repair is the standard for hail damage correction when the paint surface remains unbroken. PDR technicians work from behind each affected panel, using precision metal tools to reshape dented areas back to factory contour without sanding, filling, or repainting. The technique preserves the original factory finish, which is applied under conditions that cannot be duplicated in an aftermarket paint booth, and maintains the vehicle's full resale value.
      </p>
      <p>
        The repair process at Dent Society begins with a thorough inspection under controlled LED lighting. Every dent on every panel is identified, measured, and documented. This comprehensive damage map serves dual purposes: it guides the repair sequence and forms the foundation of the insurance claim documentation. Technicians then work systematically through the vehicle, removing interior trim, headliners, or lighting assemblies as needed to access the interior surfaces of damaged panels.
      </p>
      <p>
        For Plano clients driving high-end vehicles, and the city has one of the highest concentrations of luxury vehicles in the DFW area, PDR offers a critical advantage. Luxury manufacturers like Mercedes-Benz, BMW, Porsche, and Lexus apply multi-stage paint systems that are extraordinarily difficult to match in a respray. PDR eliminates this concern entirely by leaving the original finish untouched.
      </p>

      <h3>How PDR Differs from Body Shop Repair</h3>
      <p>
        Traditional body shop repair for hail damage involves sanding the affected panels to bare metal, applying body filler to level the surface, priming, and repainting. This process takes significantly longer, typically one to three weeks, and results in panels that carry aftermarket paint. While a quality respray may look acceptable initially, it will never match the durability, depth, or UV resistance of the original factory application. PDR avoids all of these compromises by working entirely from the inside of the panel.
      </p>

      <h2>Insurance Coordination for Plano Clients</h2>
      <p>
        Dent Society handles every aspect of the insurance claim process for Plano vehicle owners. From the moment you contact us, our team manages the claim documentation, adjuster communication, and supplement filing required to secure full authorization for your repair. You are not required to negotiate with your carrier, chase adjuster callbacks, or interpret repair estimate line items.
      </p>
      <p>
        Insurance estimates for hail damage are frequently understated on the initial assessment. Adjusters working in high-volume storm environments may miss dents that are only visible under controlled lighting, or they may apply repair methodologies that do not fully account for the labor required to correct the damage. When this happens, Dent Society prepares and submits a supplement with detailed photographic evidence, accurate dent counts, and line-item breakdowns aligned with carrier-approved standards. We manage all follow-up until the supplement is approved and the full repair scope is authorized.
      </p>

      <h2>Complimentary Loaner Vehicles</h2>
      <p>
        Every Plano client whose vehicle is in our facility for hail repair receives a complimentary loaner vehicle. This is not a rental car arrangement, and it is not billed to your insurance. Dent Society provides the loaner at no cost so that you can maintain your commute along the Tollway, your errands along Preston Road, and your daily routine without interruption while your car is being repaired.
      </p>

      <h2>48-Hour Completion Guarantee</h2>
      <p>
        Hail repairs at Dent Society are completed within 48 hours of insurance approval. This means the clock starts after your carrier has authorized the full repair scope, including any supplements. We maintain dedicated bay capacity and technician scheduling to honor this commitment even during peak storm demand. The 48-hour guarantee is an operational standard, not an aspirational estimate.
      </p>

      <h2>Pickup and Delivery in Plano</h2>
      <p>
        Dent Society offers pickup and delivery service throughout Plano. We will collect your vehicle from your home, your office near Legacy Drive, or any location within the city, provide a loaner, and return your repaired vehicle to the same address. This service covers all Plano neighborhoods, including Legacy West, Shops at Legacy, Willow Bend, west Plano, east Plano, and the communities along Spring Creek Parkway.
      </p>

      <h2>Serving Plano Vehicle Owners</h2>
      <p>
        Plano is home to a significant population of discerning vehicle owners who expect repair quality that matches the caliber of their cars. Dent Society's approach is built for this standard. Our technicians are trained to factory-level PDR standards, our insurance coordination eliminates the administrative burden of the claim process, and our loaner vehicle program ensures zero disruption to your schedule. From the initial damage assessment through final quality inspection, every step is handled with the precision and professionalism that Plano residents expect.
      </p>
      <p>
        Whether your vehicle was damaged in a parking structure at Legacy West, in a driveway off Custer Road, or in an open lot along the George Bush Turnpike corridor, Dent Society delivers the same result: a vehicle restored to its pre-storm condition, on time, and without compromise.
      </p>
    </SEOPageLayout>
  );
}
