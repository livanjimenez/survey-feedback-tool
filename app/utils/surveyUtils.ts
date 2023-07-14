import { auth } from "../firebase/firebaseClient";

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

export async function saveSurveyToFirestore(
  surveyData: any,
  addUserDocument: Function,
  addGeneralDocument: Function
) {
  console.log("Before sanitization:", surveyData);
  const sanitizedSurveyData = sanitizeData(surveyData);
  console.log("After sanitization:", sanitizedSurveyData);
  const userId = auth.currentUser?.uid;

  // Add userId to the survey data
  sanitizedSurveyData.userId = userId;

  try {
    // Save survey to the user's collection
    const userDocRefId = await addUserDocument(sanitizedSurveyData);
    console.log("User Document ID:", userDocRefId);

    // Save survey to the general surveys collection
    const generalDocRefId = await addGeneralDocument(sanitizedSurveyData);
    console.log("General Document ID:", generalDocRefId);

    // Here we're assuming the surveyId should be the same in both collections
    // So we're using the id from the first document reference
    const surveyId = generalDocRefId;
    return `${window.location.origin}/survey/${surveyId}`;
  } catch (error) {
    console.error("Failed to save survey:", error);
    return null;
  }
}
