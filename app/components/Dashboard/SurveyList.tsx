import { useState, useEffect } from "react";
import { Survey } from "@/app/types/SurveyFormTypes";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import ShareButton from "./Buttons/ShareButton";
import Link from "next/link";

interface SurveyListProps {
  surveys: Survey[];
  handleDeleteSurvey: (surveyId: string) => void;
}

export default function SurveyList({
  surveys,
  handleDeleteSurvey,
}: SurveyListProps) {
  const [emptySurveyList, setEmptySurveyList] = useState(false);

  useEffect(() => {
    setEmptySurveyList(surveys.length === 0);
  }, [surveys]);

  return (
    <div className="px-4">
      {emptySurveyList && (
        <div className="border-dashed border-2 border-indigo-600 flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            {/* <p className="uppercase py-3 text-xl ">Create your first Survey</p> */}
            <Link
              className="uppercase my-6 px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              href="/create"
            >
              Create Survey
            </Link>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {surveys.map((survey) => (
          <div
            key={survey.id}
            className="bg-white shadow-md rounded-lg my-4 relative "
          >
            <div className="p-6">
              <div className="flex justify-between ">
                <div className="flex-col flex-nowrap shrink">
                  <h2 className="text-2xl">{survey.title}</h2>
                  <p className="text-gray-600">{survey.description}</p>
                </div>
                <div className="flex my-1">
                  {/* <EditButton surveyId={survey.id} /> */}
                  <div className="flex my-2">
                    <ShareButton surveyId={survey.id} />
                    <DeleteButton
                      handleDeleteSurvey={handleDeleteSurvey}
                      surveyId={survey.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
