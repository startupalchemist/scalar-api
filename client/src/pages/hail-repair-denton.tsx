import { SEOPageLayout } from "@/components/seo-templates";
import type { FAQItem, InternalLink } from "@/components/seo-templates";

const faq: FAQItem[] = [
  {
    q: "How does hail damage affect vehicles in Denton?",
    a: "Denton sits at the northern edge of the DFW metroplex where storm systems developing over the cross-timbers terrain frequently produce damaging hail between March and June. Vehicles parked in open lots near UNT, TWU, and along the I-35E and I-35W corridors are particularly exposed during severe weather events.",
  },
  {
    q: "Do you provide pickup and delivery service in Denton?",
    a: "Yes. Dent Society offers pickup and delivery throughout Denton, including the UNT campus area, TWU area, historic downtown Denton square, Robson Ranch, Rayzor Ranch, and all surrounding neighborhoods. A complimentary loaner vehicle is provided when we collect your car.",
  },
  {
    q: "How long will my hail repair take in Denton?",
    a: "Hail repairs are completed within 48 hours after insurance approval is received. This timeline begins once your carrier has authorized the full repair scope, including any supplements. We maintain the capacity to meet this commitment even during peak storm season.",
  },
  {
    q: "Can college students in Denton use your hail repair service?",
    a: "Absolutely. Dent Society works with vehicle owners of all ages. For UNT and TWU students, we coordinate with the policyholder's insurance carrier, which is often a parent's policy. We handle all documentation and communication regardless of who holds the policy.",
  },
  {
    q: "Does Dent Society handle insurance claims for Denton customers?",
    a: "Yes. We manage the entire insurance claim process, from initial documentation through supplement filing and final payment. There is no additional charge for this service, and you are not required to interact with your carrier's adjuster directly.",
  },
];

const links: InternalLink[] = [
  { label: "Dallas Hail Repair Experts", href: "/hail-damage-repair-dallas" },
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
      description: "Professional hail repair and paintless dent repair serving Denton, Texas. Insurance-coordinated repairs with complimentary loaner vehicles and 48-hour completion.",
      url: "https://dentsociety.com/hail-repair-denton",
      telephone: "+1-214-555-0100",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Denton",
        addressRegion: "TX",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "City",
        name: "Denton",
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

export default function DentonHailRepair() {
  return (
    <SEOPageLayout
      badge="Denton"
      title="Hail Repair in Denton, Texas"
      subtitle="Professional paintless dent repair for Denton vehicle owners. Full insurance coordination, complimentary loaner vehicles, and 48-hour completion after approval."
      faq={faq}
      internalLinks={links}
      schema={schema}
      midCTA={false}
    >
      <h2>Hail Damage in Denton</h2>
      <p>
        Denton, the county seat of Denton County, occupies a unique position at the northern boundary of the Dallas-Fort Worth metroplex, where the terrain transitions from the Blackland Prairie into the rolling hills of the eastern Cross Timbers. This geographic transition zone creates localized atmospheric effects that can intensify thunderstorm development, particularly during the spring months when warm, moist Gulf air collides with cooler, drier air moving southward. The result is a hail season that runs from March through June and regularly produces damaging stones across the city and surrounding Denton County.
      </p>
      <p>
        The city's two major universities, the University of North Texas and Texas Woman's University, contribute a substantial student vehicle population that is largely parked in open surface lots. These lots, spread across both campuses, offer virtually no protection from hail. A single storm cell passing over the UNT campus can damage hundreds of vehicles in minutes. The same is true for vehicles parked near the TWU campus along Bell Avenue and in the neighborhoods between the two schools.
      </p>
      <p>
        Beyond the university areas, Denton's historic downtown square, the growing residential corridors along Teasley Lane and Ryan Road, and the master-planned community of Robson Ranch in southeast Denton all face regular hail exposure. The Rayzor Ranch commercial district along I-35W is another high-exposure area, with large surface parking lots serving retail and restaurant tenants. For Denton vehicle owners, hail damage is a seasonal certainty rather than an unlikely event.
      </p>

      <h2>Paintless Dent Repair for Denton Vehicles</h2>
      <p>
        Paintless dent repair is the standard approach for hail damage when the vehicle's paint surface remains intact. PDR works from behind each damaged panel, using precision metal tools to reshape dents back to factory contour without sanding, filling, or repainting. The factory finish is preserved entirely, which is important for maintaining vehicle value and appearance.
      </p>
      <p>
        For Denton's student population, PDR offers practical advantages beyond quality. The faster turnaround time means less time without a vehicle, and the lower cost compared to body shop repair means lower insurance premiums over time since the claim amount is typically reduced. For vehicles that students may sell after graduation, the absence of aftermarket paint on the vehicle history protects resale value.
      </p>
      <p>
        The PDR process at Dent Society begins with a detailed damage assessment. Every panel is inspected under controlled LED lighting to identify each dent, including subtle impacts that are invisible to the naked eye under normal conditions. The resulting damage map guides the repair and forms the basis of insurance claim documentation. Technicians then work systematically through the vehicle, accessing the backside of each panel through interior cavities, tail lamp openings, or by removing trim panels as needed.
      </p>

      <h3>When PDR Is and Is Not Applicable</h3>
      <p>
        PDR is effective on the vast majority of hail damage, including dents ranging from shallow dimples to deeper depressions. The limiting factor is the condition of the paint surface. If a hailstone has cracked, chipped, or fractured the paint at the point of impact, that specific dent may require conventional repair involving sanding and repainting on that panel. Our assessment identifies these cases clearly, and we communicate the repair plan to both the client and the insurance carrier transparently.
      </p>

      <h2>Insurance Coordination for Denton Clients</h2>
      <p>
        Dent Society manages the full insurance claim process for Denton vehicle owners. This includes damage documentation, adjuster coordination, supplement preparation, and all follow-up communication through final claim resolution. For university students whose vehicles are insured under a parent's policy, we coordinate with the policyholder regardless of their location, managing the claim remotely and ensuring the student is not burdened with administrative tasks.
      </p>
      <p>
        Initial insurance estimates for hail damage often understate the true scope of the damage, particularly after large-scale storm events when adjusters are working through high volumes of claims quickly. Dent Society addresses this by preparing detailed supplement documentation with high-resolution photography, panel-by-panel dent counts, and repair methodology breakdowns that meet carrier compliance standards. This documentation is submitted directly to the carrier, and our team manages all follow-up until approval is received.
      </p>

      <h2>Complimentary Loaner Vehicles</h2>
      <p>
        Dent Society provides a complimentary loaner vehicle to every Denton client during the repair process. This service is free of charge and does not require rental coverage on your insurance policy. For Denton residents and students who rely on their vehicle for commuting, campus transportation, or daily errands, the loaner program ensures zero disruption to your routine while your car is in our facility.
      </p>

      <h2>48-Hour Completion Guarantee</h2>
      <p>
        Hail repairs are completed within 48 hours of insurance approval. The 48-hour timeline begins after your carrier has authorized the full repair scope, including any supplements. This commitment is maintained through dedicated scheduling protocols and sufficient technician capacity, even during the high-volume weeks following major storm events across the DFW area.
      </p>

      <h2>Pickup and Delivery in Denton</h2>
      <p>
        Dent Society offers pickup and delivery service throughout Denton and surrounding areas. We collect your vehicle from any location in the city, including near the UNT campus, TWU campus, historic downtown square, Robson Ranch, Rayzor Ranch, and all residential neighborhoods. A complimentary loaner vehicle is provided at the time of pickup, and your repaired car is returned to the same location upon completion.
      </p>

      <h2>Denton's Professional Hail Repair Partner</h2>
      <p>
        Denton's combination of a large student population, expanding residential development, and consistent hail exposure creates a sustained need for professional repair services. Dent Society serves this community with the same precision and professionalism that we bring to every DFW city we operate in. Our commitment to quality repair, transparent insurance coordination, and client convenience applies equally whether the vehicle is a student's first car or a family's primary transportation.
      </p>
    </SEOPageLayout>
  );
}
