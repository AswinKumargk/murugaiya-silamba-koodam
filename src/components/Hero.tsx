import React from 'react';
import { 
  ChevronDown, 
  Trophy, 
  ArrowRight, 
  CreditCard, 
  Flame, 
  Award,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { AcademySettings } from '../types/index.ts';

interface HeroProps {
  settings: AcademySettings;
  onJoinClick: () => void;
  onAchievementsClick: () => void;
  onFeeClick?: () => void;
  onMatchClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onJoinClick,
  onAchievementsClick,
  onFeeClick,
  onMatchClick,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Image with Dark Vignette & Martial Red/Gold Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_silambam_1790999305064.jpg"
          alt="Traditional Silambam Stick Fighting Warrior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform animate-in fade-in zoom-in-105 duration-1000"
        />

        {/* Deep Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/80 to-[#08090c]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090c] via-[#08090c]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#08090c_85%)]" />

        {/* Subtle Martial Red Atmosphere on top-left / Gold on bottom-right */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#9e121b]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Floating Traditional Kolam Background Pattern */}
      <div className="absolute inset-0 bg-kolam-pattern opacity-40 pointer-events-none z-0" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Official Academy Logo */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <img
            src="/team%20logo.jpeg"
            alt="Murugaiya Silamba Koodam Official Logo"
            className="w-[95px] sm:w-[110px] md:w-[120px] h-auto object-contain mx-auto rounded-full drop-shadow-[0_0_18px_rgba(212,175,55,0.4)] transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.tried) {
                target.dataset.tried = '1';
                target.src = '/team_logo.jpeg';
              }
            }}
          />
        </div>

        {/* Main Title */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 leading-none uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          <span className="block">{settings.academyName}</span>
        </h1>

        {/* Dynamic Slogan / Creed */}
        <div className="inline-flex items-center justify-center gap-3 sm:gap-6 py-2 px-6 my-2 text-sm sm:text-lg md:text-xl font-bold tracking-widest uppercase border-y border-[#d4af37]/30 bg-black/40 backdrop-blur-sm">
          <span className="text-gray-300 hover:text-white transition-colors">Train</span>
          <span className="text-[#9e121b]">◆</span>
          <span className="text-gray-300 hover:text-white transition-colors">Fight</span>
          <span className="text-[#9e121b]">◆</span>
          <span className="text-gray-300 hover:text-white transition-colors">Tradition</span>
          <span className="text-[#9e121b]">◆</span>
          <span className="text-[#d4af37] hover:text-[#f3cf65] transition-colors">Victory</span>
        </div>

        {/* Supporting Quote */}
        <p className="mt-5 max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed drop-shadow">
          "{settings.subheading}"
        </p>

        {/* Location & Heritage Note */}
        <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-gray-400">
          <span>Malaikovil, Thiruverumbur, Tiruchirappalli, Tamil Nadu</span>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onJoinClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3cf65] via-[#d4af37] to-[#b89025] hover:brightness-110 active:scale-95 rounded-lg shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
          >
            <span>Join Training</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <button
            onClick={onAchievementsClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-[#141822]/90 hover:bg-[#1c2232] border border-[#d4af37]/40 hover:border-[#d4af37] active:scale-95 rounded-lg transition-all shadow-lg"
          >
            <Trophy className="w-4 h-4 text-[#d4af37]" />
            <span>View Achievements</span>
          </button>
        </div>

        {/* Secondary Action Buttons (Tournament Match Entry) */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onMatchClick}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#8b1019] to-[#b31b26] hover:from-[#a0131e] hover:to-[#cb202d] rounded-md transition-all shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Match Entry</span>
          </button>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t border-gray-800/80">
          <div className="text-center p-3 rounded-lg bg-black/40 border border-gray-800/50">
            <div className="font-heading text-2xl sm:text-3xl font-black text-[#d4af37]">14+</div>
            <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-0.5">Years of Lineage</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-black/40 border border-gray-800/50">
            <div className="font-heading text-2xl sm:text-3xl font-black text-white">45+</div>
            <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-0.5">State & National Medals</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-black/40 border border-gray-800/50">
            <div className="font-heading text-2xl sm:text-3xl font-black text-[#d4af37]">500+</div>
            <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-0.5">Warriors Trained</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-black/40 border border-gray-800/50">
            <div className="font-heading text-2xl sm:text-3xl font-black text-[#dc2626]">100%</div>
            <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-0.5">Traditional Art</div>
          </div>
        </div>

        {/* Animated Scroll Down Indicator */}
        <a
          href="#about"
          className="mt-10 inline-flex flex-col items-center gap-1 text-gray-400 hover:text-[#d4af37] transition-colors focus:outline-none"
          aria-label="Scroll down to academy introduction"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold">Explore Academy</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#d4af37]" />
        </a>

      </div>
    </section>
  );
};
