import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import GlossaryEditor from "./components/GlossaryEditor.jsx";
import Search from "./components/Search.jsx";
import Glossary from "./components/Glossary.jsx";

const App = () => {
  const [wordsList, setWordsList] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const LIMIT = 10;

  const handleEdit = (newWord) => {
    render(
      fetch("http://localhost:3000/api/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      })
    );
  };

  const handleDelete = (word) => {
    render(
      fetch("http://localhost:3000/api/words", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(word),
      })
    );
  };

  const handleFetch = () => {
    render(
      fetch(
        `http://localhost:3000/api/words?page=${page}&limit=${LIMIT}&query=${query}&sort=${sortCriteria}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
    );
  };

  const render = (res) => {
    res
      .then((res) => res.json())
      .then(({ words, totalPages, currentPage }) => {
        setWordsList(words);
        setPageCount(totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    handleFetch();
  }, [query, sortCriteria, page]);

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
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(event, newPage) => {
            setPage(newPage);
          }}
          color="primary"
        />
      </Stack>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
