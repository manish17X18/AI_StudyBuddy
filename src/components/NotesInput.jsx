import React from 'react';

export default function NotesInput({ inputText, setInputText, onGenerate, isGenerating }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">
      <label className="text-sm font-semibold text-gray-700">
        Paste your study material, lecture transcript, or code snippets:
      </label>
      <textarea
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-shadow"
        placeholder="E.g., A Linked List is a linear data structure where elements are not stored at contiguous memory locations..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isGenerating}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-400">
          {inputText.length} characters
        </span>
        <button
          onClick={onGenerate}
          disabled={isGenerating || !inputText.trim()}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing via AI...
            </>
          ) : (
            'Generate Flashcards'
          )}
        </button>
      </div>
    </div>
  );
}