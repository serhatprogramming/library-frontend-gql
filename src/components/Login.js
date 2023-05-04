import { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";

import { LOGIN } from "../queries";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("library-user-token", token);
      props.setPage("authors");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  const submit = (e) => {
    e.preventDefault();
    console.log("Printing...", username, password);
    login({ variables: { username, password } });
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          username:
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
