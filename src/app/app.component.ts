import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // CSS from this component is global!
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBJs9umNrD6Bg3iuyTqVVbOEMv7Xgsk0uY',
      authDomain: 'betahaus-sofia-office-manager.firebaseapp.com',
      databaseURL: 'https://betahaus-sofia-office-manager.firebaseio.com',
      storageBucket: 'betahaus-sofia-office-manager.appspot.com',
    });
  }
}
