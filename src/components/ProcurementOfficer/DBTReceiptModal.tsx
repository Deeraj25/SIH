'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ProcurementAppointment } from '@/types';
import { 
  X, 
  Printer, 
  CheckCircle2, 
  Landmark, 
  ShieldCheck, 
  Receipt, 
  FileCheck 
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

export const DBTReceiptModal: React.FC<{ token: ProcurementAppointment; onClose: () => void }> = ({ token, onClose }) => {
  const { t, language } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const weightTons = token.actualTons || token.estimatedTons || 8.0;
  const totalRate = token.mspRatePerQuintal + token.tnStateBonusPerQuintal;
  const totalAmount = token.totalPayoutAmount || Math.round(weightTons * 10 * totalRate);
  const txnId = token.dbtTxnId || "PFMS-TNCSC-20260831-8841029";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-[#1b4332] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-[#2d6a4f] text-[#e9c46a]">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display">
                TNCSC அதிகாரப்பூர்வ மின்னணு நெல் கொள்முதல் ரசீது (EPAS)
              </h3>
              <p className="text-[11px] text-emerald-200">
                தமிழ்நாடு நுகர்பொருள் வாணிபக் கழகம் • 48 மணி நேர நேரடி DBT வரவு
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 text-slate-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Body */}
        <div id="printable-receipt" className="p-6 space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-300">
                <Landmark className="w-5 h-5 text-emerald-900" />
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase text-[#1b4332]">
                  Government of Tamil Nadu - TNCSC
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  Direct Paddy Procurement EPAS & 48-Hour PFMS Mandate
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e9c46a]" />
                <span>வங்கிக்கு வரவு செய்யப்பட்டது</span>
              </span>
            </div>
          </div>

          {/* Amount Box */}
          <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-4 rounded-2xl border border-emerald-300 text-center shadow-inner">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              மொத்த நேரடி DBT வரவுத் தொகை
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#1b4332] mt-1">
              {formatCurrencyINR(totalAmount)}
            </div>
            <div className="text-xs font-semibold text-emerald-800 mt-1 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>G.O. (Ms) No. 148 / 2026 படி 48 மணி நேரத்திற்குள் வங்கி கணக்கில் செலுத்துகை</span>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase">PFMS / வங்கி UTR எண்</span>
              <div className="font-mono font-bold text-slate-800 text-[11px] truncate mt-0.5">{txnId}</div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase">பயனாளி விவசாயி</span>
              <div className="font-bold text-slate-800 mt-0.5">{language === 'ta' ? token.farmerNameTa : token.farmerName}</div>
              <div className="text-[10px] text-slate-500 font-mono">பதிவு: {token.farmerRegNumber}</div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase">கொள்முதல் நெல் ரகம்</span>
              <div className="font-bold text-emerald-800 mt-0.5">{token.paddyType.split(' ')[1]} ({token.variety})</div>
              <div className="text-[10px] text-slate-500">ஈரப்பதம்: {token.moisturePercentage || 15.4}% (FAQ Passed)</div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase">கொள்முதல் செய்யப்பட்ட எடை</span>
              <div className="font-bold text-slate-800 font-mono mt-0.5">{weightTons} டன் ({weightTons * 10} குவிண்டால்)</div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase">விலை விகிதம் & காலம்</span>
              <div className="font-bold text-[#1b4332] font-mono mt-0.5">
                ₹{totalRate}/குவிண்டால் (MSP ₹{token.mspRatePerQuintal} + TN போனஸ் ₹{token.tnStateBonusPerQuintal}) • வரவு: {token.dbtCreditedAt || 'Within 48 hours'}
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between font-medium">
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>TNCSC நேரடி நெல் கொள்முதல் ஒப்புதல் சீட்டு (EPAS) வழங்கப்பட்டது.</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-700">{token.appointmentDate}</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center space-x-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>அச்சிடுக (Print EPAS)</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1b4332] text-white text-xs font-bold hover:bg-[#2d6a4f] transition"
          >
            மூடுக (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
