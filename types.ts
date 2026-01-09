
export type StageSlug = 'final_year' | 'mobilization' | 'camp' | 'ppa' | 'cds' | 'clearance' | 'pop';

export interface User {
  id: string;
  name: string;
  email: string;
  batch: string;
  stateCode: string;
  deploymentState: string;
  currentStage: StageSlug;
  isPro: boolean;
  avatarInitials: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  description?: string;
  isCompleted: boolean;
  isMandatory: boolean;
}

export interface CostItem {
  item: string;
  range: string;
}

export interface Stage {
  id: string;
  slug: StageSlug;
  name: string;
  icon: any; 
  color: string;
  overview: string;
  duration: string;
  estimatedCosts: string;
  checklist: ChecklistItem[];
  progress: number;
  dos: string[];
  donts: string[];
  mistakes: { title: string; explanation: string }[];
  documents: { name: string; spec: string; source: string }[];
  costBreakdown: CostItem[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body?: string; 
  category: string;
  readTime: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  views: number;
  lastVerifiedDate?: Date;
  source?: string;
}

export interface Deadline {
  id: string;
  title: string;
  date: Date;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  stage: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface StateGuide {
  id: string;
  slug: string;
  stateName: string;
  flagEmoji: string;
  campLocation: {
    name: string;
    address: string;
    facilities: { label: string; info: string }[];
    survivalTips: string[];
  };
  livingCosts: {
    monthlyRange: string;
    popularAreas: { name: string; distance: string; pros: string }[];
    accommodation: { type: string; price: string }[];
    transport: { mode: string; avgPrice: string }[];
  };
  ppaLandscape: {
    orgTypes: { type: string; percentage: number }[];
    avgSalary: string;
    extraAllowances: string;
    topSectors: string[];
    commonLocations: { name: string; description: string }[];
    bestSectors: { name: string; reason: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[];
  };
  safetyCulture: {
    rating: 'Safe' | 'Moderate' | 'Caution';
    areasToAvoid: string[];
    customs: string[];
    localPhrases: { phrase: string; meaning: string }[];
    emergencyContacts: { label: string; phone: string }[];
  };
  opportunities: {
    sideHustles: { title: string; income: string }[];
    skills: string[];
    networking: string[];
  };
}

export interface CDSProject {
  id: string;
  title: string;
  category: string;
  budget: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  fullDescription: string;
  beneficiaries: string;
  beneficiaryDetails: {
    who: string;
    impact: string;
    reached: string;
  };
  requirements: string[];
  budgetTable: { item: string; quantity: string; cost: string; total: string }[];
  timeline: { week: string; milestone: string }[];
  approvalTips: string[];
  successMetrics: string[];
}

export type DocumentType = 
  | 'call_up_letter' 
  | 'camp_discharge' 
  | 'ppa_posting' 
  | 'cds_clearance' 
  | 'discharge_certificate' 
  | 'medical_report' 
  | 'redeployment_letter' 
  | 'custom';

export interface NYSCDocument {
  id: string;
  userId: string;
  documentType: DocumentType;
  fileName: string;
  fileUrl: string;
  fileSize: number; // in bytes
  mimeType: string;
  description?: string;
  uploadDate: Date;
  expiryDate?: Date;
  tags: string[];
  isVerified: boolean;
  category: string;
}

export interface RelocationRequest {
  id: string;
  userId: string;
  currentState: string;
  requestedState: string;
  reason: 'medical' | 'marital' | 'security' | 'other';
  eligibilityScore: number;
  isEligible: boolean;
  hasEvidence: boolean;
  evidenceType: string[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  appliedDate?: Date;
  responseDate?: Date;
  createdAt: Date;
}

export interface PPAOrg {
  id: string;
  name: string;
  state: string;
  sector: string;
  allowance: string;
  accommodation: 'Yes' | 'No' | 'Subsidized';
  rating: number;
  reviewsCount: number;
  tags: string[];
  isVerified: boolean;
}

export interface CareerJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Internship';
  isExCorperFriendly: boolean;
  salary?: string;
  postedDate: Date;
}

export interface DownloadableResource {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  category: 'Official' | 'Templates' | 'Blueprints' | 'Career';
  isPremium: boolean;
  downloadCount: number;
}
