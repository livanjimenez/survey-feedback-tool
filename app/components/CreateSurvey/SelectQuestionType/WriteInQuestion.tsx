import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  QuestionProps,
  WriteInQuestionData,
} from "../../../types/SurveyFormTypes";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseClient";

const WriteInQuestion: React.FC<QuestionProps> = ({ onSubmit, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WriteInQuestionData>();

  const [questions, setQuestions] = useState<WriteInQuestionData[]>([]);

  const handleFormSubmit = async (data: WriteInQuestionData) => {
    try {
      // Create a new document in Firestore
      const questionId = Date.now().toString();
      const docRef = doc(db, "writeInQuestion", questionId);

      await setDoc(docRef, {
        question: data.question,
      });

      // might need to still do this once
      // I add functionality to include multiple questions in a survey
      // setQuestions([...questions, data]);

      // Directly add the new question to the existing questions before calling onSubmit
      onSubmit([...questions, data]);
    } catch (error) {
      console.error("Error submitting question: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label>
          <span>Question:</span>
          <input type="text" {...register("question", { required: true })} />
        </label>
        {errors.question && <p>Please enter a question.</p>}
        <button type="submit">Add Question</button>
      </form>
      <button onClick={onBack}>Back to Question Types</button>
    </div>
  );
};

export { WriteInQuestion };
