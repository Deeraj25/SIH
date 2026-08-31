'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { FarmerOfficeRegistrationWebsite } from '@/components/FarmerOfficePortal/FarmerOfficeRegistrationWebsite';
import { ProcurementLiveManagementWebsite } from '@/components/ProcurementManagement/ProcurementLiveManagementWebsite';
import { TokenPassModal } from '@/components/FarmerPortal/TokenPassModal';
import { DBTReceiptModal } from '@/components/ProcurementOfficer/DBTReceiptModal';
import { EvaluationChecklist } from '@/components/EvaluationChecklist';
import { Landmark, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const { 
    activeWebsite, 
    modal, 
    closeModal, 
    accessibility, 
    t, 
    language 
  } = useApp();

  const getFontClass = () => {
    switch (accessibility.fontSize) {
      case 'large':
        return 'font-large-mode';
      case 'xlarge':
        return 'font-xlarge-mode';
      default:
        return 'font-normal-mode';
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-200 bg-slate-50",
      getFontClass(),
      accessibility.highContrast && "high-contrast-mode"
    )}>
      {/* Top Tamil Nadu Gov Header */}
      <Header />

      {/* Main Dual-Website Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeWebsite === 'farmer_office_registration' ? (
          <FarmerOfficeRegistrationWebsite />
        ) : (
          <ProcurementLiveManagementWebsite />
        )}
      </main>

      {/* Global Action Modals */}
      {modal.type === 'token_pass' && modal.data && (
        <TokenPassModal token={modal.data} onClose={closeModal} />
      )}
      {modal.type === 'dbt_receipt' && modal.data && (
        <DBTReceiptModal token={modal.data} onClose={closeModal} />
      )}

      {/* Floating Evaluator Step-by-Step Checklist */}
      <EvaluationChecklist />

      {/* Tamil Nadu Official Footer */}
      <footer className="bg-[#081c15] text-slate-300 text-xs border-t border-[#1b4332] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-emerald-900/60">
            
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center space-x-2 text-white font-bold font-display text-sm">
                <Landmark className="w-5 h-5 text-[#e9c46a]" />
                <span>தமிழ்நாடு நுகர்பொருள் வாணிபக் கழகம் (TNCSC)</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                தமிழ்நாடு அரசு • வேளாண்மை, கூட்டுறவு மற்றும் உணவுத்துறை • தொடக்க வேளாண் கூட்டுறவு உழவர் பதிவு மற்றும் DPC நேரடி நெல் கொள்முதல் மேலாண்மை அமைப்பு • SIH26032.
              </p>
            </div>

            <div>
              <div className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                இணைக்கப்பட்ட இரு தளங்கள்
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li>• வலைத்தளம் 1: உழவர் பதிவு அலுவலக தளம்</li>
                <li>• வலைத்தளம் 2: DPC நேரடி கொள்முதல் தளம்</li>
                <li>• AI பயிர் முதிர்வு & அறுவடை காலம்</li>
                <li>• 30-நிமிட நேரலை DPC கொள்ளளவு நிலை</li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                கொள்முதல் மையங்கள் & DBT
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li>• சன்ன ரகம்: ₹2,420 / குவிண்டால் (G.O. 148)</li>
                <li>• பொது ரகம்: ₹2,400 / குவிண்டால்</li>
                <li>• 48 மணி நேர நேரடி வங்கி வரவு (PFMS)</li>
                <li>• AI நெரிசல் சமநிலை & திசைதிருப்பல்</li>
              </ul>
            </div>

          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
            <div>
              &copy; 2026 Government of Tamil Nadu — Tamil Nadu Civil Supplies Corporation (TNCSC).
            </div>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
              <Award className="w-3.5 h-3.5 text-[#e9c46a]" />
              <span>Smart India Hackathon SIH26032 Working Prototype</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
