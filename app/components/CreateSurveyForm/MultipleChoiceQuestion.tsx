interface MultipleChoiceQuestionProps {
  newQuestionText: string;
  setNewQuestionText: React.Dispatch<React.SetStateAction<string>>;
  handleAddQuestion: (answerType: string) => void;
  newQuestionType: string;
}

export default function MultipleChoiceQuestion({
  newQuestionText,
  setNewQuestionText,
  handleAddQuestion,
  newQuestionType,
}: MultipleChoiceQuestionProps) {
  return (
    <div className="container">
      <input
        type="text"
        value={newQuestionText}
        onChange={(e) => setNewQuestionText(e.target.value)}
        placeholder="Question"
        className="inputField mr-2"
      />
      <button
        className="btnWrapper my-4"
        type="button"
        onClick={() => handleAddQuestion(newQuestionType)}
      >
        Add Question
      </button>
    </div>
  );
}
