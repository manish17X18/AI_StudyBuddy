import React, { useState } from 'react';

export default function Flashcard({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-56 cursor-pointer group [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`w-full h-full transition-all duration-500 [transform-style:preserve-3d] relative ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* Front Side (Question) */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white border-2 border-gray-100 rounded-xl shadow-sm hover:border-blue-300 transition-colors flex flex-col items-center justify-center p-6 text-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Question</span>
          <p className="text-lg font-medium text-gray-800 leading-snug">{front}</p>
          <span className="absolute bottom-4 text-[10px] text-gray-300">Click to flip</span>
        </div>

        {/* Back Side (Answer) */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-blue-50 border-2 border-blue-200 rounded-xl shadow-sm flex flex-col items-center justify-center p-6 text-center">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 block">Answer</span>
          <p className="text-base font-medium text-blue-900 leading-relaxed overflow-y-auto">{back}</p>
        </div>

      </div>
    </div>
  );
}