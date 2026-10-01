import { Booking } from '../types';
import { dharoharPassService } from './dharoharPassService';

export interface TransportOption {
  id: string;
  type: 'bus' | 'train' | 'cab' | 'local';
  provider: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fareINR: number;
  availableSeats: number;
  rating: number;
  isGreenEco: boolean;
}

export const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    id: 'tr-01',
    type: 'cab',
    provider: 'Bastar Green EV Cabs',
    name: 'Electric Tourist Sedan (Zero-Emission)',
    from: 'Raipur (Airport / RPR)',
    to: 'Jagdalpur / Chitrakote Falls',
    departureTime: 'On Demand (24x7)',
    arrivalTime: '5 Hours transit',
    duration: '5 Hours',
    fareINR: 3400,
    availableSeats: 4,
    rating: 4.95,
    isGreenEco: true
  },
  {
    id: 'tr-02',
    type: 'bus',
    provider: 'Chhattisgarh Tourism Board Express',
    name: 'Royal Air-Conditioned Volvo Sleeper',
    from: 'Raipur Bus Terminal (Pandri)',
    to: 'Jagdalpur Bastar Depot',
    departureTime: '09:00 PM',
    arrivalTime: '05:30 AM (Next Day)',
    duration: '8.5 Hours',
    fareINR: 650,
    availableSeats: 14,
    rating: 4.8,
    isGreenEco: false
  },
  {
    id: 'tr-03',
    type: 'train',
    provider: 'Indian Railways (South East Central)',
    name: 'Vistadome Bastar Express',
    from: 'Visakhapatnam (VSKP)',
    to: 'Jagdalpur (JDB) via Ananthagiri Ghats',
    departureTime: '06:50 AM',
    arrivalTime: '04:00 PM',
    duration: '9 Hours',
    fareINR: 880,
    availableSeats: 8,
    rating: 4.98,
    isGreenEco: true
  },
  {
    id: 'tr-04',
    type: 'local',
    provider: 'Kanger Valley Forest Safari Electric Jeep',
    name: '4x4 Open Top Eco Safari Jeep',
    from: 'Kotamsar Forest Gate',
    to: 'Kutumsar Cave & Tirathgarh Loop',
    departureTime: '08:30 AM & 02:00 PM',
    arrivalTime: 'Round Trip Tour',
    duration: '4 Hours',
    fareINR: 1200,
    availableSeats: 6,
    rating: 4.92,
    isGreenEco: true
  }
];

export const bookingService = {
  getUserBookings(): Booking[] {
    try {
      const stored = localStorage.getItem('dharohar_bookings');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: 'BK-CG-9021',
        bookingType: 'experience',
        title: 'Bastar Dokra Bell Metal Casting Workshop',
        providerName: 'Mangli Bai & Jaidev Shilp Guild',
        location: 'Kondagaon Craft Cluster',
        date: 'October 16, 2026',
        travelers: 2,
        amountINR: 2500,
        status: 'Confirmed',
        impactBreakdown: {
          guide: 700,
          homestay: 0,
          food: 350,
          artisan: 1250,
          transport: 0,
          community: 200
        },
        qrCode: 'DHAROHAR-QR-BK9021',
        createdAt: 'Oct 12, 2026'
      }
    ];
  },

  saveBookings(bookings: Booking[]) {
    try {
      localStorage.setItem('dharohar_bookings', JSON.stringify(bookings));
    } catch {}
  },

  createBooking(
    bookingType: 'experience' | 'homestay' | 'guide' | 'transport',
    title: string,
    providerName: string,
    location: string,
    date: string,
    travelers: number,
    amountINR: number
  ): Booking {
    const newBooking: Booking = {
      id: 'BK-CG-' + Math.floor(1000 + Math.random() * 9000),
      bookingType,
      title,
      providerName,
      location,
      date,
      travelers,
      amountINR,
      status: 'Confirmed',
      impactBreakdown: {
        guide: Math.round(amountINR * 0.35),
        homestay: Math.round(amountINR * 0.25),
        food: Math.round(amountINR * 0.15),
        artisan: Math.round(amountINR * 0.15),
        transport: Math.round(amountINR * 0.05),
        community: Math.round(amountINR * 0.05)
      },
      qrCode: 'DHAROHAR-PASS-QR-' + Date.now(),
      createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };

    const current = this.getUserBookings();
    current.unshift(newBooking);
    this.saveBookings(current);

    // Automatically update traveler's Dharohar Pass impact!
    dharoharPassService.recordBookingImpact(amountINR);

    return newBooking;
  }
};
