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

export const calculateProportion = (num: string | number, percent: number) =>
  times(divide(num + "", "100"), percent + "").toString();

export const calculateApproximatePercentage = (
  num1: string | undefined,
  num2: string | undefined,
) => {
  if (!isGreaterThanZero(num1) || !isGreaterThanZero(num2) || !num1 || !num2)
    return "0";

  return Math.round(+times(divide(num1, num2), "100").toString());
};

export const isGreaterThanZero = (num: number | string | null | undefined) => {
  if (!num) return false;

  try {
    return new Decimal(num).gt(0);
  } catch (error) {
    return false;
  }
};
