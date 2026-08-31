'use client';

import React, { createContext, useContext, useState } from 'react';
import { 
  ActiveWebsite,
  Language, 
  AccessibilitySettings, 
  Site1OfficeAuth,
  Site2DPCAuth,
  FarmerRecord, 
  DPCLocationCenter, 
  ProcurementAppointment, 
  TalukOverflowMetric, 
  SMSLog 
} from '@/types';
import { 
  INITIAL_FARMER_RECORDS, 
  INITIAL_DPC_CENTERS, 
  INITIAL_PROCUREMENT_APPOINTMENTS, 
  INITIAL_TALUK_OVERFLOW_METRICS, 
  INITIAL_SMS_LOGS 
} from '@/lib/mockData';
import { translations } from '@/lib/translations';
import { playAudioText, stopAudioPlayback } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface ModalState {
  type: 'token_pass' | 'dbt_receipt' | 'sms_details' | null;
  data?: any;
}

interface AppContextType {
  activeWebsite: ActiveWebsite;
  setActiveWebsite: (site: ActiveWebsite) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.ta;
  accessibility: AccessibilitySettings;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;

  // Website 1: Officer Auth (PACCS / Agri Extension)
  site1Auth: Site1OfficeAuth;
  loginSite1Officer: (deptId: string, pin: string, officeName?: string) => boolean;
  logoutSite1Officer: () => void;

  // Website 2: Officer Auth (TNCSC DPC)
  site2Auth: Site2DPCAuth;
  loginSite2Officer: (deptId: string, pin: string, dpcId?: string) => boolean;
  logoutSite2Officer: () => void;

  // Website 1: Farmer Office Registration
  farmers: FarmerRecord[];
  registerFarmerAtOffice: (formData: {
    office: string;
    aadhaarNumber: string;
    pmKisanId?: string;
    name: string;
    nameTa?: string;
    phone: string;
    district: string;
    taluk: string;
    village: string;
    pattaNumber: string;
    surveyNumber: string;
    season: any;
    variety: string;
    sowingDate: string;
    cropAreaAcres: number;
    expectedYieldBags: number;
    bankAccount: string;
    bankName: string;
    ifscCode: string;
  }) => FarmerRecord;

  // Website 2: DPC Procurement Management
  dpcs: DPCLocationCenter[];
  appointments: ProcurementAppointment[];
  talukMetrics: TalukOverflowMetric[];
  smsLogs: SMSLog[];
  modal: ModalState;

  // Actions
  openModal: (type: ModalState['type'], data?: any) => void;
  closeModal: () => void;
  bookProcurementAppointment: (data: {
    farmerId: string;
    dpcId: string;
    paddyType: any;
    variety: string;
    gunnyBagsCount: number;
    appointmentDate: string;
    appointmentTimeSlot: string;
    transportMode: any;
    vehicleNumber: string;
  }) => ProcurementAppointment;
  logWeighbridgeWeight: (appointmentId: string, grossKg: number, tareKg: number) => void;
  verifyMoistureAndDisburseDBT48Hrs: (appointmentId: string, moisture: number, foreignMatter: number) => void;
  executeSmartAIRedirection: (sourceDpcId: string, targetDpcId: string) => void;

  // Audio Speech
  isAudioPlaying: boolean;
  speak: (text: string) => void;
  stopAudio: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeWebsite, setActiveWebsite] = useState<ActiveWebsite>('farmer_office_registration');
  const [language, setLanguage] = useState<Language>('ta');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    highContrast: false,
    textToSpeech: false,
  });

  // Website 1 Officer Auth (Default logged in for evaluation, togglable via Logout button)
  const [site1Auth, setSite1Auth] = useState<Site1OfficeAuth>({
    isLoggedIn: true,
    officerId: "PACCS-TNJ-1048",
    name: "S. Balakrishnan",
    designation: "Secretary (PACCS Agricultural Cooperative)",
    officeName: "PACCS Thiruvaiyaru Cooperative Bank",
    district: "Thanjavur (தஞ்சாவூர்)",
    taluk: "Thiruvaiyaru",
    loginTime: "08:30 AM",
  });

  // Website 2 Officer Auth (Default logged in for evaluation, togglable via Logout button)
  const [site2Auth, setSite2Auth] = useState<Site2DPCAuth>({
    isLoggedIn: true,
    officerId: "TNCSC-TNJ-4821",
    name: "K. Rajendran",
    designation: "Assistant Manager (TNCSC Procurement)",
    dpcId: "DPC-TNJ-VALLAM",
    dpcName: "Thanjavur Main DPC - Vallam Road Yard",
    district: "Thanjavur (தஞ்சாவூர்)",
    loginTime: "08:45 AM",
  });

  // Master State
  const [farmers, setFarmers] = useState<FarmerRecord[]>(INITIAL_FARMER_RECORDS);
  const [dpcs, setDpcs] = useState<DPCLocationCenter[]>(INITIAL_DPC_CENTERS);
  const [appointments, setAppointments] = useState<ProcurementAppointment[]>(INITIAL_PROCUREMENT_APPOINTMENTS);
  const [talukMetrics] = useState<TalukOverflowMetric[]>(INITIAL_TALUK_OVERFLOW_METRICS);
  const [smsLogs, setSmsLogs] = useState<SMSLog[]>(INITIAL_SMS_LOGS);
  const [modal, setModal] = useState<ModalState>({ type: null });
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const t = translations[language];

  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    setAccessibility(prev => ({ ...prev, ...settings }));
  };

  // Auth Methods for Website 1
  const loginSite1Officer = (deptId: string, pin: string, officeName?: string): boolean => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSite1Auth({
      isLoggedIn: true,
      officerId: deptId || "PACCS-TNJ-1048",
      name: "S. Balakrishnan",
      designation: "Secretary (PACCS Cooperative)",
      officeName: officeName || "PACCS Thiruvaiyaru Cooperative Bank",
      district: "Thanjavur (தஞ்சாவூர்)",
      taluk: "Thiruvaiyaru",
      loginTime: nowTime,
    });
    return true;
  };

  const logoutSite1Officer = () => {
    setSite1Auth(prev => ({ ...prev, isLoggedIn: false }));
  };

  // Auth Methods for Website 2
  const loginSite2Officer = (deptId: string, pin: string, dpcId?: string): boolean => {
    const dpc = dpcs.find(d => d.id === dpcId) || dpcs[0];
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSite2Auth({
      isLoggedIn: true,
      officerId: deptId || "TNCSC-TNJ-4821",
      name: "K. Rajendran",
      designation: "Assistant Manager (TNCSC)",
      dpcId: dpc.id,
      dpcName: dpc.name,
      district: dpc.district,
      loginTime: nowTime,
    });
    return true;
  };

  const logoutSite2Officer = () => {
    setSite2Auth(prev => ({ ...prev, isLoggedIn: false }));
  };

  const openModal = (type: ModalState['type'], data?: any) => {
    setModal({ type, data });
  };

  const closeModal = () => {
    setModal({ type: null });
  };

  const speak = (text: string) => {
    setIsAudioPlaying(true);
    playAudioText(text, language);
    setTimeout(() => {
      setIsAudioPlaying(false);
    }, Math.min(12000, Math.max(2000, text.length * 75)));
  };

  const stopAudio = () => {
    setIsAudioPlaying(false);
    stopAudioPlayback();
  };

  // ==========================================
  // WEBSITE 1: REGISTER FARMER AT OFFICE (PACCS / SEED STATION)
  // ==========================================
  const registerFarmerAtOffice = (formData: {
    office: string;
    aadhaarNumber: string;
    pmKisanId?: string;
    name: string;
    nameTa?: string;
    phone: string;
    district: string;
    taluk: string;
    village: string;
    pattaNumber: string;
    surveyNumber: string;
    season: any;
    variety: string;
    sowingDate: string;
    cropAreaAcres: number;
    expectedYieldBags: number;
    bankAccount: string;
    bankName: string;
    ifscCode: string;
  }): FarmerRecord => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const regNumber = `TN-REG-2026-${randomNum}`;
    const uzhavanId = `UZH-${formData.district.slice(0, 3).toUpperCase()}-2026-${randomNum}`;

    const ripeningDays = formData.season.includes('Kuruvai') ? 115 : formData.season.includes('Thaladi') ? 135 : 130;
    const sowingD = new Date(formData.sowingDate || '2026-08-15');
    const harvestStart = new Date(sowingD.getTime() + ripeningDays * 24 * 60 * 60 * 1000);
    const harvestEnd = new Date(harvestStart.getTime() + 10 * 24 * 60 * 60 * 1000);
    const startStr = harvestStart.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const endStr = harvestEnd.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const windowStr = harvestStart.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    const expectedTons = Number(((formData.expectedYieldBags * 40) / 1000).toFixed(2));

    const newRecord: FarmerRecord = {
      id: `FARMER-${randomNum}`,
      registrationNumber: regNumber,
      aadhaarNumber: formData.aadhaarNumber,
      pmKisanId: formData.pmKisanId || `PMK-TN-${randomNum}`,
      uzhavanId,
      name: formData.name,
      nameTa: formData.nameTa || formData.name,
      phone: formData.phone,
      registrationOffice: formData.office,
      district: formData.district,
      taluk: formData.taluk,
      village: formData.village,
      pattaNumber: formData.pattaNumber,
      surveyNumber: formData.surveyNumber,
      totalLandAcreage: formData.cropAreaAcres,
      isTenant: false,
      bankAccount: formData.bankAccount,
      bankName: formData.bankName,
      ifscCode: formData.ifscCode,
      registrationTimestamp: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      smsSent: true,
      sowing: {
        season: formData.season,
        crop: "Paddy (நெல்)",
        variety: formData.variety,
        sowingDate: formData.sowingDate,
        cropAreaAcres: formData.cropAreaAcres,
        expectedYieldBags: formData.expectedYieldBags,
        expectedYieldTons: expectedTons,
        aiEstimatedRipeningDays: ripeningDays,
        aiPredictedHarvestStart: startStr,
        aiPredictedHarvestEnd: endStr,
        aiProcurementWindow: windowStr,
      }
    };

    setFarmers(prev => [newRecord, ...prev]);

    const newSMS: SMSLog = {
      id: `SMS-${Date.now()}`,
      sender: "TN-AGRI-OFFICE",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recipientPhone: formData.phone,
      farmerName: formData.name,
      type: "office_registration",
      contentTa: `தமிழ்நாடு அரசு வேளாண்மை & கூட்டுறவு அலுவலகப் பதிவு: திரு/திருமதி ${formData.nameTa || formData.name}, உங்கள் பதிவு எண்: ${regNumber}. சாகுபடி: ${formData.cropAreaAcres} ஏக்கர் (${formData.variety}). AI அறுவடை கணக்கீடு: ${startStr} முதல் ${endStr}. அறுவடைக்கு முன் DPC நேரடி கொள்முதல் நாள் முன்பதிவு செய்யவும்.`,
      contentEn: `Govt of Tamil Nadu Agri Registration: ${formData.name}, Reg No: ${regNumber} confirmed at ${formData.office}. Sown: ${formData.cropAreaAcres} Acres (${formData.variety}). AI Ripening window: ${startStr} to ${endStr}. Book DPC procurement slot near harvest date.`,
    };
    setSmsLogs(prev => [newSMS, ...prev]);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#1b4332', '#e9c46a', '#40916c'],
      });
    } catch (e) {}

    return newRecord;
  };

  // ==========================================
  // WEBSITE 2: DPC PROCUREMENT MANAGEMENT ACTIONS
  // ==========================================
  const bookProcurementAppointment = (data: {
    farmerId: string;
    dpcId: string;
    paddyType: any;
    variety: string;
    gunnyBagsCount: number;
    appointmentDate: string;
    appointmentTimeSlot: string;
    transportMode: any;
    vehicleNumber: string;
  }): ProcurementAppointment => {
    const farmer = farmers.find(f => f.id === data.farmerId) || farmers[0];
    const targetDpc = dpcs.find(d => d.id === data.dpcId) || dpcs[0];
    const newIdNum = Math.floor(1000 + Math.random() * 9000);
    const tokenNumber = `TN-${targetDpc.district.slice(0, 3).toUpperCase()}-2026-${newIdNum}`;

    const isGradeA = data.paddyType.includes('Grade A') || data.paddyType.includes('சன்ன');
    const msp = isGradeA ? 2320 : 2300;
    const tnBonus = 100;
    const totalRate = msp + tnBonus;
    const estimatedTons = Number(((data.gunnyBagsCount * 40) / 1000).toFixed(2));
    const totalEstimatedPayout = Math.round((estimatedTons * 10) * totalRate);

    const newApt: ProcurementAppointment = {
      id: `APT-${newIdNum}`,
      tokenNumber,
      farmerId: farmer.id,
      farmerRegNumber: farmer.registrationNumber,
      farmerName: farmer.name,
      farmerNameTa: farmer.nameTa,
      phone: farmer.phone,
      dpcId: targetDpc.id,
      dpcName: targetDpc.name,
      dpcNameTa: targetDpc.nameTa,
      district: targetDpc.district,
      taluk: targetDpc.taluk,
      paddyType: data.paddyType,
      variety: data.variety,
      gunnyBagsCount: data.gunnyBagsCount,
      estimatedTons,
      appointmentDate: data.appointmentDate,
      appointmentTimeSlot: data.appointmentTimeSlot,
      transportMode: data.transportMode,
      vehicleNumber: data.vehicleNumber,
      status: 'booked',
      mspRatePerQuintal: msp,
      tnStateBonusPerQuintal: tnBonus,
      totalPayoutAmount: totalEstimatedPayout,
      epasSlipNumber: `EPAS-TNCSC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      hourlyReminderSmsCount: 1,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAppointments(prev => [newApt, ...prev]);

    setDpcs(prev => prev.map(d => {
      if (d.id === targetDpc.id) {
        const newProcured = d.currentProcuredTons + estimatedTons;
        const newRemaining = Math.max(0, d.dailyCapacityTons - newProcured);
        const occupancy = Math.round((newProcured / d.dailyCapacityTons) * 100);
        return {
          ...d,
          currentProcuredTons: newProcured,
          remainingCapacityTons: newRemaining,
          occupancyPercentage: occupancy,
          activeTruckQueue: d.activeTruckQueue + 1,
          status: occupancy >= 90 ? 'critical_overflow' : 'normal',
          lastUpdatedMinutesAgo: 1,
        };
      }
      return d;
    }));

    const newSMS: SMSLog = {
      id: `SMS-${Date.now()}`,
      sender: "TN-TNCSC-DPC",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recipientPhone: farmer.phone,
      farmerName: farmer.name,
      type: "hourly_slot_reminder",
      contentTa: `DPC நேரடி கொள்முதல் நினைவூட்டல்: டோக்கன் ${tokenNumber}. ${targetDpc.nameTa}-ல் ${data.appointmentDate} (${data.appointmentTimeSlot}) ஸ்லாட் உறுதி செய்யப்பட்டுள்ளது. உங்கள் நேரத்திற்கு 1 மணி நேரம் முன் புறப்படவும். மூட்டைகள்: ${data.gunnyBagsCount}.`,
      contentEn: `TNCSC DPC Hourly Slot Reminder: Token ${tokenNumber} confirmed at ${targetDpc.name} on ${data.appointmentDate} (${data.appointmentTimeSlot}). 1 hr prior reminder activated. Bags: ${data.gunnyBagsCount}.`,
    };
    setSmsLogs(prev => [newSMS, ...prev]);

    openModal('token_pass', newApt);
    return newApt;
  };

  const logWeighbridgeWeight = (appointmentId: string, grossKg: number, tareKg: number) => {
    const netKg = grossKg - tareKg;
    const netTons = Number((netKg / 1000).toFixed(2));

    setAppointments(prev => prev.map(apt => {
      if (apt.id === appointmentId) {
        const totalRate = apt.mspRatePerQuintal + apt.tnStateBonusPerQuintal;
        return {
          ...apt,
          status: 'arrived',
          grossWeightKg: grossKg,
          tareWeightKg: tareKg,
          actualTons: netTons,
          totalPayoutAmount: Math.round((netTons * 10) * totalRate),
        };
      }
      return apt;
    }));
  };

  const verifyMoistureAndDisburseDBT48Hrs = (appointmentId: string, moisture: number, foreignMatter: number) => {
    const passed = moisture <= 17.0;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const txnId = `PFMS-TNCSC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000000 + Math.random() * 9000000)}`;

    setAppointments(prev => prev.map(apt => {
      if (apt.id === appointmentId) {
        return {
          ...apt,
          status: passed ? 'dbt_credited' : 'rejected',
          moisturePercentage: moisture,
          foreignMatterPercentage: foreignMatter,
          qualityPassed: passed,
          dbtTxnId: passed ? txnId : undefined,
          dbtCreditedAt: passed ? `Direct PFMS DBT credited within 48 hrs (${nowTime})` : undefined,
        };
      }
      return apt;
    }));

    const apt = appointments.find(a => a.id === appointmentId);
    if (apt && passed) {
      const weightTons = apt.actualTons || apt.estimatedTons || 8.0;
      const totalRate = apt.mspRatePerQuintal + apt.tnStateBonusPerQuintal;
      const totalPayout = Math.round(weightTons * 10 * totalRate);

      const dbtSMS: SMSLog = {
        id: `SMS-${Date.now()}`,
        sender: "TN-PFMS-DBT",
        timestamp: nowTime,
        recipientPhone: apt.phone,
        farmerName: apt.farmerName,
        type: "dbt_credit",
        contentTa: `TNCSC நேரடி வங்கி வரவு (48 மணி நேரத்திற்குள்): ${weightTons} டன் நெல்லுக்கான தொகை ₹${totalPayout.toLocaleString('en-IN')} (MSP + தமிழக அரசு போனஸ் ₹100) உங்கள் வங்கி கணக்கில் நேரடியாக செலுத்தப்பட்டது. UTR: ${txnId}.`,
        contentEn: `TNCSC Direct Bank Deposit (within 48 hrs): ₹${totalPayout.toLocaleString('en-IN')} credited for ${weightTons} MT Paddy as per G.O. Ms 148. UTR: ${txnId}.`,
      };
      setSmsLogs(prev => [dbtSMS, ...prev]);

      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1b4332', '#e9c46a', '#40916c'],
        });
      } catch (e) {}

      openModal('dbt_receipt', {
        ...apt,
        status: 'dbt_credited',
        actualTons: weightTons,
        totalPayoutAmount: totalPayout,
        dbtTxnId: txnId,
        dbtCreditedAt: `Credited within 48 hrs (${nowTime})`,
      });
    }
  };

  const executeSmartAIRedirection = (sourceDpcId: string, targetDpcId: string) => {
    setDpcs(prev => prev.map(d => {
      if (d.id === sourceDpcId) {
        return {
          ...d,
          currentProcuredTons: 260,
          remainingCapacityTons: 90,
          occupancyPercentage: 74,
          activeTruckQueue: 12,
          avgWaitMins: 30,
          status: 'normal',
          lastUpdatedMinutesAgo: 1,
        };
      }
      if (d.id === targetDpcId) {
        return {
          ...d,
          currentProcuredTons: 180,
          remainingCapacityTons: 100,
          occupancyPercentage: 64,
          activeTruckQueue: 10,
          avgWaitMins: 20,
          status: 'normal',
          lastUpdatedMinutesAgo: 1,
        };
      }
      return d;
    }));

    const redirectSMS: SMSLog = {
      id: `SMS-${Date.now()}`,
      sender: "TN-DPC-REDIRECT",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recipientPhone: "+91 94431 82910",
      farmerName: "Tractor Convoys",
      type: "ai_redirection",
      contentTa: `TNCSC AI அறிவிப்பு: தஞ்சாவூர் வல்லம் DPC நெரிசல் தவிர்க்கப்பட்டது. உங்கள் வாகனம் அருகிலுள்ள கும்பகோணம் DPC-க்கு திருப்பி விடப்பட்டுள்ளது (14 கி.மீ). உடனடி எடை மேடை அனுமதி தயார்.`,
      contentEn: `TNCSC Smart AI Routing: Thanjavur Vallam DPC bottleneck avoided. 8 tractor loads rerouted to Kumbakonam Central DPC (14 km). Zero queue wait time.`,
    };
    setSmsLogs(prev => [redirectSMS, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        activeWebsite,
        setActiveWebsite,
        language,
        setLanguage,
        t,
        accessibility,
        updateAccessibility,
        site1Auth,
        loginSite1Officer,
        logoutSite1Officer,
        site2Auth,
        loginSite2Officer,
        logoutSite2Officer,
        farmers,
        registerFarmerAtOffice,
        dpcs,
        appointments,
        talukMetrics,
        smsLogs,
        modal,
        openModal,
        closeModal,
        bookProcurementAppointment,
        logWeighbridgeWeight,
        verifyMoistureAndDisburseDBT48Hrs,
        executeSmartAIRedirection,
        isAudioPlaying,
        speak,
        stopAudio,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
