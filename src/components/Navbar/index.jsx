import React from 'react';
import { BookOpen } from 'lucide-react'; 
import { useTheme } from '../ThemeContext'; 
import { ThemeSwitcher } from '../ThemeSwitcher'; 

// Navbar component
const Navbar = () => {
    const { themes } = useTheme(); // Getting the themes from the ThemeContext
    
    return (
        <nav className={`${themes.navbar} transition-colors duration-200`}>
            {/* Navbar container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and primary navigation */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <BookOpen className="h-8 w-8" /> {/* BookOpen icon */}
                            <span className="ml-2 text-xl font-bold">TaskMaster</span> {/* App name */}
                        </div>
                    </div>
                    
                    {/* Right-side button */}
                    <div className="flex items-center">
                        {/* Theme toggle */}
                        <ThemeSwitcher /> {/* ThemeSwitcher component */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; // Exporting the Navbar component
