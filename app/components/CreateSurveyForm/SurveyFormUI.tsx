import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import { QuestionType } from "@/app/types/QuestionTypes";
import "@/app/styles/formStyles.css";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useDrop } from "react-dnd";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

const SurveyFormUI: React.FC<{
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  questions: QuestionType[];
  newQuestionType: string;
  setNewQuestionType: React.Dispatch<React.SetStateAction<string>>;
  newQuestionText: string;
  setNewQuestionText: React.Dispatch<React.SetStateAction<string>>;
  newQuestionChoicesArray: string[];
  handleAddChoice: (choice: string) => void;
  handleAddQuestion: (answerType: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
}> = ({
  title,
  setTitle,
  description,
  setDescription,
  questions,
  newQuestionType,
  setNewQuestionType,
  newQuestionText,
  setNewQuestionText,
  newQuestionChoicesArray,
  handleAddChoice,
  handleAddQuestion,
  handleSubmit,
}) => {
  const [newChoice, setNewChoice] = useState("");
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);

  const [, drop] = useDrop(() => ({
    accept: "question",
    drop: () => ({ name: "SurveyFormUI" }),
  }));

  return (
    <form ref={drop} onSubmit={handleSubmit} className="formContainer">
      <div className="inputWrapper">
        {isTitleEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsTitleEditing(false)}
            className="editInput title"
            autoFocus
          />
        ) : (
          <h2 onClick={() => setIsTitleEditing(true)} className="title">
            {title || "Edit Title Here"}
          </h2>
        )}
        <PencilSquareIcon
          className="editIcon"
          onClick={() => setIsTitleEditing(true)}
        />
      </div>

      <div className="inputWrapper">
        {isDescriptionEditing ? (
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setIsDescriptionEditing(false)}
            autoFocus
            className="editInput description"
          />
        ) : (
          <h3
            onClick={() => setIsDescriptionEditing(true)}
            className="description"
          >
            {description || "Edit Description Here"}
          </h3>
        )}
        <PencilSquareIcon
          className="editIcon"
          onClick={() => setIsDescriptionEditing(true)}
        />
      </div>

      <DroppableArea
        handleAddQuestion={handleAddQuestion}
        newQuestionText={newQuestionText}
        setNewQuestionText={setNewQuestionText}
        newQuestionType={newQuestionType}
      />

      {questions.map((question, index) => (
        <Questions key={index} data={question} />
      ))}

      <div className="border-t my-4 border-gray-300" />
      <div className="container">
        <button type="submit" className="btnWrapper">
          Publish Survey
        </button>
      </div>
    </form>
  );
};

export default SurveyFormUI;

interface DraggableItem {
  type: string;
  questionType: string;
}

interface DroppableAreaProps {
  handleAddQuestion: (questionType: string) => void;
  newQuestionText: string;
  setNewQuestionText: React.Dispatch<React.SetStateAction<string>>;
  newQuestionType: string;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({
  handleAddQuestion,
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

  let backgroundColor = "white";
  if (canDrop) backgroundColor = "#f7f7f7";
  if (isOver) backgroundColor = "#eaeaea";

  return (
    <div ref={drop} style={{ backgroundColor }} className="droppableArea">
      {canDrop && <p>... PLACEHOLDER -- PUT A BOX HERE --</p>}
      {isOver && (
        <MultipleChoiceQuestion
          newQuestionText={newQuestionText}
          setNewQuestionText={setNewQuestionText}
          handleAddQuestion={handleAddQuestion}
          newQuestionType={newQuestionType}
        />
      )}
      {droppedItems.map((item, index) => (
        <MultipleChoiceQuestion
          key={index}
          newQuestionText={newQuestionText}
          setNewQuestionText={setNewQuestionText}
          handleAddQuestion={handleAddQuestion}
          newQuestionType={item.questionType}
        />
      ))}
    </div>
  );
};

// use later??

{
  /* {newQuestionType === "multipleChoice" && (
        <>
          <div className="container">
            {newQuestionChoicesArray.map((choice, index) => (
              <span key={index}>{choice}</span>
            ))}
          </div>
          {newQuestionChoicesArray.length < 4 && (
            <div className="container">
              <input
                type="text"
                placeholder="Choice"
                value={newChoice}
                onChange={(e) => setNewChoice(e.target.value)}
                className="inputField mr-2"
              />
              <button
                type="button"
                onClick={() => {
                  handleAddChoice(newChoice);
                  setNewChoice("");
                }}
                className="btnWrapper"
              >
                Add Choice
              </button>
            </div>
          )}
        </>
      )}
      {newQuestionType === "writeIn" && (
        <div>
          <h2 className="textXL">Sample Write In Question</h2>
          <textarea
            placeholder="Your answer here..."
            className="textInput"
            rows={3}
            readOnly
          />
        </div>
      )}
      {newQuestionType === "starRating" && (
        <div>
          <h2 className="textXL">Sample Star Rating Question</h2>
          <div className="flexCenter">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button key={rating} type="button" className="textGray">
                ☆<span>{rating}</span>
              </button>
            ))}
          </div>
        </div>
      )} */
}

{
  /* <label className="selectLabel">
        Select an option
        <select
          value={newQuestionType}
          onChange={(e) => setNewQuestionType(e.target.value)}
          className="selectDropdown"
        >
          <option value="">Choose a type of question</option>
          <option value="writeIn">Write In</option>
          <option value="multipleChoice">Multiple Choice</option>
          <option value="starRating">Star Rating</option>
        </select>
      </label>

      <MultipleChoiceQuestion
        newQuestionText={newQuestionText}
        setNewQuestionText={setNewQuestionText}
        handleAddQuestion={handleAddQuestion}
        newQuestionType={newQuestionType}
      /> */
}
