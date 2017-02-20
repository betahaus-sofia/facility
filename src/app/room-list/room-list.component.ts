import { Component, OnInit } from '@angular/core';

import { Room } from '../models';

@Component({
  selector: 'app-room-list',
  styleUrls: ['./room-list.component.scss'],
  templateUrl: './room-list.component.html'
})
export class RoomListComponent implements OnInit {
  private rooms: Room[] = [];
  private selectedRoom: Room;

  ngOnInit() {
    firebase.database().ref('rooms').on('child_added', (roomChildSnapshot) => {
      const room = new Room(roomChildSnapshot.val());
      room.id = roomChildSnapshot.key;
      this.rooms.push(room);

      if (!this.selectedRoom) {
        this.selectedRoom = room;
      }
    });
  }
}