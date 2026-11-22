export type CollectionCategory =
  | 'Landscapes'
  | 'Seascapes'
  | 'Life'
  | 'Moods'
  | 'Monochrome'
  | 'Panoramas'
  | 'Analogue'
  | 'New Arrivals';

export type Currency = 'INR' | 'USD';

export type PrintFormat =
  | 'canvas-24x16'
  | 'canvas-36x24'
  | 'paper-24x16'
  | 'paper-36x24'
  | 'painting-3x2';

export type WatermarkMode = 'clean' | 'corner' | 'legacy';

export interface Artwork {
  id: string;
  code: string;
  title: string;
  collection: CollectionCategory;
  location: string;
  story: string;
  imageUrl: string;
  aspect: 'landscape' | 'wide' | 'portrait';
  photographer: string;
  capturedOn?: string;
}

export interface FormatOption {
  id: PrintFormat;
  label: string;
  dimensions: string;
  medium: string;
  inr: number;
  usd: number;
  shippingIndia: string;
  shippingIntl: string;
  wallWidthPct: number;
  wallAspect: string;
  badge?: string;
}

export interface BagItem {
  id: string;
  artwork: Artwork;
  format: PrintFormat;
  quantity: number;
}

export interface TeamMember {
  name: string;
  role: string;
  region: string;
  bio: string;
  highlights: string[];
  portraitUrl: string;
}

export const COLLECTIONS: ('All' | CollectionCategory)[] = [
  'All',
  'Landscapes',
  'Seascapes',
  'Life',
  'Moods',
  'Monochrome',
  'Panoramas',
  'Analogue',
  'New Arrivals',
];

export const FORMAT_OPTIONS: FormatOption[] = [
  {
    id: 'canvas-24x16',
    label: 'Stretched Canvas Print',
    dimensions: '24" × 16"',
    medium: 'Museum-grade poly-cotton canvas on kiln-dried pine frame',
    inr: 15000,
    usd: 260,
    shippingIndia: 'Free insured delivery across India',
    shippingIntl: 'International courier billed at actuals',
    wallWidthPct: 44,
    wallAspect: 'aspect-[3/2]',
  },
  {
    id: 'canvas-36x24',
    label: 'Stretched Canvas Print (Statement)',
    dimensions: '36" × 24"',
    medium: 'Museum-grade poly-cotton canvas on kiln-dried pine frame',
    inr: 20000,
    usd: 300,
    shippingIndia: 'Free insured delivery across India',
    shippingIntl: 'International courier billed at actuals',
    wallWidthPct: 60,
    wallAspect: 'aspect-[3/2]',
    badge: 'Collector Favorite',
  },
  {
    id: 'paper-24x16',
    label: 'Archival Fine-Art Paper',
    dimensions: '24" × 16"',
    medium: '310 gsm museum archival matte paper, unframed',
    inr: 9500,
    usd: 165,
    shippingIndia: 'Free rolled-tube delivery across India',
    shippingIntl: 'International tube courier at actuals',
    wallWidthPct: 42,
    wallAspect: 'aspect-[3/2]',
  },
  {
    id: 'paper-36x24',
    label: 'Archival Fine-Art Paper (Large)',
    dimensions: '36" × 24"',
    medium: '310 gsm museum archival matte paper, unframed',
    inr: 13500,
    usd: 220,
    shippingIndia: 'Free rolled-tube delivery across India',
    shippingIntl: 'International tube courier at actuals',
    wallWidthPct: 58,
    wallAspect: 'aspect-[3/2]',
  },
  {
    id: 'painting-3x2',
    label: 'Bespoke Acrylic Painting',
    dimensions: '36" × 24" (3×2 ft min.)',
    medium: 'Hand-painted acrylic on heavy canvas by Anukta Mukherjee Ghosh',
    inr: 35000,
    usd: 480,
    shippingIndia: '3-week studio turnaround • 50% advance • Free India shipping',
    shippingIntl: 'Shipped rolled internationally at actuals',
    wallWidthPct: 62,
    wallAspect: 'aspect-[3/2]',
    badge: 'One-of-One Commission',
  },
];

export const CONTACT_INFO = {
  email: 'rovingeyes2020@gmail.com',
  whatsappPrimary: {
    display: '+91 98303 67890',
    digits: '919830367890',
    city: 'Kolkata & North Bengal Desk',
  },
  whatsappSecondary: {
    display: '+91 95990 91712',
    digits: '919599091712',
    city: 'Expeditions & Delhi-NCR Desk',
  },
  instagram: 'https://www.instagram.com/rovingeyes2020/',
  facebook: 'https://www.facebook.com/XploreXpose2020/',
};

export function formatPrice(inr: number, usd: number, currency: Currency): string {
  if (currency === 'INR') {
    return `₹${inr.toLocaleString('en-IN')}`;
  }
  return `$${usd.toLocaleString('en-US')}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CONTACT_INFO.whatsappPrimary.digits}?text=${encodeURIComponent(message)}`;
}

export const HERO_SLIDES = [
  {
    code: 'A04',
    title: 'Citadel Above the Spiti Gorge',
    location: 'Key Monastery, Spiti Valley — Himachal Pradesh',
    imageUrl: 'https://images.unsplash.com/photo-1653844573020-71f77a0ccb8c?w=1400&auto=format&fit=crop&q=85',
  },
  {
    code: 'P02',
    title: 'First Light Over Darjeeling Mist',
    location: 'Eastern Himalayas — North Bengal',
    imageUrl: 'https://images.unsplash.com/photo-1455157823797-3019317cbcf0?w=1400&auto=format&fit=crop&q=85',
  },
  {
    code: 'M04',
    title: 'Pass Into the Clouds',
    location: 'High Mountain Switchbacks — Uttarakhand',
    imageUrl: 'https://images.unsplash.com/photo-1439751879295-65c93df51f67?w=1400&auto=format&fit=crop&q=85',
  },
  {
    code: 'B03',
    title: 'Fishermen at Ebb Tide',
    location: 'Bay of Bengal Coast — Odisha',
    imageUrl: 'https://images.unsplash.com/photo-1771765497379-961c1398be0a?w=1400&auto=format&fit=crop&q=85',
  },
];

export const ARTWORKS: Artwork[] = [
  {
    id: 'a04',
    code: 'A04',
    title: 'Citadel Above the Spiti Gorge',
    collection: 'Landscapes',
    location: 'Key Monastery, Spiti Valley',
    story:
      'Captured at 4,166 meters as morning cold lifted off the Spiti riverbed, revealing the centuries-old whitewashed monastery carved into slate.',
    imageUrl: 'https://images.unsplash.com/photo-1653844573020-71f77a0ccb8c?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Indranil Kar',
    capturedOn: 'Digital Full-Frame',
  },
  {
    id: 'a12',
    code: 'A12',
    title: 'Settlement Under Winter Giants',
    collection: 'Landscapes',
    location: 'Highland Basin, Ladakh',
    story:
      'Isolated earthen dwellings holding warmth beneath the shadowed flanks of snow-dusted Himalayan ridges.',
    imageUrl: 'https://images.unsplash.com/photo-1746093846930-ab89242b9fb9?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Indranil Kar',
    capturedOn: 'Digital Full-Frame',
  },
  {
    id: 'b03',
    code: 'B03',
    title: 'Fishermen at Ebb Tide',
    collection: 'Seascapes',
    location: 'Bay of Bengal Coast, Odisha',
    story:
      'Long-shore fishermen hauling drift nets through amber twilight surf along the quiet northern Odisha coastline.',
    imageUrl: 'https://images.unsplash.com/photo-1771765497379-961c1398be0a?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Dr. Anindya Kumar Maity',
    capturedOn: 'Digital Full-Frame',
  },
  {
    id: 'b11',
    code: 'B11',
    title: 'Crossing the Dawn Mist',
    collection: 'Seascapes',
    location: 'Lower Deltaic Channel, West Bengal',
    story:
      'A wooden ferry emerges out of early morning estuary fog as tidal waters turn silver in the delta.',
    imageUrl: 'https://images.unsplash.com/photo-1768844335653-7593a132c203?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Dr. Anindya Kumar Maity',
    capturedOn: 'Digital Full-Frame',
  },
  {
    id: 'c07',
    code: 'C07',
    title: 'Dusk Rhythm on the Avenue',
    collection: 'Life',
    location: 'Old Quarter, Kolkata',
    story:
      'Golden hour traffic, street vendors, and vintage silhouettes weaving through historic Bengal thoroughfares.',
    imageUrl: 'https://images.unsplash.com/photo-1760782065835-a6a5e06509c3?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Dr. Anindya Kumar Maity',
    capturedOn: '35mm Prime',
  },
  {
    id: 'c19',
    code: 'C19',
    title: 'Waiting for the Tide’s Return',
    collection: 'Life',
    location: 'Eastern Coastline, India',
    story:
      'A solitary fisherman walks the wet shoreline after unloading the dawn catch.',
    imageUrl: 'https://images.unsplash.com/photo-1722109638073-48a26e6a16af?w=1400&auto=format&fit=crop&q=85',
    aspect: 'portrait',
    photographer: 'Dr. Anindya Kumar Maity',
    capturedOn: '50mm Prime',
  },
  {
    id: 'd08',
    code: 'D08',
    title: 'Prayer Flags & Granite Silence',
    collection: 'Moods',
    location: 'Langza Plateau, Spiti Valley',
    story:
      'Ancient iconography facing unbroken Himalayan valleys at the edge of high-altitude stillness.',
    imageUrl: 'https://images.unsplash.com/photo-1628782379401-4fff9cdcbbfe?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Indranil Kar',
    capturedOn: 'Expedition Series',
  },
  {
    id: 'd22',
    code: 'D22',
    title: 'Clay Lamp Before Sunrise',
    collection: 'Moods',
    location: 'Riverbank Steps, Eastern India',
    story:
      'A single earthenware lamp flickers against river mist before the morning bells echo across the ghats.',
    imageUrl: 'https://images.unsplash.com/photo-1755781367841-224a84f4a0bc?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Dr. Anindya Kumar Maity',
    capturedOn: 'Low-Light Study',
  },
  {
    id: 'm04',
    code: 'M04',
    title: 'Pass Into the Clouds',
    collection: 'Monochrome',
    location: 'Garhwal Mountain Corridor',
    story:
      'Silver-gelatin tonal study of monsoon fog swallowing a winding Himalayan mountain pass.',
    imageUrl: 'https://images.unsplash.com/photo-1439751879295-65c93df51f67?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Indranil Kar',
    capturedOn: 'Monochrome Study',
  },
  {
    id: 'm15',
    code: 'M15',
    title: 'Monochrome Promenade',
    collection: 'Monochrome',
    location: 'Seafront Walk, India',
    story:
      'High-contrast study of monsoon winds, figures in motion, and salt spray along the coastal seawall.',
    imageUrl: 'https://images.unsplash.com/photo-1753806389160-162eeec494c8?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Dr. Anindya Kumar Maity',
    capturedOn: 'Monochrome Study',
  },
  {
    id: 'p02',
    code: 'P02',
    title: 'Emerald Slopes in Low Cloud',
    collection: 'Panoramas',
    location: 'Darjeeling & Kurseong Ridge, West Bengal',
    story:
      'Sweeping panoramic study of terraced tea estates emerging out of monsoon cloud cover.',
    imageUrl: 'https://images.unsplash.com/photo-1455157823797-3019317cbcf0?w=1400&auto=format&fit=crop&q=85',
    aspect: 'wide',
    photographer: 'Dr. Anindya Kumar Maity',
    capturedOn: 'Multi-Frame Panorama',
  },
  {
    id: 'p09',
    code: 'P09',
    title: 'The Endless Ascent',
    collection: 'Panoramas',
    location: 'Trans-Himalayan Highway, Ladakh',
    story:
      'Wide-format vista tracing an unbroken thread of asphalt across arid high-altitude plateaus.',
    imageUrl: 'https://images.unsplash.com/photo-1643196539282-8a65ee03e715?w=1400&auto=format&fit=crop&q=85',
    aspect: 'wide',
    photographer: 'Indranil Kar',
    capturedOn: 'Multi-Frame Panorama',
  },
  {
    id: 'f06',
    code: 'F06',
    title: 'Switchbacks in Grain',
    collection: 'Analogue',
    location: 'North Bengal Foothills',
    story:
      'Shot on 35mm film during an autumn ascent through pine forests and damp mountain air.',
    imageUrl: 'https://images.unsplash.com/photo-1711087172637-494802c7f0c5?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Indranil Kar',
    capturedOn: '35mm Analogue Film',
  },
  {
    id: 'f19',
    code: 'F19',
    title: 'Misty Timberline Curve',
    collection: 'Analogue',
    location: 'Sikkim Border Road',
    story:
      'Natural grain and muted tones captured on celluloid as afternoon fog rolled across the pass.',
    imageUrl: 'https://images.unsplash.com/photo-1693651632935-0db9286c11e0?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Dr. Anindya Kumar Maity',
    capturedOn: '35mm Analogue Film',
  },
  {
    id: 'x05',
    code: 'X05',
    title: 'Dawn Crossing on Golden Water',
    collection: 'New Arrivals',
    location: 'Eastern Riverbank, India',
    story:
      'Recent 2026 release capturing passengers leaning into first sunbeams across calm winter water.',
    imageUrl: 'https://images.unsplash.com/photo-1677047760488-3cb44e916553?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Dr. Anindya Kumar Maity',
    capturedOn: '2026 Archive Release',
  },
  {
    id: 'x16',
    code: 'X16',
    title: 'Terraces Under Gathering Rain',
    collection: 'New Arrivals',
    location: 'Kalimpong & Mirik Hills',
    story:
      'Fresh addition from the Eastern Himalayan hills just before the first pre-monsoon squall.',
    imageUrl: 'https://images.unsplash.com/photo-1470087167738-6aa485ff65dc?w=1400&auto=format&fit=crop&q=85',
    aspect: 'landscape',
    photographer: 'Dr. Anindya Kumar Maity',
    capturedOn: '2026 Archive Release',
  },
];

export const PAINTING_COMPARISON_IMAGE =
  'https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?w=1400&auto=format&fit=crop&q=85';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Dr. Anindya Kumar Maity',
    role: 'Co-Founder & Documentary Photographer',
    region: 'Kolkata & Rural North Bengal',
    bio: 'A practising physician in rural North Bengal whose lens follows life from Kolkata’s heritage lanes to tea estates, river deltas, and eastern Himalayan foothills.',
    highlights: ['Street, River & Tea Country Archives', '35mm Analogue & Coastal Studies'],
    portraitUrl: 'https://images.unsplash.com/photo-1661024223860-0ca6f49a8b69?w=1000&auto=format&fit=crop&q=85',
  },
  {
    name: 'Indranil Kar',
    role: 'Co-Founder & Expedition Photographer',
    region: 'Himalayas, Sikkim, Spiti & Ladakh',
    bio: 'Seasoned Himalayan trekker and adventure expedition leader documenting high-altitude passes, remote monasteries, and fleeting weather windows above 4,000 meters.',
    highlights: ['High-Altitude Landscapes & Panoramas', 'Sikkim, Ladakh, Spiti & Uttarakhand'],
    portraitUrl: 'https://images.unsplash.com/photo-1762374009049-9382347bebd1?w=1000&auto=format&fit=crop&q=85',
  },
  {
    name: 'Anukta Mukherjee Ghosh',
    role: 'Resident Fine Artist — Bespoke Commissions',
    region: 'Kolkata • Collectors Worldwide',
    bio: 'Transforms any Roving Eyes photograph into a one-of-one hand-painted acrylic canvas. Her works hang in private and hospitality collections across India, the US, UK, Dubai, and New Zealand.',
    highlights: ['ITC Ltd. – Hotels Division Placement', 'London Restaurant Chain & Global Collectors'],
    portraitUrl: 'https://images.unsplash.com/photo-1758522275143-e89af39ec690?w=1000&auto=format&fit=crop&q=85',
  },
];
