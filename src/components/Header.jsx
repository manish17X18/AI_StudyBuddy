import React from 'react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          
          <span className="text-2xl font-bold text-blue-600 tracking-tight">🧠 StudyBuddy</span>
        </div>
        <nav>
          <span className="text-xs font-semibold bg-gray-100 text-gray-600 py-1 px-3 rounded-full">
            Hackathon MVP
          </span>
        </nav>
      </div>
    </header>
  );
}