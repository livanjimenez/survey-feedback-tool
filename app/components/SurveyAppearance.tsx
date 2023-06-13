import { useState } from "react";
import {
  SurveyAppearanceProps,
  AppearanceData,
} from "../types/SurveyFormTypes";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";

const SurveyAppearance: React.FC<SurveyAppearanceProps> = ({
  onNext,
  onBack,
}) => {
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [fontColor, setFontColor] = useState("#000000");
  const [isGradient, setIsGradient] = useState(false);

  const handleSubmit = async () => {
    const appearanceData = { bgColor, fontColor, isGradient };
    onNext(appearanceData);

    // Store the appearance data in Firestore
    const docId = Math.random().toString(36).substring(2); // Generate a new document ID
    await setDoc(doc(db, "appearances", docId), appearanceData);
  };

  return (
    <div>
      <h2>Customize Your Survey Appearance</h2>
      <label>
        Background color:
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </label>
      <label>
        Font color:
        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
      </label>
      <label>
        Background gradient:
        <input
          type="checkbox"
          checked={isGradient}
          onChange={(e) => setIsGradient(e.target.checked)}
        />
      </label>
      <button onClick={handleSubmit}>Next</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default SurveyAppearance;
export type { AppearanceData };
