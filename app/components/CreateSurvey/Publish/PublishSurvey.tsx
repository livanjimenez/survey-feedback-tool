import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { Question, Appearance } from "../../../types/SurveyFormTypes";

interface PublishSurveyProps {
  surveyData: {
    title: string;
    description: string;
    questions: Question[];
    appearance: Appearance | null;
  };
}

const PublishSurvey: React.FC<PublishSurveyProps> = ({ surveyData }) => {
  const [link, setLink] = useState("");

  useEffect(() => {
    const saveSurveyToFirestore = async () => {
      const surveyRef = doc(db, "surveys");
      await setDoc(surveyRef, surveyData);
      const surveyId = surveyRef.id;
      setLink(`${window.location.origin}/survey/${surveyId}`);
    };

    saveSurveyToFirestore();
  }, [surveyData]);

  return (
    <div>
      <h1>Your survey has been published!</h1>
      <p>You can share it using this link:</p>
      <input type="text" value={link} readOnly />
    </div>
  );
};

export default PublishSurvey;
