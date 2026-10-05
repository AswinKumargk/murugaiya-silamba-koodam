import fs from 'fs';
import path from 'path';
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
} from '../src/types/index.js';

export interface DatabaseSchema {
  settings: AcademySettings;
  students: Student[];
  schedules: TrainingSchedule[];
  achievements: Achievement[];
  gallery: GalleryItem[];
  events: EventItem[];
  fees: FeePayment[];
  matchRegistrations: MatchRegistration[];
  contactMessages: ContactMessage[];
  adminSessionToken?: string;
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'academy_db.json');
const DB_BACKUP_FILE = path.join(DB_DIR, 'academy_db.backup.json');

const INITIAL_SETTINGS: AcademySettings = {
  academyName: "MURUGAIYA SILAMBA KOODAM",
  tamilName: "முருகையா சிலம்பக் கூடம்",
  tagline: "Train • Fight • Tradition • Victory",
  subheading: "Where traditional Silambam meets modern discipline, fitness and competitive excellence.",
  aboutStory: "Founded with the sacred aim of revitalizing ancient Tamil martial heritage, Murugaiya Silamba Koodam is Tiruchirappalli's foremost traditional martial arts academy. Situated near the historic Malaikovil in Thiruverumbur, we train students of all ages in traditional bamboo stick combat, footwork (Kaaladi), weapon mastery, unarmed self-defense (Kai Silambam), and international sports Silambam championship standards.",
  phone: "+91 98424 55120",
  whatsapp: "+91 98424 55120",
  email: "murugaiyasilambam@gmail.com",
  address: "Malaikovil Ground, Near Malaikovil Murugan Temple, Thiruverumbur",
  city: "Tiruchirappalli",
  landmark: "Opposite BHEL Malaikovil Arch",
  state: "Tamil Nadu",
  pincode: "620013",
  instagramUrl: "https://instagram.com/murugaiya_silamba_koodam",
  youtubeUrl: "https://youtube.com/@murugaiyasilambam",
  monthlyFeeDefault: 400,
  upiId: "iamsujii20122007@oksbi",
  upiName: "Murugaiya Silamba Koodam",
  headCoachName: "V. Sujith Kumar",
  headCoachTitle: "Founder & Chief Master (Silambam Aasaan)",
  foundedYear: "2012"
};

const INITIAL_SCHEDULES: TrainingSchedule[] = [
  {
    id: "sch-1",
    day: "Monday",
    morningTime: "—",
    eveningTime: "5:30 PM – 7:00 PM",
    batch: "Beginners Batch (Adimurai & Basic Kaaladi)",
    level: "Beginners",
    coach: "Aasaan K. Murugaiyan",
    fee: 1200,
    maxSlots: 30,
    activeStudents: 24,
    description: "Fundamental stances, staff grip, initial footwork, and basic rotations (Tharavus)."
  },
  {
    id: "sch-2",
    day: "Wednesday",
    morningTime: "—",
    eveningTime: "5:30 PM – 7:00 PM",
    batch: "Intermediate Batch (Speed & Defensive Combat)",
    level: "Intermediate",
    coach: "Coach R. Selvakumar",
    fee: 1400,
    maxSlots: 25,
    activeStudents: 22,
    description: "Continuous rotational strikes, body shifts, stick parries, counter-offensive sequences."
  },
  {
    id: "sch-3",
    day: "Friday",
    morningTime: "—",
    eveningTime: "5:30 PM – 7:30 PM",
    batch: "Advanced Batch (Weapons & Dual Staff)",
    level: "Advanced",
    coach: "Aasaan K. Murugaiyan",
    fee: 1600,
    maxSlots: 20,
    activeStudents: 18,
    description: "Weapon forms including Surul Vaal (flexible sword), Maduvu (deer horns), and Vel Kambu."
  },
  {
    id: "sch-4",
    day: "Sunday",
    morningTime: "7:00 AM – 9:30 AM",
    eveningTime: "—",
    batch: "Championship Competition Squad",
    level: "Competition Squad",
    coach: "Aasaan K. Murugaiyan & State Referees",
    fee: 1800,
    maxSlots: 25,
    activeStudents: 20,
    description: "Full-contact match simulation, point sparring, endurance conditioning, and tournament tactics."
  }
];

const INITIAL_STUDENTS: Student[] = [
  {
    id: "std-1",
    studentId: "MSK-2024-001",
    fullName: "V. Kavin Kumar",
    photoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
    age: 16,
    dob: "2010-04-12",
    gender: "Male",
    category: "Junior",
    batchId: "sch-4",
    batchName: "Championship Competition Squad",
    joiningDate: "2023-01-10",
    parentName: "M. Velmurugan",
    phoneNumber: "+91 98421 11223",
    status: "Active",
    isPublicProfile: true,
    weaponSpecialty: "Single Staff & Surul Vaal",
    achievementsCount: 6,
    competitionHistory: ["Tamil Nadu State Championship 2025 (Gold)", "District Silambam Meet 2024 (Gold)"]
  },
  {
    id: "std-2",
    studentId: "MSK-2024-002",
    fullName: "S. Ananya Devi",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    age: 14,
    dob: "2012-08-25",
    gender: "Female",
    category: "Sub-Junior",
    batchId: "sch-2",
    batchName: "Intermediate Batch",
    joiningDate: "2023-06-15",
    parentName: "Dr. K. Saravanan",
    phoneNumber: "+91 94432 99887",
    status: "Active",
    isPublicProfile: true,
    weaponSpecialty: "Speed Staff (Pori Silambam)",
    achievementsCount: 4,
    competitionHistory: ["Trichy District Youth Silambam 2025 (Gold)", "State Invitational 2024 (Silver)"]
  },
  {
    id: "std-3",
    studentId: "MSK-2024-003",
    fullName: "M. Tharun Prasath",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    age: 19,
    dob: "2007-02-18",
    gender: "Male",
    category: "Senior",
    batchId: "sch-4",
    batchName: "Championship Competition Squad",
    joiningDate: "2022-03-01",
    parentName: "P. Muthuraman",
    phoneNumber: "+91 97914 44556",
    status: "Active",
    isPublicProfile: true,
    weaponSpecialty: "Maduvu & Double Stick",
    achievementsCount: 8,
    competitionHistory: ["National Silambam Championship Kochi 2025 (Gold)", "All India Martial Games 2024 (Gold)"]
  },
  {
    id: "std-4",
    studentId: "MSK-2025-014",
    fullName: "R. Priyadarshini",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
    age: 11,
    dob: "2015-11-04",
    gender: "Female",
    category: "Sub-Junior",
    batchId: "sch-1",
    batchName: "Beginners Batch",
    joiningDate: "2024-02-12",
    parentName: "G. Ramalingam",
    phoneNumber: "+91 99522 33441",
    status: "Active",
    isPublicProfile: true,
    weaponSpecialty: "Traditional Kaaladi & Stick Basics",
    achievementsCount: 2,
    competitionHistory: ["Thiruverumbur Taluk Meet 2025 (Gold)"]
  }
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "Overall Academy Championship Cup",
    competitionName: "Tamil Nadu State Silambam Championship 2026",
    year: 2026,
    location: "Jawaharlal Nehru Stadium, Chennai",
    level: "State",
    category: "Academy Team Trophy",
    medal: "Trophy",
    playerName: "Murugaiya Silamba Koodam Squad (28 Competitors)",
    photoUrl: "/src/assets/images/i1.jpeg",
    description: "Secured 14 Gold, 8 Silver, and 4 Bronze medals across junior and senior divisions."
  },
  {
    id: "ach-2",
    title: "Gold Medal - Senior Staff Combat (Below 65kg)",
    competitionName: "National Traditional Martial Arts Championship 2025",
    year: 2025,
    location: "Kochi, Kerala",
    level: "National",
    category: "Individual Combat",
    medal: "Gold",
    playerName: "M. Tharun Prasath",
    studentId: "MSK-2024-003",
    photoUrl: "/src/assets/images/i2.jpeg",
    description: "Undefeated through 5 straight tournament bouts with flawless defensive parries."
  },
  {
    id: "ach-3",
    title: "Gold Medal - Sub-Junior Girls Fast Rotation (Thiravukol)",
    competitionName: "Trichy District Silambam Championship 2025",
    year: 2025,
    location: "Anna Stadium, Tiruchirappalli",
    level: "District",
    category: "Speed & Form Mastery",
    medal: "Gold",
    playerName: "S. Ananya Devi",
    studentId: "MSK-2024-002",
    photoUrl: "/src/assets/images/i3.jpeg",
    description: "Top score for precision footwork and high-tempo bamboo stick rotations."
  },
  {
    id: "ach-4",
    title: "International Invitational Gold - Weapon Kata (Surul Vaal)",
    competitionName: "South Asian Traditional Weapons Invitational 2024",
    year: 2024,
    location: "Kuala Lumpur, Malaysia",
    level: "International",
    category: "Flexible Sword (Surul Vaal)",
    medal: "Gold",
    playerName: "V. Kavin Kumar",
    studentId: "MSK-2024-001",
    photoUrl: "/src/assets/images/i4.jpeg",
    description: "Represented India with highest technical marks in traditional flexible sword display."
  },
  {
    id: "ach-5",
    title: "Silver Medal - Junior Boys Dual Weapon (Maduvu)",
    competitionName: "All India Khelo Traditional Games 2024",
    year: 2024,
    location: "Bengaluru, Karnataka",
    level: "National",
    category: "Deer Horn Weapon (Maduvu)",
    medal: "Silver",
    playerName: "R. Vignesh",
    photoUrl: "/src/assets/images/i5.jpeg",
    description: "Outstanding presentation of ancient deer horn parrying defense."
  },
  {
    id: "ach-6",
    title: "District Champions Trophy 2023",
    competitionName: "Tiruchirappalli District Open Silambam Tournament",
    year: 2023,
    location: "Thiruverumbur, Trichy",
    level: "District",
    category: "Team Overall",
    medal: "Trophy",
    playerName: "Murugaiya Silamba Koodam Cadets",
    photoUrl: "/src/assets/images/i6.jpeg",
    description: "Swept all age groups in both demonstration and free sparring events."
  },
  {
    id: "ach-7",
    title: "State Level Silambam Championship Honour",
    competitionName: "Tamil Nadu State Traditional Silambam Meet",
    year: 2025,
    location: "Anna Stadium, Tiruchirappalli",
    level: "State",
    category: "Traditional Staff Forms",
    medal: "Gold",
    playerName: "Murugaiya Silamba Koodam Cadets",
    photoUrl: "/src/assets/images/i7.jpeg",
    description: "Distinguished demonstration and sparring performance honoring traditional Gurukulam lineage."
  },
  {
    id: "ach-8",
    title: "Championship Trophy & Medal of Honour",
    competitionName: "All India Martial Arts Championship",
    year: 2024,
    location: "Chennai, Tamil Nadu",
    level: "National",
    category: "Weapon Combat & Defense",
    medal: "Trophy",
    playerName: "Murugaiya Silamba Koodam Squad",
    photoUrl: "/src/assets/images/i8.jpeg",
    description: "Prestigious championship podium finish reflecting dedicated discipline and martial excellence."
  }
];

const INITIAL_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "3rd State Level Open Silambam Tournament 2026",
    date: "2026-11-15",
    endDate: "2026-11-16",
    venue: "Anna Stadium Indoor Arena, Tiruchirappalli, Tamil Nadu",
    organizer: "Tamil Nadu Traditional Silambam Association & Murugaiya Koodam",
    entryFee: 450,
    registrationDeadline: "2026-11-05",
    categories: ["Under-12 (Sub-Junior)", "Under-17 (Junior)", "Above-18 (Senior)", "Traditional Weapon Open"],
    posterUrl: "/src/assets/images/tournament_fight_1790999328755.jpg",
    availableSlots: 45,
    totalSlots: 150,
    status: "Filling Fast",
    description: "Premier state-level platform featuring point combat, non-contact technical form displays, and weapon kata. Official trophies, medals, and participation certificates verified by the state association.",
    rules: [
      "Standard seasoned bamboo staff length (chin/forehead height).",
      "Official safety guards, headgear, and chest protectors mandatory for combat.",
      "Valid age proof (Aadhaar or Birth Certificate) required at weigh-in.",
      "Strict compliance with traditional martial discipline and referee decisions."
    ]
  },
  {
    id: "evt-2",
    title: "Intensive Summer Martial Arts & Weapon Camp 2026",
    date: "2026-12-20",
    endDate: "2026-12-28",
    venue: "Murugaiya Silamba Koodam Campus, Malaikovil, Thiruverumbur",
    organizer: "Murugaiya Silamba Koodam",
    entryFee: 1500,
    registrationDeadline: "2026-12-15",
    categories: ["All Age Groups (Students & New Trainees)"],
    posterUrl: "/src/assets/images/silambam_weapon_1790999316824.jpg",
    availableSlots: 22,
    totalSlots: 60,
    status: "Open",
    description: "8-day residential and day-scholar intensive workshop focusing on Surul Vaal, Maduvu, Vel Kambu, pressure points (Varma Kalai fundamentals), and cardiovascular combat stamina."
  }
];

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    album: "Championship 2026",
    category: "Competitions",
    imageUrl: "/src/assets/images/tournament_fight_1790999328755.jpg",
    caption: "State championship clash between final contenders in Junior division.",
    date: "2026-02-18",
    isCover: true
  },
  {
    id: "gal-2",
    album: "Master Class",
    category: "Training",
    imageUrl: "/src/assets/images/hero_silambam_1790999305064.jpg",
    caption: "Grandmaster Aasaan instructing proper Kaaladi footwork lock and staff arc.",
    date: "2026-01-22",
    isCover: true
  },
  {
    id: "gal-3",
    album: "Heritage Weapons",
    category: "Training Camps",
    imageUrl: "/src/assets/images/silambam_weapon_1790999316824.jpg",
    caption: "Traditional weapons treasury: seasoned bamboo staves, Maduvu, and Surul Vaal.",
    date: "2025-11-10",
    isCover: true
  },
  {
    id: "gal-4",
    album: "Grandmaster & Leaders",
    category: "Team",
    imageUrl: "/src/assets/images/guru_master_1790999339954.jpg",
    caption: "Aasaan K. Murugaiyan, founder and head coach of Murugaiya Silamba Koodam.",
    date: "2025-10-05",
    isCover: false
  },
  {
    id: "gal-5",
    album: "State Trophy Presentation",
    category: "Prize Distribution",
    imageUrl: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=800&q=80",
    caption: "Students receiving overall team champion medals at Anna Stadium Trichy.",
    date: "2025-09-14",
    isCover: false
  },
  {
    id: "gal-6",
    album: "Morning Sunrise Training",
    category: "Training",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
    caption: "Dawn conditioning at the base of historic Malaikovil rock temple.",
    date: "2025-08-01",
    isCover: false
  }
];

const INITIAL_FEES: FeePayment[] = [
  {
    id: "fee-1",
    receiptNumber: "MSK-REC-2026-1001",
    studentId: "MSK-2024-001",
    studentName: "V. Kavin Kumar",
    parentName: "M. Velmurugan",
    phoneNumber: "+91 98421 11223",
    month: "October",
    year: 2026,
    amount: 1800,
    status: "Paid",
    paymentDate: "2026-10-01",
    paymentMethod: "UPI",
    transactionId: "UPI/6274910283/OKSBI",
    notes: "Competition Squad Monthly Training Fee"
  },
  {
    id: "fee-2",
    receiptNumber: "MSK-REC-2026-1002",
    studentId: "MSK-2024-002",
    studentName: "S. Ananya Devi",
    parentName: "Dr. K. Saravanan",
    phoneNumber: "+91 94432 99887",
    month: "October",
    year: 2026,
    amount: 1400,
    status: "Paid",
    paymentDate: "2026-10-02",
    paymentMethod: "UPI",
    transactionId: "UPI/9837192837/GPAY",
    notes: "Intermediate Batch Fee"
  },
  {
    id: "fee-3",
    receiptNumber: "MSK-REC-2026-1003",
    studentId: "MSK-2024-003",
    studentName: "M. Tharun Prasath",
    parentName: "P. Muthuraman",
    phoneNumber: "+91 97914 44556",
    month: "October",
    year: 2026,
    amount: 1800,
    status: "Pending",
    notes: "Fee due for current month"
  },
  {
    id: "fee-4",
    receiptNumber: "MSK-REC-2026-1004",
    studentId: "MSK-2025-014",
    studentName: "R. Priyadarshini",
    parentName: "G. Ramalingam",
    phoneNumber: "+91 99522 33441",
    month: "October",
    year: 2026,
    amount: 1200,
    status: "Paid",
    paymentDate: "2026-10-02",
    paymentMethod: "UPI",
    transactionId: "UPI/3928172938/PHONEPE",
    notes: "Beginners Batch Regular Fee"
  }
];

const INITIAL_REGISTRATIONS: MatchRegistration[] = [
  {
    id: "reg-1",
    registrationId: "MATCH-2026-881",
    eventId: "evt-1",
    eventName: "3rd State Level Open Silambam Tournament 2026",
    playerName: "K. Surya",
    dob: "2009-05-14",
    gender: "Male",
    ageCategory: "Junior (14-17)",
    eventCategory: "Single Stick Point Combat",
    phoneNumber: "+91 98412 34567",
    academyName: "Veera Thamizhan Silambam, Madurai",
    previousAchievements: "State Bronze 2025",
    emergencyContact: "+91 98412 34568",
    entryFee: 450,
    paymentStatus: "Paid",
    transactionRef: "UPI/MATCH/7729103",
    registeredAt: "2026-09-28T14:30:00.000Z"
  }
];

class AcademyDatabase {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadDatabase();
  }

  private normalizeData(parsed: any): DatabaseSchema {
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Parsed database content is not an object');
    }
    return {
      settings: { ...INITIAL_SETTINGS, ...(parsed.settings && typeof parsed.settings === 'object' ? parsed.settings : {}) },
      students: Array.isArray(parsed.students) ? parsed.students : INITIAL_STUDENTS,
      schedules: Array.isArray(parsed.schedules) ? parsed.schedules : INITIAL_SCHEDULES,
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : INITIAL_ACHIEVEMENTS,
      gallery: Array.isArray(parsed.gallery) ? parsed.gallery : INITIAL_GALLERY,
      events: Array.isArray(parsed.events) ? parsed.events : INITIAL_EVENTS,
      fees: Array.isArray(parsed.fees) ? parsed.fees : INITIAL_FEES,
      matchRegistrations: Array.isArray(parsed.matchRegistrations) ? parsed.matchRegistrations : INITIAL_REGISTRATIONS,
      contactMessages: Array.isArray(parsed.contactMessages) ? parsed.contactMessages : [],
      adminSessionToken: typeof parsed.adminSessionToken === 'string' ? parsed.adminSessionToken : undefined
    };
  }

  private cleanJsonString(str: string): string {
    if (!str) return '';
    // Strip UTF-8 BOM if present
    if (str.charCodeAt(0) === 0xFEFF) {
      str = str.slice(1);
    }
    // Remove any additional zero-width or non-printable control characters before JSON start
    return str.replace(/^\uFEFF+/, '').replace(/^[\u200B\u200C\u200D\uFEFF]/g, '').trim();
  }

  private tryAutoRepairJson(raw: string): any | null {
    try {
      const cleaned = this.cleanJsonString(raw);
      // Attempt 1: Direct parse after cleaning BOM
      try {
        return JSON.parse(cleaned);
      } catch {}

      // Attempt 2: Extract text between first '{' and last '}'
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const extracted = cleaned.substring(firstBrace, lastBrace + 1);
        try {
          return JSON.parse(extracted);
        } catch {}

        // Attempt 3: Remove trailing commas before } and ]
        const noTrailingCommas = extracted.replace(/,\s*([\]\}])/g, '$1');
        try {
          return JSON.parse(noTrailingCommas);
        } catch {}
      }
    } catch {}
    return null;
  }

  private loadDatabase(): DatabaseSchema {
    if (!fs.existsSync(DB_DIR)) {
      try {
        fs.mkdirSync(DB_DIR, { recursive: true });
      } catch (err) {
        console.error('Failed to create database directory:', err);
      }
    }

    // 1. Try reading the main database file
    if (fs.existsSync(DB_FILE)) {
      let fileContent = '';
      try {
        fileContent = fs.readFileSync(DB_FILE, 'utf-8');
      } catch (readErr) {
        console.error(`Failed to read database file at ${DB_FILE}:`, readErr);
      }

      if (fileContent && fileContent.trim().length > 0) {
        const cleanedContent = this.cleanJsonString(fileContent);
        try {
          const parsed = JSON.parse(cleanedContent);
          const normalized = this.normalizeData(parsed);
          // Keep backup up-to-date after successful load
          try {
            fs.copyFileSync(DB_FILE, DB_BACKUP_FILE);
          } catch {}
          return normalized;
        } catch (parseErr) {
          console.error(`[Database Warning] JSON parsing error in ${DB_FILE}:`, parseErr);

          // Preserve the corrupted file immediately for recovery
          const corruptBackupPath = path.join(DB_DIR, `academy_db.corrupted-${Date.now()}.json`);
          try {
            fs.copyFileSync(DB_FILE, corruptBackupPath);
            console.warn(`[Database Recovery] Preserved original raw database file at: ${corruptBackupPath}`);
          } catch (backupCorruptErr) {
            console.error('Failed to preserve corrupted file:', backupCorruptErr);
          }

          // Try automatic repair of common JSON corruptions (BOM, trailing commas, extra padding)
          const repaired = this.tryAutoRepairJson(fileContent);
          if (repaired) {
            console.info('[Database Recovery] Successfully auto-repaired database JSON syntax.');
            const normalized = this.normalizeData(repaired);
            this.saveData(normalized);
            return normalized;
          }

          // Try restoring from existing backup file if repair failed
          if (fs.existsSync(DB_BACKUP_FILE)) {
            try {
              console.warn('[Database Recovery] Attempting restore from existing backup file...');
              const backupRaw = fs.readFileSync(DB_BACKUP_FILE, 'utf-8');
              const cleanedBackup = this.cleanJsonString(backupRaw);
              const parsedBackup = JSON.parse(cleanedBackup);
              const normalized = this.normalizeData(parsedBackup);
              console.info('[Database Recovery] Successfully recovered data from academy_db.backup.json.');
              this.saveData(normalized);
              return normalized;
            } catch (backupRestoreErr) {
              console.error('[Database Recovery] Backup file also failed to parse:', backupRestoreErr);
            }
          }
        }
      }
    } else if (fs.existsSync(DB_BACKUP_FILE)) {
      // Main DB file missing, but backup exists
      try {
        console.warn('[Database Recovery] Database file missing, restoring from backup file...');
        const backupRaw = fs.readFileSync(DB_BACKUP_FILE, 'utf-8');
        const cleanedBackup = this.cleanJsonString(backupRaw);
        const parsedBackup = JSON.parse(cleanedBackup);
        const normalized = this.normalizeData(parsedBackup);
        this.saveData(normalized);
        return normalized;
      } catch (backupErr) {
        console.error('Failed to load from backup file:', backupErr);
      }
    }

    // Fallback: If file did not exist or was totally unrecoverable
    console.warn('[Database] Initializing with default seed data.');
    const defaultData: DatabaseSchema = {
      settings: INITIAL_SETTINGS,
      students: INITIAL_STUDENTS,
      schedules: INITIAL_SCHEDULES,
      achievements: INITIAL_ACHIEVEMENTS,
      gallery: INITIAL_GALLERY,
      events: INITIAL_EVENTS,
      fees: INITIAL_FEES,
      matchRegistrations: INITIAL_REGISTRATIONS,
      contactMessages: []
    };

    // If DB_FILE does NOT exist, save default seed.
    // If DB_FILE exists but was corrupted, do NOT overwrite it; only use seed in-memory to prevent data loss.
    if (!fs.existsSync(DB_FILE)) {
      this.saveData(defaultData);
    }
    return defaultData;
  }

  private saveData(data: DatabaseSchema): void {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      // 1. Serialize data
      const jsonContent = JSON.stringify(data, null, 2);

      // 2. Validate JSON before writing
      JSON.parse(jsonContent);

      // 3. Write to temporary file first to prevent partial/truncated writes
      const tempFile = path.join(DB_DIR, `.academy_db.tmp-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.json`);
      fs.writeFileSync(tempFile, jsonContent, 'utf-8');

      // 4. Verify temporary file was written completely
      const writtenContent = fs.readFileSync(tempFile, 'utf-8');
      if (!writtenContent || writtenContent.length === 0) {
        try { fs.unlinkSync(tempFile); } catch {}
        throw new Error('Temporary database write resulted in empty file');
      }
      JSON.parse(writtenContent);

      // 5. Update backup file before replacing existing file
      if (fs.existsSync(DB_FILE)) {
        try {
          fs.copyFileSync(DB_FILE, DB_BACKUP_FILE);
        } catch (backupErr) {
          console.warn('[Database] Could not update backup copy before save:', backupErr);
        }
      }

      // 6. Atomically replace database file
      try {
        fs.renameSync(tempFile, DB_FILE);
      } catch (renameErr) {
        // Fallback for Windows file system locks
        fs.copyFileSync(tempFile, DB_FILE);
        try {
          fs.unlinkSync(tempFile);
        } catch {}
      }
    } catch (err) {
      console.error('Failed to write database file safely:', err);
    }
  }

  public getSettings(): AcademySettings {
    return this.data.settings;
  }

  public updateSettings(newSettings: Partial<AcademySettings>): AcademySettings {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.saveData(this.data);
    return this.data.settings;
  }

  public getStudents(): Student[] {
    return this.data.students;
  }

  public getPublicStudents(): Partial<Student>[] {
    return this.data.students
      .filter(s => s.isPublicProfile && s.status === 'Active')
      .map(s => ({
        id: s.id,
        studentId: s.studentId,
        fullName: s.fullName,
        photoUrl: s.photoUrl,
        age: s.age,
        category: s.category,
        batchName: s.batchName,
        joiningDate: s.joiningDate,
        weaponSpecialty: s.weaponSpecialty,
        achievementsCount: s.achievementsCount,
        competitionHistory: s.competitionHistory
      }));
  }

  public saveStudent(student: Student): Student {
    const idx = this.data.students.findIndex(s => s.id === student.id);
    if (idx >= 0) {
      this.data.students[idx] = student;
    } else {
      this.data.students.push(student);
    }
    this.saveData(this.data);
    return student;
  }

  public deleteStudent(id: string): boolean {
    const initialLen = this.data.students.length;
    this.data.students = this.data.students.filter(s => s.id !== id);
    this.saveData(this.data);
    return this.data.students.length < initialLen;
  }

  public getSchedules(): TrainingSchedule[] {
    return this.data.schedules;
  }

  public saveSchedule(schedule: TrainingSchedule): TrainingSchedule {
    const idx = this.data.schedules.findIndex(s => s.id === schedule.id);
    if (idx >= 0) {
      this.data.schedules[idx] = schedule;
    } else {
      this.data.schedules.push(schedule);
    }
    this.saveData(this.data);
    return schedule;
  }

  public deleteSchedule(id: string): boolean {
    this.data.schedules = this.data.schedules.filter(s => s.id !== id);
    this.saveData(this.data);
    return true;
  }

  public getAchievements(): Achievement[] {
    return this.data.achievements;
  }

  public saveAchievement(achievement: Achievement): Achievement {
    const idx = this.data.achievements.findIndex(a => a.id === achievement.id);
    if (idx >= 0) {
      this.data.achievements[idx] = achievement;
    } else {
      this.data.achievements.unshift(achievement);
    }
    this.saveData(this.data);
    return achievement;
  }

  public deleteAchievement(id: string): boolean {
    this.data.achievements = this.data.achievements.filter(a => a.id !== id);
    this.saveData(this.data);
    return true;
  }

  public getGallery(): GalleryItem[] {
    return this.data.gallery;
  }

  public saveGalleryItem(item: GalleryItem): GalleryItem {
    const idx = this.data.gallery.findIndex(g => g.id === item.id);
    if (idx >= 0) {
      this.data.gallery[idx] = item;
    } else {
      this.data.gallery.unshift(item);
    }
    this.saveData(this.data);
    return item;
  }

  public deleteGalleryItem(id: string): boolean {
    this.data.gallery = this.data.gallery.filter(g => g.id !== id);
    this.saveData(this.data);
    return true;
  }

  public getEvents(): EventItem[] {
    return this.data.events;
  }

  public saveEvent(event: EventItem): EventItem {
    const idx = this.data.events.findIndex(e => e.id === event.id);
    if (idx >= 0) {
      this.data.events[idx] = event;
    } else {
      this.data.events.unshift(event);
    }
    this.saveData(this.data);
    return event;
  }

  public deleteEvent(id: string): boolean {
    this.data.events = this.data.events.filter(e => e.id !== id);
    this.saveData(this.data);
    return true;
  }

  public getFees(): FeePayment[] {
    return this.data.fees;
  }

  public saveFee(fee: FeePayment): FeePayment {
    const idx = this.data.fees.findIndex(f => f.id === fee.id);
    if (idx >= 0) {
      this.data.fees[idx] = fee;
    } else {
      this.data.fees.unshift(fee);
    }
    this.saveData(this.data);
    return fee;
  }

  public getMatchRegistrations(): MatchRegistration[] {
    return this.data.matchRegistrations;
  }

  public saveMatchRegistration(reg: MatchRegistration): MatchRegistration {
    const idx = this.data.matchRegistrations.findIndex(r => r.id === reg.id);
    if (idx >= 0) {
      this.data.matchRegistrations[idx] = reg;
    } else {
      this.data.matchRegistrations.unshift(reg);
    }
    // Update event slot count
    const event = this.data.events.find(e => e.id === reg.eventId);
    if (event && event.availableSlots > 0) {
      event.availableSlots -= 1;
      if (event.availableSlots <= 5 && event.availableSlots > 0) {
        event.status = 'Filling Fast';
      } else if (event.availableSlots <= 0) {
        event.status = 'Closed';
      }
    }
    this.saveData(this.data);
    return reg;
  }

  public getContactMessages(): ContactMessage[] {
    return this.data.contactMessages;
  }

  public addContactMessage(msg: Omit<ContactMessage, 'id' | 'date' | 'status'>): ContactMessage {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...msg,
      date: new Date().toISOString(),
      status: 'New'
    };
    this.data.contactMessages.unshift(newMsg);
    this.saveData(this.data);
    return newMsg;
  }

  public getDashboardStats() {
    const totalStudents = this.data.students.length;
    const activeStudents = this.data.students.filter(s => s.status === 'Active').length;
    const paidFees = this.data.fees.filter(f => f.status === 'Paid');
    const pendingFees = this.data.fees.filter(f => f.status === 'Pending');

    const totalCollected = paidFees.reduce((acc, f) => acc + (f.amount || 0), 0);
    const totalPending = pendingFees.reduce((acc, f) => acc + (f.amount || 0), 0);

    const upcomingEvents = this.data.events.filter(e => e.status !== 'Completed').length;
    const matchRegistrationsCount = this.data.matchRegistrations.length;

    // Monthly breakdown data for charts
    const monthlyFeeCollection = [
      { month: 'Jun', collected: 36000, pending: 4800 },
      { month: 'Jul', collected: 42000, pending: 3600 },
      { month: 'Aug', collected: 45600, pending: 2400 },
      { month: 'Sep', collected: 48000, pending: 1800 },
      { month: 'Oct', collected: totalCollected, pending: totalPending }
    ];

    const studentGrowth = [
      { month: 'May', students: 38 },
      { month: 'Jun', students: 46 },
      { month: 'Jul', students: 54 },
      { month: 'Aug', students: 68 },
      { month: 'Sep', students: 78 },
      { month: 'Oct', students: totalStudents }
    ];

    return {
      totalStudents,
      activeStudents,
      totalCollected,
      totalPending,
      upcomingEvents,
      matchRegistrationsCount,
      monthlyFeeCollection,
      studentGrowth
    };
  }
}

export const db = new AcademyDatabase();
