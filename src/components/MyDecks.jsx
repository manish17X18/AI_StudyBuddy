import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Flashcard from './Flashcard';

export default function MyDecks({ user }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDeck, setActiveDeck] = useState(null); // Tracks which deck to study

  useEffect(() => {
    const fetchDecks = async () => {
      if (!user) return;
      try {
        // DRY RUN: Path resolves to /users/{uid}/decks
        const decksRef = collection(db, 'users', user.uid, 'decks');
        const snapshot = await getDocs(decksRef);
        
        // O(N) traversal to map Firestore documents to our JS array
        const fetchedDecks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort locally to avoid Firestore composite index errors during hackathon
        fetchedDecks.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
        setDecks(fetchedDecks);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, [user]);

  if (loading) return <div className="text-center py-10 font-bold text-gray-600">Loading your decks...</div>;

  // View: Studying a specific deck
  if (activeDeck) {
    return (
      <div className="animate-fade-in-up">
        <button 
          onClick={() => setActiveDeck(null)}
          className="mb-6 text-blue-600 font-bold hover:underline"
        >
          &larr; Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold mb-6">Studying Deck</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeDeck.cards.map((card, index) => (
            <Flashcard key={index} front={card.front} back={card.back} />
          ))}
        </div>
      </div>
    );
  }

  // View: List of all saved decks
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-6 border-b pb-4">My Saved Decks</h2>
      
      {decks.length === 0 ? (
        <p className="text-gray-500">You haven't saved any decks yet. Go generate some!</p>
      ) : (
        <div className="space-y-4">
          {decks.map(deck => (
            <div key={deck.id} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-bold text-gray-800">
                  {deck.sourceTextSnippet ? deck.sourceTextSnippet : "Custom Deck"}
                </p>
                <p className="text-sm text-gray-500 mt-1">{deck.cards?.length || 0} Cards</p>
              </div>
              <button 
                onClick={() => setActiveDeck(deck)}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold hover:bg-blue-200"
              >
                Study Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}