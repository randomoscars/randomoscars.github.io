import { CategorySelect, IconButtonLabel, YearInput } from './FormInputs';
import { BsSearch, BsShuffle } from 'react-icons/bs';
import React, { useState } from 'react';
import { getAwardDataWithRetry, randomize } from './Local.connector';
import { OscarCategory } from './Models';

export function UserInputSection(props: {
  setAwardData: React.Dispatch<React.SetStateAction<OscarCategory | undefined>>;
}) {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);

  const search = (category: string, year: number) => {
    props.setAwardData(undefined);
    getAwardDataWithRetry(category, year)
      .then(props.setAwardData)
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
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <CategorySelect category={category} setCategory={setCategory} />
        <YearInput year={year} setYear={setYear} />
        <button
          onClick={() => search(category as string, year as number)}
          disabled={!category || !year}
        >
          <IconButtonLabel label="Search" icon={BsSearch} />
        </button>
      </div>
      <button onClick={() => randomizeForm()}>
        <IconButtonLabel label="Randomize" icon={BsShuffle} />
      </button>
    </>
  );
}
