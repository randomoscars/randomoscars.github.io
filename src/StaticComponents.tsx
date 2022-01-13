import React from "react";

export function AppHeader() {
  return (
    <header className="App-header">
      <h1>Random Oscars</h1>
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

export function SiteExplainer() {
  return (
    <details>
      <summary>How to use this site</summary>
      <p>
        The site indexes Academy Awards from 1929 - 2021. Not every year has
        nominees for every category.
      </p>
    </details>
  );
}
