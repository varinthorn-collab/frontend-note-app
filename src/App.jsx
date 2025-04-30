import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNote";
import NoteDetailsPage from "./pages/NoteDetailsPage";
import PublicProfilePage from "./pages/PublicProfilePage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* Add more routes here */}
          <Route
            path="/notes/:noteId"
            element={
              <ProtectedRoute>
                <NoteDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:userId" element={<PublicProfilePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
