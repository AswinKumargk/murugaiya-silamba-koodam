import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  MessageCircle, 
  Compass, 
  Landmark, 
  Sparkles 
} from 'lucide-react';
import { AcademySettings } from '../types/index.ts';

interface LocationSectionProps {
  settings: AcademySettings;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ settings }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Malaikovil Thiruverumbur Tiruchirappalli Tamil Nadu")}`;
  const whatsappUrl = `https://wa.me/917010451284?text=${encodeURIComponent("Vanakkam! I would like to inquire about Silambam training at Murugaiya Silamba Koodam, Malaikovil.")}`;

  return (
    <section id="location" className="py-24 bg-[#090b10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-md">
            <Landmark className="w-3.5 h-3.5" />
            <span>Sacred Training Grounds</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            Our Location
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-4" />
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
            Training at the serene, spiritually resonant grounds of historic Malaikovil rock hill, Thiruverumbur, Tiruchirappalli.
          </p>
        </div>

        {/* Location Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#11141e] border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Left Details Column */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#9e121b]/20 border border-red-500/30 text-xs font-bold text-red-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Thiruverumbur Taluk · Trichy District</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {settings.academyName}
              </h3>
              
              <div className="text-sm text-[#d4af37] font-semibold">
                {settings.tamilName} · திருவெறும்பூர் மலைக்கோவில்
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-gray-800 space-y-2 text-xs sm:text-sm text-gray-300">
                <p className="font-medium text-white">
                  {settings.address}
                </p>
                <p className="text-gray-400">
                  Landmark: {settings.landmark}
                </p>
                <p className="text-gray-400">
                  {settings.city}, {settings.state} - {settings.pincode}
                </p>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span><strong>Weekend Batches:</strong> Saturday &amp; Sunday</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Timing:</strong> 4:30 PM – 6:30 PM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="tel:7010451284" className="hover:text-emerald-400 transition-colors">
                    <strong>Academy Hotline:</strong> 70104 51284
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Map & WhatsApp Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-800">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3cf65] to-[#d4af37] hover:brightness-110 rounded-xl shadow-lg shadow-[#d4af37]/20 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions (Google Maps)</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#128c7e] hover:bg-[#075e54] rounded-xl shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Custom Map Visual Card */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[300px] border border-gray-800 bg-[#0d0f16]">
            
            {/* Embedded Interactive Google Map Iframe for Trichy Malaikovil */}
            <iframe
              title="Murugaiya Silamba Koodam Location Malaikovil Trichy"
              src="https://maps.google.com/maps?q=Malaikovil+Thiruverumbur+Tiruchirappalli&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[340px] border-0 grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Overlay Badge on Map */}
            <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-[#d4af37]/40 shadow-xl max-w-xs pointer-events-none">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                Official Dojo Ground
              </div>
              <div className="text-xs font-bold text-white mt-0.5">
                Malaikovil, Thiruverumbur
              </div>
              <div className="text-[10px] text-gray-400 mt-1">
                Near historic rock temple · Spacious open-air martial arena
              </div>
            </div>

            <div className="absolute bottom-4 right-4 pointer-events-auto">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-[11px] font-bold text-[#d4af37] border border-[#d4af37]/40 backdrop-blur-sm flex items-center gap-1.5 shadow-md"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Open Full Map</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
