import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyNotes } from "../services/notesService";
import NoteCard from "../components/notes/NoteCard";
import CreateNote from "./CreateNote";

const DashboardPage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]); // Start as empty array ✅
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchNotes = async () => {
    try {
      const data = await getMyNotes();
      console.log(data);
      setNotes(data.notes || []); // Safe fallback ✅
    } catch (err) {
      console.error(err);
      setError("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.fullName || "User"} 👋
      </h1>
      {/* Pass fetchNotes as a prop to CreateNote */}
      <CreateNote onNoteAdded={fetchNotes} />

      {Array.isArray(notes) && notes.length === 0 ? (
        <p className="text-gray-600">You have no notes yet. Start writing!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
