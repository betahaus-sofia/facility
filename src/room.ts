import Actions from './actions';
import Model from './model';
import store from './store';

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
    selectDefaultRoom(room);
  });
}

export function addRoom(room: Room) {
  store.dispatch({ type: Actions.ADD_ROOM, room });
}

export function selectDefaultRoom(room: Room) {
  const { rooms } = store.getState();
  store.dispatch({ type: Actions.SELECT_DEFAULT_ROOM, rooms, room });
}

export function selectRoom(room: Room) {
  store.dispatch({ type: Actions.SELECT_ROOM, room });
}
