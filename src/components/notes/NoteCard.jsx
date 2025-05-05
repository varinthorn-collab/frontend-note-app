import { Link } from "react-router-dom";
// import { updateNoteVisibility } from "../../services/notesService";

const NoteCard = ({ note, onDelete }) => {
  // const [isPublic, setIsPublic] = useState(note.isPublic); // Local state for visibility

  // const handleToggleVisibility = async () => {
  //   try {
  //     const updatedNote = await updateNoteVisibility(note._id, !isPublic);
  //     setIsPublic(updatedNote.note.isPublic); // Update local state to trigger re-render
  //   } catch (err) {
  //     console.error("Failed to update note visibility:", err);
  //   }
  // };

  return (
    <div className="bg-[var(--earth-surface)] border border-[var(--earth-border)] shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div>
        {/* Pinned Icon */}
        {note.isPinned && (
          <div className="flex items-center mb-2">
            <span className="text-red-800 text-sm font-bold">📌 Pinned</span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2 text-[var(--earth-text)] truncate">
          {note.title}
        </h2>

        {/* Content */}
        <p className="text-[var(--earth-text-secondary)] text-sm line-clamp-4 mb-3">{note.content}</p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[var(--earth-tag-bg)] text-[var(--earth-tag-text)] text-xs font-medium px-2.5 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--earth-divider)]">
        {/* Created Date */}
        <span className="text-xs text-[var(--earth-text-tertiary)]">
          {new Date(note.createdOn).toLocaleDateString()}
        </span>

        {/* Actions */}
        <div className="flex gap-2 items-center">
          <Link
            to={`/notes/${note._id}`}
            className="px-3 py-1 text-xs font-medium cursor-pointer  text-white bg-[var(--earth-text)] rounded hover:bg-[var(--earth-text-hover)] transition duration-200"
          >
            View Details
          </Link>
          <Link
            to={`/notes/${note._id}`}
            className="px-3 py-1 text-xs font-medium cursor-pointer  text-white bg-[var(--earth-accent)] rounded hover:bg-[var(--earth-accent-hover)] transition duration-200"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(note._id)}
            className="px-3 py-1 text-xs font-medium cursor-pointer text-[var(--earth-error-text)] bg-[var(--earth-error-bg)] border border-[var(--earth-error-border)] rounded hover:bg-opacity-80 transition duration-200"
          >
            Delete
          </button>
          {/* <button
            onClick={handleToggleVisibility}
            className={`${
              isPublic
                ? "text-yellow-500 hover:text-yellow-700"
                : "text-gray-500 hover:text-gray-700"
            } transition`}
          >
            {isPublic ? "Unpublish" : "Publish"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
