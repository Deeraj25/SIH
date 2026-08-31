import { Language } from '@/types';

export const translations = {
  ta: {
    // Top Bar & State Gov Branding
    govName: "தமிழ்நாடு அரசு",
    deptName: "வேளாண்மை மற்றும் கூட்டுறவு, உணவு & நுகர்பொருள் பாதுகாப்புத் துறை",
    tncscTitle: "தமிழ்நாடு நுகர்பொருள் வாணிபக் கழகம் (TNCSC)",
    sihBadge: "SIH26032 - தமிழக உழவர் & கொள்முதல் அமைப்பு",

    // Dual-Website Switcher Tabs
    websiteSwitch: {
      site1Name: "வலைத்தளம் 1: உழவர் பதிவு அலுவலக தளம் (Farmer Reg Office)",
      site1Short: "1. உழவர் பதிவு அலுவலகம் (PACCS/வங்கி)",
      site2Name: "வலைத்தளம் 2: DPC நேரடி கொள்முதல் தளம் (DPC Procurement)",
      site2Short: "2. DPC கொள்முதல் மேலாண்மை",
    },

    // Accessibility
    textSize: "எழுத்து அளவு",
    highContrast: "சூரிய ஒளி பார்வை (ஹை கான்ட்ராஸ்ட்)",
    voiceNarration: "குரல் வழி வாசிப்பு",
    readAloud: "பக்கத்தை வாசி",
    stopReading: "நிறுத்து",

    // ==========================================
    // WEBSITE 1: FARMER REGISTRATION OFFICE
    // ==========================================
    site1: {
      badge: "நேரடி அலுவலகப் பதிவு • போலி விவசாயிகள் தடுப்பு",
      title: "வேளாண் விரிவாக்க மையம் & கூட்டுறவு வங்கி உழவர் பதிவு தளம்",
      subtitle: "விவசாயிகள் தொடக்க வேளாண்மை கூட்டுறவு சங்கம் (PACCS) அல்லது விதை கொள்முதல் நிலையத்தில் ஆதார்/PM-கிசான் மூலம் பதிவு செய்தல்",
      officeNotice: "விவசாயிகள் நேரில் சென்று பதிவு செய்யும் முறை: போலி விவசாயிகளை தடுக்கவும், கிராமப்புற இணைய சிக்கல்களை தவிர்க்கவும் அரசு அலுவலகப் பதிவு கட்டாயமாக்கப்பட்டுள்ளது.",
      
      // Form Fields
      step1Title: "1. உழவர் சரிபார்ப்பு & அலுவலக தேர்வு (Identity & Office)",
      officeSelectLabel: "பதிவு செய்யும் அலுவலகம் / மையம்",
      aadhaarLabel: "ஆதார் எண் (12 இலக்கம்) / PM-Kisan ID",
      farmerNameLabel: "விவசாயி பெயர் (ஆங்கிலத்தில்)",
      farmerNameTaLabel: "விவசாயி பெயர் (தமிழில்)",
      phoneLabel: "கைபேசி எண் (SMS பெற)",
      districtLabel: "மாவட்டம்",
      talukLabel: "வட்டம் (Taluk)",
      villageLabel: "கிராமம்",
      pattaLabel: "பட்டா எண்",
      surveyLabel: "புல எண் (Survey Field No)",
      
      step2Title: "2. சாகுபடி பரப்பு & நெல் ரகம் (Crop Sown Details)",
      seasonLabel: "சாகுபடி பருவம்",
      varietyLabel: "பயிரிடப்பட்ட நெல் ரகம்",
      sowingDateLabel: "விதைத்த / நடவு செய்த தேதி",
      cropAreaLabel: "சாகுபடி பரப்பு (ஏக்கர்)",
      expectedBagsLabel: "எதிர்பார்க்கப்படும் மூட்டைகள் (40 கிலோ)",
      
      step3Title: "3. ஆதார் இணைக்கப்பட்ட வங்கி கணக்கு (Bank Details)",
      bankAccLabel: "வங்கி கணக்கு எண்",
      bankNameLabel: "வங்கி பெயர் & கிளை",
      ifscLabel: "IFSC குறியீடு",

      // AI Prediction Box
      aiRipeningTitle: "AI பயிர் முதிர்வு & கொள்முதல் காலம் கணக்கீடு",
      aiRipeningDesc: "நெல் ரகம் மற்றும் நடவு தேதி அடிப்படையில் பயிர் முதிர்ச்சியடையும் காலத்தை AI தானாக கணக்கிடுகிறது:",
      predictedHarvestLabel: "எதிர்பார்க்கப்படும் அறுவடை காலம்:",
      procurementWindowLabel: "கொள்முதல் முன்பதிவு காலம்:",
      autoSmsNotice: "பதிவு முடிந்ததும் பதிவு எண் மற்றும் அறுவடை கால விவரம் தானாக தமிழ் SMS-ஆக விவசாயியின் கைபேசிக்கு அனுப்பப்படும்.",

      // Actions
      submitBtn: "உழவரை பதிவு செய்து தானியங்கி SMS அனுப்புக",
      demoFillBtn: "மாதிரி விவசாயி விவரம் நிரப்புக (1-Click Demo)",
      regSuccess: "விவசாயி வெற்றிகரமாக பதிவு செய்யப்பட்டார்! பதிவு எண் மற்றும் AI அறுவடை SMS அனுப்பப்பட்டது.",
      
      // Registered Farmers Table
      tableTitle: "அலுவலகத்தில் பதிவு செய்யப்பட்ட உழவர்கள் பட்டியல்",
      regNoCol: "பதிவு எண்",
      nameCol: "விவசாயி & தொடர்பு",
      landCol: "பரப்பு & ரகம்",
      aiWindowCol: "AI கொள்முதல் காலம்",
      smsStatusCol: "SMS நிலை",
    },

    // ==========================================
    // WEBSITE 2: DPC PROCUREMENT MANAGEMENT
    // ==========================================
    site2: {
      badge: "முன்பதிவு அடிப்படையிலான நேரடி நெல் கொள்முதல்",
      title: "TNCSC நேரடி நெல் கொள்முதல் நிலைய (DPC) மேலாண்மை தளம்",
      subtitle: "நேர ஒதுக்கீடு, 30-நிமிட நேரடி கொள்ளளவு கண்காணிப்பு, AI நெரிசல் சமநிலை மற்றும் 48 மணி நேர DBT பணப்பட்டுவாடா",

      // Sub-Tabs
      tabs: {
        appointments: "1. கொள்முதல் நியமனங்கள் & எடை மேடை",
        liveCapacity: "2. DPC நிலையங்கள் & 30-நிமிட நேரலை கொள்ளளவு",
        aiRedirection: "3. AI நெரிசல் திசைதிருப்பல் (Smart Redirection)",
        dbtPayout: "4. நெல் தரம் & 48-மணி நேர DBT",
        talukAnalytics: "5. வட்டார நெரிசல் & புதிய DPC திட்டமிடல் (Govt Data)",
      },

      // Tab 1: Appointments
      aptFormTitle: "விவசாயிக்கு கொள்முதல் நாள் & நேர ஸ்லாட் ஒதுக்கீடு",
      selectFarmerLabel: "பதிவு செய்யப்பட்ட விவசாயி (Reg No / Aadhaar)",
      selectDpcLabel: "DPC கொள்முதல் மையம்",
      paddyGradeLabel: "நெல் வகைப்பாடு",
      bagsLabel: "மூட்டைகள் எண்ணிக்கை (40 கிலோ)",
      dateLabel: "கொள்முதல் தேதி",
      slotLabel: "நேர ஸ்லாட் (Slot)",
      vehicleLabel: "வாகனம் & பதிவு எண்",
      bookAptBtn: "முன்பதிவு உறுதி செய்க & மணிநேர SMS நினைவூட்டல் செயல்படுத்துக",
      hourlySmsDesc: "முன்பதிவு செய்த விவசாயிக்கு அவரது நேர ஸ்லாட்டிற்கு முன் ஒவ்வொரு மணி நேரமும் SMS நினைவூட்டல் அனுப்பப்படும்.",

      // Weighbridge
      weighbridgeTitle: "DPC எடை மேடை பதிவு (Weighbridge Gross & Tare)",
      grossKg: "மொத்த எடை (வாகனம் + நெல் கிலோ)",
      tareKg: "வெற்று வாகன எடை (Tare கிலோ)",
      netKg: "நிகர நெல் கொள்முதல் எடை",

      // Tab 2: Live Capacity
      capacityTitle: "தமிழ்நாடு DPC மையங்கள் - 30 நிமிட நேரலை கொள்ளளவு நிலை",
      capacitySubtitle: "நெரிசலை தவிர்க்க ஒவ்வொரு 30 நிமிடங்களுக்கும் தானாக புதுப்பிக்கப்படும் கொள்ளளவு பதிவேடு",
      dailyCap: "தினசரி கொள்ளளவு:",
      currentTonnage: "கொள்முதல் செய்யப்பட்டது:",
      remainingCap: "மீதமுள்ள கொள்ளளவு:",
      occupancy: "சேமிப்பு விகிதம்:",
      truckQueue: "காத்திருக்கும் வாகனங்கள்:",
      gunnyStock: "இருப்பு சாக்கு மூட்டைகள்:",
      lastUpdate: "கடைசி புதுப்பிப்பு:",

      // Tab 3: AI Redirection
      redirectionTitle: "AI நேரலை நெரிசல் சமநிலை & அறிவார்ந்த திசைதிருப்பல்",
      redirectionDesc: "ஒரு DPC மையம் 90% மேல் நிரம்பி, மாலை 3 மணிக்கு மேல் வரும் வாகனங்களை அருகிலுள்ள DPC-க்கு AI திருப்பி விடுகிறது. அதே சமயம், 10 டன் மீதமிருக்கும் போது 2 விவசாயிகள் தலா 5 டன் கொண்டு வந்தால் அவர்களை திருப்பி விடாமல் புத்திசாலித்தனமாக இடமளிக்கிறது.",
      chokepointAlert: "நெரிசல் எச்சரிக்கை: தஞ்சாவூர் வல்லம் DPC 94% நிரம்பியது (20 டன் மட்டுமே மீதம்). 8 வாகனங்கள் கும்பகோணம் DPC-க்கு திருப்பி விட பரிந்துரைக்கப்படுகிறது.",
      divertBtn: "AI பரிந்துரைப்படி கும்பகோணம் DPC-க்கு 8 வாகனங்களை திருப்புக",
      divertSuccess: "8 வாகனங்கள் கும்பகோணம் DPC-க்கு வெற்றிகரமாக திருப்பி விடப்பட்டன. காத்திருப்பு நேரம் குறைக்கப்பட்டது.",

      // Tab 4: DBT
      dbtTitle: "நெல் தரம், ஈரப்பதம் (<=17%) & 48 மணி நேர நேரடி வங்கி வரவு (DBT)",
      dbtSubtitle: "அரசாணை எண் 148/2026 படி MSP + மாநில ஊக்கத்தொகை 48 மணி நேரத்திற்குள் நேரடியாக வங்கியில் செலுத்தப்படுகிறது",
      moistureLabel: "ஈரப்பதம் அளவு (DPC Meter %):",
      moisturePass: "ஈரப்பதம் <=17.0% அரசு விதிகளின்படி ஏற்கப்பட்டது.",
      moistureFail: "ஈரப்பதம் >17.0% - DPC களத்தில் 3 மணி நேரம் உலர்த்த அறிவுரை.",
      disburseDbtBtn: "48 மணி நேரத்திற்குள் நேரடி DBT செலுத்துக",
      dbtCreditedBadge: "48 மணி நேரத்திற்குள் வங்கி வரவு செய்யப்பட்டது (PFMS DBT)",

      // Tab 5: Taluk Analytics & Extra DPC
      talukTitle: "அரசு கொள்கை தரவு: வட்டார நெரிசல் & புதிய DPC நிலையங்கள் அமைக்கும் திட்டம்",
      talukSubtitle: "ஒவ்வொரு பருவத்திலும் தொடர்ந்து நெரிசல் ஏற்படும் வட்டாரங்களின் தரவு அரசுக்கு சமர்ப்பிக்கப்பட்டு புதிய கொள்முதல் நிலையங்கள் திறக்க பரிந்துரை செய்யப்படுகிறது",
      talukCol: "வட்டம் (Taluk)",
      demandCol: "பருவ தேவை",
      deficitCol: "கொள்ளளவு பற்றாக்குறை",
      growthCol: "கொள்முதல் வளர்ச்சி (YoY)",
      recommendedNewDpc: "பரிந்துரைக்கப்படும் புதிய DPC நிலையங்கள்:",
      priceAdjustAdvice: "விலை மாற்ற அரசு பரிந்துரை:",
    }
  },

  en: {
    // Top Bar & State Gov Branding
    govName: "Government of Tamil Nadu",
    deptName: "Department of Agriculture, Food & Civil Supplies",
    tncscTitle: "Tamil Nadu Civil Supplies Corporation (TNCSC)",
    sihBadge: "SIH26032 - Tamil Nadu Farmer & Procurement System",

    // Dual-Website Switcher Tabs
    websiteSwitch: {
      site1Name: "Website 1: Farmer Office Registration Portal",
      site1Short: "1. Farmer Reg Office (PACCS/Bank)",
      site2Name: "Website 2: DPC Procurement Management Portal",
      site2Short: "2. DPC Procurement Management",
    },

    // Accessibility
    textSize: "Text Size",
    highContrast: "Sunlight High-Contrast Mode",
    voiceNarration: "Voice Narration",
    readAloud: "Read Page Aloud",
    stopReading: "Stop Voice",

    // ==========================================
    // WEBSITE 1: FARMER REGISTRATION OFFICE
    // ==========================================
    site1: {
      badge: "In-Person Office Registration • Prevents Fake Farmer Entries",
      title: "Agri Extension & Cooperative Bank Farmer Registration Portal",
      subtitle: "Farmer in-person enrollment at Primary Agricultural Cooperative Society (PACCS) / Seed Station using Aadhaar & PM-Kisan",
      officeNotice: "Official in-person registration method: Mandatory to curb fake broker traffic and protect rural farmers with limited smartphone/tower access.",
      
      // Form Fields
      step1Title: "1. Farmer Verification & Office Selection",
      officeSelectLabel: "Registration Office / Seed Station",
      aadhaarLabel: "Aadhaar Card No. (12 digits) / PM-Kisan ID",
      farmerNameLabel: "Farmer Full Name (English)",
      farmerNameTaLabel: "Farmer Name (Tamil)",
      phoneLabel: "Mobile Phone (For Autonomous SMS)",
      districtLabel: "District",
      talukLabel: "Taluk",
      villageLabel: "Village",
      pattaLabel: "Patta Number",
      surveyLabel: "Survey Field Number",
      
      step2Title: "2. Crop Area & Paddy Variety Sown",
      seasonLabel: "Cropping Season",
      varietyLabel: "Paddy Variety Planned/Sown",
      sowingDateLabel: "Sowing / Transplantation Date",
      cropAreaLabel: "Crop Sown Area (Acres)",
      expectedBagsLabel: "Expected Yield (40 kg Gunny Bags)",
      
      step3Title: "3. Aadhaar-Linked Bank Account for Direct Payout",
      bankAccLabel: "Bank Account Number",
      bankNameLabel: "Bank & Branch Name",
      ifscLabel: "IFSC Code",

      // AI Prediction Box
      aiRipeningTitle: "AI Crop Ripening & Harvest Readiness Window",
      aiRipeningDesc: "AI calculates exact crop ripening timeline based on paddy hybrid growth cycle and sowing date:",
      predictedHarvestLabel: "Predicted Ripening Window:",
      procurementWindowLabel: "Procurement Booking Window:",
      autoSmsNotice: "Upon registration, an autonomous bilingual SMS with Unique Reg Number and ripening timeline is dispatched to the farmer's phone.",

      // Actions
      submitBtn: "Register Farmer & Dispatch Autonomous SMS",
      demoFillBtn: "Autofill Sample Farmer Data (1-Click Demo)",
      regSuccess: "Farmer registered successfully! Unique Reg No. assigned and autonomous SMS dispatched.",
      
      // Registered Farmers Table
      tableTitle: "Office Registered Farmers Database",
      regNoCol: "Reg Number",
      nameCol: "Farmer & Contact",
      landCol: "Area & Variety",
      aiWindowCol: "AI Ripening Window",
      smsStatusCol: "SMS Status",
    },

    // ==========================================
    // WEBSITE 2: DPC PROCUREMENT MANAGEMENT
    // ==========================================
    site2: {
      badge: "Pre-Booked Slot Procurement System",
      title: "TNCSC Direct Procurement Centre (DPC) Operations & Queue System",
      subtitle: "Appointment scheduling, 30-minute live capacity monitoring, smart AI redirection & 48-hour direct bank deposit",

      // Sub-Tabs
      tabs: {
        appointments: "1. Appointments & Weighbridge",
        liveCapacity: "2. DPC Locations & 30-Min Capacity",
        aiRedirection: "3. Smart AI Inflow Redirection",
        dbtPayout: "4. Grain Inspection & 48-Hr DBT",
        talukAnalytics: "5. Taluk Overflow & Extra DPC Planning (Govt Data)",
      },

      // Tab 1: Appointments
      aptFormTitle: "Schedule DPC Procurement Appointment",
      selectFarmerLabel: "Select Registered Farmer (Reg No / Aadhaar)",
      selectDpcLabel: "Procurement Centre (DPC)",
      paddyGradeLabel: "Paddy Variety Classification",
      bagsLabel: "Gunny Bags Count (40 kg)",
      dateLabel: "Arrival Date",
      slotLabel: "30-Min / 1-Hr Time Slot",
      vehicleLabel: "Transport Vehicle & Plate No.",
      bookAptBtn: "Confirm Appointment & Activate Hourly SMS Reminders",
      hourlySmsDesc: "Farmer receives automated SMS reminders leading up to their appointment (e.g. 1 hour before scheduled time).",

      // Weighbridge
      weighbridgeTitle: "DPC Weighbridge Gross & Tare Weight Logging",
      grossKg: "Gross Weight (Truck + Paddy Kg)",
      tareKg: "Empty Vehicle Weight (Tare Kg)",
      netKg: "Net Paddy Weight Procured",

      // Tab 2: Live Capacity
      capacityTitle: "Tamil Nadu DPC Network - 30-Minute Dynamic Capacity Status",
      capacitySubtitle: "Capacity updated every 30 minutes to dynamically prevent mandi overflow and manage grain sheds",
      dailyCap: "Daily Capacity:",
      currentTonnage: "Current Procured:",
      remainingCap: "Remaining Space:",
      occupancy: "Storage Occupancy:",
      truckQueue: "Active Truck Queue:",
      gunnyStock: "Available Gunny Bags:",
      lastUpdate: "Last Dynamic Update:",

      // Tab 3: AI Redirection
      redirectionTitle: "Smart AI Inflow Balancing & Traffic Redirection",
      redirectionDesc: "If a DPC exceeds 90% capacity, AI intelligently redirects subsequent large arrivals (after 3 PM) to nearby DPCs (e.g. Kumbakonam). If 10 tons remain and 2 farmers have 5 tons each, AI accommodates both without unnecessary redirection.",
      chokepointAlert: "Chokepoint Alert: Thanjavur Vallam DPC at 94% occupancy (Only 20 tons remaining). AI recommends rerouting 8 convoys to Kumbakonam DPC.",
      divertBtn: "Execute AI Redirection: Divert 8 Convoys to Kumbakonam DPC",
      divertSuccess: "8 Convoys successfully rerouted to Kumbakonam DPC. Queue wait time reduced by 85 mins.",

      // Tab 4: DBT
      dbtTitle: "Grain Quality (<=17% Moisture) & 48-Hour Direct Bank Deposit (DBT)",
      dbtSubtitle: "Direct PFMS transfer under G.O. Ms 148 (MSP + TN State Bonus) credited to farmer bank account within 48 hours",
      moistureLabel: "Moisture Level (DPC Meter %):",
      moisturePass: "Moisture <=17.0% passes Tamil Nadu FAQ government standard.",
      moistureFail: "Moisture >17.0% - Sun drying at DPC yard required before re-assay.",
      disburseDbtBtn: "Disburse Direct DBT within 48 Hours",
      dbtCreditedBadge: "Credited within 48 Hours via PFMS DBT",

      // Tab 5: Taluk Analytics & Extra DPC
      talukTitle: "State Governance Data: Taluk Overflow & Extra DPC Center Sanctioning",
      talukSubtitle: "Season-long overflow data presented to the State Government to add extra DPC procurement sheds and calibrate procurement pricing",
      talukCol: "Taluk / Basin",
      demandCol: "Season Demand",
      deficitCol: "Capacity Deficit",
      growthCol: "Procurement Growth (YoY)",
      recommendedNewDpc: "Recommended New DPC Centers:",
      priceAdjustAdvice: "Procurement Price Calibration Advisory:",
    }
  },

  hi: {
    // Top Bar & State Gov Branding
    govName: "तमिलनाडु सरकार",
    deptName: "कृषि, खाद्य एवं नागरिक आपूर्ति विभाग",
    tncscTitle: "तमिलनाडु नागरिक आपूर्ति निगम (TNCSC)",
    sihBadge: "SIH26032 - तमिलनाडु किसान एवं खरीद प्रणाली",

    // Dual-Website Switcher Tabs
    websiteSwitch: {
      site1Name: "वेबसाइट 1: किसान कार्यालय पंजीकरण पोर्टल",
      site1Short: "1. किसान पंजीकरण कार्यालय (PACCS/बैंक)",
      site2Name: "वेबसाइट 2: डीपीसी खरीद प्रबंधन पोर्टल",
      site2Short: "2. डीपीसी खरीद प्रबंधन",
    },

    // Accessibility
    textSize: "अक्षर आकार",
    highContrast: "धूप मोड (हाई कंट्रास्ट)",
    voiceNarration: "आवाज मार्गदर्शन",
    readAloud: "पेज पढ़कर सुनाएं",
    stopReading: "आवाज बंद करें",

    // WEBSITE 1: FARMER REGISTRATION OFFICE
    site1: {
      badge: "कार्यालय प्रत्यक्ष पंजीकरण • फर्जी किसानों की रोकथाम",
      title: "कृषि विस्तार केंद्र एवं सहकारी बैंक किसान पंजीकरण पोर्टल",
      subtitle: "प्राथमिक कृषि सहकारी समिति (PACCS) में आधार एवं पीएम-किसान द्वारा किसान पंजीकरण",
      officeNotice: "कार्यालय में पंजीकरण अनिवार्य है ताकि फर्जी प्रविष्टियां रोकी जा सकें और ग्रामीण नेटवर्क समस्याओं से बचा जा सके।",
      
      step1Title: "1. किसान पहचान एवं कार्यालय चयन",
      officeSelectLabel: "पंजीकरण कार्यालय / बीज केंद्र",
      aadhaarLabel: "आधार कार्ड संख्या (12 अंक) / पीएम-किसान आईडी",
      farmerNameLabel: "किसान का पूरा नाम (अंग्रेजी)",
      farmerNameTaLabel: "किसान का नाम (तमिल)",
      phoneLabel: "मोबाइल नंबर (SMS हेतु)",
      districtLabel: "जिला",
      talukLabel: "तालुका",
      villageLabel: "ग्राम",
      pattaLabel: "पट्टा संख्या",
      surveyLabel: "खसरा / सर्वे संख्या",
      
      step2Title: "2. बोया गया रकबा एवं धान किस्म",
      seasonLabel: "सकल मौसम",
      varietyLabel: "धान की किस्म",
      sowingDateLabel: "बुवाई की तिथि",
      cropAreaLabel: "बोया गया रकबा (एकड़)",
      expectedBagsLabel: "अनुमानित बोरियां (40 किग्रा)",
      
      step3Title: "3. आधार लिंक बैंक खाता",
      bankAccLabel: "बैंक खाता संख्या",
      bankNameLabel: "बैंक एवं शाखा का नाम",
      ifscLabel: "IFSC कोड",

      aiRipeningTitle: "एआई फसल परिपक्वता एवं खरीद समय पूर्वानुमान",
      aiRipeningDesc: "बुवाई तिथि और धान की किस्म के आधार पर एआई फसल पकने का सटीक समय निर्धारित करता है:",
      predictedHarvestLabel: "अनुमानित कटाई अवधि:",
      procurementWindowLabel: "खरीद स्लॉट बुकिंग समय:",
      autoSmsNotice: "पंजीकरण के पश्चात स्वचालित द्विभाषी SMS किसान के मोबाइल पर भेजा जाएगा।",

      submitBtn: "किसान पंजीकृत करें एवं स्वचालित SMS भेजें",
      demoFillBtn: "नमूना डेटा भरें (1-Click Demo)",
      regSuccess: "किसान सफलतापूर्वक पंजीकृत हुआ! विशिष्ट पंजीकरण संख्या एवं SMS प्रेषित।",
      
      tableTitle: "कार्यालय में पंजीकृत किसान डेटाबेस",
      regNoCol: "पंजीकरण संख्या",
      nameCol: "किसान एवं संपर्क",
      landCol: "रकबा एवं किस्म",
      aiWindowCol: "एआई खरीद अवधि",
      smsStatusCol: "SMS स्थिति",
    },

    // WEBSITE 2: DPC PROCUREMENT MANAGEMENT
    site2: {
      badge: "पूर्व-निर्धारित स्लॉट आधारित खरीद प्रणाली",
      title: "TNCSC प्रत्यक्ष खरीद केंद्र (DPC) संचालन एवं कतार प्रणाली",
      subtitle: "स्लॉट आवंटन, 30-मिनट लाइव क्षमता निगरानी, स्मार्ट एआई डायवर्जन एवं 48 घंटे में डीबीटी भुगतान",

      tabs: {
        appointments: "1. स्लॉट आवंटन एवं तौल-पुल",
        liveCapacity: "2. डीपीसी केंद्र एवं 30-मिनट क्षमता",
        aiRedirection: "3. स्मार्ट एआई डायवर्जन",
        dbtPayout: "4. गुणवत्ता जांच एवं 48-घंटे डीबीटी",
        talukAnalytics: "5. तालुका विश्लेषण एवं नए केंद्र (Govt Data)",
      },

      aptFormTitle: "खरीद स्लॉट निर्धारित करें",
      selectFarmerLabel: "पंजीकृत किसान चुनें",
      selectDpcLabel: "खरीद केंद्र (DPC)",
      paddyGradeLabel: "धान श्रेणी",
      bagsLabel: "बोरियां (40 किग्रा)",
      dateLabel: "आगमन तिथि",
      slotLabel: "समय स्लॉट",
      vehicleLabel: "वाहन प्रकार व नंबर",
      bookAptBtn: "स्लॉट पक्का करें व प्रति घंटा SMS शुरू करें",
      hourlySmsDesc: "स्लॉट समय से पूर्व किसान को प्रति घंटा SMS सूचना भेजी जाती है।",

      weighbridgeTitle: "DPC तौल-पुल रिकॉर्डिंग (Gross & Tare)",
      grossKg: "कुल वजन (वाहन + धान किग्रा)",
      tareKg: "खाली वाहन वजन (Tare किग्रा)",
      netKg: "शुद्ध धान वजन",

      capacityTitle: "तमिलनाडु डीपीसी नेटवर्क - 30 मिनट लाइव क्षमता स्थिति",
      capacitySubtitle: "मंडी में भीड़ रोकने हेतु हर 30 मिनट में क्षमता स्वतः अपडेट होती है",
      dailyCap: "दैनिक क्षमता:",
      currentTonnage: "खरीदा गया धान:",
      remainingCap: "शेष क्षमता:",
      occupancy: "भंडारण प्रतिशत:",
      truckQueue: "सक्रिय वाहन कतार:",
      gunnyStock: "उपलब्ध बोरियां:",
      lastUpdate: "अंतिम अपडेट:",

      redirectionTitle: "स्मार्ट एआई ट्रैफिक संतुलन एवं डायवर्जन",
      redirectionDesc: "90% क्षमता पार होने पर एआई 3 बजे के बाद आने वाले बड़े ट्रकों को नजदीकी केंद्र पर भेजता है, जबकि 10 टन शेष रहने पर 5+5 टन वाले 2 किसानों को समायोजित करता है।",
      chokepointAlert: "भीड़ चेतावनी: तंजावुर वल्लम डीपीसी 94% भरा है। 8 वाहनों को कुंभकोणम भेजने की अनुशंसा।",
      divertBtn: "एआई अनुसार कुंभकोणम केंद्र पर 8 वाहन डायवर्ट करें",
      divertSuccess: "8 वाहन सफलतापूर्वक कुंभकोणम डायवर्ट किए गए।",

      dbtTitle: "धान गुणवत्ता (<=17% नमी) एवं 48 घंटे में सीधा बैंक भुगतान (DBT)",
      dbtSubtitle: "शासनादेश 148/2026 अनुसार MSP + राज्य बोनस 48 घंटे में सीधे बैंक खाते में प्रेषित",
      moistureLabel: "नमी स्तर (%):",
      moisturePass: "नमी <=17.0% सरकारी मानक अनुसार स्वीकृत।",
      moistureFail: "नमी >17.0% - यार्ड में सुखाने की सलाह।",
      disburseDbtBtn: "48 घंटे में डीबीटी भुगतान करें",
      dbtCreditedBadge: "48 घंटे में बैंक खाते में जमा (PFMS DBT)",

      talukTitle: "शासकीय नीति डेटा: तालुका भीड़भाड़ एवं नए डीपीसी केंद्र स्वीकृति",
      talukSubtitle: "लगातार ओवरफ्लो होने वाले क्षेत्रों का डेटा सरकार को प्रस्तुत कर नए केंद्र खोलने की अनुशंसा की जाती है",
      talukCol: "तालुका",
      demandCol: "मौसम मांग",
      deficitCol: "क्षमता कमी",
      growthCol: "खरीद वृद्धि (YoY)",
      recommendedNewDpc: "अनुशंसित नए डीपीसी केंद्र:",
      priceAdjustAdvice: "मूल्य समायोजन नीति सलाह:",
    }
  }
};
