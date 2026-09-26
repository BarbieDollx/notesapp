import React from "react";
import "./NotesList.css";
import NotesCard from "../notescard/NotesCard";

const NotesList = ({notes,setEditingNote,toggleStatus,moveToTrash,restoreFromTrash,deleteForever,}) => {
  if (!notes.length) {
    return (
      <div style={{textAlign: "center", opacity: 0.5, marginTop: "2rem",}}>
        No Notes found.
      </div>
    );
  }

  return (
    <div className="note-grid">
      {notes.map((note) => (
        <NotesCard
          key={note.id}
          note={note}
          setEditingNote={setEditingNote}
          toggleStatus={toggleStatus}
          moveToTrash={moveToTrash}
          restoreFromTrash={restoreFromTrash}
          deleteForever={deleteForever}
        />
      ))}
    </div>
  );
};

export default NotesList;