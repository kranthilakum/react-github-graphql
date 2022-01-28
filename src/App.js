import { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import Queries from "./Queries";

function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
      body: JSON.stringify(Queries),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserName(data.data.viewer.name);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h1>{userName}</h1>
    </div>
  );
}

export default App;
