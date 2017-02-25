import { select, option } from 'compote';

import Room from '../room';
import Supply from '../supply';

import { render } from '../facility';

export function RoomList(rooms: Room[]) {
  return (
    select({
      className: 'room-list-select',
      onchange: ($event: Event) => {
        const value = (<HTMLSelectElement>$event.target).value;
        rooms.forEach((room) => {
          if (room.id === value) {
            getSupplies(rooms, room);
            render(rooms, room);
          }
        });
      }
    }, rooms.map((room) => (
      option({ value: room.id }, room.name))
    ))
  );
}

export function getSupplies(rooms: Room[], room: Room) {
  const supplies: Supply[] = [];
  const suppliesRef = firebase.database().ref(`rooms/${room.id}/supplies`);
  suppliesRef.off('child_added');
  suppliesRef.on('child_added', (roomSupplyChildSnapshot: any) => {
    firebase.database().ref(`supplies/${roomSupplyChildSnapshot.key}`).once('value', (supplySnapshot: any) => {
      const supply = new Supply(supplySnapshot.val());
      supply.id = supplySnapshot.key;
      supplies.push(supply);
      render(rooms, room, supplies);

      // TODO: Unsubscribe on remove
      firebase.database().ref(`roomSupplies/${room.id}_${supply.id}/requested`).on('value', (requestedSnapshot: any) => {
        const requested = requestedSnapshot.val();
        if (requested) {
          supply.requested = Math.min(requested, Date.now());
          render(rooms, room, supplies);
        }
      });
    });
  });
}
