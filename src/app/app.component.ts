import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quiz-app';
  header = 'Welcome To Quiz';

  constructor () {}

  displayHeader () {
    this.header = "Results";
  }
}
