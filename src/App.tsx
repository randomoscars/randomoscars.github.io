import React, { useEffect, useRef, useState } from "react";
import { queryWolframAlpha } from "./WolframAlpha.connector";
import { getRandomCategory, getRandomYear } from "./Randomizer";
import { categories } from "./Models";

function App() {
  const [categoryInfo, setCategoryInfo] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);
  const firstRender = useRef(true);

  useEffect(() => {
    // prevents effect running on first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (category && year) {
      setCategoryInfo("Loading...");
      queryWolframAlpha(category as string, year as number)
        .then(setCategoryInfo)
        .catch(setCategoryInfo);
    }
  }, [category, year]);

  const randomize = () => {
    setCategory(getRandomCategory());
    setYear(getRandomYear());
  };

  return (
    <div className="App">
      <AppHeader />
      <section style={{ display: "flex" }}>
        <button onClick={() => randomize()}>Get Random Category</button>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value={undefined} disabled selected hidden>
            Category
          </option>
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          type="number"
          placeholder="Year"
          min={1929}
          max={2021}
        />
      </section>
      <section>
        <h2>
          {category} {category && year ? "|" : null} {year}
        </h2>
        <Nominees categoryInfo={categoryInfo} />
      </section>
      <AppFooter />
    </div>
  );
}

function AppHeader() {
  return (
    <header className="App-header">
      <h1>Random Oscars</h1>
      <p>Hit the button to get a random Oscar category from a random year</p>
    </header>
  );
}

function Nominees(props: { categoryInfo: string }) {
  const nominees = props.categoryInfo.length
    ? props.categoryInfo
        .split("\n")
        .filter((nominee) => nominee !== "nominee | film")
    : [];
  return (
    <ul>
      {nominees.map((nominee) => (
        <li key={nominee}>{nominee}</li>
      ))}
    </ul>
  );
}

function AppFooter() {
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

export default App;
