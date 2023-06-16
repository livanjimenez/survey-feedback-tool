"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { db } from "../../firebase/firebaseClient";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { SurveyMultipleChoiceQuestion } from "./SurveyMultipleChoiceQuestion";
import { SurveyStarRatingQuestion } from "./SurveyStarRatingQuestion";
import { SurveyWriteInQuestion } from "./SurveyWriteInQuestion";

import {
  SurveyData,
  Question,
  Appearance,
  isMultipleChoiceQuestionData,
} from "../../types/SurveyFormTypes";

export default function Survey() {
  const pathname = usePathname();
  const id = pathname.split("/")[2]; // Assuming the structure is /app/survey/{id}/page
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [responses, setResponses] = useState<Record<number, any>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleResponseChange = (questionIndex: number, response: any) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionIndex]: response,
    }));
  };

  useEffect(() => {
    if (!id) return; // if id is not yet available, don't fetch data

    const fetchData = async () => {
      const docRef = doc(db, "surveys", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as SurveyData;
        console.log(JSON.stringify(data, null, 2));
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

    // Create a new document in a responses collection in Firestore
    // with user's responses and a reference to the survey
    const docRef = await addDoc(collection(db, "responses"), {
      surveyId: id,
      responses: responses,
    });

    console.log("Document written with ID: ", docRef.id);
    setIsSubmitted(true);
  };

  return (
    <div
      className={`text-${surveyData.appearance.data.fontColor} bg-${
        surveyData.appearance.data.bgColor
      } ${surveyData.appearance.data.isGradient ? "gradient-class" : ""}`}
    >
      {isSubmitted ? (
        <h1>Thank you for completing the survey!</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>{surveyData.title}</h1>
          <p>{surveyData.description}</p>
          {surveyData.questions.map((question: Question, index: number) => {
            switch (question.type) {
              case "multipleChoice":
                if (isMultipleChoiceQuestionData(question.data)) {
                  return (
                    <SurveyMultipleChoiceQuestion
                      key={index}
                      question={question.data}
                      onChoiceSelect={(choice: string) =>
                        handleResponseChange(index, choice)
                      }
                    />
                  );
                }
              case "starRating":
                return (
                  <SurveyStarRatingQuestion
                    key={index}
                    question={question.data}
                    onRatingSelect={(rating: number) =>
                      handleResponseChange(index, rating)
                    }
                  />
                );
              case "writeIn":
                return (
                  <SurveyWriteInQuestion
                    key={index}
                    question={question.data}
                    onTextChange={(text: string) =>
                      handleResponseChange(index, text)
                    }
                  />
                );
              default:
                return null;
            }
          })}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
