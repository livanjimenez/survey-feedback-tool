import { useState } from "react";
import {
  ArrowUpOnSquareIcon,
  TrashIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { Survey } from "@/app/types/SurveyFormTypes";

interface SurveyListProps {
  surveys: Survey[];
  onDelete: (id: string) => void;
}

export default function SurveyList({ surveys, onDelete }: SurveyListProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="space-y-4">
      {surveys.map((survey) => (
        <div
          key={survey.id}
          className="bg-white shadow-lg rounded-lg my-4 relative"
        >
          <div className="p-5">
            <div className="flex flex-nowrap justify-between">
              <div className="flex flex-col flex-auto">
                <h2 className="text-2xl">{survey.title}</h2>
                <p className="text-gray-600">{survey.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Share Disclosure */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="relative group">
                        <ArrowUpOnSquareIcon className="h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer" />
                        <span className="absolute left-0 mt-2 text-xs text-white bg-black opacity-0 group-hover:opacity-100 transition p-1 rounded">
                          Share
                        </span>
                      </Disclosure.Button>
                      <Disclosure.Panel
                        className={`mt-2 z-10 w-full bg-gray-50 rounded-b-lg ${
                          open ? "block" : "hidden"
                        }`}
                      >
                        <div className="flex items-center space-x-4 p-4">
                          <input
                            readOnly
                            value={`${window.location.origin}/survey/${survey.id}`}
                            className="border p-2 flex-grow"
                          />
                          <DocumentDuplicateIcon
                            className="h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer"
                            onClick={() =>
                              handleCopy(
                                `${window.location.origin}/survey/${survey.id}`
                              )
                            }
                          />
                        </div>
                        {copied && (
                          <p className="text-green-500 text-center pb-2">
                            Copied!
                          </p>
                        )}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Delete Disclosure */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="relative group">
                        <TrashIcon
                          className={`h-5 w-5 cursor-pointer ml-4 ${
                            open
                              ? "text-red-500"
                              : "text-gray-500 hover:text-red-500"
                          }`}
                        />
                        <span className="absolute left-0 mt-2 text-xs text-white bg-black opacity-0 group-hover:opacity-100 transition p-1 rounded">
                          Delete
                        </span>
                      </Disclosure.Button>
                      <Disclosure.Panel
                        className={`mt-2 z-10 w-full bg-red-50 rounded-b-lg ${
                          open ? "block" : "hidden"
                        }`}
                      >
                        <div className="flex items-center space-x-4 p-4">
                          <p className="text-gray-700 flex-grow">
                            Are you sure you want to delete this survey?
                          </p>
                          <button className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">
                            Cancel
                          </button>
                          <button
                            className="px-3 py-1 rounded-md text-white bg-red-500 hover:bg-red-600"
                            onClick={() => onDelete(survey.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
