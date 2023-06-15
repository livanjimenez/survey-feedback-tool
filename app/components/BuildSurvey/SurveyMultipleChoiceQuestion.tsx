import React, { useState } from "react";
import { QuestionData } from "../../types/SurveyFormTypes";

interface SurveyMultipleChoiceQuestionProps {
  question: QuestionData;
}

const SurveyMultipleChoiceQuestion: React.FC<
  SurveyMultipleChoiceQuestionProps
> = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h2>{question.question}</h2>
      {question.choices.map((choice, index) => (
        <div key={index}>
          <label>
            <input
              type={question.answerType}
              name={`question-${question.question}`}
              value={choice.text}
              checked={selectedOption === choice.text}
              onChange={handleOptionChange}
            />
            {choice.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export { SurveyMultipleChoiceQuestion };
