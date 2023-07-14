import { useSurvey } from "@/app/context/SurveyContext";
import TitleDescriptionEditor from "./UI/TitleDescriptionEditor";
import "@/app/styles/formStyles.css";
import PublishButton from "./PublishButton";
import DraggableMenu from "./DraggableMenu";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const SurveyBuilder = () => {
  const { questions, addQuestion } = useSurvey();

  // UI for editing title and description
  // UI for adding and arranging questions
  // Pass the addQuestion function to the DraggableMenu component

  return (
    <DndProvider backend={HTML5Backend}>
      <TitleDescriptionEditor />
      <DraggableMenu questions={questions} addQuestion={addQuestion} />
      {/* UI for adding and arranging questions */}
      {/* Pass the addQuestion function to the DraggableMenu component */}
      <PublishButton />
    </DndProvider>
  );
};

export default SurveyBuilder;
