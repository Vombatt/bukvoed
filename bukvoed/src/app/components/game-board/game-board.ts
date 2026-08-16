import { Component, computed, inject, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { DifficultySelector } from '../difficulty-selector/difficulty-selector';
import { ImageDisplay } from '../image-display/image-display';
import { LetterInput } from '../letter-input/letter-input';
import { LetterKeyboard } from '../letter-keyboard/letter-keyboard';
import { GameControls } from '../game-controls/game-controls';
import { Difficulty } from '../../models/game.model';

@Component({
  selector: 'app-game-board',
  imports: [
    DifficultySelector,
    ImageDisplay,
    LetterInput,
    LetterKeyboard,

    GameControls
  ],
  templateUrl: './game-board.html',
  styleUrl: './game-board.scss',
})
export class GameBoardComponent implements OnInit {
  public gameService = inject(GameService);

  public enteredLettersStrings = computed(() => {
    return this.gameService.enteredLetters().map(tile => tile.letter);
  });

  public currentWordLength = computed(() => {
    return this.gameService.currentWord()?.length || 0;
  });

  ngOnInit() {
    // Start the game initially if not started
    if (!this.gameService.currentWord()) {
      this.gameService.nextWord();
    }
  }

  onDifficultyChange(diff: Difficulty) {
    this.gameService.setDifficulty(diff);
  }

  onLetterSelect(index: number) {
    const tiles = this.gameService.availableLetters();
    if (index >= 0 && index < tiles.length) {
      this.gameService.addLetter(tiles[index]);
    }
  }

  onUndo() {
    this.gameService.removeLast();
  }

  onClear() {
    this.gameService.clearAll();
  }

  onHint() {
    this.gameService.useHint();
  }

  onReplace() {
    this.gameService.replaceWord();
  }
}
