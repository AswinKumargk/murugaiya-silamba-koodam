import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { 
  X, 
  Trophy, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Calendar, 
  Download, 
  Users, 
  Phone,
  Copy
} from 'lucide-react';
import { AcademySettings, EventItem, MatchRegistration } from '../types/index.ts';
import { api } from '../services/api.ts';

interface MatchEntryModalProps {
  settings: AcademySettings;
  events: EventItem[];
  preselectedEvent?: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRegistrationSuccess: (reg: MatchRegistration) => void;
}

export const MatchEntryModal: React.FC<MatchEntryModalProps> = ({
  settings,
  events,
  preselectedEvent,
  isOpen,
  onClose,
  onRegistrationSuccess,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [playerName, setPlayerName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [ageCategory, setAgeCategory] = useState('Junior (14-17)');
  const [eventCategory, setEventCategory] = useState('Single Stick Point Combat');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [academyName, setAcademyName] = useState('Murugaiya Silamba Koodam');
  const [previousAchievements, setPreviousAchievements] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  // Multi-step: 1 = Form, 2 = Summary & UPI Payment, 3 = Confirmed
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedRegistration, setCompletedRegistration] = useState<MatchRegistration | null>(null);

  useEffect(() => {
    if (preselectedEvent) {
      setSelectedEventId(preselectedEvent.id);
    } else if (events.length > 0 && !selectedEventId) {
      setSelectedEventId(events[0].id);
    }
  }, [preselectedEvent, events]);

  const activeEvent = events.find(e => e.id === selectedEventId) || events[0];
  const entryFee = activeEvent ? activeEvent.entryFee : 500;

  useEffect(() => {
    if (step === 2 && activeEvent) {
      const upiUrl = `upi://pay?pa=${encodeURIComponent(settings.upiId)}&pn=${encodeURIComponent(settings.upiName)}&am=${entryFee}&cu=INR&tn=Tournament%20Entry%20${encodeURIComponent(playerName)}`;
      QRCode.toDataURL(upiUrl, {
        width: 250,
        margin: 1,
        color: { dark: '#000000', light: '#ffffff' }
      }).then(url => {
        setQrCodeDataUrl(url);
      }).catch(err => {
        console.error('QR code generation error:', err);
      });
    }
  }, [step, activeEvent, entryFee, playerName, settings]);

  if (!isOpen) return null;

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName || !phoneNumber || !activeEvent) return;
    setStep(2);
  };

  const handleConfirmAndPay = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.registerMatch({
        eventId: activeEvent.id,
        eventName: activeEvent.title,
        playerName,
        dob,
        gender,
        ageCategory,
        eventCategory,
        phoneNumber,
        academyName: academyName || 'Independent Participant',
        previousAchievements,
        emergencyContact: emergencyContact || phoneNumber,
        entryFee
      });

      if (res.success && res.registration) {
        setCompletedRegistration(res.registration);
        setStep(3);
        onRegistrationSuccess(res.registration);

        // Confetti celebration
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Tournament entry submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setPlayerName('');
    setDob('');
    setPhoneNumber('');
    setPreviousAchievements('');
    setEmergencyContact('');
    setCompletedRegistration(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-xl w-full bg-[#10131c] border border-[#d4af37]/50 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#9e121b] to-[#c51d28] border border-red-500/40 flex items-center justify-center text-amber-300 shadow-md">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-white">
              Tournament Match Entry
            </h3>
            <div className="text-xs text-[#d4af37] font-semibold">
              Official Athlete Championship Registration
            </div>
          </div>
        </div>

        {/* STEP 1: Registration Form */}
        {step === 1 && (
          <form onSubmit={handleSubmitDetails} className="space-y-4 text-xs">
            
            {/* Event Selection */}
            <div>
              <label className="block font-bold text-gray-300 uppercase tracking-wider text-[11px] mb-1">
                Select Tournament / Championship Event *
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-[#d4af37]"
              >
                {events.map((evt) => (
                  <option key={evt.id} value={evt.id}>
                    {evt.title} — Fee: ₹{evt.entryFee} ({evt.status})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">
                  Athlete / Fighter Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full name as in Aadhaar"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">
                  Gender *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">
                  Age Division *
                </label>
                <select
                  value={ageCategory}
                  onChange={(e) => setAgeCategory(e.target.value)}
                  className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Sub-Junior (Under 14)">Sub-Junior (Under 14)</option>
                  <option value="Junior (14-17)">Junior (14-17)</option>
                  <option value="Senior (18+)">Senior (18+)</option>
                  <option value="Veterans / Masters">Veterans / Masters</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">
                  Fighting Category *
                </label>
                <select
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value)}
                  className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Single Stick Point Combat">Single Stick Point Combat</option>
                  <option value="Double Stick Free Sparring">Double Stick Free Sparring</option>
                  <option value="Traditional Form / Kata (Tharavu)">Traditional Form / Kata</option>
                  <option value="Surul Vaal (Flexible Sword)">Surul Vaal (Flexible Sword)</option>
                  <option value="Maduvu (Deer Horn)">Maduvu (Deer Horn)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98424 00000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">
                  Academy / Team Representing
                </label>
                <input
                  type="text"
                  placeholder="e.g. Murugaiya Silamba Koodam"
                  value={academyName}
                  onChange={(e) => setAcademyName(e.target.value)}
                  className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">
                  Previous Martial Honors / Belt
                </label>
                <input
                  type="text"
                  placeholder="e.g. District Gold 2025 or First Tournament"
                  value={previousAchievements}
                  onChange={(e) => setPreviousAchievements(e.target.value)}
                  className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  placeholder="Parent / Coach phone"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3cf65] via-[#d4af37] to-[#b89025] hover:brightness-110 rounded-lg shadow-lg shadow-[#d4af37]/20 transition-all"
            >
              <span>Review Summary & Pay Entry Fee (₹{entryFee})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Registration Summary & UPI Payment */}
        {step === 2 && activeEvent && (
          <div className="space-y-6">
            <div className="bg-[#0c0e15] p-4 rounded-xl border border-gray-800 space-y-2 text-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] border-b border-gray-800 pb-1">
                Registration Summary
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Player Name:</span>
                <span className="font-bold text-white">{playerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Event:</span>
                <span className="text-white text-right max-w-xs">{activeEvent.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Division:</span>
                <span className="text-gray-200">{ageCategory} · {eventCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Academy / Team:</span>
                <span className="text-gray-200">{academyName}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-800 font-bold text-sm">
                <span className="text-gray-300">Entry Fee:</span>
                <span className="text-[#f3cf65]">₹{entryFee}.00</span>
              </div>
            </div>

            {/* Generated UPI QR Code */}
            <div className="text-center">
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-xl max-w-xs mx-auto border-4 border-[#d4af37]">
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="UPI QR Code"
                    className="w-48 h-48 object-contain"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-gray-500">
                    Generating UPI QR...
                  </div>
                )}
                <div className="text-[10px] font-bold text-black mt-1">
                  Scan to Pay ₹{entryFee} via Any UPI App
                </div>
              </div>
              
              <div className="text-[11px] text-gray-400 mt-2">
                UPI ID: <span className="font-mono text-white">{settings.upiId}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 text-xs font-semibold text-gray-400 hover:text-white bg-gray-800 rounded-lg"
              >
                Back to Edit
              </button>

              <button
                disabled={isSubmitting}
                onClick={handleConfirmAndPay}
                className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg shadow-md transition-all"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Registration'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Confirmed Match Pass */}
        {step === 3 && completedRegistration && (
          <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1">
                Match Registration Confirmed!
              </div>
              <h4 className="font-heading text-2xl font-black text-white">
                Ready for the Arena
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                Official Registration ID: <span className="font-mono text-[#f3cf65] font-bold">{completedRegistration.registrationId}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-gray-800 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Player:</span>
                <span className="font-semibold text-white">{completedRegistration.playerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Event:</span>
                <span className="text-white text-right max-w-xs">{completedRegistration.eventName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span className="text-white">{completedRegistration.ageCategory} · {completedRegistration.eventCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Team:</span>
                <span className="text-white">{completedRegistration.academyName}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onRegistrationSuccess(completedRegistration);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Entry Pass & Receipt</span>
              </button>

              <button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="px-5 py-3 text-xs font-semibold text-gray-400 hover:text-white bg-gray-800 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
