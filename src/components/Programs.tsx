import React, { useState } from 'react';
import { 
  Shield, 
  Swords, 
  Flame, 
  Activity, 
  Compass, 
  Tent, 
  ArrowRight, 
  X, 
  Clock, 
  Users, 
  Target,
  BookOpen
} from 'lucide-react';

interface ProgramDetail {
  id: string;
  title: string;
  tamil: string;
  tagline: string;
  level: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  image?: string;
  tamilDescription: string;
  overview: string;
  curriculum: string[];
  scheduleRef: string;
  recommendedFor: string;
}

interface ProgramsProps {
  onJoinBatch?: (batchTitle: string) => void;
}

export const Programs: React.FC<ProgramsProps> = () => {
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(null);

  const programs: ProgramDetail[] = [
    {
      id: 'regular',
      title: 'REGULAR SILAMBAM TRAINING',
      tamil: 'அடிப்படை சிலம்பப் பயிற்சி',
      tagline: 'Structured foundational syllabus for children and beginners.',
      level: 'Beginner to Intermediate',
      duration: '3 Months / 6 Months / 1 Year',
      icon: Shield,
      image: '/src/assets/images/hero_silambam_1790999305064.jpeg',
      tamilDescription: 'முன்னதாக எந்தவிதமான தற்காப்புக் கலைப் பயிற்சி அனுபவமும் இல்லாதவர்களையும் வரவேற்கும் எங்களின் அடிப்படைப் பயிற்சி திட்டம் இதுவாகும். மாணவர்கள் பாரம்பரிய காலடி அசைவுகள் மற்றும் காலடி வடிவங்கள், ஒற்றைக் கம்பைப் பிடிக்கும் முறைகள், மணிக்கட்டு சுழற்சிகள், அடிப்படைத் தாக்குதல் அசைவுகள் மற்றும் வணக்கம் செலுத்தும் முறைகள் (வந்தனம்) ஆகியவற்றைக் கற்றுக்கொள்கிறார்கள்.',
      overview: 'Our foundational program welcomes trainees with zero prior martial experience. Students learn ancient Kaaladi (footwork geometries), standard single-stick gripping, wrist rotations, basic striking trajectories, and salutation forms (Vandanam).',
      curriculum: [
        'Vandanam & traditional martial discipline',
        'Kaaladi (8 basic step patterns & defensive angles)',
        'Thiravukol (wrist rotations & continuous figure-8 sweeps)',
        'Adimurai (16 basic defensive and counter blocks)',
        'Introduction to controlled two-person partner drills'
      ],
      scheduleRef: 'Monday, Wednesday & Friday Evening Batches',
      recommendedFor: 'School children from age 5, teenagers, and adult fitness beginners.'
    },
    {
      id: 'competition',
      title: 'COMPETITION TRAINING',
      tamil: 'போட்டிச் சிலம்பப் பயிற்சி',
      tagline: 'High-intensity squad training for district, state, and national podiums.',
      level: 'Advanced / Elite Athletes',
      duration: 'Year-Round Championship Squad',
      icon: Swords,
      image: '/src/assets/images/tournament_fight_1790999328755.jpeg',
      tamilDescription: 'அதிகாரப்பூர்வ சிலம்பம் கூட்டமைப்பு மற்றும் பள்ளி விளையாட்டுக் கூட்டமைப்பு விதிமுறைகளுக்கு ஏற்ப வழங்கப்படும் தீவிரமான போட்டிப் பயிற்சியாகும். மின்னணு புள்ளி அடிப்படையிலான போட்டி முறைகள், தந்திரமான வேக எதிர்த்தாக்குதல்கள், விரைவான மீட்பு காலடி அசைவுகள் மற்றும் உண்மையான சாம்பியன்ஷிப் போட்டிகளைப் போன்ற பயிற்சி போட்டிகள் ஆகியவற்றில் சிறப்பு கவனம் செலுத்தப்படும்.',
      overview: 'Rigorous sports-specific coaching governed by official Silambam Federation and School Games Federation regulations. Emphasizes electronic point sparring, tactical speed counters, recovery footwork, and mock championship tournaments.',
      curriculum: [
        'Electronic sensor & referee point sparring tactics',
        'High-velocity single stick strikes and lunges',
        'Reaction drills & rapid defensive evasion',
        'Mental conditioning and tournament psychology',
        'Cardiovascular endurance and weigh-in conditioning'
      ],
      scheduleRef: 'Sunday Morning & Friday Advanced Evening',
      recommendedFor: 'Trained students aiming for School Games, Khelo India, and State medals.'
    },
    {
      id: 'weapon',
      title: 'WEAPON TRAINING',
      tamil: 'பாரம்பரிய ஆயுதப் பயிற்சி',
      tagline: 'Authentic Tamil weaponry: bamboo staff, flexible sword, and deer horns.',
      level: 'Intermediate to Advanced',
      duration: 'Syllabus-Based Weapon Ranks',
      icon: Flame,
      image: '/src/assets/images/silambam_weapon_1790999316824.jpg',
      tamilDescription: 'தமிழ் வீரர்களின் பாரம்பரிய ஆயுதக் கலையை ஆழமாகக் கற்றுக்கொள்ளும் பயிற்சியாகும். முழு உடல் ஒருங்கிணைப்பு தேவைப்படும் நெகிழ்வான வாள் போன்ற சுருள் வாள், தற்காப்பிற்குப் பயன்படுத்தப்படும் கடினப்படுத்தப்பட்ட மான்கொம்பு ஆயுதமான மடுவு மற்றும் பித்தளை முனையுடன் கூடிய வேல் கம்பு ஆகிய பாரம்பரிய ஆயுதங்களின் பயன்பாடு மற்றும் கட்டுப்பாட்டு முறைகள் இதில் அடங்கும்.',
      overview: 'Master the revered weapon arsenal of Tamil warriors. Includes Surul Vaal (flexible ribbon sword requiring complete body coordination), Maduvu (hardened deer horn parrying shield), and Vel Kambu (brass-tipped spear).',
      curriculum: [
        'Sedikuchi (short staff precision strikes)',
        'Maduvu (ancient dual deer-horn parrying and thrusts)',
        'Surul Vaal (multi-bladed flexible ribbon sword control)',
        'Vel Kambu (spear thrust and deflection geometry)',
        'Dual-staff (Irattai Kambu) simultaneous offense/defense'
      ],
      scheduleRef: 'Friday Evening & Weekend Masterclasses',
      recommendedFor: 'Intermediate & advanced students who have mastered basic staff control.'
    },
    {
      id: 'traditional',
      title: 'TRADITIONAL TECHNIQUES',
      tamil: 'பழங்கால தற்காப்புக் கலை',
      tagline: 'Preserving ancient Adimurai, locks, vital points, and bare-hand combat.',
      level: 'All Levels',
      duration: 'Mastery Pathway',
      icon: Compass,
      tamilDescription: 'சங்க காலத்து வீரக் கலை மற்றும் தற்காப்பு மரபுகளின் அறிவை ஆழமாக அறிந்து கொள்ளும் பயிற்சியாகும். கை சிலம்பம், ஆயுதமற்ற தற்காப்பு மற்றும் கம்புப் பயன்பாட்டு முறைகள், மணிக்கட்டு ஆயுதப் பறிப்பு நுட்பங்கள், மூட்டு கட்டுப்பாட்டு முறைகள் மற்றும் அன்றாட சூழ்நிலைகளில் தற்காப்பிற்குப் பயன்படும் நடைமுறைப் பயிற்சிகள் ஆகியவை இதில் அடங்கும்.',
      overview: 'Delve into the cultural wisdom of Sangam-era martial literature. Kai Silambam (unarmed staff applications), wrist disarms, joint control, and self-defense scenarios designed for everyday street safety.',
      curriculum: [
        'Kai Silambam (unarmed hand-to-hand defense against weapons)',
        'Pootu & Pirivu (joint locks, reversals, and escaping holds)',
        'Varma Kalai awareness (striking non-fatal reflex points)',
        'Traditional martial etiquette, code of honor, and Gurukulam respect',
        'History of Tamil martial traditions from Sangam classics'
      ],
      scheduleRef: 'Regular curriculum integrated across all batches',
      recommendedFor: 'Anyone wanting authentic Tamil martial heritage and street self-defense.'
    },
    {
      id: 'fitness',
      title: 'FITNESS & CONDITIONING',
      tamil: 'உடற்பயிற்சி & ஆற்றல்',
      tagline: 'Unleash athletic mobility, rotational core torque, and endurance.',
      level: 'All Levels (Students & Working Professionals)',
      duration: 'Continuous Program',
      icon: Activity,
      tamilDescription: 'சிலம்பக் கலை உடலின் அனைத்து தசைகளுக்கும் ஒரே நேரத்தில் பயிற்சி அளிக்கிறது. இந்த உடற்பயிற்சி முறை உடல் எடையைக் குறைத்து, கை மணிக்கட்டு பிடிமான வலிமையை அதிகரித்து, நாள் முழுவதும் சுறுசுறுப்பாகவும் புத்துணர்ச்சியுடனும் இருக்க உதவுகிறது.',
      overview: 'Silambam works the entire body simultaneously. This conditioning regimen burns calories, develops explosive forearm grip strength, relieves sedentary posture stiffness, and tones core stabilizers without heavy weights.',
      curriculum: [
        'Martial dynamic stretches & hip mobility openers',
        'High-cadence staff spinning intervals for shoulder endurance',
        'Agility ladder and plyometric footwork drills',
        'Deep stance isometric holds (Kuthu Kaaladi endurance)',
        'Breathing techniques (Pranayama) for focus and recovery'
      ],
      scheduleRef: 'Integrated into all weekday sessions',
      recommendedFor: 'Children seeking athletic fitness, adults wanting active posture rehabilitation.'
    },
    {
      id: 'camps',
      title: 'SPECIAL TRAINING CAMPS',
      tamil: 'சிறப்புப் பயிற்சி முகாம்கள்',
      tagline: 'Intensive holiday workshops, residential retreats, and master seminars.',
      level: 'Open to All Enrollees',
      duration: '5 to 10 Days Intensive',
      icon: Tent,
      tamilDescription: 'பள்ளி கோடை விடுமுறை, தீபாவளி மற்றும் பொங்கல் விடுமுறை காலங்களில் சிறப்பு பயிற்சி முகாம்கள் நடத்தப்படும். சிறப்பு விருந்தினர் ஆசான்களின் பயிற்சிகள், மலைக்கோவில் சுற்றுப்பகுதிகளில் உடல் சகிப்புத்தன்மையை வளர்க்கும் மலைப்பாதை நடைப்பயிற்சிகள் மற்றும் போட்டி அனுபவத்தை உருவாக்கும் மாதிரி போட்டிகள் ஆகியவை இந்த தீவிரப் பயிற்சி முகாம்களில் இடம்பெறும்.',
      overview: 'Conducted during school summer vacations, Diwali, and Pongal holidays. Immersive bootcamps featuring guest masters, mountain trail stamina marches around Malaikovil, and tournament mock scrimmages.',
      curriculum: [
        'Early sunrise endurance hill runs at Malaikovil rock',
        'Master classes by visiting state & national referees',
        'Intensive weapon workshops with customized syllabus books',
        'Official belt/rank assessment and certification exam',
        'Exhibition demonstration for parents and local patrons'
      ],
      scheduleRef: 'Announced quarterly in the Events Section',
      recommendedFor: 'Students wanting rapid progression and high-energy holiday training.'
    }
  ];

  return (
    <section id="programs" className="py-24 bg-[#08090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-md">
            <Target className="w-3.5 h-3.5" />
            <span>Structured Curriculum</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            Training Programs
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-4" />
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
            From first-time children holding a bamboo staff to seasoned championship athletes, our curriculum is engineered for safety, speed, and martial excellence.
          </p>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className="group relative rounded-2xl bg-[#11141c] hover:bg-[#161a25] border border-gray-800 hover:border-[#d4af37]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
              >
                {/* Optional Top Card Image */}
                {prog.image && (
                  <div className="relative h-44 overflow-hidden bg-black">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = '1';
                          if (prog.id === 'regular') {
                            target.src = '/hero_silambam_1790999305064.jpeg';
                          } else if (prog.id === 'competition') {
                            target.src = '/tournament_fight_1790999328755.jpeg';
                          }
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-transparent to-black/40" />
                    
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm border border-gray-700 text-[10px] font-semibold text-[#f3cf65]">
                      {prog.level}
                    </div>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {!prog.image && (
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-black/60 border border-gray-800 flex items-center justify-center text-[#d4af37]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-medium text-gray-400 border border-gray-800 px-2 py-0.5 rounded">
                          {prog.level}
                        </span>
                      </div>
                    )}

                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#f3cf65] transition-colors leading-snug">
                      {prog.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#d4af37] mb-3">
                      {prog.tamil}
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed font-light mb-4">
                      {prog.tagline}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-gray-800/80 text-[11px] text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Duration: {prog.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate">{prog.scheduleRef}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Exactly one CTA [ LEARN MORE ] */}
                  <div className="mt-6 pt-4 border-t border-gray-800">
                    <button
                      onClick={() => setSelectedProgram(prog)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:text-black bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent hover:from-[#d4af37] hover:via-[#f3cf65] hover:to-[#d4af37] border border-[#d4af37]/40 hover:border-transparent transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm active:scale-[0.98]"
                    >
                      <span>LEARN MORE</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Program Detail Modal (Complete Tamil Description) */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative max-w-2xl w-full bg-[#10131d] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#9e121b]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Clear Close Button */}
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-gray-900/80 hover:bg-gray-800 rounded-full border border-gray-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Program Badge */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-2">
              <span className="bg-[#9e121b]/40 border border-[#9e121b]/60 text-red-300 px-2.5 py-0.5 rounded-full text-[10px]">
                {selectedProgram.tamil}
              </span>
              <span>·</span>
              <span className="text-gray-400">{selectedProgram.level}</span>
            </div>

            {/* Prominent Program Title */}
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">
              {selectedProgram.title}
            </h3>

            {/* Complete Tamil Description */}
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-black/60 border border-[#d4af37]/30 shadow-inner">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#f3cf65]">
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span>பயிற்சி விவரம் (Program Description)</span>
              </div>
              <p className="text-sm sm:text-base text-gray-100 font-normal leading-relaxed tracking-wide font-sans select-text">
                {selectedProgram.tamilDescription}
              </p>
            </div>

            {/* English Overview */}
            <div className="mb-6 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              <p>{selectedProgram.overview}</p>
            </div>

            {/* Key Curriculum & Techniques */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                Key Curriculum & Techniques Covered
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProgram.curriculum.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-300 bg-black/30 p-2 rounded-lg border border-gray-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Meta Details */}
            <div className="p-4 rounded-xl bg-black/50 border border-gray-800 space-y-1.5 mb-6 text-xs text-gray-300">
              <div><strong className="text-[#d4af37]">Recommended For:</strong> {selectedProgram.recommendedFor}</div>
              <div><strong className="text-[#d4af37]">Training Schedule:</strong> {selectedProgram.scheduleRef}</div>
              <div><strong className="text-[#d4af37]">Duration:</strong> {selectedProgram.duration}</div>
            </div>

            {/* Footer with Clear Close Action (No Join/Enroll) */}
            <div className="pt-4 border-t border-gray-800/80 flex items-center justify-end">
              <button
                onClick={() => setSelectedProgram(null)}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-xl shadow-md transition-all text-center"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
