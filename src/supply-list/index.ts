import './style.scss';

import { div, img, h4 } from 'compote/html';
import { flex } from 'compote/components/flex';
import { Timeago } from 'compote/components/timeago';

import { Room } from '../room';
import { Supply, requestSupply } from '../supply';

export const SupplyRequestedDate = (requested: Date) => (
  div({
    className: 'flex-row justify-content-center align-items-center',
    title: `Last requested on ${requested.toLocaleString()}`
  }, Timeago(requested))
);

export const SupplyListItem = (room: Room) => (supply: Supply) => (
  // NOTE: `min-width` doesn't work correctly on iOS
  // http://stackoverflow.com/questions/29986668/flex-wrap-not-working-as-expected-in-safari
  div({ key: supply.id, className: 'supply-list-item fade-in-animation', style: flex('1 0 auto') }, [
    div({ className: 'supply-list-item-button' }, [
      div({ className: 'supply-list-item-container', onclick: () => requestSupply(room, supply) },
        img({ className: 'supply-list-item-image', src: supply.imageUrl || 'logo.png' })
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
