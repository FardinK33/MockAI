import { Route, Routes } from "react-router-dom";
import InterviewPage from "./pages/interview-page";
import InterviewAnalysis from "./pages/interview-analysis-page";
import LoginPage from "./pages/login-page";
import StartInterview from "./pages/start-interview";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StartInterview />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/interview" element={<InterviewPage />} />
      <Route path="/analysis" element={<InterviewAnalysis />} />
    </Routes>
  );
};

export default App;
