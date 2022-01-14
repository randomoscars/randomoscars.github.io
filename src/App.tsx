import React, { useState } from 'react';
import { BsSearch, BsShuffle } from 'react-icons/bs';
import { CategorySelect, IconButtonLabel, YearInput } from './FormInputs';
import { AppFooter, AppHeader, SiteExplainer } from './StaticComponents';
import { OscarCategory } from './Models';
import { getAwardData, randomize } from './Local.connector';

function App() {
  const [awardData, setAwardData] = useState(
    undefined as undefined | OscarCategory
  );
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);

  const search = () => {
    setAwardData(undefined);
    getAwardData(category as string, year as number)
      .then(setAwardData)
      .catch(() => {});
  };

  const randomizeForm = () => {
    randomize().then(([randomCategory, randomYear]) => {
      setCategory(randomCategory);
      setYear(randomYear);
    });
  };

  return (
    <div className="App">
      <AppHeader />
      <section>
        <div style={{ display: 'flex' }}>
          <CategorySelect category={category} setCategory={setCategory} />
          <YearInput year={year} setYear={setYear} />
          <button onClick={() => randomizeForm()}>
            <IconButtonLabel label="Randomize" icon={BsShuffle} />
          </button>
        </div>
        <button onClick={() => search()} disabled={!category || !year}>
          <IconButtonLabel label="Search" icon={BsSearch} />
        </button>
      </section>
      <section>
        <h2>{awardData?.name ?? ''}</h2>
        <Nominees awardData={awardData} />
      </section>
      <section>
        <hr />
        <SiteExplainer />
      </section>
      <AppFooter />
    </div>
  );
}

function Nominees(props: { awardData: OscarCategory | undefined }) {
  return (
    <table>
      <tbody>
        {props.awardData?.candidates.map((candidate) => {
          const candidateWork = candidate.target.join(', ');
          const candidateName = candidate.for.join(', ');
          return (
            <tr
              key={candidateName}
              style={{
                fontWeight: candidate.won ? 'bold' : 'normal',
                textDecoration: candidate.won ? 'underline' : 'none',
              }}
            >
              <td>{candidateName}</td>
              <td>{candidateWork}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default App;
