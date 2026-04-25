import axios from 'axios';


export const generateStudyMaterial = async (notesText) => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  if (!apiKey) throw new Error("Missing VITE_AI_API_KEY in .env.local file.");

  const prompt = `
    You are a technical study assistant. Read the following notes and generate 12 highly relevant flashcards.
    You MUST return the output STRICTLY as a raw JSON array of objects. 
    Do NOT wrap the response in markdown blocks (e.g., no \`\`\`json).
    Each object must have exactly two keys: "front" (the question) and "back" (the answer).
    Notes to process:
    ${notesText}
  `;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const textResponse = response.data.candidates[0].content.parts[0].text;
    const cleanJsonString = textResponse.replace(/```json/gi, '').replace(/```/gi, '').trim();
    return JSON.parse(cleanJsonString);
  } catch (error) {
    console.error("Flashcard Error:", error);
    throw new Error("Failed to generate flashcards.");
  }
};


export const generateShortNotes = async (text) => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  
  const prompt = `
    Analyze the following text and generate concise, structured short notes categorized by topic.
    Return STRICTLY a raw JSON array of objects. Do NOT use markdown formatting.
    Format: [{"topic": "Topic Name", "points": ["Key point 1", "Key point 2"]}]
    Text: ${text}
  `;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const textResponse = response.data.candidates[0].content.parts[0].text;
    const cleanJson = textResponse.replace(/```json/gi, '').replace(/```/gi, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Notes Error:", error);
    throw new Error("Failed to generate notes.");
  }
};


export const generateQuiz = async (text) => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  
  const prompt = `
    Create a 5-question multiple choice quiz based on this text.
    Return STRICTLY a raw JSON array of objects. Do NOT use markdown formatting.
    Format: [{"question": "Q text?", "options": ["A", "B", "C", "D"], "answer": "The exact string of the correct option"}]
    Text: ${text}
  `;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const textResponse = response.data.candidates[0].content.parts[0].text;
    const cleanJson = textResponse.replace(/```json/gi, '').replace(/```/gi, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Quiz Error:", error);
    throw new Error("Failed to generate quiz.");
  }
};