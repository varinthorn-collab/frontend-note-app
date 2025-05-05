import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../services/notesService";

const NoteDetailsPage = () => {
  const { noteId } = useParams(); // Get the note ID from the URL
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    isPinned: false,
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(noteId); // Fetch the note by ID
        setNote(data.note);
        setFormData({
          title: data.note.title,
          content: data.note.content,
          tags: data.note.tags.join(", "), // Convert tags array to a comma-separated string
          isPinned: data.note.isPinned,
        });
      } catch (err) {
        console.error("Failed to fetch note:", err);
        setError("Failed to load note details.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePin = () => {
    setFormData((prev) => ({ ...prev, isPinned: !prev.isPinned }));
  };

  const handleSaveNote = async () => {
    try {
      const updatedNote = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags back to an array
      };
      await updateNote(noteId, updatedNote); // Call the update endpoint
      setNote(updatedNote); // Update the local state
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      console.error("Failed to save note:", err);
      setError("Failed to save note. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--earth-bg)] text-[var(--earth-text)]">
        <div className="text-xl">Loading note details...</div>
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
    <div className="min-h-screen bg-[var(--earth-bg)] text-[var(--earth-text)] py-12">
      <div className="max-w-3xl mx-auto bg-[var(--earth-surface)] border border-[var(--earth-border)] rounded-lg shadow-lg p-8">
        {isEditing ? (
          // --- Edit Mode ---
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[var(--earth-text)] mb-1">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[var(--earth-input-border)] rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--earth-focus-ring)]"
                placeholder="Note Title"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-[var(--earth-text)] mb-1">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[var(--earth-input-border)] rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--earth-focus-ring)] min-h-[200px]"
                placeholder="Write your note here..."
              ></textarea>
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-[var(--earth-text)] mb-1">Tags (comma-separated)</label>
              <input
                id="tags"
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[var(--earth-input-border)] rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--earth-focus-ring)]"
                placeholder="e.g., work, personal, ideas"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="isPinned"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-[var(--earth-accent)] focus:ring-[var(--earth-accent)]"
                checked={formData.isPinned}
                onChange={handleTogglePin}
              />
              <label htmlFor="isPinned" className="text-sm font-medium text-[var(--earth-text)]">Pin this note</label>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSaveNote}
                className="bg-[var(--earth-accent)] text-white px-4 py-2 rounded-md hover:bg-[var(--earth-accent-hover)] transition duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)} // Cancel editing
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // --- View Mode ---
          <div>
            <h1 className="text-3xl font-bold mb-4 text-[var(--earth-text)]">{note.title}</h1>
            <p className="text-[var(--earth-text-secondary)] mb-6 whitespace-pre-wrap">{note.content}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[var(--earth-tag-bg)] text-[var(--earth-tag-text)] text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            {note.isPinned && (
              <div className="text-red-800 font-bold mb-4 text-sm flex items-center gap-1">
                <span className="text-lg">📌</span> Pinned
              </div>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[var(--earth-accent)] text-white px-4 py-2 rounded-md hover:bg-[var(--earth-accent-hover)] transition duration-300"
            >
              Edit Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetailsPage;
