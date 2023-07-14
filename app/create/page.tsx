"use client";
import DashboardNavbar from "../components/Navbar/DashBoardNavbar";
// import CreateSurveyComponent from "../components/d_CreateSurvey/CreateSurvey";
import SurveyBuilder from "../components/createSurvey/SurveyBuilder";
import { SurveyProvider } from "../context/SurveyContext";

export default function CreateSurvey() {
  return (
    <SurveyProvider>
      <DashboardNavbar />
      {/* <CreateSurveyComponent /> */}
      <SurveyBuilder />
    </SurveyProvider>
  );
}
