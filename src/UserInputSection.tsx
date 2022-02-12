import { CategorySelect, IconButtonLabel, YearInput } from './FormInputs';
import { BsSearch, BsShuffle } from 'react-icons/bs';
import React, { useState } from 'react';
import { getAwardDataWithRetry, randomize } from './Local.connector';
import { OscarCategory } from './Models';

export function UserInputSection(props: {
  setAwardData: React.Dispatch<React.SetStateAction<OscarCategory | undefined>>;
}) {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);

  const search = (categoryId: number, year: number) => {
    props.setAwardData(undefined);
    getAwardDataWithRetry(categoryId, year)
      .then(props.setAwardData)
      .catch(() => {});
  };

  const randomizeForm = () => {
    randomize().then(([randomCategoryId, randomYear]) => {
      setCategoryId(randomCategoryId);
      setYear(randomYear);
      search(randomCategoryId, randomYear);
    });
  };
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <CategorySelect categoryId={categoryId} setCategoryId={setCategoryId} />
        <YearInput year={year} setYear={setYear} />
        <button
          onClick={() => search(categoryId as number, year as number)}
          disabled={!categoryId || !year}
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
