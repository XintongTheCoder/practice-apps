import React, { useState } from "react";
import ReactDOM from "react-dom";
import Add from "./components/Add.jsx";
import Search from "./components/Search.jsx";
import WordsList from "./components/WordsList.jsx";

const App = () => {
  const [wordsList, setWordsList] = useState([]);

  const handleAdd = (newWord) => {
    fetch("http://localhost:3000/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    })
      .then((res) => res.json())
      .then((data) => {
        setWordsList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Glossary</h1>
      <Add onAdd={handleAdd}></Add>
      <Search></Search>
      <WordsList></WordsList>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
