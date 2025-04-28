import { Link } from "react-router-dom";
import { useState } from "react";
import { updateNoteVisibility } from "../../services/notesService";

const NoteCard = ({ note, onDelete }) => {
  const [isPublic, setIsPublic] = useState(note.isPublic); // Local state for visibility

  const handleToggleVisibility = async () => {
    try {
      const updatedNote = await updateNoteVisibility(note._id, !isPublic);
      setIsPublic(updatedNote.note.isPublic); // Update local state to trigger re-render
    } catch (err) {
      console.error("Failed to update note visibility:", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div>
        {/* Pinned Icon */}
        {note.isPinned && (
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 text-sm font-bold">📌 Pinned</span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold mb-2 text-gray-800 truncate">
          {note.title}
        </h2>

        {/* Content */}
        <p className="text-gray-600 text-sm line-clamp-4">{note.content}</p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
        {/* Created Date */}
        <span>Created on: {new Date(note.createdOn).toLocaleDateString()}</span>

        {/* Actions */}
        <div className="flex space-x-2 items-center">
          <Link
            to={`/notes/${note._id}`}
            className="text-blue-500 hover:underline"
          >
            View Details
          </Link>
          <Link
            to={`/notes/${note._id}`}
            className="text-green-500 hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
          <button
            onClick={handleToggleVisibility}
            className={`${
              isPublic
                ? "text-yellow-500 hover:text-yellow-700"
                : "text-gray-500 hover:text-gray-700"
            } transition`}
          >
            {isPublic ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
