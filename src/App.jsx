import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import './app.css';
import Navbar from './components/Navbar';
import TaskDashboard from './components/TaskDashboard';

// App component
function App() {
  return (
    <ThemeProvider> {/* Wrapping the app with ThemeProvider to provide theme context */}
      <div className="min-h-screen flex flex-col"> {/* Container for the entire app with flex and min-height to cover the screen */}
        <Navbar /> {/* Navbar component */}
        <main className="flex-1 container mx-auto px-4 py-8"> {/* Main content area with padding */}
          <TaskDashboard /> {/* TaskDashboard component */}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
