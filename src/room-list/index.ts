import './style.scss';

import { select, option } from 'compote/html';
import { Room, selectRoom } from '../room';

export function RoomList(rooms: Room[]) {
  return (
    select({
      className: 'room-list-select',
      onchange: ($event: Event) => {
        const value = (<HTMLSelectElement>$event.target).value;
        rooms.forEach((room) => {
          if (room.id === value) {
            selectRoom(room);
          }
        });
      }
    }, rooms.map((room) => (
      option({ value: room.id }, room.name))
    ))
  );
}
