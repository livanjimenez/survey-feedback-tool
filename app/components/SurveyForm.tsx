"use client";
import { BasicInfo } from "./BasicInfo";
import { QuestionTypeSelection } from "./QuestionTypeSelection";
import { useState } from "react";
import { QuestionData, QuestionType } from "../types/SurveyFormTypes";
import SurveyAppearance, { AppearanceData } from "./SurveyAppearance";
import PublishSurvey from "./PublishSurvey";

interface Question {
  type: QuestionType;
  data: QuestionData;
}

interface Appearance {
  data: AppearanceData;
}

export default function SurveyForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [appearance, setAppearance] = useState<Appearance | null>(null);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleQuestionSelection = (
    type: QuestionType,
    question: QuestionData
  ) => {
    setQuestions([...questions, { type, data: question }]);
    handleNext();
  };

  const handleAppearanceSelection = (data: AppearanceData) => {
    setAppearance({ data });
    handleNext();
  };

  return (
    <div>
      {step === 0 && (
        <BasicInfo
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onNext={handleNext}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      {step === 1 && (
        <QuestionTypeSelection onSelection={handleQuestionSelection} />
      )}
      {step === 2 && (
        <SurveyAppearance
          onNext={handleAppearanceSelection}
          onBack={() => setStep(step - 1)}
        />
      )}
      {step === 3 && (
        <PublishSurvey
          surveyData={{
            title,
            description,
            questions,
            appearance,
          }}
        />
      )}
    </div>
  );
}
