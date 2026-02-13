import { SEOPageLayout } from "@/components/seo-templates";
import type { FAQItem, InternalLink } from "@/components/seo-templates";

const faq: FAQItem[] = [
  {
    q: "Can Dent Society repair hail damage on-lot at our dealership?",
    a: "Yes. We offer on-lot repair services for dealerships that prefer to keep inventory on-site during the repair process. Our mobile teams bring the necessary tooling, lighting, and equipment to your lot and work through the inventory in a structured sequence. For severe damage or vehicles requiring controlled conditions, we also offer transport to our facility with expedited turnaround to minimize the time vehicles are off your lot.",
  },
  {
    q: "How does hail repair differ for new versus used vehicle inventory?",
    a: "New inventory repair prioritizes absolute cosmetic perfection to maintain the vehicle's status as new and unaltered. Every panel is restored to factory specification with no compromise to the original finish. Used inventory repair focuses on cost-effective restoration that brings the vehicle to retail-ready condition. Both categories receive full photographic documentation, but the quality benchmarks and pricing structures differ to reflect the distinct standards each category requires.",
  },
  {
    q: "Does Dent Society handle insurance claims for dealer inventory?",
    a: "We manage the entire insurance coordination process for dealer inventory claims. This includes filing the claim, preparing detailed per-vehicle damage documentation, coordinating adjuster inspections, and submitting supplements when the initial estimate does not cover the full repair scope. Dealer inventory claims often involve commercial policies with different structures than individual auto claims, and our team is experienced with the documentation and approval processes specific to these policies.",
  },
  {
    q: "How quickly can you begin repairs after a hailstorm hits our lot?",
    a: "We respond to dealership hail events within 24 hours for initial assessment. The full damage survey, including per-vehicle documentation and repair scope, is typically completed within 48 to 72 hours depending on inventory size. Repair work begins as soon as insurance authorization is received for each unit. Dealerships with existing preferred vendor agreements receive priority response that shortens this timeline further.",
  },
  {
    q: "Will repaired vehicles show any evidence of hail damage after PDR?",
    a: "When performed correctly, paintless dent repair restores panels to their original factory condition with no visible evidence of prior damage. This is critical for dealership inventory because buyers expect vehicles on your lot to be in flawless condition. Our post-repair quality inspection examines every panel under controlled lighting to verify that each vehicle meets the standard required for retail presentation.",
  },
];

const internalLinks: InternalLink[] = [
  { label: "Fleet Hail Repair", href: "/fleet-hail-repair" },
  { label: "Insurance Claim Assistance", href: "/insurance-claim-assistance" },
  { label: "Pre-Sale Touch-Up Services", href: "/pre-sale-touch-up-services" },
  { label: "Contact Us", href: "/contact" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dealership Hail Repair Services",
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
  description: "Professional hail repair services for auto dealerships in Dallas-Fort Worth. On-lot and off-site repair, dealer inventory insurance coordination, and pre-sale cosmetic restoration.",
  areaServed: {
    "@type": "Place",
    name: "Dallas-Fort Worth Metroplex",
  },
  serviceType: "Dealership Hail Damage Repair",
};

export default function DealershipHailServices() {
  return (
    <SEOPageLayout
      badge="Dealership Services"
      title="Dealership Hail Repair Services"
      subtitle="Inventory-focused hail repair for new and used car dealerships across the Dallas-Fort Worth metroplex."
      faq={faq}
      internalLinks={internalLinks}
      midCTA={false}
      schema={schema}
    >
      <h2>Protecting Dealership Inventory After Hail</h2>
      <p>
        A single hailstorm can transform a dealership lot from a revenue-generating asset into an insurance claim. New vehicles awaiting delivery, certified pre-owned units ready for retail, and trade-ins being prepped for sale can all sustain damage that makes them unsellable in their current condition. The financial impact is compounded by every day those vehicles remain on the lot in damaged condition, occupying space without generating sales.
      </p>
      <p>
        Dent Society provides dealership-specific hail repair services designed around the operational realities of automotive retail. Our process addresses the unique requirements of dealer inventory repair, including the distinction between new and used vehicle standards, the need for rapid turnaround to restore inventory flow, and the complexity of commercial insurance claims that differ significantly from individual policyholder claims.
      </p>

      <h2>Dealer-Specific Workflow</h2>
      <p>
        Our dealership workflow begins with a comprehensive lot assessment conducted within 24 hours of the storm event. A team walks the entire inventory, documenting damage on every exposed vehicle using a standardized grading system that categorizes each unit by damage severity. This assessment produces a complete inventory report that includes vehicle identification, damage classification, estimated repair time per unit, and recommended repair priority.
      </p>
      <p>
        From this assessment, we develop a repair sequence that aligns with the dealership's sales priorities. High-demand models, vehicles with pending buyer commitments, and certified pre-owned units nearing their listing dates are moved to the front of the repair queue. This prioritization ensures that the vehicles most critical to the dealership's revenue cycle are restored first.
      </p>
      <p>
        Communication throughout the process is channeled through a dedicated account coordinator assigned to the dealership. This individual provides daily status updates, manages scheduling adjustments, and serves as the liaison between the repair team, the dealership's management, and the insurance carrier.
      </p>

      <h2>New Versus Used Inventory Repair</h2>
      <p>
        The repair standard for new inventory is absolute. A new vehicle on a dealership lot carries the expectation of factory-perfect condition. Any residual evidence of damage, no matter how minor, can affect the vehicle's marketability and may trigger disclosure obligations depending on the severity of the original damage. Our technicians restore new inventory to a standard that passes inspection under the most scrutinizing conditions, including the controlled lighting that buyers increasingly use during the purchase process.
      </p>
      <p>
        Used inventory repair operates under a different framework. The goal is to bring each vehicle to a retail-ready condition that is appropriate for its age, mileage, and price point. This means addressing all hail damage effectively while making cost-conscious decisions about the level of restoration required. A five-year-old trade-in with minor pre-existing wear does not need the same level of absolute perfection as a brand-new unit, and our pricing reflects that distinction.
      </p>
      <p>
        For both categories, paintless dent repair is the preferred methodology because it preserves the original factory finish. This is particularly important for new inventory, where any repaint work could affect warranty coverage, diminish the vehicle's value, and complicate the dealership's representation to the buyer.
      </p>

      <h2>Lot Damage Assessment</h2>
      <p>
        A thorough lot damage assessment is the foundation of an effective dealership hail repair program. Our assessment team uses a systematic approach that covers every vehicle on the lot, not just the units with the most obvious damage. Hail damage can be subtle, and vehicles that appear undamaged at first glance may reveal dents under proper inspection lighting.
      </p>
      <p>
        Each vehicle is documented with high-resolution photography, panel-by-panel damage notation, and a repair classification that determines the appropriate scope of work. This documentation serves dual purposes: it provides the basis for insurance claim filing, and it gives the dealership a clear picture of the total damage across the inventory.
      </p>
      <p>
        The assessment report includes a financial summary that estimates total repair cost, projected insurance recovery, and the dealership's anticipated out-of-pocket exposure based on policy deductible structures. This information allows dealership management to make informed decisions about repair scope and prioritization before any work begins.
      </p>

      <h2>Pre-Sale Cosmetic Preparation</h2>
      <p>
        Beyond storm damage repair, many dealerships use our services for ongoing cosmetic preparation of inventory. Vehicles that arrive from auction, trade-in, or transport with minor dents, door dings, or surface imperfections benefit from paintless dent repair as part of the reconditioning process. Removing these cosmetic defects before the vehicle reaches the lot improves its presentation and supports the price point the dealership has established.
      </p>
      <p>
        This pre-sale preparation is distinct from hail repair in both scope and pricing. Individual vehicles with minor cosmetic issues are processed quickly, often within the same day, and the cost per vehicle is substantially lower than comprehensive hail damage restoration. Dealerships that maintain an ongoing relationship with Dent Society receive preferred pricing for this reconditioning work.
      </p>

      <h2>Insurance Coordination for Dealer Inventory</h2>
      <p>
        Dealer inventory insurance claims are structurally different from individual auto insurance claims. Dealership policies often carry higher deductibles, different coverage structures for new versus used inventory, and distinct documentation requirements. The adjuster assigned to a dealer claim may need to inspect hundreds of vehicles, and the claim itself may involve multiple sub-claims for different inventory categories.
      </p>
      <p>
        Our insurance coordination team manages this process from initial filing through final payment. We prepare the documentation in the format that commercial adjusters require, schedule inspections to minimize lot disruption, and handle supplement submissions when the initial estimate does not cover the full scope of repairs. Our experience with dealer inventory claims across all major carriers in the Texas market ensures that the documentation we submit is complete, accurate, and carrier-compliant.
      </p>
      <p>
        We also assist with total loss determinations for vehicles where the repair cost exceeds the vehicle's value. These situations require careful documentation and valuation support, and our team provides the data that supports an accurate resolution for both the dealership and the insurance carrier.
      </p>

      <h2>On-Lot Versus Off-Site Repair Options</h2>
      <p>
        The decision to repair on-lot or transport vehicles to our facility depends on several factors: the severity of the damage, the size of the affected inventory, the availability of covered workspace on the lot, and the dealership's preference for keeping vehicles visible to potential buyers during the repair period.
      </p>
      <p>
        On-lot repair is efficient for moderate damage across a large number of vehicles. Our mobile teams can process significant volume without requiring vehicle transport, and the dealership maintains visual inventory presence. Off-site repair is recommended when damage severity requires the controlled environment, specialized lighting, and advanced tooling available at our facility. Many dealership engagements use a combination of both approaches, with lightly damaged vehicles repaired on-lot and more severely damaged units transported for facility-based restoration.
      </p>

      <h2>Inventory Turnover Impact</h2>
      <p>
        Every day that a damaged vehicle sits unsold on a dealership lot represents carrying cost: floor plan interest, insurance premium allocation, and opportunity cost of the space it occupies. Our repair scheduling is designed to minimize this financial exposure by restoring vehicles to sellable condition as quickly as possible.
      </p>
      <p>
        We track the relationship between repair completion and vehicle sale dates for our dealership clients, and the data consistently shows that rapid hail repair restoration directly supports inventory turnover rates. Vehicles that are restored promptly return to active inventory and sell within normal market timelines. Vehicles that remain damaged for extended periods experience degraded buyer interest even after repair is eventually completed, as extended lot time can signal other issues to informed buyers.
      </p>
      <p>
        For dealerships in the Dallas-Fort Worth market, establishing a repair partnership before storm season allows for immediate activation when a hail event occurs. This preparation is the most effective way to minimize the inventory disruption and financial impact that hail damage creates.
      </p>
    </SEOPageLayout>
  );
}
