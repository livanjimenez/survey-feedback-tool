import { useState, useRef, useEffect } from "react";
import SurveyForm from "./SurveyForm";
import { saveSurveyToFirestore } from "@/app/utils/surveyUtils";
import { useFirestore } from "@/app/hooks/useFirestore";
import { auth } from "@/app/firebase/firebaseClient";
import SurveySidebar from "./SurveySidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SurveyProvider } from "@/app/context/SurveyContext";
import { useSurvey } from "@/app/context/SurveyContext";
import { QuestionType } from "@/app/types/QuestionTypes";

interface SurveyData {
  title: string;
  description: string;
  questions: QuestionType[];
}

export default function CreateSurvey() {
  const [surveyLink, setSurveyLink] = useState("");

  const { title, description, questions } = useSurvey();

  const userFirestore = useFirestore(`users/${auth.currentUser?.uid}/surveys`);
  const generalFirestore = useFirestore("surveys");

  const questionsRef = useRef(questions);

  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  const handleSurveySubmit = async () => {
    console.log("Submitting survey with title:", title);
    console.log("Submitting survey with description:", description);
    console.log(questions);
    const data: SurveyData = {
      title,
      description,
      questions: questionsRef.current,
    };
    const link = await saveSurveyToFirestore(
      data,
      userFirestore.addDocument,
      generalFirestore.addDocument
    );
    if (link) {
      setSurveyLink(link);
    }
  };

  return (
    <SurveyProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="flex">
          <SurveySidebar />
          <div className="flex-grow ml-64">
            <SurveyForm onSubmit={handleSurveySubmit} />
            {surveyLink && (
              <div>
                <h1>Your survey has been published!</h1>
                <p>You can share it using this link: {surveyLink}</p>
              </div>
            )}
          </div>
        </div>
      </DndProvider>
    </SurveyProvider>
  );
}
