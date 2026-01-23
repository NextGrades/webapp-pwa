// Define types
export type ExerciseConfig = {
  name: string;
  inputType: "text";
  prompt: string;
};

export type FillInBlankData = {
  class_level: number;
  exercise_type: "fill-in-blank";
  instructions: string;
  exercises: {
    sentence_with_blank: string;
    correct_answer: string;
  }[];
};

export type SpellingData = {
  class_level: number;
  exercise_type: "academic-spelling";
  instructions: string;
  exercises: {
    word: string;
    correct_answer: string;
    difficulty: string; // or "easy" | "medium" | "hard"
  }[];
};

export type QuickExerciseData = FillInBlankData | SpellingData;

export type ExerciseName =
  | "academic-spelling"
  | "fill-in-blank"
  // | "one-word-answer"
  // | "correct-the-error";

export const excerciseScope = {
  scope: {
    minClass: "Primary 3",
    maxClass: "JSS 3",
    country: "NG",
    curriculum: ["NERDC", "WAEC-ready"],
  },
  exerciseTypes: [],
  difficultyLevels: [],
  subjects: [],
  dailyFlowTemplates: [],
  gradingRules: {},
};

export const exerciseConfig = {
  exerciseTypes: [
    {
      id: "academic_spelling",
      name: "Academic Spelling",
      inputType: "text",
      timeLimitSeconds: 30,
      autoGraded: true,
      subjects: ["All"],
      minClass: "Primary 3",
      maxClass: "JSS 3",
      skills: ["spelling", "accuracy", "vocabulary"],
      promptTemplate: "Spell the word: {{word}}",
    },
    {
      id: "fill_in_blank",
      name: "Fill in the Blank",
      inputType: "text",
      timeLimitSeconds: 45,
      autoGraded: true,
      subjects: ["All"],
      skills: ["concept_recall"],
      promptTemplate: "{{sentenceWithBlank}}",
    },
    {
      id: "one_word_answer",
      name: "One Word Answer",
      inputType: "text",
      timeLimitSeconds: 20,
      autoGraded: true,
      subjects: ["All"],
      skills: ["recall"],
      promptTemplate: "{{question}}",
    },
    {
      id: "correct_the_error",
      name: "Correct the Mistake",
      inputType: "text",
      timeLimitSeconds: 40,
      autoGraded: true,
      subjects: ["All"],
      skills: ["critical_thinking", "accuracy"],
      promptTemplate: "Correct this statement: {{statement}}",
    },
    {
      id: "match_terms",
      name: "Match the Term",
      inputType: "match",
      timeLimitSeconds: 45,
      autoGraded: true,
      subjects: ["All"],
      skills: ["association"],
      promptTemplate: "Match each term with its correct option",
    },
    {
      id: "symbol_translation",
      name: "Symbol Translation",
      inputType: "choice",
      timeLimitSeconds: 30,
      autoGraded: true,
      subjects: ["Math", "Basic Science", "ICT"],
      skills: ["symbol_literacy"],
      promptTemplate: "What does this symbol mean: {{symbol}}?",
    },
    {
      id: "sorting",
      name: "Sorting",
      inputType: "drag",
      timeLimitSeconds: 45,
      autoGraded: true,
      subjects: ["All"],
      skills: ["classification"],
      promptTemplate: "Sort the items correctly",
    },
    {
      id: "definition_snap",
      name: "Definition Snap",
      inputType: "text",
      timeLimitSeconds: 60,
      autoGraded: true,
      subjects: ["All"],
      skills: ["conceptual_clarity"],
      promptTemplate: "Define {{term}} in one sentence",
    },
  ],
};

export const difficultyConfig = {
  difficultyLevels: [
    {
      level: 1,
      label: "Primary 3–4",
      wordLengthMax: 7,
      sentenceComplexity: "simple",
    },
    {
      level: 2,
      label: "Primary 5–6",
      wordLengthMax: 10,
      sentenceComplexity: "moderate",
    },
    {
      level: 3,
      label: "JSS 1–2",
      wordLengthMax: 14,
      sentenceComplexity: "complex",
    },
    {
      level: 4,
      label: "JSS 3",
      wordLengthMax: 18,
      sentenceComplexity: "advanced",
    },
  ],
};

export const dailyFlowConfig = {
  dailyFlowTemplates: [
    {
      id: "primary_flow",
      classes: ["Primary 3", "Primary 4", "Primary 5"],
      maxDurationMinutes: 2,
      exercises: ["academic_spelling", "fill_in_blank", "match_terms"],
    },
    {
      id: "upper_primary_flow",
      classes: ["Primary 6"],
      maxDurationMinutes: 3,
      exercises: ["academic_spelling", "correct_the_error", "one_word_answer"],
    },
    {
      id: "jss_flow",
      classes: ["JSS 1", "JSS 2", "JSS 3"],
      maxDurationMinutes: 4,
      exercises: [
        "academic_spelling",
        "correct_the_error",
        "symbol_translation",
        "definition_snap",
      ],
    },
  ],
};

export const gradingConfig = {
  gradingRules: {
    passScore: 0.7,
    retryAllowed: true,
    maxRetries: 2,
    adaptation: {
      increaseDifficultyAfter: 3,
      decreaseDifficultyAfter: 2,
    },
    feedback: {
      onCorrect: "Great job!",
      onIncorrect: "Review this concept and try again.",
    },
  },
};
