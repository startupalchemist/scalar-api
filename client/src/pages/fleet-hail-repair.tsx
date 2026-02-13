import { SEOPageLayout } from "@/components/seo-templates";
import type { FAQItem, InternalLink } from "@/components/seo-templates";

const faq: FAQItem[] = [
  {
    q: "How many vehicles can Dent Society process at once for fleet hail repair?",
    a: "Our facility and mobile teams are structured to handle fleet repairs ranging from 10 vehicles to over 500. We scale technician deployment based on the size of the engagement, and we maintain capacity agreements that allow us to mobilize additional certified PDR specialists during high-volume periods. Fleet managers receive a phased repair schedule before work begins so that vehicle availability is maintained throughout the process.",
  },
  {
    q: "Does Dent Society coordinate insurance claims for entire fleets?",
    a: "Yes. We handle batch insurance coordination as a core component of our fleet services. This includes filing individual claims per vehicle, managing adjuster scheduling across the fleet, submitting supplements where initial estimates fall short, and tracking approval status for every unit. Our administrative team communicates directly with your carrier so that your fleet manager is not burdened with per-vehicle claim management.",
  },
  {
    q: "What is the typical turnaround time for fleet hail repair?",
    a: "Turnaround depends on fleet size and damage severity, but we commit to defined timelines before work begins. For fleets under 50 vehicles with moderate hail damage, most units are completed within 5 to 7 business days. Larger fleets are repaired in scheduled phases so that a portion of the fleet remains operational at all times. Our 48-hour per-vehicle completion standard applies once insurance authorization is received for each unit.",
  },
  {
    q: "Can fleet vehicles be repaired on-site at our facility?",
    a: "We offer both on-site and off-site repair options depending on your operational needs. On-site repair is available for fleets with adequate covered staging area and is often preferred by companies that cannot afford extended vehicle downtime. Off-site repair at our facility is recommended when damage severity requires controlled lighting and specialized tooling access. We assess which approach is optimal during the initial fleet inspection.",
  },
  {
    q: "Do you offer preferred vendor or master service agreements for fleet accounts?",
    a: "We do. Dent Society maintains preferred vendor agreements with fleet operators, leasing companies, and corporate transportation departments across the DFW region. These agreements establish pre-negotiated rates, priority scheduling, dedicated account management, and defined service-level commitments. Fleet accounts with active agreements receive expedited response during storm season when demand is highest.",
  },
  {
    q: "Will fleet vehicles retain their original paint after hail repair?",
    a: "Paintless dent repair preserves the factory finish on every vehicle. This is particularly important for fleet operators because it maintains warranty coverage, eliminates color-match concerns across uniform fleets, and preserves resale value. Unlike traditional body shop repair that requires filler and repaint, PDR restores panels to their original condition without altering the paint surface.",
  },
];

const internalLinks: InternalLink[] = [
  { label: "Hail Damage Repair in Dallas", href: "/hail-damage-repair-dallas" },
  { label: "Insurance Claim Assistance", href: "/insurance-claim-assistance" },
  { label: "Dealership Hail Services", href: "/dealership-hail-services" },
  { label: "Commercial Fleet PDR", href: "/commercial-fleet-pdr" },
  { label: "Contact Us", href: "/contact" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fleet Hail Repair Services",
  provider: {
    "@type": "LocalBusiness",
    name: "Dent Society",
    url: "https://dentsociety.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
      addressCountry: "US",
    },
  },
  description: "Professional fleet hail repair services in Dallas-Fort Worth. Batch insurance coordination, dedicated account management, and priority scheduling for fleets of 10 to 500+ vehicles.",
  areaServed: {
    "@type": "Place",
    name: "Dallas-Fort Worth Metroplex",
  },
  serviceType: "Fleet Hail Damage Repair",
};

export default function FleetHailRepair() {
  return (
    <SEOPageLayout
      badge="Fleet Services"
      title="Fleet Hail Repair in Dallas-Fort Worth"
      subtitle="Structured repair programs for commercial fleets, leasing companies, and corporate vehicle operations across the DFW metroplex."
      faq={faq}
      internalLinks={internalLinks}
      midCTA={true}
      schema={schema}
    >
      <h2>Managing Hail Damage Across an Entire Fleet</h2>
      <p>
        When a hailstorm impacts a commercial fleet, the damage is not limited to a single vehicle. Dozens or hundreds of units can sustain dents, cracked trim, and compromised surfaces in a single weather event. The operational challenge extends well beyond cosmetic repair. Fleet managers must coordinate insurance claims, maintain vehicle availability, manage repair scheduling, and ensure that every unit returns to service in condition that meets company standards and lease return requirements.
      </p>
      <p>
        Dent Society provides fleet hail repair services designed specifically for this scale of operation. Our approach is built around batch processing, dedicated account coordination, and phased scheduling that keeps your fleet moving while repairs are completed. We work with fleets ranging from 10 vehicles to more than 500, and our infrastructure is designed to scale with the size of the engagement.
      </p>

      <h2>Volume Handling Capabilities</h2>
      <p>
        Our fleet repair program is not a scaled-up version of retail service. It is a distinct operational framework built for volume. When a fleet engagement begins, we deploy a dedicated project team that includes a fleet coordinator, lead technician, insurance liaison, and quality control inspector. This team manages the repair from initial damage assessment through final vehicle release.
      </p>
      <p>
        For fleets under 50 vehicles, we typically assign a core team of 4 to 6 technicians who work through the fleet in a structured sequence. Larger engagements of 100 or more vehicles receive expanded teams and, when necessary, we bring in additional certified technicians from our network to maintain the committed timeline. Every technician working under a Dent Society fleet engagement operates under our quality standards and inspection protocols.
      </p>
      <p>
        We maintain the tooling, lighting equipment, and staging infrastructure to process high volumes without compromising repair quality. Each vehicle undergoes the same panel-by-panel inspection, photographic documentation, and post-repair quality review regardless of whether it is vehicle number 3 or vehicle number 300 in the queue.
      </p>

      <h2>Insurance Batch Coordination</h2>
      <p>
        Insurance coordination is often the most time-consuming element of fleet hail repair. Each vehicle in a fleet typically requires its own claim, its own adjuster inspection, and its own approval cycle. When those claims number in the dozens or hundreds, the administrative burden can overwhelm internal fleet management teams.
      </p>
      <p>
        Dent Society handles this entire process. Our insurance coordination team files individual claims, schedules adjuster visits in batches to minimize disruption, prepares detailed damage documentation with photographic evidence for each vehicle, and manages supplement submissions when initial estimates do not reflect the full scope of damage. We track every claim through approval and maintain a dashboard that fleet managers can reference at any point to see the status of each unit.
      </p>
      <p>
        We work with all major commercial insurance carriers and have established relationships with the adjusting firms most active in the DFW market. This familiarity with carrier processes and documentation standards results in faster approvals and fewer claim disputes.
      </p>

      <h2>Preferred Vendor Agreements</h2>
      <p>
        For fleet operators who want to establish an ongoing repair relationship rather than managing vendor selection after each storm event, we offer preferred vendor agreements. These agreements define service-level commitments, pricing structures, response timelines, and communication protocols in advance so that when a hailstorm occurs, the repair process activates immediately without the delays of vendor evaluation and negotiation.
      </p>
      <p>
        Preferred vendor clients receive priority scheduling during storm season, which is the period when repair capacity across the market becomes constrained. They also receive dedicated account management from a named coordinator who understands their fleet composition, operational requirements, and insurance relationships. This continuity eliminates the onboarding delays that occur when working with a new provider after each weather event.
      </p>

      <h2>Turnaround Commitments and Phased Scheduling</h2>
      <p>
        Fleet downtime has a direct financial impact. Vehicles that are sidelined for repair are vehicles that are not generating revenue, serving customers, or fulfilling operational commitments. Our repair scheduling is designed to minimize this impact through phased processing.
      </p>
      <p>
        Rather than pulling an entire fleet offline simultaneously, we work with fleet managers to establish a rotation schedule. A defined number of vehicles enter the repair queue each day while the remainder continue to operate. As vehicles are completed and returned, additional units rotate in. This approach ensures that the fleet maintains operational capacity throughout the repair period.
      </p>
      <p>
        For each vehicle, our standard turnaround is 48 hours from the point of insurance approval. This commitment applies to moderate hail damage typical of DFW storm events. Vehicles with severe damage requiring panel replacement or glass work may require additional time, but these exceptions are identified during the initial assessment and communicated to the fleet manager before work begins.
      </p>

      <h2>Dedicated Account Management</h2>
      <p>
        Every fleet engagement is assigned a dedicated account manager who serves as the single point of contact for the fleet operator. This individual manages scheduling, communicates repair status, coordinates with insurance representatives, and resolves any issues that arise during the repair process. Fleet managers do not need to contact multiple departments or track down information from different sources.
      </p>
      <p>
        Account managers provide regular status updates at intervals agreed upon during the engagement setup. These updates include the number of vehicles completed, units currently in process, pending insurance approvals, and projected completion dates. For large fleet engagements, we provide weekly summary reports that can be forwarded to corporate stakeholders or leasing partners.
      </p>

      <h2>Priority Scheduling During Storm Season</h2>
      <p>
        The Dallas-Fort Worth area experiences its most intense hail activity between March and June. During these months, repair demand across the market surges and many providers become capacity-constrained. Fleet accounts with Dent Society receive priority access to our scheduling capacity during these peak periods.
      </p>
      <p>
        This priority status means that fleet repairs are not placed behind a backlog of retail customers. Our capacity planning reserves a defined percentage of our technician hours for fleet accounts, ensuring that commercial clients receive timely service even when retail demand is at its highest. This reservation model is outlined in our preferred vendor agreements and is one of the primary advantages of establishing a fleet relationship before storm season begins.
      </p>

      <h2>Fleet Size Flexibility: 10 to 500+ Vehicles</h2>
      <p>
        Our fleet services are not limited to large national operations. We work with local businesses that operate 10 to 20 vehicles, regional companies with fleets of 50 to 100, and enterprise-level operations managing 500 or more units across the DFW market. The scope of our engagement scales to match the fleet size, but the core elements remain consistent: dedicated coordination, batch insurance processing, phased scheduling, and quality-controlled repair.
      </p>
      <p>
        Small fleet operators benefit from the same professional infrastructure that larger clients receive. Insurance coordination, photographic documentation, supplement management, and quality inspection are applied to every engagement regardless of fleet size. The difference in scale is reflected in team sizing and scheduling duration, not in service quality or process rigor.
      </p>
      <p>
        For fleet managers evaluating hail repair options in the Dallas-Fort Worth area, we recommend beginning the conversation before storm season. Establishing the vendor relationship, defining service parameters, and completing any necessary master service agreements in advance allows for immediate activation when a weather event occurs. This preparation eliminates the delays that cost fleet operators time and money when they are forced to evaluate providers under the pressure of post-storm demand.
      </p>
    </SEOPageLayout>
  );
}
