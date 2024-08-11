import { useContext } from 'react';
import { ThemeContext } from '../../services/theme/ThemeProvider';
import './ThemeToggler.css';
import { supportedThemes } from '../../services/theme/types';

export function ThemeToggler() {
  const { themeValue, setThemeValue } = useContext(ThemeContext);

  const handleSwitchTheme = () => {
    setThemeValue(
      themeValue === supportedThemes.light
        ? supportedThemes.dark
        : supportedThemes.light
    );
  };

  return (
    <div className="toggler" onClick={handleSwitchTheme}>
      <img
        className="checkbox-checked"
        src={
          themeValue === supportedThemes.light
            ? './svg/light-off.svg'
            : './svg/light-on.svg'
        }
        onClick={handleSwitchTheme}
        alt="checkbox"
      />
    </div>
  );
}
