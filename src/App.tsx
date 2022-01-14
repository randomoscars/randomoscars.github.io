import React, { useState } from 'react';
import { getRandomCategory, getRandomYear } from './Randomizer';
import { BsSearch, BsShuffle } from 'react-icons/bs';
import { CategorySelect, IconButtonLabel, YearInput } from './FormInputs';
import { AppFooter, AppHeader, SiteExplainer } from './StaticComponents';

function App() {
  const [categoryInfo, setCategoryInfo] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);

  const search = () => {
    setCategoryInfo('Loading...');
  };

  const randomize = () => {
    setCategory(getRandomCategory());
    setYear(getRandomYear());
  };

  return (
    <div className="App">
      <AppHeader />
      <section>
        <div style={{ display: 'flex' }}>
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
          {category} {category && year ? '|' : null} {year}
        </h2>
        <Nominees categoryInfo={categoryInfo} />
      </section>
      <section>
        <hr />
        <SiteExplainer />
      </section>
      <AppFooter />
    </div>
  );
}

function Nominees(props: { categoryInfo: string }) {
  const nominees = props.categoryInfo.length
    ? props.categoryInfo
        .split('\n')
        .filter((nominee) => nominee !== 'nominee | film')
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
