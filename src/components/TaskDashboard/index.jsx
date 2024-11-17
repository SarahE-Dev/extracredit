import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import TaskForm from '../TaskForm';
import TaskFilters from '../TaskFilters';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/localStorage';
import { v4 as uuid } from 'uuid';
import TaskCard from '../TaskCard';

// Initial empty task object
const emptyTask = {
  title: '',
  subject: '',
  category: '',
  dueDate: '',
  priority: 'medium',
  description: '',
  completed: false
};

// TaskDashboard component
const TaskDashboard = () => {
  const { themes } = useTheme(); // Get themes from ThemeContext
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [displayTasks, setDisplayTasks] = useState([]); // State to store filtered tasks
  const [newTask, setNewTask] = useState(emptyTask); // State to store the new task being created
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priority: '',
    status: '',
    sort: 'dueDate'
  }); // State to manage task filters

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = loadFromLocalStorage();
    // Set tasks with local storage tasks
    if (savedTasks.length) {
      setTasks(savedTasks);
    }
    // Set loading to false
    setLoading(false);
  }, []);

  // Save tasks to localStorage when they change
  useEffect(() => {
    // If not loading update local storage with new tasks
    if (!loading) {
      saveToLocalStorage(tasks);
    }
  }, [tasks, loading]);

  // Update displayTasks when tasks or filters change
  useEffect(() => {
    const filtered = tasks
    // Filter and sort based on filters
      .filter(task => {
        const matchesSearch =
          task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.description.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = !filters.category || task.category === filters.category;
        const matchesPriority = !filters.priority || task.priority === filters.priority;
        const matchesStatus =
          !filters.status ||
          (filters.status === 'completed' ? task.completed : !task.completed);

        return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
      })
      .sort((a, b) => {
        switch (filters.sort) {
          case 'dueDate':
            return new Date(a.dueDate) - new Date(b.dueDate);
          case 'priority':
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          case 'title':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });

    setDisplayTasks(filtered);
  }, [tasks, filters]);

  // Handle form submit to add a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    // Set tasks with new task and unique ID
    setTasks([...tasks, { ...newTask, id: uuid() }]);
    // Empty new task
    setNewTask(emptyTask);
    // Reset filters when new task is added
    setFilters({
      search: '',
      category: '',
      priority: '',
      status: '',
      sort: 'dueDate'
    });
  };

  // Handle delete task
  const deleteTask = (taskId) => {
    // Delete tasks by filering any task not equal to given ID
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Handle toggle complete status of a task
  const toggleComplete = (taskId) => {
    // Map tasks and change completed status of given task, then set tasks with updates
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-6">
        {/* Task Form component */}
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
      />
      {/* Task Filters component */}
      <TaskFilters
        themes={themes}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Map through displayed tasks */}
        {displayTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            themes={themes}
          />
        ))}
      </div>
        {/* Message to display when tasks are empty */}
      {displayTasks.length === 0 && (
        <div className={`${themes.card} p-8 rounded-lg text-center`}>
          <p className="text-lg">No tasks found. Add a new task to get started!</p>
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;

