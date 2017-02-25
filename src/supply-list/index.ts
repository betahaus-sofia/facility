import { div, button, img, h5, h4 } from 'compote';
const timeago = require('timeago.js');

import { render } from '../facility';
import Room from '../room';
import Supply from '../supply';

export function SupplyList(rooms: Room[], room: Room, supplies: Supply[] = []) {
  return (
    div({
      className: 'supply-list flex-row flex-wrap justify-content-start align-items-stretch'
    }, supplies.map((supply) => (
      div({ className: 'supply-list-item' },
        div({ className: 'supply-list-item-container' }, [
          button({
            className: 'supply-list-item-button',
            onclick: () => {
              makeRequestFor(room, supply);
              render(rooms, room, supplies);
            }
          }, [
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

function makeRequestFor(room: Room, supply: Supply) {
  firebase.database().ref(`roomSupplies/${room.id}_${supply.id}`).update({
    room: room.id,
    supply: supply.id,
    requested: firebase.database.ServerValue.TIMESTAMP
  });
}
