import React from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  Shield, 
  Swords, 
  Sparkles,
  Flame
} from 'lucide-react';
import { EventItem } from '../types/index.ts';

interface EventsProps {
  events?: EventItem[];
  onRegisterEvent?: (event: EventItem) => void;
}

export const Events: React.FC<EventsProps> = () => {
  const competitions = [
    {
      id: 'zonal',
      tier: 'Level 01',
      title: 'ZONAL',
      tamil: 'மண்டலப் போட்டி',
      icon: Shield,
      accent: 'from-amber-500/20 to-transparent',
      borderColor: 'border-[#d4af37]/40 hover:border-[#d4af37]',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      description: 'மண்டல அளவிலான சிலம்பம் போட்டிகளில் அருகிலுள்ள பள்ளிகள், சிலம்பப் பயிற்சி நிலையங்கள் மற்றும் நிறுவனங்களைச் சேர்ந்த திறமையான வீரர்களுடன் போட்டியிடும் வாய்ப்பு மாணவர்களுக்கு கிடைக்கிறது. இதன் மூலம் போட்டி அனுபவம், தன்னம்பிக்கை மற்றும் அடுத்த கட்ட போட்டிகளுக்கான திறன் ஆகியவற்றை மாணவர்கள் வளர்த்துக் கொள்ள முடியும்.'
    },
    {
      id: 'district',
      tier: 'Level 02',
      title: 'DISTRICT MATCH',
      tamil: 'மாவட்ட அளவிலான போட்டி',
      icon: Swords,
      accent: 'from-orange-500/20 to-transparent',
      borderColor: 'border-[#d4af37]/40 hover:border-[#d4af37]',
      badgeColor: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
      description: 'மாவட்ட அளவிலான சிலம்பம் போட்டிகளில் மாவட்டத்தின் பல பகுதிகளில் இருந்து வரும் வீரர்கள் கலந்து கொள்கிறார்கள். இதன் மூலம் மாணவர்கள் தங்கள் திறமையை போட்டி சூழலில் வெளிப்படுத்தி, ஒழுக்கம், வேகம், நுட்பம் மற்றும் போட்டி அனுபவத்தை மேம்படுத்திக் கொள்ள முடியும்.'
    },
    {
      id: 'state',
      tier: 'Level 03',
      title: 'STATE',
      tamil: 'மாநில அளவிலான சாம்பியன்ஷிப்',
      icon: Medal,
      accent: 'from-[#9e121b]/30 to-transparent',
      borderColor: 'border-[#d4af37]/50 hover:border-[#d4af37]',
      badgeColor: 'bg-[#9e121b]/20 text-red-200 border-[#9e121b]/40',
      description: 'மாநில அளவிலான சிலம்பம் போட்டிகள் தமிழ்நாட்டின் பல பகுதிகளில் இருந்து வரும் திறமையான வீரர்களுடன் போட்டியிடும் வாய்ப்பை வழங்குகின்றன. இத்தகைய போட்டிகள் மூலம் மாணவர்கள் தங்கள் பயிற்சி, நுட்பம் மற்றும் போட்டித் திறனை உயர்ந்த நிலைக்கு கொண்டு செல்ல முடியும்.'
    },
    {
      id: 'national',
      tier: 'Level 04 · Pinnacle',
      title: 'NATIONAL',
      tamil: 'தேசிய அளவிலான சாம்பியன்ஷிப்',
      icon: Trophy,
      accent: 'from-[#d4af37]/30 to-transparent',
      borderColor: 'border-[#d4af37]/60 hover:border-[#f3cf65]',
      badgeColor: 'bg-[#d4af37]/20 text-[#f3cf65] border-[#d4af37]/40',
      description: 'தேசிய அளவிலான சிலம்பம் போட்டிகளில் இந்தியாவின் பல்வேறு மாநிலங்களில் இருந்து திறமையான வீரர்கள் கலந்து கொள்கிறார்கள். இந்த நிலையில் பங்கேற்பது தொடர்ந்து பயிற்சி, ஒழுக்கம், அர்ப்பணிப்பு மற்றும் சிறந்த போட்டித் திறனை வெளிப்படுத்தும் ஒரு முக்கிய வாய்ப்பாகும்.'
    }
  ];

  return (
    <section id="competitions" className="py-24 bg-[#0a0c12] relative overflow-hidden">
      {/* Background martial aura glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#9e121b]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Anchor for backward compatibility with #events */}
      <div id="events" className="absolute -top-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-[#f3cf65] bg-[#d4af37]/15 border border-[#d4af37]/35 rounded-full shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Tournament Arenas</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            PARTICIPATING COMPETITIONS
          </h2>

          {/* Traditional Silambam Movement Divider */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <div className="w-2.5 h-2.5 rotate-45 border border-[#d4af37] bg-[#9e121b]" />
            <div className="w-8 h-0.5 bg-[#d4af37]" />
            <div className="w-2.5 h-2.5 rotate-45 border border-[#d4af37] bg-[#9e121b]" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
            From zonal-level competition to national championships, our athletes continue to train, compete and grow.
          </p>
        </div>

        {/* 4 Clean, Premium Competition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {competitions.map((comp) => {
            const Icon = comp.icon;

            return (
              <div
                key={comp.id}
                className={`relative rounded-3xl bg-gradient-to-b from-[#131622] to-[#0c0e15] border ${comp.borderColor} p-6 sm:p-7 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] transition-all duration-300 group hover:-translate-y-1.5`}
              >
                {/* Top Subtle Aura Glow */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${comp.accent} rounded-t-3xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />

                <div className="relative z-10">
                  {/* Tier & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${comp.badgeColor}`}>
                      {comp.tier}
                    </span>
                    <div className="p-2.5 rounded-xl bg-black/60 border border-gray-800 text-[#f3cf65] group-hover:scale-110 group-hover:text-amber-300 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Competition Title */}
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-[#f3cf65] transition-colors leading-tight">
                    {comp.title}
                  </h3>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1 mb-4">
                    {comp.tamil}
                  </div>

                  {/* Informational Description */}
                  <p className="text-gray-300 text-xs sm:text-[13px] font-light leading-relaxed" style={{ fontFamily: "'Noto Sans Tamil', 'Latha', sans-serif" }}>
                    {comp.description}
                  </p>
                </div>

                {/* Subtle Silambam Bottom Detail */}
                <div className="relative z-10 mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-[#d4af37]/80 font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#9e121b]" />
                    <span>Arena Excellence</span>
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
