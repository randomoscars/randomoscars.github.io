import React from 'react';
import { Link } from 'react-router-dom';
import { CURRENT_YEAR } from './Models';

export function AppHeader() {
  return (
    <header className="App-header">
      <Link to="/">
        <h1>Random Oscars</h1>
      </Link>
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
        </a>{' '}
        &{' '}
        <a
          href="https://github.com/RikBoeykens"
          target="_blank"
          rel="noreferrer"
        >
          Rik Boeykens
        </a>
        . View the{' '}
        <a
          href="https://github.com/randomoscars/randomoscars.github.io"
          target="_blank"
          rel="noreferrer"
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
        The site indexes Academy Awards from 1929 - {CURRENT_YEAR}. Categories
        have changed over time, so not every year has every category. Years
        correspond to the ceremony (e.x. enter 2021 to see movies released in
        2020).
      </p>
      <p>
        Data courtesy of{' '}
        <a
          href="https://github.com/RikBoeykens"
          target="_blank"
          rel="noreferrer"
        >
          Rik Boeykens
        </a>{' '}
        and IMDB.
      </p>
    </details>
  );
}
