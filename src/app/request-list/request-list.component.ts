import { Component, Input, OnChanges } from '@angular/core';

import { Request, Room, Supply } from '../models';

@Component({
  selector: 'app-request-list',
  styleUrls: ['./request-list.component.css'],
  templateUrl: './request-list.component.html'
})
export class RequestListComponent implements OnChanges {
  private static requestLimit = 5;

  @Input() room: Room;
  @Input() supply: Supply;

  private requests: Request[];

  ngOnChanges() {
    this.requests = [];

    firebase.database()
      .ref('requests')
      .orderByChild('room_supply')
      .equalTo(`${this.room.id}_${this.supply.id}`)
      .limitToLast(RequestListComponent.requestLimit)
      .on('child_added', (snapshot) => {
        const request = new Request(snapshot.val());
        request.id = snapshot.key;

        // Prevent displaying future dates in case of server time differences
        request.date = Math.min(request.date as any, Date.now());

        this.requests.push(request);
      });
  }
}
