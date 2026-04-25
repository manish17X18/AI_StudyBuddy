import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NotesInput from './components/NotesInput';
import Flashcard from './components/Flashcard';
import ShortNotes from './components/ShortNotes';
import Quiz from './components/Quiz';
import Auth from './components/Auth';
import { generateStudyMaterial } from './lib/ai';
import { auth, db } from './lib/firebase'; // Added db import
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Added Firestore functions
import MyDecks from './components/MyDecks';

export default function App() {
  const [user, setUser] = useState(null); 
  const [authLoading, setAuthLoading] = useState(true); 
  const [activeTab, setActiveTab] = useState('flashcards'); 
  
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Added isSaving state
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // --- ADDED SAVE FUNCTION ---
  const handleSaveDeck = async () => {
    if (!user || flashcards.length === 0) return;
    setIsSaving(true);
    try {
      const userDecksRef = collection(db, 'users', user.uid, 'decks');
      await addDoc(userDecksRef, {
        cards: flashcards,
        sourceTextSnippet: inputText.substring(0, 40) + "...",
        createdAt: serverTimestamp()
      });
      alert("Deck saved successfully!");
    } catch (error) {
      console.error("Error saving deck:", error);
      alert("Failed to save deck.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateFlashcards = async () => {
    setIsGenerating(true);
    try {
      const data = await generateStudyMaterial(inputText, 'flashcards');
      setFlashcards(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header /> 
      
      <main className="max-w-5xl mx-auto px-4 py-10">
        {!user ? (
          <Auth />
        ) : (
          <>
            <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
              <div className="flex gap-4">
                <button onClick={() => setActiveTab('flashcards')} className={`font-bold px-4 py-2 rounded-lg ${activeTab === 'flashcards' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>Flashcards</button>
                <button onClick={() => setActiveTab('notes')} className={`font-bold px-4 py-2 rounded-lg ${activeTab === 'notes' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>Smart Notes</button>
                <button onClick={() => setActiveTab('quiz')} className={`font-bold px-4 py-2 rounded-lg ${activeTab === 'quiz' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>Practice Quiz</button>
                <button onClick={() => setActiveTab('mydecks')} className={`font-bold px-4 py-2 rounded-lg ${activeTab === 'mydecks' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>My Decks</button>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600">{user.email}</span>
                <button onClick={handleLogout} className="text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">Log Out</button>
              </div>
            </div>

            {activeTab === 'flashcards' && (
              <div className="space-y-8 animate-fade-in-up">
                <NotesInput inputText={inputText} setInputText={setInputText} onGenerate={handleGenerateFlashcards} isGenerating={isGenerating} />
                
                {/* --- ADDED SAVE BUTTON SECTION --- */}
                {flashcards.length > 0 && (
                  <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <span className="font-medium text-gray-700">{flashcards.length} Cards Generated</span>
                    <button 
                      onClick={handleSaveDeck}
                      disabled={isSaving}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-colors disabled:bg-gray-400"
                    >
                      {isSaving ? "Saving..." : "💾 Save Deck"}
                    </button>
                  </div>
                )}

                {flashcards.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {flashcards.map((card, index) => (
                      <Flashcard key={index} front={card.front} back={card.back} />
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'notes' && <ShortNotes />}
            {activeTab === 'quiz' && <Quiz />}
            {activeTab === 'mydecks' && <MyDecks user={user} />}
          </>
        )}
      </main>
    </div>
  );
}