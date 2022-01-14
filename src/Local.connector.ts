import { OscarCategory, OscarYear } from './Models';
import uniq from 'ramda/src/uniq';

export async function getAllCategories(): Promise<string[]> {
  let categories: string[] = [];
  for (let i = 1; i <= 93; i++) {
    const fileResponse = await fetch(`/Data/${i}.json`);
    const oscarCategories: OscarYear = await fileResponse.json();
    categories = categories.concat(
      oscarCategories.map((category) => category.name)
    );
  }
  return uniq(categories);
}

export async function getAwardData(
  categoryName: string,
  year: number
): Promise<OscarCategory | undefined> {
  const ceremonyNum = year - 1928;
  const fileResponse = await fetch(`/Data/${ceremonyNum}.json`);
  const oscarCategories: OscarYear = await fileResponse.json();
  return oscarCategories.find((category) => category.name === categoryName);
}
