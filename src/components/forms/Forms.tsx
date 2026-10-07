"use client";

import { corporateRequirementOptions, insuranceTypeOptions } from "@/content/products";
import {
  advisorInterestOptions,
  advisorLeadSchema,
  callbackLeadSchema,
  claimLeadSchema,
  claimTypeOptions,
  contactPreferenceOptions,
  contactTimeOptions,
  corporateLeadSchema,
  employeeCountOptions,
  experienceOptions,
  insuranceLeadSchema,
  quoteLeadSchema,
} from "@/lib/schemas";
import { Checkbox, ChoiceGroup, ConsentField, FormNote, FormRow, LeadForm, SelectField, TextArea, TextField } from "./FormKit";

/** General "Get Insurance Assistance" enquiry — designed to complete in under 2 minutes (Plan §2). */
export function InsuranceEnquiryForm({ defaultType = "" }: { defaultType?: string }) {
  const validDefault = insuranceTypeOptions.some((o) => o.value === defaultType) ? defaultType : "";
  return (
    <LeadForm
      type="insurance"
      schema={insuranceLeadSchema}
      submitLabel="Get Insurance Assistance"
      successTitle="Thank you — we've received your request."
      successText={<p>A Finmirai advisor will contact you using your preferred method. If your need is urgent, please call or WhatsApp us.</p>}
    >
      <FormRow>
        <TextField name="name" label="Your name" required autoComplete="name" maxLength={80} />
        <TextField name="phone" label="Mobile number" type="tel" required autoComplete="tel" inputMode="tel" placeholder="10-digit mobile" />
      </FormRow>
      <FormRow>
        <TextField name="email" label="Email" type="email" autoComplete="email" />
        <TextField name="city" label="City" required autoComplete="address-level2" maxLength={60} />
      </FormRow>
      <SelectField name="insuranceType" label="What do you need help with?" options={insuranceTypeOptions} required defaultValue={validDefault} />
      <ChoiceGroup name="contactPreference" legend="How should we contact you?" options={contactPreferenceOptions} columns={3} required defaultValue="call" />
      <TextArea name="message" label="Anything you'd like us to know?" rows={3} maxLength={1000} placeholder="For example: family members to cover, renewal date, existing policy…" />
      <ConsentField />
    </LeadForm>
  );
}

/** "Get a Quote" form — six fields + consent, gold Submit Enquiry button. */
export function QuoteForm({ defaultType = "" }: { defaultType?: string }) {
  const validDefault = insuranceTypeOptions.some((o) => o.value === defaultType) ? defaultType : "";
  return (
    <LeadForm
      type="quote"
      schema={quoteLeadSchema}
      compact
      prominentSubmit
      submitLabel="Submit Enquiry"
      successTitle="Thank you! Your enquiry has been submitted."
      successText={
        <>
          <p>A Finmirai advisor will review your details and contact you shortly to understand your needs and share suitable options and quotes.</p>
          <p className="mt-2">Need help sooner? Call or WhatsApp us using the buttons below.</p>
        </>
      }
    >
      <TextField name="fullName" label="Full Name" required autoComplete="name" maxLength={80} placeholder="e.g. Priya Raman" />
      <FormRow>
        <TextField name="phone" label="Mobile Number" type="tel" required autoComplete="tel" inputMode="tel" placeholder="10-digit mobile number" />
        <TextField name="email" label="Email Address" type="email" required autoComplete="email" inputMode="email" placeholder="you@example.com" />
      </FormRow>
      <FormRow>
        <SelectField name="insuranceType" label="Insurance Type" options={insuranceTypeOptions} required defaultValue={validDefault} placeholder="Choose insurance type" />
        <TextField name="city" label="City" required autoComplete="address-level2" maxLength={60} placeholder="e.g. Chennai" />
      </FormRow>
      <TextArea name="message" label="Message" rows={2} maxLength={500} placeholder="Briefly tell us what you need — e.g. family health cover for 4 members." />
      <ConsentField />
    </LeadForm>
  );
}

/** Corporate consultation form — fields exactly as Plan §7. */
export function CorporateEnquiryForm() {
  return (
    <LeadForm
      type="corporate"
      schema={corporateLeadSchema}
      arrayFields={["requirements"]}
      submitLabel="Request a Corporate Insurance Consultation"
      successTitle="Thank you — your consultation request is in."
      successText={<p>Our corporate team will review your requirement and contact you to schedule a discussion. Please keep existing policy schedules handy if you have them.</p>}
    >
      <FormRow>
        <TextField name="companyName" label="Company name" required autoComplete="organization" maxLength={120} />
        <TextField name="contactPerson" label="Contact person" required autoComplete="name" maxLength={80} />
      </FormRow>
      <FormRow>
        <TextField name="email" label="Business email" type="email" required autoComplete="email" />
        <TextField name="phone" label="Phone / WhatsApp" type="tel" required autoComplete="tel" inputMode="tel" />
      </FormRow>
      <FormRow>
        <TextField name="industry" label="Industry" required maxLength={80} placeholder="e.g. Manufacturing, IT services, Logistics" />
        <SelectField name="employeeCount" label="Number of employees" options={employeeCountOptions} required />
      </FormRow>
      <FormRow>
        <TextField name="location" label="Location" required maxLength={80} placeholder="City / State" />
        <TextField name="renewalDate" label="Existing policy renewal date" type="date" hint="If you already have cover in place." />
      </FormRow>
      <ChoiceGroup name="requirements" legend="Insurance requirement" options={corporateRequirementOptions} multiple required columns={3} />
      <TextArea name="message" label="Message" rows={4} maxLength={1500} placeholder="Tell us about your business, current covers or concerns." />
      <ConsentField />
    </LeadForm>
  );
}

/** Claims support request — a service request, not a sales lead (Plan §8, §12). */
export function ClaimSupportForm() {
  return (
    <LeadForm
      type="claim"
      schema={claimLeadSchema}
      submitLabel="Request Claims Support"
      successTitle="We've logged your claim support request."
      successText={
        <>
          <p>A member of our team will contact you to understand what happened and guide you on the next steps and documents.</p>
          <p className="mt-2">
            Please also inform your insurer as required by your policy — many policies have time limits for claim intimation. Claim assessment and
            settlement remain with the insurer, under the policy terms.
          </p>
        </>
      }
    >
      <FormRow>
        <TextField name="name" label="Your name" required autoComplete="name" maxLength={80} />
        <TextField name="phone" label="Mobile number" type="tel" required autoComplete="tel" inputMode="tel" />
      </FormRow>
      <FormRow>
        <TextField name="email" label="Email" type="email" autoComplete="email" />
        <SelectField name="claimType" label="Claim type" options={claimTypeOptions} required />
      </FormRow>
      <FormRow>
        <TextField name="policyNumber" label="Policy number" required maxLength={60} />
        <TextField name="insurer" label="Insurance company" required maxLength={80} />
      </FormRow>
      <TextField name="incidentDate" label="Date of incident" type="date" required className="sm:w-1/2 sm:pr-2.5" />
      <TextArea name="description" label="Briefly, what happened?" required rows={4} maxLength={2000} hint="At least 20 characters. Please don't include medical reports or ID numbers here." />
      <ChoiceGroup name="contactPreference" legend="Preferred contact method" options={contactPreferenceOptions} columns={3} required defaultValue="call" />
      <FormNote>
        Please don't upload or email sensitive documents yet. Once we speak, we'll tell you exactly what is needed and how to share it securely.
      </FormNote>
      <ConsentField />
    </LeadForm>
  );
}

/** Advisor / POSP application — Plan §9 fields. No income promises anywhere in this flow. */
export function AdvisorApplicationForm() {
  return (
    <LeadForm
      type="advisor"
      schema={advisorLeadSchema}
      arrayFields={["interests"]}
      submitLabel="Submit Application"
      successTitle="Thank you for your interest in Finmirai."
      successText={<p>Our team will review your application and contact you at your preferred time to explain the next steps, including verification and any required training.</p>}
    >
      <FormRow>
        <TextField name="fullName" label="Full name" required autoComplete="name" maxLength={80} />
        <TextField name="phone" label="Mobile / WhatsApp" type="tel" required autoComplete="tel" inputMode="tel" />
      </FormRow>
      <FormRow>
        <TextField name="email" label="Email" type="email" required autoComplete="email" />
        <TextField name="city" label="City" required autoComplete="address-level2" maxLength={60} />
      </FormRow>
      <FormRow>
        <TextField name="occupation" label="Current occupation" required maxLength={80} />
        <SelectField name="experience" label="Experience in insurance / sales" options={experienceOptions} required />
      </FormRow>
      <ChoiceGroup name="interests" legend="Interested insurance categories" options={advisorInterestOptions} multiple required columns={3} />
      <SelectField name="contactTime" label="Preferred contact time" options={contactTimeOptions} required className="sm:w-1/2 sm:pr-2.5" />
      <ConsentField />
      <Checkbox name="declaration">
        I confirm the information above is accurate. I understand that becoming a Finmirai advisor is subject to verification, eligibility and any
        training or examination required under applicable regulations, and that no income is guaranteed.
        <span className="text-red-600" aria-hidden> *</span>
      </Checkbox>
    </LeadForm>
  );
}

/** Short callback request for the homepage/contact page. */
export function CallbackForm() {
  return (
    <LeadForm
      type="callback"
      schema={callbackLeadSchema}
      compact
      submitLabel="Request a Callback"
      successTitle="Callback requested."
      successText={<p>We'll call you during your preferred time.</p>}
    >
      <TextField name="name" label="Your name" required autoComplete="name" maxLength={80} />
      <TextField name="phone" label="Mobile number" type="tel" required autoComplete="tel" inputMode="tel" />
      <TextField name="topic" label="Topic" maxLength={80} placeholder="e.g. Health insurance renewal" />
      <SelectField name="contactTime" label="Best time to call" options={contactTimeOptions} required />
      <ConsentField />
    </LeadForm>
  );
}
