import { useDrag, useDrop } from "react-dnd";
import QuestionType from "./QuestionType";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import DragIcon from "@/app/assets/drag.png";

// * Possibly will need to use this later
// import { QuestionType } from "@/app/types/SurveyFormTypes";
import {
  Question,
  QuestionData,
  QuestionType as QuestionTypeEnum,
} from "@/app/types/SurveyFormTypes";
import PublishButton from "./PublishButton";
import { useEffect, useState } from "react";

interface DroppedItem {
  type: string;
}

interface DraggableQuestionTypeProps {
  type: string;
}

interface DraggableMenuProps {
  questions: Question[];
  addQuestion: (question: Question) => void;
}

interface DroppableAreaProps {
  questions: Question[];
  addQuestion: (question: Question, index: number) => void;
}

// TODO:: refactor this later
const questionTypes = ["writeIn", "multipleChoice", "starRating"];

// * Main container for draggable menu layout
const DraggableMenu = ({ questions, addQuestion }: DraggableMenuProps) => {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="flex flex-col">
          {questionTypes.map((type) => (
            <DraggableQuestionType type={type} key={type} />
          ))}
        </div>
        <div className="grow mr-4 ml-4">
          <DroppableArea questions={questions} addQuestion={addQuestion} />
        </div>
      </div>
    </div>
  );
};

const DraggableQuestionType = ({ type }: DraggableQuestionTypeProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "questionType",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <button
      type="button"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="my-2 ml-2 mr-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-700 focus:outline-none"
    >
      <div className="flex">
        <Image src={DragIcon} width={28} height={28} alt="drag icon" />
        <div className="ml-2 my-1">{type}</div>
      </div>
    </button>
  );
};

const DroppableArea = ({ questions, addQuestion }: DroppableAreaProps) => {
  const [dragHere, setDragHere] = useState(false);

  useEffect(() => {
    if (questions.length === 0) {
      setDragHere(true);
    } else {
      setDragHere(false);
    }
  }, [questions]);

  const [{ isOver }, drop] = useDrop({
    accept: "questionType",
    drop: (item: DroppedItem) => {
      const index = questions.length;
      let newQuestionData: QuestionData;

      switch (item.type) {
        case "writeIn":
          newQuestionData = { question: "" };
          break;
        case "multipleChoice":
          newQuestionData = { question: "", choices: [], answerType: "radio" };
          break;
        case "starRating":
          newQuestionData = { question: "" };
          break;
        default:
          return; // invalid question type
      }
      const newQuestion: Question = {
        id: uuidv4(),
        type: item.type as QuestionTypeEnum,
        data: newQuestionData,
      };
      addQuestion(newQuestion, index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <>
      <div
        ref={drop}
        style={{
          backgroundColor: isOver ? "lightGray" : "",
          minHeight: "300px",
          borderStyle: isOver ? "dashed" : "solid",
          borderWidth: "2px",
          borderColor: "indigo",
          padding: "40px",
        }}
      >
        {dragHere && (
          <div className="uppercase text-3xl text-gray-500/50 flex justify-center my-20">
            [ Drag Here ]
          </div>
        )}
        {questions.map((question, index) => (
          <div key={question.id} className="flex">
            <span className="mr-3 my-3 text-xl">{index + 1}. </span>
            <QuestionType question={question} />
          </div>
        ))}
      </div>
      <PublishButton />
    </>
  );
};

export default DraggableMenu;
