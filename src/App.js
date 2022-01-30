import { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import Queries from "./Queries";
import Repository from "./Repository";

function App() {
  const [loginName, setLoginName] = useState("");
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
        const viewer = data.data.viewer;
        const searchResults = data.data.search;
        setLoginName(viewer.login);
        setUserName(viewer.name);
        setRepoList(searchResults.nodes);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header bg-gray-700">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-3xl font-bold underline">{userName}</h1>
        <h3>
          <a
            href={`https://www.github.com/${loginName}`}
            target="_blank"
            rel="noreferrer"
          >
            &#64;{loginName}
          </a>
        </h3>
      </header>
      <main className="md:container md:mx-auto">
        {repoList && (
          <div className="grid grid-cols-4 gap-4 auto-rows-auto">
            {repoList.map((repo) => (
              <Repository key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
