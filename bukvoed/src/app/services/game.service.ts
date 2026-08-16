import { Injectable, computed, inject, signal } from '@angular/core';
import { WordService } from './word.service';
import { ImageService } from './image.service';
import { LetterTile, Difficulty } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private wordService = inject(WordService);
  private imageService = inject(ImageService);

  // State
  public currentWord = signal<string | null>(null);
  public enteredLetters = signal<LetterTile[]>([]);
  public availableLetters = signal<LetterTile[]>([]);
  public difficulty = signal<Difficulty>(4);
  public hintsRemaining = signal<number>(3);
  public imageUrl = signal<string | null>(null);
  public isImageLoading = signal<boolean>(false);

  // Computed
  public isComplete = computed(() => {
    const word = this.currentWord();
    if (!word) return false;
    return this.enteredLetters().length === word.length;
  });

  public isCorrect = computed(() => {
    if (!this.isComplete()) return false;
    const word = this.currentWord();
    const entered = this.enteredLetters().map(l => l.letter).join('');
    return word === entered;
  });

  public canUndo = computed(() => this.enteredLetters().length > 0);
  
  public canHint = computed(() => this.hintsRemaining() > 0 && !this.isComplete());

  // Actions
  public addLetter(tile: LetterTile) {
    if (tile.status === 'inactive') return;
    if (this.isComplete()) return;

    this.enteredLetters.update(letters => [...letters, tile]);
    this.availableLetters.update(letters =>
      letters.map(l => l.id === tile.id ? { ...l, status: 'inactive' } : l)
    );
  }

  public removeLast() {
    if (!this.canUndo()) return;
    
    this.enteredLetters.update(letters => {
      const newLetters = [...letters];
      const removed = newLetters.pop();
      
      if (removed) {
        this.availableLetters.update(avail => 
          avail.map(l => l.id === removed.id ? { ...l, status: 'active' } : l)
        );
      }
      return newLetters;
    });
  }

  public clearAll() {
    const entered = this.enteredLetters();
    if (entered.length === 0) return;

    const enteredIds = new Set(entered.map(l => l.id));
    
    this.enteredLetters.set([]);
    this.availableLetters.update(avail => 
      avail.map(l => enteredIds.has(l.id) ? { ...l, status: 'active' } : l)
    );
  }

  public useHint() {
    if (!this.canHint()) return;

    const word = this.currentWord();
    if (!word) return;

    const entered = this.enteredLetters();
    const nextCharIndex = entered.length;
    const nextChar = word[nextCharIndex];

    if (!nextChar) return;

    // Find the letter in availableLetters that matches and is 'active'
    this.availableLetters.update(avail => {
      let found = false;
      return avail.map(l => {
        if (!found && l.letter === nextChar && l.status === 'active') {
          found = true;
          return { ...l, status: 'highlighted' };
        }
        return l;
      });
    });

    this.hintsRemaining.update(h => h - 1);
  }

  public nextWord() {
    const diff = this.difficulty();
    const word = this.wordService.getRandomWord(diff);
    
    if (word) {
      this.currentWord.set(word);
      const letterStrings = this.wordService.generateLetterSet(word);
      
      const tiles: LetterTile[] = letterStrings.map((letter, index) => ({
        id: `tile-${Date.now()}-${index}`,
        letter,
        status: 'active'
      }));
      
      this.availableLetters.set(tiles);
      this.enteredLetters.set([]);
      this.hintsRemaining.set(word.length);
      this.isImageLoading.set(true);
      this.imageUrl.set(null);

      this.imageService.searchImage(word).subscribe(url => {
        this.imageUrl.set(url);
        this.isImageLoading.set(false);
      });
    }
  }

  public replaceWord() {
    this.nextWord();
  }

  public setDifficulty(diff: Difficulty) {
    this.difficulty.set(diff);
    this.nextWord();
  }
}
