import { useState } from "react";
import { useSurvey } from "@/app/context/SurveyContext";
import { v4 as uuidv4 } from "uuid";
import { QuestionType, MultipleChoiceData } from "@/app/types/QuestionTypes";

interface MultipleChoiceQuestionProps {
  questionId: string;
  handleAddQuestion: (question: QuestionType) => void;
  handleDeleteQuestion: (questionId: string) => void;
}

export default function MultipleChoiceQuestion({
  handleAddQuestion,
  handleDeleteQuestion,
  questionId,
}: MultipleChoiceQuestionProps) {
  const { addQuestion } = useSurvey();
  const [newQuestionText, setNewQuestionText] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [newChoice, setNewChoice] = useState("");

  const handleChoiceChange = (choice: string, index: number) => {
    const newChoices = [...choices];
    newChoices[index] = choice;
    setChoices(newChoices);
  };

  const handleDeleteChoice = (index: number) => {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);
  };

  const handleAddChoice = () => {
    const newChoices = [...choices];
    newChoices.push(newChoice);
    setChoices(newChoices);
    setNewChoice("");
  };

  const handleAddQuestionClick = () => {
    console.log("newQuestionText:", newQuestionText);
    console.log("choices:", choices);
    const newQuestion: QuestionType = {
      id: uuidv4(),
      type: "multipleChoice",
      data: {
        id: uuidv4(),
        question: newQuestionText,
        answerType: "multipleChoice",
        choices: choices.map((choice) => ({ text: choice })),
      },
    };
    addQuestion(newQuestion);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={newQuestionText}
        onChange={(e) => setNewQuestionText(e.target.value)}
        placeholder="Mutliple Choice Question"
        className="inputField mr-2"
      />
      <button
        className="btnWrapper my-4"
        type="button"
        onClick={handleAddQuestionClick}
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
      {choices.map((choice, index) => (
        <div key={index}>
          <input
            type="text"
            value={choice}
            onChange={(e) => handleChoiceChange(e.target.value, index)}
            placeholder={`Choice ${index + 1}`}
            className="inputField mr-2"
          />
          <button
            className="btnWrapper my-4"
            type="button"
            onClick={() => handleDeleteChoice(index)}
          >
            Delete Choice
          </button>
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newChoice}
          onChange={(e) => setNewChoice(e.target.value)}
          placeholder="New Choice"
          className="inputField mr-2"
        />
        <button
          className="btnWrapper my-4"
          type="button"
          onClick={() => handleAddChoice()}
        >
          Add Choice
        </button>
      </div>
    </div>
  );
}
