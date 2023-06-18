import { useState } from "react";
import "../../../styles/surveyStyles.css";
import "../../../styles/loading.css";
import { BasicInfoProps } from "../../../types/SurveyFormTypes";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseClient";

export function BasicInfo({
  title,
  setTitle,
  description,
  setDescription,
  onNext,
  loading,
  setLoading,
}: BasicInfoProps) {
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTitleError("");
    setDescriptionError("");

    if (!title) {
      setTitleError("Title is required.");
    }

    if (!description) {
      setDescriptionError("Description is required.");
    }

    if (!title || !description) {
      return;
    }

    try {
      const formId = Date.now().toString();
      const docRef = doc(db, "initialStep", formId);
      setLoading(true);

      await setDoc(docRef, {
        title: title,
        description: description,
      });

      onNext();
    } catch (error) {
      console.error("Error submitting form: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form flex flex-col items-center justify-center m-8"
    >
      <div className="flex-1">
        <label className="block">
          <span className="text-gray-700">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="Employee Insights"
          />
          {titleError && <p className="error-message">{titleError}</p>}
        </label>
        <label className="block mt-4">
          <span className="text-gray-700">Description</span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
            placeholder="Build your custom survey"
          />
          {descriptionError && (
            <p className="error-message">{descriptionError}</p>
          )}
        </label>
        <button type="submit" className="button" disabled={loading}>
          {loading ? (
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-7 w-7"></div>
          ) : (
            "Create"
          )}
        </button>
      </div>
    </form>
  );
}
