import React from 'react';
import { useTaskManager } from './hooks/useTaskManager';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import ProductivityScore from './components/ProductivityScore';


function App() {
  const {
    tasks,
    productivityScore,
    lastScoreReset,
    addTask,
    deleteTask,
    toggleTask,
     isLoading,
    isError
  } = useTaskManager();

    if (isLoading) return <div className="text-center py-10">Loading tasks...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load tasks</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-gray-600 mt-1">Stay organized and boost your productivity</p>
            </div>
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Productivity Score */}
        <ProductivityScore 
          score={productivityScore} 
          lastResetDate={lastScoreReset} 
        />

        {/* Add Task Form */}
        <AddTask onAddTask={addTask} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Built with React 19 • Drag and drop to reorder tasks • Data persists locally</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
