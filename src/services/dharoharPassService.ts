import { Badge, DharoharPass, DigitalCertificate } from '../types';

const INITIAL_PASS: DharoharPass = {
  travelerId: 'traveler-001',
  travelerName: 'Rahul Verma',
  travelerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  passNumber: 'CG-DHAROHAR-2026-8492',
  level: 'Explorer',
  placesVisited: ['Chitrakote Falls', 'Sirpur Heritage Complex', 'Kanger Valley National Park', 'Kondagaon Craft Village'],
  experiencesCompleted: ['Bastar Dokra Bell Metal Casting Workshop', 'Kanger Valley Cave Trail'],
  impactScoreINR: 4200,
  travelStreakDays: 4,
  ecoPoints: 680,
  issueDate: 'October 12, 2026',
  badges: [
    {
      id: 'heritage-explorer',
      title: 'Heritage Explorer',
      category: 'Archaeology & Temples',
      iconName: 'Landmark',
      description: 'Explored ancient 7th-century brick and stone architecture of Sirpur and Bhoramdeo.',
      unlocked: true,
      unlockedDate: 'Oct 14, 2026',
      criteria: 'Visit at least 2 historical/archaeological sites in Chhattisgarh.'
    },
    {
      id: 'nature-seeker',
      title: 'Nature Seeker',
      category: 'Waterfalls & Forests',
      iconName: 'Trees',
      description: 'Stood in the spray of Chitrakote and explored pristine Kanger Valley rainforests.',
      unlocked: true,
      unlockedDate: 'Oct 15, 2026',
      criteria: 'Explore at least 1 waterfall and 1 national park sanctuary.'
    },
    {
      id: 'tribal-culture-explorer',
      title: 'Tribal Culture Explorer',
      category: 'Indigenous Traditions',
      iconName: 'Compass',
      description: 'Learned directly from Gond and Dhurwa elders in traditional village settlements.',
      unlocked: true,
      unlockedDate: 'Oct 16, 2026',
      criteria: 'Participate in an indigenous storytelling or village walk experience.'
    },
    {
      id: 'responsible-traveler',
      title: 'Responsible Traveler',
      category: 'Sustainability',
      iconName: 'ShieldCheck',
      description: 'Maintained 100% single-use plastic avoidance and retained 85%+ of spending locally.',
      unlocked: true,
      unlockedDate: 'Oct 16, 2026',
      criteria: 'Keep a clean zero-waste travel record and calculate impact.'
    },
    {
      id: 'local-supporter',
      title: 'Local Supporter',
      category: 'Artisans & Community',
      iconName: 'HeartHandshake',
      description: 'Purchased directly from master Dokra bell metal casters without middleman markups.',
      unlocked: true,
      unlockedDate: 'Oct 17, 2026',
      criteria: 'Book a community workshop or purchase from the artisan marketplace.'
    }
  ],
  certificates: [
    {
      id: 'cert-dokra-01',
      certificateNumber: 'DHAROHAR-EXP-2026-7731',
      experienceTitle: 'Bastar Dokra Lost-Wax Bell Metal Casting Mastery',
      travelerName: 'Rahul Verma',
      issueDate: 'October 16, 2026',
      verificationHash: '0x8f2a...c491 (MOCK BLOCKCHAIN VERIFICATION)',
      isDemo: true,
      hostName: 'Mangli Bai & Jaidev Shilp Guild',
      district: 'Kondagaon',
      category: 'Tribal Craft Conservation'
    },
    {
      id: 'cert-kanger-02',
      certificateNumber: 'DHAROHAR-EXP-2026-9182',
      experienceTitle: 'Kanger Valley Subterranean Speleology & Forest Stewardship',
      travelerName: 'Rahul Verma',
      issueDate: 'October 17, 2026',
      verificationHash: '0x3b1c...99d4 (MOCK BLOCKCHAIN VERIFICATION)',
      isDemo: true,
      hostName: 'Sukhdev Baghel',
      district: 'Bastar',
      category: 'Forest Ecology Stewardship'
    }
  ]
};

export const dharoharPassService = {
  getPass(): DharoharPass {
    try {
      const stored = localStorage.getItem('dharohar_pass_data');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_PASS;
  },

  savePass(pass: DharoharPass) {
    try {
      localStorage.setItem('dharohar_pass_data', JSON.stringify(pass));
    } catch {}
  },

  addVisit(destinationName: string) {
    const pass = this.getPass();
    if (!pass.placesVisited.includes(destinationName)) {
      pass.placesVisited.push(destinationName);
      pass.ecoPoints += 50;
      if (pass.placesVisited.length >= 6) {
        pass.level = 'Heritage Ambassador';
      } else if (pass.placesVisited.length >= 3) {
        pass.level = 'Custodian';
      }
      this.savePass(pass);
    }
    return pass;
  },

  recordBookingImpact(amountINR: number) {
    const pass = this.getPass();
    pass.impactScoreINR += Math.round(amountINR * 0.88);
    pass.ecoPoints += Math.round(amountINR * 0.05);
    this.savePass(pass);
    return pass;
  }
};
