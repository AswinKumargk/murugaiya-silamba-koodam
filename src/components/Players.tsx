import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  ShieldCheck, 
  Swords, 
  Calendar, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Student } from '../types/index.ts';

interface PlayersProps {
  students: Partial<Student>[];
}

export const Players: React.FC<PlayersProps> = ({ students }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Sub-Junior', 'Junior', 'Senior'];

  const filtered = selectedCategory === 'ALL'
    ? students
    : students.filter(s => s.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="players" className="py-24 bg-[#08090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-md">
            <Users className="w-3.5 h-3.5" />
            <span>Honour Roll & Squad</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            Our Silambam Athletes
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-4" />
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
            Meet the dedicated warriors representing Murugaiya Silamba Koodam in district, state, and national arenas.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#f3cf65] to-[#d4af37] text-black shadow-md shadow-[#d4af37]/20 font-extrabold'
                  : 'bg-[#141822] text-gray-300 hover:text-white border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Athletes Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((player) => (
            <div
              key={player.id || player.studentId}
              className="group relative rounded-2xl bg-[#11141d] hover:bg-[#161a26] border border-gray-800 hover:border-[#d4af37]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
            >
              {/* Photo Area with Gradient Header */}
              <div className="relative aspect-[4/4.5] overflow-hidden bg-black/90">
                <img
                  src={player.photoUrl || '/src/assets/images/hero_silambam_1790999305064.jpg'}
                  alt={player.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                
                {/* Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11141d] via-transparent to-black/30" />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-gray-700 text-[10px] font-mono text-gray-300">
                    {player.studentId}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-0.5 rounded bg-[#9e121b]/90 border border-red-500/50 text-[10px] font-bold uppercase text-white shadow-sm">
                    {player.category}
                  </span>
                </div>

                {/* Player Name at bottom of image */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-heading text-lg font-black text-white group-hover:text-[#f3cf65] transition-colors leading-tight">
                    {player.fullName}
                  </h3>
                  <div className="text-xs text-[#d4af37] font-medium mt-0.5">
                    {player.batchName || 'Academy Athlete'}
                  </div>
                </div>
              </div>

              {/* Player Stats & Weapon */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-xs text-gray-300">
                  {player.weaponSpecialty && (
                    <div className="flex items-center gap-2">
                      <Swords className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                      <span className="truncate text-gray-300">
                        <strong className="text-gray-400 font-normal">Specialty:</strong> {player.weaponSpecialty}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      <strong className="text-gray-400 font-normal">Tournament Medals:</strong> {player.achievementsCount || 0} Won
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span>Trained since {player.joiningDate ? new Date(player.joiningDate).getFullYear() : '2023'}</span>
                  </div>
                </div>

                {/* Recent Accolades Chips */}
                {player.competitionHistory && player.competitionHistory.length > 0 && (
                  <div className="pt-2 border-t border-gray-800/80">
                    <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Recent Honors</div>
                    <div className="space-y-1">
                      {player.competitionHistory.slice(0, 2).map((item, i) => (
                        <div key={i} className="text-[11px] text-gray-300 truncate flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Note on data privacy */}
        <div className="mt-8 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Student privacy protected: personal contact and parent information are strictly restricted to admin access.</span>
        </div>

      </div>
    </section>
  );
};
