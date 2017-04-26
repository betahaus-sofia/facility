import './assets/logo.png';
import './manifest.json';
import './style.scss';

import { redraw } from 'mithril';

import { initializeFirebase } from './firebase';
import { initializeRouter } from './router';
import { store } from './store';

initialize();

function initialize() {
  initializeFirebase();
  registerServiceWorker();
  initializeRouter();
  subscribeToStore();
}

function registerServiceWorker() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('service-worker.js', { scope: './' });
  }
}

function subscribeToStore() {
  store.subscribe(redraw);

  const unsubscribeContainers = store.subscribe(() => {
    const container = document.querySelector('#container');
    container.classList.add('loaded');

    const spinnerView = document.querySelector('#spinner-view');
    spinnerView.classList.add('loaded');

    unsubscribeContainers();
  });
}
