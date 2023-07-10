import { useDrag } from "react-dnd";
import { ListBulletIcon } from "@heroicons/react/24/outline";

const itemTypes = {
  QUESTION: "question",
};

const questionTypes = {
  multipleChoice: "Multiple Choice",
  starRating: "Star Rating",
  writeIn: "Write-In",
};

export default function SurveySidebar() {
  return (
    <div className="fixed top-16 left-0 bg-gray-400 text-white p-4">
      <h2 className="text-2xl mb-4">Drag and drop</h2>
      <h3 className="text-xl mb-2">Pick a question type</h3>
      {/* divider */}
      <div className="border-t my-4 border-gray-300"></div>

      {Object.entries(questionTypes).map(([type, displayName]) => (
        <DraggableQuestionType
          key={type}
          type={type}
          displayName={displayName}
        />
      ))}
    </div>
  );
}

const DraggableQuestionType: React.FC<{
  type: string;
  displayName: string;
}> = ({ type, displayName }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: itemTypes.QUESTION,
    item: { questionType: type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`group flex flex-row block py-3 px-5 hover:bg-gray-600 rounded ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <ListBulletIcon className="opacity-0 group-hover:opacity-100 transition-opacity right-3 top-1/2 w-6 h-6 mr-2" />
      {displayName}
    </div>
  );
};
