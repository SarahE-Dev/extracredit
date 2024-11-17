import React from 'react';
import { Book, Calendar, CheckSquare, Tag, Info, Trash, CheckSquareIcon, SquareIcon } from 'lucide-react';

// TaskCard component takes in task, onDelete, onToggleComplete, and themes as props
const TaskCard = ({ task, onDelete, onToggleComplete, themes }) => (
  <div className={`${themes.card} p-4 rounded-lg space-y-3 relative`}>
    {/* Display the task's priority label in the top-right corner */}
    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs
      ${task.priority === 'high' ? themes.highPriority :
        task.priority === 'low' ? themes.lowPriority : task.priority === 'medium' ? themes.mediumPriority : ''
      }`}
    >
      {task.priority}
    </div>
    
    {/* Apply opacity to the entire card if the task is completed */}
    <div className={`${task.completed ? 'opacity-50' : ''}`}>
      {/* Task title with completion toggle button */}
      <h3 className="text-lg font-semibold pt-6 flex items-center gap-2">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`${themes.completeButton}`}
        >
            {/* Display the appropriate icon based on the task's completion status */}
          {task.completed && <CheckSquare className="w-5 h-5" />}
          {!task.completed && <SquareIcon className="w-5 h-5" />}
        </button>
        <span>{task.title}</span>
      </h3>
      
      {/* Display the task subject */}
      <div className="flex items-center gap-2 text-sm">
        <Book className="w-4 h-4" />
        {task.subject}
      </div>
      
      {/* Display the task category */}
      <div className="flex items-center gap-2 text-sm">
        <Tag className="w-4 h-4" />
        {task.category}
      </div>
      
      {/* Display the task due date */}
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="w-4 h-4" />
        Due: {task.dueDate}
      </div>
      
      {/* Display the task description, if it exists */}
      {task.description && (
        <div className="flex items-start gap-2 text-sm mt-2">
          <Info className="w-4 h-4 mt-1 flex-shrink-0" />
          <p className="text-sm">{task.description}</p>
        </div>
      )}
    </div>
    {/* Delete button */}
    <div className="flex justify-end pt-2">
      <button
        onClick={() => onDelete(task.id)}
        className={`${themes.trashButton} rounded-md px-4 py-2 w-auto`}
      >
        <Trash />
      </button>
    </div>
  </div>
);

export default TaskCard;
