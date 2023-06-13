import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  QuestionProps,
  QuestionData,
  ChoiceData,
} from "../types/SurveyFormTypes";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";
import { MultipleChoiceQuestionPreview } from "./MultipleChoiceQuestionPreview";

const MultipleChoiceQuestion: React.FC<QuestionProps> = ({
  onSubmit,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<QuestionData>({
    defaultValues: {
      question: "",
      choices: [{ text: "" }],
      answerType: "radio",
    },
  });

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices",
  });

  const handleFormSubmit = async (data: QuestionData) => {
    try {
      // Create a new document in Firestore
      const questionId = Date.now().toString();
      const docRef = doc(db, "multipleChoiceQuestion", questionId);

      // Set loading state
      setLoading(true);

      await setDoc(docRef, {
        question: data.question,
        choices: data.choices,
        answerType: data.answerType,
      });

      setQuestions([...questions, data]);

      // Reset the form
      reset({
        question: "",
        choices: [{ text: "" }],
        answerType: "radio",
      });
    } catch (error) {
      console.error("Error submitting question: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    onSubmit(questions);
  };

  const handleAddChoice = () => {
    if (fields.length < 4) {
      append({ text: "" } as ChoiceData);
    } else {
      alert("You can only add up to 4 choices.");
    }
  };

  const handleRemoveChoice = (index: number) => {
    remove(index);
  };

  const currentData = watch();

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label className="block">
          <span className="text-gray-700">Question:</span>
          <input
            type="text"
            {...register("question", { required: true })}
            className="input"
          />
          {errors.question && <p>Please enter a question.</p>}
        </label>

        <div className="flex flex-col space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <input
                type="text"
                {...register(`choices.${index}.text` as const, {
                  required: true,
                })}
                className="input"
              />
              <button
                type="button"
                onClick={() => handleRemoveChoice(index)}
                className="button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={handleAddChoice} className="button">
          Add Choice
        </button>

        <div>
          <span className="text-gray-700">Answer Type:</span>
          <div className="flex items-center space-x-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="radio"
                {...register("answerType")}
                className="input"
              />
              <span className="ml-2">Radio</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="checkbox"
                {...register("answerType")}
                className="input"
              />
              <span className="ml-2">Checkbox</span>
            </label>
          </div>
        </div>

        {/* <button type="submit" className="button mt-4">
          
        </button> */}
        <button type="submit" className="button mt-4" disabled={loading}>
          {loading ? (
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-7 w-7"></div>
          ) : (
            "Add Question"
          )}
        </button>
      </form>
      <button onClick={onBack} className="button mt-4">
        Back to Question Types
      </button>
      <button onClick={handleFinish} className="button mt-4">
        Finish
      </button>

      <MultipleChoiceQuestionPreview data={currentData} />
    </>
  );
};

export { MultipleChoiceQuestion };
