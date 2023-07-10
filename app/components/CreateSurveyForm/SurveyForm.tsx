import React, { useState } from "react";
import SurveyFormUI from "./SurveyFormUI";
import { QuestionType } from "@/app/types/QuestionTypes";

const SurveyForm: React.FC<{ onSubmit: (data: any) => void }> = ({
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [newQuestionType, setNewQuestionType] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionChoicesArray, setNewQuestionChoicesArray] = useState<
    string[]
  >([]);

  const handleAddChoice = (choice: string) => {
    if (newQuestionChoicesArray.length < 4) {
      setNewQuestionChoicesArray([...newQuestionChoicesArray, choice]);
    }
  };

  const handleAddQuestion = (answerType: string) => {
    if (newQuestionType && newQuestionText) {
      let newQuestion: QuestionType;
      switch (newQuestionType) {
        case "writeIn":
          newQuestion = {
            data: {
              answerType: "text",
              question: newQuestionText,
            },
            type: "writeIn",
          };
          break;
        case "multipleChoice":
          newQuestion = {
            data: {
              answerType: answerType,
              question: newQuestionText,
              choices: newQuestionChoicesArray.map((choice) => ({
                text: choice,
              })),
            },
            type: "multipleChoice",
          };
          break;
        case "starRating":
          newQuestion = {
            data: {
              answerType: "starRating",
              question: newQuestionText,
            },
            type: "starRating",
          };
          break;
        default:
          return;
      }
      setQuestions([...questions, newQuestion]);
      setNewQuestionType("");
      setNewQuestionText("");
      setNewQuestionChoicesArray([]);
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
    <div className="container mx-6">
      <SurveyFormUI
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        questions={questions}
        newQuestionType={newQuestionType}
        setNewQuestionType={setNewQuestionType}
        newQuestionText={newQuestionText}
        setNewQuestionText={setNewQuestionText}
        newQuestionChoicesArray={newQuestionChoicesArray}
        handleAddChoice={handleAddChoice}
        handleAddQuestion={handleAddQuestion}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default SurveyForm;
