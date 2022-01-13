import React from "react";

export function AppHeader() {
  return (
    <header className="App-header">
      <h1>Random Oscars</h1>
      <p>Hit the button to get a random Oscar category from a random year</p>
    </header>
  );
}

export function AppFooter() {
  return (
    <footer>
      <p>
        Created by{" "}
        <a href="https://www.kylenazario.com" target="_blank">
          Kyle Nazario
        </a>{" "}
        for the podcast{" "}
        <a href="https://twitter.com/blankcheckpod" target="_blank">
          Blank Check
        </a>
        .
      </p>
      <p>
        View the{" "}
        <a
          href="https://github.com/randomoscars/randomoscars.github.io"
          target="_blank"
        >
          source code
        </a>
        .
      </p>
    </footer>
  );
}
