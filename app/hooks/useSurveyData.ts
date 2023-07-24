import { useState, useEffect, useContext } from "react";
import { useFirestore } from "./useFirestore";
import { Survey, SurveyData } from "../types/SurveyFormTypes";
import { AuthContext } from "@/app/context/AuthContext";

interface SurveyContextType {
  surveys: Survey[];
  addSurvey: (survey: SurveyData) => Promise<string>;
  updateSurvey: (surveyId: string, survey: SurveyData) => Promise<void>;
  deleteSurvey: (surveyId: string) => Promise<void>;
  getSurveyById: (surveyId: string) => Promise<Survey>;
}

// * Interact with the surveys collection in Firestore

export const useSurveyData = (userId: string): SurveyContextType => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const { documents, addDocument, updateDocument, deleteDocument } =
    useFirestore("surveys");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const filteredSurveys = documents.filter(
        (survey) => survey.userId === userId
      );
      setSurveys(filteredSurveys);
    }
  }, [documents, userId, user]);

  const addSurvey = async (survey: SurveyData) => {
    const surveyId = await addDocument({ ...survey, userId });
    return surveyId;
  };

  const updateSurvey = async (surveyId: string, survey: SurveyData) => {
    await updateDocument(surveyId, survey);
  };

  const deleteSurvey = async (surveyId: string) => {
    await deleteDocument(surveyId);
  };

  const getSurveyById = async (surveyId: string) => {
    const survey = documents.find((survey) => survey.id === surveyId);
    if (survey) {
      return survey;
    } else {
      throw new Error(`Survey with id ${surveyId} not found`);
    }
  };

  return { surveys, addSurvey, updateSurvey, deleteSurvey, getSurveyById };
};
