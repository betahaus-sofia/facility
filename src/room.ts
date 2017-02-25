import Actions from './actions';
import Model from './model';
import Store from './store';

export class Room extends Model<Room> {
  id: string;
  name: string;
}

export function getRooms(rooms: Room[]) {
  const roomsRef = firebase.database().ref('rooms');
  roomsRef.off('child_added');
  roomsRef.on('child_added', (roomChildSnapshot: any) => {
    const room = new Room({ id: roomChildSnapshot.key }, roomChildSnapshot.val());
    addRoom(room);
    // if (rooms.length === 0) {
    //   selectRoom(room);
    // }
  });
}

export function addRoom(room: Room) {
  Store.dispatch({
    type: Actions.ADD_ROOM,
    room
  });
}

export function selectRoom(room: Room) {
  Store.dispatch({
    type: Actions.SELECT_ROOM,
    room
  });
}
