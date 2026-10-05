import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  LogOut, 
  Users, 
  Calendar, 
  Trophy, 
  Image, 
  Flag, 
  CreditCard, 
  FileCheck, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Save, 
  Download, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { 
  AcademySettings, 
  Student, 
  TrainingSchedule, 
  Achievement, 
  GalleryItem, 
  EventItem, 
  FeePayment, 
  MatchRegistration 
} from '../types/index.ts';
import { api, getAdminToken, clearAdminToken } from '../services/api.ts';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AcademySettings;
  onSettingsUpdated: (newSettings: AcademySettings) => void;
  onDataChanged: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsUpdated,
  onDataChanged,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('admin');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'students' | 'schedules' | 'achievements' | 'gallery' | 'events' | 'fees' | 'matches' | 'settings'
  >('overview');

  // Stats
  const [stats, setStats] = useState<any>(null);

  // Entities
  const [students, setStudents] = useState<Student[]>([]);
  const [schedules, setSchedules] = useState<TrainingSchedule[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [fees, setFees] = useState<FeePayment[]>([]);
  const [matchRegistrations, setMatchRegistrations] = useState<MatchRegistration[]>([]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');

  // Editable settings copy
  const [editableSettings, setEditableSettings] = useState<AcademySettings>(settings);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // New / Edit entity modal states
  const [editingStudent, setEditingStudent] = useState<Partial<Student> | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<Partial<TrainingSchedule> | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Partial<Achievement> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<EventItem> | null>(null);
  const [newGalleryItem, setNewGalleryItem] = useState<Partial<GalleryItem> | null>(null);
  const [newFeeRecord, setNewFeeRecord] = useState<Partial<FeePayment> | null>(null);

  // Check auth on open
  useEffect(() => {
    if (isOpen) {
      const token = getAdminToken();
      if (token) {
        setIsAuthenticated(true);
        loadAllData();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setEditableSettings(settings);
  }, [settings]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await api.login(password, username);
      if (res.success) {
        setIsAuthenticated(true);
        loadAllData();
      } else {
        setLoginError(res.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Authentication failed. Check your password.');
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setIsAuthenticated(false);
    setPassword('');
  };

  const loadAllData = async () => {
    try {
      const [sRes, schRes, achRes, galRes, evtRes, feesRes, matchRes, statsRes] = await Promise.all([
        api.getAllStudents(),
        api.getSchedules(),
        api.getAchievements(),
        api.getGallery(),
        api.getEvents(),
        api.getAllFees(),
        api.getMatchRegistrations(),
        api.getAdminStats()
      ]);

      setStudents(sRes || []);
      setSchedules(schRes || []);
      setAchievements(achRes || []);
      setGallery(galRes || []);
      setEvents(evtRes || []);
      setFees(feesRes || []);
      setMatchRegistrations(matchRes || []);
      setStats(statsRes || null);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  // --- CRUD Handlers ---

  // Student Save / Delete
  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent?.fullName) return;
    try {
      await api.saveStudent(editingStudent);
      setEditingStudent(null);
      await loadAllData();
      onDataChanged();
    } catch (err) {
      alert('Failed to save student.');
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate/delete this student?')) return;
    try {
      await api.deleteStudent(id);
      await loadAllData();
      onDataChanged();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  // Schedule Save / Delete
  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSchedule?.batch) return;
    try {
      await api.saveSchedule(editingSchedule);
      setEditingSchedule(null);
      await loadAllData();
      onDataChanged();
    } catch (err) {
      alert('Failed to save schedule.');
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!confirm('Delete this training schedule?')) return;
    try {
      await api.deleteSchedule(id);
      await loadAllData();
      onDataChanged();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  // Achievement Save / Delete
  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement?.title) return;
    try {
      await api.saveAchievement(editingAchievement);
      setEditingAchievement(null);
      await loadAllData();
      onDataChanged();
    } catch (err) {
      alert('Failed to save achievement.');
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm('Delete this tournament record?')) return;
    try {
      await api.deleteAchievement(id);
      await loadAllData();
      onDataChanged();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  // Gallery Save / Delete
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem?.imageUrl) return;
    try {
      await api.saveGalleryItem({
        album: newGalleryItem.album || 'Academy Training',
        category: newGalleryItem.category || 'Training',
        imageUrl: newGalleryItem.imageUrl,
        caption: newGalleryItem.caption || 'Silambam training at Malaikovil grounds',
        date: new Date().toISOString().split('T')[0]
      });
      setNewGalleryItem(null);
      await loadAllData();
      onDataChanged();
    } catch (err) {
      alert('Failed to add image.');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    try {
      await api.deleteGalleryItem(id);
      await loadAllData();
      onDataChanged();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  // Event Save / Delete
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.title) return;
    try {
      await api.saveEvent(editingEvent);
      setEditingEvent(null);
      await loadAllData();
      onDataChanged();
    } catch (err) {
      alert('Failed to save event.');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Delete this competition event?')) return;
    try {
      await api.deleteEvent(id);
      await loadAllData();
      onDataChanged();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  // Fee Save / Offline collection
  const handleSaveFee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeeRecord?.studentName || !newFeeRecord?.amount) return;
    try {
      await api.payFee({
        ...newFeeRecord,
        status: 'Paid',
        paymentMethod: newFeeRecord.paymentMethod || 'Cash',
        paymentDate: new Date().toISOString().split('T')[0]
      });
      setNewFeeRecord(null);
      await loadAllData();
      onDataChanged();
    } catch (err) {
      alert('Failed to record fee.');
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.updateSettings(editableSettings);
      if (res.success) {
        onSettingsUpdated(res.settings);
        setSettingsSuccess(true);
        setTimeout(() => setSettingsSuccess(false), 3000);
      }
    } catch (err) {
      alert('Failed to update website content.');
    }
  };

  // Export Match Registrations to CSV
  const handleExportMatchesCSV = () => {
    if (matchRegistrations.length === 0) return alert('No registrations to export.');
    const headers = ['Registration ID', 'Player Name', 'Event', 'Category', 'Age Division', 'Phone', 'Team', 'Entry Fee', 'Status'];
    const rows = matchRegistrations.map(r => [
      r.registrationId,
      r.playerName,
      `"${r.eventName.replace(/"/g, '""')}"`,
      r.eventCategory,
      r.ageCategory,
      r.phoneNumber,
      `"${r.academyName.replace(/"/g, '""')}"`,
      r.entryFee,
      r.paymentStatus
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Silambam_Tournament_Entries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-6xl w-full h-[94vh] bg-[#0c0e15] border border-[#d4af37]/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-200">
        
        {/* Top Header */}
        <div className="p-4 bg-[#111420] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/team%20logo.jpeg"
              alt="Murugaiya Silamba Koodam Logo"
              className="w-10 h-10 object-contain rounded-full drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] shrink-0"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.tried) {
                  target.dataset.tried = '1';
                  target.src = '/team_logo.jpeg';
                }
              }}
            />
            <div>
              <h3 className="font-heading font-black text-white text-base sm:text-lg">
                Academy Management Portal
              </h3>
              <div className="text-[11px] text-[#d4af37]">
                Murugaiya Silamba Koodam · Malaikovil
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-300 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Authenticated: Login Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-[#121522] border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6">
              <div className="text-center">
                <img
                  src="/team%20logo.jpeg"
                  alt="Murugaiya Silamba Koodam Logo"
                  className="w-16 h-16 object-contain rounded-full drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] mx-auto mb-3"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.tried) {
                      target.dataset.tried = '1';
                      target.src = '/team_logo.jpeg';
                    }
                  }}
                />
                <h4 className="font-heading text-2xl font-black text-white">Master Login</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Enter administrator passcode to access academy records and settings.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#161a28] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Passcode</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password (default: admin123)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#161a28] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <div className="text-[10px] text-gray-400 mt-1">Default demo passcode: <strong>admin123</strong></div>
                </div>

                {loginError && (
                  <div className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded border border-red-800">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg transition-all shadow-md"
                >
                  Enter Admin Console
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard Workspace */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Left Vertical Navigation Sidebar */}
            <div className="w-full md:w-56 bg-[#0f111a] border-r border-gray-800 p-3 space-y-1 overflow-x-auto md:overflow-y-auto shrink-0 flex md:flex-col gap-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'overview' ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'students' ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Students ({students.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('schedules')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'schedules' ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Batches & Timetable</span>
              </button>

              <button
                onClick={() => setActiveTab('achievements')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'achievements' ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Achievements ({achievements.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'gallery' ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Gallery & Media</span>
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'events' ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <Flag className="w-4 h-4" />
                <span>Events & Tournaments</span>
              </button>

              <button
                onClick={() => setActiveTab('fees')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'fees' ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Fees & Payments</span>
              </button>

              <button
                onClick={() => setActiveTab('matches')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'matches' ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <FileCheck className="w-4 h-4" />
                <span>Match Entries ({matchRegistrations.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'settings' ? 'bg-[#d4af37] text-black font-bold' : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Website Content</span>
              </button>
            </div>

            {/* Main Content Workspace Panel */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#0a0c12]">
              
              {/* TAB 1: OVERVIEW & METRICS */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">Academy Health & Metrics</h3>
                    <p className="text-xs text-gray-400">Real-time stats on warriors, monthly collections, and championship preparation.</p>
                  </div>

                  {/* Overview Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="p-4 rounded-xl bg-[#121522] border border-gray-800">
                      <div className="text-[10px] uppercase font-bold text-gray-400">Total Students</div>
                      <div className="font-heading text-2xl font-black text-white mt-1">{stats?.totalStudents || students.length}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#121522] border border-gray-800">
                      <div className="text-[10px] uppercase font-bold text-gray-400">Active Fighters</div>
                      <div className="font-heading text-2xl font-black text-emerald-400 mt-1">{stats?.activeStudents || students.length}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#121522] border border-gray-800">
                      <div className="text-[10px] uppercase font-bold text-gray-400">Fees Collected</div>
                      <div className="font-heading text-2xl font-black text-[#f3cf65] mt-1">₹{stats?.totalCollected || 4400}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#121522] border border-gray-800">
                      <div className="text-[10px] uppercase font-bold text-gray-400">Pending Dues</div>
                      <div className="font-heading text-2xl font-black text-amber-400 mt-1">₹{stats?.totalPending || 1800}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#121522] border border-gray-800">
                      <div className="text-[10px] uppercase font-bold text-gray-400">Active Events</div>
                      <div className="font-heading text-2xl font-black text-white mt-1">{events.length}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#121522] border border-gray-800">
                      <div className="text-[10px] uppercase font-bold text-gray-400">Match Entries</div>
                      <div className="font-heading text-2xl font-black text-red-400 mt-1">{matchRegistrations.length}</div>
                    </div>
                  </div>

                  {/* Visual Fee Collection & Growth Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Monthly Collection Chart */}
                    <div className="p-5 rounded-2xl bg-[#121522] border border-gray-800 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-heading font-bold text-white text-sm">Monthly Fee Collections (₹)</span>
                        <span className="text-[11px] text-emerald-400 font-semibold">+18% vs last quarter</span>
                      </div>
                      
                      <div className="h-44 flex items-end justify-between gap-3 pt-4 border-b border-gray-800 pb-2">
                        {stats?.monthlyFeeCollection?.map((item: any, i: number) => {
                          const maxVal = 50000;
                          const heightPct = Math.min(100, Math.max(15, (item.collected / maxVal) * 100));
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                              <span className="text-[10px] text-gray-400 font-mono">₹{Math.round(item.collected / 1000)}k</span>
                              <div 
                                className="w-full max-w-[36px] bg-gradient-to-t from-[#9e121b] to-[#d4af37] rounded-t-md hover:brightness-125 transition-all shadow-sm"
                                style={{ height: `${heightPct}%` }}
                              />
                              <span className="text-[11px] font-bold text-gray-300">{item.month}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-gray-400">
                        <span>Safe electronic payment logs</span>
                        <span className="text-[#d4af37]">Auto-synced with receipts</span>
                      </div>
                    </div>

                    {/* Student Growth & Batch Distribution */}
                    <div className="p-5 rounded-2xl bg-[#121522] border border-gray-800 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-heading font-bold text-white text-sm">Student Enrollment Growth</span>
                        <span className="text-[11px] text-[#d4af37] font-semibold">Tiruchirappalli Region</span>
                      </div>

                      <div className="h-44 flex items-end justify-between gap-3 pt-4 border-b border-gray-800 pb-2">
                        {stats?.studentGrowth?.map((item: any, i: number) => {
                          const maxStudents = 100;
                          const heightPct = Math.min(100, Math.max(15, (item.students / maxStudents) * 100));
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                              <span className="text-[10px] text-emerald-400 font-bold">{item.students}</span>
                              <div 
                                className="w-full max-w-[36px] bg-gradient-to-t from-gray-800 to-emerald-500 rounded-t-md hover:brightness-125 transition-all"
                                style={{ height: `${heightPct}%` }}
                              />
                              <span className="text-[11px] font-bold text-gray-300">{item.month}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-gray-400">
                        <span>Children & youth martial development</span>
                        <span className="text-emerald-400">Growing steadily</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => {
                        setEditingStudent({ fullName: '', age: 14, gender: 'Male', category: 'Junior', status: 'Active', isPublicProfile: true, batchId: schedules[0]?.id });
                        setActiveTab('students');
                      }}
                      className="px-4 py-2 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Student</span>
                    </button>

                    <button
                      onClick={() => {
                        setEditingAchievement({ title: '', competitionName: '', year: 2026, level: 'State', medal: 'Gold', playerName: '' });
                        setActiveTab('achievements');
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#9e121b] to-[#c51d28] rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Log Tournament Medal</span>
                    </button>

                    <button
                      onClick={() => {
                        setNewFeeRecord({ studentName: '', amount: settings.monthlyFeeDefault, month: 'October', year: 2026 });
                        setActiveTab('fees');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-gray-200 bg-[#161a28] hover:bg-[#202538] border border-gray-700 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <DollarSign className="w-4 h-4 text-[#d4af37]" />
                      <span>Record Offline Fee</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: STUDENTS MANAGEMENT */}
              {activeTab === 'students' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">Student Database</h3>
                      <p className="text-xs text-gray-400">Total enrolled students: {students.length}</p>
                    </div>

                    <button
                      onClick={() => setEditingStudent({ fullName: '', age: 14, gender: 'Male', category: 'Junior', status: 'Active', isPublicProfile: true, batchId: schedules[0]?.id, achievementsCount: 0 })}
                      className="px-4 py-2 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Student</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#121522]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#0e101a] border-b border-gray-800 text-[#d4af37] uppercase font-bold">
                          <th className="py-3 px-4">Student ID</th>
                          <th className="py-3 px-4">Full Name</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Batch</th>
                          <th className="py-3 px-4">Phone</th>
                          <th className="py-3 px-4">Public Wall</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800 text-gray-300">
                        {students.map((s) => (
                          <tr key={s.id} className="hover:bg-[#181c2c] transition-colors">
                            <td className="py-3 px-4 font-mono text-gray-400">{s.studentId}</td>
                            <td className="py-3 px-4 font-semibold text-white">
                              {s.fullName}
                              <div className="text-[10px] text-gray-400 font-normal">Age: {s.age} · {s.gender}</div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-black/40 border border-gray-700 text-[10px]">
                                {s.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-300">{s.batchName || 'Regular'}</td>
                            <td className="py-3 px-4 font-mono">{s.phoneNumber}</td>
                            <td className="py-3 px-4">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${s.isPublicProfile ? 'bg-emerald-950/60 text-emerald-400' : 'bg-gray-800 text-gray-400'}`}>
                                {s.isPublicProfile ? 'Visible' : 'Hidden'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => setEditingStudent(s)}
                                className="p-1.5 text-gray-400 hover:text-[#d4af37]"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteStudent(s.id)}
                                className="p-1.5 text-gray-400 hover:text-red-400"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: SCHEDULES & TIMETABLE */}
              {activeTab === 'schedules' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">Batches & Training Schedule</h3>
                      <p className="text-xs text-gray-400">Timetable displayed on public site</p>
                    </div>

                    <button
                      onClick={() => setEditingSchedule({ day: 'Saturday', morningTime: '7:00 AM – 9:00 AM', eveningTime: '—', batch: 'Special Weekend Batch', fee: 1500, coach: settings.headCoachName, level: 'All Levels' })}
                      className="px-4 py-2 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Batch</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {schedules.map((sch) => (
                      <div key={sch.id} className="p-4 rounded-xl bg-[#121522] border border-gray-800 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-bold text-[#d4af37] uppercase">{sch.day}</span>
                            <h4 className="font-heading font-bold text-white text-base">{sch.batch}</h4>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-[#f3cf65]">₹{sch.fee}</span>
                            <div className="text-[10px] text-gray-400">per month</div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-300 space-y-1">
                          <div>Morning: {sch.morningTime}</div>
                          <div>Evening: {sch.eveningTime}</div>
                          <div>Coach: {sch.coach}</div>
                          <div className="text-gray-400 text-[11px]">{sch.description}</div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                          <button
                            onClick={() => setEditingSchedule(sch)}
                            className="px-3 py-1 text-xs font-semibold text-gray-300 hover:text-white bg-gray-800 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSchedule(sch.id)}
                            className="px-3 py-1 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-950/40 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: ACHIEVEMENTS */}
              {activeTab === 'achievements' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">Championship Achievements</h3>
                      <p className="text-xs text-gray-400">Total medals and honors: {achievements.length}</p>
                    </div>

                    <button
                      onClick={() => setEditingAchievement({ title: '', competitionName: '', year: 2026, location: 'Tiruchirappalli', level: 'State', medal: 'Gold', playerName: '' })}
                      className="px-4 py-2 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Achievement</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((ach, idx) => (
                      <div key={ach.id} className="p-4 rounded-xl bg-[#121522] border border-gray-800 space-y-2 flex flex-col justify-between">
                        <div>
                          {ach.photoUrl && (
                            <div className="relative h-28 w-full mb-2 rounded-lg overflow-hidden bg-black border border-gray-800">
                              <img
                                src={ach.photoUrl}
                                alt={ach.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-[#f3cf65]">
                                #{idx + 1}
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between text-[11px]">
                            <span className="text-[#d4af37] font-bold">{ach.level} · {ach.year}</span>
                            <span className="font-bold text-amber-300">{ach.medal}</span>
                          </div>
                          <h4 className="font-heading font-bold text-white text-sm mt-1">{ach.title}</h4>
                          <div className="text-xs text-gray-300">{ach.competitionName}</div>
                          {ach.category && (
                            <div className="text-[11px] text-[#f3cf65]">Category: {ach.category}</div>
                          )}
                          <div className="text-[11px] text-gray-400 mt-0.5">Warrior: {ach.playerName}</div>
                        </div>

                        <div className="flex items-center justify-between gap-1 pt-2 border-t border-gray-800">
                          {/* Reordering */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={async () => {
                                if (idx === 0) return;
                                const reordered = [...achievements];
                                const [item] = reordered.splice(idx, 1);
                                reordered.splice(idx - 1, 0, item);
                                setAchievements(reordered);
                                await Promise.all(reordered.map(a => api.saveAchievement(a)));
                                onDataChanged();
                              }}
                              className="px-2 py-1 text-[10px] font-bold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-30 rounded"
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={idx === achievements.length - 1}
                              onClick={async () => {
                                if (idx === achievements.length - 1) return;
                                const reordered = [...achievements];
                                const [item] = reordered.splice(idx, 1);
                                reordered.splice(idx + 1, 0, item);
                                setAchievements(reordered);
                                await Promise.all(reordered.map(a => api.saveAchievement(a)));
                                onDataChanged();
                              }}
                              className="px-2 py-1 text-[10px] font-bold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-30 rounded"
                              title="Move Down"
                            >
                              ▼
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setEditingAchievement(ach)}
                              className="px-3 py-1 text-xs text-gray-300 bg-gray-800 hover:bg-gray-700 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAchievement(ach.id)}
                              className="px-3 py-1 text-xs text-red-400 bg-red-950/40 hover:bg-red-900/60 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: GALLERY & MEDIA */}
              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">Gallery Photos & Albums</h3>
                      <p className="text-xs text-gray-400">Total photos: {gallery.length}</p>
                    </div>

                    <button
                      onClick={() => setNewGalleryItem({ album: 'Training Camps', category: 'Training', imageUrl: '', caption: '' })}
                      className="px-4 py-2 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.map((g) => (
                      <div key={g.id} className="relative rounded-xl overflow-hidden bg-black border border-gray-800 group aspect-video">
                        <img
                          src={g.imageUrl}
                          alt={g.caption}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-xs">
                          <div>
                            <span className="text-[10px] font-bold text-[#d4af37]">{g.category}</span>
                            <p className="text-white text-[11px] truncate">{g.caption}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteGallery(g.id)}
                            className="self-end p-1 text-red-400 hover:text-red-300 bg-black/80 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: EVENTS MANAGEMENT */}
              {activeTab === 'events' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">Upcoming Competitions & Tournaments</h3>
                      <p className="text-xs text-gray-400">Manage dates, entry fees, and slot capacities</p>
                    </div>

                    <button
                      onClick={() => setEditingEvent({ title: '', date: '2026-12-01', venue: 'Trichy Arena', organizer: settings.academyName, entryFee: 500, registrationDeadline: '2026-11-25', categories: ['Sub-Junior', 'Junior', 'Senior'], availableSlots: 50, totalSlots: 100, status: 'Open', description: '' })}
                      className="px-4 py-2 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Event</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {events.map((evt) => (
                      <div key={evt.id} className="p-4 rounded-xl bg-[#121522] border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d4af37]/20 text-[#d4af37]">
                              {evt.status}
                            </span>
                            <span className="text-xs text-gray-400">Date: {evt.date}</span>
                          </div>
                          <h4 className="font-heading font-bold text-white text-base">{evt.title}</h4>
                          <div className="text-xs text-gray-300">{evt.venue} · Fee: ₹{evt.entryFee}</div>
                          <div className="text-[11px] text-gray-400">Slots: {evt.availableSlots} / {evt.totalSlots} remaining</div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingEvent(evt)}
                            className="px-3 py-1.5 text-xs text-gray-300 bg-gray-800 rounded hover:text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="px-3 py-1.5 text-xs text-red-400 bg-red-950/40 rounded hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: FEES & PAYMENTS */}
              {activeTab === 'fees' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">Fee Payment Records</h3>
                      <p className="text-xs text-gray-400">Official student fee transactions</p>
                    </div>

                    <button
                      onClick={() => setNewFeeRecord({ studentName: '', studentId: '', amount: settings.monthlyFeeDefault, month: 'October', year: 2026, paymentMethod: 'Cash' })}
                      className="px-4 py-2 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Record Fee</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#121522]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#0e101a] border-b border-gray-800 text-[#d4af37] uppercase font-bold">
                          <th className="py-3 px-4">Receipt No</th>
                          <th className="py-3 px-4">Student</th>
                          <th className="py-3 px-4">Period</th>
                          <th className="py-3 px-4">Amount</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Date / Txn</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800 text-gray-300">
                        {fees.map((f) => (
                          <tr key={f.id} className="hover:bg-[#181c2c]">
                            <td className="py-3 px-4 font-mono text-gray-400">{f.receiptNumber}</td>
                            <td className="py-3 px-4 font-semibold text-white">
                              {f.studentName}
                              <div className="text-[10px] text-gray-400 font-mono">{f.studentId}</div>
                            </td>
                            <td className="py-3 px-4">{f.month} {f.year}</td>
                            <td className="py-3 px-4 font-bold text-[#f3cf65]">₹{f.amount}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${f.status === 'Paid' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                                {f.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[11px] text-gray-400">
                              <div>{f.paymentDate || '—'}</div>
                              <div className="font-mono truncate max-w-[140px]">{f.transactionId || '—'}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 8: MATCH REGISTRATIONS */}
              {activeTab === 'matches' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">Tournament Registrations</h3>
                      <p className="text-xs text-gray-400">Total fighter registrations: {matchRegistrations.length}</p>
                    </div>

                    <button
                      onClick={handleExportMatchesCSV}
                      className="px-4 py-2 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export to CSV</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#121522]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#0e101a] border-b border-gray-800 text-[#d4af37] uppercase font-bold">
                          <th className="py-3 px-4">Match ID</th>
                          <th className="py-3 px-4">Player</th>
                          <th className="py-3 px-4">Tournament</th>
                          <th className="py-3 px-4">Division</th>
                          <th className="py-3 px-4">Team</th>
                          <th className="py-3 px-4">Phone</th>
                          <th className="py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800 text-gray-300">
                        {matchRegistrations.map((m) => (
                          <tr key={m.id} className="hover:bg-[#181c2c]">
                            <td className="py-3 px-4 font-mono text-[#f3cf65] font-bold">{m.registrationId}</td>
                            <td className="py-3 px-4 font-semibold text-white">
                              {m.playerName}
                              <div className="text-[10px] text-gray-400 font-normal">{m.gender} · DOB: {m.dob}</div>
                            </td>
                            <td className="py-3 px-4 max-w-xs truncate">{m.eventName}</td>
                            <td className="py-3 px-4">{m.ageCategory} · {m.eventCategory}</td>
                            <td className="py-3 px-4">{m.academyName}</td>
                            <td className="py-3 px-4 font-mono">{m.phoneNumber}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400">
                                {m.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 9: WEBSITE CONTENT SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">Website Content & Academy Details</h3>
                    <p className="text-xs text-gray-400">
                      Changes made here update the homepage, contact info, and fees instantly without editing code.
                    </p>
                  </div>

                  {settingsSuccess && (
                    <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Settings updated successfully!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Academy Name (English)</label>
                        <input
                          type="text"
                          value={editableSettings.academyName}
                          onChange={(e) => setEditableSettings({ ...editableSettings, academyName: e.target.value })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Tamil Name</label>
                        <input
                          type="text"
                          value={editableSettings.tamilName}
                          onChange={(e) => setEditableSettings({ ...editableSettings, tamilName: e.target.value })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Slogan Tagline</label>
                        <input
                          type="text"
                          value={editableSettings.tagline}
                          onChange={(e) => setEditableSettings({ ...editableSettings, tagline: e.target.value })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Supporting Subtitle</label>
                        <input
                          type="text"
                          value={editableSettings.subheading}
                          onChange={(e) => setEditableSettings({ ...editableSettings, subheading: e.target.value })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Who We Are / About Story</label>
                      <textarea
                        rows={4}
                        value={editableSettings.aboutStory}
                        onChange={(e) => setEditableSettings({ ...editableSettings, aboutStory: e.target.value })}
                        className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={editableSettings.phone}
                          onChange={(e) => setEditableSettings({ ...editableSettings, phone: e.target.value })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">WhatsApp Number</label>
                        <input
                          type="text"
                          value={editableSettings.whatsapp}
                          onChange={(e) => setEditableSettings({ ...editableSettings, whatsapp: e.target.value })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Email</label>
                        <input
                          type="email"
                          value={editableSettings.email}
                          onChange={(e) => setEditableSettings({ ...editableSettings, email: e.target.value })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">UPI ID for Payments</label>
                        <input
                          type="text"
                          value={editableSettings.upiId}
                          onChange={(e) => setEditableSettings({ ...editableSettings, upiId: e.target.value })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Default Monthly Fee (₹)</label>
                        <input
                          type="number"
                          value={editableSettings.monthlyFeeDefault}
                          onChange={(e) => setEditableSettings({ ...editableSettings, monthlyFeeDefault: Number(e.target.value) })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Head Coach / Aasaan Name</label>
                        <input
                          type="text"
                          value={editableSettings.headCoachName}
                          onChange={(e) => setEditableSettings({ ...editableSettings, headCoachName: e.target.value })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Address Location</label>
                        <input
                          type="text"
                          value={editableSettings.address}
                          onChange={(e) => setEditableSettings({ ...editableSettings, address: e.target.value })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Landmark</label>
                        <input
                          type="text"
                          value={editableSettings.landmark}
                          onChange={(e) => setEditableSettings({ ...editableSettings, landmark: e.target.value })}
                          className="w-full bg-[#151926] border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#f3cf65] rounded-lg shadow-md transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Website Settings</span>
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* MODAL: ADD / EDIT STUDENT */}
      {editingStudent && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85">
          <div className="max-w-lg w-full bg-[#131622] border border-[#d4af37]/60 rounded-xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <h4 className="font-heading font-bold text-white text-base">
                {editingStudent.id ? 'Edit Student Profile' : 'Add New Student'}
              </h4>
              <button onClick={() => setEditingStudent(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingStudent.fullName || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, fullName: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Age</label>
                  <input
                    type="number"
                    value={editingStudent.age || 14}
                    onChange={(e) => setEditingStudent({ ...editingStudent, age: Number(e.target.value) })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Category</label>
                  <select
                    value={editingStudent.category || 'Junior'}
                    onChange={(e) => setEditingStudent({ ...editingStudent, category: e.target.value as any })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  >
                    <option value="Sub-Junior">Sub-Junior</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editingStudent.phoneNumber || ''}
                    onChange={(e) => setEditingStudent({ ...editingStudent, phoneNumber: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Parent Name</label>
                  <input
                    type="text"
                    value={editingStudent.parentName || ''}
                    onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Weapon Specialty</label>
                <input
                  type="text"
                  placeholder="e.g. Single Stick & Surul Vaal"
                  value={editingStudent.weaponSpecialty || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, weaponSpecialty: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publicProfileCheck"
                  checked={editingStudent.isPublicProfile !== false}
                  onChange={(e) => setEditingStudent({ ...editingStudent, isPublicProfile: e.target.checked })}
                  className="rounded text-[#d4af37]"
                />
                <label htmlFor="publicProfileCheck" className="text-gray-300 font-medium">
                  Display on public Athletes honour roll (phone & private info will stay hidden)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-black bg-[#d4af37] rounded-lg"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT SCHEDULE */}
      {editingSchedule && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85">
          <div className="max-w-lg w-full bg-[#131622] border border-[#d4af37]/60 rounded-xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <h4 className="font-heading font-bold text-white text-base">
                {editingSchedule.id ? 'Edit Training Schedule' : 'Create Training Batch'}
              </h4>
              <button onClick={() => setEditingSchedule(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Day of Week</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monday or Saturday"
                  value={editingSchedule.day || ''}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, day: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Batch Title & Syllabus</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Combat & Weapon Mastery"
                  value={editingSchedule.batch || ''}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, batch: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Morning Timing</label>
                  <input
                    type="text"
                    placeholder="e.g. 7:00 AM – 9:00 AM or —"
                    value={editingSchedule.morningTime || '—'}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, morningTime: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Evening Timing</label>
                  <input
                    type="text"
                    placeholder="e.g. 5:30 PM – 7:30 PM or —"
                    value={editingSchedule.eveningTime || '—'}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, eveningTime: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Monthly Fee (₹)</label>
                  <input
                    type="number"
                    value={editingSchedule.fee || 1200}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, fee: Number(e.target.value) })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Assigned Coach</label>
                  <input
                    type="text"
                    value={editingSchedule.coach || settings.headCoachName}
                    onChange={(e) => setEditingSchedule({ ...editingSchedule, coach: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingSchedule(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-black bg-[#d4af37] rounded-lg"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT ACHIEVEMENT */}
      {editingAchievement && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85">
          <div className="max-w-lg w-full bg-[#131622] border border-[#d4af37]/60 rounded-xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <h4 className="font-heading font-bold text-white text-base">
                {editingAchievement.id ? 'Edit Championship Honour' : 'Log Tournament Medal'}
              </h4>
              <button onClick={() => setEditingAchievement(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAchievement} className="space-y-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Award / Honor Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gold Medal - Senior Single Staff Combat"
                  value={editingAchievement.title || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, title: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Competition Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tamil Nadu State Silambam Championship"
                    value={editingAchievement.competitionName || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, competitionName: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Year</label>
                  <input
                    type="number"
                    value={editingAchievement.year || 2026}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, year: Number(e.target.value) })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Medal / Trophy</label>
                  <select
                    value={editingAchievement.medal || 'Gold'}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, medal: e.target.value as any })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  >
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                    <option value="Trophy">Championship Trophy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Championship Level</label>
                  <select
                    value={editingAchievement.level || 'State'}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, level: e.target.value as any })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  >
                    <option value="International">International</option>
                    <option value="National">National</option>
                    <option value="State">State</option>
                    <option value="District">District</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Winning Fighter Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M. Tharun Prasath or Academy Squad"
                    value={editingAchievement.playerName || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, playerName: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Category / Event Division</label>
                  <input
                    type="text"
                    placeholder="e.g. Traditional Weapon (Surul Vaal)"
                    value={editingAchievement.category || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, category: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Anna Stadium, Tiruchirappalli"
                  value={editingAchievement.location || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, location: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              {/* Achievement Photograph / Official Images Selector */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Achievement Photograph</label>
                <input
                  type="text"
                  placeholder="/src/assets/images/i1.jpeg"
                  value={editingAchievement.photoUrl || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, photoUrl: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white mb-2"
                />
                
                <div className="space-y-1.5">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Select from 8 Official Uploaded Photographs:
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                      const imgPath = `/src/assets/images/i${num}.jpeg`;
                      const isSelected = editingAchievement.photoUrl === imgPath || editingAchievement.photoUrl === `/i${num}.jpeg`;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setEditingAchievement({ ...editingAchievement, photoUrl: imgPath })}
                          className={`relative rounded-md overflow-hidden border p-0.5 text-center transition-all ${
                            isSelected ? 'border-[#d4af37] ring-2 ring-[#d4af37]/60' : 'border-gray-700 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={imgPath}
                            alt={`Photo ${num}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-10 object-cover rounded"
                          />
                          <span className="text-[9px] font-bold block text-white mt-0.5">i{num}.jpeg</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Description / Victory Summary</label>
                <textarea
                  rows={2}
                  placeholder="Details of the victory, medal tally, or tournament significance..."
                  value={editingAchievement.description || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, description: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingAchievement(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-black bg-[#d4af37] rounded-lg"
                >
                  Save Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD GALLERY PHOTO */}
      {newGalleryItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85">
          <div className="max-w-lg w-full bg-[#131622] border border-[#d4af37]/60 rounded-xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <h4 className="font-heading font-bold text-white text-base">Add Photo to Gallery</h4>
              <button onClick={() => setNewGalleryItem(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://... or /src/assets/images/..."
                  value={newGalleryItem.imageUrl || ''}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Category</label>
                  <select
                    value={newGalleryItem.category || 'Training'}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value as any })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  >
                    <option value="Training">Training</option>
                    <option value="Competitions">Competitions</option>
                    <option value="Prize Distribution">Prize Distribution</option>
                    <option value="Events">Events</option>
                    <option value="Team">Team</option>
                    <option value="Training Camps">Training Camps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Album Title</label>
                  <input
                    type="text"
                    value={newGalleryItem.album || 'Malaikovil Sessions'}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, album: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Caption</label>
                <input
                  type="text"
                  placeholder="Describe the photo"
                  value={newGalleryItem.caption || ''}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setNewGalleryItem(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-black bg-[#d4af37] rounded-lg"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT EVENT */}
      {editingEvent && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85">
          <div className="max-w-lg w-full bg-[#131622] border border-[#d4af37]/60 rounded-xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <h4 className="font-heading font-bold text-white text-base">
                {editingEvent.id ? 'Edit Event / Competition' : 'Create New Tournament'}
              </h4>
              <button onClick={() => setEditingEvent(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Tournament Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4th State Level Silambam Championship"
                  value={editingEvent.title || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={editingEvent.date || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Registration Deadline *</label>
                  <input
                    type="date"
                    required
                    value={editingEvent.registrationDeadline || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, registrationDeadline: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Entry Fee (₹)</label>
                  <input
                    type="number"
                    value={editingEvent.entryFee || 500}
                    onChange={(e) => setEditingEvent({ ...editingEvent, entryFee: Number(e.target.value) })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Total Available Slots</label>
                  <input
                    type="number"
                    value={editingEvent.totalSlots || 100}
                    onChange={(e) => setEditingEvent({ ...editingEvent, totalSlots: Number(e.target.value), availableSlots: Number(e.target.value) })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Venue Location</label>
                <input
                  type="text"
                  placeholder="e.g. Anna Stadium Indoor Hall, Trichy"
                  value={editingEvent.venue || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Status</label>
                <select
                  value={editingEvent.status || 'Open'}
                  onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value as any })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                >
                  <option value="Open">Open</option>
                  <option value="Filling Fast">Filling Fast</option>
                  <option value="Closed">Closed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-black bg-[#d4af37] rounded-lg"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RECORD OFFLINE FEE */}
      {newFeeRecord && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85">
          <div className="max-w-lg w-full bg-[#131622] border border-[#d4af37]/60 rounded-xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <h4 className="font-heading font-bold text-white text-base">Record Offline Fee Payment</h4>
              <button onClick={() => setNewFeeRecord(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFee} className="space-y-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  value={newFeeRecord.studentName || ''}
                  onChange={(e) => setNewFeeRecord({ ...newFeeRecord, studentName: e.target.value })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Month</label>
                  <input
                    type="text"
                    value={newFeeRecord.month || 'October'}
                    onChange={(e) => setNewFeeRecord({ ...newFeeRecord, month: e.target.value })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newFeeRecord.amount || 1200}
                    onChange={(e) => setNewFeeRecord({ ...newFeeRecord, amount: Number(e.target.value) })}
                    className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Payment Method</label>
                <select
                  value={newFeeRecord.paymentMethod || 'Cash'}
                  onChange={(e) => setNewFeeRecord({ ...newFeeRecord, paymentMethod: e.target.value as any })}
                  className="w-full bg-[#181c2c] border border-gray-700 rounded px-3 py-2 text-white"
                >
                  <option value="Cash">Cash (Handed in Person)</option>
                  <option value="UPI">UPI Direct / QR</option>
                  <option value="NetBanking">Direct Bank Transfer</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setNewFeeRecord(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-black bg-[#d4af37] rounded-lg"
                >
                  Record Payment & Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
