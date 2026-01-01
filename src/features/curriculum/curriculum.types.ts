export interface Subject {
  id: number;
  name: string;
  slug: string;
}

export interface ClassLevel {
  id: number;
  name: string;
  sortOrder: number;
}

export interface Theme {
  id: number;
  name: string;
  subject: Subject;
  classLevel: ClassLevel;
}

export interface SubTheme {
  id: number;
  name: string;
  theme: Theme;
}

export interface Topic {
  id: number;
  name: string;
  subTheme: SubTheme;
  performanceObjectives: string[];
  content: string[];
  teacherActivities: string[];
  pupilActivities: string[];
  materials: string[];
  evaluationGuide: string[];
  createdAt: string; // ISO Date string
}