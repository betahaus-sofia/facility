import { Supply } from './supply.service';

export class Room {
  id: string;
  name: string;
  supplies: Supply[];

  constructor(room) {
    for (let key in room) {
      if (room.hasOwnProperty(key)) {
        this[key] = room[key];
      }
    }
    
    if (this.supplies) {
      this.supplies.forEach((supply, index) => {
        supply.id = index.toString()
      });
    }
  }
}
