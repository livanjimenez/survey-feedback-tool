import { QuestionData } from "../types/SurveyFormTypes";

interface QuestionPreviewProps {
  data: QuestionData | null;
}

const MultipleChoiceQuestionPreview: React.FC<QuestionPreviewProps> = ({
  data,
}) => {
  if (!data) return null;

  return (
    <div>
      <h2>Preview:</h2>
      <h3>{data.question}</h3>
      <ul>
        {data.choices.map((choice, index) => (
          <li key={index}>{choice.text}</li>
        ))}
      </ul>
      <p>Answer type: {data.answerType}</p>
    </div>
  );
};

export { MultipleChoiceQuestionPreview };
