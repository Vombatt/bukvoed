import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bukvoed');

  constructor() {
    console.log('Pixabay API Key:', environment.pixabayApiKey);
  }
}
