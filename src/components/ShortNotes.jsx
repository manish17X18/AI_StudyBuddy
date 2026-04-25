import React, { useState } from 'react';
import { generateShortNotes } from '../lib/ai';

export default function ShortNotes() {
  const [fileText, setFileText] = useState('');
  const [notes, setNotes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileText(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const data = await generateShortNotes(fileText);
      setNotes(data);
    } catch (err) {
      alert("Error generating notes");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Upload Document for Smart Notes</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload a .txt file</label>
        <input 
          type="file" 
          accept=".txt" 
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {fileText && (
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 w-full"
        >
          {isGenerating ? 'Analyzing File...' : 'Extract Key Topics'}
        </button>
      )}

      {notes.length > 0 && (
        <div className="mt-8 space-y-6">
          {notes.map((section, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-lg font-bold text-blue-900 mb-2 border-b border-gray-200 pb-2">
                {section.topic}
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {section.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}