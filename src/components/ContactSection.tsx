import React from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Instagram,
  Youtube,
  MessageCircle
} from 'lucide-react';
import { AcademySettings } from '../types/index.ts';

interface ContactSectionProps {
  settings: AcademySettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const whatsappUrl = `https://wa.me/917010451284?text=${encodeURIComponent("Vanakkam Aasaan, I would like to enroll my child / myself for Silambam training at Murugaiya Silamba Koodam.")}`;

  const channels = [
    {
      id: 'phone',
      label: 'Call Academy Master',
      value: '70104 51284',
      href: 'tel:7010451284',
      icon: Phone,
      iconBg: 'bg-[#9e121b]/20',
      iconColor: 'text-red-400',
      borderHover: 'hover:border-[#d4af37]/40',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Direct',
      value: '70104 51284',
      href: whatsappUrl,
      icon: MessageCircle,
      iconBg: 'bg-emerald-950/40',
      iconColor: 'text-emerald-400',
      borderHover: 'hover:border-emerald-500/40',
      external: true,
    },
    {
      id: 'email',
      label: 'Official Email',
      value: 'iamsujii20122007@gmail.com',
      href: 'mailto:iamsujii20122007@gmail.com',
      icon: Mail,
      iconBg: 'bg-[#d4af37]/10',
      iconColor: 'text-[#d4af37]',
      borderHover: 'hover:border-[#d4af37]/40',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#08090c] relative">
      {/* Subtle background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9e121b]/08 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d4af37]/08 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-md">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Admissions &amp; Inquiries</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            Contact the Academy
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-4" />
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
            Have questions about age eligibility, training batches, weapon syllabus, or tournament registration? Reach out directly.
          </p>
        </div>

        {/* ── DIRECT CONTACT CHANNELS ── */}
        <div className="rounded-2xl bg-[#11141e] border border-gray-800 shadow-2xl overflow-hidden mb-8">

          {/* Card header bar */}
          <div className="bg-gradient-to-r from-[#9e121b] via-[#b51722] to-[#9e121b] px-6 py-3 border-b border-[#d4af37]/20">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-200">
              <MapPin className="w-4 h-4" />
              <span>Direct Contact Channels</span>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-4">
            {channels.map(({ id, label, value, href, icon: Icon, iconBg, iconColor, borderHover, external }) => (
              <a
                key={id}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-black/40 hover:bg-[#161a26] border border-gray-800 ${borderHover} transition-all duration-200 group`}
              >
                <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-gray-400 uppercase font-bold tracking-wider mb-0.5">
                    {label}
                  </div>
                  <div className="font-bold text-white text-base sm:text-lg truncate">
                    {value}
                  </div>
                </div>
                <div className="ml-auto shrink-0 w-2 h-2 rounded-full bg-[#d4af37]/40 group-hover:bg-[#d4af37] transition-colors" />
              </a>
            ))}
          </div>

          {/* ── FOLLOW US ONLINE ── */}
          <div className="px-6 sm:px-10 pb-8 border-t border-gray-800 pt-6">
            <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Follow Us Online
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.instagram.com/silambam.malaikovil_81?stkn=bjYwZXh0bDJ4cmtz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#141822] hover:bg-[#1e2332] border border-gray-800 hover:border-pink-500/40 text-sm font-semibold text-gray-300 hover:text-white transition-all duration-200 group"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>@silambam.malaikovil_81</span>
              </a>

              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#141822] hover:bg-[#1e2332] border border-gray-800 hover:border-red-500/40 text-sm font-semibold text-gray-300 hover:text-white transition-all duration-200 group"
              >
                <Youtube className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

        </div>

        {/* ── LOCATION QUICK-INFO ── */}
        <div className="flex items-start gap-3 p-5 rounded-xl bg-[#11141e]/80 border border-gray-800 text-sm text-gray-400">
          <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-200">Malaikovil Ground,</span>{' '}
            Near Malaikovil Murugan Temple, Thiruverumbur — Tiruchirappalli 620013
            &nbsp;·&nbsp;
            <span className="text-gray-500 text-xs">Opposite BHEL Malaikovil Arch</span>
          </div>
        </div>

      </div>
    </section>
  );
};
