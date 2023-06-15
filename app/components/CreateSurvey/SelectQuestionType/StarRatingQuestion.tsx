import { useState } from "react";
import { useForm } from "react-hook-form";
import { QuestionProps, QuestionData } from "../../../types/SurveyFormTypes";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseClient";

const StarRatingQuestion: React.FC<QuestionProps> = ({ onSubmit, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionData>();

  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const handleFormSubmit = async (data: QuestionData) => {
    try {
      // Create a new document in Firestore
      const questionId = Date.now().toString();
      const docRef = doc(db, "starRatingQuestion", questionId);

      await setDoc(docRef, {
        question: data.question,
      });

      setQuestions([...questions, data]);

      onSubmit(questions);
      // onBack();
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

export { StarRatingQuestion };
