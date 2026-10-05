import React from 'react';
import { 
  Calendar, 
  Clock, 
  Flame, 
  Sparkles, 
  Sun,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { TrainingSchedule } from '../types/index.ts';

interface ScheduleProps {
  schedules?: TrainingSchedule[];
  onSelectBatch?: (schedule: TrainingSchedule) => void;
}

export const Schedule: React.FC<ScheduleProps> = () => {
  const daysOfWeek = [
    { short: 'Mon', full: 'Monday' },
    { short: 'Tue', full: 'Tuesday' },
    { short: 'Wed', full: 'Wednesday' },
    { short: 'Thu', full: 'Thursday' },
    { short: 'Fri', full: 'Friday' },
    { short: 'Sat', full: 'Saturday' },
    { short: 'Sun', full: 'Sunday' },
  ];

  const campCurriculum = [
    'Traditional Kaaladi (footwork lock & balance fundamentals)',
    'Single & double bamboo staff rotation drills (Thiravukol)',
    'Speed evasion, defense, and parrying techniques',
    'Championship point combat & reaction development',
    'Physical conditioning, stamina, and martial discipline'
  ];

  return (
    <section id="schedule" className="py-24 bg-[#0a0c10] relative overflow-hidden">
      {/* Background martial aura glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#9e121b]/15 via-[#d4af37]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-[#f3cf65] bg-[#d4af37]/15 border border-[#d4af37]/35 rounded-full shadow-sm">
            <Sun className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Training Batches &amp; Schedule</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            Class Schedule
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-4" />
          <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
            Regular weekend classes for ongoing training, plus a special 30-day summer intensive every April &amp; May.
          </p>
        </div>

        {/* ── NORMAL CLASSES CARD ── */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#141824] to-[#0e111a] border-2 border-[#d4af37]/40 shadow-[0_15px_40px_rgba(0,0,0,0.80)] overflow-hidden mb-8">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-[#1a2040] via-[#232b50] to-[#1a2040] px-6 py-3 text-center border-b border-[#d4af37]/30">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-amber-200">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>REGULAR TRAINING BATCH</span>
              <Calendar className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            {/* Title */}
            <div className="pb-8 border-b border-gray-800 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#f3cf65] uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                <span>Weekend Silambam Practice</span>
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                NORMAL CLASSES
              </h3>
              <div className="text-sm font-bold text-gray-400 tracking-wider uppercase mt-1" lang="ta">
                வார இறுதி சிலம்பப் பயிற்சி
              </div>
            </div>

            {/* Days Strip — Saturday & Sunday only */}
            <div className="py-8 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Weekly Class Days</span>
                <span className="text-xs font-semibold text-[#f3cf65]">Saturday &amp; Sunday</span>
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-xs">
                {['Saturday', 'Sunday'].map((day) => (
                  <div
                    key={day}
                    className="p-3 rounded-xl bg-gradient-to-b from-[#1c2233] to-[#121624] border border-[#d4af37]/40 text-center shadow-sm"
                  >
                    <div className="text-sm font-black text-[#f3cf65]">{day.slice(0, 3)}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{day}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="pt-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3" lang="ta">
                பயிற்சி முக்கிய விஷயங்கள்:
              </div>
              <p className="text-sm text-gray-300 leading-relaxed" lang="ta">
                வார இறுதி நாட்களில் தொடர்ந்து சிலம்பம் கற்க விரும்பும் மாணவர்களுக்கான வழக்கமான பயிற்சி வகுப்பு. அடிப்படை சிலம்ப அசைவுகள், காலடி பயிற்சி, கம்பைப் பிடிக்கும் முறைகள், உடல் வலிமை, வேகம், சமநிலை மற்றும் பாரம்பரிய சிலம்ப நுட்பங்கள் ஆகியவை படிப்படியாக கற்றுத்தரப்படும். தொடங்கல் நிலை முதல் தொடர்ந்து பயிற்சி பெறும் மாணவர்கள் வரை கலந்து கொள்ளலாம்.
              </p>
            </div>

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between flex-wrap gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Open for all age groups — beginners welcome</span>
              </div>
              <span className="text-[#f3cf65] font-semibold">Malaikovil Grounds, Thiruverumbur</span>
            </div>
          </div>
        </div>

        {/* Master Summer Camp Class Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#141824] to-[#0e111a] border-2 border-[#d4af37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
          
          {/* Top Decorative Martial Banner */}
          <div className="bg-gradient-to-r from-[#9e121b] via-[#b51722] to-[#9e121b] px-6 py-3 text-center border-b border-[#d4af37]/30">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-amber-200">
              <Flame className="w-4 h-4 fill-amber-300 text-amber-400" />
              <span>OFFICIAL ACADEMY SUMMER BATCH</span>
              <Flame className="w-4 h-4 fill-amber-300 text-amber-400" />
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            
            {/* Top Program Title & Meta */}
            <div className="pb-8 border-b border-gray-800 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#f3cf65] uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                <span>Exclusive 30-Day Intensive Batch</span>
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                SUMMER CAMP CLASS
              </h3>
              <div className="text-sm font-bold text-gray-400 tracking-wider uppercase mt-1">
                கோடைகால சிறப்புப் பயிற்சி முகாம்
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 border-b border-gray-800">
              
              <div className="p-4 rounded-2xl bg-black/40 border border-gray-800/80">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Duration</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-heading">
                  30 DAYS
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Complete foundational to competition skills
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-gray-800/80">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Period</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-heading">
                  APRIL & MAY
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Scheduled during school annual vacations
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-gray-800/80">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Schedule</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-heading">
                  ALL DAYS
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  7 days a week intensive regimen
                </div>
              </div>

            </div>

            {/* All Days of the Week Visual Strip */}
            <div className="py-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Weekly Class Days
                </span>
                <span className="text-xs font-semibold text-[#f3cf65]">
                  All Days of the Week
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {daysOfWeek.map((d) => (
                  <div 
                    key={d.short}
                    className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-[#1c2233] to-[#121624] border border-[#d4af37]/30 text-center shadow-sm"
                  >
                    <div className="text-xs sm:text-sm font-black text-[#f3cf65]">
                      {d.short}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-gray-400 truncate hidden sm:block">
                      {d.full}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Camp Curriculum Focus */}
            <div className="pt-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                Camp Training Focus & Disciplines:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {campCurriculum.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Informational Guidance */}
            <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between flex-wrap gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Open for School Students, College Athletes & Fitness Beginners</span>
              </div>
              <span className="text-[#f3cf65] font-semibold">
                Direct Enrollment at Malaikovil Grounds
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
