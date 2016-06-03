import { FORM_DIRECTIVES } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Request, Room, Supply } from '../models';

@Component({
  directives: [FORM_DIRECTIVES],
  moduleId: module.id,
  selector: 'app-request-list',
  styleUrls: ['request-list.component.css'],
  templateUrl: 'request-list.component.html'
})
export class RequestListComponent {
  @Input() room: Room;
  @Input() supply: Supply;
  private requests: Request[];

  private static requestLimit = 5;

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

        const timestamp = Math.min(request.date as any, Date.now());
        request.date = moment(timestamp).fromNow();

        this.requests.push(request);
      });
  }
}
