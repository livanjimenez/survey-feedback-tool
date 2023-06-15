import { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../styles/surveyStyles.css";
import { WriteInQuestion } from "./WriteInQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { StarRatingQuestion } from "./StarRatingQuestion";

import { QuestionData, QuestionType } from "../../../types/SurveyFormTypes";

type FormData = {
  type: QuestionType;
};

export function QuestionTypeSelection({
  onSelection,
}: {
  onSelection: (type: QuestionType, question: QuestionData) => void;
}) {
  const [type, setType] = useState<QuestionType | "">("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleTypeSelection = (data: FormData) => {
    setType(data.type);
  };

  const handleQuestionSubmit = (questions: QuestionData[]) => {
    // If you only expect one question, you can simply take the first one
    const question = questions[0];
    onSelection(type as QuestionType, question);
    setType(""); // reset type after question is added
  };

  const handleBack = () => {
    setType(""); // reset type when back button is clicked
  };

  return (
    <div className="form flex flex-col items-center justify-center m-8">
      <div className="flex-1">
        {type === "" ? (
          <form onSubmit={handleSubmit(handleTypeSelection)}>
            <label className="block">
              <span className="text-gray-700">Question Type:</span>
              <select
                {...register("type", { required: true })}
                className="input"
              >
                <option value="">--Please choose an option--</option>
                <option value="writeIn">Write In</option>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="starRating">Star Rating</option>
              </select>
            </label>
            {errors.type && <p>Please select a question type.</p>}
            <button type="submit" className="button">
              Next
            </button>
          </form>
        ) : (
          <>
            {type === "writeIn" && (
              <WriteInQuestion
                onSubmit={handleQuestionSubmit}
                onBack={handleBack}
              />
            )}
            {type === "multipleChoice" && (
              <MultipleChoiceQuestion
                onSubmit={handleQuestionSubmit}
                onBack={handleBack}
              />
            )}
            {type === "starRating" && (
              <StarRatingQuestion
                onSubmit={handleQuestionSubmit}
                onBack={handleBack}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
