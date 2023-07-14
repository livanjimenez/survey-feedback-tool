import { useState } from "react";
import SurveyFormUI from "./SurveyFormUI";
import { QuestionType } from "@/app/types/QuestionTypes";
import { v4 as uuidv4 } from "uuid";
import { useSurvey } from "@/app/context/SurveyContext";

interface SurveyFormProps {
  onSubmit: (data: any) => void;
}

const SurveyForm = ({ onSubmit }: SurveyFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [newQuestionType, setNewQuestionType] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionChoicesArray, setNewQuestionChoicesArray] = useState<
    string[]
  >([]);

  const { addQuestion } = useSurvey();

  const handleAddChoice = (choice: string) => {
    if (newQuestionChoicesArray.length < 4) {
      setNewQuestionChoicesArray([...newQuestionChoicesArray, choice]);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestionType && newQuestionText) {
      let newQuestion: QuestionType;
      const questionId = uuidv4();
      switch (newQuestionType) {
        case "writeIn":
          newQuestion = {
            id: questionId,
            data: {
              answerType: "text",
              question: newQuestionText,
            },
            type: "writeIn",
          };
          break;
        case "multipleChoice":
          newQuestion = {
            id: questionId,
            data: {
              id: uuidv4(),
              answerType: "multipleChoice",
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
            id: questionId,
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
      addQuestion(newQuestion);
      setNewQuestionType("");
      setNewQuestionText("");
      setNewQuestionChoicesArray([]);
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter((q) => q.id !== questionId);
    setQuestions(updatedQuestions);
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
        handleDeleteQuestion={handleDeleteQuestion}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default SurveyForm;
