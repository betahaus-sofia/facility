import { Component, Input, OnChanges } from '@angular/core';

import { fade } from '../animations';
import { Request, Room, Supply } from '../models';

@Component({
  animations: [fade],
  selector: 'app-supply-list',
  styleUrls: ['./supply-list.component.scss'],
  templateUrl: './supply-list.component.html'
})
export class SupplyListComponent implements OnChanges {
  @Input() room: Room;
  private supplies: Supply[];

  ngOnChanges() {
    this.supplies = [];

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
