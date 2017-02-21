/// <reference path="../node_modules/compote/compote.d.ts" />

import { App, Mithril, h1 } from 'compote';

import timeago from './app/timeago';

class FacilityApp implements App {
  constructor() {
    this.update();

    firebase.initializeApp({
      apiKey: 'AIzaSyBJs9umNrD6Bg3iuyTqVVbOEMv7Xgsk0uY',
      authDomain: 'betahaus-sofia-office-manager.firebaseapp.com',
      databaseURL: 'https://betahaus-sofia-office-manager.firebaseio.com',
      storageBucket: 'betahaus-sofia-office-manager.appspot.com'
    });
  }

  update() {
    Mithril.render(document.querySelector('#container'), this.render());
  }

  render() {
    return [
      h1('Betahaus Facility'),
      h1(timeago(new Date()))
    ];
  }
}

new FacilityApp();
