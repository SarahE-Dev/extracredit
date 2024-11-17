const STORAGE_KEY = 'student-tasks'; // Key used for storing tasks in localStorage

// Function to save tasks to localStorage
export const saveToLocalStorage = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Function to load tasks from localStorage
export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : []; // Return empty array if no tasks are saved
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};

  