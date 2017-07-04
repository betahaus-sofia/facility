import { Model } from 'compote/components/model';
import * as firebase from 'firebase/app';

import { DataSnapshot } from '../firebase';
import { Room } from '../room';
import { Actions, store } from '../store';

export class Supply extends Model<Supply> {
  id?: string;
  name?: string;
  imageUrl?: string;
  requested?: number;
}

export const unsubscribeFromSupplies = (room: Room, supplies: Supply[]) => {
  if (room) {
    firebase.database().ref(`rooms/${room.id}/supplies`).off('child_added');
    supplies.forEach((supply) => {
      firebase.database().ref(`roomSupplies/${room.id}_${supply.id}/requested`).off('value');
    });
  }
};

export const getSupplies = (room: Room) => {
  firebase.database().ref(`rooms/${room.id}/supplies`).on('child_added', (roomSupplyChildSnapshot: DataSnapshot<any>) => {
    firebase.database().ref(`supplies/${roomSupplyChildSnapshot.key}`).once('value', (supplySnapshot: DataSnapshot<Supply>) => {
      const supply = new Supply({ id: supplySnapshot.key }, supplySnapshot.val());
      addSupply(supply);

      firebase.database().ref(`roomSupplies/${room.id}_${supply.id}/requested`).on('value', (requestedSnapshot: DataSnapshot<number>) => {
        const requested = requestedSnapshot.val();
        if (requested) {
          supplyRequested(supply, Math.min(requested, Date.now()));
        }
      });
    });
  });
};

const addSupply = (supply: Supply) => {
  store.dispatch({ type: Actions.ADD_SUPPLY, supply });
};

export const requestSupply = (room: Room, supply: Supply) => {
  firebase.database().ref(`roomSupplies/${room.id}_${supply.id}`).update({
    room: room.id,
    supply: supply.id,
    requested: firebase.database.ServerValue.TIMESTAMP
  });

  supplyRequested(supply, Date.now());
  setRequestedSupply(supply);
};

const supplyRequested = (supply: Supply, requested: number) => {
  store.dispatch({ type: Actions.SUPPLY_REQUESTED, supply, requested });
};

const setRequestedSupply = (supply: Supply) => {
  store.dispatch({ type: Actions.SET_REQUESTED_SUPPLY, supply });
};
