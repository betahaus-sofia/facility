import './style.scss';

import { div } from 'compote/html';
import groupBy = require('lodash/groupBy');
import keys = require('lodash/keys');

import { flex } from '../flex';
import { Room, selectRoom } from '../room';
import store from '../store';

export const isSelected = (room: Room): boolean => {
  const { selectedRoom } = store.getState();
  return selectedRoom != null && selectedRoom.id === room.id;
};

export const RoomListItem = (room: Room) => (
  div({
    className: `room-list-item ${isSelected(room) ? 'selected' : ''}`,
    onclick() {
      if (!isSelected(room)) {
        selectRoom(room);
      }
    }
  },
    room.name
  )
);

export const RoomsByGroup = (groupedRooms: Record<string, Room[]>) => (group: string) => (
  div({ className: 'flex-item', style: flex(1) }, [
    div({ className: 'room-list-group' }, group),
    div({ className: 'room-list-items' },
      div({ className: 'flex-row justify-content-start align-items-stretch' },
        groupedRooms[group].map(RoomListItem)
      )
    )
  ])
);

export const RoomList = (rooms: Room[]) => {
  const roomsByGroup = groupBy(rooms, 'group');
  const groups = keys(roomsByGroup);

  return div({ className: 'room-list' },
    div({ className: 'flex-row-md justify-content-start align-items-stretch' },
      groups.map(RoomsByGroup(roomsByGroup))
    )
  );
};
