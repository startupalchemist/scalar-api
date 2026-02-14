import { SEOPageLayout } from "@/components/seo-templates";
import type { FAQItem, InternalLink } from "@/components/seo-templates";

const faqItems: FAQItem[] = [
  {
    q: "Who is eligible for a complimentary loaner vehicle?",
    a: "Any customer whose vehicle is actively undergoing hail damage repair at our facility is eligible for a loaner vehicle. The loaner is provided at no cost to you for the duration of the repair, regardless of whether your insurance policy includes rental coverage. We extend this benefit to every qualifying repair because we believe access to reliable transportation should never be a barrier to getting your vehicle restored."
  },
  {
    q: "How long can I keep the loaner vehicle?",
    a: "You may keep the loaner vehicle for the entire duration of your repair. Under our standard workflow, most hail damage repairs are completed within 48 hours after insurance approval and vehicle possession. If your repair requires additional time due to severity or parts availability, the loaner remains yours at no additional charge until your vehicle is ready for pickup."
  },
  {
    q: "Do I need my own insurance to drive the loaner?",
    a: "Yes. You must carry a valid auto insurance policy that covers liability while operating a borrowed or loaned vehicle. Most standard Texas auto policies include this coverage. We recommend confirming with your insurance provider before your appointment. If you have questions about your coverage, our team can help you determine eligibility before scheduling."
  },
  {
    q: "What type of vehicles are available as loaners?",
    a: "Our loaner fleet consists of well-maintained, late-model sedans and SUVs. While we cannot guarantee a specific make or model, every vehicle in the fleet is clean, fully insured on our end for comprehensive and collision, and equipped for comfortable daily driving in the Dallas-Fort Worth area."
  },
  {
    q: "What happens if the loaner vehicle is damaged while in my possession?",
    a: "If the loaner sustains any damage while in your care, your personal auto insurance policy would serve as the primary coverage. We ask that you report any incidents immediately so we can coordinate documentation. You are responsible for the vehicle during the loaner period, just as you would be with any rental or borrowed vehicle under Texas law."
  }
];

const internalLinks: InternalLink[] = [
  { label: "Hail Damage Repair in Dallas", href: "/hail-damage-repair-dallas" },
  { label: "Pickup and Delivery Service", href: "/pickup-and-delivery-service" },
  { label: "Insurance Claim Assistance", href: "/insurance-claim-assistance" },
  { label: "Contact Us", href: "/contact" }
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Complimentary Loaner Vehicles",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Dent Society",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dallas",
      "addressRegion": "TX"
    }
  },
  "description": "Complimentary loaner vehicles provided during hail damage repair at Dent Society in Dallas, TX. No cost to the customer for the duration of the repair.",
  "areaServed": {
    "@type": "Place",
    "name": "Dallas-Fort Worth Metroplex"
  },
  "serviceType": "Loaner Vehicle Program"
};

export default function FreeLoanerVehicles() {
  return (
    <SEOPageLayout
      badge="Loaner Vehicles"
      title="Complimentary Loaner Vehicles"
      subtitle="Reliable transportation while your vehicle is restored. No rental fees, no waiting, no disruption to your schedule."
      faq={faqItems}
      internalLinks={internalLinks}
      midCTA={true}
      schema={schema}
    >
      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4">
        Your Schedule Should Not Suffer Because of Hail
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        When hail damages your vehicle, the inconvenience extends far beyond the dents themselves. Coordinating repairs, adjusting your daily routine, and arranging alternative transportation can consume hours you do not have. At Dent Society, we eliminate that friction entirely by providing a complimentary loaner vehicle for every qualifying hail damage repair performed at our Dallas facility.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        This is not a promotional offer or a limited-time incentive. It is a permanent component of our service model. We built our repair process around the understanding that our clients are professionals, business owners, and families who depend on their vehicles daily. Removing the transportation gap during a repair is not a luxury — it is a necessity, and we treat it as such.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        Eligibility for a Loaner Vehicle
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Every customer whose vehicle is actively being repaired for hail damage at Dent Society qualifies for a complimentary loaner. There is no minimum damage threshold, no specific insurance requirement, and no additional fee. Whether your vehicle has minor cosmetic dents or significant panel damage requiring extended work, the loaner benefit applies equally.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        The only requirement is that you hold a valid Texas driver's license and carry an active auto insurance policy that provides liability coverage for vehicles not owned by you. Most standard Texas auto policies include this provision, but we encourage you to verify with your carrier before your scheduled appointment.
      </p>
      <ul className="list-disc list-inside text-[#B3B3B8] text-sm leading-relaxed mb-6 space-y-2">
        <li>Valid Texas driver's license or equivalent state-issued license</li>
        <li>Active auto insurance policy with liability coverage for non-owned vehicles</li>
        <li>Vehicle must be actively undergoing repair at our facility</li>
        <li>Loaner agreement signed at the time of vehicle drop-off</li>
      </ul>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        How the Loaner Program Works
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        The loaner vehicle is prepared and waiting for you when you bring your vehicle in for repair. There is no separate trip, no waiting period, and no third-party rental counter to visit. The handoff is seamless: you leave your vehicle with our technicians and drive away in the loaner within minutes.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        If you have opted for our pickup and delivery service, the process is even simpler. Our team arrives at your home or office with the loaner vehicle, collects your vehicle for repair, and leaves the loaner in its place. When the repair is complete, we reverse the process — delivering your restored vehicle and collecting the loaner at your convenience.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Each loaner vehicle is thoroughly cleaned and inspected before every handoff. We maintain detailed records of mileage, fuel level, and vehicle condition at both the start and conclusion of the loaner period. This documentation protects both parties and ensures a transparent, professional experience from start to finish.
      </p>

      <h3 className="text-lg font-semibold text-[#F5F5F7] mb-3 mt-8">
        Vehicle Pickup Process
      </h3>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        For clients in the Dallas-Fort Worth metroplex who prefer not to drive to our facility, we coordinate the entire vehicle exchange remotely. A member of our logistics team contacts you 24 hours before your scheduled appointment to confirm timing, location, and any special instructions. On the day of pickup, our driver arrives with the loaner vehicle at the agreed-upon time and location.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        You conduct a brief walk-around of the loaner, sign the loaner agreement on a tablet, and hand over your vehicle keys. The entire exchange typically takes less than ten minutes. Your vehicle is then safely transported to our facility, ensuring it arrives without exposure to additional road debris or weather conditions.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        Documentation Requirements
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        We keep the paperwork minimal. At the time of the loaner handoff, you will need to present the following:
      </p>
      <ul className="list-disc list-inside text-[#B3B3B8] text-sm leading-relaxed mb-6 space-y-2">
        <li>A valid driver's license</li>
        <li>Proof of current auto insurance (digital or physical card accepted)</li>
        <li>A signed loaner vehicle agreement acknowledging responsibility during the loaner period</li>
      </ul>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        The loaner agreement is a straightforward document that outlines vehicle condition, mileage at handoff, fuel expectations, and your responsibility for the vehicle during the loan period. There are no hidden fees, no deposit requirements, and no credit card hold. We process the agreement digitally, and you receive a copy via email immediately.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        Insurance Rental Coverage Coordination
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Many comprehensive auto insurance policies in Texas include rental reimbursement coverage as part of the hail damage claim. When your policy includes this benefit, your insurer allocates a daily allowance — typically between $30 and $50 per day — for a rental vehicle during the repair period. Because Dent Society provides the loaner at no charge, this rental allowance often goes unused.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Our claims coordination team works directly with your insurer to ensure that the rental coverage component of your claim is handled appropriately. In some cases, the insurer may apply the unused rental allowance toward other covered repair costs. In other cases, it simply remains an unused benefit. Either way, you are never billed for the loaner, and the presence or absence of rental coverage on your policy does not affect your eligibility.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        If your policy does not include rental reimbursement, nothing changes on your end. The loaner is still complimentary. We designed this program specifically so that no customer is penalized for the specifics of their insurance coverage.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        Loaner Availability and Scheduling
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        We maintain a dedicated fleet of loaner vehicles sized to match our repair capacity. Under normal conditions, a loaner is available for every scheduled repair. However, following major hail events in the Dallas-Fort Worth area, demand for both repairs and loaners increases significantly. During these periods, we manage loaner allocation on a first-scheduled, first-served basis.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        To guarantee loaner availability, we recommend scheduling your repair as soon as possible after a hail event. Clients who schedule within the first 72 hours of a storm typically receive priority placement for both the repair appointment and loaner assignment. Our scheduling team can confirm loaner availability at the time you book your inspection.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        In the rare event that all loaner vehicles are committed, we will coordinate directly with a preferred rental partner to secure a rental vehicle at no cost to you. This backup arrangement ensures that no Dent Society client is ever left without transportation during a repair, regardless of fleet availability.
      </p>

      <h3 className="text-lg font-semibold text-[#F5F5F7] mb-3 mt-8">
        Fleet Standards
      </h3>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Every vehicle in our loaner fleet meets the following standards before being assigned to a client:
      </p>
      <ul className="list-disc list-inside text-[#B3B3B8] text-sm leading-relaxed mb-6 space-y-2">
        <li>Full interior and exterior detail completed within 24 hours of handoff</li>
        <li>Mechanical inspection and tire pressure verification</li>
        <li>Fuel tank filled to at least three-quarters capacity</li>
        <li>Current registration, inspection, and comprehensive insurance coverage</li>
        <li>All safety systems functional, including backup cameras and tire pressure monitoring</li>
      </ul>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        We hold our loaner vehicles to the same standard of care that we apply to every client vehicle entering our facility. The condition of the loaner you receive reflects the level of attention your own vehicle is receiving during the repair process.
      </p>
    </SEOPageLayout>
  );
}
