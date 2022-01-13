import React, { useState } from "react";
import { queryWolframAlpha } from "./WolframAlpha.connector";
import { getRandomCategory, getRandomYear } from "./Randomizer";
import { BsSearch, BsShuffle } from "react-icons/bs";
import { CategorySelect, IconButtonLabel, YearInput } from "./FormInputs";

function App() {
  const [categoryInfo, setCategoryInfo] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);

  const search = () => {
    setCategoryInfo("Loading...");
    queryWolframAlpha(category as string, year as number)
      .then(setCategoryInfo)
      .catch(setCategoryInfo);
  };

  const randomize = () => {
    setCategory(getRandomCategory());
    setYear(getRandomYear());
    search();
  };

  return (
    <div className="App">
      <AppHeader />
      <section>
        <div style={{ display: "flex" }}>
          <CategorySelect category={category} setCategory={setCategory} />
          <YearInput year={year} setYear={setYear} />
          <button onClick={() => randomize()}>
            <IconButtonLabel label="Randomize" icon={BsShuffle} />
          </button>
        </div>
        <button onClick={() => search()} disabled={!category || !year}>
          <IconButtonLabel label="Search" icon={BsSearch} />
        </button>
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
