import type { IconName } from "@/components/ui/Icon";
import { images, type SiteImage } from "./images";

/**
 * Insurance product pages (Plan §6). Every page renders through ProductPageTemplate using this shape.
 *
 * Copy rules (Plan §3, §15): explain, don't promise. No "cheapest", no guaranteed claims, no invented
 * insurer names or statistics. Final product wording must be approved by the client / compliance.
 */

export type Segment = "personal" | "corporate";

export type Product = {
  slug: string;
  segment: Segment;
  name: string;
  shortName: string;
  icon: IconName;
  image: SiteImage;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroLine: string;
  cardSummary: string;
  whoFor: string[];
  protects: string[];
  coverAreas: { title: string; text: string }[];
  whatToCheck: { title: string; text: string }[];
  howWeHelp: string[];
  faqs: { q: string; a: string }[];
  /** Product-specific disclaimer, shown above the general one. Pending compliance approval. */
  disclaimer: string;
  related: string[];
  /**
   * Set when the plan flags that the client must confirm the line is actually offered
   * (Plan §2 "Confirm whether all listed products/services are currently offered").
   * Tracked in LAUNCH_CHECKLIST.md. Pages still render so they can be reviewed on staging.
   */
  confirmOffering?: boolean;
};

const commonHelp = {
  personal: [
    "Listen first: we understand your family, health, assets and budget before discussing any plan.",
    "Explain options in plain language, including what is not covered.",
    "Help you compare suitable options and complete the proposal and documentation correctly.",
    "Remind you ahead of renewals and help with changes during the policy year.",
    "Guide you through the claims process and the documents the insurer will ask for.",
  ],
  corporate: [
    "Map your business risks before recommending any cover.",
    "Prepare clear underwriting information so insurers can quote on accurate facts.",
    "Present options side by side — covers, exclusions, deductibles and terms, not just premium.",
    "Handle placement, documentation, endorsements and mid-term changes.",
    "Track renewals and support your team through claims, within the broker's role.",
  ],
};

export const products: Product[] = [
  // ───────────────────────────── PERSONAL ─────────────────────────────
  {
    slug: "health-insurance",
    segment: "personal",
    name: "Health Insurance",
    shortName: "Health",
    icon: "heartPulse",
    image: images.healthDoctorNursePatient,
    metaTitle: "Health Insurance Advice for Individuals & Families",
    metaDescription:
      "Understand health insurance before you buy. Finmirai helps individuals and families in Chennai compare covers, waiting periods and limits, and supports you at renewal and claim time.",
    h1: "Health Insurance",
    heroLine:
      "Protection against hospitalisation costs for you and your family — chosen with a clear view of limits, waiting periods and exclusions.",
    cardSummary: "Individual and family floater cover for hospitalisation and related medical costs.",
    whoFor: [
      "Individuals who want cover beyond an employer's group policy",
      "Families choosing between individual and family floater plans",
      "Parents and senior citizens who need age-appropriate cover",
      "Anyone porting or reviewing an existing health policy",
    ],
    protects: [
      "A single hospital stay can disrupt years of savings. Health insurance is designed to pay for covered hospitalisation and related medical expenses, either directly to a network hospital (cashless) or by reimbursing you, subject to the policy terms.",
      "The right policy depends on who is covered, their ages and health history, the hospitals you prefer and how much risk you are comfortable carrying yourself.",
    ],
    coverAreas: [
      { title: "In-patient hospitalisation", text: "Room, nursing, doctor fees, medicines and procedures during a covered hospital stay." },
      { title: "Pre- and post-hospitalisation", text: "Related consultations, diagnostics and medicines for a defined number of days before and after admission." },
      { title: "Day-care procedures", text: "Treatments that need less than 24 hours of admission because of modern medical technology." },
      { title: "Cashless network access", text: "Treatment at network hospitals with direct settlement, subject to pre-authorisation." },
      { title: "Optional add-ons", text: "Depending on the plan, options such as restoration of sum insured, maternity or critical illness benefits." },
    ],
    whatToCheck: [
      { title: "Waiting periods", text: "Initial waiting period, specific-illness waiting periods and the waiting period for pre-existing conditions." },
      { title: "Room rent and sub-limits", text: "Caps on room category or specific treatments can reduce what is paid on the entire bill." },
      { title: "Co-payment and deductibles", text: "The share of each claim you pay yourself, common in senior-citizen plans." },
      { title: "Exclusions", text: "Treatments and situations the policy will not pay for. Read these before you compare premiums." },
      { title: "Disclosure", text: "Declare existing conditions and habits honestly on the proposal form. Non-disclosure can affect claims." },
      { title: "Network hospitals", text: "Whether the hospitals you are likely to use are in the insurer's cashless network." },
    ],
    howWeHelp: commonHelp.personal,
    faqs: [
      { q: "Should I choose an individual plan or a family floater?", a: "A floater shares one sum insured across family members and often suits younger families. Individual plans give each person their own cover and may suit families with older members or higher health risks. We look at ages, health history and budget before suggesting either." },
      { q: "Is my employer's group health cover enough?", a: "Group cover usually ends when you leave the job and may have limits that don't fit your family. Many people keep a personal policy alongside group cover so protection continues regardless of employment." },
      { q: "What is a pre-existing disease waiting period?", a: "It is the period after you buy a policy during which claims related to declared pre-existing conditions are not paid. The length varies by product, so we show you this clearly when comparing options." },
      { q: "What is the difference between cashless and reimbursement claims?", a: "In a cashless claim the insurer settles the bill directly with a network hospital after approval. In a reimbursement claim you pay first and submit documents to the insurer. Both are subject to policy terms." },
      { q: "Can I move my existing policy to another insurer?", a: "Health insurance portability lets you move to another insurer at renewal while carrying forward certain continuity benefits, subject to the new insurer's underwriting. Start the process well before your renewal date." },
      { q: "Does Finmirai decide whether my claim is paid?", a: "No. Claim assessment and settlement are done by the insurer under the policy terms. Finmirai helps you understand the process, prepare documents and follow up." },
    ],
    disclaimer:
      "Coverage, waiting periods, sub-limits and exclusions vary by insurer and product. Please read the policy wording and sales brochure carefully before concluding a sale.",
    related: ["personal-accident-insurance", "life-insurance", "travel-insurance"],
  },
  {
    slug: "life-insurance",
    segment: "personal",
    name: "Life & Term Insurance",
    shortName: "Life",
    icon: "umbrella",
    image: images.tamilFamilyTraditional,
    metaTitle: "Life & Term Insurance Guidance for Your Family",
    metaDescription:
      "Plan financial protection for your dependants with life and term insurance. Finmirai explains cover amount, policy term, riders and disclosure in plain language.",
    h1: "Life & Term Insurance",
    heroLine:
      "Financial protection for the people who depend on your income — sized to your responsibilities, not to a sales target.",
    cardSummary: "Term and life cover that protects your dependants if the unexpected happens.",
    whoFor: [
      "Earning members with dependants — spouse, children or parents",
      "Anyone with a home loan or other long-term liabilities",
      "Self-employed professionals and business owners",
      "Families reviewing whether existing cover is still adequate",
    ],
    protects: [
      "Term insurance pays a defined sum to your nominee if you pass away during the policy term. It is designed to replace income and help your family meet goals and liabilities.",
      "Choosing the cover amount, policy term and riders carefully matters more than the brand of the plan.",
    ],
    coverAreas: [
      { title: "Death benefit", text: "The sum assured paid to the nominee on death during the policy term, subject to terms." },
      { title: "Choice of policy term", text: "Cover aligned to the years your family depends on your income or until loans are repaid." },
      { title: "Payout options", text: "Lump sum, monthly income or a mix, depending on the plan." },
      { title: "Riders", text: "Optional add-ons such as accidental death or critical illness benefits, where offered." },
    ],
    whatToCheck: [
      { title: "Adequate cover amount", text: "Consider income, liabilities, goals and existing assets — not just the premium." },
      { title: "Complete disclosure", text: "Health, lifestyle, occupation and existing policies must be declared accurately." },
      { title: "Exclusions", text: "For example, specific exclusions that apply in the early policy years." },
      { title: "Nominee details", text: "Keep nominees updated and make sure your family knows the policy exists." },
    ],
    howWeHelp: commonHelp.personal,
    faqs: [
      { q: "How much life cover do I need?", a: "There is no single formula. We look at your income, the number of years your family depends on it, outstanding loans and future goals such as education, then subtract existing cover and assets." },
      { q: "What is the difference between term insurance and savings-linked plans?", a: "Term insurance is pure protection — it pays only on death during the term, which keeps premiums lower for a given cover. Savings-linked plans combine protection with a maturity benefit. We explain the trade-offs so you can decide." },
      { q: "Why is disclosure so important?", a: "The insurer prices and accepts the risk based on your declarations. Incomplete or incorrect information can lead to a claim being disputed, so we help you fill the proposal form carefully." },
      { q: "Can I buy more cover later?", a: "Yes, you can buy additional policies later, but premiums are generally based on age and health at the time of purchase, so reviewing cover early is sensible." },
      { q: "What happens if I miss a premium?", a: "Policies usually allow a grace period. If the premium is still unpaid after that, the policy may lapse. We send renewal reminders to help avoid this." },
    ],
    disclaimer:
      "Benefits, exclusions and terms vary by insurer and plan. Please read the sales brochure and policy document carefully before concluding a sale.",
    related: ["health-insurance", "personal-accident-insurance", "home-insurance"],
    confirmOffering: true,
  },
  {
    slug: "motor-insurance",
    segment: "personal",
    name: "Motor Insurance",
    shortName: "Motor",
    icon: "car",
    image: images.coupleNewCar,
    metaTitle: "Motor Insurance for Cars & Two-Wheelers – Renewal Help",
    metaDescription:
      "Car and two-wheeler insurance guidance from Finmirai. Understand third-party and own-damage cover, IDV, No Claim Bonus and add-ons, and get help at renewal and claim time.",
    h1: "Motor Insurance",
    heroLine:
      "Cover for your car or two-wheeler that meets legal requirements and protects you from repair and liability costs.",
    cardSummary: "Third-party and comprehensive cover for private cars and two-wheelers, with renewal support.",
    whoFor: [
      "Private car and two-wheeler owners",
      "Owners of new vehicles choosing their first policy",
      "Anyone whose motor policy is due for renewal",
      "Families with multiple vehicles who want one point of contact",
    ],
    protects: [
      "Third-party liability cover is mandatory for vehicles used on public roads in India. It covers your legal liability for injury to others or damage to their property.",
      "A comprehensive policy adds own-damage cover for your vehicle against accidents, theft, fire and natural calamities, subject to the policy terms.",
    ],
    coverAreas: [
      { title: "Third-party liability", text: "Legal liability for death or injury to third parties and damage to their property." },
      { title: "Own damage", text: "Repair or replacement costs for your vehicle after an insured event, subject to deductibles." },
      { title: "Personal accident for owner-driver", text: "Compulsory personal accident cover for the owner-driver, as applicable." },
      { title: "Add-on covers", text: "Options such as zero depreciation, engine protection, roadside assistance and consumables, depending on the insurer." },
    ],
    whatToCheck: [
      { title: "Insured Declared Value (IDV)", text: "The maximum the insurer pays if the vehicle is stolen or a total loss. Too low saves premium but reduces protection." },
      { title: "No Claim Bonus (NCB)", text: "A discount on own-damage premium for claim-free years. Make sure it is carried forward correctly." },
      { title: "Renewal before expiry", text: "Driving without valid insurance is illegal, and a long lapse can mean losing NCB or needing an inspection." },
      { title: "Deductibles", text: "The part of each own-damage claim you bear yourself." },
      { title: "Add-on conditions", text: "Each add-on has its own limits — for example, the number of claims allowed in a year." },
    ],
    howWeHelp: commonHelp.personal,
    faqs: [
      { q: "Is third-party insurance enough?", a: "It meets the legal requirement but does not pay for damage to your own vehicle. Comprehensive cover is usually worth considering, especially for newer vehicles." },
      { q: "What is IDV and how is it set?", a: "IDV is broadly the current market value of the vehicle, based on the manufacturer's listed price less depreciation for age. It determines the maximum payout for theft or total loss." },
      { q: "Will I lose my No Claim Bonus if I change insurer?", a: "No. NCB belongs to you, not the insurer, and can usually be transferred when you switch insurer or vehicle, provided the policy hasn't lapsed beyond the allowed period." },
      { q: "Is zero depreciation cover worth it?", a: "It can reduce what you pay out of pocket on parts replaced after an accident. Whether it is worth the extra premium depends on the vehicle's age and how you use it." },
      { q: "What should I do right after an accident?", a: "Ensure everyone is safe, note details and photographs, inform the insurer promptly and avoid unauthorised repairs before the insurer's process allows. For third-party injury or theft, a police report is usually required. Contact us and we will guide you." },
    ],
    disclaimer:
      "Premium, IDV, add-on availability and claim terms are determined by the insurer and the policy wording. Please read the policy terms carefully before concluding a sale.",
    related: ["personal-accident-insurance", "travel-insurance", "home-insurance"],
  },
  {
    slug: "travel-insurance",
    segment: "personal",
    name: "Travel Insurance",
    shortName: "Travel",
    icon: "plane",
    image: images.travelPassportAirport,
    metaTitle: "Travel Insurance for International & Domestic Trips",
    metaDescription:
      "Travel insurance guidance for students, families and business travellers. Finmirai helps you check medical cover, trip disruption, baggage and visa requirements before you fly.",
    h1: "Travel Insurance",
    heroLine:
      "Protection from medical emergencies and travel disruptions abroad, chosen around where you are going and why.",
    cardSummary: "Medical and trip protection for leisure, business and student travel.",
    whoFor: [
      "Families travelling abroad on holiday",
      "Business travellers making single or multiple trips a year",
      "Students going overseas for study",
      "Senior citizens visiting family abroad",
    ],
    protects: [
      "Medical treatment abroad can be very expensive, and many countries expect visitors to carry insurance. Travel insurance is designed to cover emergency medical costs and certain trip disruptions while you are away.",
      "Some visas require travel insurance with a minimum level of medical cover, so the destination matters when choosing a plan.",
    ],
    coverAreas: [
      { title: "Emergency medical expenses", text: "Hospitalisation and emergency treatment during the trip, subject to limits." },
      { title: "Medical evacuation", text: "Transport to suitable medical care or back home where medically necessary." },
      { title: "Trip disruption", text: "Covered cancellation, delay or interruption costs, depending on the plan." },
      { title: "Baggage and documents", text: "Loss or delay of checked-in baggage and loss of passport, subject to conditions." },
      { title: "Personal liability", text: "Legal liability to others while travelling, in some plans." },
    ],
    whatToCheck: [
      { title: "Visa requirements", text: "Minimum medical cover or specific conditions the embassy may require." },
      { title: "Pre-existing conditions", text: "Many plans exclude or limit them — check before you travel." },
      { title: "Deductibles", text: "The amount you bear on each claim, often in foreign currency." },
      { title: "Adventure activities", text: "Skiing, diving and similar activities may need specific cover." },
      { title: "Trip dates", text: "The policy must cover the full trip — extend it before expiry if plans change." },
    ],
    howWeHelp: commonHelp.personal,
    faqs: [
      { q: "Do I need travel insurance for a Schengen visa?", a: "Schengen visa applications generally require travel medical insurance meeting minimum cover requirements set by the Schengen rules. Check the latest embassy guidance; we can help you choose a plan that meets it." },
      { q: "Is a multi-trip policy better for frequent travellers?", a: "If you travel abroad several times a year, an annual multi-trip policy can be simpler than buying cover for each trip. Each plan limits the length of any single trip, so we check your travel pattern first." },
      { q: "Does travel insurance cover pre-existing illnesses?", a: "Usually only in limited situations, such as life-threatening emergencies, and only if the plan says so. Read this section carefully if anyone travelling has an ongoing condition." },
      { q: "What should I do in a medical emergency abroad?", a: "Contact the insurer's assistance helpline listed on your policy as early as possible. They can guide you to hospitals and, where possible, arrange direct payment." },
      { q: "Can I buy travel insurance after leaving India?", a: "Most policies must be bought before the trip starts. Buy cover before you depart." },
    ],
    disclaimer:
      "Benefits, sub-limits, deductibles and exclusions vary by insurer and plan. Please read the policy wording carefully before concluding a sale.",
    related: ["health-insurance", "personal-accident-insurance", "motor-insurance"],
  },
  {
    slug: "home-insurance",
    segment: "personal",
    name: "Home Insurance",
    shortName: "Home",
    icon: "home",
    image: images.homeFamilyRoof,
    metaTitle: "Home Insurance for Your House & Belongings",
    metaDescription:
      "Protect your home structure and contents against fire, natural calamities, burglary and more. Finmirai helps homeowners and tenants choose suitable home insurance.",
    h1: "Home Insurance",
    heroLine:
      "Cover for the building you own and the belongings inside it, against events most families never plan for.",
    cardSummary: "Protection for your home's structure and contents against fire, floods, burglary and more.",
    whoFor: [
      "Homeowners of independent houses and apartments",
      "Tenants who want to protect their belongings",
      "Families with valuable contents such as electronics and jewellery",
      "Owners in areas exposed to floods or cyclones",
    ],
    protects: [
      "Your home is often your largest asset. Home insurance is designed to pay for repair or rebuilding of the structure and replacement of contents after insured events such as fire, flood, storm or burglary.",
      "Getting the sum insured right is the most important decision: too low, and claims may be reduced proportionately.",
    ],
    coverAreas: [
      { title: "Building / structure", text: "Repair or reconstruction cost of the home after insured damage." },
      { title: "Contents", text: "Furniture, appliances, electronics and household goods." },
      { title: "Natural perils", text: "Events such as flood, storm, cyclone and earthquake, as specified in the policy." },
      { title: "Burglary and theft", text: "Loss from burglary, subject to conditions and evidence." },
      { title: "Valuables", text: "Jewellery and similar items, usually with limits or specific declaration." },
    ],
    whatToCheck: [
      { title: "Sum insured basis", text: "Reconstruction cost for the building — not the market price of the property." },
      { title: "Under-insurance", text: "If the sum insured is lower than the actual value, claims may be reduced." },
      { title: "Listed perils", text: "Confirm which events are covered and which are excluded." },
      { title: "Valuables declaration", text: "High-value items may need to be listed individually." },
      { title: "Unoccupied periods", text: "Some covers change if the home is left vacant for long periods." },
    ],
    howWeHelp: commonHelp.personal,
    faqs: [
      { q: "Can tenants buy home insurance?", a: "Yes. Tenants can insure their contents even though they don't own the building." },
      { q: "How should I decide the sum insured for my house?", a: "For the structure, use the cost to rebuild — construction area multiplied by a realistic per-square-foot construction cost — not the market value, which includes land." },
      { q: "Is flood damage covered?", a: "Many home policies cover flood and inundation as a named peril, but always confirm in the policy wording, especially in flood-prone areas." },
      { q: "Does my housing society's policy cover my flat?", a: "A society policy may cover common structure but typically not your contents or interiors. Check what it covers before relying on it." },
      { q: "What documents help in a home insurance claim?", a: "Photographs of damage, purchase bills or proof of ownership for contents, a police report for burglary, and the claim form. Keeping an inventory of belongings makes claims much easier." },
    ],
    disclaimer:
      "Covered perils, limits and exclusions vary by insurer and product. Please read the policy wording carefully before concluding a sale.",
    related: ["property-fire-insurance", "motor-insurance", "health-insurance"],
  },
  {
    slug: "personal-accident-insurance",
    segment: "personal",
    name: "Personal Accident Insurance",
    shortName: "Personal Accident",
    icon: "bandage",
    image: images.accidentArmCast,
    metaTitle: "Personal Accident Insurance – Income & Disability Protection",
    metaDescription:
      "Personal accident insurance pays benefits for accidental death and disability. Finmirai explains how it complements health and life cover for you and your family.",
    h1: "Personal Accident Insurance",
    heroLine:
      "Financial support if an accident causes death or disability — the gap that health insurance alone doesn't fill.",
    cardSummary: "Benefits for accidental death, permanent disability and loss of income after an accident.",
    whoFor: [
      "Daily commuters and two-wheeler riders",
      "Self-employed people whose income stops if they can't work",
      "Professionals in field or travel-heavy roles",
      "Families who want protection alongside health and life cover",
    ],
    protects: [
      "Health insurance pays hospital bills, but an accident can also stop your income for months or permanently. Personal accident insurance pays defined benefits for accidental death and disability, regardless of medical bills.",
    ],
    coverAreas: [
      { title: "Accidental death", text: "A lump sum to the nominee if death results from an accident." },
      { title: "Permanent total disability", text: "A benefit if an accident leaves you permanently and totally disabled." },
      { title: "Permanent partial disability", text: "A percentage of the sum insured based on a defined disability table." },
      { title: "Temporary total disability", text: "A weekly benefit while you are unable to work, in plans that include it." },
      { title: "Additional benefits", text: "Depending on the plan, items such as children's education benefit or accidental hospitalisation." },
    ],
    whatToCheck: [
      { title: "Sum insured basis", text: "Insurers typically link cover to income — understand the limits that apply to you." },
      { title: "Disability definitions", text: "How the policy defines total and partial disability and the benefit table used." },
      { title: "Occupation class", text: "Your occupation can affect premium and acceptance." },
      { title: "Exclusions", text: "For example, injuries under the influence of intoxicants or from hazardous activities." },
    ],
    howWeHelp: commonHelp.personal,
    faqs: [
      { q: "Isn't health insurance enough?", a: "Health insurance pays for treatment. Personal accident cover pays fixed benefits for death or disability caused by accidents, which can replace lost income. The two work together." },
      { q: "Is personal accident cover expensive?", a: "Premiums are generally modest relative to the cover, because the policy covers accidents only. The exact premium depends on the sum insured and occupation." },
      { q: "Does it cover illness?", a: "No. Personal accident insurance covers bodily injury caused by accidents, not illnesses." },
      { q: "Can I have more than one personal accident policy?", a: "Generally yes. Unlike indemnity policies, fixed-benefit policies may pay under each policy, subject to each policy's terms and disclosure." },
      { q: "Does my motor policy's PA cover protect me fully?", a: "The compulsory owner-driver PA cover in a motor policy applies only to accidents connected with that vehicle and has a fixed limit. A standalone policy covers accidents more broadly." },
    ],
    disclaimer:
      "Benefits, definitions and exclusions vary by insurer and product. Please read the policy wording carefully before concluding a sale.",
    related: ["health-insurance", "life-insurance", "motor-insurance"],
    confirmOffering: true,
  },

  // ───────────────────────────── CORPORATE ─────────────────────────────
  {
    slug: "property-fire-insurance",
    segment: "corporate",
    name: "Property & Fire Insurance",
    shortName: "Property & Fire",
    icon: "flame",
    image: images.propertyFire,
    metaTitle: "Property & Fire Insurance for Businesses",
    metaDescription:
      "Protect buildings, plant, machinery and stock against fire and allied perils. Finmirai helps businesses value assets correctly and structure property insurance.",
    h1: "Property & Fire Insurance",
    heroLine:
      "Protection for the buildings, machinery, stock and equipment your business runs on.",
    cardSummary: "Cover for buildings, plant, machinery and stock against fire and allied perils.",
    whoFor: [
      "Manufacturers and factories",
      "Warehouses, traders and distributors holding stock",
      "Offices, shops, hotels and hospitals",
      "Property owners and lessors",
    ],
    protects: [
      "A fire, flood or storm can damage assets that took years to build. Property insurance is designed to pay for repair or replacement of insured assets after insured events, so the business can recover.",
      "Correct valuation and a clear list of locations and assets are the foundation of a property programme.",
    ],
    coverAreas: [
      { title: "Fire and allied perils", text: "Fire, lightning, explosion, storm, flood, inundation and other named perils." },
      { title: "Buildings and plant", text: "Structures, plant, machinery, furniture, fixtures and fittings." },
      { title: "Stocks", text: "Raw material, work in progress and finished goods, including declaration or floater options." },
      { title: "Optional extensions", text: "Earthquake, terrorism, burglary and similar extensions, as available." },
      { title: "Business interruption", text: "Loss of gross profit after an insured physical loss, where arranged." },
    ],
    whatToCheck: [
      { title: "Basis of valuation", text: "Reinstatement value versus market value — this changes what you receive after a loss." },
      { title: "Under-insurance", text: "Average clauses can reduce claims if sums insured are too low." },
      { title: "Stock fluctuations", text: "Seasonal stock may need declaration or floater policies." },
      { title: "Locations", text: "Every location and its occupancy must be correctly declared." },
      { title: "Risk-improvement requirements", text: "Insurer conditions on fire protection, housekeeping and storage." },
    ],
    howWeHelp: commonHelp.corporate,
    faqs: [
      { q: "What is the difference between reinstatement value and market value?", a: "Reinstatement value pays to replace damaged assets with new ones of similar kind, while market value deducts depreciation. Reinstatement usually gives better recovery but must be insured at full value." },
      { q: "How should we insure stock that fluctuates through the year?", a: "Declaration policies let you insure a maximum value and declare actual stock periodically, so premium follows actual exposure. Floater policies cover stock moving across several locations." },
      { q: "Does a fire policy cover loss of profit?", a: "Not by default. Business interruption (loss of profit) cover is a separate section that pays for loss of gross profit following insured physical damage." },
      { q: "We have multiple locations. Can they be covered under one policy?", a: "Often yes, with each location and its sum insured listed. A single programme also makes renewals and claims easier to manage." },
      { q: "What information do insurers need for a quote?", a: "Typically occupancy, construction, locations, sums insured by asset type, fire protection, claims history and photographs or surveys for larger risks." },
    ],
    disclaimer:
      "Covers, extensions and terms depend on the insurer's underwriting and the policy wording. Please read the policy terms carefully before concluding a sale.",
    related: ["engineering-insurance", "marine-insurance", "liability-insurance"],
  },
  {
    slug: "marine-insurance",
    segment: "corporate",
    name: "Marine Insurance",
    shortName: "Marine",
    icon: "ship",
    image: images.cargoShip,
    metaTitle: "Marine Cargo & Transit Insurance for Businesses",
    metaDescription:
      "Marine cargo insurance for importers, exporters and domestic transit. Finmirai helps you match cover to Incoterms, routes and goods, and supports claims documentation.",
    h1: "Marine Insurance",
    heroLine:
      "Cover for goods in transit — by sea, air, rail or road — from the moment they leave until they arrive.",
    cardSummary: "Cargo and transit cover for imports, exports and domestic movement of goods.",
    whoFor: [
      "Importers and exporters",
      "Manufacturers moving raw material and finished goods",
      "Traders, distributors and e-commerce sellers",
      "Project cargo and machinery movements",
    ],
    protects: [
      "Goods in transit face risks of accident, theft, handling damage and weather. Marine cargo insurance is designed to pay for physical loss or damage to insured goods during transit, as defined in the policy.",
      "Who arranges insurance depends on the contract of sale — the Incoterms agreed with your buyer or supplier.",
    ],
    coverAreas: [
      { title: "Import and export cargo", text: "International shipments by sea and air, warehouse-to-warehouse where applicable." },
      { title: "Inland transit", text: "Domestic movement by road and rail." },
      { title: "Open / annual policies", text: "Automatic cover for regular shipments under one policy, with declarations." },
      { title: "Specific voyage policies", text: "Cover for one-off shipments." },
      { title: "Extensions", text: "Options such as war and strikes cover, as available." },
    ],
    whatToCheck: [
      { title: "Incoterms", text: "Whether you or the other party is responsible for insuring the goods." },
      { title: "Clauses", text: "The scope of cover — all risks or named perils — under the applicable cargo clauses." },
      { title: "Packing", text: "Insufficient packing is commonly excluded." },
      { title: "Basis of valuation", text: "Typically invoice value plus a margin, agreed in advance." },
      { title: "Claim notice", text: "Damage should be noted on delivery receipts and reported promptly." },
    ],
    howWeHelp: commonHelp.corporate,
    faqs: [
      { q: "Do we need marine insurance if our supplier says goods are insured?", a: "It depends on the Incoterms. Under some terms the seller insures only to the port of loading or with minimum cover. We review your contracts to identify gaps." },
      { q: "What is an open policy?", a: "An open or annual policy automatically covers all eligible shipments during the year up to agreed limits. You declare shipments as they happen, which avoids buying a policy for every consignment." },
      { q: "Does marine insurance cover delays?", a: "Loss caused by delay is generally excluded from cargo policies. Cover focuses on physical loss or damage to the goods." },
      { q: "What should we do when goods arrive damaged?", a: "Note the damage on the delivery receipt, take photographs, keep packing, notify the insurer immediately and preserve the right to claim from the carrier. We guide you through the survey and documentation." },
      { q: "Can domestic road transit be insured?", a: "Yes. Inland transit cover is available for goods moving by road or rail within India." },
    ],
    disclaimer:
      "Cover depends on the applicable clauses, policy terms and insurer underwriting. Please read the policy terms carefully before concluding a sale.",
    related: ["property-fire-insurance", "liability-insurance", "engineering-insurance"],
  },
  {
    slug: "liability-insurance",
    segment: "corporate",
    name: "Liability Insurance",
    shortName: "Liability",
    icon: "scale",
    image: images.garmentUnit,
    metaTitle: "Liability & Workmen Compensation Insurance for Businesses",
    metaDescription:
      "Public, product, professional and directors' liability, and workmen compensation insurance. Finmirai helps businesses understand legal liability exposures and structure cover.",
    h1: "Liability Insurance",
    heroLine:
      "Protection when your business is held legally responsible for injury, damage or financial loss to others.",
    cardSummary: "Public, product, professional, D&O liability and workmen compensation.",
    whoFor: [
      "Manufacturers and businesses with public footfall",
      "Professionals and consulting firms",
      "Companies with boards and directors",
      "Employers with workers covered under employee compensation law",
    ],
    protects: [
      "Legal claims can arise from customers, visitors, employees or contracts. Liability insurance is designed to pay compensation and legal defence costs for covered claims, within policy limits.",
      "Many contracts and tenders also require proof of specific liability covers.",
    ],
    coverAreas: [
      { title: "Public / general liability", text: "Third-party injury or property damage arising from your premises or operations." },
      { title: "Product liability", text: "Claims arising from products you make, sell or distribute." },
      { title: "Professional indemnity", text: "Claims alleging negligence, errors or omissions in professional services." },
      { title: "Directors & Officers (D&O)", text: "Personal liability of directors and officers for management decisions." },
      { title: "Workmen / employees' compensation", text: "The employer's liability to compensate employees for work-related injury, as required under applicable law." },
    ],
    whatToCheck: [
      { title: "Limit of indemnity", text: "Per-claim and aggregate limits that match realistic claim sizes and contract requirements." },
      { title: "Claims-made vs occurrence", text: "Which claims are covered depending on when the event or claim happens." },
      { title: "Retroactive date", text: "Past work that is or isn't covered under claims-made policies." },
      { title: "Territory and jurisdiction", text: "Important for exporters and businesses with overseas clients." },
      { title: "Contractual liability", text: "Liability you take on through contracts may be limited or excluded." },
    ],
    howWeHelp: commonHelp.corporate,
    faqs: [
      { q: "Which liability covers does a small business need?", a: "It depends on what you do. A manufacturer might prioritise product and public liability; a consulting firm, professional indemnity. We start with your operations and contracts." },
      { q: "What is workmen compensation insurance?", a: "It covers an employer's legal liability to pay compensation to employees for injury or death arising out of and in the course of employment, as provided under applicable compensation law." },
      { q: "Why do directors need D&O cover?", a: "Directors and officers can be held personally liable for alleged wrongful acts in managing the company. D&O insurance helps cover defence costs and compensation, subject to terms." },
      { q: "Our client contract demands specific liability limits. Can you help?", a: "Yes. We review the insurance clauses in your contract and help arrange cover and certificates that meet them where insurers can provide it." },
      { q: "What does claims-made mean?", a: "A claims-made policy covers claims first made during the policy period, provided the event occurred after the retroactive date. Continuous renewal matters for this type of cover." },
    ],
    disclaimer:
      "Liability covers are subject to policy limits, terms, exclusions and insurer underwriting. Please read the policy wording carefully before concluding a sale.",
    related: ["employee-benefits", "cyber-insurance", "property-fire-insurance"],
  },
  {
    slug: "employee-benefits",
    segment: "corporate",
    name: "Employee Benefits",
    shortName: "Employee Benefits",
    icon: "users",
    image: images.corporateTeam,
    metaTitle: "Employee Benefits Insurance – GMC, GPA & GTL",
    metaDescription:
      "Group Mediclaim, Group Personal Accident and Group Term Life programmes for employers. Finmirai designs, places and services employee insurance with support for HR teams and employees.",
    h1: "Employee Benefits",
    heroLine:
      "Group health, accident and life cover that helps you look after your people — and support for HR when they need it.",
    cardSummary: "Group Mediclaim, Group Personal Accident and Group Term Life programmes.",
    whoFor: [
      "Startups setting up their first employee benefits",
      "SMEs and corporates reviewing existing group covers",
      "HR teams that need help with enrolment, endorsements and claims",
      "Employers wanting to extend cover to employees' families",
    ],
    protects: [
      "Group insurance helps employers attract and retain people by protecting them and their families against medical, accident and life risks.",
      "A well-designed programme balances what employees value, what the company can budget and how the policy will be serviced through the year.",
    ],
    coverAreas: [
      { title: "Group Mediclaim (GMC)", text: "Hospitalisation cover for employees and, if chosen, their dependants." },
      { title: "Group Personal Accident (GPA)", text: "Accidental death and disability benefits for employees." },
      { title: "Group Term Life (GTL)", text: "Life cover for employees, typically linked to salary or a fixed amount." },
      { title: "Optional benefits", text: "Depending on the insurer, options such as maternity, parental cover or top-ups." },
    ],
    whatToCheck: [
      { title: "Family definition", text: "Who is covered — spouse, children, parents — and age limits." },
      { title: "Sub-limits and co-pay", text: "Room rent caps, disease-wise limits and parental co-payments." },
      { title: "Waiting periods", text: "Whether waiting periods and pre-existing condition exclusions are waived." },
      { title: "Claims experience", text: "Past claims affect renewal terms — review them every year." },
      { title: "Enrolment and endorsements", text: "How new joiners and leavers are added and removed during the year." },
    ],
    howWeHelp: [
      "Understand your workforce, budget and benefit goals before designing the programme.",
      "Approach insurers with clear data and compare terms, not just premium.",
      "Support employee communication and onboarding to the policy.",
      "Handle additions, deletions and endorsements through the year.",
      "Provide claims guidance to employees and review claims experience before renewal.",
    ],
    faqs: [
      { q: "How many employees do we need for group insurance?", a: "Insurers set their own minimum group sizes, and some offer products for small teams. Share your headcount and we will tell you what is practical." },
      { q: "Can employees' parents be covered?", a: "Many group policies allow parental cover, sometimes with a co-payment or employee contribution. It is a design choice that affects premium." },
      { q: "Are pre-existing diseases covered in group mediclaim?", a: "Group policies can waive waiting periods and cover pre-existing conditions from day one, depending on the terms negotiated with the insurer." },
      { q: "What happens to an employee's cover when they leave?", a: "Group cover generally ends when employment ends. Some insurers offer options to convert to an individual policy — employees should check before leaving." },
      { q: "Who helps employees with claims?", a: "We support HR teams and employees with claim guidance and follow-up with the insurer or its administrator, within the broker's role." },
    ],
    disclaimer:
      "Group policy terms are subject to insurer underwriting and the final policy schedule. Please read the policy terms carefully before concluding a sale.",
    related: ["liability-insurance", "health-insurance", "personal-accident-insurance"],
  },
  {
    slug: "engineering-insurance",
    segment: "corporate",
    name: "Engineering Insurance",
    shortName: "Engineering",
    icon: "cog",
    image: images.engineeringConstructionSite,
    metaTitle: "Engineering & Industrial Insurance – CAR, EAR & Machinery",
    metaDescription:
      "Contractor's All Risk, Erection All Risk, machinery breakdown and equipment insurance. Finmirai helps contractors, project owners and manufacturers structure engineering covers.",
    h1: "Engineering & Industrial Insurance",
    heroLine:
      "Cover for projects under construction, machinery in operation and the equipment that keeps your work moving.",
    cardSummary: "Construction, erection, machinery breakdown and equipment covers.",
    whoFor: [
      "Contractors and project owners",
      "Manufacturers with critical plant and machinery",
      "Infrastructure and real-estate developers",
      "Businesses relying on electronic and IT equipment",
    ],
    protects: [
      "Engineering risks are specialised: a construction site, a machinery installation or a production line each faces different hazards. Engineering insurance is designed around these stages and assets.",
    ],
    coverAreas: [
      { title: "Contractor's All Risk (CAR)", text: "Physical loss or damage to civil works during construction, with optional third-party liability." },
      { title: "Erection All Risk (EAR)", text: "Machinery and plant during erection, installation and testing." },
      { title: "Machinery breakdown", text: "Sudden and unforeseen mechanical or electrical breakdown of operating machinery." },
      { title: "Contractor's plant & machinery", text: "Construction equipment such as cranes and earth-movers." },
      { title: "Electronic equipment", text: "Computers, control systems and electronic equipment against physical damage." },
    ],
    whatToCheck: [
      { title: "Project period", text: "Construction, testing and maintenance periods — and extensions if timelines slip." },
      { title: "Sum insured", text: "Full contract value or replacement value, including materials supplied by the principal." },
      { title: "Deductibles", text: "Especially for acts of nature and testing periods." },
      { title: "Contract requirements", text: "Insurance obligations in your EPC or construction contract." },
      { title: "Maintenance and testing conditions", text: "Policy conditions around testing, commissioning and maintenance." },
    ],
    howWeHelp: commonHelp.corporate,
    faqs: [
      { q: "Who should buy CAR insurance — the contractor or the owner?", a: "Either, depending on the contract. Many contracts specify who must insure. We review the contract and make sure all interested parties are protected." },
      { q: "Is machinery breakdown covered under a fire policy?", a: "No. Fire policies cover external perils such as fire. Machinery breakdown is a separate engineering cover for internal mechanical or electrical failure." },
      { q: "What if the project is delayed beyond the policy period?", a: "The policy usually needs to be extended before expiry, and insurers may charge additional premium. Tell us early if timelines change." },
      { q: "Can we insure loss of profit due to machinery breakdown?", a: "Some insurers offer machinery loss of profit cover alongside machinery breakdown insurance, subject to underwriting." },
      { q: "What information is needed for a CAR or EAR quote?", a: "Typically the contract value, project description, location, timelines, contractor details, site conditions and the scope of works." },
    ],
    disclaimer:
      "Engineering covers depend on insurer underwriting, project details and policy wording. Please read the policy terms carefully before concluding a sale.",
    related: ["property-fire-insurance", "liability-insurance", "marine-insurance"],
  },
  {
    slug: "cyber-insurance",
    segment: "corporate",
    name: "Cyber Insurance",
    shortName: "Cyber",
    icon: "lock",
    image: images.cyberInsuranceNetwork,
    metaTitle: "Cyber Insurance for Businesses",
    metaDescription:
      "Cyber insurance helps businesses respond to data breaches, ransomware and cyber incidents. Learn what cyber cover typically includes and how Finmirai can help you assess it.",
    h1: "Cyber Insurance",
    heroLine:
      "Financial support to respond and recover when a cyber incident disrupts your business or exposes data.",
    cardSummary: "Response costs, business interruption and liability following cyber incidents.",
    whoFor: [
      "Businesses handling customer or employee data",
      "Companies relying on online systems and payments",
      "Professional firms holding confidential client information",
      "Organisations with contractual data-protection obligations",
    ],
    protects: [
      "Ransomware, data breaches and online fraud can stop operations and create legal exposure. Cyber insurance is designed to pay certain costs of responding to incidents, restoring systems and handling third-party claims, subject to terms.",
      "Insurers usually ask about your IT security controls, so applying for cover is also a useful review of your defences.",
    ],
    coverAreas: [
      { title: "Incident response", text: "Forensic investigation, legal advice and breach management costs." },
      { title: "Data restoration", text: "Costs to restore or recreate data and systems after an insured event." },
      { title: "Business interruption", text: "Loss of income from network downtime caused by a covered incident, where included." },
      { title: "Privacy and network liability", text: "Third-party claims arising from data breaches or security failures." },
      { title: "Extortion", text: "Response to cyber extortion events, where permitted and covered." },
    ],
    whatToCheck: [
      { title: "Security requirements", text: "Controls such as multi-factor authentication and backups that insurers may require." },
      { title: "Waiting periods", text: "The hours of downtime before business-interruption cover applies." },
      { title: "Sub-limits", text: "Separate limits for items such as social engineering fraud." },
      { title: "Exclusions", text: "Including prior known incidents and unpatched vulnerabilities." },
    ],
    howWeHelp: commonHelp.corporate,
    faqs: [
      { q: "We are a small business. Are we really a target?", a: "Many cyber incidents affect smaller firms because their defences are lighter. The financial impact of downtime or a breach can be significant regardless of size." },
      { q: "Does cyber insurance replace IT security?", a: "No. Insurance helps with financial consequences. Insurers expect reasonable security controls and may decline or limit cover without them." },
      { q: "What information is needed for a cyber quote?", a: "Typically revenue, industry, the type and volume of data held, and answers to a security questionnaire covering backups, access control and incident response." },
      { q: "Does cyber insurance cover fraudulent payment instructions?", a: "Some policies offer limited social-engineering fraud cover as an extension, often with sub-limits. Check this carefully if your business makes frequent payments." },
      { q: "Is cyber insurance available through Finmirai?", a: "Please contact us to discuss your requirement. Availability depends on insurer appetite and your risk profile." },
    ],
    disclaimer:
      "Cyber cover is subject to insurer underwriting, security requirements, sub-limits and policy wording. Please read the policy terms carefully before concluding a sale.",
    related: ["liability-insurance", "property-fire-insurance", "employee-benefits"],
    // Plan §4 & §6: "Cyber, if actually offered".
    confirmOffering: true,
  },
];

export const personalProducts = products.filter((p) => p.segment === "personal");
export const corporateProducts = products.filter((p) => p.segment === "corporate");

export const segmentBase: Record<Segment, string> = {
  personal: "/insurance-solutions",
  corporate: "/corporate-insurance",
};

export function productHref(p: Pick<Product, "slug" | "segment">): string {
  return `${segmentBase[p.segment]}/${p.slug}`;
}

export function getProduct(segment: Segment, slug: string): Product | undefined {
  return products.find((p) => p.segment === segment && p.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Options for the "type of insurance" select in enquiry forms. */
export const insuranceTypeOptions = [
  ...personalProducts.map((p) => ({ value: p.slug, label: p.name })),
  { value: "corporate", label: "Business / Corporate Insurance" },
  { value: "review", label: "Review of my existing policies" },
  { value: "other", label: "Something else / not sure" },
];

/** Requirement checkboxes on the corporate form (Plan §7 risk areas). */
export const corporateRequirementOptions = [
  ...corporateProducts.map((p) => ({ value: p.slug, label: p.shortName })),
  { value: "surety-bonds", label: "Surety Bonds" },
  { value: "programme-review", label: "Review of existing programme" },
];
