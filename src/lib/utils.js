import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
