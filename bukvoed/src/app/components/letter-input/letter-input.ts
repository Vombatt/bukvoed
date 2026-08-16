import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-letter-input',
  imports: [],
  templateUrl: './letter-input.html',
  styleUrl: './letter-input.scss',
})
export class LetterInput {
  @Input() letters: string[] = [];
  @Input() wordLength: number = 0;

  get cells(): (string | null)[] {
    const result: (string | null)[] = [];
    for (let i = 0; i < this.wordLength; i++) {
      result.push(i < this.letters.length ? this.letters[i] : null);
    }
    return result;
  }
}
