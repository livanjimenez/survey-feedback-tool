import { useState } from "react";
import { Question } from "@/app/types/SurveyFormTypes";
import WriteInQuestion from "./UI/WriteInQuestion";
import MultipleChoiceQuestion from "./UI/MultipleChoiceQuestion";
import StarRatingQuestion from "./UI/StarRatingQuestion";

interface QuestionTypeProps {
  question: Question;
}

const QuestionType = ({ question }: QuestionTypeProps) => {
  const [value, setValue] = useState("");

  const handleSetValue = (value: string) => {
    setValue(value);
  };

  // TODO: implement handleAddQuestion and handleDeleteQuestion
  const handleAddQuestion = (type: string) => {
    console.log(type);
  };
  const handleDeleteQuestion = (id: string) => {
    console.log(id);
  };

  switch (question.type) {
    case "writeIn":
      return (
        <WriteInQuestion
          question={question}
          value={value}
          setValue={handleSetValue}
          handleAddQuestion={handleAddQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      );
    case "multipleChoice":
      return (
        <MultipleChoiceQuestion
          question={question}
          value={value}
          setValue={handleSetValue}
          handleAddQuestion={handleAddQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      );
    case "starRating":
      return (
        <StarRatingQuestion
          question={question}
          value={value}
          setValue={handleSetValue}
          handleAddQuestion={handleAddQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      );
    default:
      return null;
  }
};

export default QuestionType;
