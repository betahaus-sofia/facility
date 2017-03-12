import './assets/icon.png';
import './manifest.json';
import './style.scss';

import { Compote } from 'compote/html';
import throttle = require('lodash/throttle');

import { getRooms } from './room';
import store from './store';

import { RoomList } from './room-list';
import { SupplyList } from './supply-list';

const container = document.querySelector('#container');
initializeApp();

function initializeApp() {
  firebase.initializeApp({
    apiKey: 'AIzaSyBJs9umNrD6Bg3iuyTqVVbOEMv7Xgsk0uY',
    authDomain: 'betahaus-sofia-office-manager.firebaseapp.com',
    databaseURL: 'https://betahaus-sofia-office-manager.firebaseio.com',
    storageBucket: 'betahaus-sofia-office-manager.appspot.com'
  });

  store.subscribe(throttle(render, 10));
  getRooms();
}

function render() {
  const { rooms, selectedRoom, selectedRoomSupplies } = store.getState();
  Compote.render(container, [
    RoomList(rooms),
    SupplyList(selectedRoom, selectedRoomSupplies)
  ]);
}
