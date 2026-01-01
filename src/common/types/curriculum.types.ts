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


export interface TeachingResponse {
  topic: string;
  class_level: number;
  learner_age: number;
  explanation: string;
  examples: string[];
  key_takeaways: string[];
  covered_objectives: string[];
}

export interface ExerciseResponse {
  topic: string;
  class_level: number;
  instructions: string;
  exercises: Array<{
    question: string;
    type:
      | 'multiple_choice'
      | 'short_answer'
      | 'true_false'
      | 'fill_in_the_blank';
    options?: string[];
    correct_answer: string;
    related_objective: string;
  }>;
}
