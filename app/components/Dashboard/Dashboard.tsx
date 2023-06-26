"use client";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebaseClient";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SurveyForm from "../CreateSurvey/SurveyForm";

interface Survey {
  id: string;
  title: string;
}

const Dashboard: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchSurveys();
      } else {
        router.push("/login");
      }
    });
  }, []);

  const fetchSurveys = async () => {
    const userId = auth.currentUser?.uid;

    if (userId) {
      const querySnapshot = await getDocs(
        collection(db, `users/${userId}/surveys`)
      );
      const surveysData = querySnapshot.docs.map((doc) => {
        return { id: doc.id, title: doc.data().title };
      });
      setSurveys(surveysData);
    } else {
      console.error("No user is signed in.");
    }
  };

  return (
    <div>
      <SurveyForm />

      {surveys.map((survey) => (
        <div key={survey.id}>
          <h2>{survey.title}</h2>
          <h6>survey ID: {survey.id}</h6>
          <Link href={`/survey/${survey.id}`}>Take Survey</Link>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
