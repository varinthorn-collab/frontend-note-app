import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div>
        <h2 className="text-xl font-bold mb-2 text-gray-800 truncate">
          {note.title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-4">
          {note.content}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
        <span>
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
        <Link
          to={`/notes/${note._id}`}
          className="text-blue-500 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default NoteCard;
