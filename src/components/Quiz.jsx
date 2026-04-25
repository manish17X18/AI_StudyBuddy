import React, { useState } from 'react';
import { generateQuiz } from '../lib/ai';

export default function Quiz() {
  const [inputText, setInputText] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSelectedAnswers({});
    try {
      const data = await generateQuiz(inputText);
      setQuiz(data);
    } catch (err) {
      alert("Error generating quiz");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelect = (qIndex, option) => {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Generate Practice Quiz</h2>
      
      <textarea
        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
        placeholder="Paste notes here to generate a multiple choice quiz..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={isGenerating || !inputText}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium w-full"
      >
        {isGenerating ? 'Building Quiz...' : 'Generate Quiz'}
      </button>

      {quiz.length > 0 && (
        <div className="mt-8 space-y-8">
          {quiz.map((q, index) => (
            <div key={index} className="border border-gray-200 p-6 rounded-lg bg-gray-50">
              <p className="font-bold text-gray-800 mb-4">{index + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, oIndex) => {
                  const isSelected = selectedAnswers[index] === opt;
                  const isSubmitted = selectedAnswers[index];
                  const isCorrect = opt === q.answer;
                  
                  let btnClass = "w-full text-left p-3 rounded border transition-colors ";
                  if (!isSubmitted) {
                    btnClass += "bg-white border-gray-300 hover:bg-blue-50";
                  } else if (isCorrect) {
                    btnClass += "bg-green-100 border-green-500 font-bold text-green-900";
                  } else if (isSelected && !isCorrect) {
                    btnClass += "bg-red-100 border-red-500 text-red-900";
                  } else {
                    btnClass += "bg-white border-gray-300 opacity-50";
                  }

                  return (
                    <button 
                      key={oIndex}
                      onClick={() => !isSubmitted && handleSelect(index, opt)}
                      className={btnClass}
                      disabled={isSubmitted}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}