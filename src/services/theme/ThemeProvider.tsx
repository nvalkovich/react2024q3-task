import { useState, createContext } from 'react';
import { supportedThemes } from './types';

export const ThemeContext = createContext({
  themeValue: supportedThemes.light,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setThemeValue: (value: supportedThemes) => {},
});

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<supportedThemes>(supportedThemes.light);

  const setNewThemeValue = (value: supportedThemes) => {
    setTheme(value);
  };

  return (
    <ThemeContext.Provider
      value={{ themeValue: theme, setThemeValue: setNewThemeValue }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
