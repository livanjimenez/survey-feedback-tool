import React, { useState } from "react";
import Questions from "./Questions";

type WriteInQuestionType = {
  __typename: "WriteInQuestionData";
  question: string;
};

type MultipleChoiceQuestionType = {
  __typename: "MultipleChoiceQuestionData";
  question: string;
  choices: { text: string }[];
};

type StarRatingQuestionType = {
  __typename: "StarRatingQuestionData";
  question: string;
};

type QuestionType =
  | WriteInQuestionType
  | MultipleChoiceQuestionType
  | StarRatingQuestionType;

const SurveyForm: React.FC<{ onSubmit: (data: any) => void }> = ({
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [newQuestionType, setNewQuestionType] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionChoices, setNewQuestionChoices] = useState(""); // for MultipleChoiceQuestionData

  const handleAddQuestion = () => {
    if (newQuestionType && newQuestionText) {
      let newQuestion: QuestionType;
      switch (newQuestionType) {
        case "writeIn":
          newQuestion = {
            __typename: "WriteInQuestionData",
            question: newQuestionText,
          };
          break;
        case "multipleChoice":
          newQuestion = {
            __typename: "MultipleChoiceQuestionData",
            question: newQuestionText,
            choices: newQuestionChoices
              .split(",")
              .map((choice) => ({ text: choice.trim() })),
          };
          break;
        case "starRating":
          newQuestion = {
            __typename: "StarRatingQuestionData",
            question: newQuestionText,
          };
          break;
        default:
          return;
      }
      setQuestions([...questions, newQuestion]);
      setNewQuestionType("");
      setNewQuestionText("");
      setNewQuestionChoices("");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      title,
      description,
      questions,
    };
    onSubmit(data);
  };

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
        <Questions key={index} data={question} />
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

export default SurveyForm;
