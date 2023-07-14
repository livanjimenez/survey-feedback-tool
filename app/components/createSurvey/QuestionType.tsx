import { useState } from "react";
import { Question } from "@/app/types/SurveyFormTypes";
import WriteInQuestion from "./UI/WriteInQuestion";

interface QuestionTypeProps {
  question: Question;
}

const QuestionType = ({ question }: QuestionTypeProps) => {
  const [value, setValue] = useState("");

  const handleSetValue = (value: string) => {
    setValue(value);
  };

  const handleAddQuestion = (type: string) => {
    console.log(type);
  };
  const handleDeleteQuestion = (id: string) => {
    console.log(id);
  };

  switch (question.type) {
    case "writeIn":
      // Render write-in question UI
      return (
        <WriteInQuestion
          question={question}
          value={value}
          setValue={handleSetValue}
          handleAddQuestion={handleAddQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      );
      break;
    case "multipleChoice":
      // Render multiple choice question UI
      break;
    case "starRating":
      // Render star rating question UI
      break;
    default:
      return null;
  }
};

export default QuestionType;
