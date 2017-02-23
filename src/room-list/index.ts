import { Component, div, select, option } from 'compote';

import Room from '../room';
import SupplyList from '../supply-list';

export default class RoomList extends Component<RoomList> {
  private rooms: Room[] = this.getRooms();
  private supplyList: SupplyList;

  render() {
    return [
      select({
        className: 'room-list-select',
        onchange: ($event: Event) => {
          const value = (<HTMLSelectElement>$event.target).value;
          this.rooms.forEach((room) => {
            if (room.id === value) {
              this.setSupplyList(room);
              this.update();
            }
          });
        }
      }, this.rooms.map((room) => (
        option({ value: room.id }, room.name))
      )),

      this.renderSupplyList(this.supplyList)
    ];
  }

  private getRooms(): Room[] {
    const rooms: Room[] = [];
    const roomsRef = firebase.database().ref('rooms');
    roomsRef.off('child_added');
    roomsRef.on('child_added', (roomChildSnapshot: any) => {
      const room = new Room(roomChildSnapshot.val());
      room.id = roomChildSnapshot.key;
      rooms.push(room);
      if (!this.supplyList) {
        this.setSupplyList(room);
      }
      this.update();
    });

    return rooms;
  }

  private setSupplyList(room: Room) {
    this.supplyList = new SupplyList(this, { room });
  }

  private renderSupplyList(supplyList: SupplyList): Mithril.VirtualElement {
    if (!(supplyList && supplyList.room)) return null;

    return div({ className: 'room-list-item' },
      supplyList.render()
    );
  }
}
