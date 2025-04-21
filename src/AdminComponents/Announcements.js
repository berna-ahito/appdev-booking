import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./CSS/Announcements.css";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";

function Announcements() {
  const dialogRef = useRef(null);
  const [announcements, setAnnouncements] = useState([]);
  const [newContent, setNewContent] = useState("");

  const openDialog = () => dialogRef.current.showModal();
  const closeDialog = () => dialogRef.current.close();

  // Fetch announcements from the server
  useEffect(() => {
    axios
      .get("http://localhost:8080/announcement/getAllAnnounce")
      .then((response) => {
        const sorted = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        //Keeping 5 announcement
        setAnnouncements(sorted.slice(0, 5)); 
      })
      .catch((error) => console.error("Error fetching announcements:", error));
  }, []);
  

  //For adding announcement
  const handleAdd = () => {
    const storedAdminId = localStorage.getItem("admin_id"); 
    if (!storedAdminId) {
      console.error("Admin not logged in");
      return;
    }
    //Debugging time!!!!!
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

    console.log("Request Payload:", newAnnouncement); 
    //Auto refresh
    axios
    .post("http://localhost:8080/announcement/addAnnounce", newAnnouncement)
    .then(() => {
      // Re-fetch all announcements
      axios
        .get("http://localhost:8080/announcement/getAllAnnounce")
        .then((response) => setAnnouncements(response.data))
        .catch((error) =>
          console.error("Error fetching announcements:", error)
        );

      setNewContent("");
      closeDialog();
    })
    .catch((error) => {
      console.error("Error adding announcement:", error);
      console.error("Error details:", error.response);
    });
  };

  //For the latest announcement
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
              <li key={i}>{a.message}</li>
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

      {/* Dialog Box */}
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
    </div>
  );
}

export default Announcements;
