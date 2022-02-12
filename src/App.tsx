import React, { useEffect, useState } from 'react';
import { AppFooter, AppHeader, SiteExplainer } from './StaticComponents';
import { EnrichedInfo, OscarCategory } from './Models';
import { UserInputSection } from './UserInputSection';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { getAwardDataWithRetry } from './Local.connector';

function App() {
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
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
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

function Layout() {
  const [awardData, setAwardData] = useState(
    undefined as undefined | OscarCategory
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setAwardData(undefined);
    getAwardDataWithRetry(
      Number(searchParams.get('category')),
      Number(searchParams.get('year'))
    ).then(setAwardData);
  }, [searchParams]);

  return (
    <>
      <section>
        <UserInputSection setSearchParams={setSearchParams} />
      </section>
      <section>
        <NomineeHeader awardData={awardData} />
        <Nominees awardData={awardData} />
      </section>
    </>
  );
}

function NomineeHeader(props: { awardData: OscarCategory | undefined }) {
  const titleItems = [props.awardData?.name, props.awardData?.year.toString()]
    .filter(item => item?.length ?? -1 > 0)
    .join(' | ');
  return <h2>{titleItems}</h2>;
}

function EnrichedLink(props: {
  nomineeData: EnrichedInfo | undefined;
  won: boolean;
}) {
  const imdbUrl = props.nomineeData?.imdb_id.startsWith('tt')
    ? `https://www.imdb.com/title/${props.nomineeData?.imdb_id}`
    : `https://www.imdb.com/name/${props.nomineeData?.imdb_id}`;
  return (
    <div>
      <a
        href={imdbUrl}
        target="_blank"
        rel="noreferrer"
        style={{ color: props.won ? 'var(--text-bright)' : undefined }}
      >
        {props.nomineeData?.name}
      </a>
      {props.nomineeData?.note && <span>&nbsp;{props.nomineeData.note}</span>}
    </div>
  );
}

function Nominees(props: { awardData: OscarCategory | undefined }) {
  const hasNotes = props.awardData?.candidates?.some(c => c.notes);
  const hasFor = props.awardData?.candidates?.some(c => c.for.length);
  return (
    <table>
      <tbody>
        {props.awardData?.candidates.map(candidate => {
          const candidateWork = candidate.target.join(', ');
          const candidateName = candidate.for.join(', ');
          return (
            <tr
              key={candidateName + candidateWork}
              style={{
                fontWeight: candidate.won ? 'bold' : 'normal',
                border: candidate.won ? '1px solid gray' : undefined,
              }}
            >
              {hasFor && (
                <td style={{ padding: '1rem' }}>
                  {candidate.for_enriched.map(n => {
                    return <EnrichedLink nomineeData={n} won={candidate.won} />;
                  })}
                </td>
              )}
              <td style={{ padding: '1rem' }}>
                {candidate.target_enriched.map(n => {
                  return <EnrichedLink nomineeData={n} won={candidate.won} />;
                })}
              </td>
              {hasNotes && (
                <td style={{ padding: '1rem' }}>{candidate.notes}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default App;
