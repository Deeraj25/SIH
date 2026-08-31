'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Building2, 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  User, 
  Sparkles, 
  ArrowRight,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Site2DPCLogin: React.FC = () => {
  const { loginSite2Officer, dpcs, t } = useApp();
  const [deptId, setDeptId] = useState<string>('TNCSC-TNJ-4821');
  const [password, setPassword] = useState<string>('••••••••');
  const [securityPin, setSecurityPin] = useState<string>('4821');
  const [selectedDpcId, setSelectedDpcId] = useState<string>(dpcs[0]?.id || 'DPC-TNJ-VALLAM');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptId.trim() || !securityPin.trim()) {
      setErrorMsg('Please enter Department ID and Security PIN.');
      return;
    }
    loginSite2Officer(deptId, securityPin, selectedDpcId);
  };

  const handleDemoLogin = () => {
    loginSite2Officer('TNCSC-TNJ-4821', '4821', selectedDpcId);
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 md:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl animate-in fade-in">
      
      {/* Top Header */}
      <div className="text-center pb-6 border-b border-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white mx-auto flex items-center justify-center shadow-lg ring-4 ring-[#e9c46a]/30 mb-3">
          <Building2 className="w-8 h-8 text-[#e9c46a]" />
        </div>
        <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono mb-1">
          WEBSITE 2 • DPC PROCUREMENT OPERATIONS
        </div>
        <h2 className="text-xl font-bold text-[#1b4332] font-display">
          TNCSC நேரடி நெல் கொள்முதல் நிலைய அதிகாரி உள்நுழைவு
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          DPC நிலையப் பொறுப்பாளர், எடை மேடை கண்காணிப்பாளர் & தர ஆய்வாளர் பாதுகாப்பு தளம்
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
          <span>DPC அதிகாரி உள்நுழைவு (1-Click)</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#e9c46a]" />
        </button>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
        
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>நேரடி கொள்முதல் நிலையம் (DPC Center)</span>
          </label>
          <select
            value={selectedDpcId}
            onChange={(e) => setSelectedDpcId(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:ring-2 focus:ring-[#2d6a4f]"
          >
            {dpcs.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.district})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            TNCSC துறை அடையாள எண் (Department Staff ID)
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={deptId}
              onChange={(e) => setDeptId(e.target.value)}
              placeholder="e.g. TNCSC-TNJ-4821"
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
          <span>DPC கொள்முதல் தளத்திற்கு பாதுகாப்பாக நுழைக</span>
        </button>
      </form>

      <div className="mt-5 text-center text-[11px] text-slate-400">
        அங்கீகரிக்கப்பட்ட தமிழ்நாடு நுகர்பொருள் வாணிபக் கழக (TNCSC) அதிகாரிகளுக்கு மட்டுமே அனுமதி.
      </div>

    </div>
  );
};
