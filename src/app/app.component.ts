import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
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
