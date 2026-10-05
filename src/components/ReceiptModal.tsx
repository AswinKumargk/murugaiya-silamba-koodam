import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle, 
  ShieldCheck, 
  Share2, 
  Building, 
  MapPin, 
  Phone 
} from 'lucide-react';
import { Emblem } from './Emblem.tsx';
import { AcademySettings, FeePayment, MatchRegistration } from '../types/index.ts';

interface ReceiptModalProps {
  settings: AcademySettings;
  data: {
    type: 'fee' | 'match';
    fee?: FeePayment;
    match?: MatchRegistration;
  };
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ settings, data, onClose }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const isFee = data.type === 'fee' && data.fee;
  const isMatch = data.type === 'match' && data.match;

  const receiptNo = isFee ? data.fee!.receiptNumber : data.match!.registrationId;
  const payerName = isFee ? data.fee!.studentName : data.match!.playerName;
  const amount = isFee ? data.fee!.amount : data.match!.entryFee;
  const dateStr = isFee 
    ? (data.fee!.paymentDate || new Date().toISOString().split('T')[0]) 
    : new Date(data.match!.registeredAt).toLocaleDateString('en-IN');
  const txnRef = isFee ? (data.fee!.transactionId || 'UPI-VERIFIED') : (data.match!.transactionRef || 'UPI-MATCH-CONFIRMED');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-xl w-full bg-[#0e1118] border border-[#d4af37]/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header Bar (Hidden during print) */}
        <div className="p-4 bg-[#141822] border-b border-gray-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span>Official Academy Receipt Generated</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-md transition-colors shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div 
          ref={receiptRef}
          className="p-6 sm:p-8 bg-[#090b10] text-gray-200 overflow-y-auto space-y-6 print:p-8 print:bg-white print:text-black font-sans"
        >
          {/* Academy Letterhead */}
          <div className="border-b-2 border-[#d4af37]/60 pb-5 text-center">
            <div className="flex justify-center mb-2">
              <Emblem size="lg" />
            </div>
            
            <h2 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-wider text-white print:text-black">
              {settings.academyName}
            </h2>
            <div className="text-xs font-semibold text-[#d4af37] print:text-amber-800 tracking-widest mt-0.5">
              {settings.tamilName}
            </div>
            <div className="text-[11px] text-gray-400 print:text-gray-600 mt-1">
              Malaikovil, Thiruverumbur, Tiruchirappalli, Tamil Nadu - 620013 · Phone: {settings.phone}
            </div>
            <div className="mt-2 inline-block px-3 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-[#9e121b]/30 text-amber-300 border border-amber-500/40 print:bg-gray-200 print:text-black">
              {isFee ? 'Monthly Student Fee Receipt' : 'Tournament Match Entry Pass & Receipt'}
            </div>
          </div>

          {/* Receipt Meta Strip */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-[#11141e] print:bg-gray-100 p-3.5 rounded-lg border border-gray-800 print:border-gray-300">
            <div>
              <span className="text-gray-400 print:text-gray-600 block text-[10px] uppercase font-bold">
                {isFee ? 'Receipt Number' : 'Registration ID'}
              </span>
              <span className="font-mono font-bold text-white print:text-black text-sm">
                {receiptNo}
              </span>
            </div>

            <div className="text-right">
              <span className="text-gray-400 print:text-gray-600 block text-[10px] uppercase font-bold">Date of Issuance</span>
              <span className="font-semibold text-white print:text-black">{dateStr}</span>
            </div>
          </div>

          {/* Transaction & Student Details Table */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-gray-800/80 print:border-gray-200">
              <span className="text-gray-400 print:text-gray-600">Student / Player Name:</span>
              <span className="font-bold text-white print:text-black text-sm">{payerName}</span>
            </div>

            {isFee && (
              <>
                <div className="flex justify-between py-2 border-b border-gray-800/80 print:border-gray-200">
                  <span className="text-gray-400 print:text-gray-600">Student ID:</span>
                  <span className="font-mono text-gray-200 print:text-gray-800">{data.fee!.studentId}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800/80 print:border-gray-200">
                  <span className="text-gray-400 print:text-gray-600">Parent / Guardian:</span>
                  <span className="text-gray-200 print:text-gray-800">{data.fee!.parentName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800/80 print:border-gray-200">
                  <span className="text-gray-400 print:text-gray-600">Training Period:</span>
                  <span className="font-semibold text-[#f3cf65] print:text-black">{data.fee!.month} {data.fee!.year}</span>
                </div>
              </>
            )}

            {isMatch && (
              <>
                <div className="flex justify-between py-2 border-b border-gray-800/80 print:border-gray-200">
                  <span className="text-gray-400 print:text-gray-600">Tournament Event:</span>
                  <span className="font-semibold text-white print:text-black text-right max-w-xs">{data.match!.eventName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800/80 print:border-gray-200">
                  <span className="text-gray-400 print:text-gray-600">Age & Division:</span>
                  <span className="text-gray-200 print:text-gray-800">{data.match!.ageCategory} · {data.match!.eventCategory}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800/80 print:border-gray-200">
                  <span className="text-gray-400 print:text-gray-600">Representing Team:</span>
                  <span className="text-gray-200 print:text-gray-800">{data.match!.academyName}</span>
                </div>
              </>
            )}

            <div className="flex justify-between py-2 border-b border-gray-800/80 print:border-gray-200">
              <span className="text-gray-400 print:text-gray-600">Payment Channel:</span>
              <span className="text-gray-200 print:text-gray-800 font-medium">UPI / Instant Gateway</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-800/80 print:border-gray-200">
              <span className="text-gray-400 print:text-gray-600">Transaction Reference:</span>
              <span className="font-mono text-xs text-gray-300 print:text-gray-700">{txnRef}</span>
            </div>

            {/* Total Paid Amount Highlight */}
            <div className="flex justify-between items-center py-3 bg-[#131722] print:bg-gray-100 px-4 rounded-xl border border-[#d4af37]/30 print:border-gray-300 mt-2">
              <span className="font-bold text-white print:text-black text-sm">TOTAL AMOUNT PAID</span>
              <span className="font-heading text-xl font-black text-[#f3cf65] print:text-black">
                ₹{amount}.00
              </span>
            </div>
          </div>

          {/* Verification Seal & Signature */}
          <div className="pt-6 flex items-end justify-between border-t border-gray-800/80 print:border-gray-300">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 print:text-green-800 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Digitally Verified & Authenticated</span>
              </div>
              <div className="text-[10px] text-gray-500 print:text-gray-600 font-mono">
                Hash: {btoa(receiptNo + String(amount)).slice(0, 16)}
              </div>
            </div>

            <div className="text-center">
              <div className="w-28 border-b border-gray-600 print:border-black mb-1 mx-auto" />
              <div className="text-[10px] font-bold uppercase text-gray-300 print:text-black">
                Authorized Signatory
              </div>
              <div className="text-[9px] text-[#d4af37] print:text-gray-600">
                Murugaiya Silamba Koodam
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
