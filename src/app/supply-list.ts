import { Component, div, button, img, h5, h4 } from 'compote';
const timeago = require('timeago.js');

import Room from './room';
import Supply from './supply';

export default class SupplyList extends Component<SupplyList> {
  room: Room;
  private supplies: Supply[] = this.getSupplies(this.room);

  render() {
    return div({
      className: 'supply-list flex-row flex-wrap justify-content-start align-items-stretch'
    }, this.supplies.map((supply) => (
      div({ className: 'supply-list-item' },
        div({ className: 'supply-list-item-container' }, [
          button({
            className: 'supply-list-item-button',
            onclick: () => {
              this.request(this.room, supply);
              this.update();
            }
          }, [
            img({ className: 'supply-list-item-image', src: supply.imageUrl || '/assets/icon.png' }),
            h5(supply.name)
          ]),
          // TODO: Cache instance & automatically update `timeago`
          supply.requested ? h4(`Requested ${new timeago().format(supply.requested)}`) : null
        ])
      )
    )));
  }

  getSupplies(room: Room): Supply[] {
    const supplies: Supply[] = [];

    if (room) {
      const suppliesRef = firebase.database().ref(`rooms/${room.id}/supplies`);
      suppliesRef.off('child_added');
      suppliesRef.on('child_added', (roomSupplyChildSnapshot: any) => {
        firebase.database().ref(`supplies/${roomSupplyChildSnapshot.key}`).once('value', (supplySnapshot: any) => {
          const supply = new Supply(supplySnapshot.val());
          supply.id = supplySnapshot.key;
          supplies.push(supply);
          this.update();

          // TODO: Unsubscribe on remove
          firebase.database().ref(`roomSupplies/${room.id}_${supply.id}/requested`).on('value', (requestedSnapshot: any) => {
            const requested = requestedSnapshot.val();
            if (requested) {
              supply.requested = Math.min(requested, Date.now());
              this.update();
            }
          });
        });
      });
    }

    return supplies;
  }

  private request(room: Room, supply: Supply) {
    firebase.database().ref(`roomSupplies/${room.id}_${supply.id}`).update({
      room: room.id,
      supply: supply.id,
      requested: firebase.database.ServerValue.TIMESTAMP
    });
  }
}
