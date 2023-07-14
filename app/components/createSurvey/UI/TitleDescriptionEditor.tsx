import { useState } from "react";
import { useSurvey } from "@/app/context/SurveyContext";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const TitleDescriptionEditor = () => {
  const { title, setTitle, description, setDescription } = useSurvey();
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);

  return (
    <div className="formContainer">
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setIsDescriptionEditing(false)}
            className="editInput description"
            autoFocus
          />
        ) : (
          <p
            onClick={() => setIsDescriptionEditing(true)}
            className="description"
          >
            {description || "Edit Description Here"}
          </p>
        )}
        <PencilSquareIcon
          className="editIcon"
          onClick={() => setIsDescriptionEditing(true)}
        />
      </div>
    </div>
  );
};

export default TitleDescriptionEditor;
