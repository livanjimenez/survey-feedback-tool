import { useDrag, useDrop } from "react-dnd";
import QuestionType from "./QuestionType";

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

const DraggableMenu = ({ questions, addQuestion }: DraggableMenuProps) => {
  return (
    <div>
      {/* List of question types that can be dragged */}
      {questionTypes.map((type) => (
        <DraggableQuestionType type={type} key={type} />
      ))}
      {/* Area where question types can be dropped to add a new question */}
      <DroppableArea questions={questions} addQuestion={addQuestion} />
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
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {/* You might replace this with more detailed UI for each question type */}
      {type}
    </div>
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
        type: item.type as QuestionTypeEnum,
        data: newQuestionData,
      };
      addQuestion(newQuestion);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "lightblue" : "white",
        minHeight: "50px",
        border: "1px solid black",
      }}
    >
      {/* Render the survey questions here */}
      {questions.map((question) => (
        <QuestionType key={question.type} question={question} />
      ))}
    </div>
  );
};

export default DraggableMenu;
