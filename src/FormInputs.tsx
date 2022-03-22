import { IconType } from 'react-icons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getAllCategories } from './Local.connector';
import { CURRENT_YEAR, OscarCategory } from './Models';

export function IconButtonLabel(props: { label: string; icon: IconType }) {
  return (
    <div style={{ display: 'flex' }}>
      <props.icon style={{ alignSelf: 'end' }} />
      <span style={{ marginLeft: '1rem' }}>{props.label}</span>
    </div>
  );
}

export function YearInput(props: {
  year: number | undefined;
  setYear: Dispatch<SetStateAction<number | undefined>>;
}) {
  const min = 1929;
  const max = CURRENT_YEAR;
  return (
    <input
      value={props.year ?? ''}
      onChange={e => props.setYear(parseInt(e.target.value))}
      onBlur={e => {
        const year = parseInt(e.target.value);
        const yearWithinBounds = Math.min(max, Math.max(year, min));
        props.setYear(yearWithinBounds);
      }}
      type="number"
      placeholder="Year"
      min={min}
      max={max}
      style={{ width: '4rem' }}
    />
  );
}

export function CategorySelect(props: {
  categoryId: number | undefined;
  setCategoryId: Dispatch<SetStateAction<number>>;
}) {
  const [categories, setCategories] = useState([] as OscarCategory[]);

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  return (
    <select
      value={props.categoryId}
      onChange={e => props.setCategoryId(Number(e.target.value))}
      defaultValue={undefined}
      style={{ width: '20rem', overflowX: 'hidden' }}
    >
      {categories.map(cat => (
        <option value={cat.category_id} key={cat.category_id}>
          {cat.normalized_name}
        </option>
      ))}
    </select>
  );
}
