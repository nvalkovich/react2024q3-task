import { useState, createContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setThemeValue } from '../../store/slices/themeSlice';
import { supportedThemes } from './types';

export const ThemeContext = createContext({
  themeValue: supportedThemes.light,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setThemeValue: (value: supportedThemes) => {},
});

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const themeValue = useAppSelector((state) => state.theme.value);
  const [theme, setTheme] = useState<supportedThemes>(
    themeValue as supportedThemes
  );

  const setNewThemeValue = (value: supportedThemes) => {
    setTheme(value);
    dispatch(setThemeValue(value));
  };

  return (
    <ThemeContext.Provider
      value={{ themeValue: theme, setThemeValue: setNewThemeValue }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
