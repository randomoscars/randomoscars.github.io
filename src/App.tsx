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

  const search = (category: string, year: number) => {
    setAwardData(undefined);
    getAwardData(category, year)
      .then(setAwardData)
      .catch(() => {});
  };

  const randomizeForm = () => {
    randomize().then(([randomCategory, randomYear]) => {
      setCategory(randomCategory);
      setYear(randomYear);
      search(randomCategory, randomYear);
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '90vh',
      }}
    >
      <div>
        <AppHeader />
        <section>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <CategorySelect category={category} setCategory={setCategory} />
            <YearInput year={year} setYear={setYear} />
            <button onClick={() => search(category as string, year as number)} disabled={!category || !year}>
              <IconButtonLabel label="Search" icon={BsSearch} />
            </button>
          </div>
          <button onClick={() => randomizeForm()}>
            <IconButtonLabel label="Randomize" icon={BsShuffle} />
          </button>
        </section>
        <section>
          <NomineeHeader awardData={awardData} />
          <Nominees awardData={awardData} />
        </section>
      </div>
      <div>
        <section>
          <hr />
          <SiteExplainer />
        </section>
        <AppFooter />
      </div>
    </div>
  );
}

function NomineeHeader(props: { awardData: OscarCategory | undefined }) {
  const titleItems = [props.awardData?.name, props.awardData?.year.toString()]
    .filter((item) => item?.length ?? -1 > 0)
    .join(' | ');
  return <h2>{titleItems}</h2>;
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
              key={candidateName + candidateWork}
              style={{
                fontWeight: candidate.won ? 'bold' : 'normal',
                textDecoration: candidate.won ? 'underline' : 'none',
              }}
            >
              <td style={{ padding: '1rem' }}>{candidateName}</td>
              <td style={{ padding: '1rem' }}>{candidateWork}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default App;
