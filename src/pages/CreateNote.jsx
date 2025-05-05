import { useState } from "react";
import { createNote } from "../services/notesService";

const CreateNote = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(""); // New state for tags
  const [isPinned, setIsPinned] = useState(false); // New state for pin state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newNote = await createNote({
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()), // Convert tags string to array
        isPinned,
      });
      setTitle("");
      setContent("");
      setTags("");
      setIsPinned(false);
      if (onNoteAdded) onNoteAdded(newNote); // Trigger re-fetch or update notes
    } catch (err) {
      console.error("Failed to create note:", err);
      setError("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create a New Note</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            className="w-full border px-3 py-2 rounded-md min-h-[150px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-md"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPinned"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isPinned" className="font-medium">
            Pin this note
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className=" mb-6 flex items-center gap-2 bg-[var(--earth-text)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[var(--earth-text-hover)] transition duration-300"
        >
      
      
          {loading ? "Saving..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
