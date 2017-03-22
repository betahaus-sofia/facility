import './assets/logo.png';
import './manifest.json';
import './style.scss';

import { Compote } from 'compote/html';
import throttle = require('lodash/throttle');

import { getRooms } from './room';
import store from './store';

import { RoomList } from './room-list';
import { SupplyList } from './supply-list';

const container = document.querySelector('#container');
const spinnerView = document.querySelector('#spinner-view');

initialize();

function initialize() {
  initializeFirebase();
  registerServiceWorker();
  subscribeToStore();
  getRooms();
}

function initializeFirebase() {
  firebase.initializeApp({
    apiKey: 'AIzaSyBJs9umNrD6Bg3iuyTqVVbOEMv7Xgsk0uY',
    authDomain: 'betahaus-sofia-office-manager.firebaseapp.com',
    databaseURL: 'https://betahaus-sofia-office-manager.firebaseio.com',
    storageBucket: 'betahaus-sofia-office-manager.appspot.com',
    messagingSenderId: '54350089959'
  });
}

function registerServiceWorker() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('service-worker.js', { scope: './' });
  }
}

function subscribeToStore() {
  store.subscribe(throttle(render, 10));

  const unsubscribeSpinnerView = store.subscribe(() => {
    spinnerView.classList.add('loaded');
    unsubscribeSpinnerView();
  });
}

function render() {
  const { rooms, selectedRoom, selectedRoomSupplies } = store.getState();
  Compote.render(container, [
    RoomList(rooms),
    SupplyList(selectedRoom, selectedRoomSupplies)
  ]);
}
