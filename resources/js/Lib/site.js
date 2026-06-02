export const SITE = {
    brand: "PASSION",
    tagline: "Crafted Fabric. Tailored Identity.",
    whatsapp: "923232032700",
    whatsappLink: "https://wa.me/923232032700",
    founder: "Muhammad Asif Khan",
    email: "atelier@passionfabrics.com",
    locations: [
        {
            city: "Lahore",
            country: "Pakistan",
            address: "Khayaban-e-Amin, Lahore",
            mapsEmbed: "https://www.google.com/maps?q=Khayaban-e-Amin,+Lahore,+Pakistan&output=embed",
            mapsLink: "https://maps.google.com/?q=Khayaban-e-Amin,+Lahore,+Pakistan",
        },
        {
            city: "Silicon Valley",
            country: "USA",
            address: "Silicon Valley, California",
            mapsEmbed: "https://www.google.com/maps?q=Silicon+Valley,+California,+USA&output=embed",
            mapsLink: "https://maps.google.com/?q=Silicon+Valley,+California,+USA",
        },
    ],
    nav: [
        { to: "/", label: "Home" },
        { to: "/collections", label: "Collections" },
        { to: "/services", label: "Services" },
        { to: "/advisor", label: "Fabric Advisor" },
        { to: "/about", label: "About Founder" },
        { to: "/testimonials", label: "Testimonials" },
        { to: "/contact", label: "Contact" },
    ],
};
export const SORT_OPTIONS = [
    { value: "default", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name", label: "Alphabetical" },
];
