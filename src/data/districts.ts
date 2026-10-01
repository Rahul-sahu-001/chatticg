import { DistrictInfo } from '../types';

export const DISTRICTS: DistrictInfo[] = [
  {
    id: 'bastar',
    name: 'Bastar',
    headquarters: 'Jagdalpur',
    zone: 'Southern Bastar Plateau',
    tagline: 'Heartland of Tribal Art, Roaring Waterfalls & Deep Sal Wilderness',
    elevationRange: '1,800 - 2,800 ft',
    nature: {
      waterfalls: ['Chitrakote Falls', 'Tirathgarh Falls', 'Tamda Ghumar', 'Mendri Ghumar', 'Kanger Dhara'],
      forests: ['Kanger Valley National Park', 'Machkot Sal Forest'],
      wildlife: ['Bastar Hill Myna (State Bird)', 'Indian Gaur', 'Leopards', 'Barking Deer'],
      rivers: ['Indravati River', 'Kanger River', 'Shabari River'],
      caves: ['Kutumsar Cave', 'Kailash Cave', 'Dandak Cave']
    },
    culture: {
      tribes: ['Muria', 'Maria', 'Dhurwa', 'Bhatra', 'Halba'],
      crafts: ['Dokra Lost-Wax Bell Metal', 'Bastar Iron Craft (Loha Shilp)', 'Wood Carving', 'Sisal Craft'],
      architecture: 'Devgudi sacred shrines, Ghotul youth dormitories, terracotta roofed earth homes',
      musicDances: ['Gaur Maria dance (Bison-horn)', 'Karma dance', 'Kaksar dance', 'Hulki dance']
    },
    experiences: [
      {
        title: 'Bastar Haat & Weekly Tribal Bazaar',
        category: 'Culture',
        description: 'Immerse in centuries-old barter trade, local vegetables, Mahua spirit, and Dokra metalwork.'
      },
      {
        title: 'Chitrakote Twilight Boat Safari',
        category: 'Adventure',
        description: 'Row into the misty spray of India’s widest horseshoe waterfall with local Gond boatmen.'
      }
    ],
    food: [
      {
        dish: 'Amat',
        description: 'Bamboo shoot and mixed forest vegetable slow-simmered stew.',
        ingredients: ['Bamboo Shoots', 'Pehj', 'Mustard seeds']
      },
      {
        dish: 'Chila with Tomato Chutney',
        description: 'Fermented crispy rice crepe with wood-charred spicy tomato salsa.',
        ingredients: ['Rice Flour', 'Urad dal', 'Field tomatoes']
      }
    ],
    festivals: [
      {
        name: 'Bastar Dussehra',
        month: 'October',
        community: 'All Bastar Tribes & Royal Lineage',
        description: '75-day world-record festival honoring Goddess Danteshwari with giant hand-pulled chariots.'
      },
      {
        name: 'Goncha Festival',
        month: 'July',
        community: 'Tribal communities',
        description: 'Unique chariot procession where devotees use bamboo pistols (Tupki) with Peng seeds.'
      }
    ],
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'mahasamund',
    name: 'Mahasamund (Sirpur)',
    headquarters: 'Mahasamund',
    zone: 'Central Plains',
    tagline: 'Ancient Buddhist & Hindu Capital of South Kosala on the Mahanadi',
    elevationRange: '800 - 1,200 ft',
    nature: {
      waterfalls: [],
      forests: ['Barnawapara Wildlife Buffer', 'Sirpur Mahanadi Riparian Groves'],
      wildlife: ['Spotted Deer', 'Wild Boar', 'Kingfishers', 'River Terns'],
      rivers: ['Mahanadi River', 'Jonk River']
    },
    culture: {
      tribes: ['Kamar', 'Gond', 'Kanwar'],
      crafts: ['Terracotta Pottery', 'Red Brick Carving', 'Stone Inlay'],
      architecture: '7th-century brick temples, Buddhist monastic viharas, underground markets',
      musicDances: ['Panthi dance', 'Raut Nacha', 'Sua dance']
    },
    experiences: [
      {
        title: 'Sirpur Archaeological Excavation Walk',
        category: 'Heritage',
        description: 'Walk through 80+ excavated monuments from the 5th to 8th century AD.'
      }
    ],
    food: [
      {
        dish: 'Chhattisgarhi 7-Bhaji Thali',
        description: 'Seven seasonal wild leafy greens cooked with garlic and dried red chilies.',
        ingredients: ['Chech Bhaji', 'Kanda Bhaji', 'Mustard oil']
      }
    ],
    festivals: [
      {
        name: 'Sirpur National Dance Festival',
        month: 'January',
        community: 'Classical and folk artists',
        description: 'Nighttime cultural festival in front of the illuminated Lakshmana Temple.'
      }
    ],
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'surguja',
    name: 'Surguja (Mainpat)',
    headquarters: 'Ambikapur',
    zone: 'Northern Highlands',
    tagline: 'Misty Tibetan Monasteries, Bouncing Marshes & Ancient Ramgarh Caves',
    elevationRange: '2,000 - 3,800 ft',
    nature: {
      waterfalls: ['Tiger Point', 'Fish Point', 'Zalzal Waterfalls'],
      forests: ['Mainpat Pine & Sal Hills', 'Ramgarh Hills'],
      wildlife: ['Barking Deer', 'Flying Squirrel', 'Hill Partridges'],
      rivers: ['Rihand River', 'Mand River']
    },
    culture: {
      tribes: ['Oraon', 'Korwa', 'Pando', 'Tibetan Exiles'],
      crafts: ['Tibetan Hand-Knotted Carpets', 'Bamboo Basketry', 'Godna Art'],
      architecture: 'Tibetan wooden monasteries with gold finials, tribal mud houses with painted murals',
      musicDances: ['Sarhul dance', 'Karma dance of Surguja', 'Tibetan Cham mask dance']
    },
    experiences: [
      {
        title: 'Ulta Pani & Jaljali Phenomenon Tour',
        category: 'Adventure',
        description: 'Witness water flowing uphill against gravity and jump on bouncy vibrating marshland.'
      }
    ],
    food: [
      {
        dish: 'Tibetan Butter Tea & Momos',
        description: 'Warm salty yak-butter tea paired with steamed vegetable dumplings in misty hills.',
        ingredients: ['Butter', 'Tea leaves', 'Steamed flour dough']
      }
    ],
    festivals: [
      {
        name: 'Losar (Tibetan New Year)',
        month: 'February',
        community: 'Tibetan community',
        description: 'Colorful prayer flags, ritual cham dances, and community butter sculptures.'
      }
    ],
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'kabirdham',
    name: 'Kabirdham (Kawardha)',
    headquarters: 'Kawardha',
    zone: 'Central Plains',
    tagline: 'Maikal Foothills, Baiga Medicine Traditions & Bhoramdeo Temple',
    elevationRange: '1,100 - 2,500 ft',
    nature: {
      waterfalls: ['Rani Dah Waterfall', 'Chilphi Ghati Cascades'],
      forests: ['Maikal Ridge Forests', 'Kanha-Achanakmar Wildlife Corridor'],
      wildlife: ['Tigers (corridor)', 'Leopards', 'Chital', 'Indian Pangolin'],
      rivers: ['Sankari River', 'Phen River']
    },
    culture: {
      tribes: ['Baiga (Particularly Vulnerable Tribal Group)', 'Gond'],
      crafts: ['Baiga Herbal Medicine', 'Bamboo Flutes', 'Tattoo (Godna) Body Art'],
      architecture: 'Nagara stone temples with intricate erotic and deity friezes',
      musicDances: ['Baiga Pardhauni dance', 'Karma Baiga rhythm', 'Dadariya song']
    },
    experiences: [
      {
        title: 'Bhoramdeo 1,000-Year Stone Architecture Trail',
        category: 'Heritage',
        description: 'Explore the Nagwanshi stone temples framed against the green Maikal hills.'
      }
    ],
    food: [
      {
        dish: 'Bafauri',
        description: 'Zero-oil steamed chana dal dumplings spiced with mountain herbs.',
        ingredients: ['Chana dal', 'Ginger', 'Green chilies']
      }
    ],
    festivals: [
      {
        name: 'Bhoramdeo Mahotsav',
        month: 'March',
        community: 'Baiga, Gond, cultural artists',
        description: 'Festive spring gathering celebrating temple heritage and tribal dances.'
      }
    ],
    heroImage: 'https://images.unsplash.com/photo-1609137144822-44676100c5c4?auto=format&fit=crop&w=1200&q=80'
  }
];