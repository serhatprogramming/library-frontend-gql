import { useState } from "react";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!props.show) {
    return null;
  }

  const login = (e) => {
    e.preventDefault();
    console.log("Printing...", username, password);
  };

  return (
    <>
      <form onSubmit={login}>
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
