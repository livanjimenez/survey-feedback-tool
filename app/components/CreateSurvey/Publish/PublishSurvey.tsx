import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseClient";
import { addDoc, collection } from "firebase/firestore";
import { Question } from "../../../types/SurveyFormTypes";

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

interface PublishSurveyProps {
  surveyData: {
    title: string;
    description: string;
    questions: Question[];
  };
}

const PublishSurvey: React.FC<PublishSurveyProps> = ({ surveyData }) => {
  const [link, setLink] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
  };

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
    <div className="form flex flex-col items-center justify-center m-8">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-center mb-4">
          Your survey has been published!
        </h1>
        <p className="text-center mb-2">You can share it using this link</p>
        <div className="flex items-center w-full">
          <input
            type="text"
            value={link}
            readOnly
            className="input flex-grow mr-2"
          />
          <button onClick={copyToClipboard} className="button">
            <DocumentDuplicateIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishSurvey;
