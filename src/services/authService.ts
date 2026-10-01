import { UserProfile, UserRole } from '../types';

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  tourist: {
    id: 'user-tourist-01',
    name: 'Rahul Verma',
    role: 'tourist',
    email: 'rahul.explorer@dharoharcg.demo',
    phone: '+91 98271 44021',
    location: 'Raipur / Raipur Airport',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    verified: true,
    kycStatus: 'Verified',
    bio: 'Passionate slow traveler exploring deep Bastar arts, waterfalls, and indigenous cuisines.'
  },
  guide: {
    id: 'user-guide-01',
    name: 'Sukhdev Baghel',
    role: 'guide',
    email: 'sukhdev.bastar@dharoharcg.demo',
    phone: '+91 94060 88219',
    location: 'Kotamsar Village, Kanger Valley, Bastar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verified: true,
    kycStatus: 'Verified',
    bio: 'Certified Bastar tribal naturalist, subterranean cave speleology expert, and birding guide with 14 years field experience.',
    rating: 4.96,
    earningsINR: 38400,
    completedBookingsCount: 52
  },
  seller: {
    id: 'user-seller-01',
    name: 'Mangli Bai Baghel',
    role: 'seller',
    email: 'manglibai.shilp@dharoharcg.demo',
    phone: '+91 91112 55903',
    location: 'Bhelvapadar Craft Cluster, Kondagaon',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    verified: true,
    kycStatus: 'Verified',
    bio: 'Head of Kondagaon Women Dokra Bell Metal Cooperative. National Awardee family artisan.',
    rating: 4.98,
    earningsINR: 84200,
    completedBookingsCount: 88
  },
  admin: {
    id: 'user-admin-01',
    name: 'Directorate of Tourism (Chhattisgarh)',
    role: 'admin',
    email: 'director.tourism@cg.gov.in.demo',
    phone: '+91 771 4224600',
    location: 'Paryatan Bhawan, VIP Road, Raipur',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    verified: true,
    kycStatus: 'Verified',
    bio: 'State Tourism Administration & Cultural Heritage Commission Dashboard.'
  }
};

export const authService = {
  getCurrentUser(): UserProfile {
    try {
      const stored = localStorage.getItem('dharohar_active_user');
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEMO_USERS.tourist;
  },

  switchRole(role: UserRole): UserProfile {
    const user = DEMO_USERS[role];
    try {
      localStorage.setItem('dharohar_active_user', JSON.stringify(user));
    } catch {}
    return user;
  },

  isLoggedIn(): boolean {
    return true;
  }
};
