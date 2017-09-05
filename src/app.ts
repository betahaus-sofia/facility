import './assets/logo.png';
import './manifest.json';
import './style.scss';

import { setHyperscriptFunction } from 'compote';
import * as m from 'mithril';

import { initializeFirebaseApp } from './firebase';
import { initializeRouter } from './router';
import { store } from './store';

setHyperscriptFunction(m);
initializeApp();

function initializeApp() {
  initializeFirebaseApp();
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
  store.subscribe(m.redraw);

  const container = document.querySelector('#container');
  const spinnerView = document.querySelector('#spinner-view');
  const unsubscribe = store.subscribe(() => {
    container.classList.add('loaded');
    spinnerView.classList.add('loaded');

    unsubscribe();
  });
}
