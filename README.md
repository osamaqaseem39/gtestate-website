# GT Estate Website

Public marketing site for **GT Estates** ([gtestates.com.pk](https://gtestates.com.pk)): brand pages, projects, gallery, contact inquiries, and career applications. Backed by the Express API in `../server` (or a deployed API URL).

## Scope (accurate)

**Implemented**

- Next.js App Router marketing pages
- Properties/projects and gallery data loaded from the API
- Inquiry submission and careers CV application
- Responsive layouts; desktop (≥1024px) GSAP + Lenis hero path
- Framer Motion, Swiper, Lucide icons, Tailwind CSS

**Not implemented — do not advertise**

The previous version of this README claimed AI-powered property matching, virtual reality tours, smart-home IoT integration, and blockchain security. **Those features are not in this codebase** and must not be listed as product capabilities.

Also out of scope for this package: user login, booking, payments, MLS.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js `^16.1` (App Router), React 18 |
| Styling | Tailwind CSS |
| Motion | Framer Motion, GSAP, Lenis |
| Carousels / icons | Swiper, Lucide React |
| Mail helper | nodemailer (optional; see `.env.example`) |
| Language | TypeScript |

## Getting started

**Prerequisites:** Node.js 18+, npm.

```bash
cd website
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Role |
|----------|------|
| `NEXT_PUBLIC_API_URL` | API origin (example default: `https://estate-server-nine.vercel.app`) |
| `NEXT_PUBLIC_MEDIA_URL` | Media host (default used in code: `https://gt.osamaqaseem.online`) |
| `NEXT_PUBLIC_APP_URL` | Public site URL |
| `SMTP_*` / `INQUIRY_NOTIFY_EMAIL` | Optional site-side email |

Ensure the API CORS configuration allows this site’s origin (`gtestates.com.pk` is handled in the server by default).

## Routes (`app/`)

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/what-we-do` | What we do |
| `/projects` | Projects |
| `/gallery` | Gallery |
| `/team` | Team |
| `/contact` | Contact |
| `/careers` | Careers |
| `/hero-alt` | Alternate hero |

Legacy files under `src/app/` (including `/properties`) are not the primary App Router tree. Some CTAs may still point at `/properties` even though `app/properties` is absent.

## Project layout

```
website/
├── app/                 # Active App Router pages
├── components/          # UI (hero, nav, sections, …)
├── lib/                 # api-public, submit-inquiry, mail, …
├── src/app/             # Legacy / duplicate pages
├── public/
├── next.config.js
└── package.json
```

## Related packages

| Path | Role |
|------|------|
| `../server` | `gt-estate-api` — properties, gallery, inquiries, careers, auth |
| `../dashboard` | Staff CMS (port 3001) |
| `../docs` | Full workspace documentation |

## License / support

Contact: info@gtestates.com.pk
