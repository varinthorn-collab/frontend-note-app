// import { Link } from "react-router-dom";

// const HomePage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--earth-bg)] text-[var(--earth-text)]">
//       <h1 className="text-4xl font-bold mb-4 text-[var(--earth-text)]">
//         📒 Welcome to Notes App!
//       </h1>
//       <p className="text-[var(--earth-text)]">
//         Please{" "}
//         <Link to="/login" className="text-[var(--earth-text)] underline hover:underline">
//           log in
//         </Link>{" "}
//         to continue.
//       </p>
//     </div>
//   );
// };

// export default HomePage;

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[var(--earth-bg)] text-[var(--earth-text)]">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 text-[var(--earth-text)]">
          Welcome to NotesApp!
        </h1>
        <p className="text-xl mb-8 text-[var(--earth-text)] max-w-2xl mx-auto">
          Your simple, secure, and intelligent platform for capturing thoughts,
          ideas, and reminders. Stay organized and never lose track of your
          notes again.
        </p>
        <div className="space-x-4">
          <Link to="/signup">
            <button
              className="bg-[var(--earth-text)] hover:bg-[var(--earth-text-hover)] cursor-pointer text-white font-semibold py-3 px-6 rounded-md transition duration-300 text-lg"
            >
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button
              className="bg-transparent border border-[var(--earth-text)] text-[var(--earth-text)] hover:bg-[var(--white)] cursor-pointer font-semibold py-3 px-6 rounded-md transition duration-300 text-lg"
            >
              Log In
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[var(--earth-surface)] py-16 border-t border-b border-[var(--earth-border)]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-10 text-[var(--earth-text)]">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg border border-[var(--earth-border)]">
              <h3 className="text-xl font-semibold mb-2 text-[var(--earth-accent)]">📝 Easy Note Taking</h3>
              <p className="text-[var(--earth-muted-text)]">Quickly create, edit, and organize your notes with a clean and intuitive interface.</p>
            </div>
            <div className="p-6 rounded-lg border border-[var(--earth-border)]">
              <h3 className="text-xl font-semibold mb-2 text-[var(--earth-accent)]">🔒 Secure Authentication</h3>
              <p className="text-[var(--earth-muted-text)]">Your notes are protected with secure user login and authentication.</p>
            </div>
            <div className="p-6 rounded-lg border border-[var(--earth-border)]">
              <h3 className="text-xl font-semibold mb-2 text-[var(--earth-accent)]">☁️ Note Synced</h3>
              <p className="text-[var(--earth-muted-text)]">Access your notes from anywhere. Your data is safely stored and synced.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer/Call to Action */}
      <footer className="py-10 text-center">
        <p className="text-[var(--earth-muted-text)]">
          Ready to organize your thoughts?{" "}
          <Link to="/signup" className="text-[var(--earth-accent)] hover:underline font-semibold">
            Sign up now!
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;