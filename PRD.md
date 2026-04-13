# RentVsBuyNow — PRD
## Project 22: Rent vs Buy by City — Breakeven Analysis Dashboard

---

## Overview

RentVsBuyNow is an SEO-driven, data-rich tool that helps people decide whether renting or buying a home makes more financial sense in any U.S. city. It combines publicly available housing data (Census ACS, Zillow, FRED) with a user-facing interactive calculator to produce city-level breakeven analysis. Every city page is pre-built for organic search.

**Primary Value Proposition:** The definitive free tool to answer "Should I rent or buy in [City]?" — with real data, interactive calculators, and clear charts.

---

## Target Users

- Millennials and Gen Z evaluating first home purchase
- Renters in major metros comparing alternatives
- Real estate researchers and bloggers
- Relocating workers comparing multiple cities
- Financial planners seeking shareable analysis tools

---

## Core Features

1. **City Pages** — Pre-built SSG pages for 500+ U.S. cities with rent/buy analysis
2. **State Overview Pages** — Aggregated rent vs buy data by state
3. **Interactive Calculator** — Full rent vs buy NPV calculation with customizable inputs
4. **City Comparison Tool** — Side-by-side two-city comparison
5. **Historical Trend Charts** — Rent and home price history (FRED data)
6. **Breakeven Calculator** — "How many years until buying beats renting?"
7. **Affordability Score** — Composite score per city (income ratio, price-to-rent ratio)
8. **Search & Filter** — Find cities by state, population, affordability score

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG for city pages, fast static delivery |
| Styling | Tailwind CSS v3 | Mobile-first, utility-first |
| Charts | Chart.js + react-chartjs-2 | Free, interactive |
| Language | TypeScript | Type safety for complex financial math |
| Hosting | Vercel (free tier) | Free SSG hosting, CDN |
| i18n | next-i18next | 8-language support |
| State | React Context + useReducer | Calculator state management |
| Data processing | Node.js scripts (build time) | Process CSV → JSON at build |

---

## Data Sources (All Free / Public Domain)

| Source | Data | Access |
|---|---|---|
| Census ACS (American Community Survey) | Median gross rent by city | `https://api.census.gov/data/` (free, no key required) |
| Zillow Research Public CSVs | Median home values, rent index | `https://www.zillow.com/research/data/` (public CSV download) |
| FRED (Federal Reserve) | 30-year mortgage rate, HPI, CPI | `https://fred.stlouisfed.org/graph/fredgraph.csv?id=MORTGAGE30US` (free) |
| HUD Fair Market Rents | FMR by metro/county | `https://www.huduser.gov/portal/datasets/fmr.html` (public) |
| Census Place FIPS | City/state lookup + FIPS codes | Public domain GeoJSON |
| Static computed JSON | Breakeven years, price-to-rent ratios | Generated at build from above sources |

**Data refresh strategy:** All CSV/API data fetched at build time via `scripts/fetch-data.ts`. Rebuild triggered weekly via Vercel cron or manual deploy.

---

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://rent-vs-buy-now.vercel.app
GOOGLE_SHEETS_WEBHOOK_URL=your_apps_script_url
CENSUS_API_KEY=your_free_census_key
NEXT_PUBLIC_FRED_API_KEY=your_free_fred_key
```

---

## Financial Model (Calculator Logic)

### Inputs
- Current rent ($/month)
- Home purchase price ($)
- Down payment (%)
- Mortgage rate (%)
- Loan term (years)
- Property tax rate (%)
- HOA fees ($/month)
- Home insurance ($/month)
- Maintenance rate (% of home value/year)
- Expected home appreciation (%/year)
- Investment return rate (% — opportunity cost of down payment)
- Rent increase rate (%/year)
- Expected years in home

### Outputs
- Monthly ownership cost vs rent
- Breakeven year (buying becomes cheaper than renting NPV)
- Total cost comparison over N years
- Net wealth comparison (equity vs invested down payment)
- Decision recommendation with confidence level

### Formula highlights
```
Monthly PITI = mortgage_payment + property_tax/12 + insurance/12 + HOA
True ownership cost = PITI + maintenance - tax_deduction - equity_buildup_rate
Breakeven = year where cumulative_buy_cost < cumulative_rent_cost (NPV adjusted)
```

---

## Page Structure

### `/` — Home
- Hero: "Should you rent or buy?" + city search bar
- Top cities table: price-to-rent ratio, breakeven years, affordability score
- National overview stats: median rent, median home price, avg breakeven
- How the calculator works (FAQ accordion)
- CTA → `/calculator`
- Schema.org: `WebSite`, `FAQPage`, `Dataset`

### `/cities/[city-state]`
- City name: e.g., `/cities/austin-tx`
- H1: "Rent vs Buy in Austin, TX (2025)"
- Key stats: median rent, median home price, price-to-rent ratio, breakeven years
- Interactive calculator pre-filled with city data
- Historical chart: rent index + home price index (12mo, 5yr)
- Neighborhood breakdown (if data available)
- Related cities sidebar (same state, similar price range)
- Schema.org: `Place`, `FinancialService`, `Dataset`
- Static: SSG at build time, `revalidate: false`

### `/states/[state]`
- State-level aggregation: top/bottom 10 cities by affordability
- State median rent vs home price trend chart
- List of all cities in state (paginated, searchable)
- Schema.org: `Place`, `ItemList`

### `/calculator`
- Full interactive calculator (all inputs editable)
- Output: breakeven chart, cost comparison chart
- "Share results" button (URL params encode inputs)
- Pre-filled from URL params for shareable links
- Schema.org: `WebApplication`

### `/compare/[city-a]-vs-[city-b]`
- e.g., `/compare/austin-tx-vs-denver-co`
- Side-by-side data for both cities
- Combined chart with both city data series
- SEO title: "Austin TX vs Denver CO: Rent or Buy? (2025 Analysis)"
- Schema.org: `ItemList`, `Comparison`

### `/blog/[slug]` (SEO content)
- Static MDX articles targeting long-tail keywords
- Seed articles: "Best cities to buy vs rent in 2025", "Price-to-rent ratio explained", "When does buying make sense?"
- Schema.org: `Article`

### `/sitemap.xml`, `/robots.txt` — Auto-generated (next-sitemap)

---

## Data Pipeline (Build Scripts)

```
scripts/
├── fetch-census.ts         # Fetch ACS median rent data via Census API
├── fetch-zillow.ts         # Download and parse Zillow Research CSVs
├── fetch-fred.ts           # Download FRED mortgage rate + HPI series
├── compute-metrics.ts      # Calculate price-to-rent ratios, breakeven estimates
├── generate-city-json.ts   # Output per-city JSON files to data/cities/
└── build-all.ts            # Orchestrates all scripts in order
```

Run at build: `"prebuild": "ts-node scripts/build-all.ts"`

---

## UI/UX Design

### Color Palette (Soft Pastel)
```
Background:     #F5F0FF  (soft warm lavender)
Surface:        #FFFFFF  (cards)
Surface-alt:    #FFF8F0  (warm cream for callouts)
Primary:        #7C5CBF  (soft purple)
Accent-green:   #52B788  (buy = green)
Accent-orange:  #F4845F  (rent = warm orange)
Text-primary:   #1C1C2E
Text-muted:     #6B7280
Border:         #E5E7EB
Chart-buy:      #7C5CBF
Chart-rent:     #F4845F
```

### Layout
- Mobile-first, single-column on mobile, 2-3 columns on desktop
- Sticky header: logo | city search | nav | lang toggle
- City pages: hero stats cards at top, calculator midway, related cities at bottom
- Footer: visitor counter, disclaimer, links

### Key Components
- `CitySearch` — autocomplete search with city + state suggestions
- `StatCard` — metric display (rent, home price, ratio, breakeven)
- `BreakevenChart` — line chart showing cumulative cost over years
- `RentBuyCalculator` — tabbed form with live output
- `CityCompareTable` — side-by-side stats grid
- `AffordabilityBadge` — color-coded score badge (green/yellow/red)
- `TrendChart` — historical price/rent index line chart
- `AdSlot` — Adsterra placeholder

### Adsterra Ad Placeholders
```html
<!-- Social Bar (sticky bottom on mobile) -->
<div id="adsterra-social-bar" data-ad="social-bar" class="adsterra-social-bar"></div>

<!-- Native Banner (between city stats and calculator) -->
<div id="adsterra-native" data-ad="native-banner" class="my-8 adsterra-native"></div>

<!-- Display Banner (sidebar on desktop, below fold on mobile) -->
<div id="adsterra-banner" data-ad="display-banner" class="adsterra-banner"></div>
```

---

## i18n (Internationalization)

**Languages:** en (default), ko, ja, zh, es, fr, de, pt

**Implementation:**
- `next-i18next` with `next.config.js` i18n routing
- URL: `/` (en), `/ko/`, `/ja/`, `/zh/`, `/es/`, `/fr/`, `/de/`, `/pt/`
- City/state slugs remain in English (URL consistency for SEO)
- UI labels, calculator inputs/outputs, meta tags per locale
- `hreflang` alternate tags on all pages

**Translation namespace files:**
- `common.json` — nav, footer, general UI
- `calculator.json` — all calculator labels, tooltips, error messages
- `cities.json` — city page template strings, chart labels
- `seo.json` — meta title/description templates per page type

---

## Google Sheets Webhook

**Events logged:**
- City page view (city slug, state, referrer, lang)
- Calculator used (key inputs, breakeven result, city)
- Compare tool used (city pair)
- Search performed (query, result count)

```typescript
// lib/webhook.ts
export async function logEvent(event: {
  type: 'page_view' | 'calculator_used' | 'compare_used' | 'search';
  data: Record<string, unknown>;
}) {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...event, ts: new Date().toISOString(), project: 'rent-vs-buy-now' }),
    });
  } catch { /* non-blocking */ }
}
```

---

## Visitor Counter

```typescript
// app/api/visitors/route.ts  (Vercel KV)
import { kv } from '@vercel/kv';
export async function POST() {
  const today = new Date().toISOString().slice(0, 10);
  const [total, todayCount] = await Promise.all([
    kv.incr('visitors:total'),
    kv.incr(`visitors:${today}`),
  ]);
  return Response.json({ total, today: todayCount });
}
```

Footer: `Visitors today: 89  |  Total: 14,203` — small gray text, non-intrusive.

---

## SEO Requirements

- Dynamic `<title>`: "Rent vs Buy in [City], [State] — Is It Worth It in 2025?"
- Dynamic `<meta description>`: "Rent vs buy analysis for [City]. Median rent: $X, median home: $Y, breakeven in Z years. Use our free calculator."
- `next-sitemap` generating sitemap with all 500+ city pages, state pages
- `robots.txt`: allow all
- JSON-LD per page type (Place, FinancialService, FAQPage, WebApplication)
- Canonical URLs per locale
- `hreflang` x8 on every page
- OG images: dynamic via `@vercel/og` with city name, key stats
- Internal linking: city pages → state pages → compare pages → calculator

---

## Milestones & Git Commits

### Milestone 1 — Scaffold & Data Pipeline
- Init Next.js 14, Tailwind, TypeScript
- Write and run `scripts/build-all.ts` to fetch all data sources
- Generate initial city JSON for top 100 cities
- Create harness files: `init.sh`, `feature_list.json`, `claude-progress.txt`
- **Git:** `git commit -m "feat: scaffold, data pipeline, top 100 cities JSON"`
- **GitHub:** `gh repo create taeshin11/rent-vs-buy-now --public --source=. --push`

### Milestone 2 — Core Pages
- Home page with city search and top cities table
- `/cities/[city-state]` SSG with all data
- `/states/[state]` pages
- All schema.org, next-seo, Tailwind layout
- **Git:** `git commit -m "feat: home, city pages, state pages, schema"`
- **Push:** `git push`

### Milestone 3 — Calculator & Compare
- `/calculator` full interactive calculator
- `/compare/[a]-vs-[b]` comparison page
- Chart.js components: breakeven chart, trend chart
- URL param sharing for calculator
- **Git:** `git commit -m "feat: calculator, compare, charts"`
- **Push:** `git push`

### Milestone 4 — Expand Cities + Blog
- Generate JSON for all 500+ cities
- Add `/blog` with 5 seed MDX articles
- Internal linking between pages
- **Git:** `git commit -m "feat: all 500+ city pages, blog articles"`
- **Push:** `git push`

### Milestone 5 — i18n + SEO
- All 8 locale translation files
- `hreflang` tags, sitemap, robots.txt
- Dynamic OG images
- **Git:** `git commit -m "feat: i18n 8 langs, sitemap, OG images"`
- **Push:** `git push`

### Milestone 6 — Ads + Webhook + Counter
- Adsterra placeholders in layout
- Google Sheets webhook
- Visitor counter
- **Git:** `git commit -m "feat: ads, webhook, visitor counter"`
- **Push:** `git push`

### Milestone 7 — Deploy & QA
- `npx vercel --prod`
- Lighthouse audit
- Schema validation
- `research_history/milestone-7-deploy.md`
- **Git:** `git commit -m "chore: production deploy, QA"`
- **Push:** `git push`

---

## File Structure

```
rent-vs-buy-now/
├── PRD.md
├── init.sh
├── feature_list.json
├── claude-progress.txt
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── next-sitemap.config.js
├── .env.local
├── .env.example
├── research_history/
├── scripts/
│   ├── fetch-census.ts
│   ├── fetch-zillow.ts
│   ├── fetch-fred.ts
│   ├── compute-metrics.ts
│   ├── generate-city-json.ts
│   └── build-all.ts
├── data/
│   ├── cities/           # one JSON per city slug
│   ├── states/           # one JSON per state
│   └── national.json
├── content/
│   └── blog/             # MDX articles
├── public/
│   ├── locales/{en,ko,ja,zh,es,fr,de,pt}/
│   └── robots.txt
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── cities/[city-state]/page.tsx
    │   ├── states/[state]/page.tsx
    │   ├── calculator/page.tsx
    │   ├── compare/[pair]/page.tsx
    │   ├── blog/[slug]/page.tsx
    │   └── api/visitors/route.ts
    ├── components/
    │   ├── layout/ Navbar.tsx Footer.tsx AdSlot.tsx
    │   ├── calculator/ RentBuyCalculator.tsx BreakevenChart.tsx
    │   ├── city/ CitySearch.tsx StatCard.tsx TrendChart.tsx AffordabilityBadge.tsx
    │   └── compare/ CityCompareTable.tsx
    ├── lib/
    │   ├── calc.ts         # Financial math functions
    │   ├── webhook.ts
    │   ├── visitors.ts
    │   └── seo.ts
    └── types/index.ts
```

---

## Harness Spec

### `feature_list.json`
```json
{
  "project": "rent-vs-buy-now",
  "version": "1.0.0",
  "features": [
    { "id": "data-pipeline", "status": "pending", "milestone": 1 },
    { "id": "city-pages-ssg", "status": "pending", "milestone": 2 },
    { "id": "state-pages", "status": "pending", "milestone": 2 },
    { "id": "calculator", "status": "pending", "milestone": 3 },
    { "id": "compare-tool", "status": "pending", "milestone": 3 },
    { "id": "all-500-cities", "status": "pending", "milestone": 4 },
    { "id": "blog-articles", "status": "pending", "milestone": 4 },
    { "id": "i18n-8langs", "status": "pending", "milestone": 5 },
    { "id": "seo-sitemap", "status": "pending", "milestone": 5 },
    { "id": "ads-adsterra", "status": "pending", "milestone": 6 },
    { "id": "webhook-sheets", "status": "pending", "milestone": 6 },
    { "id": "visitor-counter", "status": "pending", "milestone": 6 },
    { "id": "vercel-deploy", "status": "pending", "milestone": 7 }
  ]
}
```

### `claude-progress.txt`
```
CURRENT_MILESTONE=1
LAST_COMMIT=none
LAST_PUSH=none
NEXT_ACTION=Run init.sh to scaffold project
BLOCKER=none
```

### `init.sh`
```bash
#!/usr/bin/env bash
set -e
echo "=== RentVsBuyNow Init ==="
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npm install next-i18next next-seo next-sitemap chart.js react-chartjs-2 @vercel/kv
npm install -D ts-node @types/node
mkdir -p data/cities data/states scripts content/blog research_history \
  public/locales/{en,ko,ja,zh,es,fr,de,pt} \
  src/components/{layout,calculator,city,compare} src/lib src/types
cp .env.example .env.local
echo "Init complete. Run: npm run build (triggers data pipeline)"
git add -A && git commit -m "feat: project scaffold and dependencies"
gh repo create taeshin11/rent-vs-buy-now --public --source=. --push
echo "GitHub repo created and pushed."
```
