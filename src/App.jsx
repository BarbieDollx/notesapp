import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/header/Header";
import NotesList from "./components/noteslist/NotesList";
import EditorMode from "./components/editormode/EditorMode";
import { COLORS } from "./utils/constraint";

const App = () => {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("notes-app-data");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading notes from localStorage:", error);
      return [];
    }
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("notes-theme") || "dark";
  });

  const [activeTab, setActiveTab] = useState("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    localStorage.setItem("notes-app-data", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("notes-theme", theme);
  }, [theme]);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      color: COLORS[0],
      pinned: false,
      favourite: false,
      trash: false,
      tags: [],
      date: new Date().toISOString(),
    };
    setEditingNote(newNote);
  };

  const saveNote = (note) => {
    if (!note) return;
    setNotes((prev) => {
      const exists = prev.find((n) => n.id === note.id);
      if (exists) {
        return prev.map((n) => (n.id === note.id ? note : n));
      }
      return [note, ...prev];
    });
    setEditingNote(null);
  };

  const toggleStatus = (e, id, field) => {
    e.stopPropagation();
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, [field]: !n[field] } : n))
    );
  };

  const moveToTrash = (e, id) => {
    e.stopPropagation();
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, trash: true, pinned: false, favourite: false } : n
      )
    );
  };

  const restoreFromTrash = (e, id) => {
    e.stopPropagation();
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, trash: false } : n))
    );
  };

  const deleteForever = (e, id) => {
    e.stopPropagation();
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const exportNotes = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(notes));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", "notes-export.json");
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        if (activeTab === "notes") return !note.trash;
        if (activeTab === "favourites") return !note.trash && note.favourite;
        if (activeTab === "trash") return note.trash;
        return true;
      })
      .filter((note) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          note.title.toLowerCase().includes(q) ||
          note.content.toLowerCase().includes(q) ||
          note.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
        return new Date(b.date) - new Date(a.date);
      });
  }, [notes, activeTab, searchQuery]);

  return (
    <div className="app-container">
      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        exportNotes={exportNotes}
      />

      <div className="main-content">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          createNote={createNote}
        />

        <NotesList
          notes={filteredNotes}
          setEditingNote={setEditingNote}
          toggleStatus={toggleStatus}
          moveToTrash={moveToTrash}
          restoreFromTrash={restoreFromTrash}
          deleteForever={deleteForever}
        />
      </div>

      {editingNote && (
        <EditorMode
          note={editingNote}
          onSave={saveNote}
          onClose={() => setEditingNote(null)}
        />
      )}
    </div>
  );
};

export default App;