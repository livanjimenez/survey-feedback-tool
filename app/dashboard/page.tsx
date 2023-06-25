"use client";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebaseClient";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

interface Survey {
  id: string;
  title: string;
}

export default function Dashboard() {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
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
    fetchSurveys();
  }, []);

  return (
    <div>
      {surveys.map((survey) => (
        <div key={survey.id}>
          <h2>{survey.title}</h2>
          <h6>survey ID: {survey.id}</h6>
          <Link href={`/survey/${survey.id}`}>Take Survey</Link>
        </div>
      ))}
    </div>
  );
}
