import { useState } from "react";
import {
  Question,
  MultipleChoiceQuestionData,
} from "@/app/types/SurveyFormTypes";
import { MULTIPLE_CHOICE_QUESTION } from "@/app/constants";
import { TrashIcon } from "@heroicons/react/24/outline";

interface MultipleChoiceQuestionProps {
  question: Question;
  value: string;
  setValue: (value: string) => void;
  handleAddQuestion: (type: string) => void;
  handleDeleteQuestion: (id: string) => void;
}

const MultipleChoiceQuestion = ({
  question,
  // ? possibly dropping this or refactor value: Question
  value,
  // ? possibly remove this and add onChange instead, to avoid confusion
  setValue,
  handleAddQuestion,
  handleDeleteQuestion,
}: MultipleChoiceQuestionProps) => {
  // ! This is hard coded for now, but we will need to add a way to add choices
  // Initialize with 4 empty choices
  const [choices, setChoices] = useState(["", "", "", ""]);

  // * updateChoice is called when the user types in the input field
  const updateChoice = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  // * addChoice is called when the user clicks the add choice button
  const addChoice = () => {
    const newChoices = [...choices, ""];
    setChoices(newChoices);
  };

  // * deleteChoice is called when the user clicks the delete choice button
  const deleteChoice = (index: number) => {
    // ? This was implemented by copilot
    // ? I'm not sure which once is best between the two
    // const newChoices = [...choices];
    // newChoices.splice(index, 1);
    // setChoices(newChoices);

    setChoices(choices.filter((_, i) => i !== index));
  };

  // TODO:: Implement submitQuestion
  const submitQuestion = () => {};

  // ? do I need to implement a submitChoice function?

  // TODO:: Implement UI for adding choices

  return (
    <div className="container">
      <input
        type="text"
        // ! I might have to do this to other question components
        value={question.data.question}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Multiple Choice Question"
        className="inputField mr-2"
      />
      <div className="flex">
        <button
          className="btnWrapper my-4"
          type="button"
          // QuestionType is writeIn, so we pass "writeIn" to handleAddQuestion
          onClick={() => handleAddQuestion(MULTIPLE_CHOICE_QUESTION)}
        >
          Add Question
        </button>
        <TrashIcon
          className="h-6 w-6 my-6 ml-2"
          type="button"
          onClick={() => handleDeleteQuestion(question.type)}
        />
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
