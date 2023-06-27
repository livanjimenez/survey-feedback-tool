import Link from "next/link";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

interface Survey {
  id: string;
  title: string;
  description: string;
}

interface SurveyListProps {
  surveys: Survey[];
}

export default function SurveyList({ surveys }: SurveyListProps) {
  return (
    <div className="space-y-4">
      {surveys.map((survey) => (
        <div key={survey.id} className="p-2 bg-white shadow-lg rounded-lg my-4">
          <h2 className="text-2xl">{survey.title}</h2>
          <p className="text-gray-600">{survey.description}</p>
          <div className="flex items-center">
            <Link href={`/survey/${survey.id}`}>Take survey</Link>
            <ArrowUpOnSquareIcon
              className="h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer"
              title="Share this link now"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
