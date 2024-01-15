import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SearchBox } from "./components/SearchBox";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Search Users</h1>
        <span>(By Nirpendra Chaudhary)</span>
      </div>
      <SearchBox />
    </div>
  );
}

export default App;
