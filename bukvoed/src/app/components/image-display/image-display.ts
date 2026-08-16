import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-display',
  imports: [MatProgressSpinnerModule, MatIconModule],
  templateUrl: './image-display.html',
  styleUrl: './image-display.scss',
})
export class ImageDisplay {
  @Input() imageUrl: string | null = null;
  @Input() isLoading: boolean = false;
}
