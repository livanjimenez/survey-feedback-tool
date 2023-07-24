export interface MultipleChoiceQuestionData {
  question: string;
  choices: ChoiceData[];
  answerType: "radio" | "checkbox";
}

export interface WriteInQuestionData {
  question: string;
}

export interface StarRatingQuestionData {
  question: string;
}

export type QuestionType = "writeIn" | "multipleChoice" | "starRating";

export type QuestionData =
  | MultipleChoiceQuestionData
  | WriteInQuestionData
  | StarRatingQuestionData;

export interface QuestionProps {
  onSubmit: (data: QuestionData[]) => void;
  onBack: () => void;
}

export interface ChoiceData {
  text: string;
}

export interface AppearanceData {
  bgColor: string;
  fontColor: string;
}

export interface SurveyAppearanceProps {
  onNext: (data: AppearanceData) => void;
  onBack: () => void;
}

export interface Question {
  id?: string;
  type: QuestionType;
  data: QuestionData;
}

export interface Appearance {
  data: AppearanceData;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
}

export interface SurveyData {
  title: string;
  description: string;
  questions: Question[];
}

export function isMultipleChoiceQuestionData(
  data: QuestionData
): data is MultipleChoiceQuestionData {
  return "choices" in data && "answerType" in data;
}

export function isStarRatingQuestionData(
  data: QuestionData
): data is StarRatingQuestionData {
  return "question" in data && !("choices" in data) && !("answerType" in data);
}

export function isWriteInQuestionData(
  data: QuestionData
): data is WriteInQuestionData {
  return "question" in data && !("choices" in data) && !("answerType" in data);
}

export function isOfType<T extends QuestionData>(
  data: QuestionData,
  key: keyof T
): data is T {
  return key in data;
}
