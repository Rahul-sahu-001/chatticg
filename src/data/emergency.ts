export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: 'police' | 'medical' | 'forest' | 'tourist' | 'disaster';
  description: string;
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'cg-police',
    name: 'Chhattisgarh Emergency Helpline (ERSS)',
    number: '112',
    type: 'police',
    description: 'Unified state-wide emergency response for police, fire, and distress.'
  },
  {
    id: 'tourist-police',
    name: 'Chhattisgarh Tourist Police & Assistance Desk',
    number: '+91-771-4224600',
    type: 'tourist',
    description: 'Dedicated tourism safety, guide verification, and highway tourist help.'
  },
  {
    id: 'medical-emergency',
    name: 'Ambulance & Medical Emergency',
    number: '108',
    type: 'medical',
    description: 'Free 24x7 state ambulance response with GPS tracking.'
  },
  {
    id: 'bastar-forest-patrol',
    name: 'Bastar & Kanger Valley Forest Ranger Outpost',
    number: '+91-7782-222350',
    type: 'forest',
    description: 'National park emergency, wildlife encounters, cave search & rescue.'
  },
  {
    id: 'state-disaster-response',
    name: 'State Disaster Management Authority (SDMA)',
    number: '1070',
    type: 'disaster',
    description: 'Flood alerts, landslide status, and monsoon river level advisories.'
  }
];

export const SAFETY_TIPS: string[] = [
  'Deep Forest Travel: Always enter Kanger Valley and buffer reserves with a certified local tribal guide registered on DHAROHARCG.',
  'Cave Safety: Never step into unlit passages in Kutumsar or Dandak caves alone; wear helmets and carry high-beam torches.',
  'River & Waterfall Current: Water currents at Chitrakote and Tirathgarh intensify rapidly during July-October; stay behind barrier ropes.',
  'Mobile Connectivity: In remote Bastar valleys, download the DHAROHARCG Offline Travel Pack before leaving Jagdalpur or Raipur.',
  'Cultural Respect: Always ask permission before photographing tribal religious ceremonies (Devgudis) and village elders.'
];
