# 📋 Task Management App

I implemented the Productivity Score as a local UI state that increments only when a task transitions from pending to completed, using optimistic updates with React Query. The score is persisted in localStorage with a 7-day reset window, and I avoided deriving it from task count to preserve reset logic.

