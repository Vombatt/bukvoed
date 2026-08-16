// Difficulty levels based on the length of the words
export type Difficulty = 3 | 4;

// Letter status in the game
export type LetterStatus = 'active' | 'inactive' | 'highlighted';

// Letter tile model
export interface LetterTile {
  id: string;         // Unique identifier for the tile
  letter: string;     // The character/letter
  status: LetterStatus;
}
