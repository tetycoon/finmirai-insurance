import { images, type SiteImage } from "./images";

/**
 * Knowledge Centre guides (Plan §13: start with 10–15 high-value guides, depth over volume).
 * Each article answers a real customer question and links to a relevant service page.
 * Reviewer is null until a qualified reviewer is confirmed by the client — renders as a placeholder.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string };

export type ArticleCategory = "Health" | "Life" | "Motor" | "Claims" | "Corporate" | "Basics";

export type Article = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: ArticleCategory;
  image: SiteImage;
  readingMinutes: number;
  published: string; // ISO date
  author: string;
  reviewedBy: string | null;
  relatedService: { label: string; href: string };
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "family-floater-vs-individual-health-insurance",
    title: "Family Floater vs Individual Health Insurance: How to Choose",
    metaDescription:
      "Understand the difference between family floater and individual health insurance plans, and which situations suit each, before you buy or renew.",
    excerpt: "One shared sum insured or separate cover for each person? The answer depends on ages, health history and budget.",
    category: "Health",
    image: images.familyMotherDaughter,
    readingMinutes: 5,
    published: "2026-10-01",
    author: "Finmirai Editorial Team",
    reviewedBy: null,
    relatedService: { label: "Health Insurance", href: "/insurance-solutions/health-insurance" },
    body: [
      { type: "p", text: "When you insure your family's health, one of the first decisions is structural: should everyone share a single sum insured under a family floater, or should each person have an individual policy? Both are legitimate choices. The right one depends on who is being covered." },
      { type: "h2", text: "How a family floater works" },
      { type: "p", text: "A family floater covers several family members under one policy with one shared sum insured. If one member is hospitalised, the claim reduces the sum insured available to everyone else for the rest of that policy year." },
      { type: "ul", items: ["One policy, one renewal date and one premium", "Often more economical for young families with low expected claims", "Premium is usually influenced by the age of the eldest member covered"] },
      { type: "h2", text: "How individual policies work" },
      { type: "p", text: "Each person has a separate sum insured that is not shared. A large claim for one person doesn't reduce cover for anyone else." },
      { type: "ul", items: ["Each member's cover is protected from others' claims", "Premiums are based on each person's own age", "More policies to track and renew"] },
      { type: "h2", text: "Situations where each tends to fit" },
      { type: "h3", text: "A floater may suit you if" },
      { type: "ul", items: ["You are a young couple or a family with young children", "No one has significant ongoing health conditions", "You want simplicity and a single renewal"] },
      { type: "h3", text: "Individual cover may suit you if" },
      { type: "ul", items: ["You want to include parents or senior members", "A family member has a known health condition likely to lead to claims", "There is a large age gap between members"] },
      { type: "note", text: "Many families use a combination — a floater for the couple and children, and separate policies for parents. Ask us to compare both structures with your actual family details." },
      { type: "h2", text: "Questions to ask before you decide" },
      { type: "ol", items: ["Is the sum insured adequate for hospital costs in the city where you would be treated?", "What are the waiting periods, room rent limits and co-payments?", "How will premium change as the eldest member gets older?", "Does the plan restore the sum insured if it is used up, and on what conditions?"] },
      { type: "p", text: "Policy features and terms differ between insurers and products. Always read the policy wording before you buy." },
    ],
  },
  {
    slug: "documents-needed-for-insurance-claim",
    title: "Documents Needed for an Insurance Claim: A Practical Checklist",
    metaDescription:
      "A practical checklist of documents commonly needed for health, motor, home and travel insurance claims in India, and tips to avoid delays.",
    excerpt: "Most claim delays come from missing paperwork. Here is what insurers commonly ask for, by claim type.",
    category: "Claims",
    image: images.supportDesk,
    readingMinutes: 6,
    published: "2026-10-01",
    author: "Finmirai Editorial Team",
    reviewedBy: null,
    relatedService: { label: "Claims Support", href: "/claims-support" },
    body: [
      { type: "p", text: "Insurance matters most when something goes wrong — and that is exactly when paperwork feels hardest. Knowing in advance what insurers usually need can make the process calmer and faster." },
      { type: "note", text: "The exact list depends on the insurer, the policy and the circumstances. The insurer may ask for additional documents. Treat this as a starting point, not a complete list." },
      { type: "h2", text: "First steps for any claim" },
      { type: "ol", items: ["Inform the insurer (or us) as soon as reasonably possible — policies set time limits for intimation.", "Note your policy number and keep a copy of the policy schedule.", "Take photographs where relevant and keep all original bills and reports.", "Don't discard damaged items or start repairs before the insurer's process allows."] },
      { type: "h2", text: "Health insurance claims" },
      { type: "h3", text: "Cashless" },
      { type: "ul", items: ["Health card or policy details and photo ID", "Pre-authorisation request completed by the hospital", "Doctor's advice for admission"] },
      { type: "h3", text: "Reimbursement" },
      { type: "ul", items: ["Completed claim form", "Discharge summary", "Original hospital bills and payment receipts", "Investigation reports and prescriptions", "Pharmacy bills", "KYC documents and bank details for payment"] },
      { type: "h2", text: "Motor insurance claims" },
      { type: "ul", items: ["Claim form and policy copy", "Registration certificate (RC) of the vehicle", "Driving licence of the person driving", "Repair estimate and final invoice", "Police report (FIR) for theft, or where third parties are injured", "Photographs of the damage"] },
      { type: "h2", text: "Home and property claims" },
      { type: "ul", items: ["Claim form and policy copy", "Photographs of the damage", "Proof of ownership or purchase bills for damaged contents", "Police report for burglary or theft", "Fire brigade report for fire losses, where applicable", "Repair or replacement estimates"] },
      { type: "h2", text: "Travel insurance claims" },
      { type: "ul", items: ["Claim form and passport copy with travel stamps", "Medical reports and bills for medical claims", "Airline confirmation for delays or baggage issues (such as a Property Irregularity Report)", "Police report for theft abroad"] },
      { type: "h2", text: "Tips that genuinely help" },
      { type: "ul", items: ["Keep scanned copies of policies in one shared family folder", "Make sure nominee and bank details are current", "Answer insurer queries quickly and keep a record of what you submitted", "Ask for a reason in writing if anything is rejected or deducted"] },
      { type: "p", text: "Claim assessment and settlement are decided by the insurer under the policy terms. Finmirai can help you understand the requirements, organise documents and follow up within the broker's role." },
    ],
  },
  {
    slug: "term-insurance-basics",
    title: "Term Insurance Basics: What It Is and How Much Cover to Consider",
    metaDescription:
      "Learn how term life insurance works, how to think about cover amount and policy term, and the common mistakes to avoid.",
    excerpt: "Term insurance is the simplest form of life cover. Getting the amount and term right matters more than anything else.",
    category: "Life",
    image: images.familyFour,
    readingMinutes: 5,
    published: "2026-10-01",
    author: "Finmirai Editorial Team",
    reviewedBy: null,
    relatedService: { label: "Life & Term Insurance", href: "/insurance-solutions/life-insurance" },
    body: [
      { type: "p", text: "Term insurance pays a fixed amount — the sum assured — to your nominee if you die during the policy term. If you survive the term, a pure term plan typically pays nothing. That is why premiums are lower than most other life insurance for the same cover." },
      { type: "h2", text: "Who needs it" },
      { type: "p", text: "Anyone whose income supports others: a spouse, children, parents, or a loan that would otherwise fall on the family. If nobody depends on your income, the need is lower." },
      { type: "h2", text: "Thinking about the cover amount" },
      { type: "p", text: "Rather than using a single multiplier, build it up from your family's actual needs:" },
      { type: "ol", items: ["Outstanding loans such as a home loan", "Future goals such as children's education", "Several years of household expenses your family would need", "Minus existing life cover and investments your family could use"] },
      { type: "h2", text: "Choosing the policy term" },
      { type: "p", text: "Cover should last as long as people depend on your income — commonly until retirement or until your youngest child is independent and major loans are repaid." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: ["Choosing cover based only on the premium you want to pay", "Not disclosing health conditions, smoking or existing policies", "Relying solely on employer group life cover, which usually ends with the job", "Not telling the family that the policy exists or where documents are kept"] },
      { type: "note", text: "Disclosure is critical. The insurer accepts the risk based on your declarations; incorrect information can lead to disputes at claim time." },
    ],
  },
  {
    slug: "motor-insurance-renewal-checklist",
    title: "Motor Insurance Renewal Checklist: IDV, NCB and Add-ons",
    metaDescription:
      "Before you renew your car or two-wheeler insurance, check IDV, No Claim Bonus, add-ons and nominee details. A practical renewal checklist.",
    excerpt: "Renewal is the best time to fix gaps in your motor cover. Five things to check before you pay.",
    category: "Motor",
    image: images.carBridge,
    readingMinutes: 4,
    published: "2026-10-01",
    author: "Finmirai Editorial Team",
    reviewedBy: null,
    relatedService: { label: "Motor Insurance", href: "/insurance-solutions/motor-insurance" },
    body: [
      { type: "p", text: "Most people renew motor insurance by paying whatever the renewal notice says. A few minutes of checking can avoid unpleasant surprises at claim time." },
      { type: "h2", text: "1. Renew before the expiry date" },
      { type: "p", text: "Third-party motor insurance is mandatory for vehicles used on public roads. A lapse means you are driving uninsured, and a long lapse can affect your No Claim Bonus and may require a vehicle inspection before cover restarts." },
      { type: "h2", text: "2. Check the Insured Declared Value (IDV)" },
      { type: "p", text: "IDV is the maximum payout if the vehicle is stolen or declared a total loss. A lower IDV reduces premium but also reduces what you receive. Make sure it reasonably reflects your vehicle's current value." },
      { type: "h2", text: "3. Confirm your No Claim Bonus (NCB)" },
      { type: "p", text: "NCB is a discount on the own-damage premium for each claim-free year, increasing over consecutive claim-free years up to a maximum. It belongs to you, so it can be transferred if you change insurer or vehicle. Make sure the correct NCB is applied." },
      { type: "h2", text: "4. Review add-ons" },
      { type: "ul", items: ["Zero depreciation — reduces deductions on replaced parts", "Engine protection — relevant in waterlogging-prone areas", "Roadside assistance — useful for long-distance drivers", "Consumables and return-to-invoice — depending on the vehicle's age"] },
      { type: "p", text: "Each add-on has conditions, such as limits on the number of claims or the vehicle's age. Choose based on how you use the vehicle." },
      { type: "h2", text: "5. Update personal details" },
      { type: "ul", items: ["Nominee for owner-driver personal accident cover", "Address and contact details", "Any modifications or change of use, such as CNG kits"] },
      { type: "note", text: "Undisclosed modifications or change in use can affect claims. Tell the insurer before renewal." },
    ],
  },
  {
    slug: "group-mediclaim-guide-for-employers",
    title: "Group Mediclaim for Employers: A Practical Guide",
    metaDescription:
      "How employers can design a group mediclaim (GMC) programme: family definition, sum insured, sub-limits, waiting periods and servicing.",
    excerpt: "Setting up or renewing group health cover? The design decisions that matter most to your employees.",
    category: "Corporate",
    image: images.corporateTeam,
    readingMinutes: 6,
    published: "2026-10-01",
    author: "Finmirai Editorial Team",
    reviewedBy: null,
    relatedService: { label: "Employee Benefits", href: "/corporate-insurance/employee-benefits" },
    body: [
      { type: "p", text: "Group Mediclaim (GMC) is often the most valued employee benefit. It is also one of the most visible: when an employee is in hospital, the policy design and servicing quickly become real." },
      { type: "h2", text: "Key design decisions" },
      { type: "h3", text: "Who is covered" },
      { type: "p", text: "Employee only, or employee plus spouse and children? Parents? Each extension raises premium but can significantly increase perceived value." },
      { type: "h3", text: "Sum insured" },
      { type: "p", text: "A flat amount for everyone, or graded by level? Consider treatment costs in the cities where your employees live." },
      { type: "h3", text: "Waivers" },
      { type: "p", text: "Group policies can often waive the waiting periods and pre-existing disease exclusions found in retail policies. These waivers are among the most valuable features for employees." },
      { type: "h3", text: "Cost controls" },
      { type: "ul", items: ["Room rent limits", "Disease-wise sub-limits", "Co-payment, often applied to parents", "Maternity limits"] },
      { type: "p", text: "Controls reduce premium but can create frustration at claim time. Use them deliberately and communicate them clearly." },
      { type: "h2", text: "Servicing through the year" },
      { type: "ul", items: ["Adding new joiners and dependants promptly", "Removing leavers", "E-cards and a clear claims process for employees", "A named contact for escalations"] },
      { type: "h2", text: "Preparing for renewal" },
      { type: "p", text: "Insurers look at claims experience when renewing. Start the review well before expiry, with claims data, headcount changes and any design changes you want." },
      { type: "note", text: "Group policy terms depend on insurer underwriting and are set out in the final policy schedule." },
    ],
  },
  {
    slug: "health-insurance-waiting-periods-explained",
    title: "Health Insurance Waiting Periods, Explained",
    metaDescription:
      "Initial waiting period, specific illness waiting period and pre-existing disease waiting period — what they mean and how to compare them.",
    excerpt: "Why some claims aren't paid in the first months or years of a policy — and how to plan around it.",
    category: "Health",
    image: images.hospitalWard,
    readingMinutes: 4,
    published: "2026-10-01",
    author: "Finmirai Editorial Team",
    reviewedBy: null,
    relatedService: { label: "Health Insurance", href: "/insurance-solutions/health-insurance" },
    body: [
      { type: "p", text: "Waiting periods are periods after a policy starts during which certain claims aren't payable. They are one of the most important — and most overlooked — parts of a health policy." },
      { type: "h2", text: "Three common waiting periods" },
      { type: "h3", text: "Initial waiting period" },
      { type: "p", text: "A short period at the start of a new policy during which illness-related claims are not covered. Accidents are usually covered from day one." },
      { type: "h3", text: "Specific illness or procedure waiting period" },
      { type: "p", text: "Listed conditions or procedures that are covered only after a defined period of continuous cover." },
      { type: "h3", text: "Pre-existing disease (PED) waiting period" },
      { type: "p", text: "Conditions you had before buying the policy are covered only after a defined period of continuous cover, provided they were disclosed." },
      { type: "h2", text: "How to plan around them" },
      { type: "ul", items: ["Buy health insurance early, before health conditions develop", "Renew without a break — continuity counts towards waiting periods", "Use portability rather than starting afresh when you switch insurers", "Compare waiting periods along with premium when choosing a plan"] },
      { type: "note", text: "Waiting period lengths differ between products. Always check the policy wording for the exact terms." },
    ],
  },
  {
    slug: "what-does-an-insurance-broker-do",
    title: "What Does an Insurance Broker Do for You?",
    metaDescription:
      "How an insurance broker differs from buying directly, and how a broker can help with advice, comparison, documentation, servicing and claims guidance.",
    excerpt: "Brokers work with multiple insurers on your behalf. Here is what that means in practice.",
    category: "Basics",
    image: images.teamMeeting,
    readingMinutes: 4,
    published: "2026-10-01",
    author: "Finmirai Editorial Team",
    reviewedBy: null,
    relatedService: { label: "Get Insurance Assistance", href: "/get-insurance-assistance" },
    body: [
      { type: "p", text: "An insurance broker is an intermediary who works on behalf of the customer to arrange insurance, and can approach more than one insurer. That positioning shapes what a good broker should do for you." },
      { type: "h2", text: "Before you buy" },
      { type: "ul", items: ["Understand your risks and needs", "Explain cover options, exclusions and conditions in plain language", "Approach suitable insurers and compare terms", "Help you complete proposal forms accurately"] },
      { type: "h2", text: "During the policy" },
      { type: "ul", items: ["Handle changes and endorsements", "Remind you about renewals", "Review whether cover still fits as your life or business changes"] },
      { type: "h2", text: "When you claim" },
      { type: "ul", items: ["Explain the claims process and documents", "Help you communicate with the insurer and follow up", "Explain decisions and options if something is disputed"] },
      { type: "note", text: "The insurer — not the broker — decides claims under the policy terms. A broker's role is to guide, support and advocate within that process." },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
