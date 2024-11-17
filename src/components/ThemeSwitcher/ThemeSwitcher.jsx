import React from 'react';
import { useTheme } from '../ThemeContext';
import { Moon, Sun } from 'lucide-react';

// ThemeSwitcher component
const ThemeSwitcher = () => {
  const { theme, toggleTheme, themes } = useTheme(); // Get theme, toggleTheme function, and themes from ThemeContext

  return (
    <button
      onClick={toggleTheme} // Attach the toggleTheme function to the button's onClick event
      className={`${themes.navButton} transition-colors duration-200 p-2 rounded-full`} // Apply theme styles and other classes
      aria-label="Toggle theme" // Accessibility label for the button
    >
      {/* Render the Moon icon if the current theme is light, otherwise render the Sun icon */}
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
