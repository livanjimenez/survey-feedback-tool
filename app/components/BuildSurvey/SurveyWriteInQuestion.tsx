import React, { useState } from "react";
import { QuestionData } from "../../types/SurveyFormTypes";

interface SurveyWriteInQuestionProps {
  question: QuestionData;
  onTextChange: (text: string) => void;
}

const SurveyWriteInQuestion: React.FC<SurveyWriteInQuestionProps> = ({
  question,
  onTextChange,
}) => {
  const [answer, setAnswer] = useState<string>("");

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
    onTextChange(event.target.value);
  };

  return (
    <div>
      <h2>{question.question}</h2>
      <input type="text" value={answer} onChange={handleAnswerChange} />
    </div>
  );
};

export { SurveyWriteInQuestion };
