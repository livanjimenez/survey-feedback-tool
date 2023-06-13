export interface BasicInfoData {
  title: string;
  description: string;
}

export interface BasicInfoProps {
  title: string;
  description: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export type QuestionType = "writeIn" | "multipleChoice" | "starRating";

export interface QuestionData {
  question: string;
  choices: ChoiceData[];
  answerType: "radio" | "checkbox";
}

export interface QuestionProps {
  onSubmit: (data: QuestionData) => void;
  onBack: () => void;
}

export interface ChoiceData {
  text: string;
}
