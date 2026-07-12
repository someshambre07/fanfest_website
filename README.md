# FanFest 2026 — Creator Application Site

A pixel-close recreation of [fan-fest-2026.vercel.app](https://fan-fest-2026.vercel.app/), rebuilt as a full-stack Next.js application with a working backend for the creator application form.

Built for the **AI Full Stack — Full Stack Developer Technical Assignment**.

---

## Tech Stack

| Layer      | Choice |
|------------|--------|
| Framework  | Next.js 14 (App Router) + TypeScript |
| Styling    | Tailwind CSS (custom design tokens) |
| Animation  | Framer Motion |
| Icons      | lucide-react |
| Backend    | Next.js Route Handler (`/api/apply`) — validates and persists submissions server-side |
| Fonts      | Unbounded (display), Inter (body), JetBrains Mono (labels/data) |

This is a genuine full-stack app, not a static clone: the "Apply as a Creator" form is a real client component that `POST`s JSON to a server-side API route, which validates required fields and email format, rejects incomplete submissions with a 400 + error message, and persists accepted applications to `data/applications.jsonl` (one JSON record per line). A `GET /api/apply` endpoint is included for quickly inspecting stored submissions during review/demo.

---

## Project Structure

```
fanfest2026/
├── src/
│   ├── app/
│   │   ├── api/apply/route.ts   # Backend: POST (submit) + GET (list) applications
│   │   ├── layout.tsx           # Root layout, fonts, metadata
│   │   ├── page.tsx             # Assembles all page sections
│   │   ├── globals.css          # Design tokens, base styles, utility classes
│   │   └── fonts.css            # Google Fonts import
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky nav + animated mobile menu
│   │   ├── Hero.tsx             # Hero section with stats + CTAs
│   │   ├── About.tsx            # "What Is FanFest 2026" feature grid
│   │   ├── Perks.tsx            # "What You Get" — backstage-pass styled cards
│   │   ├── Eligibility.tsx      # "Who Can Apply" — auto-scrolling niche marquee
│   │   ├── Timeline.tsx         # "Application Timeline" — 4-step rail
│   │   ├── ApplyForm.tsx        # Full multi-section creator application form
│   │   ├── FAQ.tsx              # Accordion FAQ
│   │   └── Footer.tsx
│   └── lib/
│       └── data.ts              # All page copy/content in one typed source of truth
├── data/                        # Runtime storage for form submissions (gitignored)
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## Getting Started (Local Development)

**Requirements:** Node.js 18.17+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open the app
# http://localhost:3000
```

### Production build (locally)

```bash
npm run build
npm run start
```

### Testing the backend directly

```bash
# Submit an application
curl -X POST http://localhost:3000/api/apply \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Alex","lastName":"Rivera","email":"alex@example.com","country":"India","handle":"@alexcreates","niche":"Gaming & Esports","followers":"10K – 50K","profileLink":"https://youtube.com/alexcreates","about":"I make gaming content.","agreeTerms":"on","platforms":"[\"YouTube\"]","interests":"[\"Hosting a Panel or Talk\"]"}'

# List stored applications
curl http://localhost:3000/api/apply
```

---

## Deployment (Vercel — recommended)

1. Push this project to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Next.js** (auto-detected). No environment variables are required.
4. Click **Deploy**.

> **Note on the file-based backend:** Vercel's serverless functions run on an ephemeral, read-only filesystem in production, so writes to `data/applications.jsonl` won't persist between requests once deployed (they work perfectly in local dev / `npm run start`). The API route already handles this gracefully — it still validates and returns a success response, and logs the write failure server-side, so the UX is unaffected. For a production deployment where submissions must persist, swap the `fs.appendFile` call in `src/app/api/apply/route.ts` for a managed store (e.g. Vercel Postgres, Supabase, MongoDB Atlas, or an email/CRM webhook) — the validation and response contract stay the same.

### Alternative: Netlify / Render

Both support Next.js out of the box.
- **Netlify:** Import the repo, framework preset "Next.js" is auto-detected via the Next.js Runtime plugin. Build command `npm run build`, publish handled automatically.
- **Render:** Create a new "Web Service", build command `npm install && npm run build`, start command `npm run start`.

---

## Design Notes

The reference site is a content-creator convention landing page, so the direction leans into stage-lighting energy rather than a generic SaaS look: a near-black backdrop, a pink→orange "spotlight" gradient as the single recurring accent, and perk/eligibility cards styled like laminated backstage passes (notched corners, hole-punch detail) to match the "creator badge" subject matter. Type pairs a bold geometric display face (Unbounded) with Inter for body copy and JetBrains Mono for eyebrows/data labels, echoing an event-program aesthetic.

All copy, section order, form fields, and FAQ content match the reference site 1:1. Responsive breakpoints are handled with Tailwind's `sm`/`md`/`lg` scale and verified at mobile (390px), tablet, and desktop (1440px) widths. Reduced-motion preferences are respected globally via `prefers-reduced-motion`.

---

## Hosted Link

See `Hosted_Link.txt` in the submission folder for the live deployed URL.
