import { useState } from "react";
import { useSurvey } from "@/app/context/SurveyContext";
import { useFirestore } from "@/app/hooks/useFirestore";
import { saveSurveyToFirestore } from "@/app/utils/surveyUtils";
import { auth } from "@/app/firebase/firebaseClient";

const PublishButton = () => {
  const { title, description, questions } = useSurvey();
  const userFirestore = useFirestore(`users/${auth.currentUser?.uid}/surveys`);
  const generalFirestore = useFirestore("surveys");

  const [surveyLink, setSurveyLink] = useState<string | null>(null);

  const handleClick = async () => {
    // Prepare survey data
    const surveyData = {
      title,
      description,
      questions,
    };

    // Save survey data to Firestore
    const link = await saveSurveyToFirestore(
      surveyData,
      userFirestore.addDocument,
      generalFirestore.addDocument
    );

    if (link) {
      setSurveyLink(link);
    } else {
      console.error("Failed to publish survey");
    }
  };

  return (
    <div className="flex justify-center">
      <button
        className="mt-6 items-center px-10 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500;"
        type="button"
        onClick={handleClick}
      >
        Publish
      </button>
      {/*
       *
       * TODO:: Style this later
       *
       */}
      {surveyLink && (
        <div>
          <p>
            Your survey has been published. You can share it using this link:
          </p>
          <a href={surveyLink}>{surveyLink}</a>
        </div>
      )}
    </div>
  );
};

export default PublishButton;
