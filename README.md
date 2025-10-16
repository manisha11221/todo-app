# 📋 Task Management App

A modern, feature-rich task management application built with React 19+ that helps you stay organized and track your productivity.

![Task Manager](https://img.shields.io/badge/React-19.2.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC) ![Status](https://img.shields.io/badge/Status-Complete-green)

## ✨ Features

### 🎯 **Core Functionality**
- ✅ **Add Tasks** - Create tasks with title and optional description
- 🗑️ **Delete Tasks** - Remove tasks with one-click deletion
- ☑️ **Mark Complete** - Toggle task completion with visual feedback
- 🔄 **Drag & Drop** - Reorder tasks by dragging them around
- 💾 **Auto-Save** - All data persists automatically in localStorage

### 🚀 **Productivity Features**
- 📊 **Productivity Score** - Tracks completed tasks with motivational levels
- 🔄 **7-Day Reset Cycle** - Score resets weekly to maintain fresh motivation
- 📈 **Progress Visualization** - Animated progress bars and achievement levels
- 💬 **Motivational Messages** - Dynamic encouragement based on your progress

### 🎨 **Modern UI/UX**
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🌈 **Beautiful Animations** - Smooth transitions and micro-interactions
- 🎯 **Clean Interface** - Minimalist design focused on productivity
- ♿ **Accessibility** - Proper ARIA labels and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone & Install**
   ```bash
   cd todo-app
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
```

## 🏗️ Architecture

### **State Management**
- Uses `useReducer` for complex state management
- Custom `useTaskManager` hook encapsulates all logic
- Immutable state updates for predictability

### **Component Structure**
```
src/
├── hooks/
│   └── useTaskManager.js     # State management logic
├── components/
│   ├── AddTask.js           # Task creation form
│   ├── TaskList.js          # Drag-drop container
│   ├── Task.js              # Individual task item
│   └── ProductivityScore.js # Score display
└── App.js                   # Main application
```

### **Key Technologies**
- **React 19** - Latest React with concurrent features
- **Tailwind CSS** - Utility-first styling framework
- **@hello-pangea/dnd** - Drag and drop functionality
- **localStorage** - Client-side data persistence

## 📊 Productivity System

### **Scoring Logic**
- **+1 point** for each completed task
- **-1 point** when unchecking a task
- **Weekly reset** every 7 days automatically

### **Achievement Levels**
- 🌱 **Just Beginning** (0 tasks)
- 🔥 **Getting Started** (1-4 tasks)
- ⭐ **Good** (5-9 tasks)
- 🚀 **Great** (10-14 tasks)
- 🏆 **Excellent** (15-19 tasks)
- 💎 **Exceptional** (20+ tasks)

## 🛠️ Development

### **Available Scripts**
- `npm start` - Development server
- `npm test` - Run tests
- `npm run build` - Production build
- `npm run eject` - Eject from Create React App

### **Code Quality**
- ESLint configuration for React
- Proper TypeScript support ready
- Component-based architecture
- Clean, readable code with comments

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React 19, Tailwind CSS, and modern web standards**

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
