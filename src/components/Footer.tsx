import React from 'react';
import { 
  Instagram, 
  Youtube, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Trophy, 
  CreditCard,
  Lock,
  ArrowUp
} from 'lucide-react';
import { AcademySettings } from '../types/index.ts';

interface FooterProps {
  settings: AcademySettings;
  onOpenFeeModal?: () => void;
  onOpenMatchModal: () => void;
  onOpenAdminModal: () => void;
  onOpenJoinModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenFeeModal,
  onOpenMatchModal,
  onOpenAdminModal,
  onOpenJoinModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/917010451284?text=${encodeURIComponent("Vanakkam! Inquiring from Murugaiya Silamba Koodam website.")}`;

  return (
    <footer className="bg-[#050608] text-gray-400 text-xs border-t border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-900">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/team%20logo.jpeg"
                alt="Murugaiya Silamba Koodam Logo"
                className="w-12 h-12 object-contain rounded-full drop-shadow-[0_0_10px_rgba(212,175,55,0.4)] shrink-0"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.tried) {
                    target.dataset.tried = '1';
                    target.src = '/team_logo.jpeg';
                  }
                }}
              />
              <div>
                <h3 className="font-heading text-lg font-black text-white uppercase tracking-wider">
                  {settings.academyName}
                </h3>
                <div className="text-[11px] font-semibold text-[#d4af37] tracking-widest">
                  {settings.tamilName}
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Traditional Silambam Training Academy located at Malaikovil, Thiruverumbur, Tiruchirappalli. Dedicated to empowering youth with physical power, mental discipline, cultural honor, and national victory.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/silambam.malaikovil_81?stkn=bjYwZXh0bDJ4cmtz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#11141d] hover:bg-[#1a202e] border border-gray-800 flex items-center justify-center text-gray-300 hover:text-pink-400 transition-colors"
                title="Instagram — @silambam.malaikovil_81"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#11141d] hover:bg-[#1a202e] border border-gray-800 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#11141d] hover:bg-[#1a202e] border border-gray-800 flex items-center justify-center text-gray-300 hover:text-emerald-400 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              Quick Navigation
            </div>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-[#d4af37] transition-colors">About Academy</a></li>
              <li><a href="#programs" className="hover:text-[#d4af37] transition-colors">Training Programs</a></li>
              <li><a href="#schedule" className="hover:text-[#d4af37] transition-colors">Summer Camp Class</a></li>
              <li><a href="#achievements" className="hover:text-[#d4af37] transition-colors">Achievements</a></li>
              <li><a href="#competitions" className="hover:text-[#d4af37] transition-colors">Participating Competitions</a></li>
            </ul>
          </div>

          {/* Student & Tournament Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              Student Portals
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenMatchModal} className="hover:text-[#d4af37] text-left transition-colors">
                  Tournament Match Entry
                </button>
              </li>
              <li>
                <button onClick={onOpenJoinModal} className="hover:text-[#d4af37] text-left transition-colors">
                  Join Training
                </button>
              </li>
              <li><a href="#competitions" className="hover:text-[#d4af37] transition-colors">Competition Tiers</a></li>
              <li><a href="#location" className="hover:text-[#d4af37] transition-colors">Directions & Timings</a></li>
            </ul>
          </div>

          {/* Address & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              Academy Dojo
            </div>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Malaikovil, Thiruverumbur, Tiruchirappalli, Tamil Nadu - 620013</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:7010451284" className="hover:text-emerald-400 transition-colors">70104 51284</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="mailto:iamsujii20122007@gmail.com" className="truncate hover:text-[#d4af37] transition-colors">iamsujii20122007@gmail.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-center sm:text-left">
            © 2026 MURUGAIYA SILAMBA KOODAM. All Rights Reserved. Traditional Tamil Martial Arts Heritage.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdminModal}
              className="flex items-center gap-1.5 text-gray-400 hover:text-[#d4af37] transition-colors text-[11px]"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#11141e] hover:bg-[#1a202e] text-gray-400 hover:text-white transition-colors"
              title="Back to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
