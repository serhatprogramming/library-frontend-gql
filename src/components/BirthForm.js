import { useState } from "react";
// apollo client
import { useMutation, useQuery } from "@apollo/client";
// queries
import { EDIT_AUTHOR, GET_AUTHORS } from "../queries";

const BirthForm = () => {
  const [name, setName] = useState("");
  const [bornYear, setBornYear] = useState("");

  const result = useQuery(GET_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
    onError: (e) => {
      console.log("error: ", e);
    },
  });

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  const changeBornYear = async (e) => {
    e.preventDefault();
    await editAuthor({ variables: { name, born: bornYear } });
    setName("");
    setBornYear("");
  };

  return (
    <div>
      <h2>change birth year</h2>
      <form onSubmit={changeBornYear}>
        <div>
          <label>
            Pick an author:
            <select value={name} onChange={(e) => setName(e.target.value)}>
              <option disabled></option>
              {authors.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          year:
          <input
            type="number"
            value={bornYear}
            onChange={(e) => setBornYear(Number(e.target.value))}
          />
        </div>
        <button>change</button>
      </form>
    </div>
  );
};

export default BirthForm;
