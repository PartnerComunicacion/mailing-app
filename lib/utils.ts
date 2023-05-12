import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";





export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function replaceStrings(
  phrase: string,
  str: string,
  titles: string[]
): string {
  let index = 0
  while (index < titles.length) {
    const regex = new RegExp(phrase, "gi")
    str = str.replace(regex, titles[index])
    index++
  }
  return str
}