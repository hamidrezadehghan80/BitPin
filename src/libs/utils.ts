import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number | string | undefined) => {
  if (!amount) return 0;
  if (typeof amount === "string") amount = +amount;
  return amount.toLocaleString();
};

export const formatCrypto = (amount: number | string | undefined) => {
  if (!amount) return 0;
  if (typeof amount === "string") amount = +amount;
  return amount.toString();
};

export function getBigNumberAbbreviate(number: number, precision: number = 1) {
  const abbr = ["M", "B", "T", "Q"];

  let tier = (Math.log10(number) / 3) | 0;

  if (tier === 2) tier = 2;
  else if (tier < 2) return number;

  const suffix = abbr[tier - 2];
  const scale = Math.pow(10, tier * 3);

  const scaled = number / scale;

  return scaled.toFixed(precision) + suffix;
}

export function createArray(count: number): number[] {
  return Array.from({ length: count }, (_, index) => index + 1);
}

function faToEnNumbers(str: string): string {
  const persianNumbers: RegExp[] = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  if (typeof str === "string") {
    for (let i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i.toString());
    }
  }
  return str;
}

export const numberInputSanitizer = (
  event: React.ChangeEvent<HTMLInputElement>,
  callback: (event: React.ChangeEvent<HTMLInputElement>) => void,
  precision?: number
) => {

  const value = faToEnNumbers(event.target.value);

  if (value.length > 20 || value.split(".").length > 2) {
    return;
  }

  const validChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

  for (const char of value) {
    if (!validChars.includes(char)) {
      return;
    }
  }

  if (value === "00") {
    return;
  }

  if (value.startsWith(".")) {
    event.target.value = "0.";
  }

  const precisionCount: undefined | number = value.split(".")[1]?.length;

  if (precision !== undefined && precisionCount && precisionCount > precision) {
    event.target.value = value.slice(0, precision - precisionCount);
  }

  callback(event);
};
