import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:4000';

// Fetch all tasks
const fetchTasks = async () => {
  const res = await fetch(`${API_BASE_URL}/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

// Add a new task
const addTaskApi = async (taskData) => {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) throw new Error('Failed to add task');
  return res.json();
};

// Update a task (for toggle)
const updateTaskApi = async ({ id, ...task }) => {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

// Delete a task
const deleteTaskApi = async (id) => {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete task');
  return res;
};

export function useTaskManager() {
  const queryClient = useQueryClient();

  // Productivity score 
  const [productivityScore, setProductivityScore] = useState(() => {
    const saved = localStorage.getItem('productivityScore');
    const lastReset = localStorage.getItem('lastScoreReset');
    if (saved && lastReset) {
      const daysDiff = (Date.now() - new Date(lastReset).getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff < 7) return parseInt(saved, 10) || 0;
    }
    return 0;
  });

  const [lastScoreReset, setLastScoreReset] = useState(() => {
    const saved = localStorage.getItem('lastScoreReset');
    if (saved) {
      const daysDiff = (Date.now() - new Date(saved).getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff < 7 ? saved : new Date().toISOString();
    }
    return new Date().toISOString();
  });

  // Sync score to localStorage
  useEffect(() => {
    localStorage.setItem('productivityScore', productivityScore.toString());
    localStorage.setItem('lastScoreReset', lastScoreReset);
  }, [productivityScore, lastScoreReset]);

  // React Query: Fetch tasks
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  // Mutations
  const addTaskMutation = useMutation({
    mutationFn: addTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

 const toggleTaskMutation = useMutation({
  mutationFn: updateTaskApi,
  onMutate: async (updatedTask) => {
    await queryClient.cancelQueries({ queryKey: ['tasks'] });
    const prevTasks = queryClient.getQueryData(['tasks']);
    
    // Optimistic update
    queryClient.setQueryData(['tasks'], (old) =>
      old.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

    const prevTask = prevTasks?.find(t => t.id === updatedTask.id);
    const wasCompleted = prevTask ? prevTask.completed : false;
    const isNowCompleted = updatedTask.completed;

    if (!wasCompleted && isNowCompleted) {
      setProductivityScore((s) => s + 1); 
    } else if (wasCompleted && !isNowCompleted) {
      setProductivityScore((s) => Math.max(0, s - 1));
    }

    return { prevTasks };
  },
  onError: (err, newTask, context) => {
    queryClient.setQueryData(['tasks'], context.prevTasks);
  },
});

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Action handlers
  const addTask = (title, description) => {
    addTaskMutation.mutate({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    });
  };

  const toggleTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    toggleTaskMutation.mutate({ ...task, completed: !task.completed });
  };

  const deleteTask = (taskId) => {
    deleteTaskMutation.mutate(taskId);
  };

 

  return {
    tasks,
    productivityScore,
    lastScoreReset,
    addTask,
    deleteTask,
    toggleTask,
    isLoading,
    isError,
  };
}