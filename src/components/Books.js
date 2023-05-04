// apollo client
import { useQuery } from "@apollo/client";
// queries
import { GET_BOOKS } from "../queries";
import { useState, useEffect } from "react";

const Books = (props) => {
  const [filterKeyword, setfilterKeyword] = useState("");

  const result = useQuery(GET_BOOKS, {
    variables: { genre: filterKeyword },
    update: (cache, response) => {
      cache.updateQuery({ query: GET_BOOKS }, ({ allBooks }) => {
        return {
          allBooks,
        };
      });
    },
  });
  const resultBooks = useQuery(GET_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading || resultBooks.loading) {
    return <div>Loading...</div>;
  }

  const books = result.data.allBooks;
  const forFilter = resultBooks.data.allBooks;
  let genreList = [];
  forFilter.map((a) => a.genres.map((genre) => genreList.push(genre)));

  return (
    <>
      <h2>books</h2>
      <p>
        in genre <strong>{filterKeyword}</strong>{" "}
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        <button onClick={() => setfilterKeyword(null)}>all</button>
        {[...new Set(genreList)].map((genre) => (
          <button onClick={() => setfilterKeyword(genre)} key={genre}>
            {genre}
          </button>
        ))}
      </>
    </>
  );
};

export default Books;
