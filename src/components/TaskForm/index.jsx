import React from 'react';
import { useTheme } from '../ThemeContext';
import { PlusCircle } from 'lucide-react';

// Define the categories available for the task
const categories = ['Homework', 'Project', 'Exam', 'Reading', 'Lab', 'Other'];

// TaskForm component
const TaskForm = ({ newTask, setNewTask, handleSubmit }) => {
  const { themes } = useTheme(); // Get themes from ThemeContext

  return (
    <form onSubmit={handleSubmit} className={`${themes.card} p-6 rounded-lg space-y-4`}> {/* Form container */}
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <PlusCircle className="w-5 h-5" /> {/* PlusCircle icon */}
        Add New Task
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Task title input */}
        <input
          type="text"
          placeholder="Task Title"
          className={`${themes.input} rounded-md p-2 w-full`}
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        {/* Subject input */}
        <input
          type="text"
          placeholder="Subject"
          className={`${themes.input} rounded-md p-2 w-full`}
          value={newTask.subject}
          onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
          required
        />
        {/* Category select */}
        <select
          className={`${themes.input} rounded-md p-2 w-full`}
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {/* Due date input */}
        <input
          type="date"
          className={`${themes.input} rounded-md p-2 w-full`}
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          required
        />
        {/* Priority select */}
        <select
          className={`${themes.input} rounded-md p-2 w-full`}
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        {/* Task description textarea */}
        <textarea
          placeholder="Task Description"
          className={`${themes.input} rounded-md p-2 w-full md:col-span-2`}
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          rows="3"
        />
      </div>
      {/* Submit button */}
      <button type="submit" className={`${themes.button} rounded-md px-4 py-2 w-full md:w-auto`}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
