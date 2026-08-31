'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Building, 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  User, 
  Sparkles, 
  ArrowRight,
  Landmark,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Site1OfficeLogin: React.FC = () => {
  const { loginSite1Officer, t } = useApp();
  const [deptId, setDeptId] = useState<string>('PACCS-TNJ-1048');
  const [password, setPassword] = useState<string>('••••••••');
  const [securityPin, setSecurityPin] = useState<string>('1048');
  const [selectedOffice, setSelectedOffice] = useState<string>('PACCS Thiruvaiyaru Primary Cooperative Bank');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptId.trim() || !securityPin.trim()) {
      setErrorMsg('Please enter Staff ID and Security PIN.');
      return;
    }
    loginSite1Officer(deptId, securityPin, selectedOffice);
  };

  const handleDemoLogin = () => {
    loginSite1Officer('PACCS-TNJ-1048', '1048', selectedOffice);
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 md:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl animate-in fade-in">
      
      {/* Top Header */}
      <div className="text-center pb-6 border-b border-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white mx-auto flex items-center justify-center shadow-lg ring-4 ring-[#e9c46a]/30 mb-3">
          <Building className="w-8 h-8 text-[#e9c46a]" />
        </div>
        <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono mb-1">
          WEBSITE 1 • OFFICIAL REGISTRATION GATEWAY
        </div>
        <h2 className="text-xl font-bold text-[#1b4332] font-display">
          வேளாண் & கூட்டுறவு வங்கி உழவர் பதிவு அதிகாரி உள்நுழைவு
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          PACCS கூட்டுறவு வங்கி / விதை கொள்முதல் நிலைய பொறுப்பாளர் அங்கீகார தளம்
        </p>
      </div>

      {/* 1-Click Demo Login for Evaluators */}
      <div className="mt-5 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="font-semibold text-emerald-950">
            Hackathon Evaluator Quick Access:
          </span>
        </div>
        <button
          onClick={handleDemoLogin}
          type="button"
          className="px-3.5 py-1.5 rounded-xl bg-[#1b4332] text-white hover:bg-[#2d6a4f] text-xs font-bold transition flex items-center gap-1 shrink-0 shadow-xs"
        >
          <span>அதிகாரி உள்நுழைவு (1-Click)</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#e9c46a]" />
        </button>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
        
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            பதிவு அலுவலகம் (Office / Seed Station)
          </label>
          <select
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:ring-2 focus:ring-[#2d6a4f]"
          >
            <option value="PACCS Thiruvaiyaru Primary Cooperative Bank">PACCS Thiruvaiyaru Primary Cooperative Bank, Thanjavur</option>
            <option value="Mannargudi Agri Extension Centre & Seed Station">Mannargudi Agri Extension Centre & Seed Station, Tiruvarur</option>
            <option value="Melur Primary Agricultural Cooperative Society">Melur PACCS Cooperative Society, Madurai</option>
            <option value="Chidambaram Seed Distribution & Agri Depot">Chidambaram Seed Distribution Depot, Cuddalore</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            அதிகாரி பணியாளர் அடையாள எண் (Staff ID)
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={deptId}
              onChange={(e) => setDeptId(e.target.value)}
              placeholder="e.g. PACCS-TNJ-1048"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-medium bg-slate-50 focus:ring-2 focus:ring-[#2d6a4f]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              கடவுச்சொல் (Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:ring-2 focus:ring-[#2d6a4f]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              2FA பாதுகாப்பு பின் (Security PIN)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                maxLength={4}
                value={securityPin}
                onChange={(e) => setSecurityPin(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold bg-slate-50 focus:ring-2 focus:ring-[#2d6a4f]"
              />
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-900 rounded-xl text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] text-white text-xs font-bold hover:shadow-lg transition flex items-center justify-center space-x-2"
        >
          <ShieldCheck className="w-4 h-4 text-[#e9c46a]" />
          <span>அலுவலக தளத்திற்கு பாதுகாப்பாக நுழைக</span>
        </button>
      </form>

      <div className="mt-5 text-center text-[11px] text-slate-400">
        அங்கீகரிக்கப்பட்ட தமிழ்நாடு வேளாண்மை & கூட்டுறவு சங்க அதிகாரிகளுக்கு மட்டுமே அனுமதி.
      </div>

    </div>
  );
};
