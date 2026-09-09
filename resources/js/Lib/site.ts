export const SITE = {
  brand: "PASSION",
  tagline: "Crafted Fabric. Tailored Identity.",
  whatsapp: "923212047973",
  whatsappLink: "https://wa.me/923212047973",
  founder: "Muhammad Asif Khan",
  email: "info.passionatelier@gmail.com",
  locations: [
    {
      city: "Karachi",
      country: "Pakistan",
      address: "Passion Atelier, Karachi",
      mapsEmbed: "https://www.google.com/maps?q=Passion+Atelier,+Karachi,+Pakistan&output=embed",
      mapsLink: "https://share.google/BcuM9OzNGS3GAUZLq",
    },
  ],
  nav: [
    { to: "/", label: "Home" },
    { to: "/collections", label: "Collections" },
    { to: "/services", label: "Services" },
    { to: "/advisor", label: "Fabric Advisor" },
    { to: "/about", label: "About Founder" },
    { to: "/contact", label: "Contact" },
  ],
} as const;

export interface FrontendVariation {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  color: {
    id: number;
    name: string;
    hex_code: string;
  } | null;
}

export interface FrontendColor {
  id: number;
  name: string;
  hex_code: string;
  image_url: string | null;
}

export interface FrontendProduct {
  id: number;
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  featured_image_url: string | null;
  image_key: string | null;
  season: string;
  in_stock: boolean;
  regular_price: number;
  sale_price: number;
  has_discount: boolean;
  avg_rating: number;
  review_count: number;
  variations: FrontendVariation[];
  colors: FrontendColor[];
}

export const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Alphabetical" },
] as const;
