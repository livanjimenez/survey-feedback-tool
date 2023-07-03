import React from "react";
import Questions from "./Questions";
import { QuestionType } from "@/app/types/QuestionTypes";

const SurveyFormUI: React.FC<{
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  questions: QuestionType[];
  newQuestionType: string;
  setNewQuestionType: React.Dispatch<React.SetStateAction<string>>;
  newQuestionText: string;
  setNewQuestionText: React.Dispatch<React.SetStateAction<string>>;
  newQuestionChoices: string;
  setNewQuestionChoices: React.Dispatch<React.SetStateAction<string>>;
  handleAddQuestion: () => void;
  handleSubmit: (event: React.FormEvent) => void;
}> = ({
  title,
  setTitle,
  description,
  setDescription,
  questions,
  newQuestionType,
  setNewQuestionType,
  newQuestionText,
  setNewQuestionText,
  newQuestionChoices,
  setNewQuestionChoices,
  handleAddQuestion,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      {questions.map((question, index) => (
        <Questions key={index} data={question.data} />
      ))}
      <label>
        New Question Type:
        <select
          value={newQuestionType}
          onChange={(e) => setNewQuestionType(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          <option value="writeIn">Write In</option>
          <option value="multipleChoice">Multiple Choice</option>
          <option value="starRating">Star Rating</option>
        </select>
      </label>
      <label>
        New Question Text:
        <input
          type="text"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
        />
      </label>
      {newQuestionType === "multipleChoice" && (
        <label>
          Choices (comma separated):
          <input
            type="text"
            value={newQuestionChoices}
            onChange={(e) => setNewQuestionChoices(e.target.value)}
          />
        </label>
      )}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button type="submit">Publish</button>
    </form>
  );
};

export default SurveyFormUI;
