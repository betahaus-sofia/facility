import './style.scss';

import { div } from 'compote/html';
import groupBy = require('lodash/groupBy');
import keys = require('lodash/keys');

import { flex } from '../flex';
import { Room, selectRoom } from '../room';

export const RoomListItem = (selectedRoom: Room) => (room: Room) => (
  div({
    className: `room-list-item ${room.id === selectedRoom.id ? 'selected' : ''}`,
    onclick: () => selectRoom(room)
  }, room.name)
);

export const RoomList = (rooms: Room[], selectedRoom: Room) => {
  const groupedRooms = groupBy(rooms, 'group');
  const groups = keys(groupedRooms);
  return div({ className: 'room-list flex-row-md justify-content-start align-items-stretch' }, groups.map((group) => (
    div({ className: 'flex-item', style: flex(1) }, [
      div({ className: 'room-list-group' }, group),
      div({ className: 'flex-row justify-content-start align-items-stretch' },
        groupedRooms[group].map(RoomListItem(selectedRoom))
      )
    ])
  )));
};
