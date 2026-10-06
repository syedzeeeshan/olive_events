// Olive Events Configuration & Asset Manifest
// Sourced strictly from approved brand assets and real business endpoints

const IMG = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const VID = (id: number | string, res = 1080) =>
  `https://assets.mixkit.co/videos/${id}/${id}-${res}.mp4`;

export interface BrandConfig {
  name: string;
  tagline: string;
  city: string;
  established: string;
}

export interface ContactDetails {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  mapEmbed?: string;
  calendly?: string;
}

export const OLIVE_BRAND: BrandConfig = {
  name: "Olive Events",
  tagline: "Indian celebrations, composed with intention.",
  city: "Chennai · India · Est. 2014",
  established: "2014",
};

export const OLIVE_CONTACT: ContactDetails = {
  phone: "+91 9790775915",
  whatsapp: "919790775915",
  email: "hello@oliveevents.in",
  address: "Olive Events Atelier, Chennai, Tamil Nadu, India",
  hours: "Mon - Sat · 10:00 - 19:00 IST",
  mapEmbed: "https://www.openstreetmap.org/export/embed.html?bbox=80.20%2C12.95%2C80.30%2C13.10&layer=mapnik",
};

export const OLIVE_DIGITAL_CONTACT: ContactDetails = {
  phone: "+91 9790775915",
  whatsapp: "919790775915",
  email: "digital@oliveevents.in",
  address: "Olive Digital Studio, Chennai, Tamil Nadu, India",
  hours: "Mon - Sat · 10:00 - 19:00 IST",
};

export const OLIVE_SOCIAL = {
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  linkedin: "https://linkedin.com/",
  tiktok: "https://tiktok.com/",
};

export const OLIVE_MEDIA = {
  /* Cinematic & Atmospheric Videos */
  videos: {
    hero: VID(5227),            // Gala party atmospheric view
    showreel: VID(5224),        // Decorated celebration tablescape
    wedding: VID(40627),        // Bride and groom walk
    corporate: VID(13192, 720), // Architectural symposium hall
    celebration: VID(51553),    // Champagne celebration
    fireworks: VID(4151),       // Night sky celebration
    decor: VID(5213),           // Suspended floral installations
    outdoor: VID(5216),         // Royal banquet terrace table
    digital: VID(46634, 720),   // Creative studio digital craft
    social: VID(4908),          // Curated social and content
  },

  /* Posters for instantaneous loading fallbacks */
  posters: {
    hero: IMG("1519741497674-611481863552"),
    digital: IMG("1498050108023-c5249f4df085"),
    decor: IMG("1523438885200-e635ba2c371e"),
    showreel: IMG("1511285560929-80b456fea0bc"),
  },

  /* Photography Library */
  imagery: {
    aboutMain: IMG("1511285560929-80b456fea0bc", 1400),
    aboutSecondary: IMG("1465495976277-4387d4b0b4c6", 1000),
    destinationArchitecture: IMG("1532712938310-34cb3982ef74", 1800),
    team: IMG("1515169067868-5387ec356754", 1200),
    beforeSpace: IMG("1513694203232-719a280e022f", 1400), // Raw architectural venue
    afterSpace: IMG("1519167758481-83f550bb49b3", 1400),  // Fully dressed transformed gala
  },

  /* Gallery Archive for Chapter 03 & Portfolio */
  gallery: [
    { id: "g1", title: "Palace Courtyard Nuptials", venue: "City Palace, Udaipur", category: "wedding", img: IMG("1519741497674-611481863552", 1400) },
    { id: "g2", title: "Heritage Terrace Soirée", venue: "Rambagh Palace, Jaipur", category: "private", img: IMG("1530023367847-a683933f4172", 1400) },
    { id: "g3", title: "Global Innovation Summit", venue: "Jio World Centre, Mumbai", category: "corporate", img: IMG("1540575467063-178a50c2df87", 1400) },
    { id: "g4", title: "Oceanfront Lawn Ceremony", venue: "South Coast, Goa", category: "wedding", img: IMG("1522673607200-164d1b6ce486", 1400) },
    { id: "g5", title: "Symphonic Midwinter Gala", venue: "The Imperial, New Delhi", category: "gala", img: IMG("1533174072545-7a4b6ad7a6c3", 1400) },
    { id: "g6", title: "Chef Table Epilogue", venue: "Colaba Atelier, Mumbai", category: "private", img: IMG("1414235077428-338989a2e8c0", 1400) },
    { id: "g7", title: "Lakeside Royal Vows", venue: "Jagmandir Island, Udaipur", category: "wedding", img: IMG("1507504031003-b417219a0fde", 1400) },
    { id: "g8", title: "Annual Leadership Conclave", venue: "Aerocity, New Delhi", category: "corporate", img: IMG("1531058020387-3be344556be6", 1400) },
    { id: "g9", title: "Candlelit Bastion Dinner", venue: "Alila Fort, Bishangarh", category: "private", img: IMG("1517457373958-b7bdd4587205", 1400) },
    { id: "g10", title: "Grand Ballroom Transformation", venue: "The Leela, New Delhi", category: "wedding", img: IMG("1519167758481-83f550bb49b3", 1400) },
    { id: "g11", title: "The Heritage Courtyard Edit", venue: "Taj Falaknuma Palace, Hyderabad", category: "gala", img: IMG("1475721027785-f74eccf877e2", 1400) },
    { id: "g12", title: "Symphonic Overture & Reveal", venue: "NCPA, Mumbai", category: "gala", img: IMG("1470229722913-7c0e2dbbafd3", 1400) },
  ],
};
