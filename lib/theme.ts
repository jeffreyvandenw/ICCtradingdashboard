export type Theme = "dark" | "light";

export const THEME_COOKIE = "theme";

/** Dark is the default; only an explicit "light" cookie switches it off. */
export function parseTheme(value: string | undefined): Theme {
  return value === "light" ? "light" : "dark";
}
