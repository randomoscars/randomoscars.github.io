import React, { Dispatch, SetStateAction, useState } from "react";
import { queryWolframAlpha } from "./WolframAlpha.connector";
import { getRandomCategory, getRandomYear } from "./Randomizer";
import { categories } from "./Models";
import { BsSearch, BsShuffle } from "react-icons/bs";
import { IconType } from "react-icons";

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

function IconButtonLabel(props: { label: string; icon: IconType }) {
  return (
    <div style={{ display: "flex" }}>
      <props.icon style={{ alignSelf: "end" }} />
      <span style={{ marginLeft: "1rem" }}>{props.label}</span>
    </div>
  );
}

function YearInput(props: {
  year: number | undefined;
  setYear: Dispatch<SetStateAction<number | undefined>>;
}) {
  const min = 1929;
  const max = 2021;
  return (
    <input
      value={props.year}
      onChange={(e) => props.setYear(parseInt(e.target.value))}
      onBlur={(e) => {
        const year = parseInt(e.target.value);
        const yearWithinBounds = Math.min(max, Math.max(year, min));
        props.setYear(yearWithinBounds);
      }}
      type="number"
      placeholder="Year"
      min={min}
      max={max}
    />
  );
}

function CategorySelect(props: {
  category: string | undefined;
  setCategory: Dispatch<SetStateAction<string | undefined>>;
}) {
  return (
    <select
      value={props.category}
      onChange={(e) => props.setCategory(e.target.value)}
    >
      <option value={undefined} disabled selected hidden>
        Category
      </option>
      {categories.map((cat) => (
        <option value={cat} key={cat}>
          {cat}
        </option>
      ))}
    </select>
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
