import { useState } from "react";
import SurveyForm from "./SurveyForm";
import { saveSurveyToFirestore } from "@/app/utils/surveyUtils";
import { useFirestore } from "@/app/hooks/useFirestore";
import { auth } from "@/app/firebase/firebaseClient";
import SurveySidebar from "./SurveySidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface SurveyData {
  title: string;
  description: string;
  questions: Array<{
    type: string;
    question: string;
    choices?: Array<{ text: string }>;
  }>;
}

export default function CreateSurvey() {
  const [surveyLink, setSurveyLink] = useState("");

  const userFirestore = useFirestore(`users/${auth.currentUser?.uid}/surveys`);
  const generalFirestore = useFirestore("surveys");

  const handleSurveySubmit = async (data: SurveyData) => {
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
  );
}
