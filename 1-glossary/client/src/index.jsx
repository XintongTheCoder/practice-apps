import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import GlossaryEditor from "./components/GlossaryEditor.jsx";
import Search from "./components/Search.jsx";
import Glossary from "./components/Glossary.jsx";

const App = () => {
  const [wordsList, setWordsList] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");
  const [query, setQuery] = useState("");

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

  const fetchWords = (query, sortCriteria) => {
    fetch(
      `http://localhost:3000/api/words?query=${query}&sort=${sortCriteria}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setWordsList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchWords(query, sortCriteria);
  }, [query, sortCriteria]);

  return (
    <div>
      <h1>Glossary</h1>
      <GlossaryEditor isAdding={true} callback={handleEdit}></GlossaryEditor>
      <Search onSearch={setQuery}></Search>
      <button
        className="sort"
        onClick={(event) => {
          event.preventDefault();
          switch (sortCriteria) {
            case "":
              setSortCriteria("asc");
              fetchWords();
              break;
            case "asc":
              setSortCriteria("desc");
              break;
            case "desc":
              setSortCriteria("");
              break;
            default:
              console.error("Invalid sort criteria");
          }
        }}
      >
        Sort
      </button>
      <Glossary
        words={wordsList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      ></Glossary>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
