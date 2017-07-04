import './style.scss';

import { div } from 'compote/html';
import { flex } from 'compote/components/flex';
import { groupBy, keys } from 'compote/components/utils';

import { Room, selectRoom } from '../room';
import { store } from '../store';

// NOTE: This function reaches into the store and is thus not stateless!
export const isSelected = (room: Room): boolean => {
  const { selectedRoom } = store.getState();
  return selectedRoom != null && selectedRoom.id === room.id;
};

export const RoomListItem = (room: Room) => (
  div({
    class: `room-list-item ${isSelected(room) ? 'selected' : ''}`,
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
  div({ class: 'flex-item', style: flex(1) }, [
    div({ class: 'room-list-group' }, group),
    div({ class: 'room-list-items' },
      div({ class: 'flex-row justify-content-start align-items-stretch' },
        groupedRooms[group].map(RoomListItem)
      )
    )
  ])
);

const groupByGroup = groupBy<Room>('group');

export const RoomList = (rooms: Room[]) => {
  const roomsByGroup = groupByGroup(rooms);
  const groups = keys(roomsByGroup);

  return div({ class: 'room-list' },
    div({ class: 'flex-row-md justify-content-start align-items-stretch' },
      groups.map(RoomsByGroup(roomsByGroup))
    )
  );
};
