import React, { useState, memo } from "react";
import { QuestionData } from "../../types/SurveyFormTypes";

import { StarIcon as StarIconOutlined } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

interface SurveyStarRatingQuestionProps {
  question: QuestionData;
  onRatingSelect: (selectedRating: number) => void;
}

const SurveyStarRatingQuestion: React.FC<SurveyStarRatingQuestionProps> = memo(
  ({ question, onRatingSelect }) => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const handleRatingChange = (rating: number) => {
      setSelectedRating(rating);
      onRatingSelect(rating);
    };

    return (
      <div className="">
        <h2 className="text-xl font-bold mb-3">{question.question}</h2>
        <div className="flex justify-center items-center space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onMouseEnter={() => setHoverRating(rating)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => handleRatingChange(rating)}
              className={`${
                (selectedRating !== null && selectedRating >= rating) ||
                (hoverRating !== null && hoverRating >= rating)
                  ? "text-yellow-500"
                  : "text-gray-400"
              }`}
            >
              {(selectedRating !== null && selectedRating >= rating) ||
              (hoverRating !== null && hoverRating >= rating) ? (
                <StarIconSolid className="w-6 h-6" />
              ) : (
                <StarIconOutlined className="w-6 h-6" />
              )}
              <span>{rating}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
);

export { SurveyStarRatingQuestion };
