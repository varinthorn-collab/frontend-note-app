import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Navbar from "../components/common/Navbar";
import HomePage from "../pages/HomePage";
import CreateNote from "../pages/CreateNote";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
                <CreateNote />
              </ProtectedRoute>
            }
          />
          {/* Add more routes here */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
