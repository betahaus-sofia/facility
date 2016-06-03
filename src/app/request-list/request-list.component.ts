import { FORM_DIRECTIVES } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Request, Supply } from '../models';

@Component({
  directives: [FORM_DIRECTIVES],
  moduleId: module.id,
  selector: 'app-request-list',
  styleUrls: ['request-list.component.css'],
  templateUrl: 'request-list.component.html'
})
export class RequestListComponent {
  @Input() supply: Supply;
  private requests: Request[] = [];

  ngOnInit() {
    firebase.database().ref(`supplies/${this.supply.id}/requests`).on('child_added', (supplyRequestSnapshot) => {
      firebase.database().ref(`requests/${supplyRequestSnapshot.key}`).once('value', (requestSnapshot) => {
        const request = new Request(requestSnapshot.val());
        request.id = requestSnapshot.key;

        const timestamp = Math.min(request.date as any, Date.now());
        request.date = moment(timestamp).fromNow();

        this.requests.push(request);
      });
    });
  }
}
