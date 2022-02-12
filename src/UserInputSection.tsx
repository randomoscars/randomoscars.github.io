import { CategorySelect, IconButtonLabel, YearInput } from './FormInputs';
import { BsSearch, BsShuffle } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { randomize } from './Local.connector';
import {
  DEFAULT_CATEGORY_ID,
  DEFAULT_YEAR,
  SearchParamsSetter,
} from './Models';

export function UserInputSection(props: {
  searchParams: URLSearchParams;
  setSearchParams: SearchParamsSetter;
}) {
  const [categoryId, setCategoryId] = useState<number>(DEFAULT_CATEGORY_ID);
  const [year, setYear] = useState<number | undefined>(DEFAULT_YEAR);

  const search = (categoryId: number, year: number) => {
    props.setSearchParams({
      category: categoryId.toString(),
      year: year.toString(),
    });
  };

  const randomizeForm = () => {
    randomize().then(([randomCategoryId, randomYear]) => {
      search(randomCategoryId, randomYear);
    });
  };

  useEffect(() => {
    const categoryId = props.searchParams.get('category');
    if (typeof categoryId === 'string') setCategoryId(Number(categoryId));
    else setCategoryId(DEFAULT_CATEGORY_ID);
    const year = props.searchParams.get('year');
    if (typeof year === 'string') setYear(Number(year));
    else setYear(DEFAULT_YEAR);
  }, [props.searchParams]);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <CategorySelect categoryId={categoryId} setCategoryId={setCategoryId} />
        <YearInput year={year} setYear={setYear} />
        <button
          onClick={() => search(categoryId as number, year as number)}
          disabled={typeof year !== 'number'}
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
