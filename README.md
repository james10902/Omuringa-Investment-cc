# Omuringa Investment CC — Website & Portal

**Professional Security and Business Solutions in Namibia**

A complete Next.js 14 corporate website and trainee registration portal for **Omuringa Investment CC** and **Omuringa Security Training Academy**.

---

## 🏢 Business Details

| Field | Value |
|-------|-------|
| Business Name | Omuringa Investment CC |
| Training Division | Omuringa Security Training Academy |
| Director | Mr Uepesuvera Tjiharuka |
| Phone / WhatsApp | +264 81 728 6079 |
| Email | uepesuverat@gmail.com |
| Location | Tseigratse, Keetmanshoop, Namibia |
| Training Location | Keetmanshoop, Namibia |

---

## ✅ What's Built

### Public Website (7 pages)
| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, services, academy intro, testimonials, contact |
| About Us | `/about` | Mission, vision, values, director |
| Services | `/services` | Security + business support services |
| Training Academy | `/academy` | 3-week programme, requirements, enquiry form |
| Request a Quote | `/pricing` | Custom quote request form |
| Partnerships | `/partnerships` | Partnership proposal + enquiry form |
| Contact | `/contact` | Contact form, WhatsApp, location |

### User Portal
| Feature | URL |
|---------|-----|
| Register | `/register` |
| Login | `/login` |
| Forgot Password | `/forgot-password` |
| Reset Password | `/reset-password` |
| Dashboard | `/dashboard` |
| Training Application | `/dashboard/application` |
| Document Uploads | `/dashboard/documents` |
| Profile Management | `/dashboard/profile` |
| Notifications | `/dashboard/notifications` |

### Admin Dashboard
| Feature | URL |
|---------|-----|
| Overview | `/admin` |
| Applications | `/admin/applications` |
| Application Review | `/admin/applications/[id]` |
| Users | `/admin/users` |
| Form Submissions | `/admin/submissions` |
| Settings | `/admin/settings` |

### API Routes
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — Login + session creation
- `POST /api/auth/logout` — Logout + session deletion
- `POST /api/auth/forgot-password` — Password reset email
- `POST /api/auth/reset-password` — Apply new password
- `GET/POST /api/application` — Trainee application CRUD
- `GET/POST /api/documents` — Document upload/list
- `DELETE /api/documents/[id]` — Delete document
- `GET/PUT /api/users/profile` — Profile management
- `PUT /api/users/password` — Password change
- `POST /api/contact` — All public forms (contact, quote, partnership, training enquiry)
- `GET /api/admin/applications` — Admin: list applications
- `GET/PUT /api/admin/applications/[id]` — Admin: review + update status

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Edit `.env.local` with your values:

```env
# PostgreSQL database URL
DATABASE_URL="postgresql://user:password@host:5432/omuringa_db"

# App URL (change for production)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Session secret — must be 32+ random characters
NEXTAUTH_SECRET="generate-a-strong-random-string-here"

# Gmail SMTP (use App Password if 2FA is enabled)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="uepesuverat@gmail.com"
EMAIL_SERVER_PASSWORD="your-gmail-app-password"
EMAIL_FROM="Omuringa Investment CC <uepesuverat@gmail.com>"
```

### 3. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Create initial admin accounts
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Default Admin Credentials

After running `npm run db:seed`:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@omuringa.com | Admin@2025! |
| Application Admin | applications@omuringa.com | AppAdmin@2025! |

> ⚠️ **Change these passwords immediately after first login via `/dashboard/profile`**

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🌐 Deployment

### Vercel (Recommended — Free tier available)

1. Push code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add all environment variables from `.env.local`
4. Set `NEXT_PUBLIC_APP_URL` to your live domain
5. Deploy — Vercel handles SSL, CDN, and scaling automatically

### Hostinger / VPS

```bash
# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "omuringa" -- start
pm2 save
pm2 startup
```

Configure Nginx as reverse proxy on port 3000, then add SSL via Let's Encrypt:
```bash
sudo certbot --nginx -d yourdomain.com
```

### Database Options (Free tiers available)
- **Supabase** — [supabase.com](https://supabase.com) — PostgreSQL, free tier
- **Neon** — [neon.tech](https://neon.tech) — Serverless PostgreSQL, free tier
- **Railway** — [railway.app](https://railway.app) — PostgreSQL + hosting

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/           # Public website — no auth required
│   │   ├── page.tsx        # Home page
│   │   ├── about/
│   │   ├── services/
│   │   ├── academy/        # Training Academy + enquiry form
│   │   ├── pricing/        # Quote request form
│   │   ├── partnerships/
│   │   ├── contact/
│   │   ├── privacy/
│   │   └── terms/
│   ├── (auth)/             # Login, Register, Password reset
│   ├── dashboard/          # Trainee portal (requires login)
│   │   ├── application/    # Training application form
│   │   ├── documents/      # Document uploads
│   │   ├── profile/        # Profile + password management
│   │   └── notifications/
│   ├── admin/              # Admin dashboard (requires admin role)
│   │   ├── applications/   # Review trainee applications
│   │   ├── users/          # Registered users
│   │   ├── submissions/    # Form submissions inbox
│   │   └── settings/
│   ├── api/                # API routes
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Search engine rules
│   ├── not-found.tsx       # 404 page
│   └── error.tsx           # Error boundary
├── components/
│   ├── layout/             # Navbar, Footer, WhatsApp button
│   ├── home/               # Homepage sections + forms
│   ├── dashboard/          # Dashboard sidebar, header, mobile nav
│   ├── admin/              # Admin sidebar, header, mobile nav
│   └── ui/                 # Toast notifications
├── lib/
│   ├── auth.ts             # Session management (bcrypt + cookies)
│   ├── email.ts            # Nodemailer email sending
│   ├── prisma.ts           # Database client
│   ├── utils.ts            # Utilities + COMPANY constants
│   └── validations.ts      # Zod form schemas
└── types/
    └── index.ts            # TypeScript types
```

---

## 🔧 Admin User Guide

### Reviewing Applications
1. Log in at `/login` with admin credentials
2. Go to **Admin → Applications**
3. Filter by status: Submitted, Under Review, Approved, Rejected
4. Click **Review** on any application
5. View personal details, education, motivation, and uploaded documents
6. Update status and add notes — applicant is notified by email automatically

### Viewing Form Submissions
1. Go to **Admin → Form Submissions**
2. Filter by type: Contact, Quote Request, Partnership, Training Enquiry
3. Reply directly via the email address shown

### Managing Users
1. Go to **Admin → Users**
2. View all registered trainees, their application status, and document count

---

## 📧 Email Setup (Gmail)

1. Enable 2-Step Verification on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Generate a password for "Mail"
4. Use this 16-character password as `EMAIL_SERVER_PASSWORD` in `.env.local`

The system sends emails for:
- Welcome on registration
- Application submission confirmation
- Status updates (Approved, Rejected, More Info Required)
- Password reset links
- Admin notifications for new form submissions

---

## 🔒 Security

- Passwords hashed with **bcrypt** (12 rounds) — never stored in plain text
- **HTTP-only session cookies** — not accessible via JavaScript
- **SameSite=Lax** cookies — CSRF protection
- Security headers on all responses (X-Frame-Options, X-Content-Type-Options)
- **Role-based access control** — SUPER_ADMIN, CONTENT_ADMIN, APPLICATION_ADMIN, TRAINEE
- Uploaded documents stored in `/public/uploads/[userId]/` — not indexed by search engines
- Password reset tokens expire after **1 hour** and are single-use
- All form inputs validated with **Zod** on both client and server

---

## 🎨 Branding

- **Primary colour:** Dark Green (`#166534` / `brand-700`)
- **Background:** White
- **Text:** Dark grey / black
- **Accent:** Muted gold (`#d97706` / `gold-600`)
- **Font:** Inter (Google Fonts)

To update business details (phone, email, address), edit the `COMPANY` object in:
```
src/lib/utils.ts
```

---

## 📞 Support

| | |
|--|--|
| Phone / WhatsApp | +264 81 728 6079 |
| Email | uepesuverat@gmail.com |
| Location | Tseigratse, Keetmanshoop, Namibia |
