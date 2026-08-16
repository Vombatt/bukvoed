import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game-controls',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './game-controls.html',
  styleUrl: './game-controls.scss',
})
export class GameControls {
  @Input() canUndo: boolean = false;
  @Input() canHint: boolean = false;
  @Input() hintsRemaining: number = 0;

  @Output() undo = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() hint = new EventEmitter<void>();
  @Output() replace = new EventEmitter<void>();
}
