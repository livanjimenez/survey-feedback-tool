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

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswer(event.target.value);
    onTextChange(event.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{question.question}</h2>
      <textarea
        value={answer}
        onChange={handleAnswerChange}
        className="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        rows={3}
      />
    </div>
  );
};

export { SurveyWriteInQuestion };
