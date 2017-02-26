import Actions from './actions';
import Model from './model';
import store from './store';
import { getSupplies } from './supply';

export class Room extends Model<Room> {
  id: string;
  name: string;
}

export function getRooms() {
  const roomsRef = firebase.database().ref('rooms');
  roomsRef.off('child_added');
  roomsRef.on('child_added', (roomChildSnapshot: any) => {
    const room = new Room({ id: roomChildSnapshot.key }, roomChildSnapshot.val());
    addRoom(room);
    const { selectedRoom } = store.getState();
    if (!selectedRoom) {
      selectRoom(room);
    }
  });
}

export function addRoom(room: Room) {
  store.dispatch({ type: Actions.ADD_ROOM, room });
}

export function selectRoom(room: Room) {
  const { selectedRoom, selectedRoomSupplies } = store.getState();
  if (selectedRoom) {
    firebase.database().ref(`rooms/${selectedRoom.id}/supplies`).off('child_added');
    selectedRoomSupplies.forEach((supply) => {
      firebase.database().ref(`roomSupplies/${selectedRoom.id}_${supply.id}/requested`).off('value');
    });
  }

  store.dispatch({ type: Actions.SELECT_ROOM, room });
  getSupplies(room);
}
