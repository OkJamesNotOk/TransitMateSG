import { createContext, useContext, useEffect, useState } from 'react';
import { THEMES } from '../css/colors';
import { THEME_KEY, AUTO_THEME_KEY, saveCache, getCache } from '../services/Storage';

// shared theme context
const ThemeContext = createContext(null);

// Check if a theme exists
const isValidTheme = (value) =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(THEMES, value);

function ThemeProvider({ children }) {
  // Store the currently selected theme
  const [theme, setThemeState] = useState('dark');
  const [autoThemeOnStartup, setAutoThemeOnStartupState] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Restore the previously selected theme
  useEffect(() => {
    let active = true;

    const loadTheme = async () => {
      try {
        const savedTheme = await getCache(THEME_KEY);
        const savedAutoTheme = await getCache(AUTO_THEME_KEY);
        if (!active) return;

        const autoEnabled = savedAutoTheme === true;
        let selectedTheme = isValidTheme(savedTheme) ? savedTheme : 'dark';

        if (autoEnabled) {
          const availableThemes = Object.keys(THEMES).filter(
            (themeKey) => themeKey !== selectedTheme
          );

          if (availableThemes.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableThemes.length);
            selectedTheme = availableThemes[randomIndex];
            await saveCache(THEME_KEY, selectedTheme);
          }
        }

        if (active) {
          setThemeState(selectedTheme);
          setAutoThemeOnStartupState(autoEnabled);
        }
      } catch (error) {
        console.log('Failed to load theme:', error);
      } finally {
        if (active) setIsReady(true);
      }
    };

    loadTheme();
    return () => { active = false; };
  }, []);

  // Change and save the selected theme
  const setTheme = async (newTheme) => {
    if (!isValidTheme(newTheme)) return false;

    setThemeState(newTheme);
    return await saveCache(THEME_KEY, newTheme);
  };

  const setAutoThemeOnStartup = async (enabled) => {
    setAutoThemeOnStartupState(enabled);
    return await saveCache(AUTO_THEME_KEY, enabled);
  };

  // Wait until the saved theme has been loaded
  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      colors: THEMES[theme],
      autoThemeOnStartup,
      setAutoThemeOnStartup,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export {
    ThemeProvider,
    useTheme
}