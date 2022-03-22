import { CURRENT_YEAR, OscarCategory, OscarYear } from './Models';
import uniqBy from 'ramda/src/uniqBy';

async function getOscarCategories(ceremonyNum: number): Promise<OscarYear> {
  const fileResponse = await fetch(`/Data/${ceremonyNum}.json`);
  const storedCategories: Array<OscarCategory & { year?: number }> =
    await fileResponse.json();
  const year = ceremonyNum + 1928;
  return storedCategories.map(category => {
    category.year = year;
    return category;
  });
}

export async function getAllCategories(): Promise<OscarCategory[]> {
  let categories: OscarCategory[] = [];
  for (let i = 1; i <= 93; i++) {
    const oscarCategories = await getOscarCategories(i);
    categories = categories.concat(oscarCategories);
  }
  return uniqBy(cat => cat.normalized_name, categories).sort((a, b) =>
    a.normalized_name > b.normalized_name ? 1 : -1
  );
}

export async function getAwardDataWithRetry(
  categoryId: number,
  year: number
): Promise<OscarCategory | undefined> {
  const awardData = await getAwardData(categoryId, year);
  if (awardData) {
    return awardData;
  }
  if (year < CURRENT_YEAR) {
    return await getAwardDataWithRetry(categoryId, year + 1);
  }
  return undefined;
}

export async function getAwardData(
  categoryId: number,
  year: number
): Promise<OscarCategory | undefined> {
  const ceremonyNum = year - 1928;
  const oscarCategories = await getOscarCategories(ceremonyNum);
  return oscarCategories.find(category => category.category_id === categoryId);
}

export async function randomize() {
  const ceremonyNum = Math.floor(Math.random() * 92) + 1;
  const oscarCategories = await getOscarCategories(ceremonyNum);
  const index = Math.floor(Math.random() * oscarCategories.length);
  const categoryId = oscarCategories[index].category_id;
  return [categoryId, ceremonyNum + 1928] as const;
}
