import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./CSS/Announcements.css";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";

function Announcements() {
  const dialogRef = useRef(null);
  const noteDialogRef = useRef(null);
  const [announcements, setAnnouncements] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const openDialog = () => dialogRef.current.showModal();
  const closeDialog = () => dialogRef.current.close();

  const openNoteDialog = (announcement) => {
    setSelectedAnnouncement(announcement);
    noteDialogRef.current.showModal();
  };

  const closeNoteDialog = () => {
    noteDialogRef.current.close();
    setSelectedAnnouncement(null);
  };

  // Fetch announcements from the server
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    axios
      .get("http://localhost:8080/announcement/getAllAnnounce")
      .then((response) => {
        const sorted = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setAnnouncements(sorted.slice(0, 5)); // Keep only the latest 5
      })
      .catch((error) => console.error("Error fetching announcements:", error));
  };

  // Add new announcement
  const handleAdd = () => {
    const storedAdminId = localStorage.getItem("admin_id");
    if (!storedAdminId) {
      console.error("Admin not logged in");
      return;
    }

    const validAdminId = parseInt(storedAdminId, 10);
    if (isNaN(validAdminId)) {
      console.error("Invalid admin ID");
      return;
    }

    const newAnnouncement = {
      admin: { admin_id: validAdminId },
      message: newContent,
      created_at: new Date().toISOString(),
    };

    axios
      .post("http://localhost:8080/announcement/addAnnounce", newAnnouncement)
      .then(() => {
        fetchAnnouncements();
        setNewContent("");
        closeDialog();
      })
      .catch((error) => {
        console.error("Error adding announcement:", error);
      });
  };

  // Delete selected announcement
  const handleDelete = () => {
    if (!selectedAnnouncement) return;

    axios
      .delete(`http://localhost:8080/announcement/delete/${selectedAnnouncement.announcement_id}`)
      .then(() => {
        setAnnouncements((prev) =>
          prev.filter((a) => a.announcement_id !== selectedAnnouncement.announcement_id)
        );
        closeNoteDialog();
      })
      .catch((error) => {
        console.error("Error deleting announcement:", error);
      });
  };

  const latestAnnouncement =
    announcements.length > 0 ? announcements[announcements.length - 1] : null;

  return (
    <div>
      <HeaderAdmin />
      <Sidebar />
      <h1 className="announcement">Announcements</h1>

      <div className="announcement-container">
        <div className="latest-announcement">
          <h2>Latest Announcement</h2>
          {latestAnnouncement ? (
            <>
              <p>{latestAnnouncement.message}</p>
            </>
          ) : (
            <p>No announcements yet.</p>
          )}
        </div>

        <div className="notes-box">
          <h3>Notes</h3>
          <ul>
            {announcements.map((a, i) => (
              <li key={i} className="note-item" onClick={() => openNoteDialog(a)}>
                {a.message}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bottom-buttons">
        <div className="add-button" onClick={openDialog}>+</div>
        <div className="drafts-box">
          <p className="drafts-number">{announcements.length}</p>
          <p className="drafts-label">No. of announcement</p>
        </div>
      </div>

      {/* Add Announcement Dialog */}
      <dialog ref={dialogRef} className="announcement-dialog">
        <h2>New Announcement</h2>
        <textarea
          placeholder="Details..."
          className="dialog-textarea"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        ></textarea>
        <div className="dialog-buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={closeDialog}>Cancel</button>
        </div>
      </dialog>

      {/* View/Delete Note Dialog */}
      <dialog ref={noteDialogRef} className="note-dialog">
        <h2 className="Announcement">Announcement</h2>
        {selectedAnnouncement && (
          <>
            <p>{selectedAnnouncement.message}</p>
            <div className="dialog-buttons">
              <button onClick={handleDelete}>Delete</button>
              <button onClick={closeNoteDialog}>Close</button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}

export default Announcements;
