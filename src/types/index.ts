export interface AcademySettings {
  academyName: string;
  tamilName: string;
  tagline: string;
  subheading: string;
  aboutStory: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  landmark: string;
  state: string;
  pincode: string;
  instagramUrl: string;
  youtubeUrl: string;
  monthlyFeeDefault: number;
  upiId: string;
  upiName: string;
  headCoachName: string;
  headCoachTitle: string;
  foundedYear: string;
}

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  photoUrl?: string;
  age: number;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  category: 'Sub-Junior' | 'Junior' | 'Senior' | 'Open';
  batchId: string;
  batchName: string;
  joiningDate: string;
  parentName: string;
  phoneNumber: string;
  status: 'Active' | 'Inactive';
  isPublicProfile: boolean;
  weaponSpecialty?: string;
  achievementsCount: number;
  competitionHistory?: string[];
}

export interface TrainingSchedule {
  id: string;
  day: string;
  morningTime: string;
  eveningTime: string;
  batch: string;
  level: 'Beginners' | 'Intermediate' | 'Advanced' | 'Competition Squad' | 'All Levels';
  coach: string;
  fee: number;
  maxSlots: number;
  activeStudents: number;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  competitionName: string;
  year: number;
  location: string;
  level: 'International' | 'National' | 'State' | 'District' | 'Invitational';
  category: string;
  medal: 'Gold' | 'Silver' | 'Bronze' | 'Trophy' | 'Participation';
  playerName: string;
  studentId?: string;
  certificateUrl?: string;
  photoUrl?: string;
  description?: string;
}

export interface GalleryItem {
  id: string;
  album: string;
  category: 'Training' | 'Competitions' | 'Prize Distribution' | 'Events' | 'Team' | 'Training Camps' | 'Certificates';
  imageUrl: string;
  caption: string;
  date: string;
  isCover?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  venue: string;
  organizer: string;
  entryFee: number;
  registrationDeadline: string;
  categories: string[];
  posterUrl: string;
  availableSlots: number;
  totalSlots: number;
  status: 'Open' | 'Filling Fast' | 'Closed' | 'Completed';
  description: string;
  rules?: string[];
}

export interface FeePayment {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  parentName: string;
  phoneNumber: string;
  month: string;
  year: number;
  amount: number;
  status: 'Paid' | 'Pending';
  paymentDate?: string;
  paymentMethod?: 'UPI' | 'Cash' | 'Card' | 'NetBanking';
  transactionId?: string;
  notes?: string;
}

export interface MatchRegistration {
  id: string;
  registrationId: string;
  eventId: string;
  eventName: string;
  playerName: string;
  dob: string;
  gender: 'Male' | 'Female';
  ageCategory: string;
  eventCategory: string;
  phoneNumber: string;
  academyName: string;
  previousAchievements?: string;
  emergencyContact: string;
  entryFee: number;
  paymentStatus: 'Paid' | 'Pending';
  transactionRef?: string;
  registeredAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  status: 'New' | 'Replied' | 'Archived';
}
