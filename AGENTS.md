# Passion Atelier — AGENTS.md

## Stack
- **Backend:** Laravel 12 (PHP ^8.2) — `app/`, `routes/`, `config/`
- **Frontend:** Inertia.js v2 SPA + React 18 + TypeScript 6 — `resources/js/`
- **Styling:** Tailwind CSS 3 (dark mode `class`), CSS custom properties in `resources/css/styles.css` (oklch colorspace)
- **Build:** Vite 6 + `@vitejs/plugin-react` + `laravel-vite-plugin`; frontend entry `resources/js/app.jsx`
- **DB:** MySQL (`passion_db` via `.env`). **Note:** `.env.example` defaults to SQLite, but the real `.env` uses MySQL. SQLite `database.sqlite` file exists but is unused.
- **Auth:** Laravel Breeze (Inertia React stack) + Sanctum
- **Admin:** Bootstrap 5 Upcube template — CSS/JS served from `public/assets/` (not through Vite). Blade views extend `admin.layouts.master`.

## Commands

```bash
# Start all dev servers (PHP + queue + logs + Vite concurrently via npx concurrently)
composer dev

# Or individually:
php artisan serve
npm run dev

# Build frontend for production
npm run build

# Tests (PHPUnit, Feature + Unit suites)
# Tests do not touch the real DB — uses array cache/sync queue/file mail
php artisan test

# Lint PHP (Laravel Pint)
./vendor/bin/pint

# TypeScript typecheck
npx tsc --noEmit

# List all routes
php artisan route:list

# Seed initial product data
php artisan db:seed --class=ServiceSeeder

# Run migrations
php artisan migrate
```

## Routes
- `routes/web.php` — Frontend Inertia pages (controllers, not closures). `/services/{slug}` → `ServiceController@show` → `product-detail.tsx`
- `routes/admin.php` — Admin CRUD under `/admin` prefix, `auth`+`verified` middleware
- `routes/auth.php` — Breeze auth routes (login, register, password reset, email verification)

## Architecture

### Key structural facts
- **Every page component** wraps `<ThemeProvider>` / `<Navbar>` / `<Footer>` / `<StickyWhatsApp>` directly — `AppLayout.tsx` exists but is never used.
- **Admin CRUD** (Services, Collections, Categories) uses Blade views + service layer (`app/Services/Admin/`). Variations/colors added inline on service edit page.
- **Cart state:** React Context in `Lib/cart-context.tsx` → persisted to `localStorage` under key `passion-cart`. Dedup key: `${slug}-${variation.id}-${color.name}`. Checkout routes to WhatsApp (no payment integration).
- **Chatbot** (`Layouts/chatbot.tsx`) sends POST to `http://localhost:5678/webhook/chat-bot` (n8n webhook). Falls back to keyword matching if unavailable.

### DB-driven product model
- `services` — core product, hasMany `variations` + `colors`, belongsTo `collection` + `category`
- **Frontend receives data as Inertia props** (DB fields come through as-is — snake_case: `original_price`, `hex_code`, `long_description`, `hero_slide`)
- `service.image` stores a short key (e.g. `"cotton"`) — `product-detail.tsx` maps it to static imports via `imageMap`. Static fallback images in `resources/js/assets/`. Admin-uploaded images stored in `storage/app/public/services/` → served via `storage/` symlink.
- Static fallback data in `Lib/site.ts` (`SERVICES`, `HERO_SLIDES`) exists for reference but is no longer the primary data source.

### Naming & conventions
- **Page files:** lowercase kebab-case (e.g. `product-detail.tsx`). Inertia resolves via `./Pages/${name}.tsx` → falls back to `.jsx`.
- **IMPORTANT:** Page filenames must NOT contain `$` — Vite replaces it with `_` in chunk filenames, breaking Inertia's dynamic imports.
- Frontend imports use `@/` alias → `resources/js/`
- Tailwind class merging via `cn()` from `@/Lib/utils` (clsx + tailwind-merge)
- Internal navigation: Inertia `<Link>` (not `<a>`)
- CSS variables in oklch colorspace; `container-luxe`, `btn-luxe`, `glass`, `eyebrow`, `text-gradient-brand` utility classes in `styles.css`
- Google Fonts: Epilogue (sans) + Urbanist (display) loaded in `app.blade.php`
- Ziggy `@routes` in blade provides `route()` JS helper
- Service layer pattern for admin logic (`app/Services/Admin/`)
- PHP 4-space indent per `.editorconfig`

### Key quirks
- `composer dev` runs 4 processes concurrently: `php artisan serve`, `queue:listen --tries=1`, `pail --timeout=0`, `npm run dev`
- Session, cache, and queue all default to `database` driver
- Tests: phpunit.xml has `DB_CONNECTION` and `DB_DATABASE` commented out (no DB — arrays, sync queue, file mail)
- Chatbot has a hardcoded test `sessionId: "murtaza-123@"`
- The `Lib` directory is capitalized (`Lib/site.ts`), but one import in `chatbot.tsx` uses `@/lib/site` (lowercase) — Windows tolerates this, CI may not

## Progress

### Done
- Dark mode CSS fix (`public/assets/js/app.js`)
- 28 database migrations for full eCommerce schema
- 21 Eloquent models with relationships, scopes, accessors
- 16 service classes (CRUD + business logic)
- 28 Form Request validation classes
- 15 admin controllers with constructor DI
- **19 admin Blade views**: products (index/create/edit), coupons (index/create/edit), offers (index/create/edit), reviews (index), faqs (index/create/edit), homepage (index/create/edit), inventory (index/adjust/low-stock)
- 93 admin CRUD routes in `routes/admin.php`
- Nested sidebar menu in `resources/views/admin/partials/sidebar.blade.php`
- `database/seeders/ServiceSeeder.php` — seeds 4 product types, 1 brand, 4 collections, 4 categories, 5 tags, 13 colors, 4 products with 12 variants, 2 attribute groups with 3 attributes/values, 4 reviews, 8 FAQs, 1 coupon, 1 offer, 2 homepage sections, 1 admin user
- `HomeController` migrated from old `ServiceService` to new `Product` model
- `FaqController` update now uses `FaqService`
- All 25 PHPUnit tests pass
- Admin login: `admin@passionatelier.com` / `password`
- `php artisan storage:link` created

### Key product views
- **index**: filterable by status, product type, category, brand, collection, flag (featured/new/best seller/trending)
- **create**: full form with all product fields, pricing, tax, flags, media uploads, SEO, tags
- **edit**: tabbed layout (Basic Info, Pricing & Tax, Media, SEO, Variants, Attributes, Tags) with inline variant CRUD, gallery image management, attribute assignment, and duplicate action

### Next Steps
- Update frontend Inertia pages (home, product-detail, services, collections) to use new `Product` model data shape
- The old `ServiceService.php` file still exists and can be removed once frontend is fully migrated
- `ServiceController` in `routes/web.php` still references old `Service` model — needs update
