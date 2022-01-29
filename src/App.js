import { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import Queries from "./Queries";
import Repository from "./Repository";

function App() {
  const [userName, setUserName] = useState("");
  const [repoList, setRepoList] = useState(null);

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
        console.log(data);
        const viewer = data.data.viewer;
        setUserName(viewer.name);
        setRepoList(viewer.repositories.nodes);
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
      {repoList && (
        <ul>
          {repoList.map((repo) => (
            <Repository repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
