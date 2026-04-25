import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Define the directory structure for the MVP
const directories = [
  'app/api/generate',
  'components',
  'lib'
];

// 2. Define the base files to touch (create empty)
const files = [
  '.env.local',
  'app/api/generate/route.js',
  'components/Header.jsx',
  'components/NotesInput.jsx',
  'components/Flashcard.jsx',
  'lib/ai.js'
];

console.log('Starting scaffolding process...');

// Execute directory creation
directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Execute file creation
files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '', 'utf8');
    console.log(`Created file: ${file}`);
  }
});

console.log('Scaffolding complete. You can delete this script now.');