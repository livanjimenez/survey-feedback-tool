import React from "react";

import { QuestionType } from "@/app/types/QuestionTypes";

interface QuestionProps {
  data: QuestionType;
}

const Questions: React.FC<QuestionProps> = ({ data }) => {
  switch (data.type) {
    case "multipleChoice":
      return (
        <div>
          <h2 className="text-xl font-bold mb-2">{data.data.question}</h2>
          {data.data.choices.map((choice, index) => (
            <label key={index} className="block">
              <input
                type={data.data.answerType}
                name={data.data.question}
                value={choice.text}
                className="mr-2"
              />
              {choice.text}
            </label>
          ))}
        </div>
      );

    case "writeIn":
      return (
        <div>
          <h2 className="text-xl font-bold mb-2">{data.data.question}</h2>
          <textarea
            placeholder="Your answer here..."
            className="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
            readOnly
          />
        </div>
      );

    case "starRating":
      return (
        <div>
          <h2 className="text-xl font-bold mb-3">{data.data.question}</h2>
          <div className="flex justify-center items-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button key={rating} type="button" className="text-gray-400">
                ☆<span>{rating}</span>
              </button>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default Questions;
