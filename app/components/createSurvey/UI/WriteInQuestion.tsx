import { Question } from "@/app/types/SurveyFormTypes";
import { WRITE_IN_QUESTION } from "@/app/constants/index";

interface WriteInQuestionProps {
  question: Question;
  value: string;
  setValue: (value: string) => void;
  handleAddQuestion: (type: string) => void;
  handleDeleteQuestion: (id: string) => void;
}

const WriteInQuestion = ({
  question,
  value,
  setValue,
  handleAddQuestion,
  handleDeleteQuestion,
}: WriteInQuestionProps) => {
  return (
    <div className="container">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write In Question"
        className="inputField mr-2"
      />
      <button
        className="btnWrapper my-4"
        type="button"
        // QuestionType is writeIn, so we pass "writeIn" to handleAddQuestion
        onClick={() => handleAddQuestion(WRITE_IN_QUESTION)}
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

export default WriteInQuestion;
