import { 
  AcademySettings, 
  Student, 
  TrainingSchedule, 
  Achievement, 
  GalleryItem, 
  EventItem, 
  FeePayment, 
  MatchRegistration, 
  ContactMessage 
} from '../types/index.ts';

const ADMIN_TOKEN_KEY = 'msk_admin_token';

export const getAdminToken = (): string | null => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const setAdminToken = (token: string): void => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const clearAdminToken = (): void => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

const authHeaders = (): Record<string, string> => {
  const token = getAdminToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Settings
  async getSettings(): Promise<AcademySettings> {
    const res = await fetch('/api/settings');
    return res.json();
  },
  async updateSettings(settings: Partial<AcademySettings>): Promise<{ success: boolean; settings: AcademySettings }> {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(settings),
    });
    return res.json();
  },

  // Auth
  async login(password: string, username = 'admin'): Promise<{ success: boolean; token?: string; error?: string }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      setAdminToken(data.token);
    }
    return data;
  },
  async checkAuth(): Promise<{ authenticated: boolean }> {
    const res = await fetch('/api/auth/me', {
      headers: authHeaders(),
    });
    return res.json();
  },

  // Public Students
  async getPublicStudents(): Promise<Partial<Student>[]> {
    const res = await fetch('/api/public-students');
    return res.json();
  },

  // Admin Students
  async getAllStudents(): Promise<Student[]> {
    const res = await fetch('/api/students', { headers: authHeaders() });
    return res.json();
  },
  async saveStudent(student: Partial<Student>): Promise<{ success: boolean; student: Student }> {
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(student),
    });
    return res.json();
  },
  async deleteStudent(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/students/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return res.json();
  },

  // Schedules
  async getSchedules(): Promise<TrainingSchedule[]> {
    const res = await fetch('/api/schedules');
    return res.json();
  },
  async saveSchedule(schedule: Partial<TrainingSchedule>): Promise<{ success: boolean; schedule: TrainingSchedule }> {
    const method = schedule.id && !schedule.id.startsWith('new-') ? 'PUT' : 'POST';
    const url = method === 'PUT' ? `/api/schedules/${schedule.id}` : '/api/schedules';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(schedule),
    });
    return res.json();
  },
  async deleteSchedule(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/schedules/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return res.json();
  },

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    const res = await fetch('/api/achievements');
    return res.json();
  },
  async saveAchievement(achievement: Partial<Achievement>): Promise<{ success: boolean; achievement: Achievement }> {
    const method = achievement.id && !achievement.id.startsWith('new-') ? 'PUT' : 'POST';
    const url = method === 'PUT' ? `/api/achievements/${achievement.id}` : '/api/achievements';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(achievement),
    });
    return res.json();
  },
  async deleteAchievement(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/achievements/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return res.json();
  },

  // Gallery
  async getGallery(): Promise<GalleryItem[]> {
    const res = await fetch('/api/gallery');
    return res.json();
  },
  async saveGalleryItem(item: Partial<GalleryItem>): Promise<{ success: boolean; item: GalleryItem }> {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(item),
    });
    return res.json();
  },
  async deleteGalleryItem(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return res.json();
  },

  // Events
  async getEvents(): Promise<EventItem[]> {
    const res = await fetch('/api/events');
    return res.json();
  },
  async saveEvent(event: Partial<EventItem>): Promise<{ success: boolean; event: EventItem }> {
    const method = event.id && !event.id.startsWith('new-') ? 'PUT' : 'POST';
    const url = method === 'PUT' ? `/api/events/${event.id}` : '/api/events';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(event),
    });
    return res.json();
  },
  async deleteEvent(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return res.json();
  },

  // Fees
  async getAllFees(): Promise<FeePayment[]> {
    const res = await fetch('/api/fees', { headers: authHeaders() });
    return res.json();
  },
  async lookupFees(studentId?: string, phone?: string): Promise<FeePayment[]> {
    const params = new URLSearchParams();
    if (studentId) params.append('studentId', studentId);
    if (phone) params.append('phone', phone);
    const res = await fetch(`/api/fees/lookup?${params.toString()}`);
    return res.json();
  },
  async payFee(data: Partial<FeePayment>): Promise<{ success: boolean; fee: FeePayment }> {
    const res = await fetch('/api/fees/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async updateFee(fee: FeePayment): Promise<{ success: boolean; fee: FeePayment }> {
    const res = await fetch(`/api/fees/${fee.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(fee),
    });
    return res.json();
  },

  // Match Registrations
  async getMatchRegistrations(): Promise<MatchRegistration[]> {
    const res = await fetch('/api/match-registrations', { headers: authHeaders() });
    return res.json();
  },
  async registerMatch(data: Partial<MatchRegistration>): Promise<{ success: boolean; registration: MatchRegistration }> {
    const res = await fetch('/api/match-registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Contact
  async sendContact(data: { name: string; phone: string; email: string; message: string }): Promise<{ success: boolean }> {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async getContacts(): Promise<ContactMessage[]> {
    const res = await fetch('/api/contact', { headers: authHeaders() });
    return res.json();
  },

  // Admin stats
  async getAdminStats() {
    const res = await fetch('/api/admin/stats', { headers: authHeaders() });
    return res.json();
  }
};
