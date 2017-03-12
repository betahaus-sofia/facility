import './style.scss';

import { div } from 'compote/html';

import { Room, selectRoom } from '../room';
import store from '../store';

export const RoomListItem = (selectedRoom: Room) => (room: Room) => (
  div({
    className: `room-list-item ${room.id === selectedRoom.id ? 'selected' : ''}`,
    onclick: () => selectRoom(room)
  }, room.name)
);

export const RoomList = (rooms: Room[]) => {
  const { selectedRoom } = store.getState();
  return div({ className: 'room-list flex-row justify-content-start align-items-stretch' }, rooms.map(
    RoomListItem(selectedRoom)
  ));
};
