export function formatCurrency(value: number) {
  return value.toLocaleString("tr-TR");
}

export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export interface WeightedItem<T> {
  weight: number;
  value: T;
}

export function pickWeightedItem<T>(items: WeightedItem<T>[]) {
  const total = items.reduce((sum, entry) => sum + entry.weight, 0);
  const threshold = Math.random() * total;
  let running = 0;

  for (const entry of items) {
    running += entry.weight;
    if (threshold <= running) {
      return entry.value;
    }
  }

  return items.at(-1)?.value;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}
