import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      setUser(data.user); // Save user to AuthContext
      navigate("/dashboard"); // Redirect after successful login
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
