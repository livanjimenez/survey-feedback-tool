import { Question } from "@/app/types/SurveyFormTypes";

interface StarRatingQuestionProps {
  question: Question;
  value: string;
  setValue: (value: string) => void;
  handleAddQuestion: (type: string) => void;
  handleDeleteQuestion: (id: string) => void;
}

const StarRatingQuestion = ({
  question,
  value,
  setValue,
  handleAddQuestion,
  handleDeleteQuestion,
}: StarRatingQuestionProps) => {
  return (
    <div className="container">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Star Rating Question"
        className="inputField mr-2"
      />
      <button
        className="btnWrapper my-4"
        type="button"
        //
        // * QuestionType is writeIn, so we pass "writeIn" to handleAddQuestion
        //
        onClick={() => handleAddQuestion("")}
      >
        Add Question
      </button>
      <button
        className="btnWrapper my-4 ml-2"
        type="button"
        onClick={() => handleDeleteQuestion(question.type)}
      >
        Delete Question
      </button>
    </div>
  );
};

export default StarRatingQuestion;
