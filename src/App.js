import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommendations from "./components/Recommendations";
import { BOOK_ADDED, GET_BOOKS } from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      console.log("item: ", item);
      if (item !== undefined) {
        let k = item.title;
        return seen.has(k) ? false : seen.add(k);
      }
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(null);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data);
      setError("Book is added...");
      // window.alert("Book is added...");
      const addedBook = data.data.addedBook;
      setTimeout(() => {
        updateCache(client.cache, { query: GET_BOOKS }, addedBook);
      }, 3000);
    },
  });

  const setError = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.clearStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>
              recommendations
            </button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      {notification && <p style={{ color: "red" }}>{notification}</p>}
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <Recommendations show={page === "recommendations"} />
      <NewBook show={page === "add"} />
      <Login
        show={page === "login"}
        setToken={setToken}
        setError={setError}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
