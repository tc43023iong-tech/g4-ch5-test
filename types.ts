export interface VerbRow {
  id: number;
  chinese: string;
  base: string;
  past: string;
  pastParticiple: string;
  presentParticiple: string;
  hiddenFields: ('base' | 'past' | 'pastParticiple' | 'presentParticiple')[];
}

export interface VocabularyQuestion {
  id: number;
  sentencePart1: string;
  sentencePart2: string;
  answer: string;
}

export interface ChoiceQuestion {
  id: number;
  question: string; // The full sentence with a placeholder like "___"
  answer: string;
  hint?: 'check' | 'cross' | null; // For the ✓ / ✗ exercises
  options?: string[]; // If specific options per question, or global
}

export interface TextFillQuestion {
  id: number;
  parts: string[]; // Array of text segments surrounding the inputs. E.g. ["", " they ", " (do)?"] for "Did they do (do)?"
  answers: string[]; // The expected answers for the gaps. E.g. ["Did", "do"]
  verbPrompt?: string; // The text to show in brackets e.g. "(not hit)"
}

export interface StoryLine {
  id: number;
  speaker: 'Alice' | 'Grandpa';
  textParts: string[]; // Segments around the blanks
  answers: string[]; // The correct words for blanks
  hints?: string[]; // Hints for the blanks (e.g. base form verbs)
  options?: string[]; // Optional dropdown/choice options for specific blanks
}

export type ExerciseSection = 'verbs' | 'vocabulary' | 'pronouns' | 'existence' | 'story' | 'simplePast' | 'bonus';

export interface ConfettiProps {
  isActive: boolean;
}