import { useState } from "react";
// apollo client
import { useMutation, useQuery } from "@apollo/client";
// queries
import { EDIT_AUTHOR, GET_AUTHORS } from "../queries";

import Select from "react-select";

const BirthForm = () => {
  const [name, setName] = useState(null);
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

  const options = authors.map((author) => ({
    label: author.name,
    value: author.name,
  }));

  const changeBornYear = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name: name.value, born: bornYear } });
    setName(null);
    setBornYear("");
  };

  return (
    <div>
      <h2>change birth year</h2>
      <form onSubmit={changeBornYear}>
        <div>
          <Select defaultValue={name} onChange={setName} options={options} />
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
