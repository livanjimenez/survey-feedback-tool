type WriteInQuestionType = {
  data: {
    answerType: "text";
    question: string;
  };
  type: "writeIn";
};

type MultipleChoiceQuestionType = {
  data: {
    answerType: "radio" | "checkbox";
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
