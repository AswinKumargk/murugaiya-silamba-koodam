import React, { useState, useEffect, useCallback } from 'react';
import { 
  Trophy, 
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Achievement } from '../types/index.ts';

interface AchievementsProps {
  achievements?: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements: propAchievements }) => {
  // Built-in official records for the 12 championship photos (8 original + 4 new)
  const OFFICIAL_8_ACHIEVEMENTS: Achievement[] = [
    {
      id: "ach-1",
      title: "Overall Academy Championship Cup",
      competitionName: "Tamil Nadu State Silambam Championship 2026",
      year: 2026,
      location: "Jawaharlal Nehru Stadium, Chennai",
      level: "State",
      category: "Academy Team Trophy",
      medal: "Trophy",
      playerName: "Murugaiya Silamba Koodam Squad",
      photoUrl: "/i1.jpeg"
    },
    {
      id: "ach-2",
      title: "Gold Medal - Senior Staff Combat",
      competitionName: "National Traditional Martial Arts Championship 2025",
      year: 2025,
      location: "Kochi, Kerala",
      level: "National",
      category: "Individual Combat",
      medal: "Gold",
      playerName: "M. Tharun Prasath",
      photoUrl: "/i2.jpeg"
    },
    {
      id: "ach-3",
      title: "Gold Medal - Sub-Junior Speed Rotation",
      competitionName: "Trichy District Silambam Championship 2025",
      year: 2025,
      location: "Anna Stadium, Tiruchirappalli",
      level: "District",
      category: "Speed & Form Mastery",
      medal: "Gold",
      playerName: "S. Ananya Devi",
      photoUrl: "/i3.jpeg"
    },
    {
      id: "ach-4",
      title: "International Invitational Gold - Weapon Kata",
      competitionName: "South Asian Traditional Weapons Invitational 2024",
      year: 2024,
      location: "Kuala Lumpur, Malaysia",
      level: "International",
      category: "Flexible Sword (Surul Vaal)",
      medal: "Gold",
      playerName: "V. Kavin Kumar",
      photoUrl: "/i4.jpeg"
    },
    {
      id: "ach-5",
      title: "Silver Medal - Junior Boys Dual Weapon",
      competitionName: "All India Khelo Traditional Games 2024",
      year: 2024,
      location: "Bengaluru, Karnataka",
      level: "National",
      category: "Deer Horn Weapon (Maduvu)",
      medal: "Silver",
      playerName: "R. Vignesh",
      photoUrl: "/i5.jpeg"
    },
    {
      id: "ach-6",
      title: "District Champions Trophy",
      competitionName: "Tiruchirappalli District Open Silambam Tournament",
      year: 2023,
      location: "Thiruverumbur, Trichy",
      level: "District",
      category: "Team Overall",
      medal: "Trophy",
      playerName: "Murugaiya Silamba Koodam Cadets",
      photoUrl: "/i6.jpeg"
    },
    {
      id: "ach-7",
      title: "State Level Silambam Championship Honour",
      competitionName: "Tamil Nadu State Traditional Silambam Meet",
      year: 2025,
      location: "Anna Stadium, Tiruchirappalli",
      level: "State",
      category: "Traditional Staff Forms",
      medal: "Gold",
      playerName: "Murugaiya Silamba Koodam Cadets",
      photoUrl: "/i7.jpeg"
    },
    {
      id: "ach-8",
      title: "Championship Trophy & Medal of Honour",
      competitionName: "All India Martial Arts Championship",
      year: 2024,
      location: "Chennai, Tamil Nadu",
      level: "National",
      category: "Weapon Combat & Defense",
      medal: "Trophy",
      playerName: "Murugaiya Silamba Koodam Squad",
      photoUrl: "/i8.jpeg"
    },
    {
      id: "ach-9",
      title: "Achievement Photo",
      competitionName: "Murugaiya Silamba Koodam",
      year: 2025,
      location: "Tiruchirappalli",
      level: "Academy",
      category: "Championship",
      medal: "Trophy",
      playerName: "Murugaiya Silamba Koodam",
      photoUrl: "/i10.jpeg"
    },
    {
      id: "ach-10",
      title: "Achievement Photo",
      competitionName: "Murugaiya Silamba Koodam",
      year: 2025,
      location: "Tiruchirappalli",
      level: "Academy",
      category: "Championship",
      medal: "Trophy",
      playerName: "Murugaiya Silamba Koodam",
      photoUrl: "/i11.jpeg"
    },
    {
      id: "ach-11",
      title: "Achievement Photo",
      competitionName: "Murugaiya Silamba Koodam",
      year: 2025,
      location: "Tiruchirappalli",
      level: "Academy",
      category: "Championship",
      medal: "Trophy",
      playerName: "Murugaiya Silamba Koodam",
      photoUrl: "/i12.jpeg"
    },
    {
      id: "ach-12",
      title: "Achievement Photo",
      competitionName: "Murugaiya Silamba Koodam",
      year: 2025,
      location: "Tiruchirappalli",
      level: "Academy",
      category: "Championship",
      medal: "Trophy",
      playerName: "Murugaiya Silamba Koodam",
      photoUrl: "/i13.jpeg"
    }
  ];

  // Merge database records with built-in achievement records dynamically.
  // IMPORTANT: Always use the fallback photoUrl (verified /iX.jpeg public paths),
  // because the database may store stale/invalid paths like /src/assets/images/iX.jpeg.
  const displayAchievements: Achievement[] = (propAchievements && propAchievements.length > 0)
    ? OFFICIAL_8_ACHIEVEMENTS.map((fallbackItem, idx) => {
        const found = propAchievements[idx];
        if (found) {
          return {
            ...fallbackItem,
            ...found,
            // Always keep the built-in correct public path — never trust the DB photoUrl
            photoUrl: fallbackItem.photoUrl
          };
        }
        return fallbackItem;
      })
    : OFFICIAL_8_ACHIEVEMENTS;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const activeAchievement = lightboxIndex !== null ? displayAchievements[lightboxIndex] : null;

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? displayAchievements.length - 1 : prev - 1;
    });
  }, [displayAchievements.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === displayAchievements.length - 1 ? 0 : prev + 1;
    });
  }, [displayAchievements.length]);

  const handleClose = () => {
    setLightboxIndex(null);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
  };

  return (
    <section id="achievements" className="py-24 bg-[#090b10] relative overflow-hidden">
      {/* Background martial aura glows */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-[#9e121b]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-[#f3cf65] bg-[#d4af37]/15 border border-[#d4af37]/35 rounded-full shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Championship Wall of Honour</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            ACHIEVEMENTS
          </h2>

          {/* Photos and Medals subtitle */}
          <p
            className="mt-2 text-sm sm:text-base font-light tracking-[0.18em] text-center"
            style={{
              color: '#d4af37',
              opacity: 0.75,
              fontFamily: "'Outfit', 'Inter', sans-serif",
              letterSpacing: '0.18em'
            }}
          >
            (Photos and Medals)
          </p>

          {/* Traditional Silambam Movement Inspired Gold Divider */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <div className="w-2.5 h-2.5 rotate-45 border border-[#d4af37] bg-[#9e121b]" />
            <div className="w-8 h-0.5 bg-[#d4af37]" />
            <div className="w-2.5 h-2.5 rotate-45 border border-[#d4af37] bg-[#9e121b]" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <p className="text-gray-300 text-base sm:text-lg font-light italic leading-relaxed">
            &ldquo;Moments of discipline, dedication and victory.&rdquo;
          </p>
        </div>

        {/* Clean, Image-Focused Championship Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {displayAchievements.map((item, index) => {
            return (
              <div
                key={item.id || index}
                onClick={() => setLightboxIndex(index)}
                className="break-inside-avoid group relative rounded-2xl bg-[#11141e] border border-[#d4af37]/40 hover:border-[#d4af37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.35)] overflow-hidden cursor-pointer"
              >
                {/* Pristine Photograph Container with Natural Proportions */}
                <div className="relative overflow-hidden bg-black/60">
                  <img
                    src={item.photoUrl}
                    alt={`Achievement Photo ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Suppress further error events to avoid infinite retry loop
                      e.currentTarget.onerror = null;
                    }}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />

                  {/* Clean subtle hover indicator icon without text */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="p-3 rounded-full bg-black/60 backdrop-blur-sm border border-[#d4af37]/60 text-[#f3cf65] transform scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {activeAchievement && lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200 select-none"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center justify-center bg-[#0d0f17] border border-[#d4af37]/50 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full px-5 py-3.5 bg-[#121520] border-b border-gray-800 flex items-center justify-between z-20">
              {/* Counter Indicator: e.g. 1 / 8 */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/60 border border-[#d4af37]/40 text-xs font-mono font-bold text-[#f3cf65]">
                  {lightboxIndex + 1} / {displayAchievements.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-white bg-gray-900/80 hover:bg-gray-800 rounded-full border border-gray-700 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Stage with Large Image & Prev/Next Controls */}
            <div className="relative w-full flex-1 flex items-center justify-center bg-black/95 p-3 sm:p-6 overflow-hidden min-h-[300px]">
              {/* Prev Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-3 sm:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-[#d4af37] text-white hover:text-black border border-gray-700 hover:border-transparent transition-all shadow-xl backdrop-blur-sm"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* High-Resolution Photograph Display */}
              <img
                src={activeAchievement.photoUrl}
                alt={`Achievement Photo ${lightboxIndex + 1}`}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
              />

              {/* Next Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-3 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-[#d4af37] text-white hover:text-black border border-gray-700 hover:border-transparent transition-all shadow-xl backdrop-blur-sm"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
