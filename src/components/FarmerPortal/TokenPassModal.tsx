'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ProcurementAppointment } from '@/types';
import { 
  X, 
  Printer, 
  CheckCircle2, 
  QrCode, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

export const TokenPassModal: React.FC<{ token: ProcurementAppointment; onClose: () => void }> = ({ token, onClose }) => {
  const { language } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const totalRate = token.mspRatePerQuintal + token.tnStateBonusPerQuintal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="bg-[#1b4332] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-[#2d6a4f] text-[#e9c46a]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display">
                TNCSC DPC இ-டோக்கன் அனுமதி சீட்டு
              </h3>
              <p className="text-[11px] text-emerald-200">
                தமிழ்நாடு நுகர்பொருள் வாணிபக் கழகம் • நேரடி நெல் கொள்முதல்
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition text-slate-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Pass Body */}
        <div id="printable-receipt" className="p-5 md:p-6 space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-200">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                TNCSC DPC Procurement Token Pass
              </div>
              <div className="text-xl font-mono font-extrabold text-[#1b4332]">
                {token.tokenNumber}
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>முன்பதிவு உறுதி</span>
            </div>
          </div>

          {/* QR Code & DPC Center */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-xs border border-slate-300 flex flex-col items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-900 rounded grid grid-cols-4 gap-1 p-1">
                <div className="bg-white rounded-xs"></div>
                <div className="bg-slate-900 rounded-xs"></div>
                <div className="bg-white rounded-xs"></div>
                <div className="bg-slate-900 rounded-xs"></div>
                <div className="bg-slate-900 rounded-xs"></div>
                <div className="bg-white rounded-xs"></div>
                <div className="bg-white rounded-xs"></div>
                <div className="bg-white rounded-xs"></div>
                <div className="bg-white rounded-xs"></div>
                <div className="bg-slate-900 rounded-xs"></div>
                <div className="bg-white rounded-xs"></div>
                <div className="bg-white rounded-xs"></div>
              </div>
              <span className="text-[7px] font-mono text-slate-500 mt-1 uppercase font-bold">DPC GATE QR</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{language === 'ta' ? token.dpcNameTa : token.dpcName}</span>
              </div>
              <div className="text-slate-600 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>நாள்: <strong>{token.appointmentDate}</strong></span>
              </div>
              <div className="text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>அனுமதி நேரம்: <strong className="text-emerald-800">{token.appointmentTimeSlot}</strong></span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-400 font-bold uppercase">விவசாயி பெயர்</div>
              <div className="font-bold text-slate-800 mt-0.5">{language === 'ta' ? token.farmerNameTa : token.farmerName}</div>
              <div className="text-[10px] text-slate-500 font-mono">பதிவு: {token.farmerRegNumber}</div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-400 font-bold uppercase">நெல் & மூட்டைகள்</div>
              <div className="font-bold text-emerald-800 mt-0.5">{token.paddyType.split(' ')[1]} ({token.variety})</div>
              <div className="text-[10px] text-slate-600 font-semibold">{token.gunnyBagsCount} மூட்டைகள் ({token.estimatedTons} டன்)</div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-400 font-bold uppercase">வாகனம்</div>
              <div className="font-bold text-slate-800 mt-0.5 font-mono">{token.vehicleNumber}</div>
              <div className="text-[10px] text-slate-500">{token.transportMode.split(' ')[0]}</div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-400 font-bold uppercase">அரசாணை விலை (G.O. Ms 148)</div>
              <div className="font-bold text-[#1b4332] mt-0.5">₹{totalRate} / குவிண்டால்</div>
              <div className="text-[10px] text-emerald-700 font-medium">MSP + ₹100 TN ஊக்கத்தொகை</div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              இந்த QR டோக்கன் அல்லது மணிநேர SMS-ஐ DPC எடை மேடை நுழைவு வாயிலில் காண்பிக்கவும்.
            </span>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-bold transition flex items-center space-x-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>அச்சிடுக (Print)</span>
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
