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
  const [newQuestionChoices, setNewQuestionChoices] = useState(""); // for MultipleChoiceQuestionData

  // const handleAddQuestion = () => {
  //   if (newQuestionType && newQuestionText) {
  //     let newQuestion: QuestionType;
  //     switch (newQuestionType) {
  //       case "writeIn":
  //         newQuestion = {
  //           __typename: "WriteInQuestionData",
  //           question: newQuestionText,
  //         };
  //         break;
  //       case "multipleChoice":
  //         newQuestion = {
  //           __typename: "MultipleChoiceQuestionData",
  //           question: newQuestionText,
  //           choices: newQuestionChoices
  //             .split(",")
  //             .map((choice) => ({ text: choice.trim() })),
  //         };
  //         break;
  //       case "starRating":
  //         newQuestion = {
  //           __typename: "StarRatingQuestionData",
  //           question: newQuestionText,
  //         };
  //         break;
  //       default:
  //         return;
  //     }
  //     setQuestions([...questions, newQuestion]);
  //     console.log("Question added: ", newQuestion); // Debug log
  //     console.log("Current questions: ", [...questions, newQuestion]); // Debug log
  //     setNewQuestionType("");
  //     setNewQuestionText("");
  //     setNewQuestionChoices("");
  //   }
  // };

  const handleAddQuestion = () => {
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
              answerType: "radio", // or "checkbox" depending on your requirement
              question: newQuestionText,
              choices: newQuestionChoices
                .split(",")
                .map((choice) => ({ text: choice.trim() })),
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
    console.log("Submitting data: ", data); // Debug log
    onSubmit(data);
  };

  return (
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
      newQuestionChoices={newQuestionChoices}
      setNewQuestionChoices={setNewQuestionChoices}
      handleAddQuestion={handleAddQuestion}
      handleSubmit={handleSubmit}
    />
  );
};

export default SurveyForm;
