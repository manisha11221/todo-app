import React from 'react';

const ProductivityScore = ({ score, lastResetDate }) => {
  // Calculate days until next reset
  const getDaysUntilReset = () => {
    const lastReset = new Date(lastResetDate);
    const nextReset = new Date(lastReset);
    nextReset.setDate(lastReset.getDate() + 7);
    
    const now = new Date();
    const timeDiff = nextReset - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    return Math.max(0, daysDiff);
  };

  // Get productivity level based on score
  const getProductivityLevel = () => {
    if (score >= 20) return { level: 'Exceptional', color: 'text-purple-600', bgColor: 'bg-purple-100' };
    if (score >= 15) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 10) return { level: 'Great', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 5) return { level: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (score >= 1) return { level: 'Getting Started', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { level: 'Just Beginning', color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };

  const daysUntilReset = getDaysUntilReset();
  const productivity = getProductivityLevel();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 mb-6 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Productivity Score</h2>
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Score */}
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {score}
          </div>
          <p className="text-sm text-gray-600">Tasks Completed</p>
        </div>

        {/* Productivity Level */}
        <div className="text-center">
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${productivity.bgColor} ${productivity.color} mb-2`}>
            {productivity.level}
          </div>
          <p className="text-sm text-gray-600">Current Level</p>
        </div>

        {/* Days Until Reset */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700 mb-2">
            {daysUntilReset}
          </div>
          <p className="text-sm text-gray-600">
            {daysUntilReset === 1 ? 'Day' : 'Days'} Until Reset
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Weekly Progress</span>
          <span className="text-sm text-gray-600">{score}/20 tasks</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min((score / 20) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Reset Information */}
      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-gray-500 text-center">
          Score resets every 7 days • Last reset: {new Date(lastResetDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ProductivityScore;
