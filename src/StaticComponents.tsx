import React from 'react';

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
        Created by{' '}
        <a href="https://www.kylenazario.com" target="_blank" rel="noreferrer">
          Kyle Nazario
        </a>.
        View the{' '}
        <a
          href="https://github.com/randomoscars/randomoscars.github.io"
          target="_blank" rel="noreferrer"
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
        The site indexes Academy Awards from 1929 - 2021. Categories have
        changed over time, so not every year has every category.
      </p>
      <p>
        Data courtesy of{' '}
        <a href="https://github.com/AminFadaee/awards/" target="_blank" rel="noreferrer">
          @AminFadaee
        </a>
        . Data in some categories may be missing, incomplete or poorly formatted.
      </p>
    </details>
  );
}
