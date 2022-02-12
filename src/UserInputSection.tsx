import { CategorySelect, IconButtonLabel, YearInput } from './FormInputs';
import { BsSearch, BsShuffle } from 'react-icons/bs';
import React, { useState } from 'react';
import { getAwardDataWithRetry, randomize } from './Local.connector';
import { OscarCategory } from './Models';

export function UserInputSection(props: {
  setAwardData: React.Dispatch<React.SetStateAction<OscarCategory | undefined>>;
}) {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [categoryName, setCategoryName] = useState<string | undefined>(
    undefined
  );
  const [year, setYear] = useState<number | undefined>(undefined);

  const search = (categoryId: number, categoryName: string, year: number) => {
    props.setAwardData(undefined);
    getAwardDataWithRetry(categoryName, year)
      .then(props.setAwardData)
      .catch(() => {});
  };

  const randomizeForm = () => {
    randomize().then(([randomCategoryId, randomCategoryName, randomYear]) => {
      setCategoryName(randomCategoryName);
      setYear(randomYear);
      search(randomCategoryId, randomCategoryName, randomYear);
    });
  };
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <CategorySelect
          categoryName={categoryName}
          setCategory={setCategoryName}
        />
        <YearInput year={year} setYear={setYear} />
        <button
          onClick={() =>
            search(categoryId as number, categoryName as string, year as number)
          }
          disabled={!categoryName || !year}
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
