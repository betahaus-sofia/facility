import { Component, Input, OnChanges } from '@angular/core';

import { fade } from '../animations';
import { Room, Supply } from '../models';

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

    firebase.database().ref(`rooms/${this.room.id}/supplies`).on('child_added', (roomSupplyChildSnapshot) => {
      firebase.database().ref(`supplies/${roomSupplyChildSnapshot.key}`).once('value', (supplySnapshot) => {
        const supply = new Supply(supplySnapshot.val());
        supply.id = supplySnapshot.key;
        this.supplies.push(supply);

        firebase.database().ref(`roomSupplies/${this.room.id}_${supply.id}/requested`).on('value', (requestedSnapshot) => {
          const requested = requestedSnapshot.val();
          if (requested) {
            supply.requested = Math.min(requested, Date.now());
          }
        });
      });
    });
  }

  request(supply: Supply): void {
    firebase.database().ref(`roomSupplies/${this.room.id}_${supply.id}`).update({
      room: this.room.id,
      supply: supply.id,
      requested: firebase.database.ServerValue.TIMESTAMP
    });
  }
}
