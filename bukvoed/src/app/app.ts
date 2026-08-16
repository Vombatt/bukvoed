import { Component, signal, OnInit, inject } from '@angular/core';
import { GameBoardComponent } from './components/game-board/game-board';
import { WordService } from './services/word.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  imports: [GameBoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private wordService = inject(WordService);
  private gameService = inject(GameService);
  
  public isReady = signal(false);
  public hasError = signal(false);

  ngOnInit() {
    this.initGame();
  }

  async initGame() {
    this.hasError.set(false);
    this.isReady.set(false);
    try {
      await this.wordService.loadWords();
      this.gameService.setDifficulty(4);
      this.isReady.set(true);
    } catch (e) {
      console.error('Failed to load words', e);
      this.hasError.set(true);
    }
  }

  retry() {
    this.initGame();
  }
}
