import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebaseClient";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SurveyList from "./SurveyList";

interface Survey {
  id: string;
  title: string;
  description: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        fetchPublicSurveyId();
      }
    });
  }, []);

  const handleDeleteSurvey = async (surveyId: string) => {
    // Confirm deletion with the user
    if (window.confirm("Are you sure you want to delete this survey?")) {
      try {
        // Delete the survey from Firestore
        await deleteDoc(doc(db, "surveys", surveyId));

        // Optionally, refresh the surveys list
        fetchPublicSurveyId();
      } catch (error) {
        console.error("Error deleting survey: ", error);
      }
    }
  };

  const handleCreateButton = () => {
    router.push("/create");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSurveys = surveys.filter((survey) =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="container mx-auto p-8">
      <button
        className="rounded-full mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleCreateButton}
      >
        Create Survey
      </button>

      <div className="border-t my-4 border-gray-300"></div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="capitalize text-2xl mb-4 sm:mb-0">My Surveys 🔥</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            placeholder="Search by Title"
            className="rounded-lg border-gray-300 shadow-sm p-2 pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <SurveyList surveys={filteredSurveys} onDelete={handleDeleteSurvey} />
    </div>
  );
}
