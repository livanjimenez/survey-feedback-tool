"use client";
import DashboardNavbar from "../components/Navbar/DashBoardNavbar";
import SurveyBuilder from "../components/createSurvey/SurveyBuilder";
import { SurveyProvider } from "../context/SurveyContext";

export default function CreateSurvey() {
  return (
    <SurveyProvider>
      <DashboardNavbar />
      <SurveyBuilder />
    </SurveyProvider>
  );
}
