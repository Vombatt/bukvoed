import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LetterTile, LetterStatus } from '../../models/game.model';

@Component({
  selector: 'app-letter-keyboard',
  imports: [],
  templateUrl: './letter-keyboard.html',
  styleUrl: './letter-keyboard.scss',
})
export class LetterKeyboard {
  @Input() letters: LetterTile[] = [];
  @Output() letterClick = new EventEmitter<number>();

  onLetterClick(index: number, status: LetterStatus): void {
    if (status !== 'inactive') {
      this.letterClick.emit(index);
    }
  }
}
