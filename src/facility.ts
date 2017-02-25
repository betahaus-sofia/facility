import { Mithril, div } from 'compote';

import { getRooms } from './room';
import Store from './store';

import { RoomList } from './room-list';
import { SupplyList } from './supply-list';

initializeApp();

function initializeApp() {
  firebase.initializeApp({
    apiKey: 'AIzaSyBJs9umNrD6Bg3iuyTqVVbOEMv7Xgsk0uY',
    authDomain: 'betahaus-sofia-office-manager.firebaseapp.com',
    databaseURL: 'https://betahaus-sofia-office-manager.firebaseio.com',
    storageBucket: 'betahaus-sofia-office-manager.appspot.com'
  });

  const { rooms } = Store.getState();
  Store.subscribe(render);
  getRooms(rooms);
}

function render() {
  const { rooms, selectedRoom, selectedRoomSupplies } = Store.getState();
  Mithril.render(document.querySelector('#container'), [
    RoomList(rooms),
    div({ className: 'room-list-item' }, (
      SupplyList(selectedRoom, selectedRoomSupplies)
    ))
  ]);
}
