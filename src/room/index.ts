import { Actions } from '../actions';
import Model from '../model';
import { store } from '../store';
import { unsubscribeFromSupplies, getSupplies } from '../supply';

export class Room extends Model<Room> {
  id?: string;
  group?: string;
  name?: string;
}

export function getRooms() {
  const roomsRef = firebase.database().ref('rooms');
  roomsRef.off('child_added');
  roomsRef.on('child_added', addRoom);
}

export function addRoom(roomChildSnapshot: FirebaseSnapshot<Room>) {
  const room = new Room({ id: roomChildSnapshot.key }, roomChildSnapshot.val());
  store.dispatch({ type: Actions.ADD_ROOM, room });
  const { selectedRoom } = store.getState();
  if (!selectedRoom) {
    selectRoom(room);
  }
}

export function selectRoom(room: Room) {
  const { selectedRoom, selectedRoomSupplies } = store.getState();
  unsubscribeFromSupplies(selectedRoom, selectedRoomSupplies);

  store.dispatch({ type: Actions.SELECT_ROOM, room });
  getSupplies(room);
}
