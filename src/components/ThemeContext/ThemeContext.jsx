import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the theme
export const ThemeContext = createContext();

// Define the light and dark theme styles
const themes = {
  light: {
    // Base styles
    background: 'bg-gray-50',
    text: 'text-gray-900',
    border: 'border-gray-200',
    
    // Navbar styles
    navbar: 'bg-gray-100 border-b border-gray-300',
    
    // Card styles
    card: 'bg-white shadow-sm hover:shadow-md border hover:bg-gray-100 border-gray-200 hover:border-gray-300',
    
    // Form styles
    input: 'bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
    
    // Button styles
    button: 'bg-purple-500 text-white hover:bg-purple-600 focus:ring-2 focus:ring-purple-400 focus:outline-none',
    trashButton: 'text-red-500 hover:text-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none',
    completeButton: 'text-blue-500 hover:text-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none',
    // Badge styles
    highPriority: 'bg-red-400 text-gray-700',
    mediumPriority: 'bg-yellow-200 text-gray-500',
    lowPriority: 'bg-green-300 text-gray-500',
  },
  dark: {
    // Base styles
    background: 'bg-gray-900',
    text: 'text-gray-100',
    border: 'border-gray-700',
    
    // Navbar styles
    navbar: 'bg-gray-800 border-b border-gray-700',
    
    // Card styles
    card: 'bg-gray-800 shadow-sm hover:shadow-md border border-gray-700 hover:border-gray-500 hover:bg-gray-900',
    
    // Form styles
    input: 'bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white',
    
    // Button styles
    button: 'bg-purple-800 text-white hover:bg-purple-900 focus:ring-2 focus:ring-purple-600 focus:outline-none',
    trashButton: 'text-red-600 hover:text-red-800 focus:ring-2 focus:ring-red-500 focus:outline-none',
    completeButton: 'text-blue-600 hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none',
    // Badge styles
    highPriority: 'bg-red-600 text-white',
    mediumPriority: 'bg-yellow-500 text-white',
    lowPriority: 'bg-green-600 text-white',
  }
};

// ThemeProvider component to provide the theme context to its children
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // State to store the current theme
  const [mounted, setMounted] = useState(false); // State to check if the component is mounted

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(savedTheme || systemTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    // Save the theme to localStorage when it changes
    if (mounted) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return null; // Prevent rendering until the component is mounted
  }
  
  // Value to be passed to the context
  const value = {
    theme,
    toggleTheme,
    themes: themes[theme]
  };
  
  return (
    <ThemeContext.Provider value={value}>
      <div className={`min-h-screen transition-colors duration-200 ${themes[theme].background} ${themes[theme].text}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
