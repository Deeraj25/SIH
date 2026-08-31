export type Language = 'ta' | 'en' | 'hi';

export type FontSize = 'normal' | 'large' | 'xlarge';

export interface AccessibilitySettings {
  fontSize: FontSize;
  highContrast: boolean;
  textToSpeech: boolean;
}

export type ActiveWebsite = 'farmer_office_registration' | 'dpc_procurement_management';

// Website 1 Officer Auth (PACCS / Seed Station / Cooperative Bank)
export interface Site1OfficeAuth {
  isLoggedIn: boolean;
  officerId: string;
  name: string;
  designation: string;
  officeName: string;
  district: string;
  taluk: string;
  loginTime: string;
}

// Website 2 Officer Auth (TNCSC DPC Center In-Charge)
export interface Site2DPCAuth {
  isLoggedIn: boolean;
  officerId: string;
  name: string;
  designation: string;
  dpcId: string;
  dpcName: string;
  district: string;
  loginTime: string;
}

// Website 1: Farmer Registration at Office / PACCS / Seed Station
export interface SowingDetails {
  season: 'Samba (சம்பா)' | 'Kuruvai (குறுவை)' | 'Thaladi (தாளடி)';
  crop: 'Paddy (நெல்)';
  variety: string;
  sowingDate: string;
  cropAreaAcres: number;
  expectedYieldBags: number; // 40 kg gunny bags
  expectedYieldTons: number;
  // Point 6: AI Ripening Prediction
  aiEstimatedRipeningDays: number;
  aiPredictedHarvestStart: string;
  aiPredictedHarvestEnd: string;
  aiProcurementWindow: string;
}

export interface FarmerRecord {
  id: string;
  registrationNumber: string; // e.g. TN-REG-2026-4821
  aadhaarNumber: string; // 12-digit Aadhaar / PM-Kisan / Farmer ID
  pmKisanId?: string;
  uzhavanId: string;
  name: string;
  nameTa: string;
  phone: string;
  registrationOffice: string; // PACCS, Agri Extension Centre, Cooperative Bank
  district: string;
  taluk: string;
  village: string;
  pattaNumber: string;
  surveyNumber: string;
  totalLandAcreage: number;
  isTenant: boolean;
  bankAccount: string;
  bankName: string;
  ifscCode: string;
  sowing: SowingDetails;
  registrationTimestamp: string;
  smsSent: boolean;
}

// Website 2: DPC Procurement Management
export interface DPCLocationCenter {
  id: string;
  name: string;
  nameTa: string;
  district: string;
  taluk: string;
  village: string;
  address: string;
  gpsCoordinates: string;
  dailyCapacityTons: number;
  currentProcuredTons: number;
  remainingCapacityTons: number;
  activeTruckQueue: number;
  avgWaitMins: number;
  occupancyPercentage: number;
  status: 'normal' | 'warning' | 'critical_overflow';
  inChargeName: string;
  contactPhone: string;
  availableGunnyBags: number;
  coveredStorageBags: number;
  capCoverPlinths: number;
  lastUpdatedMinutesAgo: number;
}

export interface ProcurementAppointment {
  id: string;
  tokenNumber: string; // e.g. TN-TNJ-2026-9011
  farmerId: string;
  farmerRegNumber: string;
  farmerName: string;
  farmerNameTa: string;
  phone: string;
  dpcId: string;
  dpcName: string;
  dpcNameTa: string;
  district: string;
  taluk: string;
  paddyType: 'Paddy Grade A (சன்ன ரகம்)' | 'Paddy Common (பொது ரகம்)';
  variety: string;
  gunnyBagsCount: number;
  estimatedTons: number;
  actualTons?: number;
  grossWeightKg?: number;
  tareWeightKg?: number;
  appointmentDate: string;
  appointmentTimeSlot: string;
  transportMode: 'Tractor (டிராக்டர்)' | 'Mini Lorry (மினி லாரி)' | 'Bullock Cart (மாட்டு வண்டி)' | 'Auto Cargo (சரக்கு ஆட்டோ)';
  vehicleNumber: string;
  status: 'booked' | 'arrived' | 'grain_verified' | 'dbt_credited' | 'redirected' | 'rejected';
  moisturePercentage?: number;
  foreignMatterPercentage?: number;
  qualityPassed?: boolean;
  mspRatePerQuintal: number;
  tnStateBonusPerQuintal: number;
  totalPayoutAmount?: number;
  dbtTxnId?: string;
  dbtCreditedAt?: string;
  epasSlipNumber?: string;
  hourlyReminderSmsCount: number;
  redirectionNote?: string;
  createdAt: string;
}

export type SlotToken = ProcurementAppointment;
export type DPCCenter = DPCLocationCenter;

// Point 9: State Governance Taluk Overflow Data
export interface TalukOverflowMetric {
  taluk: string;
  district: string;
  totalProcurementDemandTons: number;
  existingDpcCapacityTons: number;
  overflowDeficitTons: number;
  overflowFrequency: 'Severe (Every Season)' | 'High' | 'Moderate';
  recommendedNewDpcLocations: string[];
  lastYearProcuredTons: number;
  currentYearProcuredTons: number;
  procurementGrowthPercent: number;
  priceAdjustmentRecommendation: string;
}

export interface SMSLog {
  id: string;
  sender: string;
  timestamp: string;
  recipientPhone: string;
  farmerName: string;
  type: 'office_registration' | 'harvest_ripening_alert' | 'hourly_slot_reminder' | 'dbt_credit' | 'ai_redirection';
  contentTa: string;
  contentEn: string;
}
