import { createContext, useContext, useState } from "react";
import { Question } from "@/app/types/SurveyFormTypes";

interface SurveyContextType {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  addQuestion: (question: Question) => void;
}

const SurveyContext = createContext<SurveyContextType>({
  title: "",
  setTitle: () => {},
  description: "",
  setDescription: () => {},
  questions: [],
  setQuestions: () => {},
  addQuestion: () => {},
});

export const useSurvey = () => useContext(SurveyContext);

interface SurveyProviderProps {
  children: React.ReactNode;
}

export const SurveyProvider = ({ children }: SurveyProviderProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  // console.log("SurveyProvider instance", questions);

  const addQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const value = {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    setQuestions: (newQuestions: Question[]) => setQuestions(newQuestions),
    addQuestion,
  };

  return (
    <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
  );
};
