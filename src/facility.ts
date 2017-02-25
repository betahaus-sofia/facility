import { Mithril, div } from 'compote';

import Room from './room';
import Supply from './supply';

import { RoomList, getSupplies } from './room-list';
import { SupplyList } from './supply-list';

initializeApp();

function initializeApp() {
  firebase.initializeApp({
    apiKey: 'AIzaSyBJs9umNrD6Bg3iuyTqVVbOEMv7Xgsk0uY',
    authDomain: 'betahaus-sofia-office-manager.firebaseapp.com',
    databaseURL: 'https://betahaus-sofia-office-manager.firebaseio.com',
    storageBucket: 'betahaus-sofia-office-manager.appspot.com'
  });

  const rooms: Room[] = [];
  const roomsRef = firebase.database().ref('rooms');
  roomsRef.off('child_added');
  roomsRef.on('child_added', (roomChildSnapshot: any) => {
    const room = new Room(roomChildSnapshot.val());
    room.id = roomChildSnapshot.key;
    rooms.push(room);
    if (rooms.length === 1) {
      getSupplies(rooms, room);
    }
    render(rooms, room);
  });
}

export function render(rooms: Room[], selectedRoom: Room, supplies: Supply[] = []) {
  Mithril.render(document.querySelector('#container'), [
    RoomList(rooms),
    div({ className: 'room-list-item' }, (
      SupplyList(rooms, selectedRoom, supplies)
    ))
  ]);
}
