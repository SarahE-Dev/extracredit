import React from 'react';
import { Search, Filter } from 'lucide-react';

// Define the categories available for filtering tasks
const categories = ['Homework', 'Project', 'Exam', 'Reading', 'Lab', 'Other'];

// TaskFilters component
const TaskFilters = ({ themes, filters, setFilters }) => (
  <div className={`${themes.card} p-4 rounded-lg space-y-4`}> {/* Container for the filters */}
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 w-4 h-4" /> {/* Search icon */}
          <input
            type="text"
            placeholder="Search tasks..."
            className={`${themes.input} rounded-md pl-8 p-2 w-full`}
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })} // Update search filter
          />
        </div>
      </div>
      {/* Category filter */}
      <select
        className={`${themes.input} rounded-md p-2`}
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })} // Update category filter
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {/* Priority filter */}
      <select
        className={`${themes.input} rounded-md p-2`}
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })} // Update priority filter
      >
        <option value="">All Priorities</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      {/* Status filter */}
      <select
        className={`${themes.input} rounded-md p-2`}
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })} // Update status filter
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      {/* Sort filter */}
      <select
        className={`${themes.input} rounded-md p-2`}
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })} // Update sort filter
      >
        <option value="dueDate">Sort by Due Date</option>
        <option value="priority">Sort by Priority</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>
  </div>
);

export default TaskFilters;
