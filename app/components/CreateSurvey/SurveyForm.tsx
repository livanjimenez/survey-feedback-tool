"use client";
import { BasicInfo } from "./BasicInfo/BasicInfo";
import { QuestionTypeSelection } from "./SelectQuestionType/QuestionTypeSelection";
import { useState } from "react";
import { QuestionData, QuestionType } from "../../types/SurveyFormTypes";
import PublishSurvey from "./Publish/PublishSurvey";

interface Question {
  type: QuestionType;
  data: QuestionData;
}

export default function SurveyForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

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
        <PublishSurvey
          surveyData={{
            title,
            description,
            questions,
          }}
        />
      )}
    </div>
  );
}
