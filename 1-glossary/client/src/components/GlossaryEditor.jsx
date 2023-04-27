import React, { useState } from "react";

const GlossaryEditor = ({ isAdding, callback, originalWord }) => {
  const [newTerm, setNewTerm] = useState("");
  const [newDescription, setNewDescription] = useState("");

  return (
    <div className="add-container">
      term:
      <input
        className="word-input"
        type="text"
        placeholder={isAdding ? "Add a word..." : originalWord.term}
        value={newTerm}
        onChange={(e) => setNewTerm(e.target.value)}
        disabled={isAdding ? "" : "disabled"}
      ></input>
      description:
      <input
        className="description-input"
        type="text"
        placeholder={
          isAdding ? "Add a description..." : originalWord.description
        }
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      ></input>
      <button
        onClick={(e) => {
          event.preventDefault();
          const term = isAdding ? newTerm : originalWord.term;
          callback({ term: term, description: newDescription });
        }}
      >
        {isAdding ? "Add" : "submit"}
      </button>
    </div>
  );
};

export default GlossaryEditor;
