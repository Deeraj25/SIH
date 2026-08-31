'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Site2DPCLogin } from '@/components/Auth/Site2DPCLogin';
import { 
  Building2, 
  Calendar, 
  Clock, 
  Scale, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Banknote, 
  MapPin, 
  Phone, 
  Navigation, 
  Sparkles, 
  TrendingUp, 
  FileCheck, 
  RotateCcw,
  Layers,
  ArrowRight,
  Package,
  Landmark,
  Plus,
  LogOut,
  User
} from 'lucide-react';
import { cn, formatCurrencyINR } from '@/lib/utils';

export const ProcurementLiveManagementWebsite: React.FC = () => {
  const { 
    site2Auth, 
    logoutSite2Officer, 
    farmers, 
    dpcs, 
    appointments, 
    talukMetrics, 
    bookProcurementAppointment, 
    logWeighbridgeWeight, 
    verifyMoistureAndDisburseDBT48Hrs, 
    executeSmartAIRedirection,
    openModal, 
    t, 
    language 
  } = useApp();

  // If officer is not logged in on Website 2, show Website 2 login screen
  if (!site2Auth.isLoggedIn) {
    return <Site2DPCLogin />;
  }

  // Active Sub-Tab within Website 2
  const [activeSubTab, setActiveSubTab] = useState<'appointments' | 'liveCapacity' | 'aiRedirection' | 'dbtPayout' | 'talukAnalytics'>('appointments');

  // Appointment Form State
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>(farmers[0]?.id || '');
  const [selectedDpcId, setSelectedDpcId] = useState<string>(site2Auth.dpcId || dpcs[0]?.id || '');
  const [paddyType, setPaddyType] = useState<any>('Paddy Grade A (சன்ன ரகம்)');
  const [gunnyBags, setGunnyBags] = useState<number>(200);
  const [appointmentDate, setAppointmentDate] = useState<string>('Today (31 Aug 2026)');
  const [appointmentTimeSlot, setAppointmentTimeSlot] = useState<string>('10:00 AM - 11:00 AM');
  const [transportMode, setTransportMode] = useState<any>('Tractor (டிராக்டர்)');
  const [vehicleNumber, setVehicleNumber] = useState<string>('TN-49-AB-2410');

  // Weighbridge state
  const [activeAptForWeight, setActiveAptForWeight] = useState<any>(null);
  const [grossInput, setGrossInput] = useState<number>(12400);
  const [tareInput, setTareInput] = useState<number>(4400);

  // Moisture & DBT state
  const [activeAptForDBT, setActiveAptForDBT] = useState<any>(appointments[0] || null);
  const [manualMoisture, setManualMoisture] = useState<number>(15.4);
  const [foreignMatter, setForeignMatter] = useState<number>(0.8);

  // AI Redirection state
  const [divertedSuccess, setDivertedSuccess] = useState<boolean>(false);

  const selectedFarmer = farmers.find(f => f.id === selectedFarmerId) || farmers[0];
  const selectedDpc = dpcs.find(d => d.id === selectedDpcId) || dpcs[0];
  const estimatedTons = Number(((gunnyBags * 40) / 1000).toFixed(2));

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookProcurementAppointment({
      farmerId: selectedFarmer.id,
      dpcId: selectedDpc.id,
      paddyType,
      variety: selectedFarmer.sowing?.variety || 'CR-1009 Sub-1',
      gunnyBagsCount: Number(gunnyBags),
      appointmentDate,
      appointmentTimeSlot,
      transportMode,
      vehicleNumber,
    });
  };

  const handleWeighbridgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAptForWeight) return;
    logWeighbridgeWeight(activeAptForWeight.id, grossInput, tareInput);
    setActiveAptForWeight(null);
  };

  const handleMoistureAndDBTSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAptForDBT) return;
    verifyMoistureAndDisburseDBT48Hrs(activeAptForDBT.id, manualMoisture, foreignMatter);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#e9c46a]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-800/90 text-emerald-200 text-xs font-semibold border border-emerald-600/50">
                <Building2 className="w-3.5 h-3.5 text-[#e9c46a]" />
                <span>{t.site2.badge}</span>
              </div>
              <span className="text-xs bg-black/30 px-3 py-1 rounded-full text-emerald-200 border border-emerald-500/40">
                DPC அதிகாரி: <strong>{site2Auth.name}</strong> ({site2Auth.officerId})
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display">
              {t.site2.title}
            </h1>
            <p className="text-xs md:text-sm text-emerald-100 mt-2 font-normal leading-relaxed">
              {site2Auth.dpcName} • {site2Auth.district}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-start md:self-auto">
            <div className="bg-white/10 p-3 rounded-2xl border border-white/20 text-xs text-right">
              <div className="text-[#e9c46a] font-bold font-mono text-base">30-Min Dynamic Sync</div>
              <div className="text-slate-200">நேரலை கொள்ளளவு நிலை</div>
            </div>

            <button
              onClick={logoutSite2Officer}
              className="px-3 py-2.5 rounded-2xl bg-black/30 hover:bg-red-900/60 text-slate-200 hover:text-white text-xs font-bold transition flex items-center gap-1 border border-white/20"
              title="Logout from Website 2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Website 2 Sub-Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-1.5 flex items-center space-x-1 overflow-x-auto">
        {[
          { key: 'appointments', label: t.site2.tabs.appointments, icon: Calendar },
          { key: 'liveCapacity', label: t.site2.tabs.liveCapacity, icon: Building2 },
          { key: 'aiRedirection', label: t.site2.tabs.aiRedirection, icon: Sparkles },
          { key: 'dbtPayout', label: t.site2.tabs.dbtPayout, icon: Banknote },
          { key: 'talukAnalytics', label: t.site2.tabs.talukAnalytics, icon: TrendingUp },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveSubTab(tab.key as any)}
              className={cn(
                "flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap",
                isActive
                  ? "bg-[#1b4332] text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-[#e9c46a]" : "text-emerald-700")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: APPOINTMENTS & WEIGHBRIDGE */}
      {activeSubTab === 'appointments' && (
        <div className="space-y-6">
          
          {/* Booking Form (Strictly Prior Booking - Point 7) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#1b4332] font-display flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-700" />
                  <span>{t.site2.aptFormTitle}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  {t.site2.hourlySmsDesc}
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-amber-50 text-amber-900 px-3 py-1 rounded-xl border border-amber-200">
                Hourly SMS Countdown Active
              </span>
            </div>

            <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.site2.selectFarmerLabel}</label>
                  <select
                    value={selectedFarmerId}
                    onChange={(e) => setSelectedFarmerId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-[#2d6a4f]"
                  >
                    {farmers.map(f => (
                      <option key={f.id} value={f.id}>
                        {language === 'ta' ? f.nameTa : f.name} ({f.registrationNumber})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.site2.selectDpcLabel}</label>
                  <select
                    value={selectedDpcId}
                    onChange={(e) => setSelectedDpcId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-[#2d6a4f]"
                  >
                    {dpcs.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.remainingCapacityTons} டன் மீதம்)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.site2.paddyGradeLabel}</label>
                  <select
                    value={paddyType}
                    onChange={(e) => setPaddyType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-[#2d6a4f]"
                  >
                    <option value="Paddy Grade A (சன்ன ரகம்)">சன்ன ரகம் (Grade A) - ₹2,420/குவிண்டால்</option>
                    <option value="Paddy Common (பொது ரகம்)">பொது ரகம் (Common) - ₹2,400/குவிண்டால்</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.site2.bagsLabel}</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="20"
                      max="1000"
                      step="10"
                      value={gunnyBags}
                      onChange={(e) => setGunnyBags(parseInt(e.target.value) || 0)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                    />
                    <span className="text-xs font-bold text-emerald-800 whitespace-nowrap">{estimatedTons} டன்</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.site2.dateLabel}</label>
                  <select
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="Today (31 Aug 2026)">Today (31 Aug 2026)</option>
                    <option value="Tomorrow (01 Sep 2026)">Tomorrow (01 Sep 2026)</option>
                    <option value="Wednesday (02 Sep 2026)">Wednesday (02 Sep 2026)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.site2.slotLabel}</label>
                  <select
                    value={appointmentTimeSlot}
                    onChange={(e) => setAppointmentTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-medium"
                  >
                    <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM (Early Convoys)</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM (Subject to AI Redirection)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">வாகனம் (Transport Mode)</label>
                  <select
                    value={transportMode}
                    onChange={(e) => setTransportMode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="Tractor (டிராக்டர்)">Tractor (டிராக்டர்)</option>
                    <option value="Mini Lorry (மினி லாரி)">Mini Lorry (மினி லாரி)</option>
                    <option value="Bullock Cart (மாட்டு வண்டி)">Bullock Cart (மாட்டு வண்டி)</option>
                    <option value="Auto Cargo (சரக்கு ஆட்டோ)">Auto Cargo (சரக்கு ஆட்டோ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.site2.vehicleLabel}</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    placeholder="TN-49-AB-2410"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1b4332] text-white text-xs font-bold hover:bg-[#2d6a4f] shadow-xs flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4 text-[#e9c46a]" />
                  <span>{t.site2.bookAptBtn}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Weighbridge Entry Modal Popup */}
          {activeAptForWeight && (
            <div className="p-5 bg-emerald-50 rounded-3xl border-2 border-emerald-300 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between font-bold text-sm text-[#1b4332]">
                <span>{t.site2.weighbridgeTitle}: {activeAptForWeight.tokenNumber} ({activeAptForWeight.vehicleNumber})</span>
                <button onClick={() => setActiveAptForWeight(null)} className="text-xs text-slate-500 hover:text-slate-800">ரத்து</button>
              </div>

              <form onSubmit={handleWeighbridgeSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.site2.grossKg}</label>
                  <input
                    type="number"
                    value={grossInput}
                    onChange={(e) => setGrossInput(parseInt(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t.site2.tareKg}</label>
                  <input
                    type="number"
                    value={tareInput}
                    onChange={(e) => setTareInput(parseInt(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold bg-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#1b4332] text-white rounded-xl font-bold hover:bg-[#2d6a4f]"
                  >
                    எடை உறுதிப்படுத்துக ({((grossInput - tareInput)/1000).toFixed(2)} டன்)
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Appointments & Live Inflow Queue Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#1b4332] font-display uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>முன்பதிவு செய்யப்பட்ட DPC நியமனங்கள் (Scheduled Appointments Queue)</span>
              <span className="text-xs font-mono text-slate-500">{appointments.length} Appointments</span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">டோக்கன் எண்</th>
                    <th className="p-3.5">விவசாயி & பதிவு எண்</th>
                    <th className="p-3.5">DPC மையம்</th>
                    <th className="p-3.5">வாகனம் & ரகம்</th>
                    <th className="p-3.5">நேர ஸ்லாட்</th>
                    <th className="p-3.5">நிலை</th>
                    <th className="p-3.5 text-right">நடவடிக்கை</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono font-bold text-[#1b4332]">{apt.tokenNumber}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{language === 'ta' ? apt.farmerNameTa : apt.farmerName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{apt.farmerRegNumber}</div>
                      </td>
                      <td className="p-3.5 font-medium text-slate-800">{apt.dpcName.split(' ')[0]}</td>
                      <td className="p-3.5">
                        <div className="font-mono font-bold text-slate-800">{apt.vehicleNumber}</div>
                        <div className="text-[10px] text-slate-500">{apt.paddyType.split(' ')[1]} ({apt.estimatedTons} டன்)</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-700">{apt.appointmentTimeSlot}</div>
                        <div className="text-[10px] text-amber-700 font-bold">SMS நினைவூட்டல்: {apt.hourlyReminderSmsCount} முறை அனுப்பப்பட்டது</div>
                      </td>
                      <td className="p-3.5">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                          apt.status === 'arrived' ? "bg-amber-100 text-amber-900" :
                          apt.status === 'dbt_credited' ? "bg-emerald-600 text-white" :
                          "bg-sky-100 text-sky-800"
                        )}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        {apt.status === 'booked' ? (
                          <button
                            onClick={() => setActiveAptForWeight(apt)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold border border-emerald-200"
                          >
                            எடை பதிவு செய்
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveAptForDBT(apt);
                              setActiveSubTab('dbtPayout');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                          >
                            தரம் & DBT &rarr;
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: DPC LOCATIONS & 30-MINUTE LIVE CAPACITY */}
      {activeSubTab === 'liveCapacity' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#1b4332] font-display flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-700" />
                  <span>{t.site2.capacityTitle}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  {t.site2.capacitySubtitle}
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>30-Min Dynamic Capacity Sync Active</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {dpcs.map((dpc) => {
                const isCritical = dpc.occupancyPercentage >= 90;

                return (
                  <div
                    key={dpc.id}
                    className={cn(
                      "p-5 rounded-3xl border transition-all duration-200 bg-white shadow-sm flex flex-col justify-between space-y-4",
                      isCritical ? "border-red-300 ring-2 ring-red-200" : "border-slate-200 hover:border-emerald-300"
                    )}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                        <div>
                          <h4 className="text-sm font-bold text-[#1b4332] font-display">
                            {language === 'ta' ? dpc.nameTa : dpc.name}
                          </h4>
                          <div className="text-[11px] text-slate-500 mt-0.5">{dpc.district} • {dpc.taluk} Taluk</div>
                        </div>

                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0",
                          isCritical ? "bg-red-100 text-red-900" : "bg-emerald-100 text-emerald-900"
                        )}>
                          {dpc.occupancyPercentage}% நிறைந்தது
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                          <span>{t.site2.currentTonnage} {dpc.currentProcuredTons} டன்</span>
                          <span>{t.site2.remainingCap} {dpc.remainingCapacityTons} டன்</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              isCritical ? "bg-red-500" : "bg-emerald-600"
                            )}
                            style={{ width: `${dpc.occupancyPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                        <div className="text-slate-700 font-medium">{dpc.address}</div>
                        <div className="text-[10px] font-mono text-slate-400">GPS: {dpc.gpsCoordinates}</div>
                        <div className="text-[11px] text-emerald-800 font-mono font-bold pt-1">
                          {dpc.inChargeName} ({dpc.contactPhone})
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
                        <div className="p-2 bg-emerald-50/60 rounded-xl border border-emerald-200">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.site2.gunnyStock}</span>
                          <strong className="text-emerald-900 font-mono">{dpc.availableGunnyBags.toLocaleString()}</strong>
                        </div>

                        <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.site2.truckQueue}</span>
                          <strong className="text-slate-800 font-mono">{dpc.activeTruckQueue} Trucks ({dpc.avgWaitMins}m wait)</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>{t.site2.lastUpdate} {dpc.lastUpdatedMinutesAgo} mins ago</span>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(dpc.gpsCoordinates + ' ' + dpc.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-0.5"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SMART AI INFLOW REDIRECTION (Point 8) */}
      {activeSubTab === 'aiRedirection' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center space-x-2 text-[#1b4332]">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold font-display">{t.site2.redirectionTitle}</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t.site2.redirectionDesc}
            </p>

            {/* Chokepoint Alert */}
            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-3 text-xs">
              <div className="flex items-start space-x-2 text-amber-950 font-bold">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <span>{t.site2.chokepointAlert}</span>
              </div>

              {/* Smart Intelligence Rule Highlight */}
              <div className="p-3 bg-white rounded-xl border border-amber-200 text-slate-700">
                <strong className="text-emerald-800 font-bold block mb-0.5">🧠 AI Smart Intelligence Rule Applied:</strong>
                வல்லம் DPC-யில் 20 டன் மீதமுள்ளது. மாலை 3 மணிக்கு மேல் வரும் பெரிய லாரிகளை (40 டன்) மட்டும் கும்பகோணத்திற்கு திருப்பி விடுகிறது. ஆனால் 5 டன் + 5 டன் கொண்டு வரும் 2 சிறு உழவர்களை திருப்பி விடாமல் வல்லத்திலேயே கொள்முதல் செய்ய அனுமதிக்கிறது.
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    executeSmartAIRedirection('DPC-TNJ-VALLAM', 'DPC-TNJ-KUMBA');
                    setDivertedSuccess(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs shadow-xs transition"
                >
                  {divertedSuccess ? t.site2.divertSuccess : t.site2.divertBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: GRAIN QUALITY & 48-HOUR DIRECT BANK DEPOSIT (DBT - Point 11) */}
      {activeSubTab === 'dbtPayout' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#1b4332] font-display flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-emerald-700" />
                  <span>{t.site2.dbtTitle}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  {t.site2.dbtSubtitle}
                </p>
              </div>

              {/* Select Appointment */}
              <select
                value={activeAptForDBT?.id || ''}
                onChange={(e) => setActiveAptForDBT(appointments.find(a => a.id === e.target.value) || null)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold bg-slate-50"
              >
                {appointments.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.tokenNumber} - {language === 'ta' ? a.farmerNameTa : a.farmerName} ({a.status})
                  </option>
                ))}
              </select>
            </div>

            {activeAptForDBT && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Moisture Slider */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase">
                        {t.site2.moistureLabel}
                      </label>
                      <span className={cn(
                        "text-2xl font-black font-mono px-3 py-0.5 rounded-xl",
                        manualMoisture <= 17.0 ? "bg-emerald-100 text-emerald-900" : "bg-red-100 text-red-900"
                      )}>
                        {manualMoisture.toFixed(1)}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="12.0"
                      max="22.0"
                      step="0.1"
                      value={manualMoisture}
                      onChange={(e) => setManualMoisture(parseFloat(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1b4332]"
                    />

                    <div className="flex justify-between text-[11px] font-bold text-slate-500 mt-1">
                      <span>12% (உலர்ந்தது)</span>
                      <span className="text-emerald-700 font-extrabold">&le; 17.0% அரசு FAQ வரம்பு</span>
                      <span>22% (ஈரப்பதம் அதிகம்)</span>
                    </div>

                    <div className="flex space-x-2 mt-3 pt-2 border-t border-slate-200 text-xs">
                      <button
                        type="button"
                        onClick={() => setManualMoisture(15.2)}
                        className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold"
                      >
                        15.2% (FAQ Passed)
                      </button>
                      <button
                        type="button"
                        onClick={() => setManualMoisture(18.5)}
                        className="px-2.5 py-1 rounded bg-red-50 text-red-800 border border-red-200 font-semibold"
                      >
                        18.5% (Needs Sun Drying)
                      </button>
                    </div>
                  </div>

                  {manualMoisture <= 17.0 ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-1">
                      <h4 className="font-bold flex items-center gap-1.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>ஈரப்பதம் தரம் ஏற்கப்பட்டது (&le; 17.0%)</span>
                      </h4>
                      <p className="text-xs text-emerald-800">{t.site2.moisturePass}</p>
                      <button
                        onClick={handleMoistureAndDBTSubmit}
                        className="mt-2 px-5 py-2.5 bg-[#1b4332] text-white rounded-xl font-bold text-xs hover:bg-[#2d6a4f]"
                      >
                        {t.site2.disburseDbtBtn}
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-950 space-y-1">
                      <h4 className="font-bold flex items-center gap-1.5 text-sm">
                        <AlertTriangle className="w-4 h-4 text-red-700" />
                        <span>ஈரப்பதம் அதிகம் (&gt; 17.0%)</span>
                      </h4>
                      <p className="text-xs text-red-800">{t.site2.moistureFail}</p>
                    </div>
                  )}
                </div>

                {/* EPAS & DBT Summary Card */}
                <div className="lg:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="font-bold uppercase text-slate-800 text-[11px]">EPAS கொள்முதல் ரசீது</div>
                    <span className="font-mono text-[10px] text-emerald-800 font-bold">{activeAptForDBT.epasSlipNumber}</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">விவசாயி:</span>
                      <strong className="text-slate-900">{language === 'ta' ? activeAptForDBT.farmerNameTa : activeAptForDBT.farmerName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">பதிவு எண்:</span>
                      <strong className="font-mono text-slate-800">{activeAptForDBT.farmerRegNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">நிகர எடை:</span>
                      <strong className="font-mono text-emerald-800">{activeAptForDBT.actualTons || activeAptForDBT.estimatedTons} டன்</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">அரசாணை விலை:</span>
                      <strong className="font-mono text-slate-900">₹{activeAptForDBT.mspRatePerQuintal + activeAptForDBT.tnStateBonusPerQuintal}/குவிண்டால்</strong>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200">
                      <span className="text-slate-700 font-bold">மொத்த DBT தொகை:</span>
                      <strong className="font-mono text-base text-[#1b4332] font-extrabold">
                        {formatCurrencyINR(activeAptForDBT.totalPayoutAmount || 193600)}
                      </strong>
                    </div>
                  </div>

                  {activeAptForDBT.status === 'dbt_credited' && (
                    <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-950 text-[11px] font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{t.site2.dbtCreditedBadge}</span>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: TALUK OVERFLOW & EXTRA DPC GOVERNANCE DATA (Points 9 & 10) */}
      {activeSubTab === 'talukAnalytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center space-x-2 text-[#1b4332]">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold font-display">{t.site2.talukTitle}</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t.site2.talukSubtitle}
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">{t.site2.talukCol}</th>
                    <th className="p-3.5">{t.site2.demandCol}</th>
                    <th className="p-3.5">{t.site2.deficitCol}</th>
                    <th className="p-3.5">{t.site2.growthCol}</th>
                    <th className="p-3.5">{t.site2.recommendedNewDpc}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {talukMetrics.map((tm) => (
                    <tr key={tm.taluk} className="hover:bg-slate-50">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{tm.taluk}</div>
                        <div className="text-[10px] text-slate-500">{tm.district} District</div>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-800">
                        {tm.totalProcurementDemandTons.toLocaleString()} MT
                      </td>
                      <td className="p-3.5">
                        <span className="font-mono font-bold text-red-600">-{tm.overflowDeficitTons.toLocaleString()} MT</span>
                        <div className="text-[10px] text-red-700 font-semibold">{tm.overflowFrequency}</div>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-emerald-800">
                        +{tm.procurementGrowthPercent}% YoY
                      </td>
                      <td className="p-3.5">
                        <ul className="text-[11px] text-slate-700 space-y-0.5">
                          {tm.recommendedNewDpcLocations.map(loc => (
                            <li key={loc} className="flex items-center gap-1 text-emerald-900 font-medium">
                              <span>•</span>
                              <span>{loc}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Price Policy Advisory Box (Point 10) */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs text-emerald-950 space-y-2">
              <strong className="block text-sm font-bold text-[#1b4332]">
                📊 அரசு நெல் கொள்முதல் விலை மற்றும் உற்பத்தி ஒப்பீட்டு அறிக்கை (Annual Price Calibration):
              </strong>
              <p className="leading-relaxed">
                கடந்த ஆண்டு சராசரி உற்பத்தியை விட நடப்பு ஆண்டில் திருவையாறு மற்றும் மன்னார்குடி வட்டாரங்களில் கொள்முதல் 9.5% அதிகரித்துள்ளது. இதனால் உழவர்கள் அறுவடை நெல்லை விரைவாக விற்க நடப்பு MSP ₹2,320 உடன் தமிழ்நாடு அரசின் சிறப்பு ஊக்கத்தொகை ₹100 வழங்கி குவிண்டாலுக்கு ₹2,420 ஆக தொடர அரசுக்கு பரிந்துரை செய்யப்படுகிறது.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
