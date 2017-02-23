import { App, Mithril } from 'compote';
import RoomList from './room-list';

class FacilityApp implements App {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBJs9umNrD6Bg3iuyTqVVbOEMv7Xgsk0uY',
      authDomain: 'betahaus-sofia-office-manager.firebaseapp.com',
      databaseURL: 'https://betahaus-sofia-office-manager.firebaseio.com',
      storageBucket: 'betahaus-sofia-office-manager.appspot.com'
    });

    this.roomList = new RoomList(this);
  }

  private roomList: RoomList;

  update() {
    Mithril.render(document.querySelector('#container'), this.render());
  }

  render() {
    return this.roomList.render();
  }
}

const app = new FacilityApp();
app.update();
