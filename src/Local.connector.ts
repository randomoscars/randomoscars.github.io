import { OscarYear } from './Models';

export async function getAllCategories(): Promise<string[]> {
  let categories: string[] = [];
  for (let i = 1; i <= 93; i++) {
    const fileResponse = await fetch(`/Data/${i}.json`);
    const oscarCategories: OscarYear = await fileResponse.json();
    categories = categories.concat(
      oscarCategories.map((category) => category.name)
    );
  }
  return categories;
}
