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
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded-md mb-4"
            placeholder="Title"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded-md mb-4 min-h-[150px]"
            placeholder="Content"
          ></textarea>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded-md mb-4"
            placeholder="Tags (comma-separated)"
          />
          <div className="flex items-center mb-4">
            <label className="mr-2">Pinned:</label>
            <input
              type="checkbox"
              checked={formData.isPinned}
              onChange={handleTogglePin}
            />
          </div>
          <button
            onClick={handleSaveNote}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Note
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
          <p className="text-gray-700 mb-4">{note.content}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          {note.isPinned && (
            <div className="text-yellow-500 font-bold mb-4">📌 Pinned</div>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Edit Note
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteDetailsPage;
