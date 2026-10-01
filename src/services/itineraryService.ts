import { AIItineraryPlan, AIItineraryRequest, ItineraryDay, TourismLoadLevel } from '../types';
import { DESTINATIONS } from '../data/destinations';
import { EXPERIENCES } from '../data/experiences';
import { LOCAL_DISHES } from '../data/foods';

export const itineraryService = {
  generateItinerary(req: AIItineraryRequest): AIItineraryPlan {
    const daysCount = Math.max(1, Math.min(req.days, 7));
    const dailyTargetBudget = Math.round(req.budgetINR / daysCount);

    // Filter relevant destinations based on region & interests
    let candidateDests = DESTINATIONS.filter(d => {
      if (req.destinationRegion && req.destinationRegion !== 'All Chhattisgarh') {
        return d.region === req.destinationRegion || d.district.toLowerCase().includes(req.destinationRegion.toLowerCase());
      }
      return true;
    });

    if (candidateDests.length === 0) {
      candidateDests = [...DESTINATIONS];
    }

    // Apply crowd preference filtering
    if (req.crowdPreference === 'Low Crowds (Offbeat)') {
      candidateDests.sort((a, b) => {
        if (a.tourismLoad === 'LOW' && b.tourismLoad !== 'LOW') return -1;
        if (a.tourismLoad === 'HIGH' && b.tourismLoad !== 'HIGH') return 1;
        return 0;
      });
    }

    const days: ItineraryDay[] = [];

    for (let i = 1; i <= daysCount; i++) {
      const primaryDest = candidateDests[(i - 1) % candidateDests.length];
      const secondaryDest = candidateDests[i % candidateDests.length];
      const dish = LOCAL_DISHES[(i - 1) % LOCAL_DISHES.length];
      const matchedExp = EXPERIENCES[(i - 1) % EXPERIENCES.length];

      const morningCost = Math.round(dailyTargetBudget * 0.35);
      const afternoonCost = Math.round(dailyTargetBudget * 0.4);
      const eveningCost = Math.round(dailyTargetBudget * 0.25);

      const dayTheme =
        i === 1
          ? `Arrival & Sacred Waters of ${primaryDest.name}`
          : i === 2
          ? `Deep Tribal Heritage & Living Artisans`
          : i === 3
          ? `Subterranean Wilderness & Cave Exploration`
          : i === 4
          ? `Ancient Brick Architecture & River Rites`
          : `Highland Highlands & Community Flavors`;

      const morningCrowd: TourismLoadLevel = req.crowdPreference === 'Low Crowds (Offbeat)' ? 'LOW' : primaryDest.tourismLoad;
      const afternoonCrowd: TourismLoadLevel = primaryDest.tourismLoad === 'HIGH' ? 'MODERATE' : primaryDest.tourismLoad;

      days.push({
        dayNumber: i,
        title: `Day ${i}: ${primaryDest.name}`,
        theme: dayTheme,
        dailyBudgetINR: morningCost + afternoonCost + eveningCost,
        crowdScore: morningCrowd,
        responsibleTip:
          i % 2 === 0
            ? 'Ensure all snacks are packed in cloth bags and support the village women-run cooperative.'
            : 'Buy Dokra or terracotta handicrafts directly from the artisan family to ensure 100% fair trade value.',
        morning: {
          timeWindow: '07:30 AM - 11:30 AM',
          destination: primaryDest.name,
          activity: `Morning excursion at ${primaryDest.name}. Experience ${primaryDest.whySpecial.slice(0, 120)}...`,
          travelTime: '25-40 min scenic route',
          approximateCostINR: morningCost,
          suggestedDuration: '3.5 Hours',
          crowdLevel: morningCrowd,
          localExperience: `Guided walk with community forest custodian`,
          foodSuggestion: `Breakfast of traditional hot ${dish.name} with spicy field-tomato chutney`,
          safetyNotes: primaryDest.responsibleGuidelines[0] || 'Wear comfortable hiking shoes and carry hydration.'
        },
        afternoon: {
          timeWindow: '12:30 PM - 04:30 PM',
          destination: matchedExp.village + ' (' + matchedExp.district + ')',
          activity: `Join ${matchedExp.title}. Hosted by ${matchedExp.hostName} (${matchedExp.hostRole}).`,
          travelTime: '30 min rural transfer',
          approximateCostINR: afternoonCost,
          suggestedDuration: matchedExp.duration,
          crowdLevel: 'LOW',
          localExperience: matchedExp.subtitle,
          foodSuggestion: `Community lunch: Thali with 7 wild forest greens (Bhaji), Fara, and Pehj`,
          safetyNotes: 'Respect workshop etiquette and handle heated metal or clay moulds carefully.'
        },
        evening: {
          timeWindow: '05:30 PM - 08:30 PM',
          destination: secondaryDest.name + ' Promenade & Local Haat',
          activity: `Sunset views over the river canyon followed by evening cultural storytelling and Mandar drumming.`,
          travelTime: '15 min stroll',
          approximateCostINR: eveningCost,
          suggestedDuration: '2.5 Hours',
          crowdLevel: 'MODERATE',
          localExperience: 'Campfire gathering with folk dancers and herbal tea',
          foodSuggestion: 'Steamed Bafauri dumplings and warm Mahua tea',
          safetyNotes: 'Carry a lightweight flashlight for twilight trails in forested zones.'
        }
      });
    }

    const totalEstimatedCost = days.reduce((sum, d) => sum + d.dailyBudgetINR, 0);
    const localImpact = Math.round(totalEstimatedCost * 0.88); // 88% local retention in Chhattisgarh

    return {
      id: 'plan-' + Date.now(),
      title: `${daysCount}-Day Bespoke ${req.destinationRegion || 'Chhattisgarh'} Discovery`,
      destinationRegion: req.destinationRegion || 'All Chhattisgarh',
      daysCount,
      travelGroup: req.travelGroup,
      interests: req.interests,
      totalEstimatedCostINR: totalEstimatedCost,
      localEconomicImpactINR: localImpact,
      days,
      summaryNote: `Optimized for ${req.travelGroup} travelers focusing on ${req.interests.join(', ')}. Curated with ${req.travelStyle} principles to retain ₹${localImpact.toLocaleString()} directly within rural communities.`,
      createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
  },

  optimizeItinerary(
    currentPlan: AIItineraryPlan,
    action: 'reduce_crowd' | 'more_nature' | 'more_culture' | 'adjust_budget' | 'regenerate'
  ): AIItineraryPlan {
    const cloned = JSON.parse(JSON.stringify(currentPlan)) as AIItineraryPlan;
    cloned.id = 'plan-opt-' + Date.now();

    if (action === 'reduce_crowd') {
      cloned.title = cloned.title.replace('Discovery', 'Offbeat & Serene Trail');
      cloned.summaryNote = 'Crowd Optimizer Activated: Overcrowded destinations replaced with pristine hidden alternatives (Tamda Ghumar, Sirpur quiet hours, Madku Dweep).';
      cloned.days.forEach(day => {
        day.crowdScore = 'LOW';
        day.morning.crowdLevel = 'LOW';
        day.morning.destination = 'Tamda Ghumar Secret Canyon';
        day.morning.activity = 'Early morning solitary exploration away from the tourist crowd.';
      });
    } else if (action === 'more_nature') {
      cloned.title = cloned.title.replace('Discovery', 'Deep Forest & Wildlife Sanctuary Expedition');
      cloned.summaryNote = 'Nature Optimizer: Shifted focus to Kanger Valley subterranean caves, Barnawapara wildlife tracks, and Tirathgarh multi-tier cascades.';
      cloned.days.forEach(day => {
        day.afternoon.activity = 'Jungle canopy trail, birdwatching for Bastar Hill Myna, and ancient cave exploration.';
      });
    } else if (action === 'more_culture') {
      cloned.title = cloned.title.replace('Discovery', 'Immersive Tribal Arts & Dokra Heritage Journey');
      cloned.summaryNote = 'Culture Optimizer: Added master workshops with National Award-winning Dokra artisans, Ghotul oral storytelling, and Kosa silk handlooms.';
      cloned.days.forEach(day => {
        day.afternoon.activity = 'Hands-on lost-wax Dokra bell metal casting workshop with master craftsmen in Kondagaon.';
      });
    } else if (action === 'adjust_budget') {
      cloned.totalEstimatedCostINR = Math.round(cloned.totalEstimatedCostINR * 0.82);
      cloned.localEconomicImpactINR = Math.round(cloned.totalEstimatedCostINR * 0.9);
      cloned.summaryNote = 'Budget Optimized: Tuned for high-value community homestays and direct public-access viewpoints with maximum local rupee retention.';
    }

    return cloned;
  }
};
