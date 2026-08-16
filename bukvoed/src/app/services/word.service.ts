import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type WordsDictionary = {
  [length: string]: string[];
};

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private http = inject(HttpClient);
  
  private words: WordsDictionary = {};
  private usedWords = new Set<string>();
  
  private readonly RUSSIAN_ALPHABET = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

  async loadWords(): Promise<void> {
    try {
      this.words = await firstValueFrom(
        this.http.get<WordsDictionary>('assets/data/words.json')
      );
    } catch (e) {
      console.error('Failed to load words dictionary', e);
      this.words = {};
    }
  }

  getRandomWord(length: number): string | null {
    if (!this.words[length]) {
      return null;
    }

    const availableWords = this.words[length].filter(w => !this.usedWords.has(w));
    
    if (availableWords.length === 0) {
      // Если все слова этой длины использованы, сбрасываем список использованных
      this.words[length].forEach(w => this.usedWords.delete(w));
      const resetWords = this.words[length];
      return resetWords[Math.floor(Math.random() * resetWords.length)];
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    return availableWords[randomIndex];
  }

  markAsUsed(word: string): void {
    this.usedWords.add(word);
  }

  isUsed(word: string): boolean {
    return this.usedWords.has(word);
  }

  generateLetterSet(word: string): string[] {
    const letters = word.split('');
    const remainingCount = 16 - letters.length;
    
    for (let i = 0; i < remainingCount; i++) {
      const randomChar = this.RUSSIAN_ALPHABET[Math.floor(Math.random() * this.RUSSIAN_ALPHABET.length)];
      letters.push(randomChar);
    }
    
    // Перемешиваем массив алгоритмом Фишера-Йетса
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    
    return letters;
  }
}
