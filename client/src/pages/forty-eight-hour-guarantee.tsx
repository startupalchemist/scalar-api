import { SEOPageLayout } from "@/components/seo-templates";
import type { FAQItem, InternalLink } from "@/components/seo-templates";

const faqItems: FAQItem[] = [
  {
    q: "When does the 48-hour clock officially start?",
    a: "The 48-hour completion window begins only after two conditions are met: your insurance company has issued written approval for the repair, and your vehicle is physically in our possession at our facility. The clock does not start when you file a claim, when you schedule an appointment, or when the initial inspection is performed. This ensures that the guarantee measures only the time we control — the actual repair process."
  },
  {
    q: "What happens if my repair takes longer than 48 hours?",
    a: "If we exceed the 48-hour completion window under qualifying conditions, Dent Society pays you $300. This payment is issued directly to you, not as a credit or discount on future services. It is our financial commitment to the timeline we promise. You also retain your complimentary loaner vehicle for the full duration of the repair at no additional cost."
  },
  {
    q: "Are there any conditions that would void the guarantee?",
    a: "Yes. The guarantee does not apply in cases where the vehicle requires supplemental repairs beyond the original scope approved by your insurer, when parts must be ordered that are not in our standard inventory, when the vehicle has pre-existing damage that complicates the repair, or during declared state-of-emergency weather events that disrupt facility operations. These exclusions are communicated clearly before any repair begins."
  },
  {
    q: "Does the guarantee apply to all types of hail damage?",
    a: "The guarantee applies to all standard hail damage repairs completed through paintless dent repair (PDR). For vehicles with damage severe enough to require conventional bodywork, panel replacement, or paint correction, the repair timeline is quoted individually and the 48-hour guarantee may not apply. In these cases, we provide a specific completion estimate before work begins and keep you informed throughout the process."
  },
  {
    q: "How do I know when my insurance approval has been received?",
    a: "Our claims coordination team monitors the approval process closely and notifies you as soon as we receive written authorization from your insurer. You will receive a text or email confirming the approval, along with the official start time of your 48-hour window. This transparency ensures you always know exactly where your repair stands in the process."
  },
  {
    q: "Why does Dent Society offer this guarantee when other shops do not?",
    a: "Most body shops and PDR providers cannot commit to a fixed timeline because their workflows are not designed for predictability. Our facility, staffing model, and parts inventory are structured specifically to deliver consistent turnaround times. The guarantee exists because we have invested in the infrastructure and processes necessary to support it. It is not a marketing claim — it is an operational standard backed by a financial penalty when we fall short."
  }
];

const internalLinks: InternalLink[] = [
  { label: "Hail Damage Repair in Dallas", href: "/hail-damage-repair-dallas" },
  { label: "Insurance Claim Assistance", href: "/insurance-claim-assistance" },
  { label: "Complimentary Loaner Vehicles", href: "/free-loaner-vehicles" },
  { label: "Contact Us", href: "/contact" }
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When does the 48-hour clock officially start?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 48-hour completion window begins only after two conditions are met: your insurance company has issued written approval for the repair, and your vehicle is physically in our possession at our facility."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if my repair takes longer than 48 hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If we exceed the 48-hour completion window under qualifying conditions, Dent Society pays you $300. This payment is issued directly to you, not as a credit or discount on future services."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any conditions that would void the guarantee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The guarantee does not apply in cases where the vehicle requires supplemental repairs beyond the original scope, when parts must be ordered, when the vehicle has pre-existing damage, or during declared state-of-emergency weather events."
      }
    },
    {
      "@type": "Question",
      "name": "Does the guarantee apply to all types of hail damage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The guarantee applies to all standard hail damage repairs completed through paintless dent repair (PDR). For vehicles requiring conventional bodywork or panel replacement, the timeline is quoted individually."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know when my insurance approval has been received?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our claims coordination team notifies you as soon as we receive written authorization from your insurer, along with the official start time of your 48-hour window."
      }
    },
    {
      "@type": "Question",
      "name": "Why does Dent Society offer this guarantee when other shops do not?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our facility, staffing model, and parts inventory are structured specifically to deliver consistent turnaround times. The guarantee is backed by operational infrastructure, not just a marketing promise."
      }
    }
  ]
};

export default function FortyEightHourGuarantee() {
  return (
    <SEOPageLayout
      badge="The Guarantee"
      title="48-Hour Completion Guarantee"
      subtitle="A measurable commitment to your time. If we exceed 48 hours after insurance approval, we pay you $300."
      faq={faqItems}
      internalLinks={internalLinks}
      midCTA={true}
      schema={schema}
    >
      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4">
        A Guarantee Built on Accountability
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        In the hail damage repair industry, timelines are often vague. Shops quote "a few days" or "about a week," and the actual completion date remains uncertain until the work is finished. At Dent Society, we take a fundamentally different approach. Our 48-Hour Completion Guarantee is a binding commitment: once the defined conditions are met, your vehicle will be fully repaired and returned within 48 hours — or we pay you $300.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        This is not a best-case estimate or an aspirational target. It is a documented policy with clear trigger rules, defined start conditions, and a financial consequence when we fail to deliver. We publish these terms openly because we believe accountability should be visible, not buried in fine print.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        How the Guarantee Works
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        The 48-Hour Completion Guarantee applies to all standard hail damage repairs performed through paintless dent repair at our Dallas facility. The guarantee is activated once two specific conditions are satisfied simultaneously:
      </p>
      <ul className="list-disc list-inside text-[#B3B3B8] text-sm leading-relaxed mb-6 space-y-2">
        <li>Your insurance company has provided written approval for the repair scope and cost</li>
        <li>Your vehicle is physically present at our facility and checked into our production system</li>
      </ul>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Both conditions must be met before the 48-hour window opens. This distinction is critical. The clock does not begin when you first call us, when the inspection occurs, or when a claim is filed. It begins at the precise moment we have both authorization to proceed and physical possession of the vehicle. This framework ensures that the guarantee measures only the variables within our direct control.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        What Starts the Clock
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Understanding when the 48-hour window begins is essential to understanding the guarantee. Here is the typical sequence of events leading up to the clock start:
      </p>
      <ul className="list-disc list-inside text-[#B3B3B8] text-sm leading-relaxed mb-6 space-y-2">
        <li>You contact Dent Society or are referred by your insurance adjuster</li>
        <li>We perform a detailed inspection of the hail damage and prepare a repair estimate</li>
        <li>The estimate is submitted to your insurance company for approval</li>
        <li>Your insurer reviews and issues written authorization (this step is outside our control)</li>
        <li>Your vehicle arrives at our facility — either dropped off by you or collected via our pickup service</li>
        <li>Once both approval and vehicle possession are confirmed, the 48-hour clock officially begins</li>
      </ul>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        You are notified via text or email at the exact moment the clock starts, so there is never ambiguity about the timeline. This notification includes the start timestamp and the projected completion time, giving you full visibility into the process.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        What Happens If the 48-Hour Window Is Exceeded
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        If your repair is not completed within the 48-hour window under qualifying conditions, Dent Society pays you $300. This payment is issued directly to you — not applied as a credit, not deducted from future services, and not contingent on any additional action from you. It is a straightforward financial acknowledgment that we did not meet our stated commitment.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        The $300 payment is processed within five business days of the completion overage being confirmed. You do not need to file a dispute, submit a claim, or request the payment. Our operations team identifies the overage internally and initiates the payout automatically. Your repair is still completed to our full quality standard, and your loaner vehicle remains available for the duration.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        Conditions and Exclusions
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        The guarantee is designed to cover the vast majority of hail damage repairs we perform. However, there are specific conditions under which the 48-hour window may not apply. These exclusions exist to ensure the guarantee remains honest and operationally sustainable:
      </p>
      <ul className="list-disc list-inside text-[#B3B3B8] text-sm leading-relaxed mb-6 space-y-2">
        <li>Supplemental damage discovered during repair that requires additional insurance authorization — when a supplement is filed, the clock pauses until the insurer approves the revised scope</li>
        <li>Vehicles requiring conventional body repair, panel replacement, or paint correction in addition to PDR</li>
        <li>Parts that must be special-ordered and are not available in our standard inventory</li>
        <li>Pre-existing damage unrelated to the hail event that complicates the repair process</li>
        <li>Declared state-of-emergency weather events that disrupt facility operations or power supply</li>
        <li>Customer-initiated delays, such as requesting a hold on the repair or modifying the scope mid-process</li>
      </ul>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Every exclusion that may apply to your specific repair is communicated before work begins. You will never learn about an exclusion after the fact. If your vehicle falls into one of the categories above, we provide a specific timeline estimate tailored to your repair and keep you informed at every stage.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        Why This Guarantee Exists
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        The hail repair industry has long operated without meaningful accountability around timelines. Vehicles sit in shop lots for days or weeks without updates. Customers are told their car will be "ready soon" without a defined endpoint. This ambiguity is not the result of complex repairs — it is the result of poor workflow management, understaffing, and a lack of operational discipline.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Dent Society was built to operate differently. Our facility in Dallas is designed around production efficiency: dedicated bays for each stage of the PDR process, a staffing model that scales with demand, and a parts inventory that supports immediate repairs without ordering delays. The 48-hour guarantee is a natural extension of this infrastructure. We do not offer it because it sounds impressive — we offer it because our operations consistently support it.
      </p>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        The financial penalty for exceeding the window is intentional. It creates internal pressure to maintain the systems, staffing, and discipline necessary to meet the commitment. When a guarantee carries no consequence for failure, it is not a guarantee — it is a suggestion. The $300 payment ensures that our team treats every repair timeline with the seriousness it deserves.
      </p>

      <h2 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-4 mt-10">
        Severity Communication Protocol
      </h2>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Not all hail damage is equal, and we believe in setting accurate expectations from the initial inspection. Our severity communication protocol categorizes every vehicle into one of three tiers based on the extent of the damage:
      </p>

      <h3 className="text-lg font-semibold text-[#F5F5F7] mb-3 mt-6">
        Tier 1: Standard Severity
      </h3>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Light to moderate hail damage affecting surface panels with no structural concerns. These repairs are fully covered by the 48-hour guarantee and represent the majority of vehicles we process. Typical dent counts range from 20 to 150, with no panel replacement required.
      </p>

      <h3 className="text-lg font-semibold text-[#F5F5F7] mb-3 mt-6">
        Tier 2: Elevated Severity
      </h3>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Moderate to heavy damage that may involve body-line dents, crease damage, or impact to structural reinforcement panels. These repairs are eligible for the 48-hour guarantee in most cases, though a small percentage may require a supplement that temporarily pauses the clock. You are notified of the tier classification at the time of inspection.
      </p>

      <h3 className="text-lg font-semibold text-[#F5F5F7] mb-3 mt-6">
        Tier 3: Severe
      </h3>
      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4">
        Extensive damage requiring a combination of PDR, conventional repair, and possible panel or glass replacement. Tier 3 repairs are quoted individually with a custom timeline, and the 48-hour guarantee does not apply. However, every Tier 3 client receives a detailed repair schedule, regular progress updates, and continued access to a complimentary loaner vehicle for the full duration of the work.
      </p>

      <p className="text-[#B3B3B8] text-sm leading-relaxed mb-4 mt-8">
        This tiered approach ensures that you receive an honest assessment of your repair timeline before any work begins. We would rather set an accurate expectation and meet it than promise 48 hours on a vehicle that genuinely requires more time. Transparency at the inspection stage is how we maintain the integrity of the guarantee for the repairs it was designed to cover.
      </p>
    </SEOPageLayout>
  );
}
