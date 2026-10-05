import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { AcademySettings } from '../types/index.ts';

interface NavbarProps {
  settings: AcademySettings;
  onOpenFeeModal?: () => void;
  onOpenMatchModal: () => void;
  onOpenAdminModal: () => void;
  onOpenJoinModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  // Props kept for compatibility — not removed from interface
  onOpenMatchModal: _onOpenMatchModal,
  onOpenAdminModal: _onOpenAdminModal,
  onOpenJoinModal: _onOpenJoinModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gallery removed from public nav. Match Entry removed from public nav.
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Training Programs', href: '#programs' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Participating Competitions', href: '#competitions' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' }
  ];

  // JOIN NOW → scroll to Contact section
  const handleJoinNow = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090c]/95 backdrop-blur-md border-b border-[#d4af37]/20 shadow-2xl py-2.5'
          : 'bg-gradient-to-b from-[#08090c]/90 via-[#08090c]/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <img
              src="/team%20logo.jpeg"
              alt="Murugaiya Silamba Koodam Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] transition-transform group-hover:scale-105 duration-300 shrink-0"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.tried) {
                  target.dataset.tried = '1';
                  target.src = '/team_logo.jpeg';
                }
              }}
            />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-white group-hover:text-[#f3cf65] transition-colors leading-tight">
                {settings.academyName}
              </span>
              <span className="text-[11px] font-medium text-[#d4af37] tracking-widest uppercase">
                {settings.tamilName} · Tiruchirappalli
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-gray-300">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-[#d4af37] transition-colors relative py-1 focus:outline-none"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop: JOIN NOW only — no Match Entry, no Lock icon */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={handleJoinNow}
              className="px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3cf65] via-[#d4af37] to-[#b89025] hover:brightness-110 rounded-md transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              Join Now
            </button>
          </div>

          {/* Mobile: JOIN NOW + hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={handleJoinNow}
              className="px-3 py-1 text-xs font-bold text-black bg-[#d4af37] rounded"
            >
              Join Now
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-md focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#d4af37]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0c10]/98 border-b border-[#d4af37]/30 px-5 pt-4 pb-6 space-y-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">

          {/* Navigation Links — Gallery & Match Entry removed */}
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-gray-300 hover:text-[#d4af37] hover:bg-gray-900/60 rounded-md transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* JOIN NOW CTA in mobile drawer */}
          <div className="pt-2 border-t border-gray-800/80">
            <button
              onClick={handleJoinNow}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-[#f3cf65] via-[#d4af37] to-[#b89025] rounded-lg text-xs font-bold uppercase tracking-wider text-black shadow-sm"
            >
              Join Now — Contact Us
            </button>
          </div>

          {/* Direct phone quick-link */}
          <div className="pt-1 border-t border-gray-800/80 text-xs text-gray-400">
            <a
              href="tel:7010451284"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>70104 51284</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
