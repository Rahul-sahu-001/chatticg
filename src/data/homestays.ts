import { Homestay } from '../types';

export const HOMESTAYS: Homestay[] = [
  {
    id: 'bastar-dhurwa-eco-homestay',
    name: 'Dhurwa Eco-Jungle Homestay',
    host: 'Sukhdev & Jamuna Baghel',
    village: 'Kotamsar Buffer, Jagdalpur',
    district: 'Bastar',
    community: 'Dhurwa Tribal Clan',
    roomType: 'Traditional Thatched Earth Cottage with Modern Private Bath',
    pricePerNight: 1650,
    rating: 4.96,
    reviewsCount: 78,
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['Community Verified', '100% Solar Powered', 'Organic Farm-to-Table', 'Forest Guides on Site'],
    meals: ['Traditional Chila breakfast', 'Forest Amat with steamed rice', 'Campfire roasted tubers and Mahua tea'],
    experiences: [
      'Night walk to listen to forest owls and insects',
      'Morning harvest in organic vegetable backyard',
      'Cave trail to secret subterranean limestone pools'
    ],
    sustainability: [
      '100% solar lighting and solar water heating',
      'Natural terracotta tile cooling without air conditioners',
      'All plastic-free filtered earthen pot spring water'
    ],
    coordinates: { lat: 18.91, lng: 81.87 },
    verifiedBadge: true
  },
  {
    id: 'sirpur-heritage-vihara-homestay',
    name: 'Sirpur Buddhist Heritage Retreat',
    host: 'Anand & Sunita Shrivas',
    village: 'Sirpur Village Ghats',
    district: 'Mahasamund',
    community: 'Rural Artisan Guild',
    roomType: 'Heritage Courtyard Room overlooking Lotus Pond',
    pricePerNight: 1450,
    rating: 4.92,
    reviewsCount: 64,
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['Archaeology Partner', 'Riverfront', 'Cycle Rental Included'],
    meals: ['Chhattisgarhi 7-Bhaji lunch', 'Fresh hot Fara', 'Mahanadi river water-filtered herbal chai'],
    experiences: [
      'Early sunrise cycle tour of Surang Tila temple ruins',
      'Pottery wheel trial with village terracotta artisan',
      'Sunset country boat cruise on Mahanadi'
    ],
    sustainability: [
      'Rainwater harvesting system recharge pit',
      'Zero single-use plastic policy',
      'Local cycle transport provided free of charge'
    ],
    coordinates: { lat: 21.348, lng: 82.174 },
    verifiedBadge: true
  },
  {
    id: 'mainpat-tibetan-pine-homestay',
    name: 'Mainpat Pine Valley Tibetan Cottage',
    host: 'Tenzin Norbu & Family',
    village: 'Camp 1, Mainpat',
    district: 'Surguja',
    community: 'Tibetan Settlement Community',
    roomType: 'Handcrafted Wooden Chalet with Mountain View Balcony',
    pricePerNight: 1850,
    rating: 4.94,
    reviewsCount: 92,
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['High Altitude', 'Fireplace Room', 'Tibetan Culinary Host'],
    meals: ['Warm butter tea & Tsampa', 'Handmade vegetable momos', 'Spicy Thukpa broth with fresh farm herbs'],
    experiences: [
      'Morning prayer session at Dhakpo Shedrupling Monastery',
      'Visit to Ulta Pani gravity anomaly and Jaljali bouncy land',
      'Tibetan hand-knotted carpet weaving demonstration'
    ],
    sustainability: [
      'Woodfire space heating using fallen pine cones',
      'Organic cold-climate greenhouse farming',
      'Composting waste management system'
    ],
    coordinates: { lat: 22.815, lng: 83.28 },
    verifiedBadge: true
  },
  {
    id: 'bhoramdeo-jungle-farmstay',
    name: 'Bhoramdeo Maikal Hills Farmstay',
    host: 'Babulal Sahu & Baiga Elders',
    village: 'Chaura Village, Kawardha',
    district: 'Kabirdham',
    community: 'Baiga & Gond Forest Fringe',
    roomType: 'Mud and Teak Rural Cottage with Verandah',
    pricePerNight: 1550,
    rating: 4.88,
    reviewsCount: 56,
    images: [
      'https://images.unsplash.com/photo-1609137144822-44676100c5c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['Baiga Medicinal Garden', 'Heritage Proximity', 'Cattle Farm'],
    meals: ['Bafauri with spicy garlic chutney', 'Organic Kodo millet porridge', 'Fresh farm cow milk and jaggery'],
    experiences: [
      'Walk to 1,000-year-old Bhoramdeo stone temple at dawn',
      'Baiga herbal medicinal plant trail in Maikal foothills',
      'Bullock cart ride through sugarcane fields'
    ],
    sustainability: [
      'Zero chemical farm-grown produce',
      'Traditional lime-washed mud walls that breathe naturally',
      'Direct revenue sharing with Baiga forest guides'
    ],
    coordinates: { lat: 22.12, lng: 81.16 },
    verifiedBadge: true
  }
];