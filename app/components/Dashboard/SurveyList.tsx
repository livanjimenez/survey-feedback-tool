import { Survey } from "@/app/types/SurveyFormTypes";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import ShareButton from "./Buttons/ShareButton";

interface SurveyListProps {
  surveys: Survey[];
  handleDeleteSurvey: (surveyId: string) => void;
}

export default function SurveyList({
  surveys,
  handleDeleteSurvey,
}: SurveyListProps) {
  return (
    <div className="space-y-4">
      {surveys.map((survey) => (
        <div
          key={survey.id}
          className="bg-white shadow-lg rounded-lg my-4 relative grid grid-cols-1 gap-4"
        >
          <div className="p-6">
            <div className="flex flex-nowrap justify-between">
              <div className="flex flex-col flex-auto">
                <h2 className="text-2xl">{survey.title}</h2>
                <p className="text-gray-600">{survey.description}</p>
                <div className="flex flex-row-reverse">
                  <DeleteButton
                    handleDeleteSurvey={handleDeleteSurvey}
                    surveyId={survey.id}
                  />
                  <ShareButton surveyId={survey.id} />
                  <EditButton surveyId={survey.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
