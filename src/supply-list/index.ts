import './style.scss';

declare var require: (moduleName: string) => any;

import { div, h4 } from 'compote/html';
const timeago = require('timeago.js');

import { Room } from '../room';
import { Supply, requestSupply } from '../supply';

export const SupplyRequestedDate = (requested: Date) => (
  div({ title: `Last requested on ${requested.toLocaleString()}` }, [
    div({ className: 'fa fa-fw fa-clock-o' }),
    // TODO: Cache instance & automatically update `timeago`
    new timeago().format(requested)
  ])
);

export const SupplyListItem = (room: Room) => (supply: Supply) => (
  div({ key: supply.id, className: 'supply-list-item fade-in-animation' }, [
    div({ className: 'supply-list-item-button' }, [
      div({
        className: 'supply-list-item-container',
        style: {
          'background-image': `url(${supply.imageUrl || '/assets/icon.png'})`
        },
        onclick: () => requestSupply(room, supply)
      }),
      h4({ className: 'supply-list-item-name' }, supply.name),
      supply.requested ? SupplyRequestedDate(new Date(supply.requested)) : null
    ])
  ])
);

export const SupplyList = (room: Room, supplies: Supply[]) => (
  div({ className: 'supply-list flex-row flex-wrap justify-content-start align-items-stretch' },
    supplies.map(SupplyListItem(room))
  )
);
