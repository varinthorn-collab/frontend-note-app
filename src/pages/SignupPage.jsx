import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await signupUser({ fullName, email, password });
      setUser(data.user); // Save user to AuthContext
      navigate("/dashboard"); // Redirect on success
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--earth-bg)]">
      <div className="bg-[var(--earth-surface)] p-8 rounded-2xl shadow-md w-full max-w-md border border-[var(--earth-border)]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[var(--earth-text)]">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-[var(--earth-error-bg)] text-[var(--earth-error-text)] px-4 py-2 rounded text-center mb-4 border border-[var(--earth-error-border)]">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[var(--earth-text)]"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-[var(--earth-input-border)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--earth-focus-ring)]"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoFocus
            />
          </div>

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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[var(--earth-text)]"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-[var(--earth-input-border)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--earth-focus-ring)]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--earth-accent)] hover:bg-[var(--earth-accent-hover)] cursor-pointer text-white font-medium py-2 rounded-md transition duration-300"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--earth-text)] mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--earth-accent)] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
