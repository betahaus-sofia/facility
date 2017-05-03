import { redraw } from 'mithril';
import { div, h1 } from 'compote/html';
import { getAnimationDuration } from 'compote/css';

import { Actions } from '../actions';
import { setRequestedSupply } from '../home-page/data';
import { store } from '../store';
import { Supply } from '../supply';

export const RequestedSupply = (supply: Supply) => (
  div({
    className: 'fixed stretch bg-success flex-row justify-content-center align-items-center',
    oncreate({ dom }) {
      dom.classList.add('fade-in-animation');
      dom.children[0].classList.add('scale-in-animation');
      setTimeout(() => {
        setRequestedSupply(null);
        redraw();
      }, 1e3);
    },
    onbeforeremove({ dom }) {
      dom.classList.remove('fade-in-animation');
      dom.children[0].classList.remove('scale-in-animation');

      dom.classList.add('fade-out-animation');
      dom.children[0].classList.add('scale-out-animation');

      return new Promise((resolve) => {
        setTimeout(resolve, 0.95 * getAnimationDuration(dom) * 1e3);
      }).then(() => {
        dom.classList.remove('fade-out-animation');
        dom.children[0].classList.remove('scale-out-animation');
      });
    }
  },
    h1(`${supply.name} requested!`)
  )
);
