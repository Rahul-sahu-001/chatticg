import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'chitrakote-falls',
    name: 'Chitrakote Waterfalls',
    nativeName: 'चित्रकूट जलप्रपात (The Niagara of India)',
    district: 'Bastar',
    region: 'Bastar & South',
    altitude: '1,820 ft (555 m)',
    coordinates: { lat: 19.2015, lng: 81.7108, mapX: 48, mapY: 78 },
    community: 'Maria & Muria Gond, Halba',
    description: 'India’s widest waterfall, spanning nearly 300 meters across a horseshoe-shaped gorge on the sacred Indravati River. During monsoons, it roars with wild ochre power; in winter and spring, it transforms into crystalline emerald cascades.',
    whySpecial: 'Often crowned the "Niagara of India". Deeply revered by local Bastar tribes, surrounded by dense sal forests and sacred groves where indigenous fishermen navigate traditional country boats in the mist.',
    bestTime: 'July to March (Peak roar in Aug-Oct; clear turquoise pools in Nov-Feb)',
    howToReach: {
      gateway: 'Jagdalpur (38 km) / Raipur (295 km)',
      roadTransit: 'Scenic 45-min highway drive from Jagdalpur through sal-dappled Bastar plateau; state buses and green electric cabs available.',
      nearestAir: 'Jagdalpur Airport (JGB - 42 km) or Raipur Swami Vivekananda Airport (RPR - 305 km)',
      nearestRail: 'Jagdalpur Railway Station (JDB - 38 km)'
    },
    tourismLoad: 'MODERATE',
    currentVisitors: 420,
    capacityLimit: 850,
    crowdTrend: [15, 22, 45, 78, 85, 60, 40, 20],
    recommendedTime: 'Early morning (06:30 - 09:30 AM) or Golden Sunset (04:30 - 06:15 PM)',
    alternativeDestinations: ['tamda-ghumar', 'mendri-ghumar', 'tirathgarh-falls'],
    nearbyExperiences: [
      'Indravati river boat ride to the splash zone with local Gond boatmen',
      'Sunset photography over the horseshoe canyon rim',
      'Taste Mahua blossom cooler at the eco-kiosk'
    ],
    festivals: ['Bastar Dussehra', 'Chitrakote Mahotsav (February)'],
    localFood: ['Chila with spicy tomato-garlic chutney', 'Fara steamed dumplings', 'Pehj corn broth'],
    homestaysCount: 8,
    approximateBudget: '₹1,800 - ₹3,200 / day',
    localImpactRatio: 0.89,
    difficulty: 'Easy',
    tags: ['Waterfall', 'Niagara of India', 'Indravati', 'Bastar', 'Scenic Gorge'],
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Never cross safety barriers onto slick gorge rocks during high flow.',
      'Single-use plastic bottles are strictly prohibited along the gorge promenade.',
      'Purchase handicrafts directly from the Tribal Cooperative society on the upper ridge.'
    ],
    category: 'waterfalls',
    verifiedBadge: true,
    rating: 4.9,
    reviewsCount: 384
  },
  {
    id: 'tirathgarh-falls',
    name: 'Tirathgarh Falls',
    nativeName: 'तीरथगढ़ जलप्रपात (The Milky Cascades)',
    district: 'Bastar',
    region: 'Bastar & South',
    altitude: '1,960 ft (598 m)',
    coordinates: { lat: 18.9135, lng: 81.8647, mapX: 52, mapY: 84 },
    community: 'Dhurwa & Gond',
    description: 'A breathtaking 300-foot multi-tiered cascade inside Kanger Valley National Park on the Kanger River tributary (Mungabahar). The water breaks into countless white rivulets resembling bridal silk over stepped sandstone ledges.',
    whySpecial: 'Houses an ancient Shiva-Parvati cliffside shrine dating back centuries. The cool microclimate sustains rare ferns, medicinal forest trees, and vibrant butterflies.',
    bestTime: 'September to March',
    howToReach: {
      gateway: 'Jagdalpur (35 km)',
      roadTransit: 'Well-paved national park road branching off NH-30 through virgin teak and bamboo groves.',
      nearestAir: 'Jagdalpur Airport (36 km)',
      nearestRail: 'Jagdalpur (35 km)'
    },
    tourismLoad: 'LOW',
    currentVisitors: 190,
    capacityLimit: 600,
    crowdTrend: [10, 20, 35, 45, 50, 35, 25, 10],
    recommendedTime: 'Morning 08:00 AM - 11:30 AM',
    alternativeDestinations: ['chitrakote-falls', 'kanger-valley'],
    nearbyExperiences: [
      'Descent down the stepped trail to the lower natural splash pool',
      'Forest birdwatching for the Indian Paradise Flycatcher',
      'Visit the ancient stone shrine under the banyan canopy'
    ],
    festivals: ['Maha Shivaratri Fair', 'Goncha Festival'],
    localFood: ['Bafauri steamed dumplings', 'Forest wild berry cooler', 'Angakar Roti'],
    homestaysCount: 5,
    approximateBudget: '₹1,500 - ₹2,800 / day',
    localImpactRatio: 0.92,
    difficulty: 'Moderate',
    tags: ['Waterfalls', 'Kanger Valley', 'Multi-Tier', 'Ancient Shrine', 'Biodiversity'],
    images: [
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Do not litter wrappers or bottles in the national park buffer zone.',
      'Wear sturdy walking shoes for the 200+ stone steps down to the base.',
      'Support the community-run forest canteen managed by the Van Suraksha Samiti.'
    ],
    category: 'waterfalls',
    verifiedBadge: true,
    rating: 4.8,
    reviewsCount: 290
  },
  {
    id: 'kanger-valley',
    name: 'Kanger Valley National Park & Kutumsar Caves',
    nativeName: 'कांगेर घाटी राष्ट्रीय उद्यान एवं कोटमसर गुफाएँ',
    district: 'Bastar',
    region: 'Bastar & South',
    altitude: '1,110 - 2,820 ft',
    coordinates: { lat: 18.892, lng: 81.938, mapX: 56, mapY: 86 },
    community: 'Dhurwa, Dorla',
    description: 'One of India’s most pristine biodiversity hotspots, sheltering the state bird (Bastar Hill Myna), leopards, wild buffaloes, and surreal subterranean limestone cave systems with stalactites and stalagmites.',
    whySpecial: 'Kutumsar Cave extends 330 meters into total pitch darkness where blind cave-dwelling fish (*Nemacheilus evezardi*) have adapted over millennia. Forest custodians guide travelers using torchlight.',
    bestTime: 'November to June (Caves remain closed during monsoons for safety)',
    howToReach: {
      gateway: 'Jagdalpur (30 km)',
      roadTransit: 'Forest gate permits issued at Kotamsar barrier; 4x4 gypsies and certified tribal naturalist guides required.',
      nearestAir: 'Jagdalpur Airport (32 km)',
      nearestRail: 'Jagdalpur (30 km)'
    },
    tourismLoad: 'MODERATE',
    currentVisitors: 310,
    capacityLimit: 500,
    crowdTrend: [5, 15, 55, 75, 70, 50, 20, 5],
    recommendedTime: 'Morning slot 09:00 AM - 12:00 PM (Batch entry inside cave)',
    alternativeDestinations: ['dandak-cave', 'kailash-caves', 'tirathgarh-falls'],
    nearbyExperiences: [
      'Subterranean spelunking through stalactite halls with Dhurwa tribal guides',
      'Listening to the Bastar Hill Myna mimicry calls along the Kanger river trail',
      'Nature walk through subterranean Dandak and Kailash cave networks'
    ],
    festivals: ['Van Mahotsav', 'Bastar Dussehra Forest Offering'],
    localFood: ['Amat bamboo shoot stew', 'Dubki Kadi', 'Woodfire-baked Sal leaf roti'],
    homestaysCount: 6,
    approximateBudget: '₹2,200 - ₹3,600 / day',
    localImpactRatio: 0.94,
    difficulty: 'Moderate',
    tags: ['National Park', 'Limestone Caves', 'Blind Fish', 'Wildlife', 'Eco-Tourism'],
    images: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Never touch or break delicate limestone stalactite formations that take thousands of years to grow.',
      'Maintain whisper-level silence inside caves to prevent acoustic trauma to roosting bats.',
      'Mandatory entry with certified tribal forest guide for visitor safety and community livelihoods.'
    ],
    category: 'wildlife',
    verifiedBadge: true,
    rating: 4.95,
    reviewsCount: 420
  },
  {
    id: 'sirpur-heritage',
    name: 'Sirpur Historical Complex',
    nativeName: 'सिरपुर ऐतिहासिक धरोहर स्थल (Shripur - City of Wealth)',
    district: 'Mahasamund',
    region: 'Central Plains',
    altitude: '870 ft (265 m)',
    coordinates: { lat: 21.3468, lng: 82.1764, mapX: 62, mapY: 48 },
    community: 'Traditional artisans, rural potters & farmers',
    description: 'An immense archaeological treasure on the banks of the sacred Mahanadi River. Sirpur was the 5th-8th century capital of South Kosala where Buddhist monasteries, Hindu temples, and Jain viharas coexisted in peace.',
    whySpecial: 'Home to the magnificent 7th-century Lakshmana Temple, India’s finest surviving red-brick temple with intricate terracotta carvings depicting Vishnu avatar legends, Krishna-lila, and Gandharvas.',
    bestTime: 'October to March (Pleasant sunny days for temple exploration)',
    howToReach: {
      gateway: 'Raipur (78 km)',
      roadTransit: 'Fast 1.5-hour drive via 4-lane NH-53; frequent tourist shuttles and private taxis.',
      nearestAir: 'Raipur Swami Vivekananda Airport (85 km)',
      nearestRail: 'Mahasamund (35 km) or Raipur Junction (78 km)'
    },
    tourismLoad: 'LOW',
    currentVisitors: 140,
    capacityLimit: 750,
    crowdTrend: [10, 25, 40, 50, 45, 30, 20, 5],
    recommendedTime: 'Golden morning 07:30 - 10:30 AM or late afternoon sunset over the brick spires',
    alternativeDestinations: ['bhoramdeo-temple', 'madku-dweep', 'champaran'],
    nearbyExperiences: [
      'Architectural walk of Anand Prabhu Kuti Vihara and Surang Tila',
      'Sunset meditation by the ancient Mahanadi river ghats',
      'Explore archaeological museum with ancient bronze statues'
    ],
    festivals: ['Sirpur National Dance & Music Festival (January)', 'Buddha Purnima'],
    localFood: ['Chhattisgarhi Thali with 7 wild greens (Bhaji)', 'Chila', 'Gulgula sweet dumplings'],
    homestaysCount: 7,
    approximateBudget: '₹1,400 - ₹2,600 / day',
    localImpactRatio: 0.86,
    difficulty: 'Easy',
    tags: ['Archaeology', 'Red Brick Temple', 'Buddhist Vihara', 'Mahanadi', '7th Century'],
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Do not climb or lean on ancient brick friezes and excavated stone bas-reliefs.',
      'Hire a local ASI-licensed rural storyteller guide to support community heritage preservation.',
      'Remove footwear at consecrated temple platforms.'
    ],
    category: 'heritage',
    verifiedBadge: true,
    rating: 4.88,
    reviewsCount: 310
  },
  {
    id: 'bhoramdeo-temple',
    name: 'Bhoramdeo Temple Complex',
    nativeName: 'भोरमदेव मंदिर (The Khajuraho of Chhattisgarh)',
    district: 'Kabirdham',
    region: 'Central Plains',
    altitude: '1,320 ft (402 m)',
    coordinates: { lat: 22.1187, lng: 81.1578, mapX: 34, mapY: 42 },
    community: 'Baiga & Gond tribes',
    description: 'A 1,000-year-old architectural jewel built between the 7th and 11th centuries by Nagwanshi rulers, framed against the misty backdrop of the Maikal mountain range.',
    whySpecial: 'Celebrated as the "Khajuraho of Chhattisgarh" for its exquisite stone carvings of deities, celestial dancers, elephants, and erotic friezes depicting the harmony of spiritual and temporal life.',
    bestTime: 'October to March',
    howToReach: {
      gateway: 'Kawardha (18 km) / Raipur (135 km)',
      roadTransit: 'Scenic rural highway through sugarcane fields and Baiga tribal hamlets with views of the Maikal hills.',
      nearestAir: 'Raipur Airport (145 km)',
      nearestRail: 'Bilaspur (115 km) or Raipur (135 km)'
    },
    tourismLoad: 'LOW',
    currentVisitors: 110,
    capacityLimit: 600,
    crowdTrend: [5, 20, 30, 45, 40, 25, 15, 5],
    recommendedTime: 'Sunrise at 06:30 AM when the eastern light illuminates the sanctum relief',
    alternativeDestinations: ['sirpur-heritage', 'madku-dweep'],
    nearbyExperiences: [
      'Visit nearby Madwa Mahal (wedding pavilion) and Cherki Mahal brick shrine',
      'Village interaction with Baiga medicine elders skilled in herbal forest lore',
      'Trek into the foot of the Maikal hills and Kanha buffer forest'
    ],
    festivals: ['Bhoramdeo Mahotsav (March)', 'Maha Shivaratri'],
    localFood: ['Kusli sweet pastry', 'Moong dal Bafauri', 'Gond herbal decoctions'],
    homestaysCount: 4,
    approximateBudget: '₹1,600 - ₹3,000 / day',
    localImpactRatio: 0.91,
    difficulty: 'Easy',
    tags: ['Khajuraho of CG', 'Nagara Architecture', 'Maikal Hills', '11th Century', 'Baiga Lore'],
    images: [
      'https://images.unsplash.com/photo-1609137144822-44676100c5c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Respect the sanctity of ongoing local worship in the inner garbhagriha.',
      'Engage Baiga village elders with genuine respect; ask permission prior to photography.',
      'Carry back all personal packaging and wrappers.'
    ],
    category: 'heritage',
    verifiedBadge: true,
    rating: 4.85,
    reviewsCount: 260
  },
  {
    id: 'mainpat-plateau',
    name: 'Mainpat Plateau & Ulta Pani',
    nativeName: 'मैनपाट (The Shimla of Chhattisgarh)',
    district: 'Surguja',
    region: 'North Chhattisgarh',
    altitude: '3,600 ft (1,097 m)',
    coordinates: { lat: 22.8134, lng: 83.2845, mapX: 68, mapY: 20 },
    community: 'Tibetan settlement, Oraon & Yadav communities',
    description: 'A lush highland plateau crowned with rolling green meadows, pine forests, deep waterfalls, and vibrant Tibetan Buddhist monasteries established in the 1960s by Tibetan refugees.',
    whySpecial: 'Famed for "Ulta Pani" (a natural gravitational anomaly where water flows uphill against gravity) and the bouncy marshlands of "Jaljali" where the earth shakes beneath your feet.',
    bestTime: 'Throughout the year (Misty monsoons & chilly winters with morning frost)',
    howToReach: {
      gateway: 'Ambikapur (55 km) / Raipur (360 km)',
      roadTransit: 'Winding ghat road climbing through dense sal and bamboo hills from Ambikapur.',
      nearestAir: 'Raipur Airport (370 km) or Ranchi Airport (280 km)',
      nearestRail: 'Ambikapur Railway Station (ABKP - 55 km)'
    },
    tourismLoad: 'MODERATE',
    currentVisitors: 340,
    capacityLimit: 700,
    crowdTrend: [10, 30, 60, 80, 75, 55, 30, 10],
    recommendedTime: 'Morning 08:30 AM - 12:30 PM for monastery prayer chanting & waterfall treks',
    alternativeDestinations: ['barnawapara', 'bhoramdeo-temple'],
    nearbyExperiences: [
      'Listen to monks chanting and spinning giant prayer wheels at Dhakpo Shedrupling Monastery',
      'Experience the zero-gravity water flow test at Ulta Pani',
      'Trek to Tiger Point and Fish Point waterfalls plunging into mist',
      'Jump on the floating spring marsh at Jaljali'
    ],
    festivals: ['Losar Tibetan New Year', 'Mainpat Mahotsav (February)'],
    localFood: ['Tibetan Butter Tea & Steamed Momos', 'Thukpa noodle broth', 'Surguja local Kodo-Kutki millet kheer'],
    homestaysCount: 9,
    approximateBudget: '₹1,800 - ₹3,400 / day',
    localImpactRatio: 0.9,
    difficulty: 'Moderate',
    tags: ['Hill Station', 'Tibetan Culture', 'Ulta Pani', 'Jaljali', 'Monastery', 'Waterfalls'],
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Walk clockwise around Buddhist stupas and prayer flags.',
      'Support Tibetan carpet-weaving cooperative centers run by local refugee families.',
      'Drive carefully on foggy hairpin curves during winter and monsoon mornings.'
    ],
    category: 'nature',
    verifiedBadge: true,
    rating: 4.82,
    reviewsCount: 345
  },
  {
    id: 'barnawapara-sanctuary',
    name: 'Barnawapara Wildlife Sanctuary',
    district: 'Baloda Bazar / Mahasamund',
    region: 'Central Plains',
    altitude: '1,200 ft (365 m)',
    coordinates: { lat: 21.4128, lng: 82.4187, mapX: 68, mapY: 46 },
    community: 'Tribal forest dwellers, Kamar tribe',
    description: 'A 245-sq-km wilderness of mixed deciduous forests, teak glades, and shimmering waterholes. Home to healthy populations of leopards, Indian bison (Gaur), sloth bears, sambar, nilgai, and over 150 species of birds.',
    whySpecial: 'Renowned for exceptional open-jeep safari sightings of the majestic Indian Gaur (wild bison) and peaceful forest drives devoid of mass commercialization.',
    bestTime: 'November to June (Sanctuary closed July-Oct during monsoon)',
    howToReach: {
      gateway: 'Raipur (95 km)',
      roadTransit: 'Scenic 2-hour drive from Raipur along the Mahanadi plain turning into teak canopy forest.',
      nearestAir: 'Raipur Airport (90 km)',
      nearestRail: 'Mahasamund (60 km) or Raipur (95 km)'
    },
    tourismLoad: 'LOW',
    currentVisitors: 160,
    capacityLimit: 400,
    crowdTrend: [30, 20, 10, 25, 50, 40, 15, 5],
    recommendedTime: 'Early morning safari (06:00 - 09:30 AM) or dusk safari (03:30 - 06:00 PM)',
    alternativeDestinations: ['kanger-valley', 'mainpat-plateau'],
    nearbyExperiences: [
      'Open jeep jungle safari with Kamar indigenous trackers',
      'Birdwatching at Pakshi Vihar waterbody at daybreak',
      'Night star-gazing from the forest department eco-tents'
    ],
    festivals: ['Wildlife Week Celebrations', 'Holi Tribal Bonfire'],
    localFood: ['Rural chana dal Fara', 'Smoked brinjals with garlic paste', 'Mahua laddu'],
    homestaysCount: 4,
    approximateBudget: '₹2,500 - ₹4,500 / day (including safari permit)',
    localImpactRatio: 0.93,
    difficulty: 'Easy',
    tags: ['Wildlife Safari', 'Indian Gaur', 'Leopards', 'Teak Forest', 'Birdwatching'],
    images: [
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Strict silence is required on safari tracks; do not shout or play music.',
      'Never disembark from the authorized safari gypsy inside sanctuary zones.',
      'Wear neutral, earth-toned clothing (khaki, olive, brown) to avoid agitating animals.'
    ],
    category: 'wildlife',
    verifiedBadge: true,
    rating: 4.86,
    reviewsCount: 210
  },
  {
    id: 'kondagaon-dokra-hub',
    name: 'Kondagaon Craft Heritage Village',
    nativeName: 'कोण्डागांव (शिल्प नगरी - The Craft Capital of Chhattisgarh)',
    district: 'Kondagaon',
    region: 'Bastar & South',
    altitude: '1,950 ft (594 m)',
    coordinates: { lat: 19.5982, lng: 81.6664, mapX: 47, mapY: 68 },
    community: 'Ghadwa (Bell metal casters), Muria, Halba',
    description: 'The world-famous heartland of Bastar Dokra (ancient lost-wax bell metal casting) and terracotta sculpting. The village lanes are dotted with open-air kilns, beeswax sculpting workshops, and master artisans whose families have cast bronze sculptures for 4,000 years since the Indus Valley era.',
    whySpecial: 'Home to multiple National Award-winning craftspersons like Master Jaidev Baghel’s lineage. Visitors can sit on the ground alongside artisans, knead beeswax threads, and witness molten brass pouring into earthen molds.',
    bestTime: 'October to April',
    howToReach: {
      gateway: 'Jagdalpur (70 km) / Raipur (225 km)',
      roadTransit: 'Located right on NH-30 connecting Raipur and Jagdalpur, making it the ideal craft stopover.',
      nearestAir: 'Jagdalpur (72 km) or Raipur (220 km)',
      nearestRail: 'Jagdalpur (70 km)'
    },
    tourismLoad: 'LOW',
    currentVisitors: 95,
    capacityLimit: 350,
    crowdTrend: [5, 15, 30, 40, 45, 30, 15, 5],
    recommendedTime: 'Morning 09:30 AM - 01:30 PM (when artisans work on delicate wax coils)',
    alternativeDestinations: ['bastar-tribal-village', 'jagdalpur-heritage'],
    nearbyExperiences: [
      'Hands-on Dokra casting workshop: create your own brass talisman with a master artisan',
      'Terracotta sculpture studio tour at Kumharpara',
      'Interact with Ghadwa metal masters and listen to casting chants'
    ],
    festivals: ['Shilp Mahotsav', 'Bastar Madai Fair'],
    localFood: ['Bastar sweet Sal seed porridge', 'Chila with fresh green chutney', 'Forest honey tea'],
    homestaysCount: 5,
    approximateBudget: '₹1,500 - ₹2,900 / day',
    localImpactRatio: 0.96,
    difficulty: 'Easy',
    tags: ['Dokra Art', 'Lost Wax Casting', 'National Award Artisans', 'Terracotta', 'Bastar Craft'],
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Buy directly from the craftsperson or family cooperatives to eliminate exploitative middlemen.',
      'Do not aggressively bargain; honor the days of hand craftsmanship in each lost-wax casting.',
      'Do not photograph confidential master designs without asking permission.'
    ],
    category: 'tribal',
    verifiedBadge: true,
    rating: 4.96,
    reviewsCount: 340
  },
  {
    id: 'danteshwari-temple',
    name: 'Danteshwari Temple Dantewada',
    nativeName: 'माँ दंतेश्वरी मंदिर दंतेवाड़ा (Sacred 52nd Shaktipeeth)',
    district: 'Dantewada',
    region: 'Bastar & South',
    altitude: '1,150 ft (350 m)',
    coordinates: { lat: 18.8942, lng: 81.3508, mapX: 42, mapY: 88 },
    community: 'Gond, Maria, Bhatra',
    description: 'One of the sacred 52 Shaktipeeths of India, built in the 14th century by Chalukya rulers at the mystical confluence of the holy Shankhini and Dankini rivers. Maa Danteshwari is the revered presiding deity of the entire Bastar region.',
    whySpecial: 'The spiritual epicenter of the 75-day Bastar Dussehra, where tribal chieftains and royal priests unite in ancient rites that fuse Vedic Hinduism with animist tribal cosmology.',
    bestTime: 'October to March (Grandest during Bastar Dussehra in September/October)',
    howToReach: {
      gateway: 'Jagdalpur (85 km)',
      roadTransit: 'Scenic drive through green sal ridges on State Highway 5; regular AC and state transport buses.',
      nearestAir: 'Jagdalpur Airport (88 km)',
      nearestRail: 'Dantewada Railway Station (DWZ - 3 km)'
    },
    tourismLoad: 'HIGH',
    currentVisitors: 780,
    capacityLimit: 1000,
    crowdTrend: [25, 45, 80, 95, 90, 70, 45, 20],
    recommendedTime: 'Early morning darshan 06:00 - 08:30 AM before afternoon queues gather',
    alternativeDestinations: ['bhoramdeo-temple', 'sirpur-heritage'],
    nearbyExperiences: [
      'Visit the holy confluence (Sangam) of Dankini and Shankhini rivers',
      'Explore the ancient Garuda Pillar and Chalukya-era stone inscriptions',
      'Walk through Dantewada brass craft and bamboo souvenir bazaar'
    ],
    festivals: ['Bastar Dussehra', 'Navratri Mela', 'Fagun Madai'],
    localFood: ['Temple Mahaprasad', 'Chhattisgarhi Khaja sweet', 'Sorghum roti with til chutney'],
    homestaysCount: 4,
    approximateBudget: '₹1,200 - ₹2,400 / day',
    localImpactRatio: 0.88,
    difficulty: 'Easy',
    tags: ['Shaktipeeth', '14th Century', 'Confluence', 'Bastar Dussehra', 'Sacred Heritage'],
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Follow traditional dress codes (dhoti/kurta or saree/suit) for sanctum entry.',
      'Deposit phones and leather articles in the temple locker prior to entering the inner hall.',
      'Do not bathe with soap or chemicals in the sacred river confluence.'
    ],
    category: 'heritage',
    verifiedBadge: true,
    rating: 4.9,
    reviewsCount: 480
  },
  {
    id: 'dongargarh-temple',
    name: 'Maa Bambleshwari Temple Dongargarh',
    nativeName: 'माँ बम्लेश्वरी मंदिर डोंगरगढ़ (Hilltop Ropeway Pilgrimage)',
    district: 'Rajnandgaon',
    region: 'Central Plains',
    altitude: '1,600 ft (488 m)',
    coordinates: { lat: 21.1895, lng: 80.7588, mapX: 25, mapY: 52 },
    community: 'Local rural community & pilgrim guilds',
    description: 'A hilltop shrine perched atop an imposing 1,600-foot solitary granite hill with panoramic 360-degree views of lakes and forested plains. Accessible by climbing 1,000 steps or via Chhattisgarh’s premier passenger ropeway.',
    whySpecial: 'Houses the sacred shrine of Badi Bambleshwari atop the peak and Chhoti Bambleshwari at ground level, drawing millions during Navratri melas.',
    bestTime: 'October to March',
    howToReach: {
      gateway: 'Rajnandgaon (40 km) / Raipur (105 km)',
      roadTransit: 'Well-connected by NH-53 and dedicated 4-lane pilgrim corridors.',
      nearestAir: 'Raipur Swami Vivekananda Airport (115 km)',
      nearestRail: 'Dongargarh Railway Station (DGG - 2 km)'
    },
    tourismLoad: 'HIGH',
    currentVisitors: 890,
    capacityLimit: 1200,
    crowdTrend: [35, 55, 85, 95, 85, 75, 50, 30],
    recommendedTime: 'Early morning 06:00 - 08:30 AM via ropeway to beat midday heat and queues',
    alternativeDestinations: ['bhoramdeo-temple', 'madku-dweep'],
    nearbyExperiences: [
      'Ropeway ride with sweeping aerial vistas over lakes and paddy fields',
      'Sunrise walk around Pragyagiri Buddhist monument hill',
      'Boat ride in Chitrangi lake at the foot of the hill'
    ],
    festivals: ['Chaitra Navratri', 'Kwar Navratri Fair'],
    localFood: ['Dongargarh sweet Peda', 'Moong dal Bafauri', 'Poha with Sev and jalebi'],
    homestaysCount: 6,
    approximateBudget: '₹1,200 - ₹2,200 / day',
    localImpactRatio: 0.85,
    difficulty: 'Moderate',
    tags: ['Hilltop Shrine', 'Ropeway', 'Pilgrimage', 'Pragyagiri', 'Lakes'],
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Book ropeway slots online via the platform to avoid standing in long ticket lines.',
      'Keep the hilltop clean; dispose of coconut shells and offerings only in green bins.',
      'Support local flower and prasad vendors who belong to the local women’s SHG groups.'
    ],
    category: 'heritage',
    verifiedBadge: true,
    rating: 4.75,
    reviewsCount: 390
  },
  {
    id: 'madku-dweep',
    name: 'Madku Dweep Island Sanctuary',
    nativeName: 'मदकू द्वीप (Sacred River Island of Mandukya Rishi)',
    district: 'Bilaspur',
    region: 'Central Plains',
    altitude: '820 ft (250 m)',
    coordinates: { lat: 21.9328, lng: 81.8247, mapX: 52, mapY: 36 },
    community: 'Riverine farmers, Christian tribal fellowship & local boatmen',
    description: 'A serene 35-hectare emerald river island formed by the bifurcation of the holy Shivnath River. Revered as the hermitage of sage Mandukya Rishi who composed the philosophical Mandukya Upanishad.',
    whySpecial: 'Archaeological excavations have uncovered 19 ancient stone temples dating from the 10th-11th centuries Kalachuri period, alongside an annual centennial peace fair celebrated by diverse faiths.',
    bestTime: 'October to March (River stays calm and crystal clear)',
    howToReach: {
      gateway: 'Bilaspur (45 km) / Raipur (85 km)',
      roadTransit: 'Accessible via a scenic road bridge connecting to the quiet riverbank island.',
      nearestAir: 'Bilaspur Bilasa Devi Airport (40 km) or Raipur (90 km)',
      nearestRail: 'Bhatapara (22 km) or Bilaspur (45 km)'
    },
    tourismLoad: 'LOW',
    currentVisitors: 80,
    capacityLimit: 300,
    crowdTrend: [5, 15, 25, 30, 35, 25, 10, 5],
    recommendedTime: 'Late afternoon 03:00 - 06:00 PM for magical golden river sunsets',
    alternativeDestinations: ['sirpur-heritage', 'bhoramdeo-temple'],
    nearbyExperiences: [
      'Walk among excavated 11th-century Kalachuri temple ruins',
      'Country boat cruise along the tranquil waters of Shivnath river',
      'Birdwatching for river terns, egrets, and kingfishers'
    ],
    festivals: ['Madku Dweep Mela (February)', 'Shivnath Aarti'],
    localFood: ['Fresh river-spinach curry', 'Rice flour Fara with sesame', 'Mahua sweet broth'],
    homestaysCount: 3,
    approximateBudget: '₹1,200 - ₹2,000 / day',
    localImpactRatio: 0.95,
    difficulty: 'Easy',
    tags: ['River Island', 'Kalachuri Temples', 'Mandukya Rishi', 'Shivnath River', 'Offbeat'],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Maintain the peaceful, meditative ambiance of the island sanctuary.',
      'Do not litter or wash plastic along the Shivnath riverbanks.',
      'Use certified local boatmen for river crossings.'
    ],
    category: 'offbeat',
    verifiedBadge: true,
    rating: 4.8,
    reviewsCount: 175
  },
  {
    id: 'tamda-ghumar',
    name: 'Tamda Ghumar & Mendri Ghumar',
    nativeName: 'तामड़ा घूमर एवं मेंद्री घूमर (The Hidden Canyons)',
    district: 'Bastar',
    region: 'Bastar & South',
    altitude: '1,780 ft (542 m)',
    coordinates: { lat: 19.1685, lng: 81.6542, mapX: 45, mapY: 76 },
    community: 'Maria & Muria tribal hamlets',
    description: 'Two spectacular, untouched seasonal canyon waterfalls located just 12 km from Chitrakote. The water plunges 100 feet over a dramatic horse-tail cliff into a deep forested valley enveloped in mist.',
    whySpecial: 'The ultimate low-crowd alternative to Chitrakote. Uncommercialized, quiet, and encircled by deep ravines, wild peacocks, and pristine tribal farmland.',
    bestTime: 'July to December',
    howToReach: {
      gateway: 'Jagdalpur (42 km) or Chitrakote (12 km)',
      roadTransit: 'Scenic rural road meandering through tribal villages with blooming yellow mustard fields in winter.',
      nearestAir: 'Jagdalpur (45 km)',
      nearestRail: 'Jagdalpur (42 km)'
    },
    tourismLoad: 'LOW',
    currentVisitors: 65,
    capacityLimit: 250,
    crowdTrend: [5, 10, 20, 30, 25, 15, 10, 5],
    recommendedTime: 'Mid-morning or sunset for vibrant rainbow effects in the waterfall mist',
    alternativeDestinations: ['chitrakote-falls', 'tirathgarh-falls'],
    nearbyExperiences: [
      'Picnic over the canyon rim with panoramic green valley views',
      'Valley rim hiking along tribal goat herder trails',
      'Photography of natural mist rainbows'
    ],
    festivals: ['Tribal Harvest Madai', 'Karma Dance Night'],
    localFood: ['Woodfire roasted corn on the cob', 'Chila with fresh forest herbs', 'Fresh coconut water'],
    homestaysCount: 3,
    approximateBudget: '₹1,200 - ₹2,200 / day',
    localImpactRatio: 0.97,
    difficulty: 'Easy',
    tags: ['Hidden Waterfall', 'Canyon', 'Low Crowds', 'Rainbow Mist', 'Bastar Secret'],
    images: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80'
    ],
    responsibleGuidelines: [
      'Stay well back from the unbarricaded canyon cliff edge.',
      'Take all trash back to Jagdalpur or your homestay.',
      'Do not disturb grazing livestock or tribal farm boundaries.'
    ],
    category: 'offbeat',
    verifiedBadge: true,
    rating: 4.92,
    reviewsCount: 165
  }
];