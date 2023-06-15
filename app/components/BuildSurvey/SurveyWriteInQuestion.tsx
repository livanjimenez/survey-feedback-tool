import React, { useState } from "react";
import { QuestionData } from "../../types/SurveyFormTypes";

interface SurveyWriteInQuestionProps {
  question: QuestionData;
}

const SurveyWriteInQuestion: React.FC<SurveyWriteInQuestionProps> = ({
  question,
}) => {
  const [answer, setAnswer] = useState<string>("");

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  return (
    <div>
      <h2>{question.question}</h2>
      <input type="text" value={answer} onChange={handleAnswerChange} />
    </div>
  );
};

export { SurveyWriteInQuestion };
