// apollo client
import { useQuery } from "@apollo/client";
// queries
import { GET_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const result = useQuery(GET_BOOKS);

  const [filterKeyword, setfilterKeyword] = useState("");

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const books = result.data.allBooks;
  let genreList = [];
  books.map((a) => a.genres.map((genre) => genreList.push(genre)));

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
          {books
            .filter((e) => e.genres.includes(filterKeyword))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <>
        {[...new Set(genreList)].map((genre) => (
          <button onClick={() => setfilterKeyword(genre)}>{genre}</button>
        ))}
      </>
    </>
  );
};

export default Books;
