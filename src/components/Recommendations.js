import React from "react";

import { GET_BOOKS, ME } from "../queries";

// apollo client
import { useQuery } from "@apollo/client";

const Recommendations = (props) => {
  const resultBooks = useQuery(GET_BOOKS);
  const resultUser = useQuery(ME);

  if (!props.show) {
    return null;
  }

  if (resultBooks.loading || resultUser.loading) {
    return <div>Loading...</div>;
  }

  const books = resultBooks.data.allBooks;
  const user = resultUser.data.me;

  return (
    <>
      <h2>books</h2>
      <p>
        books in your favorite genre <strong>{user.favoriteGenre}</strong>{" "}
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((e) => e.genres.includes(user.favoriteGenre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommendations;
