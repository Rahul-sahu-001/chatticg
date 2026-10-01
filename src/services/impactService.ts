export interface SpendingBreakdown {
  spendingTotal: number;
  localGuide: number;
  homestay: number;
  localFood: number;
  artisan: number;
  transport: number;
  communityFund: number;
  localRetentionTotal: number;
  retentionPercentage: number;
}

export const impactService = {
  calculateBreakdown(totalINR: number): SpendingBreakdown {
    const spending = Math.max(500, totalINR);
    // Realistic Chhattisgarh rural community breakdown
    const localGuide = Math.round(spending * 0.35); // 35%
    const homestay = Math.round(spending * 0.25); // 25%
    const localFood = Math.round(spending * 0.17); // 17%
    const artisan = Math.round(spending * 0.12); // 12%
    const transport = Math.round(spending * 0.07); // 7%
    const communityFund = Math.round(spending * 0.04); // 4%

    const localRetentionTotal = localGuide + homestay + localFood + artisan + transport + communityFund;
    const retentionPercentage = Math.round((localRetentionTotal / spending) * 100);

    return {
      spendingTotal: spending,
      localGuide,
      homestay,
      localFood,
      artisan,
      transport,
      communityFund,
      localRetentionTotal,
      retentionPercentage
    };
  },

  getPlatformImpactStats() {
    return {
      totalLocalIncomeGeneratedINR: 4285000,
      totalLocalBookings: 3420,
      artisansSupported: 540,
      guidesSupported: 180,
      homestaysSupported: 84,
      plasticBottlesAvoidedKg: 12600,
      retentionMultiplier: '3.4x higher than conventional mass booking platforms'
    };
  }
};
