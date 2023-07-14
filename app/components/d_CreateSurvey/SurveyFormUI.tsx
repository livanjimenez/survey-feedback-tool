import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import { QuestionType } from "@/app/types/QuestionTypes";
import "@/app/styles/formStyles.css";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useDrop } from "react-dnd";
import DroppableArea from "./DroppableArea";

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
  newQuestionChoicesArray: string[];
  handleAddChoice: (choice: string) => void;
  handleAddQuestion: (answerType: string) => void;
  handleDeleteQuestion: (questionId: string) => void;
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
  newQuestionChoicesArray,
  handleAddChoice,
  handleAddQuestion,
  handleDeleteQuestion,
  handleSubmit,
}) => {
  const [newChoice, setNewChoice] = useState("");
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);

  const [, drop] = useDrop(() => ({
    accept: "question",
    drop: () => ({ name: "SurveyFormUI" }),
  }));

  return (
    <form ref={drop} onSubmit={handleSubmit} className="formContainer">
      <div className="inputWrapper">
        {isTitleEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsTitleEditing(false)}
            className="editInput title"
            autoFocus
          />
        ) : (
          <h2 onClick={() => setIsTitleEditing(true)} className="title">
            {title || "Edit Title Here"}
          </h2>
        )}
        <PencilSquareIcon
          className="editIcon"
          onClick={() => setIsTitleEditing(true)}
        />
      </div>

      <div className="inputWrapper">
        {isDescriptionEditing ? (
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setIsDescriptionEditing(false)}
            autoFocus
            className="editInput description"
          />
        ) : (
          <h3
            onClick={() => setIsDescriptionEditing(true)}
            className="description"
          >
            {description || "Edit Description Here"}
          </h3>
        )}
        <PencilSquareIcon
          className="editIcon"
          onClick={() => setIsDescriptionEditing(true)}
        />
      </div>

      <DroppableArea
        handleAddQuestion={handleAddQuestion}
        handleDeleteQuestion={handleDeleteQuestion}
        newQuestionText={newQuestionText}
        setNewQuestionText={setNewQuestionText}
        newQuestionType={newQuestionType}
      />

      {questions.map((question, index) => (
        <Questions key={index} data={question} />
      ))}

      <div className="border-t my-4 border-gray-300" />
      <div className="container">
        <button type="submit" className="btnWrapper">
          Publish Survey
        </button>
      </div>
    </form>
  );
};

export default SurveyFormUI;
