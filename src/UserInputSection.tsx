import { CategorySelect, IconButtonLabel, YearInput } from './FormInputs';
import { BsSearch, BsShuffle } from 'react-icons/bs';
import React, { useState } from 'react';
import { randomize } from './Local.connector';
import { SearchParamsSetter } from './Models';

export function UserInputSection(props: {
  setSearchParams: SearchParamsSetter;
}) {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);

  const search = (categoryId: number, year: number) => {
    props.setSearchParams({
      category: categoryId.toString(),
      year: year.toString(),
    });
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
