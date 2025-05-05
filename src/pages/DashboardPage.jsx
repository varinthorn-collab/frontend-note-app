import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteNote, getMyNotes, searchNotes } from "../services/notesService";
import NoteCard from "../components/notes/NoteCard";
import CreateNote from "./CreateNote";

const DashboardPage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const fetchNotes = async () => {
    try {
      const data = await getMyNotes();
      setNotes(data.notes || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load notes.");
    } finally {
      setLoadingNotes(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      fetchNotes();
    } catch (err) {
      console.error("Failed to delete note:", err);
      setError("Failed to delete note.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchNotes();
      return;
    }

    try {
      const data = await searchNotes(searchQuery);
      setNotes(data.notes || []);
    } catch (err) {
      console.error("Failed to search notes:", err);
      setError("Failed to search notes.");
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Assuming fetchNotes doesn't rely on changing props/state not listed

  if (loadingNotes)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--earth-bg)] text-[var(--earth-text)]">
        <div className="text-xl">Loading user notes...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--earth-bg)]">
        <div className="bg-[var(--earth-error-bg)] text-[var(--earth-error-text)] px-4 py-3 rounded border border-[var(--earth-error-border)]">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--earth-bg)] text-[var(--earth-text)] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl text-center font-bold mb-6">
        Welcome, {user?.name || "User"} 👋
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes by title, content, or tags"
          className="flex-grow px-3 py-2 border border-[var(--earth-input-border)] rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--earth-focus-ring)]"
        />
        <button
          type="submit"
          className="bg-[var(--earth-accent)] text-white px-4 py-2 rounded-md hover:bg-[var(--earth-accent-hover)] transition duration-300"
        >
          Search
        </button>
      </form>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 flex items-center gap-2 bg-[var(--earth-text)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[var(--earth-text-hover)] transition duration-300"
      >

        <span className="text-xl font-semibold leading-none">+</span>
        <span>Create Note</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // Close modal when clicking on the backdrop
        >
          <div
            className="bg-[var(--earth-surface)] rounded-lg shadow-xl p-6 w-full max-w-lg relative border border-[var(--earth-border)]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              onClick={() => setIsModalOpen(false)} // Explicit close button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <CreateNote
              onNoteAdded={() => {
                fetchNotes();
                setIsModalOpen(false); // Close modal after note is added
              }}
            />
          </div>
        </div>
      )}

      {Array.isArray(notes) && notes.length === 0 ? (
        <p className="text-center text-[var(--earth-text-secondary)] mt-10">
          You have no notes yet. Click "Create Note" to start writing!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDeleteNote} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default DashboardPage;
