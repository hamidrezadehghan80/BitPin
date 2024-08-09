import Decimal from "decimal.js";

export const sum = (num1: string | number, num2: string | number) =>
  new Decimal(num1).add(num2).toString();

export const minus = (num1: string | number, num2: string | number) =>
  new Decimal(num1).minus(num2).toString();

export const times = (num1: string | number, num2: string | number) =>
  new Decimal(num1).times(num2).toString();

export const divide = (num1: string | number, num2: string | number) =>
  new Decimal(num1).div(num2).toString();

export const roundUp = (num: string, decimal: number = 5) =>
  new Decimal(num).toDP(decimal, Decimal.ROUND_UP).toString();

export const roundDown = (num: string, decimal: number = 5) =>
  new Decimal(num).toDP(decimal, Decimal.ROUND_DOWN).toString();

export const isLessThanOrEqual = (
  num1: string | number,
  num2: string | number
) => new Decimal(num1).lte(new Decimal(num2));

export const isGreaterThan = (
  num1: string | number,
  num2: string | number
) => new Decimal(num1).gt(new Decimal(num2));
