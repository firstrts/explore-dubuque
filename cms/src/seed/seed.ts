/**
 * Seed script — run once to populate the CMS with initial data.
 * Usage: npx ts-node --project tsconfig.json src/seed/seed.ts
 *
 * Requires PAYLOAD_SECRET and DATABASE_URI in .env
 */

import dotenv from 'dotenv'
dotenv.config()

import payload from 'payload'
import config from '../payload.config'

// ── Seed data ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: 'Dining & Drinks', slug: 'dining-drinks', icon: 'UtensilsCrossed', sortOrder: 1, description: 'Restaurants, bars, breweries, cafes, and everything in between.' },
  { name: 'Attractions & Sightseeing', slug: 'attractions-sightseeing', icon: 'Binoculars', sortOrder: 2, description: 'Dubuque\'s top landmarks, museums, and must-see spots.' },
  { name: 'Outdoors & Recreation', slug: 'outdoors-recreation', icon: 'TreePine', sortOrder: 3, description: 'Parks, trails, river activities, and outdoor adventures.' },
  { name: 'Arts & Culture', slug: 'arts-culture', icon: 'Palette', sortOrder: 4, description: 'Galleries, theaters, live music, and cultural events.' },
  { name: 'Shopping', slug: 'shopping', icon: 'ShoppingBag', sortOrder: 5, description: 'Boutiques, antiques, local markets, and specialty shops.' },
  { name: 'Lodging & Stays', slug: 'lodging-stays', icon: 'BedDouble', sortOrder: 6, description: 'Hotels, B&Bs, vacation rentals, and unique places to stay.' },
  { name: 'Services & Local Resources', slug: 'services-local-resources', icon: 'Wrench', sortOrder: 7, description: 'Essential services, community resources, and local utilities.' },
]

const NEIGHBORHOODS = [
  { name: 'Downtown', slug: 'downtown', sortOrder: 1, description: 'The heart of Dubuque — historic architecture, riverfront dining, and the bustling Main Street District.', lat: 42.4975, lng: -90.6641 },
  { name: 'Millwork District', slug: 'millwork-district', sortOrder: 2, description: 'Dubuque\'s creative hub — restored brick warehouses now home to artists, breweries, and makers.', lat: 42.5025, lng: -90.6590 },
  { name: 'Cable Car Square / Historic Bluffs', slug: 'cable-car-square', sortOrder: 3, description: 'Charming hilltop shopping district with antiques, boutiques, and stunning river views.', lat: 42.4942, lng: -90.6745 },
  { name: 'North End', slug: 'north-end', sortOrder: 4, description: 'A vibrant, diverse neighborhood with local diners, family businesses, and community spirit.', lat: 42.5120, lng: -90.6688 },
  { name: 'West End / Asbury Area', slug: 'west-end', sortOrder: 5, description: 'Growing suburban area with shopping centers, family restaurants, and newer developments.', lat: 42.5010, lng: -90.7150 },
  { name: 'South End', slug: 'south-end', sortOrder: 6, description: 'Quiet residential neighborhoods south of downtown with local gems worth discovering.', lat: 42.4830, lng: -90.6720 },
]

const LISTINGS = [
  // ── Dining & Drinks ─────────────────────────────────────────────────────
  {
    name: 'The Brazen Open Kitchen + Bar',
    slug: 'the-brazen-open-kitchen-bar',
    description: 'Farm-to-table cuisine in a stylish, open-concept space inside Hotel Julien Dubuque. Known for creative cocktails and locally sourced ingredients.',
    category: 'dining-drinks',
    neighborhood: 'downtown',
    address: '200 Main St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    phone: '(563) 690-1900',
    website: 'https://hoteljuliendubuque.com/dining',
    lat: 42.4967, lng: -90.6642,
    tags: [{ tag: 'Locally Owned' }, { tag: 'Reservation Required' }],
    tier: 'featured', isFeatured: true, status: 'published',
  },
  {
    name: 'Woodfire Dubuque',
    slug: 'woodfire-dubuque',
    description: 'Upscale wood-fired dining featuring handmade pasta, artisan pizzas, and an extensive wine list. A local favorite for date nights and special occasions.',
    category: 'dining-drinks',
    neighborhood: 'downtown',
    address: '333 E 10th St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.5008, lng: -90.6601,
    tags: [{ tag: 'Reservation Required' }, { tag: 'Locally Owned' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Textile Brewing Co.',
    slug: 'textile-brewing-co',
    description: 'Craft brewery in the historic Millwork District with rotating taps, live music, and a dog-friendly taproom. Classic Midwestern hospitality with exceptional beers.',
    category: 'dining-drinks',
    neighborhood: 'millwork-district',
    address: '128 E 3rd St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.5022, lng: -90.6592,
    tags: [{ tag: 'Dog-Friendly' }, { tag: 'Live Music' }, { tag: 'Locally Owned' }],
    tier: 'featured', isFeatured: true, status: 'published',
  },
  {
    name: 'Frank O\'Dowd\'s Irish Pub',
    slug: 'frank-odowd-irish-pub',
    description: 'Authentic Irish pub with live music, Guinness on tap, and a warm, welcoming atmosphere. A Dubuque institution since 2001.',
    category: 'dining-drinks',
    neighborhood: 'downtown',
    address: '535 Hill St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.4935, lng: -90.6738,
    tags: [{ tag: 'Live Music' }, { tag: 'Happy Hour' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Shot Tower Inn',
    slug: 'shot-tower-inn',
    description: 'Family-owned neighborhood bar and grill serving classic American comfort food. Famous for their burgers and Friday fish fry.',
    category: 'dining-drinks',
    neighborhood: 'downtown',
    address: '390 Locust St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.4978, lng: -90.6655,
    tags: [{ tag: 'Family-Friendly' }, { tag: 'Locally Owned' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Convivium Urban Farmstead',
    slug: 'convivium-urban-farmstead',
    description: 'A beloved community food hub with a café, farm-to-table events, cooking classes, and a commitment to local food systems.',
    category: 'dining-drinks',
    neighborhood: 'south-end',
    address: '2811 Jackson St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.4847, lng: -90.6692,
    tags: [{ tag: 'Locally Owned' }, { tag: 'Family-Friendly' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Smokestack',
    slug: 'smokestack-dubuque',
    description: 'The premier live music venue in Dubuque, housed in a historic building with craft cocktails, local beers, and national touring acts.',
    category: 'dining-drinks',
    neighborhood: 'downtown',
    address: '62 E 7th St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.4990, lng: -90.6625,
    tags: [{ tag: 'Live Music' }, { tag: 'Late Night' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Monk\'s Kaffee Pub',
    slug: 'monks-kaffee-pub',
    description: 'A cozy European-inspired café and pub with an outstanding selection of craft beers, wines, coffee, and board games.',
    category: 'dining-drinks',
    neighborhood: 'cable-car-square',
    address: '373 Bluff St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.4947, lng: -90.6755,
    tags: [{ tag: 'Locally Owned' }, { tag: 'Happy Hour' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },

  // ── Attractions & Sightseeing ─────────────────────────────────────────
  {
    name: 'National Mississippi River Museum & Aquarium',
    slug: 'national-mississippi-river-museum-aquarium',
    description: 'A Smithsonian-affiliated museum exploring the Mississippi River ecosystem, history, and culture. Features live animals, interactive exhibits, and the iconic River of Giants Gallery.',
    category: 'attractions-sightseeing',
    neighborhood: 'downtown',
    address: '350 E 3rd St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    phone: '(563) 557-9545',
    website: 'https://rivermuseum.com',
    lat: 42.5037, lng: -90.6559,
    tags: [{ tag: 'Family-Friendly' }, { tag: 'Wheelchair Accessible' }, { tag: 'Waterfront' }],
    tier: 'featured', isFeatured: true, status: 'published',
  },
  {
    name: 'Fenelon Place Elevator',
    slug: 'fenelon-place-elevator',
    description: 'The world\'s shortest and steepest scenic railway, operating since 1882. Ride to the top for stunning panoramic views of the Mississippi River and three states.',
    category: 'attractions-sightseeing',
    neighborhood: 'cable-car-square',
    address: '512 Fenelon Pl',
    city: 'Dubuque', state: 'IA', zip: '52001',
    website: 'https://fenelonplaceelevator.com',
    lat: 42.4940, lng: -90.6756,
    tags: [{ tag: 'Historic' }, { tag: 'Waterfront' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Dubuque Arboretum & Botanical Gardens',
    slug: 'dubuque-arboretum-botanical-gardens',
    description: 'Free public gardens with themed sections including Japanese, rose, and annual gardens. A peaceful escape with over 20 unique garden collections.',
    category: 'attractions-sightseeing',
    neighborhood: 'west-end',
    address: '3800 Arboretum Dr',
    city: 'Dubuque', state: 'IA', zip: '52001',
    website: 'https://dubuquearboretum.com',
    lat: 42.5020, lng: -90.7381,
    tags: [{ tag: 'Family-Friendly' }, { tag: 'Dog-Friendly' }, { tag: 'Wheelchair Accessible' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Dubuque Riverboat Museum',
    slug: 'dubuque-riverboat-museum',
    description: 'Explore the history of riverboating on the Mississippi aboard a restored dredge boat. A fascinating window into Dubuque\'s river heritage.',
    category: 'attractions-sightseeing',
    neighborhood: 'downtown',
    address: '350 E 3rd St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.5040, lng: -90.6560,
    tags: [{ tag: 'Historic' }, { tag: 'Waterfront' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Mathias Ham House Historic Site',
    slug: 'mathias-ham-house',
    description: 'An 1857 Italianate mansion offering tours into Dubuque\'s prosperous past. One of the finest examples of period architecture in the Midwest.',
    category: 'attractions-sightseeing',
    neighborhood: 'north-end',
    address: '2241 Lincoln Ave',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.5180, lng: -90.6540,
    tags: [{ tag: 'Historic' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },

  // ── Outdoors & Recreation ─────────────────────────────────────────────
  {
    name: 'Mines of Spain Recreation Area',
    slug: 'mines-of-spain-recreation-area',
    description: 'Over 1,380 acres of bluffs, prairies, and wooded trails along the Mississippi River. Features the E.B. Lyons Interpretive Center and stunning bluff overlooks.',
    category: 'outdoors-recreation',
    neighborhood: 'south-end',
    address: '8999 Bellevue Heights Rd',
    city: 'Dubuque', state: 'IA', zip: '52003',
    lat: 42.4610, lng: -90.6420,
    tags: [{ tag: 'Dog-Friendly' }, { tag: 'Historic' }, { tag: 'Waterfront' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Eagle Point Park',
    slug: 'eagle-point-park',
    description: 'A stunning 164-acre park on the bluffs above the Mississippi River, featuring historic WPA shelters, sweeping river views, a pool, and excellent hiking.',
    category: 'outdoors-recreation',
    neighborhood: 'north-end',
    address: '2601 Shiras Ave',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.5258, lng: -90.6319,
    tags: [{ tag: 'Family-Friendly' }, { tag: 'Dog-Friendly' }, { tag: 'Waterfront' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Swiss Valley Nature Preserve',
    slug: 'swiss-valley-nature-preserve',
    description: 'A 700-acre nature center with hiking trails, a nature center, trout fishing, cross-country skiing, and a summer camp. Great for all ages year-round.',
    category: 'outdoors-recreation',
    neighborhood: 'west-end',
    address: '13606 Swiss Valley Rd',
    city: 'Peosta', state: 'IA', zip: '52068',
    lat: 42.5260, lng: -90.8150,
    tags: [{ tag: 'Family-Friendly' }, { tag: 'Dog-Friendly' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Dubuque County Fairgrounds',
    slug: 'dubuque-county-fairgrounds',
    description: 'Home of the Dubuque County Fair and year-round events including concerts, equestrian shows, and community gatherings.',
    category: 'outdoors-recreation',
    neighborhood: 'west-end',
    address: '14569 Old Highway Rd',
    city: 'Dubuque', state: 'IA', zip: '52002',
    lat: 42.5197, lng: -90.7568,
    tags: [{ tag: 'Family-Friendly' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },

  // ── Arts & Culture ─────────────────────────────────────────────────────
  {
    name: 'Dubuque Museum of Art',
    slug: 'dubuque-museum-of-art',
    description: 'The only art museum in Iowa accredited by the American Alliance of Museums. Features regional, national, and international exhibitions in a stunning historic building.',
    category: 'arts-culture',
    neighborhood: 'downtown',
    address: '701 Locust St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    phone: '(563) 557-1851',
    website: 'https://dbqart.org',
    lat: 42.4970, lng: -90.6650,
    tags: [{ tag: 'Wheelchair Accessible' }, { tag: 'Historic' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Five Flags Center',
    slug: 'five-flags-center',
    description: 'Dubuque\'s premier entertainment venue hosting concerts, sporting events, and Broadway touring productions. Historic theater and modern arena under one roof.',
    category: 'arts-culture',
    neighborhood: 'downtown',
    address: '405 Main St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    phone: '(563) 589-4254',
    website: 'https://fiveflagscenter.com',
    lat: 42.4960, lng: -90.6647,
    tags: [{ tag: 'Wheelchair Accessible' }, { tag: 'Historic' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Grand Opera House',
    slug: 'grand-opera-house',
    description: 'A beautifully restored 1890 opera house presenting professional theater, dance, and music in one of Dubuque\'s most beloved historic venues.',
    category: 'arts-culture',
    neighborhood: 'downtown',
    address: '135 W 8th St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    website: 'https://thegrandoperahouse.com',
    lat: 42.4980, lng: -90.6672,
    tags: [{ tag: 'Historic' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Voices from the Warehouse District',
    slug: 'voices-from-the-warehouse-district',
    description: 'Walking audio tour of the Millwork District exploring the stories of former workers, residents, and the industrial heritage of Dubuque.',
    category: 'arts-culture',
    neighborhood: 'millwork-district',
    address: '900 Jackson St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.5030, lng: -90.6580,
    tags: [{ tag: 'Historic' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },

  // ── Shopping ───────────────────────────────────────────────────────────
  {
    name: 'The Vintage Rabbit',
    slug: 'the-vintage-rabbit',
    description: 'Curated vintage clothing, furniture, and home décor in the heart of Cable Car Square. A treasure trove for antique lovers and style seekers.',
    category: 'shopping',
    neighborhood: 'cable-car-square',
    address: '381 Bluff St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.4945, lng: -90.6758,
    tags: [{ tag: 'Locally Owned' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Dubuque Farmers\' Market',
    slug: 'dubuque-farmers-market',
    description: 'One of Iowa\'s largest outdoor farmers\' markets, running Saturday mornings May–October in downtown Dubuque. Local produce, baked goods, crafts, and live music.',
    category: 'shopping',
    neighborhood: 'downtown',
    address: 'Iowa St & 11th St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.5002, lng: -90.6635,
    tags: [{ tag: 'Family-Friendly' }, { tag: 'Dog-Friendly' }, { tag: 'Locally Owned' }, { tag: 'Live Music' }],
    tier: 'featured', isFeatured: true, status: 'published',
  },
  {
    name: 'Bluff Street Antiques',
    slug: 'bluff-street-antiques',
    description: 'Multi-dealer antique mall with thousands of items spanning furniture, jewelry, collectibles, and vintage Americana. The largest antique shop in Dubuque.',
    category: 'shopping',
    neighborhood: 'cable-car-square',
    address: '357 Bluff St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.4948, lng: -90.6752,
    tags: [{ tag: 'Locally Owned' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Kennedy Mall',
    slug: 'kennedy-mall',
    description: 'Dubuque\'s largest indoor shopping mall with major retailers, dining, and entertainment. The go-to destination for everyday shopping on the west side.',
    category: 'shopping',
    neighborhood: 'west-end',
    address: '555 JFK Rd',
    city: 'Dubuque', state: 'IA', zip: '52002',
    website: 'https://kennedymall.com',
    lat: 42.5082, lng: -90.7450,
    tags: [{ tag: 'Wheelchair Accessible' }, { tag: 'Family-Friendly' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },

  // ── Lodging & Stays ────────────────────────────────────────────────────
  {
    name: 'Hotel Julien Dubuque',
    slug: 'hotel-julien-dubuque',
    description: 'A legendary 1839 historic hotel in the heart of downtown. Elegantly restored with 130 rooms, a rooftop terrace, spa, and the acclaimed Brazen restaurant.',
    category: 'lodging-stays',
    neighborhood: 'downtown',
    address: '200 Main St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    phone: '(563) 556-4200',
    website: 'https://hoteljuliendubuque.com',
    lat: 42.4967, lng: -90.6642,
    tags: [{ tag: 'Historic' }, { tag: 'Wheelchair Accessible' }],
    tier: 'premium', isFeatured: true, status: 'published',
  },
  {
    name: 'The Richards House B&B',
    slug: 'the-richards-house-bb',
    description: 'An 1883 Stick Style Victorian mansion with eight uniquely decorated guest rooms, original stained glass, and sumptuous breakfasts. Iowa\'s most stunning B&B.',
    category: 'lodging-stays',
    neighborhood: 'south-end',
    address: '1492 Locust St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    phone: '(563) 557-1492',
    website: 'https://therichardshouse.com',
    lat: 42.4890, lng: -90.6688,
    tags: [{ tag: 'Historic' }, { tag: 'Locally Owned' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Holiday Inn Dubuque / Galena',
    slug: 'holiday-inn-dubuque',
    description: 'Full-service hotel with indoor pool, fitness center, and on-site restaurant. Convenient location near major interstates and downtown Dubuque.',
    category: 'lodging-stays',
    neighborhood: 'west-end',
    address: '450 Main St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    lat: 42.5085, lng: -90.7320,
    tags: [{ tag: 'Wheelchair Accessible' }, { tag: 'Family-Friendly' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },

  // ── Services & Local Resources ─────────────────────────────────────────
  {
    name: 'Carnegie-Stout Public Library',
    slug: 'carnegie-stout-public-library',
    description: 'Dubuque\'s historic public library offering books, digital resources, community meeting rooms, and free programming for all ages.',
    category: 'services-local-resources',
    neighborhood: 'downtown',
    address: '360 W 11th St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    phone: '(563) 589-4225',
    website: 'https://csldubuque.org',
    lat: 42.5005, lng: -90.6698,
    tags: [{ tag: 'Wheelchair Accessible' }, { tag: 'Family-Friendly' }],
    tier: 'basic', isFeatured: false, status: 'published',
  },
  {
    name: 'Greater Dubuque Development Corp.',
    slug: 'greater-dubuque-development',
    description: 'Economic development organization supporting business growth, workforce development, and community investment in the Dubuque region.',
    category: 'services-local-resources',
    neighborhood: 'downtown',
    address: '900 Jackson St',
    city: 'Dubuque', state: 'IA', zip: '52001',
    website: 'https://greaterdubuque.org',
    lat: 42.5028, lng: -90.6580,
    tags: [],
    tier: 'basic', isFeatured: false, status: 'published',
  },
]

// ── Run ───────────────────────────────────────────────────────────────────

async function seed() {
  await payload.init({ secret: process.env.PAYLOAD_SECRET!, config, local: true })

  console.log('🌱 Seeding categories...')
  const categoryMap: Record<string, string> = {}
  for (const cat of CATEGORIES) {
    const existing = await payload.find({ collection: 'categories', where: { slug: { equals: cat.slug } }, limit: 1 })
    if (existing.docs.length) {
      categoryMap[cat.slug] = existing.docs[0].id
      console.log(`  ✓ ${cat.name} (existing)`)
    } else {
      const created = await payload.create({ collection: 'categories', data: cat })
      categoryMap[cat.slug] = created.id
      console.log(`  + ${cat.name}`)
    }
  }

  console.log('\n🌱 Seeding neighborhoods...')
  const hoodMap: Record<string, string> = {}
  for (const hood of NEIGHBORHOODS) {
    const existing = await payload.find({ collection: 'neighborhoods', where: { slug: { equals: hood.slug } }, limit: 1 })
    if (existing.docs.length) {
      hoodMap[hood.slug] = existing.docs[0].id
      console.log(`  ✓ ${hood.name} (existing)`)
    } else {
      const created = await payload.create({ collection: 'neighborhoods', data: hood })
      hoodMap[hood.slug] = created.id
      console.log(`  + ${hood.name}`)
    }
  }

  console.log('\n🌱 Seeding listings...')
  for (const listing of LISTINGS) {
    const existing = await payload.find({ collection: 'listings', where: { slug: { equals: listing.slug } }, limit: 1 })
    if (existing.docs.length) {
      console.log(`  ✓ ${listing.name} (existing)`)
      continue
    }

    const data = {
      ...listing,
      category: categoryMap[listing.category],
      neighborhood: listing.neighborhood ? hoodMap[listing.neighborhood] : undefined,
    }

    await payload.create({ collection: 'listings', data })
    console.log(`  + ${listing.name}`)
  }

  console.log('\n✅ Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
