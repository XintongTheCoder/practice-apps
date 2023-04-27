import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button
        onClick={(event) => {
          event.preventDefault();
          onSearch(query);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
