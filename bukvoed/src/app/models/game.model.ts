// Difficulty levels based on the length of the words
export type Difficulty = 4 | 5 | 6;

// Letter status in the game
export type LetterStatus = 'active' | 'inactive' | 'highlighted';

// Letter tile model
export interface LetterTile {
  id: string;         // Unique identifier for the tile
  letter: string;     // The character/letter
  status: LetterStatus;
}

// Pixabay API single image response
export interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

// Pixabay API overall response
export interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}
