type WriteInQuestionType = {
  data: {
    answerType: "text";
    question: string;
  };
  type: "writeIn";
};

type MultipleChoiceQuestionType = {
  data: {
    answerType: string;
    question: string;
    choices: { text: string }[];
  };
  type: "multipleChoice";
};

type StarRatingQuestionType = {
  data: {
    answerType: "starRating";
    question: string;
  };
  type: "starRating";
};

export type QuestionType =
  | WriteInQuestionType
  | MultipleChoiceQuestionType
  | StarRatingQuestionType;

export interface SurveyFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  questions: QuestionType[];
  newQuestionType: string;
  setNewQuestionType: React.Dispatch<React.SetStateAction<string>>;
  newQuestionText: string;
  setNewQuestionText: React.Dispatch<React.SetStateAction<string>>;
  newQuestionChoicesArray: string[];
  handleAddChoice: (choice: string) => void;
  handleAddQuestion: (answerType: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
}
