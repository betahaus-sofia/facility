import { select, option } from 'compote';

import { Room } from '../room';
import { getSupplies } from '../supply';

export function RoomList(rooms: Room[]) {
  return (
    select({
      className: 'room-list-select',
      onchange: ($event: Event) => {
        const value = (<HTMLSelectElement>$event.target).value;
        rooms.forEach((room) => {
          if (room.id === value) {
            getSupplies(rooms, room);
          }
        });
      }
    }, rooms.map((room) => (
      option({ value: room.id }, room.name))
    ))
  );
}
