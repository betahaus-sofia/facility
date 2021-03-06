import { Model } from 'compote/components/model';
import * as firebase from 'firebase/app';

import { DataSnapshot } from '../firebase';
import { Actions, store } from '../store';
import { unsubscribeFromSupplies, getSupplies } from '../supply';

export class Room extends Model<Room> {
  id?: string;
  group?: string;
  name?: string;
}

export const getRooms = () => {
  const roomsRef = firebase.database().ref('rooms');
  roomsRef.off('child_added', addRoom);
  roomsRef.on('child_added', addRoom);
};

export const addRoom = (roomChildSnapshot: DataSnapshot<Room>) => {
  const room = new Room({ id: roomChildSnapshot.key }, roomChildSnapshot.val());
  store.dispatch({ type: Actions.ADD_ROOM, room });
  const { selectedRoom } = store.getState();
  if (!selectedRoom) {
    selectRoom(room);
  }
};

export const selectRoom = (room: Room) => {
  const { selectedRoom, selectedRoomSupplies } = store.getState();
  unsubscribeFromSupplies(selectedRoom, selectedRoomSupplies);

  store.dispatch({ type: Actions.SELECT_ROOM, room });
  getSupplies(room);
};
