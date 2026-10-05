import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { GalleryItem } from '../types/index.ts';

interface GalleryProps {
  items: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const categories = [
    'ALL', 
    'Training', 
    'Competitions', 
    'Prize Distribution', 
    'Events', 
    'Team', 
    'Training Camps'
  ];

  const filtered = selectedCategory === 'ALL'
    ? items
    : items.filter(item => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filtered]);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
    setIsZoomed(false);
  };

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filtered.length);
    setIsZoomed(false);
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filtered.length) % filtered.length);
    setIsZoomed(false);
  };

  return (
    <section id="gallery" className="py-24 bg-[#08090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-md">
            <Camera className="w-3.5 h-3.5" />
            <span>Cinematic Visual Archive</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            Photo & Media Gallery
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-4" />
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
            Capturing the lightning strikes, golden triumphs, and sacred training traditions at Malaikovil grounds.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 scale-105'
                  : 'bg-[#131620] text-gray-300 hover:text-white border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid (Responsive Masonry/Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer bg-black border border-gray-800 hover:border-[#d4af37]/60 transition-all duration-300 shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt={item.caption}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85 group-hover:opacity-100"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-gray-700 text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                  {item.category}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/60 backdrop-blur-md text-white">
                <Maximize2 className="w-4 h-4 text-[#d4af37]" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <div className="text-xs text-[#f3cf65] font-semibold">{item.album}</div>
                <h3 className="font-heading text-sm font-bold text-white leading-snug drop-shadow-md">
                  {item.caption}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-[#11141d] rounded-2xl border border-gray-800">
            <Camera className="w-10 h-10 text-gray-600 mx-auto mb-2" />
            <div className="text-gray-400 text-sm">No media available in this category yet.</div>
          </div>
        )}

      </div>

      {/* Full-Screen Lightbox Modal */}
      {activeLightboxIndex !== null && filtered[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
          
          {/* Top Controls Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 bg-black/60 px-3 py-1.5 rounded-full border border-gray-800">
              <span className="text-[#d4af37]">{filtered[activeLightboxIndex].category}</span>
              <span>·</span>
              <span>{activeLightboxIndex + 1} of {filtered.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 rounded-full bg-black/70 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5 text-[#d4af37]" />}
              </button>

              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-black/70 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 hover:bg-[#d4af37] text-white hover:text-black transition-all border border-gray-800 hover:border-[#d4af37]"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 hover:bg-[#d4af37] text-white hover:text-black transition-all border border-gray-800 hover:border-[#d4af37]"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Media Display */}
          <div className="relative max-w-5xl max-h-[82vh] flex items-center justify-center overflow-auto">
            <img
              src={filtered[activeLightboxIndex].imageUrl}
              alt={filtered[activeLightboxIndex].caption}
              referrerPolicy="no-referrer"
              className={`max-w-full max-h-[80vh] object-contain rounded-lg transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-grab' : 'scale-100'
              }`}
            />
          </div>

          {/* Bottom Caption Banner */}
          <div className="absolute bottom-4 left-4 right-4 z-20 max-w-xl mx-auto text-center bg-black/80 backdrop-blur-md border border-gray-800 p-3 rounded-xl">
            <div className="text-xs font-bold text-[#d4af37] uppercase">
              {filtered[activeLightboxIndex].album}
            </div>
            <div className="text-sm font-medium text-white mt-0.5">
              {filtered[activeLightboxIndex].caption}
            </div>
          </div>

        </div>
      )}
    </section>
  );
};
