import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseClient";
import { addDoc, collection } from "firebase/firestore";
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

  const sanitizeData = (obj: any): any => {
    if (obj === undefined) return null; // or any other default value
    if (typeof obj !== "object" || obj === null) return obj; // return if not object or if already null
    if (Array.isArray(obj)) return obj.map(sanitizeData); // map array items

    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined) // remove undefined values
        .map(([k, v]) => [k, sanitizeData(v)]) // recursively sanitize values
    );
  };

  useEffect(() => {
    const saveSurveyToFirestore = async () => {
      const sanitizedSurveyData = sanitizeData(surveyData);

      const docRef = await addDoc(
        collection(db, "surveys"),
        sanitizedSurveyData
      );
      const surveyId = docRef.id;
      setLink(`${window.location.origin}/survey/${surveyId}`);
    };
    saveSurveyToFirestore();
  }, []);

  return (
    <div>
      <h1>Your survey has been published!</h1>
      <p>You can share it using this link:</p>
      <input type="text" value={link} readOnly />
    </div>
  );
};

export default PublishSurvey;
