import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-[var(--earth-surface)] border-b border-[var(--earth-border)] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link
          to={user ? "/dashboard" : "/"}
          className="text-xl font-bold text-[var(--earth-text)]"
        >
          📒 NotesApp
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <h3 className="text-sm text-[var(--earth-muted-text)]">{user.email}</h3>
            <Link
              to="/dashboard"
              className="text-[var(--earth-text)] hover:text-[var(--earth-accent)] transition"
            >
              Dashboard
            </Link>
            <Link
              to={user && user._id ? `/profile/${user._id}` : "#"}
              className="text-[var(--earth-text)] hover:text-[var(--earth-accent)] transition"
            >
              Profile
            </Link>
            <button
              onClick={logout} // Call the logout function when clicked
              className="text-[var(--earth-error-text)] hover:opacity-80 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="text-[var(--earth-text)] hover:text-[var(--earth-accent)] transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="text-[var(--earth-text)] hover:text-[var(--earth-accent)] transition"
            >
              Login
            </Link>
            
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
