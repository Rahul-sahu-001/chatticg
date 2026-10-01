import { VRScene } from '../types';

export const VR_SCENES: VRScene[] = [
  {
    id: 'chitrakote-gorge-360',
    title: 'Chitrakote Horseshoe Falls (360° Mist Panorama)',
    location: 'Indravati River Gorge, Bastar',
    district: 'Bastar',
    panoramaImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=85',
    ambientSound: 'waterfall',
    description: 'Stand at the misty edge of India’s widest horseshoe waterfall as thousands of cubic meters of water thunder into the Indravati canyon below.',
    hotspots: [
      {
        pitch: -10,
        yaw: 25,
        title: 'Horseshoe Canyon Lip',
        text: 'During monsoon peak, the water curtain widens to over 300 meters, colored deep amber by rich forest minerals.',
        audioCaption: 'Listen to the roar of Indravati reverberating through the Bastar basalt gorge.'
      },
      {
        pitch: 5,
        yaw: -45,
        title: 'Local Fishermen Sanctuary',
        text: 'Generations of Maria Gond boatmen use traditional wooden dugout canoes to navigate the calm mist pools at the base.',
        audioCaption: 'The sacred river Indravati is believed to carry the blessings of forest mother Goddess Danteshwari.'
      },
      {
        pitch: -15,
        yaw: 90,
        title: 'Rainbow Spray Arc',
        text: 'Every sunny afternoon from 3:30 to 5:00 PM, sunlight refracts through the waterfall mist, creating vivid double rainbows.',
        audioCaption: 'Local legends call the rainbow the bow of Indradev greeting mother earth.'
      }
    ]
  },
  {
    id: 'sirpur-lakshmana-temple-360',
    title: 'Sirpur 7th-Century Lakshmana Temple (360° Courtyard)',
    location: 'Sirpur Archaeological Complex, Mahasamund',
    district: 'Mahasamund',
    panoramaImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=85',
    ambientSound: 'temple',
    description: 'Explore the sanctum platform of India’s finest preserved red-brick temple, constructed by Queen Vasata in memory of King Harshagupta in the 7th century AD.',
    hotspots: [
      {
        pitch: 0,
        yaw: 15,
        title: 'Carved Brick Torana Doorframe',
        text: 'Intricately molded terracotta bricks depicting the Sheshashayi Vishnu, Varaha avatar, and Krishna-lila narratives.',
        audioCaption: 'Notice the precision of brick interlocking without modern mortar.'
      },
      {
        pitch: -8,
        yaw: -60,
        title: 'Anand Prabhu Kuti Monastic Enclave',
        text: 'Adjoining Buddhist vihara with 14 living monk cells and a monolithic black stone Buddha in Bhumisparsha mudra.',
        audioCaption: 'Sirpur was once visited by Chinese traveler Xuanzang in 639 AD, who documented a thriving university.'
      }
    ]
  },
  {
    id: 'bastar-ghotul-village-360',
    title: 'Bastar Tribal Village & Sacred Devgudi (360° Grove)',
    location: 'Tokapal Rural Settlement, Bastar',
    district: 'Bastar',
    panoramaImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
    ambientSound: 'forest',
    description: 'Immerse yourself inside an authentic Dhurwa tribal village surrounded by sacred Sal groves, hand-painted mud walls, and the community Ghotul.',
    hotspots: [
      {
        pitch: -5,
        yaw: 30,
        title: 'Sacred Devgudi Shrine',
        text: 'The village spiritual shrine where wooden totem poles (Khamb) carved with bison horns protect the community.',
        audioCaption: 'Offerings of rice grain and Mahua flowers are made during every new moon.'
      },
      {
        pitch: 10,
        yaw: -80,
        title: 'Mandar Drumming Stage',
        text: 'The open ground where youths gather at dusk for community storytelling, Karma dances, and flute songs.',
        audioCaption: 'The Mandar drum is hollowed from sacred timber and tuned with clay and rice dough.'
      }
    ]
  }
];
