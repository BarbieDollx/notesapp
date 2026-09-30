import React, { useState } from "react";
import "./EditorMode.css";
import { Check, Copy, Palette, Tag, X } from "lucide-react";
import { COLORS } from "../../utils/constraint";

const EditorMode = ({ note: initialNote, onSave, onClose }) => {
  const [note, setNote] = useState({ ...initialNote });
  const [tagInput, setTagInput] = useState("");

  const handleChange = (field, value) => {
    setNote((prev) => ({
      ...prev,
      [field]: value,
      date: new Date().toISOString(),
    }));
  };

  const addTag = (e) => {
    if (e.key !== "Enter" || !tagInput.trim()) return;
    e.preventDefault();
    const trimmed = tagInput.trim();
    if (!note.tags.includes(trimmed)) {
      handleChange("tags", [...note.tags, trimmed]);
    }
    setTagInput("");
  };

  const removeTag = (tag) => {
    handleChange(
      "tags",
      note.tags.filter((t) => t !== tag)
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
  };

  return (
    <div className="mode-overlay" onClick={onClose}>
      <div
        className="editor-mode glass"
        style={{background: note.color !== "var(--glass-bg)" ? note.color : "var(--glass-bg)"}}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="editor-header">
          <input
            type="text"
            className="editor-title"
            placeholder="Note Title"
            value={note.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="icon-btn" title="Copy Note" onClick={copyToClipboard}>
              <Copy size={20} />
            </button>

            <button
              className="icon-btn"
              style={{ background: "var(--success)", color: "white" }}
              onClick={() => onSave(note)}
            >
              <Check size={20} />
            </button>

            <button className="icon-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="editor-toolbar">
          <Palette size={16} opacity={0.6} />

          <div className="color-picker">
            {COLORS.map((c) => (
              <div
                key={c}
                className={`color-circle ${note.color === c ? "active" : ""}`}
                style={{ background: c, border: "1px solid transparent" }}
                onClick={() => handleChange("color", c)}
              />
            ))}
          </div>

          <div
            style={{width: "1px", height: "24px", background: "var(--glass-border)", margin: "0 0.5rem", }}
          />

          <Tag size={16} opacity={0.6} />

          <div className="tag-row" style={{ flex: "1" }}>
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="tag"
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                #{tag}
                <X
                  size={12}
                  style={{ cursor: "pointer" }}
                  onClick={() => removeTag(tag)}
                />
              </span>
            ))}
            <input
              type="text"
              placeholder="Add tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              style={{background: "transparent", border: "none", color: "inherit", outline: "none", fontSize: "0.8rem",}}
            />
          </div>
        </div>

        <textarea
          className="editor-content"
          placeholder="Start typing your note here..."
          autoFocus
          value={note.content}
          onChange={(e) => handleChange("content", e.target.value)}
        />
      </div>
    </div>
  );
};

export default EditorMode;