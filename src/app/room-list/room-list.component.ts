import { FORM_DIRECTIVES } from '@angular/common';
import { Component } from '@angular/core';

import { SupplyListComponent } from '../supply-list';
import { Room } from '../services';

@Component({
  directives: [FORM_DIRECTIVES, SupplyListComponent],
  moduleId: module.id,
  selector: 'app-room-list',
  styleUrls: ['room-list.component.css'],
  templateUrl: 'room-list.component.html'
})
export class RoomListComponent {
  private rooms: Room[] = [];

  constructor() {
    firebase.database().ref('rooms').on('child_added', (snapshot) => {
      var room = new Room(snapshot.val());
      room.id = snapshot.key;
      
      if (room.supplies) {
        room.supplies.forEach((supply) => {
          firebase.database().ref(
            `rooms/${room.id}/supplies/${supply.id}/number`
          ).on('value', (n) => supply.number = n.val());
        });
      }
      
      this.rooms.push(room);
    });
  }
}
