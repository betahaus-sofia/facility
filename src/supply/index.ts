import { Actions } from '../actions';
import { setRequestedSupply } from '../home-page/data';
import Model from '../model';
import { Room } from '../room';
import { store } from '../store';

export class Supply extends Model<Supply> {
  id?: string;
  name?: string;
  imageUrl?: string;
  requested?: number;
}

export function unsubscribeFromSupplies(room: Room, supplies: Supply[]) {
  if (room) {
    firebase.database().ref(`rooms/${room.id}/supplies`).off('child_added');
    supplies.forEach((supply) => {
      firebase.database().ref(`roomSupplies/${room.id}_${supply.id}/requested`).off('value');
    });
  }
}

export function getSupplies(room: Room) {
  const suppliesRef = firebase.database().ref(`rooms/${room.id}/supplies`);
  suppliesRef.on('child_added', (roomSupplyChildSnapshot: FirebaseSnapshot<any>) => {
    firebase.database().ref(`supplies/${roomSupplyChildSnapshot.key}`).once('value', (supplySnapshot: FirebaseSnapshot<Supply>) => {
      const supply = new Supply({ id: supplySnapshot.key }, supplySnapshot.val());
      addSupply(supply);

      firebase.database().ref(`roomSupplies/${room.id}_${supply.id}/requested`).on('value', (requestedSnapshot: FirebaseSnapshot<number>) => {
        const requested = requestedSnapshot.val();
        if (requested) {
          supplyRequested(supply, Math.min(requested, Date.now()));
        }
      });
    });
  });
}

export function addSupply(supply: Supply) {
  store.dispatch({ type: Actions.ADD_SUPPLY, supply });
}

export function requestSupply(room: Room, supply: Supply) {
  firebase.database().ref(`roomSupplies/${room.id}_${supply.id}`).update({
    room: room.id,
    supply: supply.id,
    requested: firebase.database.ServerValue.TIMESTAMP
  });

  supplyRequested(supply, Date.now());
  setRequestedSupply(supply);
}

export function supplyRequested(supply: Supply, requested: number) {
  store.dispatch({ type: Actions.SUPPLY_REQUESTED, supply, requested });
}
