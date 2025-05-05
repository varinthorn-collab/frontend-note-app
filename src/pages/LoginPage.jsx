import { useState } from "react";
import {  Link } from "react-router-dom"; // Import Link
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import api from "../services/api"; // Import the configured api instance

const LoginPage = () => {
  const { login } = useAuth(); // Get the login function from context
  // No need for navigate directly here if context handles it

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Call loginUser service - it should handle the token internally (e.g., store it)
      // Pass credentials as an object
      await loginUser({ email, password });

      // 2. If loginUser was successful (didn't throw), fetch the user profile
      // The api instance should now automatically send the token
      console.log("Attempting to fetch profile...");
      const profileResponse = await api.get("/mongo/auth/profile");
      console.log("Profile Response Received:", profileResponse);

      // 3. Check if profile fetch was successful and contains user data
      console.log("Profile Data:", profileResponse.data);
      if (profileResponse.data && profileResponse.data.user) {
        // 4. Call the context's login function with the fetched user data
        // This will update the user state in context AND navigate to /dashboard
        login(profileResponse.data.user);
      } else {
        throw new Error("Failed to fetch user profile after login."); // Or handle more gracefully
      }

    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--earth-bg)]">
      <div className="bg-[var(--earth-surface)] p-8 rounded-2xl shadow-md w-full max-w-md border border-[var(--earth-border)]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[var(--earth-text)]">
          Login to Your Account
        </h2>

        {error && (
          <div className="bg-[var(--earth-error-bg)] text-[var(--earth-error-text)] px-4 py-2 rounded text-center mb-4 border border-[var(--earth-error-border)]">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--earth-text)]"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-[var(--earth-input-border)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--earth-focus-ring)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--earth-text)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-[var(--earth-input-border)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--earth-focus-ring)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--earth-accent)] hover:bg-[var(--earth-accent-hover)] cursor-pointer text-white font-medium py-2 rounded-md transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--earth-text)] mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-[var(--earth-accent)]  hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
