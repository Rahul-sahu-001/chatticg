import { Destination, TourismLoadData, TourismLoadLevel } from '../types';
import { DESTINATIONS } from '../data/destinations';

export const tourismLoadService = {
  getAllDestinationsLoad(): TourismLoadData[] {
    return DESTINATIONS.map(dest => {
      const alternatives = (dest.alternativeDestinations || [])
        .map(altId => {
          const found = DESTINATIONS.find(d => d.id === altId);
          return found
            ? {
                id: found.id,
                name: found.name,
                load: found.tourismLoad,
                distanceKm: Math.floor(Math.random() * 25) + 12
              }
            : null;
        })
        .filter(Boolean) as { id: string; name: string; load: TourismLoadLevel; distanceKm: number }[];

      const hours = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
      const hourlyTrend = hours.map((hour, idx) => ({
        hour,
        level: dest.crowdTrend[idx] || 30
      }));

      let statusText = 'Balanced Footfall';
      if (dest.tourismLoad === 'LOW') {
        statusText = 'Serene & Low Pressure — Optimal Visit Time!';
      } else if (dest.tourismLoad === 'HIGH') {
        statusText = 'High Footfall — Consider Nearby Alternative Gems!';
      }

      return {
        destinationId: dest.id,
        destinationName: dest.name,
        district: dest.district,
        currentLevel: dest.tourismLoad,
        currentVisitors: dest.currentVisitors,
        capacityLimit: dest.capacityLimit,
        statusText,
        recommendedHours: dest.recommendedTime,
        alternativeDestinations: alternatives,
        hourlyTrend
      };
    });
  },

  getDestinationLoad(id: string): TourismLoadData | undefined {
    return this.getAllDestinationsLoad().find(d => d.destinationId === id);
  },

  getAlternativeDestinations(currentId: string): Destination[] {
    const current = DESTINATIONS.find(d => d.id === currentId);
    if (!current) return [];

    return DESTINATIONS.filter(
      d =>
        d.id !== currentId &&
        (current.alternativeDestinations?.includes(d.id) || d.tourismLoad === 'LOW')
    ).slice(0, 3);
  },

  calculateStatePressureStats() {
    const totalCurrentVisitors = DESTINATIONS.reduce((sum, d) => sum + d.currentVisitors, 0);
    const totalCapacity = DESTINATIONS.reduce((sum, d) => sum + d.capacityLimit, 0);
    const lowCount = DESTINATIONS.filter(d => d.tourismLoad === 'LOW').length;
    const modCount = DESTINATIONS.filter(d => d.tourismLoad === 'MODERATE').length;
    const highCount = DESTINATIONS.filter(d => d.tourismLoad === 'HIGH').length;

    return {
      totalCurrentVisitors,
      totalCapacity,
      utilizationPercentage: Math.round((totalCurrentVisitors / totalCapacity) * 100),
      lowCount,
      modCount,
      highCount,
      greenIndexScore: 92 // High eco-sustainability index
    };
  }
};
