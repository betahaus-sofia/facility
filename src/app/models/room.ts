export class Room {
  id: string;
  name: string;

  constructor(room) {
    for (let key in room) {
      if (room.hasOwnProperty(key)) {
        this[key] = room[key];
      }
    }
  }
}
