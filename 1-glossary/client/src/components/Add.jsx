import React, { useState } from "react";

const Add = ({ onAdd }) => {
  const [newTerm, setNewTerm] = useState("");
  const [newDescription, setNewDescription] = useState("");

  return (
    <div className="add-container">
      <input
        className="word-input"
        type="text"
        placeholder="Add a word..."
        value={newTerm}
        onChange={(e) => setNewTerm(e.target.value)}
      ></input>
      <input
        className="description-input"
        type="text"
        placeholder="Add a description..."
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      ></input>
      <button
        className="add-btn"
        onClick={(e) => {
          event.preventDefault();
          onAdd({ term: newTerm, description: newDescription });
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Add;
