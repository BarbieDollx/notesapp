import React from "react";
import { ArchiveRestore, Pin, Star, Trash2 } from "lucide-react";
import "./NotesCard.css";

const NotesCard = ({
  note,
  setEditingNote,
  toggleStatus,
  moveToTrash,
  restoreFromTrash,
  deleteForever,
}) => {
  const isTrash = note.trash;

  return (
    <div
      className="note-card glass glass-card"
      style={{ background: note.color }}
      onClick={() => setEditingNote(note)}
    >
      <div className="note-header">
        <div className="note-title">{note.title || "Untitled"}</div>

        <div style={{ display: "flex", gap: "0.25rem" }}>
          {!isTrash && (
            <>
              <button
                className="icon-btn"
                style={{ padding: "4px" }}
                onClick={(e) => toggleStatus(e, note.id, "pinned")}
                title="Pin"
              >
                <Pin size={16} color={note.pinned ? "var(--primary)" : undefined} />
              </button>

              <button
                className="icon-btn"
                style={{ padding: "4px" }}
                onClick={(e) => toggleStatus(e, note.id, "favourite")}
                title="Favourite"
              >
                <Star
                  size={16}
                  color={note.favourite ? "var(--primary)" : undefined}
                />
              </button>

              <button
                className="icon-btn"
                style={{ padding: "4px" }}
                onClick={(e) => moveToTrash(e, note.id)}
                title="Move to trash"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}

          {isTrash && (
            <>
              <button
                className="icon-btn"
                style={{ padding: "4px" }}
                onClick={(e) => restoreFromTrash(e, note.id)}
                title="Restore"
              >
                <ArchiveRestore size={16} />
              </button>

              <button
                className="icon-btn"
                style={{ padding: "4px" }}
                onClick={(e) => deleteForever(e, note.id)}
                title="Delete forever"
              >
                <Trash2 size={16} color="var(--danger)" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="note-content">{note.content || "Empty note"}</div>

      <div className="note-footer">
        <span>{new Date(note.date).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default NotesCard;