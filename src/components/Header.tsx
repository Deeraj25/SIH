'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ActiveWebsite, Language } from '@/types';
import { 
  Building, 
  Building2, 
  Globe, 
  Sun, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Sparkles,
  Award,
  Landmark,
  Layers,
  Send,
  Calendar,
  UserCheck,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const { 
    activeWebsite, 
    setActiveWebsite, 
    language, 
    setLanguage, 
    t, 
    accessibility, 
    updateAccessibility,
    site1Auth,
    site2Auth,
    logoutSite1Officer,
    logoutSite2Officer,
    farmers,
    appointments,
    isAudioPlaying,
    speak,
    stopAudio
  } = useApp();

  const handleReadAloud = () => {
    if (isAudioPlaying) {
      stopAudio();
    } else {
      const summaryText = activeWebsite === 'farmer_office_registration'
        ? `${t.site1.title}. ${t.site1.subtitle}`
        : `${t.site2.title}. ${t.site2.subtitle}`;
      speak(summaryText);
    }
  };

  const isCurrentOfficerLoggedIn = activeWebsite === 'farmer_office_registration' 
    ? site1Auth.isLoggedIn 
    : site2Auth.isLoggedIn;

  const currentOfficer = activeWebsite === 'farmer_office_registration' 
    ? site1Auth 
    : site2Auth;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Top Tamil Nadu Government Ribbon */}
      <div className="bg-[#1b4332] text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#2d6a4f]">
        <div className="flex items-center space-x-2 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-[#e9c46a] animate-pulse"></span>
          <span className="tracking-wide text-slate-100 font-semibold">{t.govName}</span>
          <span className="text-slate-400">|</span>
          <span className="text-[#e9c46a] font-semibold">{t.tncscTitle}</span>
          <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] bg-emerald-800 text-emerald-100 font-mono font-bold">
            {t.sihBadge}
          </span>
        </div>

        {/* Accessibility & Language Selectors */}
        <div className="flex items-center space-x-2.5 text-xs">
          {/* Font Size Adjuster */}
          <div className="flex items-center bg-black/20 rounded px-1.5 py-0.5 space-x-1">
            <span className="text-slate-300 text-[10px] uppercase font-semibold mr-1">{t.textSize}:</span>
            <button
              onClick={() => updateAccessibility({ fontSize: 'normal' })}
              className={cn(
                "px-1.5 py-0.5 rounded text-[11px] font-bold transition",
                accessibility.fontSize === 'normal' ? "bg-[#e9c46a] text-[#1b4332]" : "text-slate-200 hover:text-white"
              )}
            >
              A
            </button>
            <button
              onClick={() => updateAccessibility({ fontSize: 'large' })}
              className={cn(
                "px-1.5 py-0.5 rounded text-[12px] font-bold transition",
                accessibility.fontSize === 'large' ? "bg-[#e9c46a] text-[#1b4332]" : "text-slate-200 hover:text-white"
              )}
            >
              A+
            </button>
            <button
              onClick={() => updateAccessibility({ fontSize: 'xlarge' })}
              className={cn(
                "px-1.5 py-0.5 rounded text-[13px] font-bold transition",
                accessibility.fontSize === 'xlarge' ? "bg-[#e9c46a] text-[#1b4332]" : "text-slate-200 hover:text-white"
              )}
            >
              A++
            </button>
          </div>

          {/* Sunlight Mode */}
          <button
            onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
            className={cn(
              "flex items-center space-x-1 px-2 py-0.5 rounded text-xs transition font-medium",
              accessibility.highContrast ? "bg-[#e9c46a] text-[#1b4332] font-bold" : "bg-black/20 text-slate-200"
            )}
            title={t.highContrast}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.highContrast}</span>
          </button>

          {/* Voice Narration */}
          <button
            onClick={handleReadAloud}
            className={cn(
              "flex items-center space-x-1 px-2 py-0.5 rounded text-xs transition font-medium",
              isAudioPlaying ? "bg-amber-400 text-black font-bold animate-pulse" : "bg-black/20 text-slate-200"
            )}
            title={isAudioPlaying ? t.stopReading : t.readAloud}
          >
            {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAudioPlaying ? t.stopReading : t.voiceNarration}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-black/30 rounded p-0.5 border border-emerald-700/50">
            <Globe className="w-3 h-3 text-[#e9c46a] ml-1 mr-1" />
            {(['ta', 'en', 'hi'] as Language[]).map((langKey) => (
              <button
                key={langKey}
                onClick={() => setLanguage(langKey)}
                className={cn(
                  "px-2 py-0.5 rounded text-[11px] font-semibold transition uppercase tracking-wider",
                  language === langKey
                    ? "bg-[#e9c46a] text-[#1b4332] shadow-xs font-bold"
                    : "text-slate-200 hover:text-white"
                )}
              >
                {langKey === 'ta' ? 'தமிழ்' : langKey === 'en' ? 'EN' : 'हिंदी'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Bar with Dual Website Switcher Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] p-2 text-white flex items-center justify-center shadow-md ring-2 ring-[#e9c46a]/40">
              <Landmark className="w-7 h-7 text-[#e9c46a]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-[#1b4332] font-display">
                  {t.deptName}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-semibold border border-emerald-300">
                  SIH26032
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                தமிழ்நாடு நுகர்பொருள் வாணிபக் கழகம் • உழவர் பதிவு & DPC கொள்முதல் அமைப்பு
              </p>
            </div>
          </div>

          {/* DUAL WEBSITE SWITCHER TABS & OFFICER STATUS */}
          <div className="flex flex-wrap items-center gap-2">
            
            <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
              
              {/* Website 1 Toggle */}
              <button
                onClick={() => setActiveWebsite('farmer_office_registration')}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                  activeWebsite === 'farmer_office_registration'
                    ? "bg-[#1b4332] text-white shadow-md scale-[1.02]"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200/70"
                )}
              >
                <Building className={cn("w-4 h-4", activeWebsite === 'farmer_office_registration' ? "text-[#e9c46a]" : "text-emerald-700")} />
                <span>{t.websiteSwitch.site1Short}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-700/80 text-emerald-100">
                  {farmers.length}
                </span>
              </button>

              {/* Website 2 Toggle */}
              <button
                onClick={() => setActiveWebsite('dpc_procurement_management')}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ml-1",
                  activeWebsite === 'dpc_procurement_management'
                    ? "bg-[#1b4332] text-white shadow-md scale-[1.02]"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200/70"
                )}
              >
                <Building2 className={cn("w-4 h-4", activeWebsite === 'dpc_procurement_management' ? "text-[#e9c46a]" : "text-emerald-700")} />
                <span>{t.websiteSwitch.site2Short}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>

            </div>

            {/* Officer Status Badge */}
            {isCurrentOfficerLoggedIn ? (
              <div className="flex items-center space-x-1.5 pl-2 pr-1 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs">
                <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-bold">{currentOfficer.name}</span>
                <button
                  onClick={activeWebsite === 'farmer_office_registration' ? logoutSite1Officer : logoutSite2Officer}
                  className="p-1 text-slate-400 hover:text-red-700 rounded-lg hover:bg-red-50 transition"
                  title="Logout Officer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                Officer Login Required
              </span>
            )}

          </div>

        </div>
      </div>

      {/* Operational Live Status Ribbon */}
      <div className="bg-slate-900 text-slate-100 text-[11px] py-1.5 px-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-4">
          <span className="text-emerald-400 font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            SIMULTANEOUS LIVE SYNC
          </span>

          <span className="text-slate-300">
            Registered Farmers: <strong className="text-[#e9c46a] font-mono">{farmers.length}</strong>
          </span>

          <span className="text-slate-300">
            Scheduled Appointments: <strong className="text-emerald-300 font-mono">{appointments.length}</strong>
          </span>
        </div>

        <div className="text-emerald-300 text-xs font-medium">
          {activeWebsite === 'farmer_office_registration'
            ? "Website 1: தொடக்க வேளாண் கூட்டுறவு சங்கம் & விதை நிலையப் பதிவு (PACCS Login Gate Active)"
            : "Website 2: TNCSC DPC நேரடி நெல் கொள்முதல் நிலைய மேலாண்மை (DPC Officer Gate Active)"}
        </div>
      </div>
    </header>
  );
};
