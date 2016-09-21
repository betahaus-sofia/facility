import { Component, OnInit } from '@angular/core';

import { Room } from '../models';
// import { SupplyListComponent } from '../supply-list';

@Component({
  // directives: [FORM_DIRECTIVES, SupplyListComponent],
  selector: 'app-room-list',
  styleUrls: ['./room-list.component.css'],
  templateUrl: './room-list.component.html'
})
export class RoomListComponent implements OnInit {
  private rooms: Room[] = [];
  private selectedRoom: Room;

  ngOnInit() {
    firebase.database().ref('rooms').on('child_added', (snapshot) => {
      const room = new Room(snapshot.val());
      room.id = snapshot.key;
      this.rooms.push(room);

      if (!this.selectedRoom) {
        this.selectedRoom = room;
      }
    });
  }
}
