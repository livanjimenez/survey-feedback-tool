"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { db } from "../../firebase/firebaseClient";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { SurveyMultipleChoiceQuestion } from "./SurveyMultipleChoiceQuestion";
import { SurveyStarRatingQuestion } from "./SurveyStarRatingQuestion";
import { SurveyWriteInQuestion } from "./SurveyWriteInQuestion";
import "../../styles/surveyStyles.css";

import {
  SurveyData,
  Question,
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
    <div>
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center mb-4">
            Thank you for completing the survey!
          </h1>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-2xl font-bold text-center mb-4">
            {surveyData.title}
          </h1>
          <p className="mb-6">{surveyData.description}</p>
          {surveyData.questions.map((question: Question, index: number) => {
            switch (question.type) {
              case "multipleChoice":
                if (isMultipleChoiceQuestionData(question.data)) {
                  return (
                    <div key={index}>
                      <h2>{`${index + 1}. ${question.data.question}`}</h2>
                      <SurveyMultipleChoiceQuestion
                        question={question.data}
                        onChoiceSelect={(choice: string) =>
                          handleResponseChange(index, choice)
                        }
                      />
                    </div>
                  );
                }
              case "starRating":
                return (
                  <div key={index}>
                    <h2>{`${index + 1}. ${question.data.question}`}</h2>
                    <SurveyStarRatingQuestion
                      question={question.data}
                      onRatingSelect={(rating: number) =>
                        handleResponseChange(index, rating)
                      }
                    />
                  </div>
                );
              case "writeIn":
                return (
                  <div key={index}>
                    <h2>{`${index + 1}. ${question.data.question}`}</h2>
                    <SurveyWriteInQuestion
                      question={question.data}
                      onTextChange={(text: string) =>
                        handleResponseChange(index, text)
                      }
                    />
                  </div>
                );
              default:
                return null;
            }
          })}

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
