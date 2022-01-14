import { categories } from './Models';

export function getRandomCategory(): string {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

export function getRandomYear(): number {
  return Math.floor(Math.random() * 92) + 1929;
}
