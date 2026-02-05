export interface CourseTutorResponse {
  courseCode: string;
  courseTitle: string;
  level?: number;
  creditUnits?: number;
  topic: string;
  syllabusReference: string;
  explanation: string;
  keyConcepts: string[];
  workedExamples: string[];
  practicalApplications: string[];
  syllabusCoverage: string[];
  followUpQuestions: string[];
}

export interface GenerateTeachingResponse {
  jobId: string;
  conversationId: string;
}

export interface CourseSummary {
  id: string;
  courseCode: string;
  title: string;
  field: string | null;
  subtopicCount: number;
  isActive: boolean;
}

export type ExamFrequency = "high" | "medium" | "low";
export type CourseType = "core" | "elective" | "general";

export interface CourseSubtopic {
  id: string;
  syllabusReference: string;
  title: string;
  description: string;
  teachingOrder: number;
  examFrequency: ExamFrequency;
  prerequisites: string[];
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CourseData {
  id: string;
  code: string;
  title: string;
  canonicalTitle: string | null;
  level: number;
  creditUnits: number;
  type: CourseType;

  syllabus: string;

  subtopics: CourseSubtopic[];

  syllabusStructured: string[];

  semester: number;
  isActive: boolean;
}

export type FollowUpAIResponse = {
  answer: string;
};
