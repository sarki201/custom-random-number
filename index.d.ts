declare module "custom-random-number" {
  export function getRandom(min: number, max: number): number;
  export function getUniqueNumbers(
    count: number,
    min: number,
    max: number,
  ): number[];
  export function getSeeded(seed: number, min: number, max: number): number;
  export function getWeighted(
    numbers: { number: number; weight: number }[] | number[],
    weight?: number,
  ): number;
  export function getWeightedDynamic(
    min: number,
    max: number,
    weightDistribution:
      | "min"
      | "max"
      | "middle"
      | "middle-inverse"
      | "linear"
      | "linear-inverse"
      | number,
    weightIntensity?: number,
  ): number;
}
