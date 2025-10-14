import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function roundToNearestHundred(num) {
  // Round up to the nearest 100
  const rounded = Math.ceil(num / 100) * 100;
  // Format the number with comma as a thousands separator
  return rounded.toLocaleString('en-US');
}