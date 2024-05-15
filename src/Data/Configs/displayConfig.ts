import { Theme } from "Components/providers/ThemeProvider";

type displayConfigType = {
  DEFAULT_THEME: Theme;
};

const displayConfig: displayConfigType = {
  DEFAULT_THEME: "dark", //"dark" | "light" | "system"
};

export default displayConfig;
