import { useState } from "react";

interface WriteInQuestionProps {
  questionId: string;
  handleAddQuestion: (answerType: string) => void;
  newQuestionType: string;
  handleDeleteQuestion: (questionId: string) => void;
}

export default function WriteInQuestion({
  handleAddQuestion,
  newQuestionType,
  handleDeleteQuestion,
  questionId,
}: WriteInQuestionProps) {
  const [newQuestionText, setNewQuestionText] = useState("");

  return (
    <div className="container">
      <input
        type="text"
        value={newQuestionText}
        onChange={(e) => setNewQuestionText(e.target.value)}
        placeholder="Write In Question"
        className="inputField mr-2"
      />
      <button
        className="btnWrapper my-4"
        type="button"
        onClick={() => handleAddQuestion(newQuestionType)}
      >
        Add Question
      </button>
      <button
        className="btnWrapper my-4 ml-2"
        type="button"
        onClick={() => handleDeleteQuestion(questionId)}
      >
        Delete Question
      </button>
    </div>
  );
}
