import { FORM_DIRECTIVES } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Request, Room, Supply } from '../models';
import { RequestListComponent } from '../request-list';

@Component({
  directives: [FORM_DIRECTIVES, RequestListComponent],
  moduleId: module.id,
  selector: 'app-supply-list',
  styleUrls: ['supply-list.component.css'],
  templateUrl: 'supply-list.component.html'
})
export class SupplyListComponent {
  @Input() room: Room;
  private supplies: Supply[] = [];

  ngOnInit() {
    firebase.database().ref(`rooms/${this.room.id}/supplies`).on('child_added', (roomSupplySnapshot) => {
      firebase.database().ref(`supplies/${roomSupplySnapshot.key}`).once('value', (supplySnapshot) => {
        const supply = new Supply(supplySnapshot.val());
        supply.id = supplySnapshot.key;
        this.supplies.push(supply);
      });
    });
  }

  addRequestFor(supply: Supply): void {
    const request = new Request({
      room_supply: `${this.room.id}_${supply.id}`,
      date: firebase.database.ServerValue.TIMESTAMP
    });

    firebase.database().ref('requests').push(request);
  }
}
