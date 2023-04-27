import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import GlossaryEditor from "./components/GlossaryEditor.jsx";
import Search from "./components/Search.jsx";
import Glossary from "./components/Glossary.jsx";

const App = () => {
  const [wordsList, setWordsList] = useState([]);

  const handleEdit = (newWord) => {
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

  const handleDelete = (word) => {
    fetch("http://localhost:3000/api/words", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(word),
    })
      .then((res) => res.json())
      .then((data) => {
        setWordsList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchWords = () => {
    fetch("http://localhost:3000/api/words", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWordsList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <div>
      <h1>Glossary</h1>
      <GlossaryEditor isAdding={true} callback={handleEdit}></GlossaryEditor>
      <Search></Search>
      <Glossary
        words={wordsList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      ></Glossary>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
