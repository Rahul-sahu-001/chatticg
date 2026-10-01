import { CommunityChallenge } from '../types';

export const COMMUNITY_CHALLENGES: CommunityChallenge[] = [
  {
    id: 'bastar-waterfall-explorer',
    title: 'Waterfalls of Bastar Pioneer',
    tag: 'Nature & Water',
    description: 'Visit both Chitrakote and Tirathgarh, log your eco-pledge, and keep water sources 100% plastic free.',
    points: 150,
    badgeReward: 'Nature Seeker',
    completed: true,
    actionUrl: '#interactive-map'
  },
  {
    id: 'dokra-patron-challenge',
    title: 'Artisan Direct Patron',
    tag: 'Community Impact',
    description: 'Purchase an authentic handicraft directly from a verified Kondagaon artisan or attend a casting workshop.',
    points: 200,
    badgeReward: 'Local Supporter',
    completed: true,
    actionUrl: '#marketplace'
  },
  {
    id: 'chhattisgarh-super-taste',
    title: 'Flavors of the Earth Foodie',
    tag: 'Culinary Heritage',
    description: 'Taste 3 traditional dishes (Chila, Fara, Bafauri) prepared at local village homestays.',
    points: 100,
    badgeReward: 'Culinary Connoisseur',
    completed: false,
    actionUrl: '#experiences'
  },
  {
    id: 'heritage-archaeologist',
    title: 'Guardian of Sirpur & Bhoramdeo',
    tag: 'Ancient Architecture',
    description: 'Explore the 7th-century brick monuments of Sirpur or Bhoramdeo with a certified rural guide.',
    points: 180,
    badgeReward: 'Heritage Explorer',
    completed: true,
    actionUrl: '#destinations'
  },
  {
    id: 'zero-waste-warrior',
    title: 'Clean Trails Guardian',
    tag: 'Responsible Tourism',
    description: 'Maintain a 100% zero-disposable-plastic travel streak and achieve a 85%+ Rupee Retention score.',
    points: 250,
    badgeReward: 'Responsible Traveler',
    completed: true,
    actionUrl: '#impact-meter'
  }
];
