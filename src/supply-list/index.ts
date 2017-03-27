import './style.scss';

import { div, img, h4 } from 'compote/html';
import timeago from 'timeago.js';

import { Clock } from '../clock';
import { flex } from '../flex';
import { Room } from '../room';
import { Supply, requestSupply } from '../supply';

export const SupplyRequestedDate = (requested: Date) => (
  div({
    className: 'flex-row justify-content-center align-items-center',
    title: `Last requested on ${requested.toLocaleString()}`
  }, [
    Clock(requested),
    // TODO: Cache instance & automatically update `timeago`
    timeago().format(requested)
  ])
);

export const SupplyListItem = (room: Room) => (supply: Supply) => (
  div({ key: supply.id, className: 'supply-list-item fade-in-animation', style: flex(1) }, [
    div({ className: 'supply-list-item-button' }, [
      div({ className: 'supply-list-item-container', onclick: () => requestSupply(room, supply) },
        img({ src: supply.imageUrl || 'logo.png' })
      ),
      h4({ className: 'supply-list-item-name' }, supply.name),
      supply.requested ? SupplyRequestedDate(new Date(supply.requested)) : null
    ])
  ])
);

export const SupplyList = (room: Room, supplies: Supply[]) => (
  div({ className: 'supply-list flex-row flex-wrap justify-content-stretch align-items-stretch' },
    supplies.map(SupplyListItem(room))
  )
);
