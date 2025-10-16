import React from 'react';

const Task = ({ task, onToggle, onDelete, isDragging }) => {
  
  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 transition-all duration-200
        ${task.completed 
          ? 'border-green-500 bg-gray-50 opacity-75' 
          : 'border-blue-500 hover:shadow-lg'
        }
        ${isDragging ? 'rotate-2 shadow-xl' : ''}
      `}
    >
      <div className="flex items-start justify-between">
        <div 
          className="flex items-start space-x-3 flex-1 cursor-pointer"
          onClick={handleToggle} 
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <div className="flex-1">
            <h3
              className={`
                text-lg font-semibold mb-1 transition-all duration-200
                ${task.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800'
                }
              `}
            >
              {task.title}
            </h3>
            <p
              className={`
                text-sm transition-all duration-200
                ${task.completed 
                  ? 'line-through text-gray-400' 
                  : 'text-gray-600'
                }
              `}
            >
              {task.description}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        {/* Delete button stops propagation so it doesn't toggle task */}
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            handleDelete();
          }}
          className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
          title="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Task;