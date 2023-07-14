import { useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import WriteInQuestion from "./WriteInQuestion";
import StarRatingQuestion from "./StarRatingQuestion";
import { useDrop } from "react-dnd";

interface DraggableItem {
  questionId: string;
  type: string;
  questionType: string;
}

interface DroppableAreaProps {
  handleAddQuestion: (questionType: string) => void;
  handleDeleteQuestion: (questionId: string) => void;
  newQuestionText: string;
  setNewQuestionText: React.Dispatch<React.SetStateAction<string>>;
  newQuestionType: string;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({
  handleAddQuestion,
  handleDeleteQuestion,
  newQuestionText,
  setNewQuestionText,
  newQuestionType,
}) => {
  const [droppedItems, setDroppedItems] = useState<Array<DraggableItem>>([]);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "question",
    drop: (item: DraggableItem, monitor) => {
      handleAddQuestion(item.questionType);
      setDroppedItems((items) => [...items, item]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // conditionally styling the droppable area
  let backgroundColor = "white";
  if (canDrop) backgroundColor = "#f7f7f7";
  if (isOver) backgroundColor = "#eaeaea";

  return (
    <div ref={drop} style={{ backgroundColor }} className="droppableArea">
      {canDrop && <p>... PLACEHOLDER -- PUT A BOX HERE --</p>}
      {droppedItems.map((item, index) => {
        switch (item.questionType) {
          case "multipleChoice":
            return (
              <MultipleChoiceQuestion
                key={index}
                questionId={item.questionId}
                handleAddQuestion={handleAddQuestion}
                handleDeleteQuestion={handleDeleteQuestion}
                newQuestionType={item.questionType}
              />
            );
          case "writeIn":
            return (
              <WriteInQuestion
                key={index}
                questionId={item.questionId}
                handleAddQuestion={handleAddQuestion}
                handleDeleteQuestion={handleDeleteQuestion}
                newQuestionType={item.questionType}
              />
            );
          case "starRating":
            return (
              <StarRatingQuestion
                key={index}
                questionId={item.questionId}
                handleAddQuestion={handleAddQuestion}
                handleDeleteQuestion={handleDeleteQuestion}
                newQuestionType={item.questionType}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default DroppableArea;
