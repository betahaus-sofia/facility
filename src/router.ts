import { route } from 'mithril';

import { HomePage } from './home-page';
import { getRooms } from './room';

export function initializeRouter() {
  route.prefix('');

  const container = document.querySelector('#container');
  route(container, '/', {
    '/': { onmatch: getRooms, render: HomePage }
  });
}
