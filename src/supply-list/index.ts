import './style.scss';

declare var require: (moduleName: string) => any;

import { div, button, img, h5, h4 } from 'compote/html';
const timeago = require('timeago.js');

import { Room } from '../room';
import { Supply, requestSupply } from '../supply';

export function SupplyList(room: Room, supplies: Supply[]) {
  return (
    div({ className: 'supply-list flex-row flex-wrap justify-content-start align-items-stretch' }, supplies.map((supply) => (
      div({ className: 'supply-list-item' },
        div({ className: 'supply-list-item-container' }, [
          button({ className: 'supply-list-item-button', onclick: () => requestSupply(room, supply) }, [
            img({ className: 'supply-list-item-image', src: supply.imageUrl || '/assets/icon.png' }),
            h5(supply.name)
          ]),
          // TODO: Cache instance & automatically update `timeago`
          supply.requested ? h4(`Requested ${new timeago().format(supply.requested)}`) : null
        ])
      )
    )))
  );
}
