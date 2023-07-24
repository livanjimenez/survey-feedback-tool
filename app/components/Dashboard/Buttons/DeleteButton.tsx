import { useState, Fragment } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";

interface DeleteButtonProps {
  handleDeleteSurvey: (surveyId: string) => void;
  surveyId: string;
}

const DeleteButton = ({ handleDeleteSurvey, surveyId }: DeleteButtonProps) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function closeModalAndDelete() {
    setIsOpen(false);
    handleDeleteSurvey(surveyId);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div>
        <TrashIcon
          className={`h-6 w-6 cursor-pointer ml-4 ${
            isOpen ? "text-red-500" : "text-gray-500 hover:text-red-500"
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
                    Are you sure you want to delete this survey?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your survey will be permanently removed. Including all the
                      data associated with it.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium  text-white hover:bg-red-700 focus:outline-none"
                      onClick={closeModalAndDelete}
                    >
                      Delete
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

export default DeleteButton;
