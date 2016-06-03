import { FORM_DIRECTIVES } from '@angular/common';
import { Component } from '@angular/core';

import { Room } from '../models';
import { SupplyListComponent } from '../supply-list';

@Component({
  directives: [FORM_DIRECTIVES, SupplyListComponent],
  moduleId: module.id,
  selector: 'app-room-list',
  styleUrls: ['room-list.component.css'],
  templateUrl: 'room-list.component.html'
})
export class RoomListComponent {
  private rooms: Room[] = [];

  ngOnInit() {
    firebase.database().ref('rooms').on('child_added', (snapshot) => {
      var room = new Room(snapshot.val());
      room.id = snapshot.key;
      this.rooms.push(room);
    });
  }
}
