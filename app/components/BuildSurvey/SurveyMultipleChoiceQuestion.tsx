import { useState } from "react";
import { MultipleChoiceQuestionData } from "../../types/SurveyFormTypes";

interface SurveyMultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionData;
  onChoiceSelect: (selectedChoice: string) => void;
}

const SurveyMultipleChoiceQuestion: React.FC<
  SurveyMultipleChoiceQuestionProps
> = ({ question, onChoiceSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const choice = event.target.value;
    setSelectedOption(choice);
    onChoiceSelect(choice);
  };

  return (
    <div className="p-4">
      {question.choices.map((choice, index) => (
        <div key={index} className="mb-4">
          <label className="inline-flex items-center">
            <input
              type={question.answerType}
              name={`question-${question.question}`}
              value={choice.text}
              checked={selectedOption === choice.text}
              onChange={handleOptionChange}
              className="mr-2"
            />
            {choice.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export { SurveyMultipleChoiceQuestion };
