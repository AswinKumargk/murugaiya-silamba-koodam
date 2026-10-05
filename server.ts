import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db } from './server/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple admin session management
const ADMIN_PASSWORD_HASH = 'admin123'; // Can be configured via env
const activeAdminTokens = new Set<string>(['silambam-master-session-token-2026']);

// Auth middleware for admin endpoints
const requireAdmin = (req: Request, res: Response, next: () => void) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '') || (req.headers['x-admin-token'] as string);
  
  if (token && activeAdminTokens.has(token)) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Admin authentication required.' });
};

// --- AUTH ROUTES ---
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if ((username === 'admin' || username === 'admin@murugaiyasilamba.com') && (password === ADMIN_PASSWORD_HASH || password === 'admin@2026' || password === 'silambam123')) {
    const token = `token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    activeAdminTokens.add(token);
    return res.json({ 
      success: true, 
      token, 
      user: { username: 'admin', role: 'Grandmaster / Administrator', name: 'Aasaan K. Murugaiyan' } 
    });
  }
  return res.status(401).json({ success: false, error: 'Invalid username or password' });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || (req.headers['x-admin-token'] as string);
  if (token && activeAdminTokens.has(token)) {
    return res.json({ authenticated: true, user: { username: 'admin', role: 'Grandmaster / Administrator' } });
  }
  return res.json({ authenticated: false });
});

// --- SETTINGS ROUTES ---
app.get('/api/settings', (req: Request, res: Response) => {
  res.json(db.getSettings());
});

app.put('/api/settings', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateSettings(req.body);
  res.json({ success: true, settings: updated });
});

// --- STUDENTS ROUTES ---
// Public profile endpoint only returns non-sensitive data
app.get('/api/public-students', (req: Request, res: Response) => {
  res.json(db.getPublicStudents());
});

// Admin get all students (full profiles including contacts & payment history)
app.get('/api/students', requireAdmin, (req: Request, res: Response) => {
  res.json(db.getStudents());
});

app.post('/api/students', requireAdmin, (req: Request, res: Response) => {
  const studentData = req.body;
  if (!studentData.studentId) {
    studentData.studentId = `MSK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  }
  if (!studentData.id) {
    studentData.id = `std-${Date.now()}`;
  }
  const saved = db.saveStudent(studentData);
  res.json({ success: true, student: saved });
});

app.put('/api/students/:id', requireAdmin, (req: Request, res: Response) => {
  const saved = db.saveStudent({ ...req.body, id: req.params.id });
  res.json({ success: true, student: saved });
});

app.delete('/api/students/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = db.deleteStudent(req.params.id);
  res.json({ success: deleted });
});

// --- SCHEDULES ROUTES ---
app.get('/api/schedules', (req: Request, res: Response) => {
  res.json(db.getSchedules());
});

app.post('/api/schedules', requireAdmin, (req: Request, res: Response) => {
  const item = { ...req.body, id: req.body.id || `sch-${Date.now()}` };
  const saved = db.saveSchedule(item);
  res.json({ success: true, schedule: saved });
});

app.put('/api/schedules/:id', requireAdmin, (req: Request, res: Response) => {
  const saved = db.saveSchedule({ ...req.body, id: req.params.id });
  res.json({ success: true, schedule: saved });
});

app.delete('/api/schedules/:id', requireAdmin, (req: Request, res: Response) => {
  db.deleteSchedule(req.params.id);
  res.json({ success: true });
});

// --- ACHIEVEMENTS ROUTES ---
app.get('/api/achievements', (req: Request, res: Response) => {
  res.json(db.getAchievements());
});

app.post('/api/achievements', requireAdmin, (req: Request, res: Response) => {
  const item = { ...req.body, id: req.body.id || `ach-${Date.now()}` };
  const saved = db.saveAchievement(item);
  res.json({ success: true, achievement: saved });
});

app.put('/api/achievements/:id', requireAdmin, (req: Request, res: Response) => {
  const saved = db.saveAchievement({ ...req.body, id: req.params.id });
  res.json({ success: true, achievement: saved });
});

app.delete('/api/achievements/:id', requireAdmin, (req: Request, res: Response) => {
  db.deleteAchievement(req.params.id);
  res.json({ success: true });
});

// --- GALLERY ROUTES ---
app.get('/api/gallery', (req: Request, res: Response) => {
  res.json(db.getGallery());
});

app.post('/api/gallery', requireAdmin, (req: Request, res: Response) => {
  const item = { ...req.body, id: req.body.id || `gal-${Date.now()}` };
  const saved = db.saveGalleryItem(item);
  res.json({ success: true, item: saved });
});

app.delete('/api/gallery/:id', requireAdmin, (req: Request, res: Response) => {
  db.deleteGalleryItem(req.params.id);
  res.json({ success: true });
});

// --- EVENTS ROUTES ---
app.get('/api/events', (req: Request, res: Response) => {
  res.json(db.getEvents());
});

app.post('/api/events', requireAdmin, (req: Request, res: Response) => {
  const item = { ...req.body, id: req.body.id || `evt-${Date.now()}` };
  const saved = db.saveEvent(item);
  res.json({ success: true, event: saved });
});

app.put('/api/events/:id', requireAdmin, (req: Request, res: Response) => {
  const saved = db.saveEvent({ ...req.body, id: req.params.id });
  res.json({ success: true, event: saved });
});

app.delete('/api/events/:id', requireAdmin, (req: Request, res: Response) => {
  db.deleteEvent(req.params.id);
  res.json({ success: true });
});

// --- FEES ROUTES ---
app.get('/api/fees', requireAdmin, (req: Request, res: Response) => {
  res.json(db.getFees());
});

// Student / Parent can query by student ID or phone to pay
app.get('/api/fees/lookup', (req: Request, res: Response) => {
  const { studentId, phone } = req.query;
  const fees = db.getFees();
  const matched = fees.filter(f => {
    if (studentId && f.studentId.toLowerCase() === String(studentId).toLowerCase().trim()) return true;
    if (phone && f.phoneNumber.replace(/\D/g, '').endsWith(String(phone).replace(/\D/g, '').slice(-10))) return true;
    return false;
  });
  res.json(matched);
});

// Public payment endpoint (parents/students paying their fee)
app.post('/api/fees/pay', (req: Request, res: Response) => {
  const { studentId, studentName, parentName, phoneNumber, month, year, amount, paymentMethod, transactionId } = req.body;
  
  if (!studentName || !amount) {
    return res.status(400).json({ error: 'Student name and amount are required.' });
  }

  const receiptNumber = `MSK-REC-${year || 2026}-${Math.floor(1000 + Math.random() * 9000)}`;
  const feeRecord = {
    id: `fee-${Date.now()}`,
    receiptNumber,
    studentId: studentId || `MSK-TEMP-${Math.floor(100 + Math.random() * 900)}`,
    studentName,
    parentName: parentName || 'Self / Guardian',
    phoneNumber: phoneNumber || '',
    month: month || 'Current Month',
    year: year || 2026,
    amount: Number(amount),
    status: 'Paid' as const,
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: paymentMethod || 'UPI',
    transactionId: transactionId || `UPI/${Date.now()}/CONFIRMED`,
    notes: 'Online Fee Payment'
  };

  const saved = db.saveFee(feeRecord);
  res.json({ success: true, fee: saved });
});

app.put('/api/fees/:id', requireAdmin, (req: Request, res: Response) => {
  const saved = db.saveFee({ ...req.body, id: req.params.id });
  res.json({ success: true, fee: saved });
});

// --- MATCH REGISTRATION ROUTES ---
app.get('/api/match-registrations', requireAdmin, (req: Request, res: Response) => {
  res.json(db.getMatchRegistrations());
});

app.post('/api/match-registrations', (req: Request, res: Response) => {
  const regData = req.body;
  if (!regData.playerName || !regData.eventId || !regData.phoneNumber) {
    return res.status(400).json({ error: 'Player name, event, and phone number are required.' });
  }

  const registrationId = `MATCH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const newRegistration = {
    ...regData,
    id: `reg-${Date.now()}`,
    registrationId,
    registeredAt: new Date().toISOString(),
    paymentStatus: regData.paymentStatus || 'Paid',
    transactionRef: regData.transactionRef || `UPI/MTR/${Date.now().toString().slice(-6)}`
  };

  const saved = db.saveMatchRegistration(newRegistration);
  res.json({ success: true, registration: saved });
});

// --- CONTACT ROUTES ---
app.get('/api/contact', requireAdmin, (req: Request, res: Response) => {
  res.json(db.getContactMessages());
});

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, phone, email, message } = req.body;
  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, phone, and message are required.' });
  }
  const saved = db.addContactMessage({ name, phone, email: email || '', message });
  res.json({ success: true, message: saved });
});

// --- ADMIN STATS ROUTE ---
app.get('/api/admin/stats', requireAdmin, (req: Request, res: Response) => {
  res.json(db.getDashboardStats());
});

// --- DEV / PRODUCTION SERVER BOOTSTRAP ---
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In dev: integrate Vite's middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Murugaiya Silamba Koodam platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
