import React, { useState, useEffect } from 'react';
import { 
  AcademySettings, 
  Student, 
  TrainingSchedule, 
  Achievement, 
  GalleryItem, 
  EventItem, 
  FeePayment, 
  MatchRegistration 
} from './types/index.ts';
import { api } from './services/api.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Programs } from './components/Programs.tsx';
import { Schedule } from './components/Schedule.tsx';
import { Players } from './components/Players.tsx';
import { Achievements } from './components/Achievements.tsx';
import { Gallery } from './components/Gallery.tsx';
import { Events } from './components/Events.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { FeePaymentModal } from './components/FeePaymentModal.tsx';
import { MatchEntryModal } from './components/MatchEntryModal.tsx';
import { JoinModal } from './components/JoinModal.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';
import { ReceiptModal } from './components/ReceiptModal.tsx';

export default function App() {
  // Settings & Data States
  const [settings, setSettings] = useState<AcademySettings>({
    academyName: "MURUGAIYA SILAMBA KOODAM",
    tamilName: "முருகையா சிலம்பக் கூடம்",
    tagline: "Train • Fight • Tradition • Victory",
    subheading: "Where traditional Silambam meets modern discipline, fitness and competitive excellence.",
    aboutStory: "Founded with the sacred aim of revitalizing ancient Tamil martial heritage, Murugaiya Silamba Koodam is Tiruchirappalli's foremost traditional martial arts academy. Situated near the historic Malaikovil in Thiruverumbur, we train students of all ages in traditional bamboo stick combat, footwork (Kaaladi), weapon mastery, unarmed self-defense (Kai Silambam), and international sports Silambam championship standards.",
    phone: "70104 51284",
    whatsapp: "70104 51284",
    email: "iamsujii20122007@gmail.com",
    address: "Malaikovil Ground, Near Malaikovil Murugan Temple, Thiruverumbur",
    city: "Tiruchirappalli",
    landmark: "Opposite BHEL Malaikovil Arch",
    state: "Tamil Nadu",
    pincode: "620013",
    instagramUrl: "https://www.instagram.com/silambam.malaikovil_81?stkn=bjYwZXh0bDJ4cmtz&utm_source=qr",
    youtubeUrl: "https://youtube.com/@murugaiyasilambam",
    monthlyFeeDefault: 400,
    upiId: "iamsujii20122007@oksbi",
    upiName: "Murugaiya Silamba Koodam",
    headCoachName: "V. Sujith Kumar",
    headCoachTitle: "Founder & Chief Master (Silambam Aasaan)",
    foundedYear: "2012"
  });

  const [students, setStudents] = useState<Partial<Student>[]>([]);
  const [schedules, setSchedules] = useState<TrainingSchedule[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  
  // Specific targets
  const [preselectedEvent, setPreselectedEvent] = useState<EventItem | null>(null);
  const [preselectedBatch, setPreselectedBatch] = useState<string>('');

  // Receipt Modal State
  const [receiptData, setReceiptData] = useState<{
    type: 'fee' | 'match';
    fee?: FeePayment;
    match?: MatchRegistration;
  } | null>(null);

  // Initial Fetch
  const fetchData = async () => {
    try {
      const [settingsRes, studentsRes, schedulesRes, achievementsRes, galleryRes, eventsRes] = await Promise.all([
        api.getSettings(),
        api.getPublicStudents(),
        api.getSchedules(),
        api.getAchievements(),
        api.getGallery(),
        api.getEvents()
      ]);

      if (settingsRes?.academyName) setSettings(settingsRes);
      if (studentsRes) setStudents(studentsRes);
      if (schedulesRes) setSchedules(schedulesRes);
      if (achievementsRes) setAchievements(achievementsRes);
      if (galleryRes) setGallery(galleryRes);
      if (eventsRes) setEvents(eventsRes);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenFeeModal = () => {
    setIsFeeModalOpen(true);
  };

  const handleOpenMatchModal = (event?: EventItem) => {
    if (event) setPreselectedEvent(event);
    else setPreselectedEvent(null);
    setIsMatchModalOpen(true);
  };

  const handleOpenJoinModal = (batchTitle?: string) => {
    if (batchTitle) setPreselectedBatch(batchTitle);
    setIsJoinModalOpen(true);
  };

  const handlePaymentSuccess = (fee: FeePayment) => {
    setReceiptData({ type: 'fee', fee });
  };

  const handleMatchRegistrationSuccess = (reg: MatchRegistration) => {
    setReceiptData({ type: 'match', match: reg });
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-[#f5f5f7] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Navbar
        settings={settings}
        onOpenFeeModal={handleOpenFeeModal}
        onOpenMatchModal={() => handleOpenMatchModal()}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenJoinModal={() => handleOpenJoinModal()}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* Full-Screen Hero Section */}
        <Hero
          settings={settings}
          onJoinClick={() => handleOpenJoinModal()}
          onAchievementsClick={() => {
            const el = document.getElementById('achievements');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onMatchClick={() => handleOpenMatchModal()}
        />

        {/* Who We Are (5 Pillars & Master Spotlight) */}
        <About settings={settings} />

        {/* Training Programs (Interactive 6-program grid) */}
        <Programs onJoinBatch={(batchTitle) => handleOpenJoinModal(batchTitle)} />

        {/* Summer Camp Class Batch Information */}
        <Schedule
          schedules={schedules}
          onSelectBatch={(sch) => handleOpenJoinModal(sch.batch)}
        />

        {/* Championship Wall of Honour (Clean Image-Focused Achievements Gallery) */}
        <Achievements achievements={achievements} />

        {/* Participating Competitions (Zonal, District, State, National Tiers) */}
        <Events
          events={events}
          onRegisterEvent={(evt) => handleOpenMatchModal(evt)}
        />

        {/* Photo & Media Archive — public section removed as requested */}
        {/* <Gallery items={gallery} /> */}

        {/* Malaikovil, Thiruverumbur Location & Directions */}
        <LocationSection settings={settings} />

        {/* Contact Form & Direct WhatsApp */}
        <ContactSection settings={settings} />
      </main>

      {/* Premium Dark Footer */}
      <Footer
        settings={settings}
        onOpenMatchModal={() => handleOpenMatchModal()}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenJoinModal={() => handleOpenJoinModal()}
      />

      {/* --- INTERACTIVE MODALS --- */}

      {/* Monthly Fee Payment Modal */}
      <FeePaymentModal
        settings={settings}
        isOpen={isFeeModalOpen}
        onClose={() => setIsFeeModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Tournament Match Registration Modal */}
      <MatchEntryModal
        settings={settings}
        events={events}
        preselectedEvent={preselectedEvent}
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        onRegistrationSuccess={handleMatchRegistrationSuccess}
      />

      {/* Student Enrollment / Join Modal */}
      <JoinModal
        settings={settings}
        schedules={schedules}
        initialBatch={preselectedBatch}
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onOpenFeePayment={handleOpenFeeModal}
      />

      {/* Admin Management Dashboard */}
      <AdminPortal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        settings={settings}
        onSettingsUpdated={(newSet) => setSettings(newSet)}
        onDataChanged={fetchData}
      />

      {/* Downloadable / Printable Official Receipt Modal */}
      {receiptData && (
        <ReceiptModal
          settings={settings}
          data={receiptData}
          onClose={() => setReceiptData(null)}
        />
      )}

    </div>
  );
}
