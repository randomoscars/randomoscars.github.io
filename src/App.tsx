import React, { useEffect, useRef, useState } from "react";
import { queryWolframAlpha } from "./WolframAlpha.connector";
import { getRandomCategory, getRandomYear } from "./Randomizer";

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
    queryWolframAlpha(category as string, year as number)
      .then(setCategoryInfo)
      .catch(setCategoryInfo);
  }, [category, year]);

  const randomize = () => {
    setCategory(getRandomCategory());
    setYear(getRandomYear());
  };

  return (
    <div className="App">
      <AppHeader />
      <button onClick={() => randomize()}>Get Random Category</button>
      <section>
        <h2>
          {category} {category && year ? "|" : null} {year}
        </h2>
        <Nominees categoryInfo={categoryInfo} />
      </section>
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

export default App;
