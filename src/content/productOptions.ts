/**
 * Lean option lists for the enquiry forms. The forms are client components, so importing these from
 * products.ts would ship every product page's copy to the browser (~60 KB of JS on every page with a form).
 * products.ts checks these against the real product list at build time, so they can't silently drift.
 */

/** Options for the "type of insurance" select in enquiry forms. */
export const insuranceTypeOptions = [
  { value: "health-insurance", label: "Health Insurance" },
  { value: "life-insurance", label: "Life & Term Insurance" },
  { value: "motor-insurance", label: "Motor Insurance" },
  { value: "travel-insurance", label: "Travel Insurance" },
  { value: "home-insurance", label: "Home Insurance" },
  { value: "personal-accident-insurance", label: "Personal Accident Insurance" },
  { value: "corporate", label: "Business / Corporate Insurance" },
  { value: "review", label: "Review of my existing policies" },
  { value: "other", label: "Something else / not sure" },
];

/** Requirement checkboxes on the corporate form (Plan §7 risk areas). */
export const corporateRequirementOptions = [
  { value: "property-fire-insurance", label: "Property & Fire" },
  { value: "marine-insurance", label: "Marine" },
  { value: "liability-insurance", label: "Liability" },
  { value: "employee-benefits", label: "Employee Benefits" },
  { value: "engineering-insurance", label: "Engineering" },
  { value: "cyber-insurance", label: "Cyber" },
  { value: "surety-bonds", label: "Surety Bonds" },
  { value: "programme-review", label: "Review of existing programme" },
];
