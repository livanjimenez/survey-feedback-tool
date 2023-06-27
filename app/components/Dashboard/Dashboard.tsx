import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebaseClient";
import { useRouter } from "next/navigation";
import { collection, getDocs, where, query } from "firebase/firestore";
import SurveyForm from "../CreateSurvey/SurveyForm";
import SurveyList from "./SurveyList";

interface Survey {
  id: string;
  title: string;
  description: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        fetchPublicSurveyId();
      }
    });
  }, []);

  const fetchPublicSurveyId = async () => {
    const userId = auth.currentUser?.uid;

    if (userId) {
      // Query the surveys collection for surveys where userId matches the authenticated user's UID
      const surveyQuery = query(
        collection(db, "surveys"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(surveyQuery);

      const surveysData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
        };
      });

      setSurveys(surveysData);
    }
  };

  return (
    <div>
      <SurveyForm />
      <SurveyList surveys={surveys} />
    </div>
  );
}
