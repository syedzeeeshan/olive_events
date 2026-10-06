// Olive Events Narrative, Content and Verified Facts
// Adheres strictly to: Story > Design > Motion > Technology
// Verified figures only from existing approved content. Zero em-dashes.

export interface ServiceWorld {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  lead: string;
  description: string;
  highlights: string[];
  image: string;
  video?: string;
  accent: string;
}

export const OLIVE_STATS = [
  { value: 150, suffix: "+", label: "Celebrations Composed", detail: "Luxury weddings and corporate gatherings across India" },
  { value: 11, suffix: "", label: "Years of Craft", detail: "Refining atmosphere and spatial design since 2014" },
  { value: 8, suffix: "", label: "Indian Cities", detail: "Active productions in Chennai, Mumbai, Bengaluru, Goa & Rajasthan" },
  { value: 60, suffix: "+", label: "Creative Partners", detail: "Master florists, culinary artists, and technical specialists" },
];

export const OLIVE_WORLDS: ServiceWorld[] = [
  {
    id: "weddings",
    num: "01",
    title: "Luxury Weddings",
    subtitle: "Ceremonies, Receptions and Family Traditions",
    lead: "From an intimate mehendi in Chennai to a multi-day celebration in Udaipur, every function is composed as part of one continuous story.",
    description: "Every celebration is shaped by your narrative. We orchestrate bridal suites, mehendi and sangeet evenings, mandap architecture, and discreet guest hospitality.",
    highlights: ["Full planning and artistic coordination", "Ceremony and grand reception design", "Mehendi, sangeet and traditional rituals", "Bridal suite hospitality", "Bespoke musical and cultural direction", "Cinematic photo and film direction"],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
    video: "https://assets.mixkit.co/videos/40627/40627-1080.mp4",
    accent: "Rose and Aged Gold",
  },
  {
    id: "corporate",
    num: "02",
    title: "Corporate Summits",
    subtitle: "Conferences, Leadership Meets and Galas",
    lead: "From leadership gatherings in Bengaluru to large-format launches in Mumbai, we build corporate experiences where production and hospitality work as one.",
    description: "Designed for corporate prestige and clockwork logistics. We manage delegate registration, hybrid streaming, stage architecture, and executive protocol.",
    highlights: ["Leadership summits and annual conferences", "Annual award ceremonies and galas", "Broadcast-grade LED and acoustic staging", "Delegate credentials and VIP check-in", "Executive retreats and offsites", "Partner meets and industry forums"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
    video: "https://assets.mixkit.co/videos/13192/13192-720.mp4",
    accent: "Obsidian and Slate",
  },
  {
    id: "private",
    num: "03",
    title: "Private Celebrations",
    subtitle: "Milestones, Anniversaries and Family Gatherings",
    lead: "Milestone birthdays, anniversaries, and private dinners designed intimately around the people at the table.",
    description: "From candle-lit dinners for twelve in heritage courtyards to private coastal gatherings, we craft personal celebrations with rare consideration.",
    highlights: ["Milestone decade birthdays", "Anniversaries and vow renewals", "Private chef table experiences", "Coastal and garden gatherings", "Curated family celebratory dinners", "Intimate milestone celebrations"],
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1400&q=80",
    accent: "Warm Ivory and Olive",
  },
  {
    id: "galas",
    num: "04",
    title: "Galas & Launches",
    subtitle: "Product Launches, Brand Activations and Awards",
    lead: "Product reveals, brand activations and awards evenings built for cultural impact and visual permanence, with guest journeys managed end to end.",
    description: "An orchestration of light, sound, and anticipation. We compose brand revelations that command presence and leave enduring impressions.",
    highlights: ["Product and automotive debuts", "Awards and recognition galas", "Fashion and luxury brand activations", "Red carpet arrival choreography", "Experiential temporary pavilions", "Media and guest relations"],
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=80",
    video: "https://assets.mixkit.co/videos/51553/51553-1080.mp4",
    accent: "Deep Emerald and Gold",
  },
  {
    id: "destination",
    num: "05",
    title: "Destination Events",
    subtitle: "Heritage Palaces, Coastal Lawns and Sanctuaries",
    lead: "From palace courtyards in Udaipur to sunset lawns in Goa and backwaters in Kerala, we scout, permit and transport so your guests only have to arrive.",
    description: "Every destination celebration is managed end to end with dedicated guest concierges, heritage permissions, and seamless travel logistics.",
    highlights: ["Destination venue curation and access", "Guest travel and hospitality coordination", "State authority and heritage venue clearances", "Multi-day celebratory itineraries", "Welcome dinners and sundowner gatherings", "Dedicated on-ground guest concierge"],
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=80",
    accent: "Sandstone and Sky",
  },
  {
    id: "decor",
    num: "06",
    title: "Décor & Hospitality",
    subtitle: "Floral Architecture, Custom Furniture and Gastronomy",
    lead: "Our in-house design studio crafts floral architecture, tablescapes, lighting and bespoke furniture, paired with curated catering partners.",
    description: "Artisanship at every touchpoint. We balance botanicals, heirloom textiles, acoustic warmth, and sensory gastronomy into one unified atmosphere.",
    highlights: ["Monumental floral installations", "Handcrafted tablescapes and rare linens", "Architectural atmospheric lighting", "Custom furniture fabrication", "Curated regional and modern fine dining", "Calligraphy, stationery and guest gifting"],
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=80",
    video: "https://assets.mixkit.co/videos/5216/5216-1080.mp4",
    accent: "Aged Gold and Moss",
  },
];

export const OLIVE_PRINCIPLES = [
  {
    num: "01",
    title: "Intention",
    detail: "Every element earns its place. Nothing is added merely for show, and nothing essential is overlooked.",
  },
  {
    num: "02",
    title: "Craft",
    detail: "In-house floral, spatial, and fabrication studios ensure we control quality directly from sketch to reality.",
  },
  {
    num: "03",
    title: "Care",
    detail: "One dedicated creative lead, reachable and accountable, from the first conversation to the final guest farewell.",
  },
  {
    num: "04",
    title: "Transparency",
    detail: "Itemised proposals with clear budgets. You always know where every rupee and resource is invested.",
  },
  {
    num: "05",
    title: "Culture",
    detail: "Deep respect for regional traditions, faiths, and family rituals, woven naturally into modern architectural design.",
  },
  {
    num: "06",
    title: "Sustainability",
    detail: "Reusable structural frameworks, partnerships with local growers, and donated florals for a lighter environmental footprint.",
  },
];

export const OLIVE_TESTIMONIALS = [
  {
    quote: "Olive understood the rhythm of every function and somehow made the entire weekend feel effortless.",
    author: "Ananya & Rohan",
    context: "Palace Wedding · Lake Pichola, Udaipur",
  },
  {
    quote: "Every production detail was handled before we had to think about it. The team gave our leadership gathering exactly the tone we wanted.",
    author: "Arjun Mehta",
    context: "Leadership Conclave · Bengaluru",
  },
  {
    quote: "The celebration felt deeply personal without becoming traditional for the sake of it.",
    author: "Kavya Srinivasan",
    context: "Private Anniversary Soirée · Goa",
  },
];

export const OLIVE_FAQ = [
  {
    q: "How far in advance should we reserve our dates?",
    a: "For weddings and large-scale galas, 6 to 12 months is ideal. Corporate summits and private celebrations can often be realized in 6 to 10 weeks, and we accommodate tighter windows when studio capacity permits.",
  },
  {
    q: "Do you work with fixed packages or bespoke budgets?",
    a: "Every celebration is bespoke. Following our initial discovery consultation, we provide an itemised breakdown so you understand exactly how your investment is allocated, refining together with complete transparency.",
  },
  {
    q: "Can we collaborate with our own preferred venues or caterers?",
    a: "Certainly. We regularly coordinate alongside our clients' preferred venues, private chefs, and family photographers, integrating them seamlessly into our master production run-sheet.",
  },
  {
    q: "Do you secure official permits, civil licenses, and venue clearances across India and destination locations?",
    a: "Yes. Our production department coordinates all required municipal, police, fire, sound licensing, and heritage venue clearances across all Indian states and overseas destinations.",
  },
];
