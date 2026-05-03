import { en } from "./en";
import { fr } from "./fr";

export const translations = {
  fr,
  en,
} as const;

export type Locale = keyof typeof translations;
export type Translations = (typeof translations)[Locale];
