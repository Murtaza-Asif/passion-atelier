# Passion Atelier — Complete Project Documentation

> **Brand:** Premium men's unstitched fabrics (Cotton, Wash & Wear, Formal Latha, Custom Selection)
> **Stack:** Laravel 12 + Inertia.js v2 + React 18 + TypeScript 6 (frontend) + Blade + Bootstrap 5 Upcube (admin)
> **Database:** MySQL (`passion_db`)
> **Build:** Vite 6

---

## 1. QUICK START

```bash
# First time setup
composer install
npm install
cp .env.example .env   # then edit DB credentials
php artisan key:generate
php artisan storage:link

# Build & run
php artisan migrate:fresh --seed
npm run build
composer dev            # runs all 4 servers: PHP, queue, logs, Vite
```

**Admin login:** `admin@passionatelier.com` / `password`  
**Admin URL:** `http://localhost:8000/admin/dashboard`  
**Frontend URL:** `http://localhost:8000/`

---

## 2. PROJECT ARCHITECTURE (High-Level)

```
┌─────────────────────────────────────────────────────────────┐
│                     LARAVEL BACKEND                          │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │  Routes/     │  │  Controllers │  │  Models/           │   │
│  │  web.php     │──│  App/*       │──│  App/Models/*     │──┐│
│  │  admin.php   │  │  Admin/*     │  │                   │  ││
│  │  auth.php    │  └──────────────┘  └───────────────────┘  ││
│  └─────────────┘                                           ││
│                                      ┌──────────────────┐   ││
│                                      │  Services/*      │   ││
│                                      │  Form Requests/* │   ││
│                                      └──────────────────┘   ││
│                                                              ││
└──────────────────────────────────────────────────────────────┘│
                                                                │
        ┌──────────────────────────────┬────────────────────────┘
        ▼                              ▼
┌───────────────────┐      ┌──────────────────────────────┐
│  ADMIN (Blade)     │      │  FRONTEND (Inertia + React)  │
│                    │      │                               │
│  Bootstrap 5       │      │  Tailwind CSS 3              │
│  Upcube Template   │      │  Google Fonts (Epilogue,     │
│  public/assets/    │      │    Urbanist)                 │
│                    │      │  resources/js/               │
│  resources/views/  │      │    Pages/*.tsx               │
│    admin/          │      │    Components/               │
│      layouts/      │      │    Layouts/                  │
│      partials/     │      │    Lib/                      │
│      products/     │      │    assets/ (images)          │
│      coupons/      │      └──────────────────────────────┘
│      offers/       │
│      reviews/      │
│      faqs/         │
│      homepage/     │
│      inventory/    │
│      dashboard/    │
└───────────────────┘
```

**Key Concept:** Yeh project **do alag systems** par chalta hai:
- **Admin Panel** → Blade views + Bootstrap 5 (Upcube template). Static assets `public/assets/`
- **Frontend** → Inertia.js SPA with React. Vite se build hota hai. `resources/js/`

---

## 3. DIRECTORY STRUCTURE

```
passion-atelier/
│
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/          # 15 admin controllers (CRUD for everything)
│   │   │   ├── Auth/           # Breeze auth controllers (login, register, etc.)
│   │   │   ├── HomeController.php        # Frontend homepage
│   │   │   ├── ServiceController.php     # Frontend services + detail pages
│   │   │   ├── CollectionController.php  # Frontend collections page
│   │   │   └── ProfileController.php     # User profile
│   │   └── Requests/
│   │       ├── Admin/          # 32 Form Request validation classes
│   │       └── Auth/           # LoginRequest
│   ├── Models/                 # 22 Eloquent models
│   └── Services/
│       └── Admin/              # 18 Service classes (business logic)
│
├── database/
│   ├── migrations/             # 33 migration files
│   └── seeders/
│       ├── DatabaseSeeder.php
│       └── ServiceSeeder.php   # Main seeder (dummy data)
│
├── resources/
│   ├── js/                     # FRONTEND (React + TypeScript)
│   │   ├── Pages/              # Page components (one per route)
│   │   ├── Components/         # Shared UI components
│   │   ├── Layouts/            # Layout components
│   │   ├── Lib/                # Utilities, config, context
│   │   ├── assets/             # Static images
│   │   ├── css/                # Global CSS
│   │   └── app.jsx             # Inertia entry point
│   └── views/                  # BACKEND Blade views
│       └── admin/
│           ├── layouts/        # master.blade.php (main layout)
│           ├── partials/       # header, sidebar, footer, scripts
│           ├── dashboard/      # Dashboard page
│           ├── products/       # Products CRUD (index, create, edit)
│           ├── coupons/        # Coupons CRUD
│           ├── offers/         # Offers CRUD
│           ├── reviews/        # Reviews (list, approve, delete)
│           ├── faqs/           # FAQs CRUD
│           ├── homepage/       # Homepage sections CRUD
│           └── inventory/      # Inventory management
│
├── public/
│   └── assets/                 # Admin template assets (JS, CSS, images)
│       ├── css/
│       ├── js/
│       │   └── pages/          # dashboard.init.js (ApexCharts)
│       └── libs/
│
├── routes/
│   ├── web.php                 # Frontend routes (Inertia pages)
│   ├── admin.php               # Admin CRUD routes (/admin/*)
│   └── auth.php                # Breeze auth routes
│
├── tailwind.config.js
├── vite.config.js
├── tsconfig.json
└── AGENTS.md                   # Dev notes & conventions
```

---

## 4. ROUTES & DATA FLOW

### 4.1 Frontend Routes (`routes/web.php`)

| URL | Controller | View (Page) | Data Source |
|-----|-----------|-------------|-------------|
| `/` | `HomeController::class` | `home.tsx` | `Product` model (published, ordered) |
| `/services` | `ServiceController@index` | `services.tsx` | `Product` model (published, ordered) |
| `/services/{slug}` | `ServiceController@show` | `product-detail.tsx` | Single `Product` by slug |
| `/collections` | `CollectionController` | `collections.tsx` | `Product` model (published, ordered) |
| `/advisor` | Closure → `Inertia::render('advisor')` | `advisor.tsx` | Static (no DB) |
| `/about` | Closure → `Inertia::render('about')` | `about.tsx` | Static (no DB) |
| `/testimonials` | Closure → `Inertia::render('testimonials')` | `testimonials.tsx` | Static (no DB) |
| `/contact` | Closure → `Inertia::render('contact')` | `contact.tsx` | Static (no DB) |
| `/dashboard` | Redirect → `/admin/dashboard` | — | — |

**Data Flow Pattern:**
```
Browser → Route → Controller → Inertia::render('page', { props }) → 
React Page Component (receives props) → sub-components
```

**Key Detail:** Har controller `Product::with(['variants', 'variants.color'])` load karta hai, phir `->toFrontendArray()` call karta hai jo data ko frontend-compatible shape mein convert karta hai.

### 4.2 Admin Routes (`routes/admin.php`)

Sab routes `/admin/*` prefix ke under hain, `auth` + `verified` middleware ke saath.

| Prefix | Controller | Purpose |
|--------|-----------|---------|
| `/admin/dashboard` | `DashboardController` | Stats, charts |
| `/admin/products` | `ProductController` | Full CRUD + duplicate |
| `/admin/product-types` | `ProductTypeController` | CRUD |
| `/admin/brands` | `BrandController` | CRUD |
| `/admin/collections` | `CollectionController` | CRUD |
| `/admin/categories` | `CategoryController` | CRUD (parent-child) |
| `/admin/colors` | `ColorController` | CRUD |
| `/admin/tags` | `TagController` | CRUD |
| `/admin/attribute-groups` | `AttributeGroupController` | CRUD |
| `/admin/attributes` | `AttributeController` | CRUD + values inline |
| `/admin/reviews` | `ReviewController` | List + approve + delete |
| `/admin/faqs` | `FaqController` | CRUD |
| `/admin/coupons` | `CouponController` | CRUD (product/category assignment) |
| `/admin/offers` | `OfferController` | CRUD (BXGY support) |
| `/admin/homepage` | `HomepageController` | CRUD (product multi-select) |
| `/admin/inventory` | `InventoryController` | Logs + adjust + low-stock |

### 4.3 Auth Routes (`routes/auth.php`)

Standard Breeze auth routes:
- `/login`, `/register`, `/forgot-password`, `/reset-password/{token}`
- `/verify-email`, `/confirm-password`
- `/profile` (auth required)

---

## 5. DATABASE SCHEMA

### 5.1 Core Tables

| Table | Key Fields | Relationships |
|-------|-----------|---------------|
| `products` | title, slug, sku, status(draft/published/archived), regular_price, sale_price, featured_image, is_featured, is_new_arrival, is_best_seller, is_trending, total_stock, avg_rating | belongsTo: product_type, category, brand, collection; hasMany: variants, reviews, faqs |
| `product_variants` | product_id, color_id, sku, price, sale_price, stock, is_default | belongsTo: product, color |
| `colors` | name, hex_code, image, status | (standalone, shared across products) |
| `product_types` | name, slug, is_active | hasMany: products |
| `brands` | name, slug, image, status | hasMany: products |
| `collections` | name, slug, image, description, status | hasMany: products |
| `categories` | parent_id, name, slug, image, status | self-referential (parent/children), hasMany: products |
| `tags` | name, slug | belongsToMany: products (via `product_tag`) |

### 5.2 Attribute System

```
attribute_groups (name, slug)
    └── attributes (name, input_type[text/select/multiselect/color], is_filterable, is_specification)
            └── attribute_values (value, slug, swatch_value)
                    └── product_attributes (pivot: product_id, attribute_id, attribute_value_id)
```

### 5.3 Commerce Tables

| Table | Purpose |
|-------|---------|
| `coupons` | Discount codes (percentage/fixed/free_shipping/bxgy) |
| `coupon_products` | Coupon-product assignment |
| `coupon_categories` | Coupon-category assignment |
| `offers` | Time-limited offers (with BXGY support) |
| `offer_products` | Offer-product assignment |
| `reviews` | Product reviews (rating, title, body, approved/featured flags) |
| `product_faqs` | Per-product FAQs |
| `inventory_logs` | Stock adjustment audit trail |

### 5.4 Other Tables

| Table | Purpose |
|-------|---------|
| `wishlists` | User wishlist (user_id, product_id) |
| `product_comparisons` | Product comparison tool |
| `homepage_sections` | Dynamic homepage content (section_type, reference_type, product assignments) |
| `homepage_section_products` | Pivot for homepage section → products |

---

## 6. MODEL LAYER (22 Models)

### 6.1 Core Models

| Model | File | SoftDeletes | Key Relationships |
|-------|------|-------------|-------------------|
| `Product` | `app/Models/Product.php` | ✅ | productType, category, brand, collection, variants, tags, attributes, reviews, faqs, inventoryLogs |
| `ProductVariant` | `app/Models/ProductVariant.php` | ✅ | product, color |
| `Color` | `app/Models/Color.php` | ✅ | (standalone) |
| `ProductType` | `app/Models/ProductType.php` | ❌ | products |
| `Brand` | `app/Models/Brand.php` | ✅ | products |
| `Collection` | `app/Models/Collection.php` | ✅ | products |
| `Category` | `app/Models/Category.php` | ✅ | parent, children, products |
| `Tag` | `app/Models/Tag.php` | ❌ | (belongsToMany products) |

### 6.2 Feature Models

| Model | Purpose |
|-------|---------|
| `AttributeGroup` | Groups attributes (e.g., "Fabric Details") |
| `Attribute` | Individual attribute (e.g., "Fabric Type") |
| `AttributeValue` | Possible values (e.g., "Cotton", "Linen") |
| `ProductAttribute` | Pivot (product → attribute + value) |
| `InventoryLog` | Stock change audit trail |
| `Coupon` | Discount code with conditions |
| `Offer` | Time-limited offers |
| `Review` | Product reviews |
| `ProductFaq` | Product-specific FAQ |
| `Wishlist` | User favorites |
| `ProductComparison` | Compare products |
| `HomepageSection` | Dynamic homepage content blocks |
| `HomepageSectionProduct` | Pivot for homepage → products |

### 6.3 Frontend Mapping (`Product::toFrontendArray()`)

`Product` model ka **`toFrontendArray()`** method hai jo DB data ko frontend-compatible shape mein convert karta hai:

```php
// Returns this shape to the React frontend:
[
    'id' => 1,
    'slug' => 'premium-cotton',
    'name' => 'Premium Cotton Collection',            // maps from title
    'short_description' => '...',
    'long_description' => '...',                        // maps from full_description
    'featured_image_url' => null,                       // from featured_image
    'image_key' => 'cotton',                            // computed from slug
    'season' => 'All-season',                           // computed from slug
    'regular_price' => 3999.0,
    'sale_price' => 3499.0,
    'has_discount' => true,
    'avg_rating' => 4.8,
    'review_count' => 24,
    'variations' => [                                   // mapped from variants + color
        ['id' => 1, 'name' => 'Superior 80s', 'price' => 3499, 'original_price' => 3999],
    ],
    'colors' => [                                       // extracted from variants.color
        ['id' => 1, 'name' => 'Ivory', 'hex_code' => '#f5f0e8'],
    ],
]
```

---

## 7. ADMIN PANEL (Blade + Bootstrap 5)

### 7.1 Layout Structure

```
resources/views/admin/
├── layouts/
│   └── master.blade.php      # Main HTML shell (<head>, <body>, stacks)
├── partials/
│   ├── header.blade.php       # Top navbar with user menu, search, notifications
│   ├── sidebar.blade.php      # Vertical metismenu sidebar (nested items)
│   ├── footer.blade.php       # Copyright footer
│   └── scripts.blade.php      # JS loading order: jQuery → Bootstrap → MetisMenu → Simplebar → Waves → app.js
└── {module}/
    ├── index.blade.php        # List with filters
    ├── create.blade.php       # Add new
    └── edit.blade.php         # Edit existing
```

### 7.2 Script Loading Order

```
1. jQuery
2. Bootstrap Bundle
3. MetisMenu (sidebar)
4. Simplebar (scrollbar)
5. Waves (ripple effect)
6. app.js (theme toggle, sidebar, fullscreen, right-bar, tooltips, popovers)
7. @stack('page-scripts')  → module-specific JS (e.g., ApexCharts on dashboard)
8. @stack('scripts')       → page-specific inline scripts
```

### 7.3 Theme Switching

`app.js` handles light/dark/RTL mode via checkboxes in `.right-bar` panel. Selection persists to `sessionStorage` key `is_visited`. CSS files are swapped dynamically.

### 7.4 Each Admin Module — Where to Make Changes

#### Products (`/admin/products`)
- **List:** `products/index.blade.php` — Filters by status, type, category, brand, collection, flag
- **Create:** `products/create.blade.php` — Full form with all fields
- **Edit:** `products/edit.blade.php` — Tabbed layout (Basic Info, Pricing, Media, SEO, Variants, Attributes, Tags)
- **Controller:** `Admin/ProductController.php` — 8 injected services
- **Service:** `Admin/ProductService.php` — Handles file uploads, pagination, duplicate
- **Form Requests:** `StoreProductRequest.php`, `UpdateProductRequest.php`, `StoreVariantRequest.php`

**To add a new field to products:** Add migration → add to `$fillable` in `Product.php` → add cast if needed → add input field in `create.blade.php` and `edit.blade.php` → add validation rule in both Form Requests.

#### Coupons (`/admin/coupons`)
- **List:** `coupons/index.blade.php`
- **Create:** `coupons/create.blade.php` — Product & category multi-select
- **Controller:** `Admin/CouponController.php`
- **Service:** `Admin/CouponService.php`

#### Offers (`/admin/offers`) — Supports BXGY
- **Controller:** `Admin/OfferController.php`
- **Service:** `Admin/OfferService.php`

#### Inventory (`/admin/inventory`)
- **Logs:** `inventory/index.blade.php` — Filterable by product
- **Adjust:** `inventory/adjust.blade.php` — Dynamic variant dropdown via JS
- **Low Stock:** `inventory/low-stock.blade.php`
- **Controller:** `Admin/InventoryController.php`
- **Service:** `Admin/InventoryService.php` (uses DB transactions)

#### Homepage (`/admin/homepage`)
- Sections with product multi-select
- **Controller:** `Admin/HomepageController.php`
- **Service:** `Admin/HomepageService.php`

### 7.5 Where to Fix Admin Dashboard Overlay Issue

Edit `resources/views/admin/dashboard/index.blade.php`:
- `@push('styles')` block — already has CSS overrides
- `@push('scripts')` block — removes overlay classes
- First check browser Console for JS errors, Elements tab for body classes

---

## 8. FRONTEND (Inertia + React + TypeScript)

### 8.1 Entry Point

`resources/js/app.jsx`:
- Creates Inertia app
- Wraps everything in `CartProvider`
- Renders `CartDrawer` globally
- Resolves pages from `./Pages/**/*.{tsx,jsx}`

### 8.2 Pages & Their Components

| Route | Page Component | Props | Sub-Components Used |
|-------|---------------|-------|-------------------|
| `/` | `Pages/home.tsx` | `services: FrontendProduct[]` | Hero, ServicesSection, LogoMarquee, FabricAdvisor, Testimonials, FounderSection, LocationsSection, FinalCta |
| `/services` | `Pages/services.tsx` | `services: FrontendProduct[]` | ProductGrid |
| `/services/{slug}` | `Pages/product-detail.tsx` | `slug, service: FrontendProduct \| null` | — |
| `/collections` | `Pages/collections.tsx` | `services: FrontendProduct[]` | ProductGrid |
| `/advisor` | `Pages/advisor.tsx` | none | FabricAdvisor, FinalCta |
| `/about` | `Pages/about.tsx` | none | FounderSection, FinalCta |
| `/testimonials` | `Pages/testimonials.tsx` | none | Testimonials, FinalCta |
| `/contact` | `Pages/contact.tsx` | none | LocationsSection |

### 8.3 Component Hierarchy

```
app.jsx
└── CartProvider
    ├── App (Inertia page)
    │   ├── ThemeProvider
    │   ├── Navbar
    │   ├── Main Content
    │   │   ├── Hero (branding, no props)
    │   │   ├── ServicesSection → ProductGrid → Product Cards
    │   │   ├── FabricAdvisor (chatbot widget)
    │   │   ├── Testimonials (static)
    │   │   ├── FounderSection (static)
    │   │   ├── LocationsSection (static)
    │   │   └── FinalCta (static)
    │   ├── Footer
    │   └── StickyWhatsApp
    └── CartDrawer (global overlay)
```

### 8.4 Key Libraries

| Library | Usage |
|---------|-------|
| `@inertiajs/react` | SPA routing, page components |
| `framer-motion` | Animations (hero parallax, scroll reveals, card hover) |
| `lucide-react` | Icons (ShoppingBag, Heart, Shield, etc.) |
| `tailwind-merge` + `clsx` | `cn()` utility for conditional classes |

### 8.5 Data Types (`Lib/site.ts`)

```typescript
interface FrontendProduct {
  id: number;
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  featured_image_url: string | null;
  image_key: string | null;     // 'cotton' | 'washwear' | 'latha' | 'custom'
  season: string;
  regular_price: number;
  sale_price: number;
  has_discount: boolean;
  avg_rating: number;
  review_count: number;
  variations: FrontendVariation[];
  colors: FrontendColor[];
}

interface FrontendVariation {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
}

interface FrontendColor {
  id: number;
  name: string;
  hex_code: string;
}
```

### 8.6 Image Handling

Static fallback images in `resources/js/assets/`:
- `fabric-cotton.jpg`, `fabric-washwear.jpg`, `fabric-latha.jpg`, `fabric-custom.jpg`

Priority in components:
1. `product.featured_image_url` (from DB storage, via admin upload)
2. `imageMap[product.image_key]` (static fallback from slug mapping)
3. `cotton` (default fallback)

### 8.7 Cart System (`Lib/cart-context.tsx`)

- **Storage:** `localStorage` key `passion-cart`
- **Cart key format:** `${product.slug}-${variation.id}-${color.name}`
- **WhatsApp checkout:** `handleBuyNow()` redirects to `SITE.whatsappLink`
- **No payment integration:** Cart → WhatsApp message

### 8.8 Chatbot (`Layouts/chatbot.tsx`)

- Sends POST to `http://localhost:5678/webhook/chat-bot` (n8n webhook)
- Falls back to keyword matching if webhook unavailable
- Hardcoded test `sessionId: "murtaza-123@"`

---

## 9. SERVICE LAYER (18 Services)

Har admin module ka apna `{Module}Service.php` hai jo business logic handle karta hai. Pattern:

```
Controller → injects Service → Service handles DB queries, file uploads, transactions → returns result
```

| Service File | Purpose |
|-------------|---------|
| `ProductService.php` | Full CRUD + duplicate + file uploads + tag sync + attribute save |
| `ProductTypeService.php` | Basic CRUD |
| `BrandService.php` | CRUD + image/banner upload |
| `CollectionService.php` | CRUD + image/banner upload |
| `CategoryService.php` | CRUD + image/banner upload + parent categories |
| `ColorService.php` | CRUD + image upload |
| `TagService.php` | CRUD + findOrCreate |
| `AttributeGroupService.php` | CRUD + withCount attributes |
| `AttributeService.php` | CRUD + filterable/specifications scopes |
| `AttributeValueService.php` | CRUD |
| `FaqService.php` | CRUD + getByProduct |
| `ReviewService.php` | Paginate + approve |
| `CouponService.php` | CRUD + product/category sync |
| `OfferService.php` | CRUD + product sync |
| `HomepageService.php` | CRUD + product sync |
| `InventoryService.php` | Paginate + adjustStock (transaction) + lowStock |
| `DashboardService.php` | Hardcoded stats (no DB queries for most data) |
| `MediaService.php` | File upload helpers |

---

## 10. FORM REQUESTS (32 Files)

Har admin controller k liye `Store{Module}Request.php` aur `Update{Module}Request.php` hai. Ye validation rules define karte hain.

**Pattern:**
```php
class StoreProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
            'slug' => 'nullable|unique:products',
            'regular_price' => 'nullable|numeric|min:0',
            'featured_image' => 'nullable|image|max:3072',
            // ...
        ];
    }
}
```

`Update*Request` files same rules use karti hain lekin `slug` aur `sku` unique validation mein current record ko ignore karti hain using `Rule::unique(...)->ignore($this->route('{model}'))`.

---

## 11. SEEDER

**File:** `database/seeders/ServiceSeeder.php`

Seeds complete dummy data:
- 1 admin user
- 4 product types (Fabric, Stitched Suit, Perfume, Accessory)
- 1 brand, 4 collections, 4 categories, 5 tags, 13 colors
- 4 products with 12 variants (3 per product)
- 2 attribute groups, 3 attributes, 14 attribute values
- 4 reviews, 8 FAQs
- 1 coupon (WELCOME10), 1 offer (Summer Sale)
- 2 homepage sections

**To add more dummy data:** Edit `ServiceSeeder.php` → add entries to `$products` array. Run `php artisan migrate:fresh --seed`.

---

## 12. MODULE-BY-MODULE CHANGE GUIDE

### 12.1 Add a New Product Field

1. **Migration:** Create migration → add column to `products` table
2. **Model:** Add field name to `$fillable` in `app/Models/Product.php`; add cast if needed
3. **Form Requests:** Update `StoreProductRequest.php` and `UpdateProductRequest.php` rules
4. **Admin Views:** Add input field to `products/create.blade.php` and `products/edit.blade.php`
5. **Frontend Mapping:** Update `toFrontendArray()` in `Product.php` if frontend needs it
6. **Frontend Type:** Update `FrontendProduct` interface in `Lib/site.ts`

### 12.2 Add a New Admin Module

1. **Migration:** Create table
2. **Model:** Create `app/Models/YourModel.php`
3. **Service:** Create `app/Services/Admin/YourService.php`
4. **Form Requests:** Create `StoreYourRequest.php` + `UpdateYourRequest.php`
5. **Controller:** Create `app/Http/Controllers/Admin/YourController.php`
6. **Routes:** Add resource routes in `routes/admin.php`
7. **Views:** Create `resources/views/admin/your-module/{index,create,edit}.blade.php`
8. **Sidebar:** Add menu entry in `views/admin/partials/sidebar.blade.php`

### 12.3 Add a New Frontend Page

1. **Route:** Add in `routes/web.php` → `Route::get('/your-page', ...)`
2. **Controller:** Create/update controller → return `Inertia::render('your-page', { props })`
3. **Page Component:** Create `resources/js/Pages/your-page.tsx`
4. **Nav:** Add link in `Lib/site.ts` `SITE.nav` array

### 12.4 Change Product Display on Frontend

- Edit `Product::toFrontendArray()` in `app/Models/Product.php` → changes what data is sent
- Edit `resources/js/Components/sections/product-grid.tsx` → changes card layout
- Edit `resources/js/Pages/product-detail.tsx` → changes detail page layout

### 12.5 Change Admin Dashboard

- **Stats:** Edit `DashboardService.php` → `getStats()` method
- **Charts:** Edit `dashboard.init.js` in `public/assets/js/pages/`
- **Layout:** Edit `dashboard/index.blade.php`
- **Overlay fix:** Check `@push('styles')` and `@push('scripts')` blocks in `dashboard/index.blade.php`

### 12.6 Change Theme/Logo

- **Admin logo:** Replace images in `public/assets/images/` (logo-dark.png, logo-light.png, logo-sm.png, favicon.ico)
- **Admin theme:** CSS files in `public/assets/css/` (app.min.css, bootstrap.min.css, dark variants)
- **Frontend theme:** Edit `resources/css/styles.css` (CSS custom properties in oklch)
- **Frontend colors:** Edit `tailwind.config.js` → `colors` section

### 12.7 Add New Product Type (e.g., "Perfume")

1. Already have product types in seeder — just add from admin UI
2. Create products under that type from admin
3. If frontend needs different display per type, add logic in `toFrontendArray()` or product-grid.tsx

### 12.8 Change WhatsApp Number / Contact Info

Edit `resources/js/Lib/site.ts`:
```typescript
export const SITE = {
  whatsapp: "923232032700",         // Change this
  whatsappLink: "https://wa.me/923232032700",  // Change this
  email: "atelier@passionfabrics.com",
  // ...
};
```

### 12.9 Add Payment Integration

1. Integrate a payment gateway (Stripe, JazzCash, etc.) in Laravel
2. Add a checkout page controller + route
3. Update cart flow from WhatsApp-only to payment flow

---

## 13. COMMANDS CHEAT SHEET

```bash
# Development
composer dev              # Start all dev servers (PHP + queue + Vite + logs)
php artisan serve        # PHP dev server only
npm run dev              # Vite dev server only

# Database
php artisan migrate:fresh --seed   # Reset + seed
php artisan migrate               # Run pending migrations
php artisan db:seed --class=ServiceSeeder  # Seed only

# Testing
php artisan test        # Run all 25 PHPUnit tests

# Linting
./vendor/bin/pint       # Laravel Pint (PHP CS fixer)
npx.cmd tsc --noEmit   # TypeScript check
npm run build           # Production build

# Utilities
php artisan route:list  # List all routes
php artisan storage:link  # Create storage symlink
```

---

## 14. KNOWN ISSUES & QUIRKS

- **Dashboard overlay:** Kuch browsers mein `/admin/dashboard` par clicks block ho jate hain. Workaround dashboard view mein CSS/JS fix ke through hai. Root cause unknown.
- **TypeScript deprecation warnings:** `tsconfig.json` uses `moduleResolution=node10` and `baseUrl` — ye TS7 mein band ho jayenge.
- **Case sensitivity:** `Lib/` directory capitalized hai, lekin `hero.tsx` line 5 mein `@/lib/site` (lowercase) use hota hai. Windows par chalega, Linux/CI par nahi.
- **Old Service tables:** `services`, `service_variations`, `service_colors` tables abhi migrations mein drop ho jati hain. Ye legacy data hai — naya system `products` table use karta hai.
- **No payment gateway:** Checkout sirf WhatsApp par redirect karta hai. Payment integration nahi hai.
- **Hardcoded dashboard stats:** `DashboardService` real DB queries nahi karta — sab hardcoded numbers hain.
