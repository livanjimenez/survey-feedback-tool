import { useForm } from "react-hook-form";
import { QuestionProps, QuestionData } from "../types/SurveyFormTypes";

const WriteInQuestion: React.FC<QuestionProps> = ({ onSubmit, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionData>();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
