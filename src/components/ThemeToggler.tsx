import { useContext } from 'react';
import { ThemeContext } from '../services/theme/ThemeProvider';
import { supportedThemes } from '../services/theme/types';
import Image from 'next/image';
import styles from '../styles/ThemeToggler.module.css';

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
    <div className={styles.toggler}>
      <Image
        src={
          themeValue === supportedThemes.light
            ? './svg/light-off.svg'
            : './svg/light-on.svg'
        }
        alt="theme toggler"
        width={30}
        height={30}
        onClick={handleSwitchTheme}
      ></Image>
    </div>
  );
}
