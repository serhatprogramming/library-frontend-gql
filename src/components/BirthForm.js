import { useState } from "react";
// apollo client
import { useMutation } from "@apollo/client";
// queries
import { EDIT_AUTHOR, GET_AUTHORS } from "../queries";

const BirthForm = () => {
  const [name, setName] = useState("");
  const [bornYear, setBornYear] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const changeBornYear = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name, born: bornYear } });
    setName("");
    setBornYear("");
  };

  return (
    <div>
      <h2>change birth year</h2>
      <form onSubmit={changeBornYear}>
        <div>
          name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
