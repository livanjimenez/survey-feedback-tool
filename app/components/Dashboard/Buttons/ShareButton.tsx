import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowUpOnSquareIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

interface ShareButtonProps {
  surveyId: string;
}

const ShareButton = ({ surveyId }: ShareButtonProps) => {
  let [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div>
        <ArrowUpOnSquareIcon
          className={`h-6 w-6 cursor-pointer ml-4 ${
            isOpen ? "text-purple-500" : "text-gray-500 hover:text-purple-500"
          }`}
          onClick={openModal}
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Share your survey with this link
                  </Dialog.Title>
                  <div className="flex">
                    <input
                      readOnly
                      value={`${window.location.origin}/survey/${surveyId}`}
                      className="border p-2 flex-grow"
                    />
                    <DocumentDuplicateIcon
                      className="h-6 w-6 my-3 ml-1 text-gray-500 hover:text-gray-900 cursor-pointer"
                      onClick={() =>
                        handleCopy(
                          `${window.location.origin}/survey/${surveyId}`
                        )
                      }
                    />
                  </div>

                  {copied && (
                    <p className="text-green-500 text-center pb-2">Copied!</p>
                  )}
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShareButton;
