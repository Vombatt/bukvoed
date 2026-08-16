import { Component, signal, OnInit, inject } from '@angular/core';
import { GameBoardComponent } from './components/game-board/game-board';
import { WordService } from './services/word.service';

@Component({
  selector: 'app-root',
  imports: [GameBoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private wordService = inject(WordService);
  public isReady = signal(false);

  async ngOnInit() {
    await this.wordService.loadWords();
    this.isReady.set(true);
  }
}
