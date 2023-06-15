"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { db } from "../../firebase/firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import { SurveyMultipleChoiceQuestion } from "./SurveyMultipleChoiceQuestion";
import { SurveyStarRatingQuestion } from "./SurveyStarRatingQuestion";
import { SurveyWriteInQuestion } from "./SurveyWriteInQuestion";

import { SurveyData, Question, Appearance } from "../../types/SurveyFormTypes";

export default function Survey() {
  const pathname = usePathname();
  const id = pathname.split("/")[3]; // Assuming the structure is /app/survey/{id}/page
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);

  useEffect(() => {
    if (!id) return; // if id is not yet available, don't fetch data

    const fetchData = async () => {
      const docRef = doc(db, "surveys", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSurveyData(docSnap.data() as SurveyData);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [id]);

  if (!surveyData) return "Loading..."; //replace with a proper loading indicator

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
    // Create a new document in a responses collection in Firestore with user's responses and a reference to the survey
  };

  return (
    <div
      className={`text-${surveyData.appearance.data.fontColor} bg-${
        surveyData.appearance.data.bgColor
      } ${surveyData.appearance.data.isGradient ? "gradient-class" : ""}`}
    >
      <form onSubmit={handleSubmit}>
        <h1>{surveyData.title}</h1>
        <p>{surveyData.description}</p>
        {surveyData.questions.map((question: Question, index: number) => {
          switch (question.type) {
            case "multipleChoice":
              return (
                <SurveyMultipleChoiceQuestion
                  key={index}
                  question={question.data}
                />
              );
            case "starRating":
              return (
                <SurveyStarRatingQuestion
                  key={index}
                  question={question.data}
                />
              );
            case "writeIn":
              return (
                <SurveyWriteInQuestion key={index} question={question.data} />
              );
            default:
              return null;
          }
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
