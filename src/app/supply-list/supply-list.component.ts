import { FORM_DIRECTIVES } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Room, Supply } from '../services';

@Component({
  directives: [FORM_DIRECTIVES],
  moduleId: module.id,
  selector: 'app-supply-list',
  styleUrls: ['supply-list.component.css'],
  templateUrl: 'supply-list.component.html'
})
export class SupplyListComponent {
  @Input() room: Room;
  @Input() supplies: Supply[];

  addToNumber(supply: Supply, additive: number): void {
    // Optimistically add the number
    supply.number += additive;
    
    // Save changes
    firebase.database().ref(`rooms/${this.room.id}/supplies/${supply.id}/number`).transaction((n) => n + additive);
  }
}
