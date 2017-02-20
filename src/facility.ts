/// <reference path="../node_modules/compote/compote.d.ts" />

import { App, Mithril, h1 } from 'compote';

class FacilityApp implements App {
  constructor() {
    this.update();
  }

  update() {
    Mithril.render(document.querySelector('#container'), this.render());
  }

  render() {
    return [
      h1('Betahaus Facility')
    ];
  }
}

new FacilityApp();
