import { useRouter } from "next/navigation";

interface EditButtonProps {
  surveyId: string;
}

const EditButton = ({ surveyId }: EditButtonProps) => {
  const router = useRouter();

  const handleRoute = () => {
    router.push(`/create/${surveyId}`);
  };

  return (
    <button
      type="button"
      onClick={handleRoute}
      className="rounded-lg opacity-60 hover:opacity-100 bg-blue-500 hover:bg-blue-700 h-10 w-16 text-white"
    >
      Edit
    </button>
  );
};

export default EditButton;
