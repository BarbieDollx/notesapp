import React from "react";
import "./Header.css";
import { Plus, Search } from "lucide-react";

const Header = ({ searchQuery, setSearchQuery, createNote }) => {
  return (
    <div className="header">
      <div className="search-bar">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search Notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button className="create-btn sidebar-btn active" onClick={createNote}>
        <Plus size={20} />
        <span>New Note</span>
      </button>
    </div>
  );
};

export default Header;