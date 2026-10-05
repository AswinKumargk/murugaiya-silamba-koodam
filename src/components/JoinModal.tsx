import React, { useState } from 'react';
import { 
  X, 
  Swords, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AcademySettings, TrainingSchedule } from '../types/index.ts';
import { api } from '../services/api.ts';

interface JoinModalProps {
  settings: AcademySettings;
  schedules: TrainingSchedule[];
  initialBatch?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenFeePayment: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  settings,
  schedules,
  initialBatch,
  isOpen,
  onClose,
  onOpenFeePayment,
}) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number>(12);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState(schedules[0]?.id || '');
  const [experience, setExperience] = useState('Beginner (No prior martial arts experience)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    try {
      const selectedBatch = schedules.find(s => s.id === selectedBatchId) || schedules[0];
      await api.saveStudent({
        fullName,
        age: Number(age),
        dob: `${2026 - Number(age)}-01-01`,
        gender,
        category: Number(age) < 14 ? 'Sub-Junior' : Number(age) < 18 ? 'Junior' : 'Senior',
        batchId: selectedBatch?.id || 'sch-1',
        batchName: selectedBatch?.batch || 'Beginners Batch',
        parentName: parentName || 'Guardian',
        phoneNumber: phone,
        status: 'Active',
        isPublicProfile: false,
        joiningDate: new Date().toISOString().split('T')[0],
        achievementsCount: 0
      });

      setIsSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Enrollment error:', err);
      alert('Enrollment failed. Please call or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-xl w-full bg-[#10131c] border border-[#d4af37]/50 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/team%20logo.jpeg"
                alt="Murugaiya Silamba Koodam Logo"
                className="w-12 h-12 object-contain rounded-full drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] shrink-0"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.tried) {
                    target.dataset.tried = '1';
                    target.src = '/team_logo.jpeg';
                  }
                }}
              />
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-white">
                  Join Silambam Training
                </h3>
                <div className="text-xs text-[#d4af37] font-semibold">
                  {settings.academyName} · Malaikovil, Thiruverumbur
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Candidate name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    min={4}
                    max={70}
                    required
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98424 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    placeholder="Required if under 18"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-1">
                    Select Training Batch *
                  </label>
                  <select
                    value={selectedBatchId}
                    onChange={(e) => setSelectedBatchId(e.target.value)}
                    className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {schedules.map((sch) => (
                      <option key={sch.id} value={sch.id}>
                        {sch.day}: {sch.batch} (₹{sch.fee}/mo)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">
                  Prior Experience
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Beginner">Beginner (No prior martial arts experience)</option>
                  <option value="Intermediate">Intermediate (Trained previously elsewhere)</option>
                  <option value="Advanced / Competitor">Advanced (Tournament competitor)</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-gray-800 text-[11px] text-gray-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  First trial session is free. Bamboo staves will be provided by the academy for your initial evaluation.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3cf65] via-[#d4af37] to-[#b89025] hover:brightness-110 rounded-lg shadow-lg shadow-[#d4af37]/20 transition-all"
              >
                <span>{isSubmitting ? 'Enrolling...' : 'Submit Enrollment & Reserve Slot'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-6 py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1">
                Enrollment Received!
              </div>
              <h4 className="font-heading text-2xl font-black text-white">
                Welcome to Murugaiya Silamba Koodam
              </h4>
              <p className="text-xs text-gray-300 max-w-sm mx-auto mt-2 leading-relaxed">
                Your admission request for <strong className="text-white">{fullName}</strong> has been logged. Our chief coach will welcome you at Malaikovil grounds for your orientation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenFeePayment();
                }}
                className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg shadow-md"
              >
                Pay Monthly Fee (₹400)
              </button>

              <button
                onClick={onClose}
                className="px-5 py-3 text-xs font-semibold text-gray-400 hover:text-white bg-gray-800 rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
