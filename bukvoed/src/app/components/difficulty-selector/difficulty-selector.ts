import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Difficulty } from '../../models/game.model';

@Component({
  selector: 'app-difficulty-selector',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './difficulty-selector.html',
  styleUrl: './difficulty-selector.scss',
})
export class DifficultySelector {
  @Input() difficulty: Difficulty = 4;
  @Output() difficultyChange = new EventEmitter<Difficulty>();

  onDifficultyChange(newDifficulty: Difficulty) {
    this.difficultyChange.emit(newDifficulty);
  }
}
