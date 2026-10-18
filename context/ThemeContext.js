import { createContext, useContext, useEffect, useState } from 'react';
import { THEMES } from '../css/colors';
import { THEME_KEY, saveCache, getCache } from '../services/Storage';

// shared theme context
const ThemeContext = createContext(null);

// Check if a theme exists
const isValidTheme = (value) =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(THEMES, value);

function ThemeProvider({ children }) {
  // Store the currently selected theme
  const [theme, setThemeState] = useState('dark');
  const [isReady, setIsReady] = useState(false);

  // Restore the previously selected theme
  useEffect(() => {
    let active = true;

    const loadTheme = async () => {
      try {
        const savedTheme = await getCache(THEME_KEY);
        if (active && isValidTheme(savedTheme)) {
          setThemeState(savedTheme);
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

  // Wait until the saved theme has been loaded
  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      colors: THEMES[theme],
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