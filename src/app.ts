import './assets/logo.png';
import './manifest.json';
import './style.scss';

import { Compote } from 'compote/html';
import throttle = require('lodash/throttle');

import { getRooms } from './room';
import { store } from './store';

import { ShowFeedbackFormButton, FeedbackForm } from './feedback';
import { initializeFirebase } from './firebase';
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
  const { rooms, selectedRoom, selectedRoomSupplies, showFeedbackForm } = store.getState();
  Compote.render(container, [
    RoomList(rooms),
    SupplyList(selectedRoom, selectedRoomSupplies),
    ShowFeedbackFormButton(),
    showFeedbackForm ? FeedbackForm(process.env.FEEDBACK_FORM_URL) : null
  ]);
}
