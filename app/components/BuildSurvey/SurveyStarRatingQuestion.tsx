import React, { useState } from "react";
import { QuestionData } from "../../types/SurveyFormTypes";

interface SurveyStarRatingQuestionProps {
  question: QuestionData;
  onRatingSelect: (selectedRating: number) => void;
}

const SurveyStarRatingQuestion: React.FC<SurveyStarRatingQuestionProps> = ({
  question,
  onRatingSelect,
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    onRatingSelect(rating);
  };

  return (
    <div>
      <h2>{question.question}</h2>
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          onClick={() => handleRatingChange(rating)}
          style={{ fontWeight: selectedRating === rating ? "bold" : "normal" }}
        >
          {rating}
        </button>
      ))}
    </div>
  );
};

export { SurveyStarRatingQuestion };
