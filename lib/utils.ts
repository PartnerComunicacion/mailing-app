import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";





export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function replaceStrings(
  phrase: string,
  str: string,
  titles: string[],
  replacements: number
): string {
  let index = 0
  let phraseReplacements: { [key: string]: number } = {} // objeto de conteos
  let totalCount = 0
  while (index < titles.length && totalCount < titles.length * replacements) {
    const regex = new RegExp(phrase, "i")
    if (regex.test(str)) {
      const title = titles[index]
      if (
        !phraseReplacements[title] ||
        phraseReplacements[title] < replacements
      ) {
        phraseReplacements[title] = (phraseReplacements[title] || 0) + 1
        str = str.replace(regex, title)
        totalCount++
      } else {
        index++
        continue
      }
    } else {
      index++
    }
  }
  return str
}

export function replaceStringsOnce(
  phrase: string,
  str: string,
  titles: string[]
): string {
  let index = 0
  let phraseReplacements = 0 // variable para contar cuantas veces se ha reemplazado la "phrase"
  while (index < titles.length && phraseReplacements < titles.length) {
    // detener el bucle cuando se hayan reemplazado la "phrase" una vez por cada elemento del array
    const regex = new RegExp(phrase, "i") // se puede usar la bandera "i" en lugar de "gi" para hacer la búsqueda insensible a mayúsculas y minúsculas y así ahorrar procesamiento
    if (regex.test(str)) {
      // sólo reemplazar si la "phrase" todavía se encuentra en el string
      str = str.replace(regex, titles[index])
      phraseReplacements++ // incrementar la variable de conteo
    }
    index++
  }
  return str
}

export function replaceStringsTwice(
  phrase: string,
  str: string,
  titles: string[]
): string {
  let index = 0
  let phraseReplacements: { [key: string]: number } = {} // variable de conteo como objeto
  while (index < titles.length) {
    const regex = new RegExp(phrase, "i")
    if (regex.test(str)) {
      // solo si se encuentra al menos una vez la "phrase"
      if (!phraseReplacements[titles[index]]) {
        // si el elemento de titles nunca se reemplazó, agregarlo al objeto y establecer su valor en 1
        phraseReplacements[titles[index]] = 1
      } else if (phraseReplacements[titles[index]] === 1) {
        // si el elemento ya se reemplazó una vez, establecer el valor en 2 para detener más reemplazos
        phraseReplacements[titles[index]] = 2
      } else {
        // si el elemento ya se reemplazó dos veces, pasar al siguiente elemento de titles
        index++
        continue
      }
      str = str.replace(regex, titles[index])
    }
    index++
  }

  return str
}

export function replaceAll(phrase: string, str: string, replacement: string): string {
  const regex = new RegExp(phrase, "g"); // usar "g" para expresión regular global (reemplazar más de una ocurrencia)
  return str.replace(regex, replacement);
}