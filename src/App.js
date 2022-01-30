import { useEffect, useState } from "react";

import logo from "./logo.svg";
import { SearchIcon } from "@heroicons/react/solid";
import "./App.css";
import Queries from "./Queries";
import Repository from "./Repository";

function App() {
  const [loginName, setLoginName] = useState("");
  const [userName, setUserName] = useState("");
  const [repoList, setRepoList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
      body: JSON.stringify(Queries(searchTerm)),
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
  }, [searchTerm]);

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
      <div className="flex flex-col items-center justify-center space-y-4 space-x-6 h-20 min-h-full bg-gray-700">
        <form name="searchForm">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <SearchIcon className="h-5 w-5 text-slate-400" />
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for repositories..."
              type="text"
              name="search"
              value={searchTerm}
              onInput={(event) => setSearchTerm(event.target.value)}
            />
            {/* https://stackoverflow.com/questions/36683770/how-to-get-the-value-of-an-input-field-using-reactjs */}
          </label>
        </form>
      </div>
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
