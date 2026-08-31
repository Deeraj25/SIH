'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Site1OfficeLogin } from '@/components/Auth/Site1OfficeLogin';
import { 
  Building, 
  UserCheck, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Wheat, 
  Landmark, 
  CreditCard, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Search, 
  ArrowRight,
  Send,
  FileText,
  LogOut,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const FarmerOfficeRegistrationWebsite: React.FC = () => {
  const { 
    site1Auth, 
    logoutSite1Officer, 
    farmers, 
    registerFarmerAtOffice, 
    smsLogs, 
    t, 
    language, 
    setActiveWebsite 
  } = useApp();

  const [formData, setFormData] = useState({
    office: site1Auth.officeName || 'PACCS Thiruvaiyaru Primary Cooperative Bank',
    aadhaarNumber: '',
    pmKisanId: '',
    name: '',
    nameTa: '',
    phone: '',
    district: 'Thanjavur (தஞ்சாவூர்)',
    taluk: 'Thiruvaiyaru (திருவையாறு)',
    village: 'Kandiyur (கண்டியூர்)',
    pattaNumber: '',
    surveyNumber: '',
    season: 'Samba (சம்பா)',
    variety: 'CR-1009 Sub-1 (சன்ன ரகம்)',
    sowingDate: '2026-08-15',
    cropAreaAcres: 6.5,
    expectedYieldBags: 200,
    bankAccount: '',
    bankName: 'Indian Overseas Bank - Thiruvaiyaru Branch',
    ifscCode: 'IOBA0001048',
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // If officer is not logged in on Website 1, show Website 1 login screen
  if (!site1Auth.isLoggedIn) {
    return <Site1OfficeLogin />;
  }

  // Live AI Prediction based on form inputs
  const ripeningDays = formData.season.includes('Kuruvai') ? 115 : formData.season.includes('Thaladi') ? 135 : 130;
  const sowingD = new Date(formData.sowingDate || '2026-08-15');
  const harvestStart = new Date(sowingD.getTime() + ripeningDays * 24 * 60 * 60 * 1000);
  const harvestEnd = new Date(harvestStart.getTime() + 10 * 24 * 60 * 60 * 1000);
  const harvestStartStr = harvestStart.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const harvestEndStr = harvestEnd.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const expectedTons = Number(((formData.expectedYieldBags * 40) / 1000).toFixed(2));

  const handleDemoFill = () => {
    setFormData({
      office: site1Auth.officeName || 'PACCS Thiruvaiyaru Primary Cooperative Bank',
      aadhaarNumber: '8810 9482 1920',
      pmKisanId: 'PMK-TN-2026-9041',
      name: 'Ramasamy Palanivel',
      nameTa: 'ராமசாமி பழனிவேல்',
      phone: '+91 94432 99120',
      district: 'Thanjavur (தஞ்சாவூர்)',
      taluk: 'Thiruvaiyaru (திருவையாறு)',
      village: 'Kandiyur (கண்டியூர்)',
      pattaNumber: 'PATTA-9921/2026',
      surveyNumber: 'SF-312/4B',
      season: 'Samba (சம்பா)',
      variety: 'CR-1009 Sub-1 (சன்ன ரகம்)',
      sowingDate: '2026-08-15',
      cropAreaAcres: 7.5,
      expectedYieldBags: 240,
      bankAccount: 'IOBA-001048-9941',
      bankName: 'Indian Overseas Bank - Thiruvaiyaru',
      ifscCode: 'IOBA0001048',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.pattaNumber) {
      alert('Please fill in Farmer Name, Phone, and Patta Number.');
      return;
    }

    const reg = registerFarmerAtOffice({
      ...formData,
      office: site1Auth.officeName,
      aadhaarNumber: formData.aadhaarNumber || '8810 9482 1920',
    });

    setSuccessNotice(`${t.site1.regSuccess} [Reg No: ${reg.registrationNumber}]`);
    setTimeout(() => setSuccessNotice(null), 8000);
  };

  const filteredFarmers = farmers.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.nameTa.includes(searchQuery) ||
    f.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.pattaNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Official Government Office Header Banner */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#e9c46a]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-800/90 text-emerald-200 text-xs font-semibold border border-emerald-600/50">
                <Building className="w-3.5 h-3.5 text-[#e9c46a]" />
                <span>{t.site1.badge}</span>
              </div>
              <span className="text-xs bg-black/30 px-3 py-1 rounded-full text-emerald-200 border border-emerald-500/40">
                அதிகாரி: <strong>{site1Auth.name}</strong> ({site1Auth.officerId})
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display">
              {t.site1.title}
            </h1>
            <p className="text-xs md:text-sm text-emerald-100 mt-2 font-normal leading-relaxed">
              {site1Auth.officeName} • {site1Auth.district}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={handleDemoFill}
              className="px-4 py-2.5 rounded-2xl bg-[#e9c46a] text-[#1b4332] text-xs font-extrabold hover:bg-amber-300 transition shadow-md flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.site1.demoFillBtn}</span>
            </button>

            <button
              onClick={logoutSite1Officer}
              className="px-3 py-2.5 rounded-2xl bg-black/30 hover:bg-red-900/60 text-slate-200 hover:text-white text-xs font-bold transition flex items-center gap-1 border border-white/20"
              title="Logout from Website 1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Why Office Registration Notice (Point 3) */}
        <div className="mt-4 p-3 bg-black/25 rounded-2xl border border-white/15 text-xs text-emerald-100 flex items-start space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#e9c46a] shrink-0 mt-0.5" />
          <span>{t.site1.officeNotice}</span>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successNotice && (
        <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-400 text-emerald-950 text-xs font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{successNotice}</span>
          </div>
          <button
            onClick={() => setActiveWebsite('dpc_procurement_management')}
            className="px-4 py-1.5 rounded-xl bg-[#1b4332] text-white text-xs font-bold hover:bg-[#2d6a4f] flex items-center gap-1 shrink-0"
          >
            <span>DPC கொள்முதல் நியமனத்திற்கு செல்க &rarr;</span>
          </button>
        </div>
      )}

      {/* Grid: Registration Form (Left 8 cols) & AI Ripening / SMS Dispatch (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Office Registration Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          
          {/* Step 1: Office & Identity */}
          <div>
            <h3 className="text-sm font-bold text-[#1b4332] font-display uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>{t.site1.step1Title}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">{t.site1.officeSelectLabel}</label>
                <input
                  type="text"
                  disabled
                  value={site1Auth.officeName}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-100 font-bold text-slate-700"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {t.site1.aadhaarLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.aadhaarNumber}
                  onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                  placeholder="8810 9482 1920"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-medium focus:ring-2 focus:ring-[#2d6a4f]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.site1.phoneLabel} <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 94432 99120"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono focus:ring-2 focus:ring-[#2d6a4f]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.site1.farmerNameLabel} <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramasamy Palanivel"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-[#2d6a4f]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.site1.farmerNameTaLabel}</label>
                <input
                  type="text"
                  value={formData.nameTa}
                  onChange={(e) => setFormData({ ...formData, nameTa: e.target.value })}
                  placeholder="ராமசாமி பழனிவேல்"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-[#2d6a4f]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.site1.pattaLabel} <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.pattaNumber}
                  onChange={(e) => setFormData({ ...formData, pattaNumber: e.target.value })}
                  placeholder="PATTA-9921/2026"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold focus:ring-2 focus:ring-[#2d6a4f]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.site1.surveyLabel}</label>
                <input
                  type="text"
                  value={formData.surveyNumber}
                  onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                  placeholder="SF-312/4B"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono focus:ring-2 focus:ring-[#2d6a4f]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Sowing & Crop Details */}
          <div>
            <h3 className="text-sm font-bold text-[#1b4332] font-display uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <Wheat className="w-4 h-4 text-emerald-700" />
              <span>{t.site1.step2Title}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.site1.seasonLabel}</label>
                <select
                  value={formData.season}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                >
                  <option value="Samba (சம்பா)">Samba (சம்பா - 130 நாட்கள்)</option>
                  <option value="Kuruvai (குறுவை)">Kuruvai (குறுவை - 115 நாட்கள்)</option>
                  <option value="Thaladi (தாளடி)">Thaladi (தாளடி - 135 நாட்கள்)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.site1.varietyLabel}</label>
                <select
                  value={formData.variety}
                  onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                >
                  <option value="CR-1009 Sub-1 (சன்ன ரகம்)">CR-1009 Sub-1 (சன்ன ரகம் - Grade A)</option>
                  <option value="ADT-53 (சன்ன ரகம்)">ADT-53 (சன்ன ரகம் - Grade A)</option>
                  <option value="BPT-5204 (ஆந்திரா பொன்னி)">BPT-5204 (ஆந்திரா பொன்னி - Grade A)</option>
                  <option value="Co-51 (பொது ரகம்)">Co-51 (பொது ரகம் - Common FAQ)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.site1.sowingDateLabel}</label>
                <input
                  type="date"
                  value={formData.sowingDate}
                  onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.site1.cropAreaLabel}</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.cropAreaAcres}
                  onChange={(e) => setFormData({ ...formData, cropAreaAcres: parseFloat(e.target.value) || 1.0 })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.site1.expectedBagsLabel}</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="10"
                    value={formData.expectedYieldBags}
                    onChange={(e) => setFormData({ ...formData, expectedYieldBags: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold font-mono"
                  />
                  <span className="text-xs font-bold text-emerald-800 whitespace-nowrap">{expectedTons} டன்</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t.site1.bankAccLabel}</label>
                <input
                  type="text"
                  value={formData.bankAccount}
                  onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                  placeholder="IOBA-001048-9941"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              பதிவு மையம்: <strong className="text-slate-800">{site1Auth.officeName}</strong>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] text-white text-xs font-bold hover:shadow-lg transition flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4 text-[#e9c46a]" />
              <span>{t.site1.submitBtn}</span>
            </button>
          </div>

        </form>

        {/* Right Column: AI Ripening Prediction & Autonomous SMS Dispatch Preview */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* AI Ripening Prediction Card (Point 6) */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-[#081c15] text-white p-5 rounded-3xl border border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center space-x-2 text-[#e9c46a]">
              <Sparkles className="w-5 h-5" />
              <h4 className="text-sm font-bold font-display">{t.site1.aiRipeningTitle}</h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {t.site1.aiRipeningDesc}
            </p>

            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">பயிர் வளர்ச்சி காலம்:</span>
                <strong className="text-emerald-300 font-mono">{ripeningDays} நாட்கள்</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t.site1.predictedHarvestLabel}</span>
                <strong className="text-amber-300 font-mono">{harvestStartStr} - {harvestEndStr}</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-slate-300 font-bold">DPC முன்பதிவு காலம்:</span>
                <strong className="text-[#e9c46a] font-bold">அறுவடைக்கு 10 நாள் முன்</strong>
              </div>
            </div>

            <div className="text-[11px] text-emerald-200 flex items-start space-x-1.5 pt-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t.site1.autoSmsNotice}</span>
            </div>
          </div>

          {/* Autonomous SMS Dispatch Live Stream */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  தானியங்கி SMS பதிவேடு (SMS Dispatch Logs)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                LIVE GATEWAY
              </span>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {smsLogs.map((sms) => (
                <div key={sms.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-[10px] font-mono font-bold text-slate-500">
                    <span className="text-[#1b4332] font-extrabold">{sms.sender}</span>
                    <span>{sms.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-slate-800 font-semibold">{sms.farmerName} ({sms.recipientPhone})</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                    {language === 'ta' ? sms.contentTa : sms.contentEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Enrolled Farmers Master Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-[#1b4332] font-display">
              {t.site1.tableTitle}
            </h3>
            <p className="text-xs text-slate-500">
              தொடக்க வேளாண் கூட்டுறவு சங்கம் & விதை நிலையங்களில் பதிவு செய்யப்பட்ட உழவர்கள் விவரம்
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="பதிவு எண் / பெயர் தேடுக..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:ring-2 focus:ring-[#2d6a4f]"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">{t.site1.regNoCol}</th>
                <th className="p-3.5">{t.site1.nameCol}</th>
                <th className="p-3.5">அலுவலகம் / கிராமம்</th>
                <th className="p-3.5">{t.site1.landCol}</th>
                <th className="p-3.5">{t.site1.aiWindowCol}</th>
                <th className="p-3.5 text-right">{t.site1.smsStatusCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFarmers.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 font-mono font-bold text-[#1b4332]">
                    {f.registrationNumber}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{language === 'ta' ? f.nameTa : f.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{f.phone}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-medium text-slate-800">{f.village}, {f.district.split(' ')[0]}</div>
                    <div className="text-[10px] text-slate-500">{f.registrationOffice.split(' ')[0]} {f.registrationOffice.split(' ')[1]}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-emerald-800">{f.sowing.cropAreaAcres} ஏக்கர் ({f.sowing.expectedYieldTons} டன்)</div>
                    <div className="text-[10px] text-slate-500">{f.sowing.variety}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-amber-900">{f.sowing.aiPredictedHarvestStart}</div>
                    <div className="text-[10px] text-emerald-700">{f.sowing.aiProcurementWindow}</div>
                  </td>
                  <td className="p-3.5 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      <span>SMS அனுப்பப்பட்டது</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
