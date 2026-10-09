# Finmirai Website — Pre-Launch Checklist

Items the client must supply or approve before go-live (Project Plan §2, §15, §19).
Every unconfirmed value renders on the site as a dashed gold **[… — to be confirmed]** placeholder
(`<Pending>` component). Search the code for `<Pending` and `null` values in `src/content/site.ts`
to find them all.

## 1. Business & regulatory details — `src/content/site.ts`

| Item | Where it shows | Status |
|---|---|---|
| Broker registration number (`1173`) | Footer, every product disclaimer, About, Disclosures | Done |
| Registration category, validity | Every product disclaimer, About, Disclosures | **Required** |
| CIN (`U66220TN2025PTC179669`) | Footer, About, Disclosures | Done |
| Grievance officer name / email / phone | Grievance page, Privacy Policy | **Required** |
| Office hours | Contact page | Required |
| Phone `+91 98411 87087` — confirm it is the official public number | Everywhere | Verify |
| WhatsApp — currently **assumed** to be the same number (`919841187087`) | All WhatsApp buttons | **Confirm** |
| Email `sujathiaf@gmail.com` — confirm, or replace with an official domain address | Header, footer, contact | Verify |
| Office address (Teynampet, Chennai 600018) | Footer, contact, schema | Verify |

> Note: `8122233887` (Ayaan Enterprises) is the **project coordination** contact from the brief and is intentionally *not* used on the public site.

## 2. Leadership — `site.leadership`

- [x] Professional photograph of Flt. Lt. Sujatha G (`/images/leadership-sujatha-g.jpg`)
- [x] Biography, background and expertise (`site.leadership.bio` / `background` / `expertise`)
  (professional background, technical/engineering, leadership, insurance experience, areas of expertise).
  **Do not publish Air Force, engineering, MBA, consulting or years-of-experience claims until approved.**

## 3. Product offering — `src/content/products.ts`

Products flagged `confirmOffering: true` must be confirmed as actually offered:
- [ ] Life & Term Insurance (not on the business card)
- [ ] Personal Accident Insurance (not on the business card)
- [ ] Cyber Insurance (Plan: "if actually offered")

If a line isn't offered, remove it from the `products` array — navigation, footer, sitemap, forms and
related links all update automatically.

- [ ] Compliance review of all product copy, FAQs and product-specific disclaimers.

## 4. Legal pages — `src/content/legal.ts`

All four are **drafts**. Each shows a "Draft for review" banner (remove it in `src/app/legal/[slug]/page.tsx` after approval).
- [ ] Privacy Policy (retention, security, cookies, effective date, DPO/grievance contact)
- [ ] Terms of Use (limitation of liability, governing law/jurisdiction, effective date)
- [ ] Regulatory Disclosures (registration, remuneration disclosure, insurer list if displayed)
- [ ] Grievance Redressal (timelines, verified escalation links)
- [ ] Consent wording on forms (`ConsentField` in `src/components/forms/FormKit.tsx`; bump `CONSENT_VERSION` in `src/lib/schemas.ts` when it changes)
- [ ] Standard disclaimer wording (`src/components/ui/Disclaimer.tsx`, footer)

## 5. Advisor / POSP programme

- [ ] Detailed eligibility criteria (`/become-an-advisor`)
- [ ] Training format and schedule (`/become-an-advisor/training`)
- [ ] Onboarding fee answer in advisor FAQ, if any

## 6. Knowledge Centre

- [ ] Name a qualified reviewer for each guide (`reviewedBy` in `src/content/articles.ts`)

## 7. Brand assets

- [x] Official logo supplied — `public/logo.png` (site logo) and `src/app/icon.png` (browser tab icon)
- [ ] Optional: a higher-resolution or SVG version of the logo (the supplied PNG is 213×222px), plus a transparent-background version for dark surfaces
- [ ] Brand colour/font approval (current system follows the card: deep navy + gold)
- [ ] Real Finmirai photography where possible (swap files in `src/content/images.ts`)
- [ ] Written permission for any insurer logos or testimonials before adding them

## 8. Technical go-live

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain
- [ ] Choose lead storage for production (see README → Leads). The default file store **does not persist on serverless hosting**.
- [ ] Set `LEAD_WEBHOOK_URL` so the team is notified of every lead, and test with each form
- [ ] Analytics: create GA4 property, set `NEXT_PUBLIC_GA_ID`, update the privacy policy/cookie notice first
- [ ] Google Search Console: verify domain, submit `/sitemap.xml`
- [ ] Shared rate limiting + CAPTCHA if hosting on multiple instances/serverless
- [ ] Backups for the lead database and a tested restore
- [ ] QA pass per Plan §17 on real iPhone/Android devices
