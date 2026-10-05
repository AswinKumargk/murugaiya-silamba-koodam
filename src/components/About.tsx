import React from 'react';
import { 
  Shield, 
  Zap, 
  Flame, 
  Trophy, 
  HeartHandshake, 
  CheckCircle2, 
  MapPin,
  Sparkles
} from 'lucide-react';
import { AcademySettings } from '../types/index.ts';

interface AboutProps {
  settings: AcademySettings;
  onFeeClick?: () => void;
}

export const About: React.FC<AboutProps> = ({ settings, onFeeClick }) => {
  const pillars = [
    {
      title: 'DISCIPLINE',
      tamil: 'ஒழுக்கம்',
      description: 'Build mental focus, self-restraint, respect for teachers and seniors, and unwavering personal responsibility in every action.',
      icon: Shield,
      accent: 'from-amber-600/30 to-amber-900/10 border-amber-500/30 text-[#d4af37]'
    },
    {
      title: 'FITNESS',
      tamil: 'உடற்பயிற்சி',
      description: 'Improve explosive rotational power, shoulder flexibility, lightning-fast footwork agility, core stamina, and dynamic balance.',
      icon: Zap,
      accent: 'from-red-600/30 to-red-900/10 border-red-500/30 text-red-400'
    },
    {
      title: 'TRADITION',
      tamil: 'பாரம்பரியம்',
      description: 'Preserve authentic ancient Tamil martial sciences: Adimurai, Kaaladi footwork, Varma vital points, and traditional weapon forms.',
      icon: Flame,
      accent: 'from-amber-600/30 to-amber-900/10 border-amber-500/30 text-[#d4af37]'
    },
    {
      title: 'COMPETITION',
      tamil: 'போட்டி வெற்றி',
      description: 'Structured tactical preparation for district, state, national Khelo events, and international stick-fighting championships.',
      icon: Trophy,
      accent: 'from-yellow-600/30 to-yellow-900/10 border-yellow-500/30 text-yellow-400'
    },
    {
      title: 'CONFIDENCE',
      tamil: 'தன்னம்பிக்கை',
      description: 'Instill genuine fearlessness, calm situational awareness, and effective street self-defense capability for boys, girls, and adults.',
      icon: HeartHandshake,
      accent: 'from-red-600/30 to-red-900/10 border-red-500/30 text-red-400'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0b0d13] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#9e121b]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Lineage & Mission</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            Who We Are
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-4" />
          <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed whitespace-pre-line" lang="ta">
            {`பண்டைய தமிழர்களின் வீரக் கலையை மீண்டும் வளர்ப்பதை முக்கிய நோக்கமாகக் கொண்டு முருகையா சிலம்பக் கூடம் தொடங்கப்பட்டது. திருச்சிராப்பள்ளியின் பாரம்பரிய சிலம்பப் பயிற்சி மையமாக, மலைக்கோவில், திருவெறும்பூர் பகுதியில் அமைந்துள்ள எங்கள் கூடத்தில் அனைத்து வயதினருக்கும் பயிற்சி வழங்கப்படுகிறது.

பாரம்பரிய மூங்கில் கம்புச் சிலம்பம், காலடி பயிற்சி (காலடி), ஆயுதப் பயிற்சி, ஆயுதமற்ற தற்காப்புக் கலை (கை சிலம்பம்) மற்றும் போட்டித் தரத்திற்கு ஏற்ற சிலம்பப் பயிற்சிகள் ஆகியவை முறையாக கற்றுத்தரப்படுகின்றன.`}
          </p>
        </div>

        {/* Master & Heritage Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 bg-[#12151e]/80 border border-gray-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
          
          {/* Master Portrait Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#9e121b] via-[#d4af37] to-[#9e121b] rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden bg-[#0a0c10] border border-[#d4af37]/40 aspect-square">
                <img
                  src="/src/assets/images/guru_master_1790999339954.jpeg"
                  alt="Master V. Sujith Kumar - Founder & Chief Master (Silambam Aasaan)"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = '1';
                      target.src = '/guru_master_1790999339954.jpeg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                  {/* Elegant Gold/White Label Above Name */}
                  <div className="inline-block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-200/95 bg-[#9e121b]/80 border border-[#d4af37]/50 px-2 py-0.5 rounded shadow-sm mb-1.5">
                    MASTER
                  </div>

                  {/* Main Prominent Name */}
                  <div className="font-heading text-2xl sm:text-[26px] font-black tracking-tight text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    V. Sujith Kumar
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Master Words & Academy Values */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Malaikovil, Thiruverumbur, Tiruchirappalli</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white leading-snug" lang="ta">
              அறிவியல் பயிற்சியின் மூலம் தமிழரின் வீரக் கலையை மீட்டெடுப்போம்
            </h3>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed" lang="ta">
              சிலம்பம் என்பது வெறும் கம்பைச் சுழற்றும் கலை மட்டும் அல்ல. இது சங்க காலத் தமிழர் வரலாற்றில் வேரூன்றிய ஒரு பாரம்பரிய தற்காப்புக் கலை. முருகையா சிலம்பக் கூடத்தில், பாரம்பரிய குருகுல மரியாதையுடன் நவீன உடற்பயிற்சி மற்றும் விளையாட்டு பயிற்சி முறைகளையும் இணைத்து மாணவர்களுக்கு பயிற்சி அளிக்கிறோம்.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium" lang="ta">5 வயது முதல் குழந்தைகளுக்கான பாதுகாப்பான, வயதுக்கு ஏற்ற பயிற்சி வகுப்புகள்</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium" lang="ta">மாநில அளவில் அங்கீகரிக்கப்பட்ட சிலம்பம் அமைப்புகளுடன் இணைப்பு மற்றும் தரப்படுத்தப்பட்ட பயிற்சி</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium" lang="ta">மூங்கில் சிலம்பம், சுருள் வாள் மற்றும் மடுவு போன்ற பாரம்பரிய ஆயுதப் பயிற்சிகள்</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium" lang="ta">பள்ளி விளையாட்டு ஒதுக்கீடு மற்றும் கேலோ இந்தியா போட்டிகளுக்கான வாய்ப்புகளுக்கு வழிகாட்டுதல்</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border-l-4 border-[#d4af37] text-xs sm:text-sm text-gray-300 italic leading-relaxed" lang="ta">
              &ldquo;எங்கள் கூடத்தில் சிலம்பக் கம்பை கையில் எடுக்கும் ஒவ்வொரு முறையும், வெறும் தாக்குதல் கலையை மட்டும் கற்றுக்கொள்வதில்லை; நம் முன்னோர்களின் வீரத்தையும் மரபையும் மதித்து, அதை அடுத்த தலைமுறைக்கு கொண்டு செல்லும் மனப்பக்குவத்தையும் வளர்த்துக் கொள்கிறோம்.&rdquo;
            </div>
          </div>
        </div>

        {/* 5 Core Pillars Cards */}
        <div className="text-center mb-8">
          <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white tracking-wide">
            The Five Pillars of Our Training
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Every drill, stance, and sparring session reinforces these fundamental martial values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative p-6 rounded-xl bg-[#141822] hover:bg-[#1a202e] border border-gray-800 hover:border-[#d4af37]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-black/60 border border-gray-800 flex items-center justify-center group-hover:border-[#d4af37]/50 transition-colors">
                      <Icon className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-amber-400/80 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="font-heading text-base font-bold text-white tracking-wider mb-1">
                    {pillar.title}
                  </h4>
                  <div className="text-[11px] font-semibold text-[#d4af37] mb-3">
                    {pillar.tamil}
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-800/60 w-full">
                  <div className="h-0.5 w-6 bg-transparent group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#d4af37] group-hover:to-transparent transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
