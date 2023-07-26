import { useDrag, useDrop } from "react-dnd";
import QuestionType from "./QuestionType";
import { v4 as uuidv4 } from "uuid";

// * Possibly will need to use this later
// import { QuestionType } from "@/app/types/SurveyFormTypes";
import {
  Question,
  QuestionData,
  QuestionType as QuestionTypeEnum,
} from "@/app/types/SurveyFormTypes";

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
  addQuestion: (question: Question) => void;
}

// TODO:: refactor this later
const questionTypes = ["writeIn", "multipleChoice", "starRating"];

// * Main container for draggable menu layout
const DraggableMenu = ({ questions, addQuestion }: DraggableMenuProps) => {
  return (
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
      className="my-2 ml-2 mr-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
    >
      {type}
    </button>
  );
};

const DroppableArea = ({ questions, addQuestion }: DroppableAreaProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: "questionType",
    drop: (item: DroppedItem) => {
      // Add a new question of the dropped type to the survey

      // ! Bug in this code
      // ! Need to fix this later
      // ! when publishing a survey, its giving these results by default
      // * uMAAokLqkgJNEIO4LBC0 <-- this is the id of the survey
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
      addQuestion(newQuestion);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // ? UI needs work, its highlighting the whole area

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "lightGray" : "",
        minHeight: "50px",
        borderStyle: isOver ? "dashed" : "solid",
        borderWidth: "2px",
        borderColor: "indigo",
        padding: "10px",
      }}
    >
      {questions.map((question) => (
        <QuestionType key={question.id} question={question} />
      ))}
    </div>
  );
};

export default DraggableMenu;
