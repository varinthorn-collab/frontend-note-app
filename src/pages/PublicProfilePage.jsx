import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicProfile } from "../services/profileService";
// import {  getPublicNotes } from "../services/profileService";

const PublicProfilePage = () => {
  const { userId } = useParams(); // Get user ID from the URL
  const [profile, setProfile] = useState(null);
  // const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileAndNotes = async () => {
      try {
        const profileData = await getPublicProfile(userId);

        // const notesData = await getPublicNotes(userId);
        setProfile(profileData.user);

        // setNotes(notesData.notes);
      } catch (err) {
        console.error("Failed to fetch public profile or notes:", err);
        setError("Failed to load profile or notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndNotes();
  }, [userId]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--earth-bg)] text-[var(--earth-text)]">
        <div className="text-xl">Loading profile...</div>
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
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-[var(--earth-surface)] border border-[var(--earth-border)] rounded-lg shadow-lg p-8">
          {/* Placeholder for Profile Picture */}
          {/* <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-6"></div> */}

          <h1 className="text-3xl font-bold text-center mb-2 text-[var(--earth-text)]">
            {profile.name}'s Profile
          </h1>
          <br></br>
          <p className="text-center text-[var(--earth-text-secondary)] mb-6">Username: @{profile.username}</p>
          <p className="text-center text-[var(--earth-text-secondary)] mb-6">Email: {profile.email}</p>
          {/* Add more profile details here if available, e.g., Bio */}
        </div>

      {/* Public Notes Section (Styled to match theme if uncommented) */}
      {/* <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--earth-text)]">Public Notes</h2>
      {notes.length === 0 ? (
        <p className="text-[var(--earth-text-secondary)]">No public notes available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-[var(--earth-surface)] border border-[var(--earth-border)] shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-[var(--earth-text)] truncate">
                {note.title}
              </h3>
              <p className="text-[var(--earth-text-secondary)] text-sm line-clamp-4 mb-3">
                {note.content}
              </p>
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
          ))}
        </div>
      </div>
      )} */}
      </div>
    </div>
  );
};

export default PublicProfilePage;
