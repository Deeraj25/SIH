'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  CheckSquare, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Building, 
  Building2, 
  Calendar, 
  Scale, 
  Banknote, 
  TrendingUp, 
  Award,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistStep {
  id: string;
  stepNumber: number;
  website: string;
  title: string;
  description: string;
  onJump: () => void;
}

export const EvaluationChecklist: React.FC = () => {
  const { setActiveWebsite } = useApp();
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    'step-1': true,
    'step-2': false,
    'step-3': false,
    'step-4': false,
    'step-5': false,
    'step-6': false,
    'step-7': false,
    'step-8': false,
    'step-9': false,
  });

  const steps: ChecklistStep[] = [
    {
      id: 'step-1',
      stepNumber: 1,
      website: 'Website 1',
      title: 'In-Person Office Registration (Aadhaar / PM-Kisan)',
      description: 'Test registering a farmer at PACCS / Seed Station using 12-digit Aadhaar / PM-Kisan ID to prevent fake entries.',
      onJump: () => {
        setActiveWebsite('farmer_office_registration');
      }
    },
    {
      id: 'step-2',
      stepNumber: 2,
      website: 'Website 1',
      title: 'AI Crop Ripening & Harvest Prediction Engine',
      description: 'Observe AI automatically calculating 130-day ripening timeline and procurement readiness window from sowing date.',
      onJump: () => {
        setActiveWebsite('farmer_office_registration');
      }
    },
    {
      id: 'step-3',
      stepNumber: 3,
      website: 'Website 1',
      title: 'Autonomous Bilingual SMS Dispatch',
      description: 'Check live SMS stream sending Tamil/English SMS to farmer with Unique Reg Number and ripening timeline.',
      onJump: () => {
        setActiveWebsite('farmer_office_registration');
      }
    },
    {
      id: 'step-4',
      website: 'Website 2',
      stepNumber: 4,
      title: 'DPC Prior Slot Booking & Hourly SMS Reminders',
      description: 'Schedule a pre-booked procurement appointment (no random walk-ins) and activate 1-hour prior SMS reminders.',
      onJump: () => {
        setActiveWebsite('dpc_procurement_management');
      }
    },
    {
      id: 'step-5',
      website: 'Website 2',
      stepNumber: 5,
      title: '30-Minute Dynamic DPC Capacity Tracker',
      description: 'Monitor live DPC cards with daily capacity, current tonnage, remaining space, and empty gunny bags stock.',
      onJump: () => {
        setActiveWebsite('dpc_procurement_management');
      }
    },
    {
      id: 'step-6',
      website: 'Website 2',
      stepNumber: 6,
      title: 'Smart AI Inflow Redirection & Load Balancing',
      description: 'Execute AI rerouting from 94% full Vallam DPC to Kumbakonam while intelligently retaining small 5t+5t batches.',
      onJump: () => {
        setActiveWebsite('dpc_procurement_management');
      }
    },
    {
      id: 'step-7',
      website: 'Website 2',
      stepNumber: 7,
      title: 'DPC Weighbridge Gross & Tare Weight Recording',
      description: 'Log Gross Weight (12,400 kg) & Tare (4,400 kg) to calculate verified Net Paddy Weight (8.0 MT).',
      onJump: () => {
        setActiveWebsite('dpc_procurement_management');
      }
    },
    {
      id: 'step-8',
      website: 'Website 2',
      stepNumber: 8,
      title: 'Direct Bank Deposit within 48 Hours (G.O. Ms 148)',
      description: 'Inspect manual moisture test (<=17%) and disburse direct PFMS DBT payout at official rate (₹2,420/qtl).',
      onJump: () => {
        setActiveWebsite('dpc_procurement_management');
      }
    },
    {
      id: 'step-9',
      website: 'Website 2',
      stepNumber: 9,
      title: 'Taluk Overflow Data & Extra DPC Sanctioning Plan',
      description: 'Review seasonal overflow deficits for State Government to sanction new DPC centers and calibrate prices.',
      onJump: () => {
        setActiveWebsite('dpc_procurement_management');
      }
    }
  ];

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const toggleStep = (id: string) => {
    setCheckedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleJump = (step: ChecklistStep) => {
    step.onJump();
    setCheckedSteps(prev => ({ ...prev, [step.id]: true }));
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      
      {/* Collapsed Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2.5 px-4 py-3 rounded-2xl bg-[#1b4332] text-white hover:bg-[#2d6a4f] shadow-2xl border-2 border-[#e9c46a] transition-all transform hover:scale-105"
        >
          <div className="relative">
            <CheckSquare className="w-5 h-5 text-[#e9c46a]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <div className="text-left">
            <div className="text-xs font-extrabold font-display flex items-center gap-1.5">
              <span>SIH Core Features Checklist</span>
              <span className="text-[10px] bg-amber-400 text-black px-1.5 py-0.2 rounded-full font-mono font-bold">
                {completedCount}/{steps.length}
              </span>
            </div>
            <div className="text-[10px] text-emerald-200">
              Website 1 & Website 2 Verification Guide
            </div>
          </div>
        </button>
      )}

      {/* Expanded Panel */}
      {isOpen && (
        <div className="w-[380px] sm:w-[470px] bg-white rounded-3xl shadow-2xl border-2 border-emerald-800/40 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in slide-in-from-bottom-5">
          
          <div className="bg-[#1b4332] text-white p-4 flex items-center justify-between shrink-0 border-b border-[#2d6a4f]">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-[#2d6a4f] text-[#e9c46a]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-display flex items-center gap-2">
                  <span>SIH26032 Core Evaluation Checklist</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-700 text-emerald-100 font-mono">
                    {progressPercent}% Done
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-200">
                  Website 1 (Farmer Reg) & Website 2 (DPC Operations)
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-slate-200 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full bg-slate-100 h-1.5 shrink-0">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-500 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="p-4 space-y-3 overflow-y-auto flex-1 divide-y divide-slate-100 text-xs">
            {steps.map((step) => {
              const isChecked = !!checkedSteps[step.id];

              return (
                <div key={step.id} className="pt-3 first:pt-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="flex items-start space-x-2 text-left flex-1 group"
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition",
                        isChecked
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-300 bg-white group-hover:border-emerald-500"
                      )}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-slate-100 text-slate-700">
                            {step.website}
                          </span>
                          <span className="font-mono font-bold text-emerald-800">
                            Step {step.stepNumber}:
                          </span>
                          <span className={cn(
                            "font-bold",
                            isChecked ? "text-slate-500 line-through" : "text-slate-900"
                          )}>
                            {step.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleJump(step)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold text-[10px] transition shrink-0 flex items-center gap-1 border border-emerald-200"
                    >
                      <span>Jump</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 p-3.5 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
            <span className="text-[11px] text-slate-600 font-medium">
              {completedCount} of {steps.length} Steps Verified
            </span>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  const allDone: Record<string, boolean> = {};
                  steps.forEach(s => allDone[s.id] = true);
                  setCheckedSteps(allDone);
                }}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-slate-100"
              >
                Mark All Done
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 rounded-lg bg-[#1b4332] text-white text-[11px] font-bold hover:bg-[#2d6a4f]"
              >
                Minimize
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
