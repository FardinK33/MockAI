import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components";
import Loader from "./pages/loader";

const LoginPage = lazy(() => import("./pages/login-page"));
const Homepage = lazy(() => import("./pages/home-page"));
const StartInterview = lazy(() => import("./pages/start-interview"));
const InterviewPage = lazy(() => import("./pages/interview-page"));
const AnalysisPage = lazy(() => import("./pages/analysis-page"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/start-interview"
          element={
            <PrivateRoute>
              <StartInterview />
            </PrivateRoute>
          }
        />
        <Route
          path="/interview/:id"
          element={
            <PrivateRoute>
              <InterviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/analysis/:id"
          element={
            <PrivateRoute>
              <AnalysisPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
