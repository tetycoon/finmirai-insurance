# Finmirai Insurance Brokers — Website

Phase-1 website for **Finmirai Insurance Brokers Private Limited**, built from the *Finmirai Complete Website & Software Project Plan* (Oct 2026).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Zod

> Before launch, work through **[LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md)**. Unconfirmed business and regulatory details appear on the site as dashed gold `[… — to be confirmed]` placeholders.

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run typecheck
```

Requires Node.js 18.18+ (20 LTS recommended).

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage — the 9-section blueprint from Plan §5 |
| `/about-us`, `/about-us/leadership` | Company approach, values, Principal Officer |
| `/insurance-solutions` + 6 product pages | Health, Life/Term, Motor, Travel, Home, Personal Accident |
| `/corporate-insurance` + 6 product pages | Property/Fire, Marine, Liability, Employee Benefits, Engineering, Cyber — plus risk map and consultation form |
| `/claims-support` | Claims journey, document checklists, claim-support form |
| `/become-an-advisor`, `/become-an-advisor/training` | Advisor/POSP funnel and application form |
| `/knowledge-centre` + 7 guides | Category-filtered guides, FAQs |
| `/get-insurance-assistance` | General enquiry form (`?type=<product-slug>` preselects the product) |
| `/contact-us` | Contact details, map, enquiry form |
| `/legal/*` | Privacy, Terms, Disclosures, Grievance, Image credits (drafts) |

## Project structure

```
src/
  app/                 Routes (one folder per URL), sitemap.ts, robots.ts, api/leads
  components/
    layout/            Header (dropdown + mobile menu), Footer, MobileActionBar, Logo
    product/           ProductPageTemplate — the single template for all 12 product pages
    forms/             FormKit (form engine + fields) and the 5 lead forms
    ui/                Buttons, sections, hero, FAQ, breadcrumbs, cards, placeholders…
    seo/               JSON-LD helper
  content/             ALL copy and business data — edit here, not in components
    site.ts            Contact details, leadership, regulatory fields
    products.ts        Product page content (Plan §6 blocks)
    articles.ts        Knowledge Centre guides
    legal.ts           Legal page drafts
    navigation.ts      Menus and footer links
    images.ts          Photo registry
  lib/
    schemas.ts         Zod validation shared by browser and server
    seo.ts, structuredData.ts, analytics.ts
    server/            leadStore.ts (persistence + webhook), rateLimit.ts
public/images/         Photography (+ CREDITS.json)
```

### Editing content

- **Add or remove a product:** edit the `products` array in `src/content/products.ts`. Navigation, footer, hub pages, sitemap, form options and related links all derive from it.
- **Add a guide:** append to `articles` in `src/content/articles.ts`.
- **Change contact details:** `src/content/site.ts` only.

A headless CMS (or WordPress) can replace the `content/` modules later without touching components (Plan §14).

## Leads (Plan §12)

All five forms post to `POST /api/leads`:

| Form | `type` | Reference | Category / priority |
|---|---|---|---|
| Insurance assistance | `insurance` | `FMR-INS-…` | sales / normal |
| Corporate consultation | `corporate` | `FMR-CORP-…` | sales / **high** |
| Claims support | `claim` | `FMR-CLM-…` | **service** / high |
| Advisor application | `advisor` | `FMR-ADV-…` | recruitment |
| Callback | `callback` | `FMR-CB-…` | callback |

The API:
- validates on the server with the **same Zod schemas** the browser uses (`src/lib/schemas.ts`)
- normalises Indian mobile numbers to `+91XXXXXXXXXX`
- records consent with a timestamp and wording version
- rejects cross-origin posts and oversized bodies, rate-limits by IP, and silently drops honeypot submissions
- stores a hashed IP, not the raw address
- returns `503` with a "please call/WhatsApp us" message if the lead could not be recorded anywhere, so no enquiry is silently lost

**Storage.** The default `JsonlFileRepository` appends to `./.data/leads.jsonl`. This works on a single VPS or Node host but **not on serverless platforms** such as Vercel, where the filesystem is ephemeral. For production:
1. implement `LeadRepository` against PostgreSQL (Plan §14) in `src/lib/server/leadStore.ts`, and/or
2. set `LEAD_WEBHOOK_URL` to forward every lead (JSON, HMAC-signed with `LEAD_WEBHOOK_SECRET`) to a CRM, Google Sheet, Zapier/Make, or an email relay.

**Not yet built:** the staff admin panel from Plan §12 (login, assignment, statuses, notes, CSV export, dashboard). The lead record already includes `status`, `assignedTo`, `priority` and `category` fields so the admin can be added without changing the forms.

**Document uploads** are deliberately not collected (Plan §12: no sensitive documents via insecure forms). The claims form tells users we will share a secure method.

## SEO (Plan §13)

- One H1 per page, unique title and meta description, canonical URL, Open Graph/Twitter tags
- Readable URLs, breadcrumbs (with `BreadcrumbList` schema), internal links between related products and guides
- JSON-LD: `InsuranceAgency` organisation, `Service` per product, `FAQPage`, `Article`, `Person`
- `sitemap.xml` and `robots.txt` generated. Robots **blocks indexing unless running in production**, so staging stays out of search results.
- Images served via `next/image` (AVIF/WebP, responsive sizes, lazy loading) with descriptive alt text

## Analytics

`src/lib/analytics.ts` records `lead_submit`, `call_click`, `whatsapp_click` and `email_click` events into `dataLayer`/`gtag`. GA4 loads only when `NEXT_PUBLIC_GA_ID` is set. Update the privacy policy and consent approach before enabling it.

## Accessibility & UX

- Skip link, visible focus rings, keyboard-operable menus (Escape closes them), `aria-expanded`/`aria-current`
- Labelled fields, `aria-invalid` + `aria-describedby` errors, focus moves to the first invalid field
- `<details>`-based FAQ that works without JavaScript; respects `prefers-reduced-motion`
- Mobile: sticky Call / WhatsApp / Claims / Get Help bar; full-screen menu below 1280px

## Security (Plan §15)

Security headers (HSTS, nosniff, frame options, referrer and permissions policy) are set in `next.config.mjs`. No secrets are shipped to the browser, and server-only modules import `server-only`. The in-memory rate limiter is per-instance: use a shared store and add CAPTCHA if you scale horizontally.

## Images

Photos are free-licence Unsplash images, chosen for Indian context and stored locally in `public/images`. Credits are in `public/images/CREDITS.json` and on `/legal/image-credits`. The Principal Officer's portrait is a labelled placeholder: **never substitute a stock photo for a real person.**
