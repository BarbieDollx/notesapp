import React from "react";
import { Download, Moon, Search, Star, Sun, Trash2 } from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ theme, toggleTheme, activeTab, setActiveTab, exportNotes }) => {
  return (
    <div className="sidebar glass">
      <h2
        style={{padding: "0.5rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem",
        }}
      >
        <Star size={24} color="var(--primary)" />
        Notes App
      </h2>

      <button
        className={`sidebar-btn ${activeTab === "notes" ? "active" : ""}`}
        onClick={() => setActiveTab("notes")}
      >
        <Search size={20} />
        <span>All Notes</span>
      </button>

      <button
        className={`sidebar-btn ${activeTab === "favourites" ? "active" : ""}`}
        onClick={() => setActiveTab("favourites")}
      >
        <Star size={20} />
        <span>Favourites</span>
      </button>

      <button
        className={`sidebar-btn ${activeTab === "trash" ? "active" : ""}`}
        onClick={() => setActiveTab("trash")}
      >
        <Trash2 size={20} />
        <span>Trash</span>
      </button>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="icon-btn" onClick={exportNotes} title="Export notes JSON">
          <Download size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;