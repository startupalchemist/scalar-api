import { SEOPageLayout } from "@/components/seo-templates";
import type { FAQItem, InternalLink } from "@/components/seo-templates";

const faqItems: FAQItem[] = [
  {
    q: "What areas do you serve for pickup and delivery?",
    a: "We provide pickup and delivery service throughout the Dallas-Fort Worth metroplex, including Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Arlington, Irving, Grapevine, Southlake, Keller, Flower Mound, Lewisville, Denton, Garland, Mesquite, and surrounding communities. If you are within approximately 50 miles of our facility, we can likely accommodate your location. Contact us to confirm coverage for your specific address."
  },
  {
    q: "Is there an additional charge for pickup and delivery?",
    a: "No. Pickup and delivery is a complimentary service for all hail damage repair clients. There is no mileage fee, fuel surcharge, or transportation cost added to your repair invoice. This service is included as part of our commitment to removing every barrier between you and a fully restored vehicle."
  },
  {
    q: "How is my vehicle transported to your facility?",
    a: "Your vehicle is transported on a covered flatbed carrier operated by our trained logistics team. We do not drive client vehicles on public roads to our facility. Flatbed transport eliminates any risk of additional road damage, debris impact, or mileage accumulation during transit. Your vehicle arrives at our shop in the same condition it left your location."
  },
  {
    q: "Can I schedule pickup and delivery for a specific time?",
    a: "Yes. We schedule pickups within defined time windows, typically in two-hour blocks, to accommodate your availability. Morning, midday, and afternoon windows are available Monday through Saturday. Our logistics coordinator will work with you to identify a time that fits your schedule, and you will receive a confirmation call or text 24 hours in advance."
  },
  {
    q: "What if I am not available at the scheduled pickup time?",
    a: "If you need to reschedule, simply contact our team at least 12 hours before your appointment and we will arrange a new time at no penalty. If you cannot be present for the pickup, you may designate an authorized representative — such as a spouse, office manager, or building concierge — to handle the vehicle handoff on your behalf, provided they can present identification and sign the pickup authorization form."
  }
];

const internalLinks: InternalLink[] = [
  { label: "Hail Damage Repair in Dallas", href: "/hail-damage-repair-dallas" },
  { label: "Complimentary Loaner Vehicles", href: "/free-loaner-vehicles" },
  { label: "Insurance Claim Assistance", href: "/insurance-claim-assistance" },
  { label: "Contact Us", href: "/contact" }
];

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dent Society",
  "description": "Vehicle pickup and delivery service for hail damage repair in the Dallas-Fort Worth metroplex. Complimentary flatbed transport and loaner vehicle coordination.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dallas",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 32.7767,
      "longitude": -96.7970
    },
    "geoRadius": "80467"
  },
  "serviceArea": {
    "@type": "Place",
    "name": "Dallas-Fort Worth Metroplex"
  }
};

export default function PickupAndDeliveryService() {
  return (
    <SEOPageLayout
      badge="Pickup & Delivery"
      title="Vehicle Pickup and Delivery Service"
      subtitle="We come to you. Complimentary flatbed transport throughout the Dallas-Fort Worth metroplex, coordinated with your loaner vehicle."
      faq={faqItems}
      internalLinks={internalLinks}
      midCTA={false}
      schema={schema}
    >
      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4">
        Hail Repair Without Leaving Your Home or Office
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        After a hail event in Dallas-Fort Worth, the last thing most vehicle owners want to manage is the logistics of getting their car to a repair facility. Between work obligations, family schedules, and the general disruption that storm damage creates, carving out time to drop off and pick up a vehicle is often the deciding factor that delays a repair by weeks — or longer.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Dent Society eliminates that obstacle entirely. Our complimentary pickup and delivery service brings the repair process to your doorstep. We collect your vehicle from your home, office, or any location within our service area, transport it safely to our facility, complete the repair, and return it to you — all without requiring you to set foot in our shop.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        Service Area Coverage in DFW
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Our pickup and delivery service covers the entire Dallas-Fort Worth metroplex and extends to surrounding communities within approximately 50 miles of our facility. This includes the following areas and their surrounding neighborhoods:
      </p>
      <ul className="list-disc list-inside text-[#B3B3B8] text-sm leading-relaxed mb-6 space-y-2">
        <li>Dallas, including Highland Park, University Park, Lakewood, and Oak Cliff</li>
        <li>Fort Worth, including Westover Hills, Rivercrest, and the Cultural District</li>
        <li>Plano, Frisco, McKinney, Allen, and Prosper</li>
        <li>Richardson, Garland, Mesquite, and Rowlett</li>
        <li>Arlington, Grand Prairie, Mansfield, and Burleson</li>
        <li>Southlake, Keller, Colleyville, and Grapevine</li>
        <li>Flower Mound, Lewisville, Highland Village, and Denton</li>
        <li>Irving, Las Colinas, Coppell, and Carrollton</li>
      </ul>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        If your location is not listed above, contact our scheduling team. We frequently accommodate addresses beyond our standard radius for clients with significant repair needs or multiple vehicles requiring service.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        How Scheduling Works
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Scheduling a pickup is straightforward. Once your repair appointment is confirmed — either through our online form, by phone, or through your insurance adjuster — our logistics coordinator contacts you to arrange the vehicle collection. You select a date and time window that works for your schedule, and we handle the rest.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Pickup windows are available Monday through Saturday and are offered in two-hour blocks: morning (8:00–10:00 AM), midday (11:00 AM–1:00 PM), and afternoon (2:00–4:00 PM). You receive a confirmation communication 24 hours before your scheduled pickup, and our driver contacts you approximately 30 minutes before arrival.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        The delivery process follows the same structure. When your repair is complete, we contact you to schedule the return window. Your vehicle is delivered to the same location it was collected from, or to an alternate address if you prefer. The delivery appointment includes a brief walk-around so you can inspect the completed repair before signing off.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        Vehicle Security During Transport
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        We understand that entrusting your vehicle to someone else requires confidence in their process. Every vehicle collected by Dent Society is transported on a covered flatbed carrier — not driven on public roads. This method of transport offers several important protections:
      </p>
      <ul className="list-disc list-inside text-[#B3B3B8] text-sm leading-relaxed mb-6 space-y-2">
        <li>Zero additional mileage accumulated on your odometer</li>
        <li>No exposure to road debris, gravel, or secondary weather events during transit</li>
        <li>Secure tie-down systems that prevent any movement during transport</li>
        <li>Full insurance coverage on every vehicle from the moment it is loaded until it is returned</li>
      </ul>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        A detailed vehicle condition report is completed at the point of pickup, including photographs of all panels, the interior, and the current odometer reading. This report is shared with you digitally and serves as a baseline record throughout the repair and transport process. The same documentation is completed at delivery so you have a complete chain of custody for your vehicle.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        Coordination with Loaner Delivery
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        When you use both our pickup service and our complimentary loaner vehicle program, the two are coordinated into a single appointment. Our driver arrives at your location with the loaner vehicle already on-site. You complete a brief walk-around of the loaner, sign the loaner agreement, and hand over your vehicle keys. The entire exchange typically takes less than ten minutes.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        At the conclusion of the repair, the same coordinated process occurs in reverse. We deliver your restored vehicle and collect the loaner in a single visit. There is no need to make separate arrangements, visit multiple locations, or coordinate with a third-party rental agency. Every step is managed internally by the Dent Society logistics team.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        This integrated approach means that from the moment you schedule your repair to the moment your vehicle is returned, you are never without reliable transportation — and you never have to adjust your schedule to accommodate the process.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        What to Expect on Pickup Day
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        On the morning of your scheduled pickup, you will receive a text or call confirming that your appointment is on track. Approximately 30 minutes before arrival, your assigned driver contacts you directly to confirm access instructions and any specific details about your location, such as gate codes, parking structure directions, or preferred drop-off points.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        When the driver arrives, the following steps occur in order:
      </p>
      <ul className="list-disc list-inside text-[#B3B3B8] text-sm leading-relaxed mb-6 space-y-2">
        <li>A walk-around inspection of your vehicle is completed and photographed</li>
        <li>The current mileage, fuel level, and any pre-existing conditions are documented</li>
        <li>You review and sign the pickup authorization digitally on a tablet</li>
        <li>If applicable, the loaner vehicle is presented and the loaner agreement is signed</li>
        <li>Your vehicle is loaded onto the covered flatbed carrier and secured for transport</li>
        <li>You receive a digital copy of all documentation via email within minutes</li>
      </ul>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        The process is designed to be efficient and respectful of your time. Most pickups are completed in under fifteen minutes. If you cannot be present, you may designate an authorized representative to handle the handoff on your behalf, provided they can present valid identification and sign the necessary forms.
      </p>

      <h3 className="text-lg font-semibold text-[#F5F5F7] mb-3 mt-8">
        Corporate and Fleet Accounts
      </h3>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        For businesses and fleet managers in the Dallas-Fort Worth area, we offer dedicated pickup and delivery scheduling that accommodates multiple vehicles, staggered timelines, and centralized billing. Our corporate clients include dealership service departments, property management companies, and executive transportation services. Contact our team to discuss fleet arrangements tailored to your operational requirements.
      </p>
    </SEOPageLayout>
  );
}
