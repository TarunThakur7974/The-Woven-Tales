# The Woven Tales — Admin Panel

A complete Next.js 14 admin dashboard for The Woven Tales (India).

---

## Features

- **Dashboard** — Live metrics, recent activity, city bar charts, monthly book chart
- **User Registrations** — Full table with search, filter by city/status, add user, view user, toggle status, delete
- **Book Management** — All books with search/filter, delete, preview
- **Create Book** — Admin can create personalised storybooks for any user with full customisation
- **Avatars & Themes** — Browse all character avatars (boys/girls) and story themes
- **Analytics** — Revenue, monthly chart, theme breakdown, city stats, user status
- **Settings** — Platform config, feature toggles, danger zone (export/backup/cache)

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icons)
- **React Context** (global state — no backend needed for demo)

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it auto-redirects to `/dashboard`.

### 3. Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Sidebar + Topbar
│   ├── page.tsx            # Redirects to /dashboard
│   ├── globals.css
│   ├── dashboard/page.tsx  # Dashboard with metrics + charts
│   ├── users/page.tsx      # User registrations CRUD
│   ├── books/
│   │   ├── page.tsx        # All books management
│   │   └── create/page.tsx # Create book for any user
│   ├── avatars/page.tsx    # Avatar & theme library
│   ├── analytics/page.tsx  # Analytics & charts
│   └── settings/page.tsx   # Platform settings
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── Topbar.tsx      # Top header bar
│   └── ui/
│       ├── index.tsx       # All UI components (Button, Card, Modal, etc.)
│       └── Toast.tsx       # Toast notification
├── lib/
│   ├── data.ts             # Mock data generators & constants
│   └── store.tsx           # Global React Context store
└── types/
    └── index.ts            # TypeScript types
```

---

## Connecting a Real Backend

The app currently uses in-memory React state (resets on page refresh). To connect a real database:

### Option A — Supabase (Recommended for quick setup)

```bash
npm install @supabase/supabase-js
```

1. Create a project at [supabase.com](https://supabase.com)
2. Create tables: `users`, `books`
3. Replace the functions in `src/lib/store.tsx` with Supabase queries:

```ts
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// Fetch users
const { data } = await supabase.from("users").select("*");
```

### Option B — Next.js API Routes

Create `src/app/api/users/route.ts`:

```ts
import { NextResponse } from "next/server";

export async function GET() {
  // fetch from your DB
  return NextResponse.json({ users: [] });
}

export async function POST(req: Request) {
  const body = await req.json();
  // insert into DB
  return NextResponse.json({ success: true });
}
```

### Option C — Prisma + PostgreSQL

```bash
npm install prisma @prisma/client
npx prisma init
```

---

## Environment Variables

Create `.env.local` for production:

```env
# If using Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# If using a custom backend
NEXT_PUBLIC_API_URL=https://your-api.com
```

---

## Deployment

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Demo Data

All demo data is Indian — cities (Mumbai, Delhi, Bengaluru, etc.), names, states, and languages. The platform is locked to the India region.

---

## License

Built for The Woven Tales. All rights reserved.
