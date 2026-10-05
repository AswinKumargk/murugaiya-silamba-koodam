import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  Copy, 
  Check, 
  QrCode, 
  Smartphone, 
  ExternalLink, 
  ShieldCheck, 
  Download,
  AlertCircle
} from 'lucide-react';
import { AcademySettings, FeePayment } from '../types/index.ts';

interface FeePaymentModalProps {
  settings: AcademySettings;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: (fee: FeePayment) => void;
}

export const FeePaymentModal: React.FC<FeePaymentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const UPI_ID = 'iamsujii20122007@oksbi';
  const AMOUNT = 400;
  const PAYEE_NAME = 'Murugaiya Silamba Koodam';
  const NOTE = 'Monthly Silambam Training Fee';

  // Strict UPI deep link format with pa, am, cu as required
  const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${AMOUNT}&cu=INR&tn=${encodeURIComponent(NOTE)}`;

  const [activeTab, setActiveTab] = useState<'pay' | 'qr'>('pay');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [upiOpened, setUpiOpened] = useState<boolean>(false);

  // Generate QR code dynamically from the exact UPI URI
  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(upiUri, {
        width: 320,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('Failed to generate UPI QR code:', err));
    }
  }, [isOpen, upiUri]);

  // Reset state when opening/closing
  useEffect(() => {
    if (!isOpen) {
      setUpiOpened(false);
      setCopiedUpi(false);
      setActiveTab('pay');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handlePayClick = () => {
    setUpiOpened(true);
    // Direct mobile UPI application trigger
    window.location.href = upiUri;
  };

  const handleDownloadQr = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement('a');
    a.href = qrCodeDataUrl;
    a.download = `Murugaiya-Silambam-Fee-₹${AMOUNT}-QR.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#0e111a] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative glow accents */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#9e121b]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-gray-900/60 hover:bg-gray-800 rounded-full transition-colors border border-gray-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Academy Branding & Official Logo */}
        <div className="flex flex-col items-center justify-center mb-4">
          <img
            src="/team%20logo.jpeg"
            alt="Murugaiya Silamba Koodam Official Logo"
            className="w-16 h-16 object-contain rounded-full drop-shadow-[0_0_12px_rgba(212,175,55,0.45)] mb-2"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.tried) {
                target.dataset.tried = '1';
                target.src = '/team_logo.jpeg';
              }
            }}
          />
          <h3 className="font-heading font-black text-sm tracking-wider uppercase text-white/90">
            MURUGAIYA SILAMBA KOODAM
          </h3>
          <div className="text-[10px] tracking-widest uppercase text-[#d4af37] font-semibold">
            Tiruchirappalli · Malaikovil
          </div>
        </div>

        {/* Title */}
        <div className="my-2">
          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-[#9e121b]/30 text-red-300 border border-[#9e121b]/60 mb-2">
            Monthly Training Fee
          </div>
          <div className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-1">
            <span className="text-[#f3cf65]">₹</span>
            <span>{AMOUNT}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Silambam Training Fee
          </p>
        </div>

        {/* View Mode Toggle: [ Pay Directly ] vs [ Scan QR Code ] */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#141824] rounded-xl border border-gray-800 my-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('pay')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'pay'
                ? 'bg-gradient-to-r from-[#9e121b] to-[#b71c1c] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Pay UPI App</span>
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'qr'
                ? 'bg-[#d4af37] text-black font-extrabold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR Code</span>
          </button>
        </div>

        {/* UPI ID Info Box with 1-Tap Copy */}
        <div className="mb-5 p-3 rounded-xl bg-black/60 border border-gray-800 flex items-center justify-between text-left">
          <div className="min-w-0 pr-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              Official UPI ID
            </div>
            <div className="text-xs sm:text-sm font-mono font-bold text-[#f3cf65] truncate select-all">
              {UPI_ID}
            </div>
          </div>
          <button
            onClick={handleCopyUpi}
            className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              copiedUpi
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700'
            }`}
            title="Copy UPI ID"
          >
            {copiedUpi ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gray-300" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* TAB 1: Direct Pay ₹400 */}
        {activeTab === 'pay' && (
          <div className="space-y-3">
            {/* Primary Action Button: [ PAY ₹400 ] */}
            <a
              href={upiUri}
              onClick={handlePayClick}
              className="w-full py-4 px-6 rounded-xl font-heading font-black text-base uppercase tracking-wider text-black bg-gradient-to-r from-[#d4af37] via-[#f3cf65] to-[#d4af37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_24px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 group"
            >
              <span>PAY ₹{AMOUNT}</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
              <span>Supports</span>
              <span className="font-semibold text-gray-300">GPay · PhonePe · Paytm · BHIM</span>
            </div>

            {/* UPI App Trigger State Banner */}
            {upiOpened && (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-left animate-fade-in">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#f3cf65] shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-200/90 leading-relaxed">
                    <strong className="block font-bold text-[#f3cf65] text-xs uppercase tracking-wide mb-0.5">
                      UPI App Opened
                    </strong>
                    Please complete the payment of <strong>₹{AMOUNT}</strong> in your UPI application. Verify that the receiver is <strong>{UPI_ID}</strong> before entering your PIN.
                  </div>
                </div>
              </div>
            )}

            {/* Quick Switch to QR Code */}
            <button
              onClick={() => setActiveTab('qr')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4 text-[#d4af37]" />
              <span>Or Click Here to View QR Code</span>
            </button>
          </div>
        )}

        {/* TAB 2: Dynamic QR Code: SCAN TO PAY ₹400 */}
        {activeTab === 'qr' && (
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              SCAN TO PAY ₹{AMOUNT}
            </div>

            <div className="p-3 bg-white rounded-2xl inline-block shadow-xl border-4 border-[#d4af37]/60">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt={`UPI QR Code to pay ₹${AMOUNT} to ${UPI_ID}`}
                  className="w-56 h-56 mx-auto object-contain"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-xs text-gray-500">
                  Generating QR Code...
                </div>
              )}
            </div>

            <p className="text-[11px] text-gray-400">
              Open Google Pay, PhonePe, Paytm, or any UPI camera app on your phone and scan.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadQr}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-gray-900/80 hover:bg-gray-800 border border-gray-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Save QR Code</span>
              </button>
              <a
                href={upiUri}
                onClick={handlePayClick}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-black bg-[#d4af37] hover:bg-[#f3cf65] flex items-center justify-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>PAY ₹{AMOUNT}</span>
              </a>
            </div>
          </div>
        )}

        {/* Security Assurance */}
        <div className="mt-5 pt-3 border-t border-gray-800/80 flex items-center justify-center gap-2 text-[10px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Direct UPI Transfer · No banking passwords, PINs, or cards requested</span>
        </div>
      </div>
    </div>
  );
};
