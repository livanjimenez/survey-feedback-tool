import React, { useState } from "react";
import {
  QuestionData,
  MultipleChoiceQuestionData,
  WriteInQuestionData,
  StarRatingQuestionData,
  isMultipleChoiceQuestionData,
  isStarRatingQuestionData,
  isWriteInQuestionData,
} from "@/app/types/SurveyFormTypes";

interface QuestionProps {
  data: QuestionData;
}

const WriteInQuestion: React.FC<WriteInQuestionData> = ({ question }) => {
  return (
    <div>
      <p>{question}</p>
      <input type="text" placeholder="Your answer here" />
    </div>
  );
};

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionData> = ({
  question,
  choices,
}) => {
  return (
    <div>
      <p>{question}</p>
      {choices.map((choice, index) => (
        <div key={index}>
          <input
            type="radio"
            id={choice.text}
            name={question}
            value={choice.text}
          />
          <label htmlFor={choice.text}>{choice.text}</label>
        </div>
      ))}
    </div>
  );
};

const StarRatingQuestion: React.FC<StarRatingQuestionData> = ({ question }) => {
  const [rating, setRating] = useState<number>(0);
  const starRating = [1, 2, 3, 4, 5];

  return (
    <div>
      <p>{question}</p>
      {starRating.map((star, index) => (
        <button
          key={index}
          onClick={() => setRating(star)}
          style={{ color: star <= rating ? "gold" : "gray" }}
        >
          ☆
        </button>
      ))}
    </div>
  );
};

const Questions: React.FC<QuestionProps> = ({ data }) => {
  if (isMultipleChoiceQuestionData(data)) {
    return <MultipleChoiceQuestion {...data} />;
  } else if (isStarRatingQuestionData(data)) {
    return <StarRatingQuestion {...data} />;
  } else if (isWriteInQuestionData(data)) {
    return <WriteInQuestion {...(data as WriteInQuestionData)} />;
  } else {
    return null;
  }
};

export default Questions;
