import { Component, signal, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../environments/environment';
import { WordService } from './services/word.service';
@Component({
  selector: 'app-root',
  imports: [MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('bukvoed');
  private wordService = inject(WordService);

  constructor() {
    console.log('Pixabay API Key:', environment.pixabayApiKey);
  }

  async ngOnInit() {
    await this.wordService.loadWords();
    const word = this.wordService.getRandomWord(4);
    if (word) {
      const letters = this.wordService.generateLetterSet(word);
      console.log(`Выбранное слово: ${word}`);
      console.log(`Сгенерированный набор букв: ${letters.join(', ')}`);
    }
  }
}
