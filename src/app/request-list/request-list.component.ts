import { FORM_DIRECTIVES } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Request, Room, Supply } from '../models';
import { TimeagoImpurePipe } from '../timeago';

@Component({
  directives: [FORM_DIRECTIVES],
  moduleId: module.id,
  pipes: [TimeagoImpurePipe],
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

        // Prevent displaying future dates in case of server time differences
        request.date = Math.min(request.date as any, Date.now());

        this.requests.push(request);
      });
  }
}
